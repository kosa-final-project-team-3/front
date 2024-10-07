<template>
    <div class="contact-content">
        <h2>Contact Us</h2>
        <form @submit.prevent="submitForm">
            <label for="name">이름:</label>
            <input type="text" id="name" v-model="name" required />

            <label for="email">이메일:</label>
            <input type="email" id="email" v-model="email" required />

            <label for="message">메시지:</label>
            <textarea id="message" v-model="message" required></textarea>

            <button class="submit-btn" type="submit">전송</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['title']);
const emit = defineEmits(['close']);

const name = ref('');
const email = ref('');
const message = ref('');

const submitForm = () => {
    console.log('폼 데이터:', {
        name: name.value,
        email: email.value,
        message: message.value,
    });
    // 여기에 폼 데이터를 서버로 전송하는 로직 추가
    emit('close');
};
</script>

<style scoped>
html,
body {
    background-color: #f9f9f9;
}

.contact-content {
    padding: 30px;
    max-width: 500px;
    margin: auto;
    margin-top: 50px;
}

h2 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
}

form label {
    margin-top: 15px;
    font-weight: bold;
}

form input,
form textarea {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
}

form input:focus,
form textarea:focus {
    border-color: #28a745;
    outline: none;
}

.submit-btn {
    margin-top: 20px;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: #218838;
}
</style>
