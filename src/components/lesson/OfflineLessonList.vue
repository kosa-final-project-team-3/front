<template>
    <div class="lesson-page">
        <!-- 상단 검색과 필터 섹션 -->
        <div class="top-header">
            <h1>오프라인 레슨</h1>
            <div class="lesson-type-buttons">
                <!-- 개인 레슨 버튼 -->
                <button
                    @click="selectLessonType('개인 레슨')"
                    :class="{ active: selectedType === '개인 레슨' }"
                    class="lesson-type-button"
                >
                    개인 레슨
                </button>

                <!-- 그룹 레슨 버튼 -->
                <button
                    @click="selectLessonType('그룹 레슨')"
                    :class="{ active: selectedType === '그룹 레슨' }"
                    class="lesson-type-button"
                >
                    그룹 레슨
                </button>
            </div>
        </div>

        <div class="lesson-category">
            <button
                v-for="category in categories"
                :key="category"
                @click="selectCategory(category)"
                class="lesson-category-btn"
                :class="{ active: selectedCategory === category }"
            >
                {{ category }}
            </button>
        </div>

        <!-- 검색 및 필터링 섹션 -->
        <div class="search-filter-section">
            <input type="text" v-model="searchQuery" placeholder="레슨 검색..." class="search-input" />
            <div class="filter-options">
                <label>난이도</label>
                <select v-model="selectedLevel">
                    <option value="">모든 난이도</option>
                    <option value="초급">초급</option>
                    <option value="중급">중급</option>
                    <option value="고급">고급</option>
                </select>
            </div>
        </div>

        <!-- 레슨 카드 리스트 -->
        <div class="lesson-card-list">
            <div
                v-for="(lesson, index) in filteredLessons"
                :key="index"
                class="lesson-card"
                @click="openLessonDetail(lesson)"
            >
                <img :src="lesson.image" alt="레슨 이미지" class="lesson-image" />
                <div class="lesson-info">
                    <h3 class="lesson-title">{{ lesson.title }}</h3>
                    <p class="trainer-name">트레이너: {{ lesson.trainer }}</p>
                    <p class="lesson-category">{{ lesson.category }}</p>
                    <p class="lesson-level">난이도: {{ lesson.level }}</p>
                    <!-- 그룹 레슨의 경우 최대 인원 표시 -->
                    <p v-if="lesson.maxParticipants" class="lesson-max-participants">
                        최대 인원: {{ lesson.maxParticipants }}명
                    </p>
                    <button class="join-button">레슨 참여</button>
                </div>
            </div>
        </div>

        <!-- 모달: 레슨 세부 정보 -->
        <div v-if="selectedLesson" class="lesson-modal">
            <div class="modal-content">
                <!-- 닫기 버튼 -->
                <button class="close-button" @click="closeModal">X</button>

                <!-- 이미지 및 기본 정보 -->
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

                <!-- 레슨 상세 내용 -->
                <div class="lesson-description">
                    <p><strong>레슨 상세 내역:</strong></p>
                    <p>{{ selectedLesson.description }}</p>
                </div>

                <!-- 수업 장소 지도 -->
                <div class="lesson-location">
                    <p><strong>수업 장소:</strong> {{ selectedLesson.location }}</p>
                    <!-- 지도 Placeholder -->
                    <div class="map-placeholder">[지도]</div>
                </div>

                <!-- 트레이너 평가 -->
                <div class="trainer-evaluation">
                    <p><strong>트레이너 평가:</strong></p>
                    <div class="evaluation-container">
                        <!-- 오각형 평가 차트 -->
                        <RadarChart :ratings="selectedLesson.ratings" />

                        <!-- 강사 한줄평 -->
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

                <!-- 문의하기 버튼 -->
                <button class="inquiry-button" @click="openInquiryForm">문의하기</button>
            </div>
        </div>

        <!-- 모달: 문의하기 폼 -->
        <div v-if="showInquiryForm" class="inquiry-modal">
            <div class="modal-content">
                <h2>문의하기</h2>
                <!-- 레슨 정보 -->
                <div class="lesson-info">
                    <p><strong>카테고리:</strong> {{ selectedLesson.category }}</p>
                    <p><strong>강좌명:</strong> {{ selectedLesson.title }}</p>
                    <p><strong>강사명:</strong> {{ selectedLesson.trainer }}</p>
                </div>

                <!-- 구분선 -->
                <hr />

                <!-- 문의 입력 폼 -->
                <div class="inquiry-form">
                    <label>신청인 이름</label>
                    <input type="text" v-model="applicantName" placeholder="신청인 이름" />

                    <label>신청인 연락처</label>
                    <input type="text" v-model="applicantContact" placeholder="신청인 연락처" />

                    <label>문의 내용</label>
                    <textarea v-model="inquiryMessage">레슨 신청합니다.</textarea>
                </div>

                <!-- 등록하기 버튼 -->
                <button class="submit-button" @click="submitInquiry">등록하기</button>

                <!-- 닫기 버튼 -->
                <button class="close-button" @click="closeInquiryForm">닫기</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import RadarChart from '../RadarChart.vue';

