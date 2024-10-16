<template>
    <div class="lesson-detail-container">
        <div class="modal-content">
            <button class="close-button" @click="$emit('close')">×</button>

            <div class="lesson-header">
                <div class="lesson-image-container">
                    <img v-if="lesson.image" :src="lesson.image" alt="레슨 이미지" class="lesson-image" />
                    <div v-else class="lesson-image-placeholder">이미지 없음</div>
                </div>
                <div class="lesson-details">
                    <p><strong>종목:</strong> {{ lesson.category }}</p>
                    <p v-if="selectedType !== '온라인 피드백'"><strong>레슨명:</strong> {{ lesson.title }}</p>
                    <p><strong>강사:</strong> {{ lesson.trainer }}</p>
                    <p><strong>가격:</strong> {{ lesson.price }}원</p>
                    <p><strong>강사 이력:</strong></p>
                    <ul>
                        <li v-for="profile in lesson.trainerProfile" :key="profile">{{ profile }}</li>
                    </ul>
                </div>
            </div>

            <div class="lesson-description">
                <p><strong>레슨 상세 내역:</strong></p>
                <p>{{ lesson.description }}</p>
            </div>

            <div v-if="selectedType === '그룹 레슨'">
                <p><strong>모집 기간</strong>: {{ lesson.recruitmentPeriod }}</p>
                <p><strong>최대 인원</strong>: {{ lesson.maxParticipants }}명</p>
                <p><strong>레슨 일정</strong>: {{ lesson.schedule }}</p>
            </div>

            <div class="lesson-location" v-if="selectedType === '개인 레슨' || selectedType === '그룹 레슨'">
                <p><strong>수업 장소:</strong> {{ lesson.location }}</p>
                <map-view :location="lesson.location" />
            </div>

            <div class="trainer-evaluation">
                <p><strong>트레이너 평가:</strong></p>
                <div class="evaluation-container">
                    <radar-chart v-if="lesson.ratings" :ratings="lesson.ratings" />

                    <div class="review-list">
                        <h4>강사 한줄평</h4>
                        <ul>
                            <li v-for="(review, index) in lesson.reviews" :key="index">
                                {{ review }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <button class="inquiry-button floating" @click="handleInquiry">문의하기</button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import RadarChart from './RadarChart.vue';
import MapView from './MapView.vue';

const props = defineProps({
    lesson: Object,
    selectedType: String,
});

const emit = defineEmits(['close', 'openInquiry']);

const handleInquiry = () => {
    emit('openInquiry', props.lesson);
    emit('close');
};
</script>

<style scoped>
.lesson-detail-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    width: 500px;
    max-height: 75vh;
    overflow-y: auto;
    position: relative;
    margin: 10vh auto;
}

.modal-content::-webkit-scrollbar {
    display: none;
}

.lesson-header {
    display: flex;
    margin-bottom: 20px;
}

.lesson-image-container {
    width: 200px;
    height: 200px;
    margin-right: 20px;
}

.lesson-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.lesson-image-placeholder {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #666;
}

.lesson-details {
    flex: 1;
}

.evaluation-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

#radarChart {
    width: 200px;
    height: 200px;
}

.review-list {
    padding-left: 20px;
}

.review-list ul {
    list-style-type: none;
    padding: 0;
}

.review-list li {
    margin-bottom: 10px;
}

.close-button {
    position: fixed;
    top: calc(10vh + 10px);
    right: calc(50% - 250px);
    background-color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #333;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1001;
}

.inquiry-button {
    padding: 15px 30px;
    background-color: #00bf63;
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.inquiry-button:hover {
    background-color: #009e52;
    transform: translateY(-2px);
}

.inquiry-button.floating {
    position: fixed;
    bottom: calc(10vh + 20px);
    right: calc(50% - 250px);
    z-index: 1002;
}

.map-view {
    position: relative;
    z-index: 1;
}

.evaluation-container {
    padding-bottom: 60px;
}
</style>
