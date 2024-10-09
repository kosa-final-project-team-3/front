<template>
    <div class="my-page-lessons">
        <h2>내 레슨 관리</h2>
        <div class="lesson-tabs">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="currentTab = tab.id"
                :class="{ active: currentTab === tab.id }"
                class="tab-button"
            >
                {{ tab.name }}
            </button>
        </div>
        <div class="tab-content">
            <component :is="currentTabComponent"></component>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PersonalLessons from '../trainerpage/PersonalLessons.vue';
import GroupLessons from '../trainerpage/GroupLessons.vue';
import OnlinePT from '../trainerpage/OnlinePT.vue';

const tabs = [
    { id: 'personal', name: '개인 레슨', component: PersonalLessons },
    { id: 'group', name: '그룹 레슨', component: GroupLessons },
    { id: 'online', name: '온라인 PT', component: OnlinePT },
];

const currentTab = ref('personal');

const currentTabComponent = computed(() => {
    const tab = tabs.find((tab) => tab.id === currentTab.value);
    return tab ? tab.component : null;
});
</script>

<style scoped>
.my-page-lessons {
    max-width: 800px;
    margin: 0 auto;
}

.lesson-tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.tab-button {
    flex: 1;
    padding: 0.5rem;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.tab-button.active {
    background-color: red;
    color: white;
}

.tab-content {
    background-color: #fff;
    padding: 1rem;
    border: 1px solid #e0e0e0;
}
</style>
