import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';

const routes = [
    {
        path: '/',
        component: MainPage,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes],
});
export default router;
