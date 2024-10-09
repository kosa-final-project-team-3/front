<template>
    <div>
        <h1>파일 검색</h1>
        <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요" />
        <select v-model="mediaTypeCode">
            <option value="">미디어 타입 선택</option>
            <option value="001">강사 회원 프로필 이미지</option>
            <option value="VIDEO">비디오</option>
            <option value="DOCUMENT">문서</option>
        </select>
        <input type="number" v-model="resourceId" placeholder="리소스 ID" />
        <button @click="searchFiles">검색</button>
        <div v-if="searchResults.length > 0">
            <h2>검색 결과</h2>
            <ul>
                <li v-for="file in searchResults" :key="file.id">{{ file.url }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import jwtAxios, { API_SERVER_HOST } from '../util/jwtUtil';

const searchQuery = ref('');
const mediaTypeCode = ref('');
const resourceId = ref(null);
const searchResults = ref([]);

const searchFiles = () => {
    jwtAxios
        .get(`http://${API_SERVER_HOST}/api/file/search`, {
            params: {
                // query: searchQuery.value,
                mediaTypeCode: mediaTypeCode.value,
                resourceId: resourceId.value,
            },
        })
        .then((response) => {
            searchResults.value = response.data;
        })
        .catch((error) => {
            console.error('Error searching files:', error);
        });
};
</script>

<style></style>
