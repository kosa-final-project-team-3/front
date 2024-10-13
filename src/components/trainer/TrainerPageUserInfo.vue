<template>
    <div v-if="isTrainer" class="trainer-page-user-info">
        <div class="tabs">
            <button @click="activeTab = 'myInfo'" :class="{ active: activeTab === 'myInfo' }">나의 정보</button>
            <button @click="activeTab = 'timeTable'" :class="{ active: activeTab === 'timeTable' }">타임테이블</button>
        </div>
        <div v-if="activeTab === 'myInfo'" class="my-info">
            <h2>나의 정보</h2>
            <p>현재 나의 운동 카테고리: {{ currentCategory }}</p>

            <div class="trainer-profiles">
                <h3>전문가 이력 정보</h3>
                <button v-if="!isAddingProfile" @click="startAddingProfile" class="btn-add">이력 추가하기</button>
                <div v-if="isAddingProfile" class="add-profile-form">
                    <select v-model="newProfile.categoryName">
                        <option v-for="category in profileCategories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                    <input v-model="newProfile.title" placeholder="제목" />
                    <input v-model="newProfile.startDate" type="date" placeholder="시작일" />
                    <input v-model="newProfile.endDate" type="date" placeholder="종료일" />
                    <textarea v-model="newProfile.detail" placeholder="상세 정보"></textarea>
                    <div class="form-actions">
                        <button @click="cancelAddingProfile" class="btn-cancel">취소</button>
                        <button @click="saveNewProfile" class="btn-save">저장하기</button>
                    </div>
                </div>
                <div v-for="category in profileCategories" :key="category" class="profile-category">
                    <h4>{{ category }}</h4>
                    <ul>
                        <li v-for="profile in getProfilesByCategory(category)" :key="profile.trainerProfileId">
                            {{ profile.title }}
                            ({{ formatDate(profile.startDate) }} ~ {{ formatDate(profile.endDate) }})
                            <p>{{ profile.detail }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="activeTab === 'timeTable'" class="time-table">
            <h2>타임테이블</h2>
            <button @click="toggleEditMode">{{ isEditMode ? '저장' : '수정' }}</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="day in days" :key="day">{{ day }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="hour in 25" :key="hour">
                        <th>{{ hour - 1 }}:00</th>
                        <td
                            v-for="day in days"
                            :key="day"
                            @click="toggleCell(hour - 1, day)"
                            :class="{ selected: isSelected(hour - 1, day) }"
                            :style="{ cursor: isEditMode ? 'pointer' : 'default' }"
                        ></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <h2>접근 권한이 없습니다.</h2>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import jwtAxios, { API_SERVER_HOST } from '../../util/jwtUtil';

const host = API_SERVER_HOST;
const authStore = useAuthStore();
const isTrainer = computed(() => authStore.role === 'TRAINER');
const memberId = computed(() => authStore.id);

const activeTab = ref('myInfo');
const days = ['월', '화', '수', '목', '금', '토', '일'];
const isEditMode = ref(false);
const selectedCells = ref({});
const isAuthenticated = computed(() => authStore.isAuthenticated);
const trainerProfiles = ref([]);
const profileCategories = ['교육사항', '수상이력', '자격증', '경력'];
const currentCategory = ref('');
const isAddingProfile = ref(false);
const newProfile = reactive({
    categoryName: '',
    title: '',
    startDate: '',
    endDate: '',
    detail: '',
});

onMounted(async () => {
    await authStore.checkAuthStatus();
    if (isAuthenticated.value && memberId.value && isTrainer.value) {
        await fetchTrainerProfiles();
        await fetchCurrentCategory();
        await fetchTimeTable();
    }
});

const categoryMap = {
    교육사항: 'EDU',
    수상이력: 'AWARD',
    자격증: 'CERT',
    경력: 'EXP',
};

const fetchTrainerProfiles = async () => {
    try {
        const response = await jwtAxios.get(`http://${host}/api/trainer/profile`, {
            params: { memberId: memberId.value },
        });
        trainerProfiles.value = response.data;
    } catch (error) {
        console.error('Failed to fetch trainer profiles:', error);
    }
};

const fetchCurrentCategory = async () => {
    try {
        const response = await jwtAxios.get(`http://${host}/api/trainer/${memberId.value}`);
        currentCategory.value = response.data.exerciseCategoryName;
    } catch (error) {
        console.error('Failed to fetch current category:', error);
    }
};

const getProfilesByCategory = (category) => {
    return trainerProfiles.value.filter((profile) => profile.categoryName === category);
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
        2,
        '0',
    )}`;
};

const toggleEditMode = async () => {
    if (isEditMode.value) {
        // 저장 모드에서 수정 모드로 전환
        await saveTimeTable();
        isEditMode.value = false;
    } else {
        // 수정 모드로 전환
        isEditMode.value = true;
    }
};

const toggleCell = (hour, day) => {
    if (!isEditMode.value) return;

    const key = `${hour}-${day}`;
    selectedCells.value[key] = !selectedCells.value[key];
    if (!selectedCells.value[key]) {
        delete selectedCells.value[key];
    }
};

const isSelected = (hour, day) => {
    return selectedCells.value[`${hour}-${day}`];
};

const saveTimeTable = async () => {
    try {
        const timeTableUpdates = Object.entries(selectedCells.value).map(([key, isSelected]) => {
            const [hour, day] = key.split('-');
            return {
                trainerId: memberId.value,
                day: day,
                startHour: parseInt(hour),
                isSelected: isSelected,
            };
        });

        // 모든 시간대를 포함하도록 수정
        for (let hour = 0; hour < 24; hour++) {
            for (const day of days) {
                const key = `${hour}-${day}`;
                if (!selectedCells.value.hasOwnProperty(key)) {
                    timeTableUpdates.push({
                        trainerId: memberId.value,
                        day: day,
                        startHour: hour,
                        isSelected: false,
                    });
                }
            }
        }

        if (timeTableUpdates.length === 0) {
            alert('변경된 시간이 없습니다.');
            return;
        }

        await jwtAxios.put(`http://${host}/api/trainer/timetable/${memberId.value}`, timeTableUpdates);

        alert('타임테이블이 성공적으로 업데이트되었습니다.');
        await fetchTimeTable();
        isEditMode.value = false; // 저장 후 수정 모드 종료
    } catch (error) {
        console.error('Failed to update time table:', error);
        alert('타임테이블 업데이트에 실패했습니다.');
    }
};

