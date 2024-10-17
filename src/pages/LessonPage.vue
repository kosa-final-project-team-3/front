<template>
    <div class="lesson">
        <h3>{{ title }}</h3>
        <router-link class="lesson-item" v-for="link in links" :key="link.name" :to="{ name: link.name }">
            {{ link.label }}
        </router-link>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    links: Array,
});
</script>

<style scoped>
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
