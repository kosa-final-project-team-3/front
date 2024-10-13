import { createWebHistory, createRouter } from 'vue-router';
import loginRoutes from './loginRoutes';
import mypageRoutes from './mypageRoutes';
import trainerpageRoutes from './trainerpageRoutes';
import MemberDashboard from '../components/member/MemberDashboard.vue';
import HomePage from '../pages/HomePage.vue';
import lessonpageRoutes from './lessonpageRoutes';
import MiddleCompo from '../components/layouts/MiddleCompo.vue';
import modalRoutes from './modalRoutes';

const routes = [
    {
        path: '/',
        component: MiddleCompo,
        meta: { useLayout: true },
        children: [
            {
                path: '',
                name: 'HomePage',
                component: HomePage,
            },
            ...lessonpageRoutes,
        ],
    },
    {
        path: '/member/dashboard',
        component: MemberDashboard,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes, ...mypageRoutes, ...trainerpageRoutes, ...modalRoutes],
});
export default router;
