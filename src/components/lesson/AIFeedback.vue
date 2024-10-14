<template>
    <div>
        <p>AI 피드백</p>
    </div>

    <div class="container">
        <div style="position: relative">
            <video ref="video" width="640" height="480" autoplay playsinline></video>
            <canvas ref="canvas" width="640" height="480" style="position: absolute; top: 0; left: 0"></canvas>

            <div v-if="isRunning" class="countdown-overlay">
                <svg class="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#e6e6e6" stroke-width="5" />
                    <circle
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        stroke="#4a5568"
                        stroke-width="5"
                        :stroke-dasharray="circumference"
                        :stroke-dashoffset="dashOffset"
                        transform="rotate(-90 50 50)"
                    />
                    <text
                        x="50"
                        y="52"
                        text-anchor="middle"
                        dominant-baseline="central"
                        font-size="24"
                        font-weight="bold"
                        fill="#e6e6e6"
                    >
                        {{ count }}
                    </text>
                </svg>
            </div>
        </div>

        <div class="controls">
            {{ duration }}
            <input type="range" v-model="duration" min="7" max="30" :disabled="isRunning" />
            <button @click="startCountdown" :disabled="isRunning" class="start-button">Start Countdown</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import axios from 'axios';

const video = ref(null);
const canvas = ref(null);
let poseLandmarker = null;
let canvasCtx = null;
let lastVideoTime = -1;

const count = ref(7);
const isRunning = ref(false);
const duration = ref(7);
const circumference = 2 * Math.PI * 20;
const shouldProcessResults = ref(false);

// 카운트다운 애니메이션
const dashOffset = computed(() => {
    const progress = (duration.value - count.value) / duration.value;
    return circumference * (1 - progress);
});

const startCountdown = () => {
    count.value = duration.value;
    isRunning.value = true;
    shouldProcessResults.value = false;
    textToSpeech(count.value + '초 안에 자세를 맞춰주세요');
    setTimeout(() => {
        countdown();
        textToSpeech(count.value);
    }, 3000);
};

const countdown = () => {
    if (count.value > 0) {
        setTimeout(() => {
            count.value--;
            countdown();
            textToSpeech(count.value);
        }, 1000);
    } else {
        isRunning.value = false;

        setTimeout(() => {
            shouldProcessResults.value = true;
        }, 1000);
    }
};

// 컴포넌트가 마운트되면 poseLandmarker 모델을 불러옴
onMounted(async () => {
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
    );

    // 포즈 감지를 위한 poseLandmarker 인스턴스 생성
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
            delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numPoses: 2,
    });

    canvasCtx = canvas.value.getContext('2d');

    await enableWebcam();
});

// 웹캠을 활성화하는 함수
const enableWebcam = async () => {
    if (!poseLandmarker) {
        console.log('poseLandmarker가 아직 로드되지 않았습니다.');
        return;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === 'videoinput');

    // 노트북 카메라
    const selectedDeviceId = videoDevices[0]?.deviceId;

    // USB 웹캠
    // const selectedDeviceId = videoDevices[1]?.deviceId;

    if (!selectedDeviceId) {
        console.log('사용 가능한 비디오 장치가 없습니다.');
        return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDeviceId },
    });
    video.value.srcObject = stream;

    video.value.addEventListener('loadeddata', renderLoop);
};

// 실시간 포즈 감지 및 결과 처리 루프
const renderLoop = async () => {
    const videoElement = video.value;

    // 현재 프레임의 비디오 시간이 마지막 처리된 시간과 다른지 확인
    if (videoElement.currentTime !== lastVideoTime) {
        const poseLandmarkerResult = await poseLandmarker.detectForVideo(videoElement, performance.now());

        canvasCtx.clearRect(0, 0, canvas.value.width, canvas.value.height);

        // 랜드마크 그리기
        if (poseLandmarkerResult.landmarks) {
            const drawingUtils = new DrawingUtils(canvasCtx);
            poseLandmarkerResult.landmarks.forEach((landmark) => {
                drawingUtils.drawLandmarks(landmark, {
                    radius: (data) => (data.from ? DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1) : 1),
                });
                drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
            });
        }

        // 포즈 감지 결과 처리
        if (shouldProcessResults.value) {
            processResults(poseLandmarkerResult);
            shouldProcessResults.value = false; // 한 번만 처리하도록 설정
        }

        lastVideoTime = videoElement.currentTime;
    }

    requestAnimationFrame(renderLoop);
};

