import { createWebHistory, createRouter } from 'vue-router';
import AIFeedback from '../components/pages/AIFeedback.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        children: [
            {
                path: '/feedback/ai',
                component: AIFeedback,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
