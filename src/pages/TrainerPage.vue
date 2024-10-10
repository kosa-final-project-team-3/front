<template>
    <div class="trainer-page">
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
            <h1>트레이너 페이지</h1>
            <router-link :to="{ name: 'TrainerPageUserInfo' }" class="sub-nav-item">나의 정보</router-link>
            <router-link :to="{ name: 'TrainerPageLessons' }" class="sub-nav-item">내 레슨 관리</router-link>
            <router-link :to="{ name: 'TrainerPageUserDiary' }" class="sub-nav-item">회원 일지 관리</router-link>
            <router-link :to="{ name: '' }" class="sub-nav-item">미정</router-link>
          </nav>
        </aside>
        <main class="main-content">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  // 필요한 경우 여기에 추가 로직을 구현합니다.
  </script>
  
  <style scoped>
  .trainer-page {
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