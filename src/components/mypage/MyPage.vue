<template>
    <div class="my-page">
        <header>
            <nav class="main-nav">
                <router-link :to="{ name: '' }" class="nav-item">정도인</router-link>
                <router-link :to="{ name: '' }" class="nav-item">오프라인 레슨</router-link>
                <router-link :to="{ name: '' }" class="nav-item">온라인 레슨</router-link>
                <router-link :to="{ name: '' }" class="nav-item">질문 게시판</router-link>
                <router-link :to="{ name: '' }" class="nav-item">로그아웃</router-link>
            </nav>
        </header>
        <div class="content-wrapper">
            <aside class="sidebar">
                <nav class="sub-nav">
                    <h1>마이페이지</h1>
                    <router-link :to="{ name: 'MyPageUserInfo' }" class="sub-nav-item">나의 정보</router-link>
                    <router-link :to="{ name: '' }" class="sub-nav-item">수강 신청 내역</router-link>
                    <router-link :to="{ name: '' }" class="sub-nav-item">나의 운동 일지</router-link>
                    <router-link :to="{ name: '' }" class="sub-nav-item">내가 쓴 글 조회</router-link>
                </nav>
            </aside>
            <main class="main-content">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userType = ref('regular'); // 기본값은 일반 사용자
onMounted(async () => {
    // 여기서 사용자 정보를 가져오는 API 호출을 수행합니다.
    // 예를 들어:
    // const userData = await fetchUserData();
    // userType.value = userData.type;

    // 임시로 사용자 유형을 설정 (실제로는 API 응답에 따라 설정해야 함)
    userType.value = 'instructor'; // 또는 'instructor'
});
</script>

<style scoped>
.my-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

header {
    background-color: #f0f0f0;
    padding: 1rem;
}

.main-nav {
    display: flex;
    justify-content: space-around;
}

.nav-item {
    text-decoration: none;
    color: #333;
    padding: 0.5rem 1rem;
}

.content-wrapper {
    display: flex;
    flex-grow: 1;
}

.sidebar {
    width: 200px;
    background-color: #f8f8f8;
    padding: 1rem;
}

.sub-nav {
    display: flex;
    flex-direction: column;
}

.sub-nav-item {
    text-decoration: none;
    color: #333;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
}

.main-content {
    flex-grow: 1;
    padding: 1rem;
}

.router-link-active {
    font-weight: bold;
    background-color: #e0e0e0;
}
</style>
