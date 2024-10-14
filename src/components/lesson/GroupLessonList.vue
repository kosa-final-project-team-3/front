<template>
    <div class="lesson-container">
        <div class="search-sort-container">
            <div class="search-container">
                <form>
                    <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요" />
                </form>
            </div>

            <div class="sort-container">
                <select v-model="selectedSort">
                    <option value="popular">인기순</option>
                    <option value="rating">만족도순</option>
                    <option value="price">가격순</option>
                </select>
            </div>
        </div>

        <div class="lesson-category">
            <button
                @click="selectCategory('')"
                :class="{ active: selectedCategory === '' }"
                class="lesson-category-button"
            >
                전체
            </button>
            <button
                v-for="category in categories"
                :key="category"
                @click="selectCategory(category)"
                :class="{ active: selectedCategory === category }"
                class="lesson-category-button"
            >
                {{ category }}
            </button>
        </div>

        <div class="lesson-card-list">
            <div
                v-for="(lesson, index) in sortedLessons"
                :key="index"
                class="lesson-card"
                @click="openLessonDetail(lesson)"
            >
                <img :src="lesson.image" alt="레슨 이미지" class="lesson-image" />
                <div class="lesson-info">
                    <h3 class="lesson-title">{{ lesson.title }}</h3>
                    <p>강사: {{ lesson.trainer }}</p>
                    <p>{{ lesson.category }}</p>
                    <p>가격: {{ lesson.price }}원</p>
                    <p>모집 기간: {{ lesson.recruitmentPeriod }}</p>
                    <p>최대 인원: {{ lesson.maxParticipants }}명</p>
                    <p>레슨 일정: {{ lesson.schedule }}</p>
                </div>
                <button class="join-button">문의하기</button>
            </div>
        </div>

        <lesson-detail
            v-if="selectedLesson"
            :lesson="selectedLesson"
            :selectedType="selectedType"
            @close="closeLessonDetail"
            @openInquiry="openInquiryForm"
        />

        <inquiry-form v-if="showInquiryForm" :lesson="selectedLesson" @close="closeInquiryForm" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import LessonDetail from './LessonDetail.vue';
import InquiryForm from './InquiryForm.vue';
const lessons = ref([
    {
        title: '그룹 전신 운동 PT',
        trainer: '강철희',
        category: '헬스',
        description: '초보자에게 적합한 전신 강화 트레이닝.',
        price: 60000,
        trainerProfile: ['국가대표 출신 강사', '스포츠지도사 자격증 보유'],
        location: '서울 종로구 혜화로 20',
        image: 'https://www.example.com/lesson-pt.jpg',
        maxParticipants: 10,
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
        title: '친구와 함께 배울 수 있는 요가',
        trainer: '서진이',
        category: '요가',
        description: '유연성 향상과 근력 강화에 도움을 주는 중급자 요가.',
        price: 50000,
        trainerProfile: ['요가 전문 자격증 보유'],
        location: '서울 마포구',
        image: 'https://www.example.com/lesson-yoga.jpg',
        maxParticipants: 12,
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
        title: '우리 함께 필라테스 집중 코어',
        trainer: '이은정',
        category: '필라테스',
        description: '코어 강화에 특화된 고급 필라테스 수업입니다.',
        price: 70000,
        trainerProfile: ['필라테스 마스터 트레이너'],
        location: '서울 강북구',
        image: 'https://www.example.com/lesson-pilates.jpg',
        maxParticipants: 8,
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

const categories = ref(['헬스', '요가', '필라테스', '수영', '댄스', '볼링', '골프', '기타']);

const selectedType = ref('그룹 레슨');
const selectedLesson = ref(null); // 선택된 레슨
const selectedCategory = ref('');
const searchKeyword = ref(''); // 검색
const selectedSort = ref('popular'); // 정렬
const showInquiryForm = ref(false); // 문의하기 폼 상태

const filteredLessons = computed(() => {
    return lessons.value.filter((lesson) => {
        const matchesType = selectedType.value;
        const matchesSearch =
            lesson.title.includes(searchKeyword.value) ||
            lesson.trainer.includes(searchKeyword.value) ||
            lesson.location.includes(searchKeyword.value);

        const matchesCategory = !selectedCategory.value || lesson.category === selectedCategory.value;

        return matchesType && matchesSearch && matchesCategory;
    });
});

const sortedLessons = computed(() => {
    const sorted = [...filteredLessons.value];
    if (selectedSort.value === 'popular') {
        // 인기순: 리뷰 개수
        sorted.sort((a, b) => b.reviews.length - a.reviews.length);
    } else if (selectedSort.value === 'rating') {
        // 만족도순: 총합 평점
        sorted.sort((a, b) => {
            const aRatingSum = Object.values(a.ratings).reduce((acc, rating) => acc + rating, 0);
            const bRatingSum = Object.values(b.ratings).reduce((acc, rating) => acc + rating, 0);
            return bRatingSum - aRatingSum;
        });
    } else if (selectedSort.value === 'price') {
        // 가격순
        sorted.sort((a, b) => a.price - b.price);
    }
    return sorted;
});

function selectCategory(category) {
    selectedCategory.value = category;
}

function openLessonDetail(lesson) {
    selectedLesson.value = lesson;
}

function closeLessonDetail() {
    selectedLesson.value = null;
}

function openInquiryForm() {
    showInquiryForm.value = true;
}

function closeInquiryForm() {
    showInquiryForm.value = false;
}
</script>

<style scoped>
.search-sort-container {
    display: flex;
    margin: 20px;
    justify-content: center;
}

.search-container {
    display: flex;
}
.search-container form {
    display: flex;
    gap: 10px;
}

.search-container button {
    background-color: #00bf63;
    color: white;
    border: 1px solid #00bf63;
    border-radius: 4px;
    cursor: pointer;
}

.search-container input {
    width: 200px;
    padding: 8px;
}

.sort-container {
    margin-left: 30px;
}

.sort-container select {
    padding: 8px;
}

.lesson-category {
    display: flex;
    justify-content: center;
}

.lesson-category-button {
    padding: 15px;
    background-color: #00bf63;
    color: white;
    border: none;
    cursor: pointer;
    text-align: center;
}

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
    margin: 10px;
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

.join-button {
    background-color: #ff6f61;
    color: white;
    padding: 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto;
    margin-top: auto;
}
</style>
