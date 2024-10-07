<template>
    <div id="app">
        <header class="header">
            <div class="logo">
                <h2>정도인</h2>
            </div>
            <nav class="navbar">
                <ul>
                    <li><a href="#">홈</a></li>
                    <li><a href="#">운동 정보</a></li>
                    <li><a href="#">피트니스 서비스</a></li>
                    <li><a href="#">회원가입</a></li>
                    <li><a href="#">블로그</a></li>
                </ul>
            </nav>
        </header>
        <main class="main-content">
            <div class="feedback-container">
                <h1>피드백</h1>
                <textarea v-model="question" placeholder="Ask a question..."></textarea>
                <button class="generate-button" @click="getFeedback">제출하기</button>
                <div v-if="feedback">
                    <h2>Response:</h2>
                    <p>{{ feedback }}</p>
                </div>
            </div>
        </main>
        <footer class="footer">
            <p class="copyright">&copy; . All rights reserved.</p>
            <ul class="support-links">
                <li>
                    <a href="#">이용약관<br /><span class="support-subtext">개인정보처리약관</span></a>
                </li>
                <li>
                    <ContactModal
                        :isVisible="isContactModalVisible"
                        @close="closeModal"
                        title="문의하기"
                    ></ContactModal>
                    <a href="#" @click.prevent="showContactModal"
                        >고객지원<br /><span class="support-subtext">문의하기</span></a
                    >
                </li>
            </ul>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ContactModal from './ContactModal.vue';

const isModalVisible = ref(false);
const isContactModalVisible = ref(false);

const showTerms = () => {
    isModalVisible.value = true; // 모달을 열어줌
};

const showContactModal = () => {
    isContactModalVisible.value = true; // 문의하기 모달 열기
};

const closeModal = () => {
    isModalVisible.value = false; // 이용약관 모달 닫기
    isContactModalVisible.value = false; // 문의하기 모달 닫기
};
</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    background-color: #faebd7;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.navbar li {
    margin-left: 20px;
}

.navbar a {
    color: black;
    text-decoration: none;
}

.main-content {
    flex-grow: 1;
    padding: 40px;
    text-align: center;
}

.intro h2 {
    font-size: 2em;
    margin-bottom: 20px;
}

.services {
    margin-top: 40px;
}

.service-list {
    display: flex;
    justify-content: space-around;
}

.service-item {
    width: 30%;
    background-color: #ecf0f1;
    padding: 20px;
    border-radius: 8px;
}

.footer {
    background-color: #f0f0f0;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.support-links {
    display: flex;
    margin: 20px;
}

.support-links li {
    display: inline;
    margin-right: 10px;
}

.support-links a {
    color: black;
    text-decoration: none;
}

.support-subtext {
    display: block;
    font-size: 0.8em;
}

.feedback-container {
    width: 600px;
    margin: 0 auto;
    padding: 20px;
}

textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}

.generate-button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
