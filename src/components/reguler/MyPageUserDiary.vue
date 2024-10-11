<template>
    <div class="my-page-user-diary" v-if="isAuthenticated">
        <h2>나의 운동 일지</h2>
        <div class="calendar-container">
            <v-calendar :attributes="attributes" @dayclick="onDayClick" />
        </div>
        <div class="diary-list">
            <h3>{{ selectedDate }} 일지</h3>
            <ul>
                <li v-for="diary in selectedDiaries" :key="diary.id" @click="viewDiary(diary)">
                    운동 시작 : {{ diary.startTime }} - 운동 끝 : {{ diary.endTime }} , 내용: {{ diary.content }} 체중:
                    {{ diary.weight }} 탄수화물: {{ diary.carbohydrates }} 단백질: {{ diary.protein }} 지방:
                    {{ diary.fat }}
                </li>
            </ul>
            <button @click="openDiaryForm" class="btn-add-diary">일지 작성</button>
        </div>

        <div v-if="showDiaryForm || showDiaryView" class="diary-form-overlay">
            <div class="diary-form">
                <h3>{{ isEditing ? '운동 일지 수정' : showDiaryView ? '운동 일지 상세' : '운동 일지 작성' }}</h3>
                <form @submit.prevent="saveDiary">
                    <div class="form-group">
                        <label for="exerciseDate">운동 날짜:</label>
                        <input
                            id="exerciseDate"
                            v-model="currentDiary.exerciseDate"
                            type="date"
                            :disabled="!isEditing"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="startTime">시작 시각:</label>
                        <input
                            id="startTime"
                            v-model="currentDiary.startTime"
                            type="time"
                            :disabled="!isEditing"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="endTime">종료 시각:</label>
                        <input
                            id="endTime"
                            v-model="currentDiary.endTime"
                            type="time"
                            :disabled="!isEditing"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="content">내용:</label>
                        <textarea
                            id="content"
                            v-model="currentDiary.content"
                            :disabled="!isEditing"
                            required
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="weight">체중 (kg):</label>
                        <input
                            id="weight"
                            v-model="currentDiary.weight"
                            type="number"
                            step="0.1"
                            :disabled="!isEditing"
                        />
                    </div>
                    <div class="form-group">
                        <label for="carbohydrates">탄수화물 (g):</label>
                        <input
                            id="carbohydrates"
                            v-model="currentDiary.carbohydrates"
                            type="number"
                            :disabled="!isEditing"
                        />
                    </div>
                    <div class="form-group">
                        <label for="protein">단백질 (g):</label>
                        <input id="protein" v-model="currentDiary.protein" type="number" :disabled="!isEditing" />
                    </div>
                    <div class="form-group">
                        <label for="fat">지방 (g):</label>
                        <input id="fat" v-model="currentDiary.fat" type="number" :disabled="!isEditing" />
                    </div>
                    <div class="form-actions">
                        <template v-if="isEditing">
                            <button type="submit" class="btn-save">저장</button>
                            <button type="button" @click="cancelEdit" class="btn-cancel">취소</button>
                        </template>
                        <template v-else-if="showDiaryView">
                            <button type="button" @click="startEditing" class="btn-edit">수정하기</button>
                            <button type="button" @click="closeDiaryView" class="btn-close">닫기</button>
                        </template>
                        <template v-else>
                            <button type="submit" class="btn-save">완료</button>
                            <button type="button" @click="cancelDiaryForm" class="btn-cancel">취소</button>
                        </template>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Calendar } from 'v-calendar';
import jwtAxios, { API_SERVER_HOST } from '../../util/jwtUtil';
import { useAuthStore } from '../../stores/authStore';

const selectedDate = ref(new Date().toISOString().split('T')[0]);
const diaries = ref([]);
const showDiaryForm = ref(false);
const showDiaryView = ref(false);
const isEditing = ref(false);
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const host = API_SERVER_HOST;
const currentDiary = ref({
    id: null,
    exerciseDate: '',
    startTime: '',
    endTime: '',
    content: '',
    weight: '',
    carbohydrates: '',
    protein: '',
    fat: '',
});

const attributes = computed(() => {
    return diaries.value.map((diary) => ({
        dates: new Date(diary.exerciseDate),
        dot: {
            color: 'blue',
            class: 'diary-dot',
        },
    }));
});

const selectedDiaries = computed(() => {
    return diaries.value.filter((diary) => diary.exerciseDate === selectedDate.value);
});

const onDayClick = (day) => {
    selectedDate.value = day.id;
};

