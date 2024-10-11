import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';
import AIFeedback from '../components/lesson/AIFeedback.vue';
import mypageRoutes from './mypageRoutes';
import trainerpageRoutes from './trainerpageRoutes';
const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/trainerpage',
        name: 'TrainerPage',
        component: TrainerPage,
    },
    {
        path: '/room/:roomId',
        name: 'Room',
        component: Room,
        props: true,
    },
    {
        path: '/feedback/ai',
        name: 'AIFeedback',
        component: AIFeedback,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes, ...mypageRoutes, ...trainerpageRoutes],
});
export default router;
