<template>
    <div>
        <p>AI 피드백 1001</p>
    </div>

    <div>
        <div style="position: relative">
            <video ref="video" width="640" height="480" autoplay playsinline></video>
            <canvas ref="canvas" width="640" height="480" style="position: absolute; top: 0; left: 0"></canvas>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

const video = ref(null);
const canvas = ref(null);
let poseLandmarker = null;
let canvasCtx = null;
let lastVideoTime = -1; // 마지막으로 처리된 비디오 시간

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

    // 캔버스의 2D 컨텍스트를 가져옴
    canvasCtx = canvas.value.getContext('2d');

    // 웹캠 활성화
    await enableWebcam();
});

// 웹캠을 활성화하는 함수
const enableWebcam = async () => {
    if (!poseLandmarker) {
        console.log('poseLandmarker가 아직 로드되지 않았습니다.');
        return;
    }

    // getUserMedia를 이용하여 웹캠 스트림 요청
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.value.srcObject = stream;

    // 웹캠 데이터가 로드된 후 예측 시작
    video.value.addEventListener('loadeddata', predictWebcam);
    video.value.addEventListener('loadeddata', renderLoop);
};

// 실시간 포즈 감지 및 결과 처리 루프
const renderLoop = async () => {
    const videoElement = video.value;

    // 현재 프레임의 비디오 시간이 마지막 처리된 시간과 다른지 확인
    if (videoElement.currentTime !== lastVideoTime) {
        // 포즈 감지 실행 (PoseLandmarkerResult 반환)
        const poseLandmarkerResult = await poseLandmarker.detectForVideo(videoElement, performance.now());

        // 결과값을 처리하는 함수 호출
        processResults(poseLandmarkerResult);

        // 마지막 처리된 비디오 시간을 업데이트
        lastVideoTime = videoElement.currentTime;
    }

    // 다음 프레임에 renderLoop를 다시 호출하여 예측을 지속
    requestAnimationFrame(renderLoop);
};

// 포즈 감지 결과를 처리하는 함수
const processResults = (results) => {
    // 랜드마크와 월드 랜드마크를 콘솔에 출력
    if (results.landmarks) {
        console.log('PoseLandmarkerResult:');
        console.log('  Landmarks:');

        // 각 포즈의 33개의 랜드마크를 출력
        results.landmarks.forEach((landmarkList, poseIndex) => {
            landmarkList.forEach((landmark, index) => {
                console.log(`    Landmark #${index}:`);
                console.log(`      x            : ${landmark.x}`);
                console.log(`      y            : ${landmark.y}`);
                console.log(`      z            : ${landmark.z}`);
                console.log(`      visibility   : ${landmark.visibility}`);
                console.log(`      presence     : ${landmark.presence}`);
            });
        });
    }

    if (results.worldLandmarks) {
        console.log('  WorldLandmarks:');

        // 각 포즈의 33개의 월드 랜드마크를 출력
        results.worldLandmarks.forEach((worldLandmarkList, poseIndex) => {
            worldLandmarkList.forEach((landmark, index) => {
                console.log(`    Landmark #${index}:`);
                console.log(`      x            : ${landmark.x}`);
                console.log(`      y            : ${landmark.y}`);
                console.log(`      z            : ${landmark.z}`);
                console.log(`      visibility   : ${landmark.visibility}`);
                console.log(`      presence     : ${landmark.presence}`);
            });
        });
    }
};

// 웹캠 예측 함수
const predictWebcam = async () => {
    // 실시간 포즈 감지 결과를 캔버스에 그림
    poseLandmarker.detectForVideo(video.value, performance.now(), (result) => {
        // 캔버스 초기화
        canvasCtx.clearRect(0, 0, canvas.value.width, canvas.value.height);

        // 각 포즈의 랜드마크와 연결선을 그림
        result.landmarks.forEach((landmark) => {
            const drawingUtils = new DrawingUtils(canvasCtx);
            drawingUtils.drawLandmarks(landmark, {
                radius: (data) => (data.from ? DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1) : 1),
            });
            drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
        });
    });

    // 예측을 계속 실행하기 위해 requestAnimationFrame으로 다음 프레임 호출
    requestAnimationFrame(predictWebcam);
};

// 컴포넌트가 언마운트될 때 웹캠 종료
onUnmounted(() => {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
});
</script>

<style scoped></style>
