import { createWebHistory, createRouter } from 'vue-router';
import AIFeedback from '../components/pages/AIFeedback.vue';
import AIFeedback_2 from '../components/pages/AIFeedback_2.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        children: [
            {
                path: '/feedback/ai',
                component: AIFeedback,
            },
            {
                path: '/feedback/ai2',
                component: AIFeedback_2,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
