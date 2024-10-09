import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';
import TrainerPage from '../components/TrainerPage.vue';
import Room from '../components/Room.vue';
import AIFeedback from '../components/pages/AIFeedback.vue';

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
    }
  ];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes],
});
export default router;
