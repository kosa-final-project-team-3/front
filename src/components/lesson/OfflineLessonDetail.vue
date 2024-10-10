<template>
    <div class="modal-content">
        <button class="close-button" @click="closeModal">X</button>

        <div class="lesson-header">
            <img :src="selectedLesson.image" alt="레슨 이미지" class="lesson-image" />
            <div class="lesson-details">
                <p><strong>종목:</strong> {{ selectedLesson.category }}</p>
                <p><strong>레슨명:</strong> {{ selectedLesson.title }}</p>
                <p><strong>강사:</strong> {{ selectedLesson.trainer }}</p>
                <p><strong>가격:</strong> {{ selectedLesson.price }}원</p>
                <p><strong>강사 이력:</strong> {{ selectedLesson.trainerHistory }}</p>
            </div>
        </div>

        <div class="lesson-description">
            <p><strong>레슨 상세 내역:</strong></p>
            <p>{{ selectedLesson.description }}</p>
        </div>

        <div class="lesson-location">
            <p><strong>수업 장소:</strong> {{ selectedLesson.location }}</p>
            <div class="map-placeholder">[지도]</div>
        </div>

        <div class="trainer-evaluation">
            <p><strong>트레이너 평가:</strong></p>
            <div class="evaluation-container">
                <RadarChart :ratings="selectedLesson.ratings" />

                <div class="review-list">
                    <h4>강사 한줄평</h4>
                    <ul>
                        <li v-for="(review, index) in selectedLesson.reviews" :key="index">
                            {{ review }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <button class="inquiry-button" @click="openInquiryForm">문의하기</button>
    </div>
</template>

<script setup></script>

<style scoped></style>
