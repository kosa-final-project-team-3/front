<template>
    <div class="lesson-detail-container">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">X</button>

            <div class="lesson-header">
                <img :src="lesson.image" alt="레슨 이미지" class="lesson-image" />
                <div class="lesson-details">
                    <p><strong>종목:</strong> {{ lesson.category }}</p>
                    <p><strong>레슨명:</strong> {{ lesson.title }}</p>
                    <p><strong>강사:</strong> {{ lesson.trainer }}</p>
                    <p><strong>가격:</strong> {{ lesson.price }}원</p>
                    <p><strong>강사 이력:</strong> {{ lesson.trainerHistory }}</p>
                </div>
            </div>

            <div class="lesson-description">
                <p><strong>레슨 상세 내역:</strong></p>
                <p>{{ lesson.description }}</p>
            </div>

            <div class="lesson-location">
                <p><strong>수업 장소:</strong> {{ lesson.location }}</p>
                <div class="map-placeholder">[지도]</div>
            </div>

            <div class="trainer-evaluation">
                <p><strong>트레이너 평가:</strong></p>
                <div class="evaluation-container">
                    <radar-chart :ratings="lesson.ratings" />

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

            <button class="inquiry-button" @click="$emit('openInquiry')">문의하기</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import RadarChart from '../RadarChart.vue';

const props = defineProps({
    lesson: Object,
});

function closeModal() {
    emit('close');
}
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
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    width: 500px;
}

.lesson-header {
    display: flex;
    margin-bottom: 20px;
}

.lesson-details {
    margin-left: 20px;
}
</style>
