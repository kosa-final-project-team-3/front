<template>
    <div class="container">
        <div class="content-wrapper">
            <aside class="sidebar">
                <h3>온라인 레슨</h3>
                <router-link class="sidebar-item" :to="{ name: 'OnlineLesson' }">온라인 PT</router-link>
                <router-link class="sidebar-item" :to="{ name: 'OnlineFeedback' }">온라인 피드백</router-link>
            </aside>
        </div>

        <div class="main-content">
            <router-view />
            <MBTICompo />
        </div>
    </div>
</template>

<script setup>
import MBTICompo from '../components/MBTI/MBTICompo.vue';
</script>
<style scoped>
.container {
    display: flex;
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
    color: #f13223;
}
</style>
