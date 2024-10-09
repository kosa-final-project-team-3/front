<template>
  <div class="radar-chart-container">
    <!-- canvas에 ref 속성을 사용하여 참조 -->
    <canvas ref="radarChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend } from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

// props로 ratings를 받음
const props = defineProps({
  ratings: {
    type: Object,
    required: true,
  },
});

// ref를 사용해 canvas 요소를 참조
const radarChartRef = ref(null);

onMounted(() => {
  renderRadarChart();
});

function renderRadarChart() {
  if (!radarChartRef.value) return; // ref가 제대로 연결되지 않았으면 return

  const ctx = radarChartRef.value.getContext('2d');
  new ChartJS(ctx, {
    type: 'radar', // radar 차트 타입 지정
    data: {
      labels: ['전문성', '친절', '설명', '시간엄수', '열정'], // 평가 항목
      datasets: [
        {
          label: '강사 평가',
          data: [
            props.ratings.전문성,
            props.ratings.친절,
            props.ratings.설명,
            props.ratings.시간엄수,
            props.ratings.열정,
          ], // 평가 데이터
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // 차트 배경색
          borderColor: 'rgba(75, 192, 192, 1)', // 차트 테두리 색
          borderWidth: 2,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)', // 각 포인트 색
        },
      ],
    },
    options: {
      scales: {
        r: {
          beginAtZero: true, // 시작값 0으로 설정
          ticks: { max: 5, stepSize: 1 }, // 최대값과 간격 설정
        },
      },
      responsive: true, // 화면 크기에 맞게 차트 크기 조절
      maintainAspectRatio: false, // 비율 유지 안 함
    },
  });
}
</script>

<style scoped>
.radar-chart-container {
  width: 300px;
  height: 300px;
  margin: 20px auto;
}
</style>
