<template>
    <div class="trainer-page-user-diary">
        <h2>회원 일지 관리</h2>
        <div class="calendar-container">
            <v-calendar
                :attributes="attributes"
                :min-date="new Date()"
                :selected-date="selectedDate"
                @dayclick="onDayClick"
                @update:from-page="onUpdateFromPage"
                :first-day-of-week="2"
            >
                <template #day-content="{ day }">
                    <div class="day-content" @mouseover="showAddButton(day)" @mouseleave="hideAddButton">
                        {{ day.day }}
                        <button
                            v-if="isAddButtonVisible && hoveredDate === day.date"
                            @click.stop="showRegisterLessonPopup(day.date)"
                            class="add-lesson"
                        >
                            +
                        </button>
                    </div>
                </template>
            </v-calendar>
        </div>

        <div class="diary-lists">
            <div class="diary-list">
                <h3>작성 전</h3>
                <ul>
                    <li v-for="diary in writingList" :key="diary.id">
                        {{ formatDate(diary.date) }} - {{ getLessonTypeText(diary.type) }}
                        <span v-for="member in diary.selectedMembers" :key="member.id">{{ member.name }} </span>
                        ({{ diary.startTime }} - {{ diary.endTime }})
                        <button @click="showWriteDiaryPopup(diary)">작성</button>
                        <button @click="deleteDiary(diary.id)">삭제</button>
                    </li>
                </ul>
            </div>
            <div class="diary-list">
                <h3>작성 중</h3>
                <ul>
                    <li v-for="diary in inProgressList" :key="diary.id">
                        {{ formatDate(diary.date) }} - {{ getLessonTypeText(diary.type) }}
                        <span v-for="member in diary.selectedMembers" :key="member.id">{{ member.name }} </span>
                        ({{ diary.startTime }} - {{ diary.endTime }})
                        <button @click="showWriteDiaryPopup(diary)">계속 작성</button>
                    </li>
                </ul>
            </div>
            <div class="diary-list">
                <h3>작성 완료</h3>
                <ul>
                    <li v-for="diary in completedList" :key="diary.id">
                        {{ formatDate(diary.date) }} - {{ getLessonTypeText(diary.type) }}
                        <span v-for="member in diary.selectedMembers" :key="member.id">{{ member.name }} </span>
                        ({{ diary.startTime }} - {{ diary.endTime }})
                        <button @click="viewDiary(diary)">보기</button>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="isAnyPopupVisible" class="popup-overlay"></div>

        <!-- 팝업 컴포넌트들 -->
        <RegisterLessonPopup
            v-if="isRegisterLessonPopupVisible"
            :selectedDate="selectedPopupDate"
            @close="closeRegisterLessonPopup"
            @register="registerLesson"
        />
        <WriteDiaryPopup
            v-if="isWriteDiaryPopupVisible"
            :selectedDiary="selectedDiary"
            :isViewMode="isViewMode"
            @close="closeWriteDiaryPopup"
            @save="saveDiary"
            @temp-save="tempSaveDiary"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/dist/style.css';
import RegisterLessonPopup from './RegisterLessonPopup.vue';
import WriteDiaryPopup from './WriteDiaryPopup.vue';

const selectedDate = ref(new Date());
const selectedPopupDate = ref(null);
const isRegisterLessonPopupVisible = ref(false);
const isWriteDiaryPopupVisible = ref(false);
const selectedDiary = ref(null);
const isViewMode = ref(false);
const isAddButtonVisible = ref(false);
const hoveredDate = ref(null);

const writingList = ref([]);
const inProgressList = ref([]);
const completedList = ref([]);

const attributes = ref([
    {
        key: 'today',
        dates: new Date(),
        highlight: {
            color: 'blue',
            fillMode: 'light',
        },
    },
]);

const onDayClick = (day) => {
    selectedDate.value = day.date;
};

const showAddButton = (day) => {
    isAddButtonVisible.value = true;
    hoveredDate.value = day.date;
};
const getLessonTypeText = (type) => {
    const types = {
        personal: '개인',
        group: '그룹',
        online: '온라인',
    };
    return types[type] || type;
};
const hideAddButton = () => {
    isAddButtonVisible.value = false;
    hoveredDate.value = null;
};

