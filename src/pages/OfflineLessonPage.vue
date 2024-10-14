<template>
    <div class="container">
        <div class="content-wrapper">
            <aside class="sidebar">
                <h3>오프라인 레슨</h3>
                <router-link class="sidebar-item" :to="{ name: 'PersonalLessonList' }">개인 레슨</router-link>
                <router-link class="sidebar-item" :to="{ name: 'GroupLessonList' }">그룹 레슨</router-link>
            </aside>
        </div>

        <div class="main-content">
            <router-view />
            <div class="mbti-content">
                <router-link to="/mbti">
                    <img
                        class="mbti-image"
                        src="https://kosa-final-project-team-3.github.io/cdn/mbti.png"
                        alt="운BTI"
                    />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup></script>
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
    color: #00bf63;
}

.main-content {
    flex: 1;
    padding: 20px;
}

.mbti-content {
    position: fixed;
    top: 200px;
    right: 50px;
    z-index: 1;
}

.mbti-image {
    width: 200px;
    height: 200px;
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
    background-color: #00bf63;
    color: white;
    border: 1px solid #00bf63;
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
