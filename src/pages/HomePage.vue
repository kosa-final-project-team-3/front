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
            <router-link
                v-for="(lesson, index) in lessonTypes"
                :key="index"
                :to="lesson.route"
                custom
                v-slot="{ navigate }"
            >
                <div
                    class="lesson-type"
                    :class="{ active: lesson.isActive }"
                    @mouseenter="setActive(index, true)"
                    @mouseleave="setActive(index, false)"
                    @click="navigate"
                >
                    <img :src="lesson.icon" :alt="lesson.alt" class="lesson-icon" />
                    {{ lesson.text }}
                </div>
            </router-link>
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

const lessonTypes = ref([
    {
        icon: 'https://kosa-final-project-team-3.github.io/cdn/icon_personal.png',
        alt: '개인 레슨 아이콘',
        text: '개인 레슨',
        isActive: false,
        route: '/lesson/personal',
    },
    {
        icon: 'https://kosa-final-project-team-3.github.io/cdn/icon_group.png',
        alt: '그룹 레슨 아이콘',
        text: '그룹 레슨',
        isActive: false,
        route: '/lesson/group',
    },
    {
        icon: 'https://kosa-final-project-team-3.github.io/cdn/icon_online.png',
        alt: '온라인 레슨 아이콘',
        text: '온라인 레슨',
        isActive: false,
        route: '/lesson/online',
    },
    {
        icon: 'https://kosa-final-project-team-3.github.io/cdn/icon_ai.png',
        alt: 'AI 피드백 아이콘',
        text: 'AI 피드백',
        isActive: false,
        route: '/lesson/ai',
    },
]);

const setActive = (index, isActive) => {
    lessonTypes.value[index].isActive = isActive;
};
</script>
<style scoped>
.lesson-container {
    display: flex;
    margin: 50px;
    justify-content: center;
    height: 120px;
}

.lesson-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    margin: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    transition: all 0.3s ease;
    cursor: pointer;
}

.lesson-type.active {
    background-color: #00bf63;
    color: white;
}
.lesson-type.active img {
    filter: brightness(0) invert(1);
}

.lesson-type a {
    text-decoration: none;
    color: black;
}
.lesson-type img {
    width: 50px;
    height: 50px;
}

.lesson-icon {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
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

.popular-lesson {
    width: 80vw;
    margin: 0 auto;
}

.banner {
    display: flex;
    justify-content: center;
}
.swiper-slide {
    display: flex;
    justify-content: center;
}
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
    color: #00bf63;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
}
:deep(.swiper-button-next) {
    right: 7%;
}
:deep(.swiper-button-prev) {
    left: 7%;
}
:deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    background: rgba(0, 191, 99, 0.5); /* #00bf63 with 50% opacity */
    opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
    background: #00bf63; /* Active dot color */
}
.banner-image {
    width: 70%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
}
</style>
