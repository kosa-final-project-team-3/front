<template>
    <div class="inquiry-container">
        <div class="modal-content">
            <h2>문의하기</h2>
            <p><strong>카테고리:</strong> {{ lesson.category }}</p>
            <p><strong>강좌명:</strong> {{ lesson.title }}</p>
            <p><strong>강사명:</strong> {{ lesson.trainer }}</p>

            <hr />

            <div class="inquiry-form">
                <label>신청인 이름</label>
                <input type="text" v-model="applicantName" />

                <label>신청인 연락처</label>
                <input type="text" v-model="applicantContact" />

                <label>문의 내용</label>
                <textarea v-model="inquiryMessage">레슨 신청합니다.</textarea>
            </div>

            <button type="button" class="submit-button" @click="inquirySubmit">등록하기</button>
            <button type="button" class="close-button" @click="$emit('close')">닫기</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    lesson: Object,
});

const emit = defineEmits(['close']);

const applicantName = ref('');
const applicantContact = ref('');
const inquiryMessage = ref('레슨 신청합니다.');

const inquirySubmit = () => {
    if (!applicantName.value || !applicantContact.value) {
        alert('이름과 연락처를 입력해주세요.');
        return;
    }
    alert(`${applicantName.value}님, 문의가 접수되었습니다. (레슨: ${props.lesson.title})`);
    // 서버 처리
    emit('close');
};
</script>

<style scoped>
.inquiry-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    width: 500px;
}

.inquiry-form {
    display: flex;
    flex-direction: column;
}

.inquiry-form input,
.inquiry-form textarea {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.submit-button {
    padding: 10px;
    background-color: #00bf63;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
}

.submit-button:hover {
    background-color: #009e52;
}

.close-button {
    padding: 10px;
    background-color: #a6a6a6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 10px;
}

.close-button:hover {
    background-color: #999;
}
</style>
