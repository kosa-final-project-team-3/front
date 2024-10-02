<template>
  <div>
    <h1>여기는 트레이너 페이지 입니다</h1>
    <button @click="createRoom">방 생성허기</button>
    <div v-if="roomUrl">
      <p>생성된 방 링크: <a :href="roomUrl" target="_blank">{{ roomUrl }}</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const roomUrl = ref(null);

const createRoom = async () => {
  try {
    const response = await axios.post('http://localhost:8083/create-room');
    roomUrl.value = response.data.roomUrl;
  } catch (error) {
    console.error("Failed to create room:", error);
  }
};
</script>
