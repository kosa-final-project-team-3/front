import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';
import TrainerPage from '../components/TrainerPage.vue';
import Room from '../components/Room.vue';
import OnlineFeedbackForm from '../pages/OnlineFeedbackForm.vue';
import ContactModal from '../pages/ContactModal.vue';
import UserAgreementModal from '../pages/UserAgreementModal.vue';

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
        path: '/onlinefeedbackform',
        name: 'OnlineFeedbackForm',
        component: OnlineFeedbackForm,
    },
    {
        path: '/useragreement',
        name: 'UserAgreementModal',
        component: UserAgreementModal,
    },
    {
        path: '/contact',
        name: 'ContactModal',
        component: ContactModal,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes],
});
export default router;
