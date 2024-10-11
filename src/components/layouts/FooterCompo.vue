<template>
    <footer class="footer">
        <p class="copyright">&copy; 신박한이팀. All rights reserved.</p>
        <div class="support-links">
            <a href="#" @click.prevent="showUserAgreementModal"
                >이용약관<br /><span class="support-subtext">개인정보처리약관</span>
            </a>

            <a href="#" @click.prevent="showContactModal"
                >고객지원<br /><span class="support-subtext">문의하기</span>
            </a>
        </div>
    </footer>
</template>

<script setup>
const showUserAgreementModal = () => {
    window.open('/useragreement', 'UserAgreementModal', 'width=600,height=700');
};

const showContactModal = () => {
    window.open('/contact', 'ContactModal', 'width=600,height=700');
};
</script>

<style scoped>
.footer {
    background-color: #00bf63;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
}
.copyright {
    font-family: 'Do Hyeon', sans-serif;
    color: white;
    margin: 15px;
    align-items: center;
}

.support-links {
    display: flex;
    margin: 15px;
    gap: 30px;
}

.support-links a {
    color: white;
    font-family: 'Do Hyeon', sans-serif;
    text-decoration: none;
}

.support-subtext {
    display: block;
    font-size: 11px;
}
</style>
