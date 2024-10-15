<template>
    <div class="my-page-lessons">
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
import PersonalLessons from '../trainer/PersonalLessons.vue';
import GroupLessons from '../trainer/GroupLessons.vue';
import OnlinePT from '../trainer/OnlinePT.vue';
import OnlineFeedback from '../trainer/OnlineFeedback.vue';

const tabs = [
    { id: 'personal', name: '개인 레슨', component: PersonalLessons },
    { id: 'group', name: '그룹 레슨', component: GroupLessons },
    { id: 'online', name: '온라인 PT', component: OnlinePT },
    { id: 'feedback', name: '온라인 피드백', component: OnlineFeedback },
];

const currentTab = ref('personal');

const currentTabComponent = computed(() => {
    const tab = tabs.find((tab) => tab.id === currentTab.value);
    return tab ? tab.component : null;
});
</script>

<style scoped>
.my-page-lessons {
    width: 70vw;
    margin: 40px auto;
}

.lesson-tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.tab-button {
    padding: 10px 20px;
    font-size: 18px;
    font-family: 'Do Hyeon', sans-serif;
    flex: 1;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
}

.tab-button.active {
    background-color: #f13223;
    color: white;
}

.tab-button:hover {
    background-color: #f13223;
    color: white;
    transition: background-color 0.3s;
}

.tab-content {
    /* background-color: #fff; */
    padding: 1rem;
    /* border: 1px solid #e0e0e0; */
}
</style>
