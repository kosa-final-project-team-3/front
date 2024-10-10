<template>
    <div class="home-container">
        <div class="banner">
            <img class="banner-ad" src="../assets/banner-ad.jpg" alt="배너 광고" />
        </div>
        <div class="lesson-container">
            <div class="lesson-type">
                <img src="../assets/personal-icon.png" alt="개인 레슨 아이콘" class="lesson-icon" />개인 레슨
            </div>
            <div class="lesson-type">
                <img src="../assets/group-icon.png" alt="그룹 레슨 아이콘" class="lesson-icon" />그룹 레슨
            </div>
            <div class="lesson-type">
                <router-link to="/onlinefeedbackform" class="router-decoration">
                    <img src="../assets/online-icon.png" alt="온라인 레슨 아이콘" class="lesson-icon" />온라인 레슨
                </router-link>
            </div>
            <div class="lesson-type">
                <img src="../assets/ai-icon.png" alt="AI 피드백 아이콘" class="lesson-icon" />AI 피드백
            </div>
        </div>
        <div class="popular-lesson">
            <h2>지금 가장 인기 있는 레슨</h2>
            <div class="lesson-list">
                <div class="lesson-item"></div>
                <div class="lesson-item"></div>
                <div class="lesson-item"></div>
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style scoped>
.banner-ad {
    width: 80vw;
    height: 40vh;
    border-radius: 10px;
}

.lesson-container {
    display: flex;
    margin: 20px;
}

.lesson-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lesson-type a {
    text-decoration: none;
    color: black;
}

.lesson-icon {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50px;
    height: 50px;
}

.popular-lesson {
    width: 80vw;
}

.lesson-list {
    display: flex;
    margin: 20px;
    gap: 20px;
    justify-content: center;
}

.lesson-item {
    width: 400px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
