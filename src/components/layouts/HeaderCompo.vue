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
                    <div class="dynamic-link">
                        <router-link v-if="authStore.isTrainer" to="/trainer">트레이너페이지</router-link>
                        <router-link v-if="isAuthenticated" to="/mypage">마이페이지</router-link>
                        <!-- <router-link to="/trainer">트레이너페이지</router-link> -->
                        <!-- <router-link to="/mypage">마이페이지</router-link> -->
                    </div>
                    <div class="auth-links">
                        <a v-if="!isAuthenticated" @click.prevent="openLogin">로그인</a>
                        <router-link v-if="isAuthenticated" to="/logout" @click="handleLogout">로그아웃</router-link>
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
    router.push('/');
};

const openLogin = () => {
    authStore.openLogin();
};
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
    justify-content: space-between;
}
.navbar-inner a {
    color: black;
    padding-top: 15px;
    text-decoration: none;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 1.4em;
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
    display: flex;
    margin-left: auto;
}
.navbar-login a {
    color: #545454;
    padding-top: 15px;
    text-decoration: none;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 1.3em;
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
