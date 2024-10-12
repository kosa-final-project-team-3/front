import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';
import AIFeedback from '../components/lesson/AIFeedback.vue';
import mypageRoutes from './mypageRoutes';
import trainerpageRoutes from './trainerpageRoutes';
import MemberDashboard from '../components/member/MemberDashboard.vue';
const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/feedback/ai',
        name: 'AIFeedback',
        component: AIFeedback,
    },
    {
        path: '/member/dashboard',
        component: MemberDashboard,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes, ...mypageRoutes, ...trainerpageRoutes],
});
export default router;
