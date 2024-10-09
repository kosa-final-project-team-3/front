<template>
    <div>
        <h1>파일 업로드</h1>
        <div
            class="drop-zone"
            @dragover.prevent
            @drop.prevent="onDrop"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            :class="{ 'drag-over': isDragOver }"
        >
            <p v-if="!selectedFile">파일을 여기에 드래그 앤 드롭하세요</p>
            <p v-else>{{ selectedFile.name }}</p>
        </div>
        <button @click="handleUpload" :disabled="!selectedFile">업로드</button>
        <p v-if="uploadStatus">{{ uploadStatus }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFileUpload } from '../composables/useFileUpload';

const selectedFile = ref(null);
const isDragOver = ref(false);

const { uploadStatus, uploadFile } = useFileUpload();

const onDrop = (event) => {
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        const fileType = file.type;
        const fileSize = file.size;

        if (!fileType.startsWith('video/') && !fileType.startsWith('image/')) {
            uploadStatus.value = '동영상 및 이미지 파일만 업로드 가능합니다.';
            return;
        }

        const maxSize = 100 * 1024 * 1024; // 100MB
        if (fileSize > maxSize) {
            uploadStatus.value = '파일 크기가 너무 큽니다. 100MB 이하의 파일만 업로드 가능합니다.';
            return;
        }

        selectedFile.value = file;
        uploadStatus.value = '';
    }
    isDragOver.value = false;
};

const onDragEnter = () => {
    isDragOver.value = true;
};

const onDragLeave = () => {
    isDragOver.value = false;
};

const handleUpload = () => {
    uploadFile(selectedFile.value);
};
</script>

<style scoped>
.drop-zone {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    margin-bottom: 10px;
    transition: background-color 0.3s;
}

.drop-zone.drag-over {
    background-color: #f0f0f0;
}
</style>
