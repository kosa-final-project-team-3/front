import { createRouter } from 'vue-router';
import LoginCompo from '@/components/login/LoginCompo.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: LoginCompo,
        children: [],
    },
];

const router = createRouter({
    routes,
});

export default router;
