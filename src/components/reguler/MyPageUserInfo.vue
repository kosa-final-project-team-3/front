<template>
    <div class="my-page-user-info" v-if="isAuthenticated">
        <h2>나의 정보</h2>
        <form @submit.prevent="saveUserInfo">
            <div class="form-group">
                <label for="username">이름:</label>
                <input id="username" v-model="userInfo.username" type="text" required />
            </div>
            <div class="form-group">
                <label for="birth">생년월일:</label>
                <input id="birth" v-model="userInfo.birth" type="date" required />
            </div>
            <div class="form-group">
                <label for="gender">성별:</label>
                <select id="gender" v-model="userInfo.gender" required>
                    <option value="m">남자</option>
                    <option value="f">여자</option>
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
                <label for="tall">신장 (cm):</label>
                <input id="tall" v-model="userInfo.tall" type="number" required />
            </div>
            <div class="form-group">
                <label for="bodyWeight">체중 (kg):</label>
                <input id="bodyWeight" v-model="userInfo.bodyWeight" type="number" required />
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
import { ref, reactive, computed, onMounted } from 'vue';
import ExpertPopup from './ExpertPopup.vue';
import { useAuthStore } from '../../stores/authStore';
import jwtAxios, { API_SERVER_HOST } from '../../util/jwtUtil';

const host = API_SERVER_HOST;
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const userInfo = reactive({
    username: '',
    birth: '',
    gender: '',
    phone: '',
    address: '',
    tall: '',
    bodyWeight: '',
});

const originalUserInfo = ref(null);
const isExpert = ref(false);
const isExpertPopupVisible = ref(false);

onMounted(async () => {
    await authStore.checkAuthStatus();
    if (isAuthenticated.value) {
        await fetchUserInfo();
    }
});

const fetchUserInfo = async () => {
    try {
        const username = authStore.username;
        console.log(username);
        const res = await jwtAxios.get(`http://${host}/api/member/info`, {
            params: { username },
        });
        console.log(res);
        Object.assign(userInfo, res.data);
        originalUserInfo.value = { ...userInfo };
        // authStore에 memberId 저장
        authStore.memberId = res.data.memberId;
    } catch (error) {
        console.error('Failed to fetch user info:', error);
    }
};

const saveUserInfo = async () => {
    try {
        const updatedUserInfo = {
            ...userInfo,
            memberId: authStore.memberId, // authStore에서 memberId 가져오기
        };
        console.log(updatedUserInfo);

        const response = await jwtAxios.put(`http://${host}/api/member/update`, updatedUserInfo);
        Object.assign(userInfo, response.data);
        originalUserInfo.value = { ...userInfo };
        alert('사용자 정보가 성공적으로 저장되었습니다.');
    } catch (error) {
        console.error('Failed to save user info:', error);
        alert('사용자 정보 저장에 실패했습니다.');
    }
};

const cancelEdit = () => {
    if (originalUserInfo.value) {
        Object.assign(userInfo, originalUserInfo.value);
    }
};

const showExpertPopup = () => {
    isExpertPopupVisible.value = true;
};

const closeExpertPopup = () => {
    isExpertPopupVisible.value = false;
};

const submitExpertApplication = ({ certificationCategories, attachedFiles }) => {
    console.log('Submitting expert application:', certificationCategories);
    console.log('Attached files:', attachedFiles);

    // 임시로 전문가 정보 저장 (실제로는 API 응답 후 처리해야 함)
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