const onUpdateFromPage = (page) => {
    console.log('Calendar page changed:', page);
};

const showRegisterLessonPopup = (date) => {
    selectedPopupDate.value = date;
    isRegisterLessonPopupVisible.value = true;
};

const closeRegisterLessonPopup = () => {
    isRegisterLessonPopupVisible.value = false;
};

const registerLesson = (lessonData) => {
    writingList.value.push(lessonData);
    closeRegisterLessonPopup();
};

const showWriteDiaryPopup = (diary) => {
    selectedDiary.value = diary;
    isWriteDiaryPopupVisible.value = true;
    isViewMode.value = false;
};

const closeWriteDiaryPopup = () => {
    isWriteDiaryPopupVisible.value = false;
    selectedDiary.value = null;
    isViewMode.value = false;
};

const saveDiary = (diaryData) => {
    let sourceList;
    if (diaryData.status === 'writing') {
        sourceList = writingList;
    } else if (diaryData.status === 'in-progress') {
        sourceList = inProgressList;
    }

    if (sourceList) {
        const index = sourceList.value.findIndex((d) => d.id === diaryData.id);
        if (index !== -1) {
            sourceList.value.splice(index, 1);
        }
    }

    completedList.value.push({ ...diaryData, status: 'completed' });
    closeWriteDiaryPopup();
};

const tempSaveDiary = (diaryData) => {
    // 먼저 writingList에서 해당 다이어리를 찾아 제거
    const writingIndex = writingList.value.findIndex((d) => d.id === diaryData.id);
    if (writingIndex !== -1) {
        writingList.value.splice(writingIndex, 1);
    }

    // 그 다음 inProgressList에서 해당 다이어리를 찾음
    const inProgressIndex = inProgressList.value.findIndex((d) => d.id === diaryData.id);

    if (inProgressIndex !== -1) {
        // 이미 작성 중 리스트에 있다면 해당 항목을 업데이트
        inProgressList.value[inProgressIndex] = { ...diaryData, status: 'in-progress' };
    } else {
        // 작성 중 리스트에 없다면 새로 추가
        inProgressList.value.push({ ...diaryData, status: 'in-progress' });
    }

    closeWriteDiaryPopup();
};

const deleteDiary = (diaryId) => {
    writingList.value = writingList.value.filter((d) => d.id !== diaryId);
};

const viewDiary = (diary) => {
    selectedDiary.value = diary;
    isWriteDiaryPopupVisible.value = true;
    isViewMode.value = true;
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const isAnyPopupVisible = computed(() => {
    return isRegisterLessonPopupVisible.value || isWriteDiaryPopupVisible.value;
});

</script>

<style scoped>
.trainer-page-user-diary {
    padding: 20px;
}

.calendar-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 20px;
}

.day-content {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
}

.add-lesson {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
}

.diary-lists {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.diary-list {
    width: 30%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
}

.diary-list h3 {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: center;
}

.diary-list ul {
    list-style-type: none;
    padding: 0;
}

.diary-list li {
    margin-bottom: 10px;
    padding: 5px;
    background-color: #f8f8f8;
    border-radius: 4px;
}

.diary-list button {
    margin-left: 5px;
    padding: 2px 5px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

:deep(.vc-container) {
    --day-border: 1px solid #ddd;
    --day-border-highlight: 1px solid #333;
    --day-width: 100px;
    --day-height: 100px;
    --weekday-bg: #f8f8f8;
    --weekday-border: 1px solid #e0e0e0;

    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-family: sans-serif;
}

:deep(.vc-header) {
    background-color: #f0f0f0;
    padding: 10px 0;
}

:deep(.vc-weeks) {
    padding: 0;
}

:deep(.vc-day) {
    padding: 5px 0;
    text-align: center;
    font-weight: bold;
}

:deep(.vc-day-content) {
    width: var(--day-width);
    height: var(--day-height);
    font-size: 1.4em;
}

:deep(.vc-weekday) {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
}

:deep(.vc-highlight) {
    background-color: #e6f3ff !important;
}
:deep(.register-lesson-popup),
:deep(.write-diary-popup) {
  z-index: 1001;
}
.day-content {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
}

.add-lesson {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
}

.add-lesson:hover {
    background-color: #45a049;
}


</style>
