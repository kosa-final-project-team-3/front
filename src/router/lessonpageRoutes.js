import OfflineLessonList from '../components/lesson/OfflineLessonList.vue';
import OnlineLessonList from '../components/lesson/OnlineLessonList.vue';
export default [
    {
        path: '/offlinelessonlist',
        name: 'OfflineLessonList',
        component: OfflineLessonList,
    },
    {
        path: '/online',
        name: 'OnlineLessonList',
        component: OnlineLessonList,
    },
];
