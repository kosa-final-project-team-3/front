<template>
    <div class="container">
        <div class="content-wrapper">
            <LessonPage :title="'오프라인 레슨'" :links="links" />
        </div>

        <div class="main-content">
            <router-view />
            <MBTICompo />
        </div>
    </div>
</template>

<script setup>
import MBTICompo from '../components/MBTI/MBTICompo.vue';
import LessonPage from './LessonPage.vue';

const links = [
    { name: 'PersonalLessonList', label: '개인 레슨' },
    { name: 'GroupLessonList', label: '그룹 레슨' },
];
</script>

<style scoped>
.container {
    display: flex;
    gap: 45px;
}

.content-wrapper {
    font-family: 'Do Hyeon', sans-serif;
    border-right: 1px solid #e0e0e0;
}
</style>
