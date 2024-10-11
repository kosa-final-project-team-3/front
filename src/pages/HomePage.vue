<template>
    <div class="home-container">
        <div class="banner">
            <swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="30"
                :loop="true"
                :pagination="{ clickable: true }"
                :navigation="true"
                class="mySwiper"
            >
                <swiper-slide v-for="(image, index) in bannerImages" :key="index">
                    <img :src="image.src" :alt="image.alt" class="banner-image" />
                </swiper-slide>
            </swiper>
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
<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Pagination, Navigation];

const bannerImages = ref([
    { src: 'https://kosa-final-project-team-3.github.io/cdn/banner_1.png', alt: 'Banner 1' },
    { src: 'https://kosa-final-project-team-3.github.io/cdn/banner_2.png', alt: 'Banner 2' },
    { src: 'https://kosa-final-project-team-3.github.io/cdn/banner_3.png', alt: 'Banner 3' },
    { src: 'https://kosa-final-project-team-3.github.io/cdn/banner_4.png', alt: 'Banner 4' },
]);
</script>
<style scoped>
.lesson-container {
    display: flex;
    margin: 20px;
    justify-content: center;
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
    margin: 0 auto;
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
.banner {
    display: flex;
    justify-content: center;
}
.swiper-slide {
    display: flex;
    justify-content: center;
}
.banner-image {
    width: 70%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
}
</style>
