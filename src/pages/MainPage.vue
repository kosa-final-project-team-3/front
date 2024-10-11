<template>
    <div>
        <div v-if="!isAuthenticated"><button type="button" @click="showLoginModal = true">로그인</button><br /></div>

        <div v-if="isAuthenticated">
            {{ username }}님 반갑습니다. <button type="button" @click="handleLogout()">로그아웃</button><br />
        </div>
        <button type="button" @click="$router.replace('/feedback/ai')">AI 피드백</button><br />
        <button v-if="role === 'TRAINER'" type="button" @click="$router.replace('/trainerpage')">트레이너 페이지</button
        ><br />
        <button v-if="role === 'REGULAR'" type="button" @click="$router.replace('/mypage')">마이페이지</button><br />
        <button type="button" @click="$router.push('/member/dashboard')">멤버 대시보드</button><br />

        <Modal v-if="showLoginModal" @close="showLoginModal = false">
            <KakaoLoginCompo />
        </Modal>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import jwtAxios from '../util/jwtUtil';
import Modal from '../components/common/Modal.vue';
import KakaoLoginCompo from '../components/login/KakaoLoginCompo.vue';

const authStore = useAuthStore();
const username = computed(() => authStore.username);
const role = computed(() => authStore.role);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userId = computed(() => authStore.id);
const showLoginModal = ref(false);

onMounted(() => {
    authStore.checkAuthStatus();
    console.log('user id is: ', userId.value);
});

const handleLogout = () => {
    authStore.logout();
};
</script>

<style scoped></style>
