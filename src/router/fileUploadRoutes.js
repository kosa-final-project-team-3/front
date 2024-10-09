import FileSearchPage from '../pages/FileSearchPage.vue';
import FileUploadPage from '../pages/FileUploadPage.vue';

export default [
    {
        path: '/fileupload',
        name: 'FileUpload',
        component: FileUploadPage,
    },
    {
        path: '/filesearch',
        name: 'FileSearch',
        component: FileSearchPage,
    },
];
