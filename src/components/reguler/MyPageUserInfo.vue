<template>
    <div class="my-page-user-info" v-if="isAuthenticated">
        <h2>나의 정보</h2>
        <form @submit.prevent="saveUserInfo">
            <div class="form-group" v-for="(value, key) in displayUserInfo" :key="key">
                <label :for="key">{{ getLabel(key) }}:</label>
                <template v-if="key === 'gender' && !isEditing">
                    <input :id="key" :value="getGenderDisplay(value)" disabled />
                </template>
                <template v-else-if="key === 'gender' && isEditing">
                    <select :id="key" v-model="userInfo[key]" required>
                        <option value="m">남자</option>
                        <option value="f">여자</option>
                    </select>
                </template>
                <template v-else>
                    <input
                        :id="key"
                        v-model="userInfo[key]"
                        :type="getInputType(key)"
                        :disabled="!isEditing"
                        required
                    />
                </template>
            </div>

            <button v-if="role !== 'TRAINER'" type="button" @click="showExpertPopup" class="btn-become-expert">
                전문가로 전환하기
            </button>

            <div class="form-actions">
                <button v-if="isEditing" type="button" @click="cancelEdit" class="btn-cancel">취소</button>
                <button v-if="!isEditing" type="button" @click="startEditing" class="btn-edit">수정하기</button>
                <button v-else type="submit" class="btn-save">저장하기</button>
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
const memberId = computed(() => authStore.id);
const role = computed(() => authStore.role);

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
const isExpertPopupVisible = ref(false);
const isEditing = ref(false);

onMounted(async () => {
    await authStore.checkAuthStatus();
    if (isAuthenticated.value) {
        await fetchUserInfo();
    }
});

const fetchUserInfo = async () => {
    try {
        const username = authStore.username;
        const res = await jwtAxios.get(`http://${host}/api/member/info`, {
            params: { username },
        });
        Object.assign(userInfo, res.data);
        originalUserInfo.value = { ...userInfo };
    } catch (error) {
        console.error('Failed to fetch user info:', error);
    }
};

const saveUserInfo = async () => {
    try {
        const updatedUserInfo = {
            ...userInfo,
            memberId: memberId.value,
        };

        const response = await jwtAxios.put(`http://${host}/api/member/update`, updatedUserInfo);
        Object.assign(userInfo, response.data);
        originalUserInfo.value = { ...userInfo };
        alert('사용자 정보가 성공적으로 저장되었습니다.');
        isEditing.value = false;
    } catch (error) {
        console.error('Failed to save user info:', error);
        alert('사용자 정보 저장에 실패했습니다.');
    }
};

const startEditing = () => {
    isEditing.value = true;
};

const cancelEdit = () => {
    if (originalUserInfo.value) {
        Object.assign(userInfo, originalUserInfo.value);
    }
    isEditing.value = false;
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
    isExpertPopupVisible.value = false;
};

const getGenderDisplay = (gender) => {
    return gender === 'm' ? '남자' : gender === 'f' ? '여자' : '';
};

const getLabel = (key) => {
    const labels = {
        username: '이름',
        birth: '생년월일',
        gender: '성별',
        phone: '핸드폰 번호',
        address: '주소',
        tall: '신장 (cm)',
        bodyWeight: '체중 (kg)',
    };
    return labels[key] || key;
};

const getInputType = (key) => {
    const types = {
        birth: 'date',
        phone: 'tel',
        tall: 'number',
        bodyWeight: 'number',
    };
    return types[key] || 'text';
};

const displayUserInfo = computed(() => {
    const { username, birth, gender, phone, address, tall, bodyWeight } = userInfo;
    return { username, birth, gender, phone, address, tall, bodyWeight };
});
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

.btn-edit {
    background-color: #2196f3;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
}
</style>
