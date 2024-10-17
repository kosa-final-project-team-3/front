<template>
    <header class="header">
        <div class="logo-container">
            <div class="logo-container-inner">
                <router-link to="/" class="logo-link">
                    <img class="logo" src="https://kosa-final-project-team-3.github.io/cdn/logo.png" alt="정도인" />
                </router-link>
            </div>

            <div class="navbar-container">
                <div class="navbar-inner">
                    <router-link
                        to="/lesson/offline"
                        :class="{
                            active: $route.path === '/lesson/offline' || $route.path === '/lesson/offline/group',
                        }"
                        >오프라인 레슨</router-link
                    >
                    <router-link
                        to="/lesson/online"
                        :class="{
                            active: $route.path === '/lesson/online' || $route.path === '/lesson/online/feedback',
                        }"
                        >온라인 레슨</router-link
                    >
                    <router-link to="/feedback/ai" :class="{ active: $route.path === '/feedback/ai' }"
                        >AI 피드백</router-link
                    >
                </div>
                <div class="navbar-login">
                    <div class="dynamic-link">
                        <router-link v-if="isTrainer" to="/trainer/info">트레이너페이지</router-link>
                        <router-link v-if="isAuthenticated" to="/mypage">마이페이지</router-link>
                    </div>
                    <div class="auth-links">
                        <a v-if="!isAuthenticated" @click.prevent="openLogin">로그인</a>
                        <router-link v-if="isAuthenticated" to="/" @click="handleLogout">로그아웃</router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import jwtAxios, { API_SERVER_HOST } from '../../util/jwtUtil';

const host = API_SERVER_HOST;
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isTrainer = computed(() => authStore.role === 'TRAINER');
authStore.checkAuthStatus();

const handleLogout = () => {
    authStore.logout();
};

const openLogin = () => {
    authStore.openLogin();
};
</script>
<style scoped>
.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.header a {
    width: 100vw;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.logo-container {
    width: 100vw;
    display: flex;
    height: 100%;
    flex-direction: column;
    margin-top: 20px;
}
.logo-container-inner > a {
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
}
.logo-container-inner {
    display: flex;
    justify-content: center;
}

.logo-link {
    display: inline-block;
    line-height: 0;
}

.logo {
    width: 180px;
    height: 100px;
    justify-content: center;
}

.navbar-container {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0px;
    background-color: #f7edec;
}

.navbar-inner {
    width: 60%;
    left: 5%;
    gap: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.navbar-inner a {
    color: black;
    padding-top: 15px;
    text-decoration: none;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 2em;
    position: relative;
    text-align: center;
    white-space: nowrap;
}
.navbar-inner a:hover::after {
    content: '';
    width: 70%;
    height: 2px;
    display: block;
    position: absolute;
    left: 15%;
    margin-top: 10px;
    border-bottom: 3px solid #f13223;
    justify-content: center;
}
.navbar-inner a.active {
    font-weight: bold;
    color: #f13223;
}
.navbar-inner a.active::after {
    content: '';
    width: 70%;
    height: 2px;
    display: block;
    position: absolute;
    left: 15%;
    margin-top: 10px;
    border-bottom: 3px solid #f13223;
    justify-content: center;
}
.navbar-login {
    width: 40%;
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
}
.navbar-login a {
    color: #545454;
    padding-top: 15px;
    text-decoration: none;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 1.5em;
    position: relative;
    flex-grow: 1;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
}
.navbar-login a:hover::after {
    content: '';
    width: 70%;
    height: 2px;
    display: block;
    position: absolute;
    left: 15%;
    margin-top: 10px;
    border-bottom: 3px solid #f13223;
    justify-content: right;
}

.dynamic-link,
.auth-links {
    display: flex;
}

.dynamic-link a,
.auth-links a {
    width: 13vw;
}
</style>
