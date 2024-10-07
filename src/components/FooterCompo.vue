<template>
    <footer class="footer">
        <p class="copyright">&copy; 정도인. All rights reserved.</p>
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
    background-color: #f0f0f0;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.support-links {
    display: flex;
    margin: 20px;
    gap: 30px;
}

.support-links a {
    color: black;
    text-decoration: none;
}

.support-subtext {
    display: block;
    font-size: 11px;
}
</style>
