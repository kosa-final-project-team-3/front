<template>
  <div class="lesson-page">
    <!-- 상단 검색과 필터 섹션 -->
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

        <label>운동 종류</label>
        <select v-model="selectedCategory">
          <option value="">모든 카테고리</option>
          <option value="PT">PT</option>
          <option value="요가">요가</option>
          <option value="필라테스">필라테스</option>
        </select>
      </div>
    </div>

    <!-- 레슨 카드 리스트 -->
    <div class="lesson-card-list">
      <div v-for="(lesson, index) in filteredLessons" :key="index" class="lesson-card" @click="openLessonDetail(lesson)">
        <img :src="lesson.image" alt="레슨 이미지" class="lesson-image" />
        <div class="lesson-info">
          <h3 class="lesson-title">{{ lesson.title }}</h3>
          <p class="trainer-name">트레이너: {{ lesson.trainer }}</p>
          <p class="lesson-category">{{ lesson.category }}</p>
          <p class="lesson-level">난이도: {{ lesson.level }}</p>
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
import RadarChart from '../components/RadarChart.vue';

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
    reviews: [
      '유연성이 많이 향상되었어요!',
      '운동 중간중간 자세 교정이 꼼꼼해서 좋습니다.',
    ],
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
    description: '코어 근육 강화를 위한 고강도 필라테스 클래스.',
    price: 80000,
    trainerHistory: '필라테스 전문강사 10년 경력',
    location: '서울 강동구',
    image: 'https://www.example.com/lesson-pilates.jpg',
    reviews: [
      '고급 난이도라서 많이 힘들었지만, 효과가 매우 좋습니다.',
      '근력과 유연성이 모두 향상되었습니다.',
    ],
    ratings: {
      전문성: 5,
      친절: 5,
      설명: 4,
      시간엄수: 5,
      열정: 5,
    },
  },
  {
    title: '홈트레이닝 맞춤 PT',
    trainer: '정우성',
    level: '중급',
    category: 'PT',
    description: '집에서도 쉽게 따라할 수 있는 맞춤형 홈트레이닝 프로그램.',
    price: 70000,
    trainerHistory: '피트니스 코치 7년 경력',
    location: '서울 성동구',
    image: 'https://www.example.com/lesson-home-pt.jpg',
    reviews: [
      '집에서 할 수 있어서 시간 절약이 되네요.',
      '운동 강도가 적당해서 꾸준히 할 수 있어요.',
    ],
    ratings: {
      전문성: 4,
      친절: 5,
      설명: 4,
      시간엄수: 4,
      열정: 4,
    },
  },
  {
    title: '단기 다이어트 집중 프로그램',
    trainer: '김유나',
    level: '초급',
    category: 'PT',
    description: '단기간에 체중 감량을 목표로 하는 집중 트레이닝.',
    price: 90000,
    trainerHistory: '다이어트 전문 코치',
    location: '서울 송파구',
    image: 'https://www.example.com/lesson-diet.jpg',
    reviews: [
      '일주일 만에 눈에 띄게 살이 빠졌어요!',
      '트레이너가 정말 열정적으로 지도해줍니다.',
    ],
    ratings: {
      전문성: 5,
      친절: 4,
      설명: 5,
      시간엄수: 5,
      열정: 5,
    },
  },
  {
    title: '아침 요가 스트레칭',
    trainer: '박수진',
    level: '초급',
    category: '요가',
    description: '아침에 기분 좋게 하루를 시작할 수 있는 요가 스트레칭.',
    price: 40000,
    trainerHistory: '3년 경력의 요가 강사',
    location: '서울 종로구',
    image: 'https://www.example.com/lesson-morning-yoga.jpg',
    reviews: [
      '아침마다 기분 좋게 시작할 수 있어서 좋았어요.',
      '쉽고 따라하기 편해요.',
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
    title: '플라이오메트릭스 고강도 트레이닝',
    trainer: '홍길동',
    level: '고급',
    category: 'PT',
    description: '고강도 점프 트레이닝으로 폭발적인 근력을 키우는 수업.',
    price: 85000,
    trainerHistory: '플라이오메트릭스 전문 트레이너 5년 경력',
    location: '서울 서초구',
    image: 'https://www.example.com/lesson-plyometrics.jpg',
    reviews: [
      '굉장히 힘들지만 효과는 확실합니다!',
      '운동 후 피곤하지만 성취감이 느껴집니다.',
    ],
    ratings: {
      전문성: 5,
      친절: 4,
      설명: 5,
      시간엄수: 5,
      열정: 5,
    },
  },
  {
    title: '부상 예방 스트레칭',
    trainer: '이민정',
    level: '초급',
    category: '스트레칭',
    description: '운동 전후 부상을 예방하기 위한 기초 스트레칭 클래스.',
    price: 35000,
    trainerHistory: '운동 재활 전문가',
    location: '서울 동대문구',
    image: 'https://www.example.com/lesson-injury-prevention.jpg',
    reviews: [
      '부상을 예방하는데 큰 도움이 되었습니다.',
      '스트레칭 동작이 쉽고 유용해요.',
    ],
    ratings: {
      전문성: 4,
      친절: 5,
      설명: 5,
      시간엄수: 4,
      열정: 4,
    },
  },
]);

// 검색 및 필터링 상태
const searchQuery = ref('');
const selectedLevel = ref('');
const selectedCategory = ref('');

// 레슨 필터링 로직
const filteredLessons = computed(() => {
  return lessons.value.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesLevel = selectedLevel.value === '' || lesson.level === selectedLevel.value;
    const matchesCategory = selectedCategory.value === '' || lesson.category === selectedCategory.value;
    return matchesSearch && matchesLevel && matchesCategory;
  });
});

// 선택된 레슨
const selectedLesson = ref(null);

// 문의하기 폼 상태
const showInquiryForm = ref(false);
const applicantName = ref('');
const applicantContact = ref('');
const inquiryMessage = ref('레슨 신청합니다.');

// 레슨 상세 정보 열기
const openLessonDetail = (lesson) => {
  selectedLesson.value = lesson;
  onMounted(() => {
    createRadarChart();
  });
};

// 모달 닫기
const closeModal = () => {
  selectedLesson.value = null;
};

// 문의하기 폼 열기
const openInquiryForm = () => {
  showInquiryForm.value = true;
};

// 문의하기 폼 닫기
const closeInquiryForm = () => {
  showInquiryForm.value = false;
};

// 문의 등록 처리
const submitInquiry = () => {
  alert(`${applicantName.value}님, 문의가 접수되었습니다. (레슨: ${selectedLesson.value.title})`);
  closeInquiryForm();
};
</script>

<style scoped>
.lesson-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
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

.trainer-name, .lesson-category, .lesson-level {
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
.lesson-modal, .inquiry-modal {
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

.inquiry-form input, .inquiry-form textarea {
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
