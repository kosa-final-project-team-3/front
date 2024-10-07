<template>
    <header class="header">
        <div class="logo">
            <h2>정도인</h2>
        </div>
        <div class="navbar">
            <div class="left-nav">
                <router-link to="/offline-lessons">오프라인 레슨</router-link>
                <router-link to="/online-lessons">온라인 레슨</router-link>
                <router-link to="/questions">질문 게시판</router-link>
            </div>
            <div class="right-nav">
                <router-link to="/login">로그인/회원가입</router-link>
            </div>
        </div>
    </header>
</template>
<script setup></script>
<style scoped>
.header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar {
    display: flex;
    flex-grow: 1;
}

.left-nav {
    margin-left: 100px;
    gap: 50px;
    display: flex;
}

.right-nav {
    margin-left: auto;
}

.navbar a {
    color: black;
    padding: 10px;
    text-decoration: none;
}

.left-nav a:hover {
    background-color: black;
    color: white;
    border-radius: 4px;
}
</style>
