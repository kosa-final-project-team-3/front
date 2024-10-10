<template>
    <div class="write-diary-popup">
        <div class="popup-content">
            <h3>{{ isViewMode ? '일지 보기' : '일지 작성' }}</h3>
            <div class="lesson-info">
                <p><strong>날짜:</strong> {{ formattedDate }}</p>
                <p><strong>레슨 유형:</strong> {{ getLessonTypeText(selectedDiary.type) }}</p>
                <p><strong>회원:</strong> {{ memberNames }}</p>
                <p><strong>시간:</strong> {{ selectedDiary.startTime }} - {{ selectedDiary.endTime }}</p>
            </div>
            <form @submit.prevent="saveDiary">
                <div class="form-group">
                    <label for="diaryContent">일지 내용:</label>
                    <textarea
                        id="diaryContent"
                        v-model="diaryContent"
                        rows="10"
                        placeholder="일지 내용을 입력하세요"
                        required
                        :readonly="isViewMode"
                    ></textarea>
                </div>
                <div class="button-group" v-if="!isViewMode">
                    <button type="submit">저장</button>
                    <button type="button" @click="tempSaveDiary">임시 저장</button>
                    <button type="button" @click="$emit('close')">취소</button>
                </div>
                <div class="button-group" v-else>
                    <button type="button" @click="$emit('close')">닫기</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    selectedDiary: {
        type: Object,
        required: true,
    },
    isViewMode: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close', 'save', 'temp-save']);

const diaryContent = ref(props.selectedDiary.content || '');

const formattedDate = computed(() => {
    return new Date(props.selectedDiary.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

const memberNames = computed(() => {
    return props.selectedDiary.selectedMembers.map((member) => member.name).join(', ');
});

const getLessonTypeText = (type) => {
    const types = {
        personal: '개인',
        group: '그룹',
        online: '온라인',
    };
    return types[type] || type;
};

const saveDiary = () => {
    emit('save', {
        ...props.selectedDiary,
        content: diaryContent.value,
        status: props.selectedDiary.status // 현재 상태를 유지
    });
};

const tempSaveDiary = () => {
    emit('temp-save', {
        ...props.selectedDiary,
        content: diaryContent.value,
        status: 'in-progress',
    });
};
</script>

<style scoped>
.write-diary-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    max-height: 90vh;
    overflow-y: auto;
}

h3 {
    margin-top: 0;
}

.lesson-info {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
}

.lesson-info p {
    margin: 5px 0;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    resize: vertical;
}

.button-group {
    display: flex;
    justify-content: space-between;
}

button {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button[type='submit'] {
    background-color: #4caf50;
    color: white;
}

button[type='button']:nth-child(2) {
    background-color: #2196f3;
    color: white;
}

button[type='button']:last-child {
    background-color: #f44336;
    color: white;
}
</style>
