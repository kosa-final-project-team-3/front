import Room from '../components/trainer/Room.vue';
import TrainerPageLessons from '../components/trainer/TrainerPageLessons.vue';
import TrainerPage from '../pages/TrainerPage.vue';
import TrainerPageUserInfo from '../components/trainer/TrainerPageUserInfo.vue';
import TrainerPageUserDiary from '../components/trainer/userdiary/TrainerPageUserDiary.vue';

export default [
    {
        path: '/room/:roomId',
        name: 'Room',
        component: Room,
        props: true,
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
