import { createWebHistory, createRouter } from 'vue-router';
import loginRoutes from './loginRoutes';
import AIFeedback from '../components/lesson/AIFeedback.vue';
import mypageRoutes from './mypageRoutes';
import trainerpageRoutes from './trainerpageRoutes';
import HomePage from '../pages/HomePage.vue';
import lessonpageRoutes from './lessonpageRoutes';
import modalRoutes from './modalRoutes';
import MiddleCompo from '../components/layouts/MiddleCompo.vue';

const routes = [
    {
        path: '/',
        component: MiddleCompo,
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
