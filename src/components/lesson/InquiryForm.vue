<template>
    <div class="inquiry-container">
        <div class="modal-content">
            <h2>문의하기</h2>
            <div class="lesson-info">
                <p><strong>카테고리:</strong> {{ lesson.category }}</p>
                <p><strong>강좌명:</strong> {{ lesson.title }}</p>
                <p><strong>강사명:</strong> {{ lesson.trainer }}</p>
            </div>

            <hr />

            <div class="inquiry-form">
                <label>신청인 이름</label>
                <input type="text" v-model="applicantName" />

                <label>신청인 연락처</label>
                <input type="text" v-model="applicantContact" />

                <label>문의 내용</label>
                <textarea v-model="inquiryMessage">레슨 신청합니다.</textarea>
            </div>

            <button class="submit-button" @click="submitInquiry">등록하기</button>

            <button class="close-button" @click="$emit('close')">닫기</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    lesson: Object,
});

const emit = defineEmits(['close', 'submitInquiry']);

const applicantName = ref('');
const applicantContact = ref('');
const inquiryMessage = ref('레슨 신청합니다.');

const submitInquiry = () => {
    alert(`${applicantName.value}님, 문의가 접수되었습니다. (레슨: ${props.lesson.title})`);
    emit('submitInquiry', {
        name: applicantName.value,
        contact: applicantContact.value,
        message: inquiryMessage.value,
    });
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
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    width: 500px;
}
</style>
