<template>
    <div class="app">
        <div v-if="useLayout">
            <header-compo />
            <router-view />
            <footer-compo />
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import HeaderCompo from './components/layouts/HeaderCompo.vue';
import FooterCompo from './components/layouts/FooterCompo.vue';

const route = useRoute();

const useLayout = computed(() => {
    return route.meta.useLayout !== false;
});
</script>

<style scoped>
.app {
    margin: -8px;
    height: 100vh;
}
</style>
