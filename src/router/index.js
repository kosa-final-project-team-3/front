import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import loginRoutes from './loginRoutes';
import Room from '../components/Room.vue';
import MyPage from '../components/mypage/MyPage.vue';
import MyPageUserInfo from '../components/mypage/MyPageUserInfo.vue';
import TrainerPageLessons from '../components/trainerpage/TrainerPageLessons.vue';
import TrainerPage from '../components/trainerpage/TrainerPage.vue';
import TrainerPageUserInfo from '../components/trainerpage/TrainerPageUserInfo.vue';
import TrainerPageUserDiary from '../components/trainerpage/userdiary/TrainerPageUserDiary.vue';
import MyPageUserDiary from '../components/mypage/MyPageUserDiary.vue';
const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/room/:roomId',
        name: 'Room',
        component: Room,
        props: true,
    },
    {
        path: '/mypage',
        component: MyPage,
        children: [
            {
                path: 'userinfo',
                name: 'MyPageUserInfo',
                component: MyPageUserInfo,
            },
            {
                path: 'userdiary',
                name: 'MyPageUserDiary',
                component: MyPageUserDiary,
            },
        ],
    },
    {
        path: '/trainerpage',
        component: TrainerPage,
        children: [
            { path: 'trainerpageuserinfo', name: 'TrainerPageUserInfo', component: TrainerPageUserInfo },
            { path: 'lessons', name: 'TrainerPageLessons', component: TrainerPageLessons },
            { path: 'userdiary', name: 'TrainerPageUserDiary', component: TrainerPageUserDiary },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...loginRoutes],
});
export default router;
