<template>
    <div v-if="isVisible" class="popup-overlay">
        <div class="popup">
            <h4>레슨 등록</h4>
            <form @submit.prevent="registerLesson">
                <div class="form-group">
                    <label for="title">레슨명:</label>
                    <input id="title" v-model="lessonData.title" type="text" required />
                </div>
                <div class="form-group">
                    <label for="instructor">강사:</label>
                    <input id="instructor" v-model="lessonData.instructor" type="text" required />
                </div>
                <div class="form-group">
                    <label for="price">가격:</label>
                    <input id="price" v-model="lessonData.price" type="number" required />
                </div>
                <div class="form-group">
                    <label for="details">레슨 상세 내역:</label>
                    <textarea id="details" v-model="lessonData.details" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" @click="close" class="btn-cancel">취소</button>
                    <button type="submit" class="btn-register">등록하기</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
    isVisible: Boolean,
});

const emit = defineEmits(['close', 'register']);

const lessonData = reactive({
    category: '',
    title: '',
    instructor: '',
    price: '',
    details: '',
});

const close = () => {
    emit('close');
};

const registerLesson = () => {
    emit('register', { ...lessonData });
    // 폼 초기화
    Object.keys(lessonData).forEach((key) => (lessonData[key] = ''));
};
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.5rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.btn-cancel,
.btn-register {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
}

.btn-register {
    background-color: #4caf50;
    color: white;
    border: none;
}

.btn-cancel {
    background-color: #f44336;
    color: white;
    border: none;
}
select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
}
</style>
