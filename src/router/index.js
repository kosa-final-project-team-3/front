import { createRouter, createWebHistory } from 'vue-router';
import TrainerPage from '../components/TrainerPage.vue';
import Room from '../components/Room.vue';



const routes = [
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
    routes,
});
export default router;
