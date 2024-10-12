<template>
    <div v-if="isTrainer" class="trainer-page-user-info">
        <div class="tabs">
            <button @click="activeTab = 'myInfo'" :class="{ active: activeTab === 'myInfo' }">나의 정보</button>
            <button @click="activeTab = 'timeTable'" :class="{ active: activeTab === 'timeTable' }">타임테이블</button>
        </div>
        <div v-if="activeTab === 'myInfo'" class="my-info">
            <h2>나의 정보</h2>
            <p v-if="currentCategory">현재 나의 운동 카테고리: {{ currentCategory }}</p>
            <form @submit.prevent="saveTrainerCategory">
                <div class="form-group">
                    <label for="exerciseCategory">운동 카테고리:</label>
                    <select id="exerciseCategory" v-model="selectedCategory" required>
                        <option value="">카테고리 선택</option>
                        <option
                            v-for="category in exerciseCategories"
                            :key="category.exerciseCategoryCode"
                            :value="category.exerciseCategoryCode"
                        >
                            {{ category.exerciseCategoryName }}
                        </option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-save">수정하기</button>
                </div>
            </form>

            <div class="trainer-profiles">
                <h3>전문가 이력 정보</h3>
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
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import jwtAxios, { API_SERVER_HOST } from '../../util/jwtUtil';

const host = API_SERVER_HOST;
const authStore = useAuthStore();
const isTrainer = computed(() => authStore.role === 'TRAINER');
const memberId = computed(() => authStore.id);

const activeTab = ref('myInfo');
const exerciseCategories = ref([]);
const selectedCategory = ref('');
const days = ['월', '화', '수', '목', '금', '토', '일'];
const isEditMode = ref(false);
const selectedCells = ref({});
const isAuthenticated = computed(() => authStore.isAuthenticated);
const trainerProfiles = ref([]);
const profileCategories = ['교육사항', '수상이력', '자격증', '경력'];
const currentCategory = ref('');

onMounted(async () => {
    await authStore.checkAuthStatus();
    if (isAuthenticated.value && memberId.value && isTrainer.value) {
        await fetchExerciseCategories();
        await fetchTrainerProfiles();
        await fetchCurrentCategory();
        await fetchTimeTable();
    }
});

const fetchExerciseCategories = async () => {
    try {
        const response = await jwtAxios.get(`http://${host}/api/trainer/exercise-categories`);
        exerciseCategories.value = response.data;
    } catch (error) {
        console.error('Failed to fetch exercise categories:', error);
    }
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

const saveTrainerCategory = async () => {
    try {
        await jwtAxios.put(`http://${host}/api/trainer/${memberId.value}/update-category`, null, {
            params: { exerciseCategoryCode: selectedCategory.value },
        });
        alert('운동 카테고리가 성공적으로 저장되었습니다.');
        await fetchCurrentCategory(); // 카테고리 저장 후 현재 카테고리 다시 가져오기
    } catch (error) {
        console.error('Failed to save trainer category:', error);
        alert('운동 카테고리 저장에 실패했습니다.');
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
</style>
