<template>
    <div class="container">
        <div class="content-wrapper">
            <aside class="sidebar">
                <h3>오프라인 레슨</h3>
                <router-link
                    class="sidebar-item"
                    :to="{ name: 'PersonalLessonList' }"
                    :class="{ active: $route.name === 'PersonalLessonList' }"
                >
                    개인 레슨
                </router-link>
                <router-link
                    class="sidebar-item"
                    :to="{ name: 'GroupLessonList' }"
                    :class="{ active: $route.name === 'GroupLessonList' }"
                    >그룹 레슨</router-link
                >
            </aside>
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

const showMBTI = ref(true);
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

.sidebar-item.active {
    color: #f13223;
}

.search-sort-container {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}

.search-container {
    display: flex;
}
.search-container form {
    display: flex;
    gap: 10px;
}

.search-container button {
    background-color: #f13223;
    color: white;
    border: 1px solid #f13223;
}

.sort-container select {
    margin-right: 20px;
}

.search-container input {
    width: 200px;
}

select,
input,
button {
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #000000;
}
</style>
