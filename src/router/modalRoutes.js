import ContactModal from '../components/modal/ContactModal.vue';
import UserAgreementModal from '../components/modal/UserAgreementModal.vue';

export default [
    {
        path: '/contact',
        name: 'ContactModal',
        component: ContactModal,
    },
    {
        path: '/useragreement',
        name: 'UserAgreementModal',
        component: UserAgreementModal,
    },
];
