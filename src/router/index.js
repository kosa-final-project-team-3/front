import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';
import TrainerPage from '../components/TrainerPage.vue';
import Room from '../components/Room.vue';
import fileUploadRoutes from './fileUploadRoutes';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes, ...fileUploadRoutes],
});
export default router;
