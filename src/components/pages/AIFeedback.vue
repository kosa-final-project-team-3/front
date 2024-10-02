<template>
    <div>
        <p>AI 피드백</p>
    </div>
    <div class="container">
        <video ref="videoElement" class="input_video"></video>
        <canvas ref="canvasElement" class="output_canvas" width="480px" height="640px"></canvas>
        <!-- <div ref="landmarkContainer" class="landmark-grid-container"></div> -->
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';src/components/pages/AIFeedback.vue
import { drawConnectors, drawLandmarks, POSE_CONNECTIONS } from '@mediapipe/drawing_utils';
// import { LandmarkGrid } from '@mediapipe/control_utils_3d';

const videoElement = ref(null);
const canvasElement = ref(null);
// const landmarkContainer = ref(null);

onMounted(() => {
    const canvasCtx = canvasElement.value.getContext('2d');
    // const grid = new LandmarkGrid(landmarkContainer.value);

    // MediaPipe Pose 모델 초기화
    const pose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
    });

    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        // smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    function onResults(results) {
        canvasCtx.clearRect(0, 0, canvasElement.value.width, canvasElement.value.height);
        canvasCtx.drawImage(videoElement.value, 0, 0, canvasElement.value.width, canvasElement.value.height);

        if (results.poseLandmarks) {
            drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
            drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });
        }


        // if (!results.poseLandmarks) {
        //     grid.updateLandmarks([]);
        //     return;
        // }

        // canvasCtx.save();
        // canvasCtx.clearRect(0, 0, canvasElement.value.width, canvasElement.value.height);
        // canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.value.width, canvasElement.value.height);

        // canvasCtx.globalCompositeOperation = 'source-in';
        // canvasCtx.fillStyle = '#00FF00';
        // canvasCtx.fillRect(0, 0, canvasElement.value.width, canvasElement.value.height);

        // canvasCtx.globalCompositeOperation = 'destination-atop';
        // canvasCtx.drawImage(results.image, 0, 0, canvasElement.value.width, canvasElement.value.height);

        // canvasCtx.globalCompositeOperation = 'source-over';
        // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
        // drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });
        // canvasCtx.restore();

        // grid.updateLandmarks(results.poseWorldLandmarks);
    }

    const camera = new Camera(videoElement.value, {
        onFrame: async () => {
            await pose.send({ image: videoElement.value });
        },
        width: 480,                                                                     
        height: 640,
    });

    pose.onResults(onResults);
    camera.start();
});
</script>

<style scoped></style>
