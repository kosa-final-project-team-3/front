<template>
    <div class="group-lessons">
        <div class="header">
            <h3>온라인 PT</h3>
            <button @click="showRegisterPopup" class="register-lesson-btn">레슨 등록하기</button>
        </div>
        <RegisterLessonPopup
            :is-visible="isRegisterPopupVisible"
            @close="closeRegisterPopup"
            @register="handleRegisterLesson"
        />
    </div>
</template>

<script setup>
import RegisterLessonPopup from './RegisterLessonPopup.vue';
import { ref } from 'vue';

const isRegisterPopupVisible = ref(false);

const showRegisterPopup = () => {
    isRegisterPopupVisible.value = true;
};

const closeRegisterPopup = () => {
    isRegisterPopupVisible.value = false;
};
const handleRegisterLesson = async (lessonData) => {
    try {
        // TODO: API를 통해 새 레슨 등록
        console.log('Registering new lesson:', lessonData);
        // 성공 시 팝업 닫기
        closeRegisterPopup();
    } catch (error) {
        console.error('Failed to register lesson:', error);
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.register-lesson-btn {
    padding: 0.5rem 1rem;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
