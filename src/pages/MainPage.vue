<template>
    <div>
        <div v-if="!isAuthenticated">
            <button type="button" @click="$router.push('/login')">로그인 페이지로 이동</button><br />
        </div>
        <div v-if="isAuthenticated"><button type="button" @click="handleLogout()">로그아웃</button><br /></div>
        <button type="button" @click="accessPrivateResource()">access private resource</button><br />
        <button type="button" @click="$router.replace('/feedback/ai')">AI 피드백</button><br />
        <button type="button" @click="$router.replace('/trainerpage')">트레이너 페이지</button><br />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import jwtAxios from '../util/jwtUtil';

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

<style scoped></style>