const fetchTimeTable = async () => {
    try {
        const response = await jwtAxios.get(`http://${host}/api/trainer/timetable/${memberId.value}`);
        const timeTables = response.data;
        selectedCells.value = {};
        timeTables.forEach((timeTable) => {
            const hour = new Date(timeTable.startTime).getHours();
            const day = timeTable.day;
            selectedCells.value[`${hour}-${day}`] = true;
        });
    } catch (error) {
        console.error('Failed to fetch time table:', error);
    }
};

const startAddingProfile = () => {
    isAddingProfile.value = true;
};

const cancelAddingProfile = () => {
    isAddingProfile.value = false;
    resetNewProfile();
};

const resetNewProfile = () => {
    Object.assign(newProfile, {
        categoryName: '',
        title: '',
        startDate: '',
        endDate: '',
        detail: '',
    });
};

const saveNewProfile = async () => {
    try {
        const profileData = [
            {
                trainerId: memberId.value,
                categoryCode: categoryMap[newProfile.categoryName],
                title: newProfile.title,
                startDate: newProfile.startDate,
                endDate: newProfile.endDate,
                detail: newProfile.detail,
            },
        ];

        await jwtAxios.post(`http://${host}/api/trainer/save`, profileData);
        await fetchTrainerProfiles();
        isAddingProfile.value = false;
        resetNewProfile();
        alert('새로운 이력이 성공적으로 추가되었습니다.');
    } catch (error) {
        console.error('Failed to save new profile:', error);
        alert('이력 추가에 실패했습니다.');
    }
};
</script>

<style scoped>
.trainer-page-user-info {
    padding: 20px;
}

.tabs {
    display: flex;
    margin-bottom: 20px;
}

.tabs button {
    padding: 10px 20px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
}

.tabs button.active {
    background-color: #007bff;
    color: white;
}

.profile-category {
    margin-bottom: 2rem;
}

.profile-category h3 {
    margin-bottom: 1rem;
}

.profile-category ul {
    list-style-type: none;
    padding-left: 0;
}

.profile-category li {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 5px;
}

.time-table {
    overflow-x: auto;
}

.time-table table {
    width: 100%;
    border-collapse: collapse;
}

.time-table th,
.time-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.time-table td.selected {
    background-color: #007bff;
}

.time-table button {
    margin-bottom: 10px;
    padding: 5px 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
}

.form-actions {
    margin-top: 1rem;
}

.btn-save {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-save:hover {
    background-color: #45a049;
}

.trainer-profiles {
    margin-top: 2rem;
}

.profile-category {
    margin-bottom: 1rem;
}

.profile-category h4 {
    margin-bottom: 0.5rem;
}

.profile-category ul {
    list-style-type: none;
    padding-left: 1rem;
}

.profile-category li {
    margin-bottom: 0.5rem;
}

.btn-add {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}

.add-profile-form {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 5px;
}

.add-profile-form select,
.add-profile-form input,
.add-profile-form textarea {
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
}

.add-profile-form textarea {
    height: 100px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
}

.btn-cancel,
.btn-save {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-cancel {
    background-color: #f44336;
}

.btn-save {
    background-color: #4caf50;
}
</style>