// 포즈 감지 결과를 처리하는 함수
const processResults = (results) => {
    let feedback = '';
    if (results.worldLandmarks && results.worldLandmarks.length > 0) {
        const worldLandmarkList = results.worldLandmarks[0];
        const rightShoulder = worldLandmarkList[12];
        const rightHip = worldLandmarkList[24];
        const leftKnee = worldLandmarkList[25];
        const rightKnee = worldLandmarkList[26];
        const rightAnkle = worldLandmarkList[28];
        const leftFoot = worldLandmarkList[31];
        const rightFoot = worldLandmarkList[32];
        const middleFoot = {
            x: (leftFoot.x + rightFoot.x) / 2,
            y: (leftFoot.y + rightFoot.y) / 2,
            z: (leftFoot.z + rightFoot.z) / 2,
        };

        const isReliable = [rightShoulder, rightHip, leftKnee, rightKnee, rightAnkle, leftFoot, rightFoot].every(
            (landmark) => landmark.visibility >= 0.5,
        );

        if (isReliable) {
            const angleWaist = calculateAngle(rightShoulder, rightHip, rightKnee);
            const angleHip = calculateAngle(rightHip, rightKnee, rightAnkle);
            const angleKnee = calculateAngle(leftKnee, middleFoot, rightKnee);

            if (angleWaist < 60) {
                feedback += '엉덩이가 너무 뒤에 있습니다. 상체를 더 세워주세요. \n';
            }
            if (angleHip > 90) {
                feedback += '가동범위가 짧습니다. 더 깊이 앉아주세요. \n';
            }
            if (angleKnee < 50) {
                feedback += '무릎의 간격이 너무 가까이 있습니다. 무릎 사이의 간격을 멀리 떨어트려주세요. \n';
            }

            if (feedback === '') {
                feedback = '올바른 자세입니다.';
            }
            console.log(angleWaist);
        } else {
            feedback = '자세를 정확히 감지할 수 없습니다. 다시 시도해주세요.';
        }
    } else {
        feedback = '포즈를 감지할 수 없습니다. 다시 시도해주세요.';
    }

    // 안내 -> tts 이식
    textToSpeech(feedback);
    setTimeout(() => {
        alert(feedback);
    }, 5000);
};

// 두 점 사이의 각도를 계산하는 함수
const calculateAngle = (pointA, pointB, pointC) => {
    const vectorAB = { x: pointB.x - pointA.x, y: pointB.y - pointA.y };
    const vectorBC = { x: pointC.x - pointB.x, y: pointC.y - pointB.y };

    const dotProduct = vectorAB.x * vectorBC.x + vectorAB.y * vectorBC.y;
    const magnitudeAB = Math.sqrt(vectorAB.x ** 2 + vectorAB.y ** 2);
    const magnitudeBC = Math.sqrt(vectorBC.x ** 2 + vectorBC.y ** 2);

    const angle = Math.acos(dotProduct / (magnitudeAB * magnitudeBC));
    return (angle * 180) / Math.PI; // 라디안을 각도로 변환
};

// 컴포넌트가 언마운트될 때 웹캠 종료
onUnmounted(() => {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
});

const audio = new Audio();

// TTS 함수 추가
const textToSpeech = async (text) => {
    try {
        const response = await axios.post(
            'http://localhost:8083/api/tts',
            {
                text: text,
            },
            {
                responseType: 'arraybuffer',
            },
        );

        const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);

        audio.src = audioUrl;
        await audio.play();
    } catch (error) {
        console.error('Error with TTS API:', error);
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.countdown-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.controls {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.start-button {
    margin-left: 10px;
    padding: 10px 20px;
    background-color: #4a5568;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