const viewDiary = (diary) => {
    currentDiary.value = { ...diary };
    showDiaryView.value = true;
    showDiaryForm.value = false;
    isEditing.value = false;
};

const startEditing = () => {
    isEditing.value = true;
    showDiaryForm.value = true;
};

const cancelEdit = () => {
    if (currentDiary.value.id) {
        // 기존 일지 수정 취소
        const originalDiary = diaries.value.find((d) => d.id === currentDiary.value.id);
        currentDiary.value = { ...originalDiary };
        isEditing.value = false;
        showDiaryForm.value = false;
        showDiaryView.value = true;
    } else {
        // 새 일지 작성 취소
        cancelDiaryForm();
    }
};

const closeDiaryView = () => {
    showDiaryView.value = false;
    showDiaryForm.value = false;
    resetCurrentDiary();
};

const openDiaryForm = () => {
    resetCurrentDiary();
    currentDiary.value.exerciseDate = selectedDate.value;
    showDiaryForm.value = true;
    showDiaryView.value = false;
    isEditing.value = true;
};

const resetCurrentDiary = () => {
    currentDiary.value = {
        id: null,
        exerciseDate: '',
        startTime: '',
        endTime: '',
        content: '',
        weight: '',
        carbohydrates: '',
        protein: '',
        fat: '',
    };
};

const saveDiary = async () => {
    if (
        !currentDiary.value.exerciseDate ||
        !currentDiary.value.startTime ||
        !currentDiary.value.endTime ||
        !currentDiary.value.content
    ) {
        alert('운동 날짜, 시작 시각, 종료 시각, 내용을 작성해주세요.');
        return;
    }

    try {
        const diaryData = {
            memberId: authStore.memberId,
            workoutDate: currentDiary.value.exerciseDate,
            workoutStartTime: `${currentDiary.value.exerciseDate}T${currentDiary.value.startTime}`,
            workoutEndTime: `${currentDiary.value.exerciseDate}T${currentDiary.value.endTime}`,
            content: currentDiary.value.content,
            bodyWeight: currentDiary.value.weight,
            carb: currentDiary.value.carbohydrates,
            protein: currentDiary.value.protein,
            fat: currentDiary.value.fat,
        };

        let response;
        if (currentDiary.value.id) {
            // 기존 일지 수정
            response = await jwtAxios.put(`http://${host}/api/exercise-logs/${currentDiary.value.id}`, diaryData);
        } else {
            // 새 일지 추가
            response = await jwtAxios.post(`http://${host}/api/exercise-logs`, diaryData);
        }

        if (response.data) {
            alert('운동 일지가 성공적으로 저장되었습니다.');
            await fetchDiaries();
        }
    } catch (error) {
        console.error('Failed to save exercise log:', error);
        alert('운동 일지 저장에 실패했습니다.');
    }

    showDiaryForm.value = false;
    showDiaryView.value = false;
    isEditing.value = false;
    resetCurrentDiary();
};
const fetchDiaries = async () => {
    const memberId = authStore.memberId;
    console.log(memberId);
    try {
        const response = await jwtAxios.get(`http://${host}/api/exercise-logs`, {
            params: { memberId },
        });
        diaries.value = response.data;
        console.log(diaries);
    } catch (error) {
        console.error('Failed to fetch exercise logs:', error);
    }
};
const cancelDiaryForm = () => {
    if (
        currentDiary.value.content ||
        currentDiary.value.weight ||
        currentDiary.value.carbohydrates ||
        currentDiary.value.protein ||
        currentDiary.value.fat
    ) {
        if (confirm('내용이 저장되지 않습니다. 나가시겠습니까?')) {
            closeDiaryView();
        }
    } else {
        closeDiaryView();
    }
};

onMounted(async () => {
    await authStore.checkAuthStatus();
    if (isAuthenticated.value) {
        await fetchDiaries();
    }
});
</script>

<style scoped>
.my-page-user-diary {
    max-width: 800px;
    margin: 0 auto;
    position: relative; /* 추가 */
}

.calendar-container {
    margin-bottom: 2rem;
}

.diary-list {
    margin-top: 2rem;
}

.btn-add-diary {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}

.diary-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* 추가 */
}

.diary-form {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    max-height: 90%;
    overflow-y: auto;
}

.form-group {
    margin-bottom: 1rem;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.btn-save {
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-edit,
.btn-close,
.btn-cancel {
    background-color: #f44336; /* 빨간색 */
    color: white;
    border: none;
    cursor: pointer;
}

.diary-dot {
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background-color: blue; /* 색상 */
}
</style>
