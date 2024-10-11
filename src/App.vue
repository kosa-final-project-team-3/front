<template>
    <div class="app">
        <div v-if="useLayout">
            <header-compo />
            <middle-compo />
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
import MiddleCompo from './components/layouts/MiddleCompo.vue';

const route = useRoute();

const useLayout = computed(() => {
    console.log(route.meta.useLayout);
    return route.meta.useLayout !== false;
});
</script>

<style scoped>
.app {
    margin: -8px;
    height: 100vh;
}
</style>
