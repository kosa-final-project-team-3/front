<template>
    <div class="my-page-user-info">
        <h2>나의 정보</h2>
        <form @submit.prevent="saveUserInfo">
            <div class="form-group">
                <label for="name">이름:</label>
                <input id="name" v-model="userInfo.name" type="text" required />
            </div>
            <div class="form-group">
                <label for="birthdate">생년월일:</label>
                <input id="birthdate" v-model="userInfo.birthdate" type="date" required />
            </div>
            <div class="form-group">
                <label for="gender">성별:</label>
                <select id="gender" v-model="userInfo.gender" required>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </select>
            </div>
            <div class="form-group">
                <label for="phone">핸드폰 번호:</label>
                <input id="phone" v-model="userInfo.phone" type="tel" required />
            </div>
            <div class="form-group">
                <label for="address">주소:</label>
                <input id="address" v-model="userInfo.address" type="text" required />
            </div>
            <div class="form-group">
                <label for="height">신장 (cm):</label>
                <input id="height" v-model="userInfo.height" type="number" required />
            </div>
            <div class="form-group">
                <label for="weight">체중 (kg):</label>
                <input id="weight" v-model="userInfo.weight" type="number" required />
            </div>


            <button v-if="!isExpert" type="button" @click="showExpertPopup" class="btn-become-expert">
                전문가로 전환하기
            </button>

            <div class="form-actions">
                <button type="button" @click="cancelEdit" class="btn-cancel">취소</button>
                <button type="submit" class="btn-save">저장하기</button>
            </div>
        </form>
    </div>
    <ExpertPopup :is-visible="isExpertPopupVisible" @close="closeExpertPopup" @submit="submitExpertApplication" />
</template>

<script setup>
import { ref, reactive } from 'vue';
import ExpertPopup from './ExpertPopup.vue';

const userInfo = reactive({
    name: '',
    birthdate: '',
    gender: '',
    phone: '',
    address: '',
    height: '',
    weight: '',
});

const originalUserInfo = ref(null);
const isExpert = ref(false);
const expertInfo = ref([]);
const saveUserInfo = () => {
    // TODO: Implement API call to save user info
    console.log('Saving user info:', userInfo);
    // Update originalUserInfo after successful save
    originalUserInfo.value = { ...userInfo };
};

const cancelEdit = () => {
    // Reset form to original values
    if (originalUserInfo.value) {
        Object.assign(userInfo, originalUserInfo.value);
    }
};

const isExpertPopupVisible = ref(false);

const showExpertPopup = () => {
    isExpertPopupVisible.value = true;
};

const closeExpertPopup = () => {
    isExpertPopupVisible.value = false;
};

const submitExpertApplication = ({ certificationCategories, attachedFiles }) => {
    // TODO: Implement API call to submit expert application
    console.log('Submitting expert application:', certificationCategories);
    console.log('Attached files:', attachedFiles);

    // 임시로 전문가 정보 저장 (실제로는 API 응답 후 처리해야 함)
    expertInfo.value = certificationCategories;
    isExpert.value = true;
    closeExpertPopup();
};
</script>

<style scoped>
.my-page-user-info {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

label {
    flex: 0 0 120px; /* 라벨의 너비를 고정 */
    margin-right: 1rem;
}

input,
select {
    flex: 1; /* 입력 필드가 남은 공간을 차지하도록 */
    padding: 0.5rem;
}

.btn-become-expert {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #cfffe5;
    border: none;
    cursor: pointer;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.btn-cancel,
.btn-save {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
}

.btn-save {
    background-color: #4caf50;
    color: white;
    border: none;
}

.btn-cancel {
    background-color: #f44336;
    color: white;
    border: none;
}

.expert-info {
    margin-top: 2rem;
    border-top: 1px solid #e0e0e0;
    padding-top: 1rem;
}

.expert-category {
    margin-bottom: 1rem;
}

.expert-category h4 {
    margin-bottom: 0.5rem;
}

.expert-category ul {
    list-style-type: none;
    padding-left: 1rem;
}

.expert-category li {
    margin-bottom: 0.25rem;
}
</style>
