<template>
    <div>
        <div v-if="!isAuthenticated">
            <button type="button" @click="$router.push('/login')">로그인 페이지로 이동</button><br />
        </div>

        <div v-if="isAuthenticated">
            {{ username }}님 반갑습니다. <button type="button" @click="handleLogout()">로그아웃</button><br />
        </div>
        <button type="button" @click="$router.replace('/feedback/ai')">AI 피드백</button><br />
        <button v-if="role === 'TRAINER'" type="button" @click="$router.replace('/trainerpage')">트레이너 페이지</button
        ><br />
        <button v-if="role === 'REGULAR'" type="button" @click="$router.replace('/mypage')">마이페이지</button><br />
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const username = computed(() => authStore.username);
const role = computed(() => authStore.role);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userId = computed(() => authStore.id);

onMounted(() => {
    authStore.checkAuthStatus();
    console.log('user id is: ', userId.value);
});

const handleLogout = () => {
    authStore.logout();
};
</script>

<style scoped></style>
