<template>
    <div class="base-container">
        <header-compo />
        <main class="main">
            <router-view class="router-container" />

            <div v-if="!isAuthenticated">
                <button type="button" @click="$router.push('/login')">로그인 페이지로 이동</button><br />
            </div>
            <div v-if="isAuthenticated"><button type="button" @click="handleLogout()">로그아웃</button><br /></div>
            <button type="button" @click="$router.replace('/feedback/ai')">AI 피드백</button><br />
            <button v-if="role === 'TRAINER'" type="button" @click="$router.replace('/trainerpage')">
                트레이너 페이지</button
            ><br />
            <button v-if="role === 'REGULAR'" type="button" @click="$router.replace('/mypage')">마이페이지</button
            ><br />
        </main>
        <footer-compo />
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import jwtAxios, { API_SERVER_HOST } from '../../util/jwtUtil';
import HeaderCompo from './HeaderCompo.vue';
import FooterCompo from './FooterCompo.vue';
const host = API_SERVER_HOST;
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const username = computed(() => authStore.username);
const role = computed(() => authStore.role);

onMounted(() => {
    authStore.checkAuthStatus();
});

const handleLogout = () => {
    authStore.logout();
};
</script>

<style scoped>
.base-container {
    margin: -8px;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.main {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.router-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
