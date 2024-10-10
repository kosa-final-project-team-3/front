import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';
import HomePage from '../pages/HomePage.vue';
import TrainerPage from '../components/TrainerPage.vue';
import Room from '../components/Room.vue';
import AIFeedback from '../components/lesson/AIFeedback.vue';
import OnlineFeedbackForm from '../pages/OnlineFeedbackForm.vue';
import ContactModal from '../pages/ContactModal.vue';
import UserAgreementModal from '../pages/UserAgreementModal.vue';
import OfflineLessonList from '../pages/OfflineLessonList.vue';

import mypageRoutes from './mypageRoutes';
import trainerpageRoutes from './trainerpageRoutes';
import HomePage from '../pages/HomePage.vue';
import lessonpageRoutes from './lessonpageRoutes';
import modalRoutes from './modalRoutes';
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
