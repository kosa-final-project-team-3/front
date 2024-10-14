<template>
    <div class="my-page">
        <div class="content-wrapper">
            <aside class="sidebar">
                <h3>마이페이지</h3>
                <router-link :to="{ name: 'MyPageUserInfo' }" class="sub-nav-item">나의 정보</router-link>
                <router-link :to="{ name: 'MyPageUserDiary' }" class="sub-nav-item">나의 운동 일지</router-link>
                <router-link :to="{ name: 'MyLesson' }" class="sub-nav-item">나의 레슨</router-link>
            </aside>
            <main class="main-content">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.my-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content-wrapper {
    display: flex;
    height: 100%;
}

.sidebar {
    font-family: 'Do Hyeon', sans-serif;
    width: 200px;
    padding: 1rem;
}

.sidebar h3 {
    font-size: 1.5em;
    padding: 0.5rem;
    margin: 1rem 1rem 2rem 1rem;
}

.sub-nav-item {
    text-decoration: none;
    color: #333;
    padding: 0.5rem;
    margin: 1rem;
    font-size: 1.3em;
    display: block;
    transition: color 0.3s ease;
}

.sub-nav-item:hover {
    color: #00bf63;
}

.main-content {
    flex-grow: 1;
    padding: 1rem;
}

.router-link-active {
    font-weight: bold;
    color: #00bf63;
}
</style>
