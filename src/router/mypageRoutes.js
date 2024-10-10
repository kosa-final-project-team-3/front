import MyPage from '../pages/MyPage.vue';
import Room from '../components/Room.vue';
import MyPageUserInfo from '../components/reguler/MyPageUserInfo.vue';
import TrainerPageLessons from '../components/trainer/TrainerPageLessons.vue';
import TrainerPage from '../pages/TrainerPage.vue';
import TrainerPageUserInfo from '../components/trainer/TrainerPageUserInfo.vue';
import TrainerPageUserDiary from '../components/trainer/userdiary/TrainerPageUserDiary.vue';
import MyPageUserDiary from '../components/reguler/MyPageUserDiary.vue';

export default [
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
