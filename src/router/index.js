import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes: [...routes],
});
export default router;
