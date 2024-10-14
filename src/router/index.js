import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';
import AIFeedback from '../components/lesson/AIFeedback.vue';
import mypageRoutes from './mypageRoutes';
import trainerpageRoutes from './trainerpageRoutes';
import HomePage from '../pages/HomePage.vue';
import lessonpageRoutes from './lessonpageRoutes';
import modalRoutes from './modalRoutes';
import MBTIPage from '../components/mainpage/MBTIPage.vue';
const routes = [
    {
        path: '/',
        component: MainPage,
        children: [
            {
                path: '',
                name: 'HomePage',
                component: HomePage,
            },
            {
                path: '/mbti',
                name: 'MBTIPage',
                component: MBTIPage,
            },
            ...lessonpageRoutes,
        ],
    },
    {
        path: '/feedback/ai',
        name: 'AIFeedback',
        component: AIFeedback,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes, ...mypageRoutes, ...trainerpageRoutes, ...modalRoutes],
});
export default router;
