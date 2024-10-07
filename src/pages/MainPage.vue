<template>
    <div class="base-container">
        <header-compo />
        <div class="main">
            <div v-if="!isAuthenticated">
                <button type="button" @click="$router.push('/login')">로그인 페이지로 이동</button><br />
            </div>
            <div v-if="isAuthenticated"><button type="button" @click="handleLogout()">로그아웃</button><br /></div>
            <button type="button" @click="accessPrivateResource()">access private resource</button><br />
            <button type="button" @click="$router.replace('/feedback/ai')">AI 피드백</button><br />
            <button type="button" @click="$router.replace('/trainerpage')">트레이너 페이지</button><br />

            <div class="banner">
                <img class="banner-ad" src="../assets/banner-ad.jpg" alt="배너 광고" />
            </div>
            <div class="lesson-container">
                <div class="lesson-type">
                    <img src="../assets/personal-icon.png" alt="개인 레슨 아이콘" class="lesson-icon" />개인 레슨
                </div>
                <div class="lesson-type">
                    <img src="../assets/group-icon.png" alt="그룹 레슨 아이콘" class="lesson-icon" />그룹 레슨
                </div>
                <div class="lesson-type">
                    <img src="../assets/online-icon.png" alt="온라인 레슨 아이콘" class="lesson-icon" />온라인 레슨
                </div>
                <div class="lesson-type">
                    <img src="../assets/ai-icon.png" alt="AI 피드백 아이콘" class="lesson-icon" />AI 피드백
                </div>
            </div>
            <div class="popular-lesson">
                <h2>지금 가장 인기 있는 레슨</h2>
                <div class="lesson-list">
                    <div class="lesson-item">레슨1</div>
                    <div class="lesson-item">레슨2</div>
                    <div class="lesson-item">레슨3</div>
                </div>
            </div>
        </div>
        <footer-compo />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import jwtAxios from '../util/jwtUtil';
import HeaderCompo from '../components/HeaderCompo.vue';
import FooterCompo from '../components/FooterCompo.vue';

const host = import.meta.env.VITE_APP_HOST;
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

authStore.checkAuthStatus();

const accessPrivateResource = () => [
    jwtAxios
        .get(`http://${host}/api/member/private`)
        .then((res) => {
            if (res.status === 200) {
                console.log(res.data);
            }
        })
        .catch((e) => {
            console.log(e);
        }),
];

const handleLogout = () => {
    authStore.logout();
};
</script>

<style scoped>
.base-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.banner-ad {
    width: 80vw;
    height: 40vh;
    border-radius: 10px;
}

.lesson-container {
    display: flex;
    margin: 20px;
}

.lesson-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lesson-icon {
    width: 50px;
    height: 50px;
}

.popular-lesson {
    width: 80vw;
}

.lesson-list {
    display: flex;
    margin: 20px;
    gap: 20px;
    justify-content: center;
}

.lesson-item {
    width: 400px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
