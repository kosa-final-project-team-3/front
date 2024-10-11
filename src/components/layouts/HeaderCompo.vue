<template>
    <header class="header">
        <div class="logo-container">
            <div class="logo-container-inner">
                <router-link to="/">
                    <img class="logo" src="https://kosa-final-project-team-3.github.io/cdn/logo.png" alt="정도인" />
                </router-link>
            </div>

            <div class="navbar-container">
                <div class="navbar-inner">
                    <router-link to="/lesson/offline">오프라인 레슨</router-link>
                    <router-link to="/lesson/online">온라인 레슨</router-link>
                    <router-link to="/qna">질문 게시판</router-link>
                </div>
                <div class="navbar-login">
                    <router-link v-if="authStore.isTrainer" to="/trainer">트레이너페이지</router-link>
                    <router-link v-if="authStore.isAuthenticated" to="/mypage">마이페이지</router-link>
                    <!-- <router-link to="/trainer">트레이너페이지</router-link> -->
                    <!-- <router-link to="/mypage">마이페이지</router-link> -->
                    <router-link v-if="!authStore.isAuthenticated" to="/login">로그인</router-link>
                    <router-link v-if="authStore.isAuthenticated" to="/logout">로그아웃</router-link>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();

authStore.checkAuthStatus();
</script>
<style scoped>
.header {
    width: 100%;
    padding: 10px;
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
}
.logo-container-inner > a {
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
}
.logo {
    width: 120px;
    height: 60px;
    justify-content: center;
}

.navbar-container {
    display: flex;
    flex: 1;
    align-items: center;
    text-align: center;
}
.navbar-inner {
    width: 60%;
    left: 5%;
    gap: 0px;
    display: flex;
    align-items: center;
}
.navbar-inner a {
    color: black;
    padding-top: 15px;
    text-decoration: none;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 1.2em;
    font-weight: bold;
    position: relative;
    flex-grow: 1;
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
    border-bottom: 3px solid #00bf63;
    justify-content: center;
}
.navbar-login {
    width: 40%;
    /* right: 5%; */
    display: flex;
    align-items: right;
}
.navbar-login a {
    color: #545454;
    padding-top: 15px;
    text-decoration: none;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 1.1em;
    font-weight: bold;
    position: relative;
    flex-grow: 1;
    text-align: center;
    white-space: nowrap;
}
.navbar-login a:hover::after {
    content: '';
    width: 70%;
    height: 2px;
    display: block;
    position: absolute;
    left: 15%;
    margin-top: 10px;
    border-bottom: 3px solid #00bf63;
    justify-content: right;
}
</style>
