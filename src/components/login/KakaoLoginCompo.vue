<template>
    <div>
        <h1>Login Page</h1>
        <form ref="kakaoLoginForm" action="" method="get">
            <button class="btn btn_primary color_kakao" @click="handleKakaoLogin()">
                <span class="btn_ico_kakao">카카오 로그인</span>
            </button>
        </form>

        <a href="/">메인페이지로 이동</a> <br />
    </div>
</template>

<script setup>
import { useTemplateRef } from 'vue';
import { API_SERVER_HOST } from '../../util/jwtUtil';

const host = API_SERVER_HOST;
const kakaoLoginForm = useTemplateRef('kakaoLoginForm');

const handleKakaoLogin = () => {
    kakaoLoginForm.value.action = `http://${host}/oauth2/authorization/kakao`;
    kakaoLoginForm.value.submit();
};
</script>

<style scoped>
.btn.color_kakao {
    background-color: #fae100 !important;
    border-color: #fae100 !important;
    color: #3c1e1e !important;
}
.btn > span.btn_ico_kakao:before {
    content: '';
    display: inline-block;
    width: 22px;
    height: 20px;
    margin: 0 6px 0 0;
    background: url('/src/assets/ico_kakao.png') no-repeat;
    background-size: contain;
    vertical-align: middle;
}
</style>
