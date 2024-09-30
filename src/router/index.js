import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
    },
];
const router = createRouter({
    history: createMemoryHistory(),
    routes,
});
export default router;
