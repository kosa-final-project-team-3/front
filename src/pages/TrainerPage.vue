<template>
    <div class="trainer-page">
        <div class="content-wrapper">
            <aside class="sidebar">
                <h3>트레이너 페이지</h3>
                <router-link :to="{ name: 'TrainerPageUserInfo' }" class="sidebar-item">나의 정보</router-link>
                <router-link :to="{ name: 'TrainerPageLessons' }" class="sidebar-item">나의 레슨 관리</router-link>
                <router-link :to="{ name: 'TrainerPageUserDiary' }" class="sidebar-item">회원 일지 관리</router-link>
            </aside>

            <main class="main-content">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.trainer-page {
    display: flex;
    height: 100vh;
}

.content-wrapper {
    font-family: 'Do Hyeon', sans-serif;
}

.sidebar {
    width: 250px;
    padding: 1rem;
}

.sidebar h3 {
    font-size: 1.5em;
    padding: 0.5rem;
    margin: 1rem 1rem 2rem 1rem;
}

.sidebar-item {
    font-size: 1.3em;
    display: block;
    color: #333;
    padding: 0.5rem;
    text-decoration: none;
    margin: 1rem;
    transition: color 0.3s ease;
}

.sidebar-item:hover {
    color: #00bf63;
}
</style>
