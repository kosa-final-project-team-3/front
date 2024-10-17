<template>
    <div class="container">
        <div class="content-wrapper">
            <LessonPage :title="'온라인 레슨'" :links="links" />
        </div>

        <div class="main-content">
            <router-view />
            <MBTICompo v-if="showMBTI" @close="showMBTI = false" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MBTICompo from '../components/MBTI/MBTICompo.vue';
import LessonPage from './LessonPage.vue';

const links = [
    { name: 'OnlineLesson', label: '온라인 PT' },
    { name: 'OnlineFeedback', label: '온라인 피드백' },
];
</script>

<style scoped>
.container {
    display: flex;
}

.content-wrapper {
    font-family: 'Do Hyeon', sans-serif;
}
</style>
