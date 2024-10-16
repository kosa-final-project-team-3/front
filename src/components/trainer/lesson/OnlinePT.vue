<template>
    <div class="online-pt">
        <div class="header">
            <h3>온라인 PT</h3>
            <button @click="showRegisterPopup" class="register-lesson-btn">레슨 등록하기</button>
        </div>
        <div class="lesson-list">
            <div v-for="lesson in onlinePTLessons" :key="lesson.id" class="lesson-item">
                <h4>{{ lesson.title }}</h4>
                <p><strong>회원명:</strong> {{ lesson.memberName }}</p>
                <p><strong>날짜:</strong> {{ lesson.date }}</p>
                <p><strong>시간:</strong> {{ lesson.time }}</p>
                <p><strong>상태:</strong> {{ lesson.status }}</p>
                <button @click="createRoom(lesson)" :disabled="roomUrl">방 생성하기</button>
                <div v-if="lesson.roomUrl">
                    <p>
                        생성된 방 링크: <a :href="lesson.roomUrl" target="_blank">{{ lesson.roomUrl }}</a>
                    </p>
                </div>
            </div>
        </div>
        <RegisterLessonPopup
            :is-visible="isRegisterPopupVisible"
            @close="closeRegisterPopup"
            @register="handleRegisterLesson"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import RegisterLessonPopup from './RegisterLessonPopup.vue';

const onlinePTLessons = ref([
    {
        id: 1,
        title: '체중 감량 프로그램',
        memberName: '김철수',
        date: '2023-05-15',
        time: '14:00 - 15:00',
        status: '예약 완료',
        roomUrl: null,
    },
    {
        id: 2,
        title: '근력 강화 트레이닝',
        memberName: '이영희',
        date: '2023-05-16',
        time: '10:00 - 11:00',
        status: '진행 중',
        roomUrl: null,
    },
    {
        id: 3,
        title: '근력 강화 트레이닝',
        memberName: '이영희',
        date: '2023-05-16',
        time: '10:00 - 11:00',
        status: '진행 중',
        roomUrl: null,
    },
    {
        id: 4,
        title: '근력 강화 트레이닝',
        memberName: '이영희',
        date: '2023-05-16',
        time: '10:00 - 11:00',
        status: '진행 중',
        roomUrl: null,
    },
    {
        id: 5,
        title: '근력 강화 트레이닝',
        memberName: '이영희',
        date: '2023-05-16',
        time: '10:00 - 11:00',
        status: '진행 중',
        roomUrl: null,
    },
    {
        id: 6,
        title: '근력 강화 트레이닝',
        memberName: '이영희',
        date: '2023-05-16',
        time: '10:00 - 11:00',
        status: '진행 중',
        roomUrl: null,
    },
]);
const roomUrl = ref(null);

const createRoom = async (lesson) => {
    try {
        const response = await axios.post('http://localhost:8083/create-room');
        lesson.roomUrl = response.data.roomUrl;
    } catch (error) {
        console.error('Failed to create room:', error);
    }
};

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
.lesson-list {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.lesson-item {
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
}

.lesson-item:last-child {
    border-bottom: none;
}

.lesson-item h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
}

.lesson-item p {
    margin: 0.25rem 0;
}
button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
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
