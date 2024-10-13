import OfflineLessonList from '../components/lesson/OfflineLessonList.vue';
import OnlineLessonPage from '../pages/OnlineLessonPage.vue';

export default [
    {
        path: '/lesson/offline',
        name: 'OfflineLessonList',
        component: OfflineLessonList,
    },
    {
        path: '/lesson/online',
        name: 'OnlineLessonPage',
        component: OnlineLessonPage,
    },
];
