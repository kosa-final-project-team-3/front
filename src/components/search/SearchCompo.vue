<template>
    <div class="container">
        <div class="main-content">
            <div class="search-sort-container">
                <div class="search-container">
                    <form>
                        <select v-model="searchDefault">
                            <option value="total">전체</option>
                            <option value="title">레슨명</option>
                            <option value="trainer">강사명</option>
                        </select>
                        <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요" />
                        <button @click="search">검색</button>
                    </form>
                </div>

                <div class="sort-container">
                    <select v-model="sortDefault" @change="sort">
                        <option value="latest">최신순</option>
                        <option value="popular">인기순</option>
                        <option value="latest">만족도순</option>
                        <option value="oldest">가격순</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const searchDefault = ref('total');
const sortDefault = ref('latest');
</script>

<style scoped>
.container {
    display: flex;
}

.content-wrapper {
    font-family: 'Do Hyeon', sans-serif;
}

.sidebar {
    width: 250px;
    padding: 1rem;
}

.sidebar h3 {
    font-size: 1.5em;
    padding: 0.5rem;
    margin: 1rem 1rem 2rem 1rem;
}

.sidebar-item {
    font-size: 1.3em;
    display: block;
    color: #333;
    padding: 0.5rem;
    text-decoration: none;
    margin: 1rem;
    transition: color 0.3s ease;
}

.sidebar-item:hover {
    color: #f13223;
}

.main-content {
    flex: 1;
    padding: 20px;
}

.search-sort-container {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}

.search-container {
    display: flex;
}
.search-container form {
    display: flex;
    gap: 10px;
}

.search-container button {
    background-color: #f13223;
    color: white;
    border: 1px solid #f13223;
}

.sort-container select {
    margin-right: 20px;
}

.search-container input {
    width: 200px;
}

select,
input,
button {
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #000000;
}
</style>