// 레슨 목록
const lessons = ref([
    {
        title: '전신 운동 PT',
        trainer: '강철희',
        level: '초급',
        category: 'PT',
        description: '초보자에게 적합한 전신 강화 트레이닝.',
        price: 60000,
        trainerHistory: '국가대표 출신 강사',
        location: '서울 강남구',
        image: 'https://www.example.com/lesson-pt.jpg',
        maxParticipants: null, // 개인 레슨
        reviews: [
            '친절하고 설명이 명확합니다.',
            '운동 동작을 세심하게 지도해줘서 좋았어요.',
            '시간 약속을 잘 지킵니다.',
            '강의 준비가 철저해요.',
        ],
        ratings: {
            전문성: 4,
            친절: 5,
            설명: 4,
            시간엄수: 5,
            열정: 4,
        },
    },
    {
        title: '고강도 요가',
        trainer: '서진이',
        level: '중급',
        category: '요가',
        description: '유연성 향상과 근력 강화에 도움을 주는 중급자 요가.',
        price: 50000,
        trainerHistory: '요가 전문 자격증 보유',
        location: '서울 마포구',
        image: 'https://www.example.com/lesson-yoga.jpg',
        maxParticipants: 12, // 그룹 레슨
        reviews: ['유연성이 많이 향상되었어요!', '운동 중간중간 자세 교정이 꼼꼼해서 좋습니다.'],
        ratings: {
            전문성: 5,
            친절: 4,
            설명: 5,
            시간엄수: 4,
            열정: 5,
        },
    },
    {
        title: '필라테스 집중 코어',
        trainer: '이은정',
        level: '고급',
        category: '필라테스',
        description: '코어 강화에 특화된 고급 필라테스 수업입니다.',
        price: 70000,
        trainerHistory: '필라테스 마스터 트레이너',
        location: '서울 강북구',
        image: 'https://www.example.com/lesson-pilates.jpg',
        maxParticipants: 8, // 그룹 레슨
        reviews: ['수업이 아주 체계적이고 좋아요.', '상세한 피드백을 받을 수 있어요.'],
        ratings: {
            전문성: 5,
            친절: 4,
            설명: 5,
            시간엄수: 5,
            열정: 5,
        },
    },
]);

const categories = ref(['PT', '요가', '필라테스']);

// 레슨 종류 선택
const selectedType = ref('개인 레슨'); // 기본 값
const selectedLesson = ref(null); // 선택된 레슨
const searchQuery = ref(''); // 검색어
const selectedLevel = ref(''); // 선택된 난이도
const selectedCategory = ref(''); // 선택된 카테고리
const showInquiryForm = ref(false); // 문의하기 폼 상태
const applicantName = ref(''); // 문의인 이름
const applicantContact = ref(''); // 연락처
const inquiryMessage = ref(''); // 문의 내용

// 필터링된 레슨 리스트
const filteredLessons = computed(() => {
    return lessons.value.filter((lesson) => {
        return (
            (lesson.title.includes(searchQuery.value) || lesson.trainer.includes(searchQuery.value)) &&
            (!selectedLevel.value || lesson.level === selectedLevel.value) &&
            (!selectedCategory.value || lesson.category === selectedCategory.value)
        );
    });
});

function selectCategory(category) {
    selectedCategory.value = category;
}

// 레슨 종류 선택
function selectLessonType(type) {
    selectedType.value = type;
}

// 레슨 세부 사항 보기
function openLessonDetail(lesson) {
    selectedLesson.value = lesson;
}

// 모달 닫기
function closeModal() {
    selectedLesson.value = null;
}

// 문의 폼 열기
function openInquiryForm() {
    showInquiryForm.value = true;
}

// 문의 폼 닫기
function closeInquiryForm() {
    showInquiryForm.value = false;
}

// 문의 등록 처리
const submitInquiry = () => {
    alert(`${applicantName.value}님, 문의가 접수되었습니다. (레슨: ${selectedLesson.value.title})`);
    closeInquiryForm();
};
</script>

<style scoped>
.lesson-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.lesson-type-buttons {
    display: flex;
    gap: 100px;
    margin-left: 240px;
}

.lesson-type-button {
    padding: 10px 20px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
}

.lesson-type-buttons .active {
    text-decoration: underline;
}

.trainer-evaluation {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}

.evaluation-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

#radarChart {
    width: 300px;
    height: 300px;
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

.inquiry-button {
    background-color: #4a90e2;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}

.inquiry-button:hover {
    background-color: #357ab7;
}

/* 검색 및 필터 섹션 */
.search-filter-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.search-input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.filter-options select {
    margin-left: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

/* 레슨 카드 리스트 */
.lesson-card-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.lesson-card {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
    display: flex;
    padding: 20px;
}

.lesson-card:hover {
    transform: translateY(-5px);
}

.lesson-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
}

.lesson-info {
    padding-left: 20px;
}

.lesson-title {
    font-size: 1.4rem;
    margin-bottom: 10px;
}

.trainer-name,
.lesson-category,
.lesson-level {
    margin: 5px 0;
}

.join-button {
    background-color: #ff6f61;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.join-button:hover {
    background-color: #e63946;
}

/* 모달 */
.lesson-modal,
.inquiry-modal {
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

.inquiry-form input,
.inquiry-form textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.submit-button {
    background-color: #4a90e2;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}

.submit-button:hover {
    background-color: #357ab7;
}

.close-button {
    background-color: #bbb;
    padding: 12px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.close-button:hover {
    background-color: #999;
}
</style>
