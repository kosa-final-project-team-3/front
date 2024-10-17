<template>
    <div class="container">
        <div class="content-wrapper">
            <div class="lesson">
                <h3>{{ title }}</h3>
                <router-link class="lesson-item" v-for="link in links" :key="link.name" :to="{ name: link.name }">
                    {{ link.label }}
                </router-link>
            </div>
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

const props = defineProps({
    title: String,
    links: Array,
});

const showMBTI = ref(true);
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

.lesson {
    width: 250px;
    padding: 1rem;
}

.lesson h3 {
    font-size: 1.5em;
    padding: 0.5rem;
    margin: 1rem 1rem 2rem 1rem;
}

.lesson-item {
    font-size: 1.3em;
    display: block;
    color: #333;
    padding: 0.5rem;
    text-decoration: none;
    margin: 1rem;
    transition: color 0.3s ease;
}

.lesson-item:hover {
    color: #f13223;
}

.router-link-exact-active {
    font-weight: bold;
    color: #f13223;
}
</style>
