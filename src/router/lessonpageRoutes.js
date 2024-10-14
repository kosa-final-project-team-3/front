import OfflineLessonList from '../components/lesson/OfflineLessonList.vue';
import OnlineLessonPage from '../pages/OnlineLessonPage.vue';
import OnlineLesson from '../components/lesson/OnlineLesson.vue';
import OnlineFeedback from '../components/lesson/OnlineFeedback.vue';

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
        children: [
            { path: '', name: 'OnlineLesson', component: OnlineLesson },
            { path: 'feedback', name: 'OnlineFeedback', component: OnlineFeedback },
        ],
    },
];
