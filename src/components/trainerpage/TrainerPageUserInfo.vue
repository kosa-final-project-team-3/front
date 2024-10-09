<template>
    <div class="trainer-page-user-info">
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

            <div class="expert-info">
                <h3>전문가 이력 정보</h3>
                <div v-for="(category, index) in expertInfo" :key="index" class="expert-category">
                    <h4>{{ getCategoryName(category.name) }}</h4>
                    <ul>
                        <li v-for="(item, itemIndex) in category.certifications" :key="itemIndex">
                            {{ item.name }}
                            <span v-if="category.type === 'period'"> ({{ item.startDate }} ~ {{ item.endDate }}) </span>
                            <span v-else> ({{ item.date }}) </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" @click="cancelEdit" class="btn-cancel">취소</button>
                <button type="submit" class="btn-save">저장하기</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const userInfo = reactive({
    name: '홍길동',
    birthdate: '1990-01-01',
    gender: 'male',
    phone: '010-1234-5678',
    address: '서울시 강남구',
    height: '175',
    weight: '70',
});

const originalUserInfo = ref({ ...userInfo });

// 더미 데이터로 전문가 정보 설정
const expertInfo = ref([
    {
        name: '교육사항',
        type: 'period',
        certifications: [
            { name: '체육학과', startDate: '2010-03-01', endDate: '2014-02-28' },
            { name: '스포츠 마케팅 석사', startDate: '2014-03-01', endDate: '2016-02-29' },
        ],
    },
    {
        name: '자격증',
        type: 'date',
        certifications: [
            { name: '생활스포츠지도사 2급', date: '2015-12-15' },
            { name: '건강운동관리사', date: '2017-06-30' },
        ],
    },
    {
        name: '경력',
        type: 'period',
        certifications: [
            { name: 'ABC 피트니스 센터 트레이너', startDate: '2016-03-01', endDate: '2019-02-28' },
            { name: 'XYZ 헬스클럽 수석 트레이너', startDate: '2019-03-01', endDate: '현재' },
        ],
    },
]);

const saveUserInfo = () => {
    // TODO: Implement API call to save user info
    console.log('Saving user info:', userInfo);
    // Update originalUserInfo after successful save
    originalUserInfo.value = { ...userInfo };
};

const cancelEdit = () => {
    // Reset form to original values
    Object.assign(userInfo, originalUserInfo.value);
};

const getCategoryName = (name) => {
    const categoryNames = {
        교육사항: '교육 이력',
        수상이력: '수상 경력',
        자격증: '보유 자격증',
        경력: '근무 경력',
    };
    return categoryNames[name] || name;
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
