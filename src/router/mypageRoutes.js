import MyPage from '../pages/MyPage.vue';
import MyPageUserInfo from '../components/reguler/MyPageUserInfo.vue';
import MyPageUserDiary from '../components/reguler/MyPageUserDiary.vue';

export default [
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
];
