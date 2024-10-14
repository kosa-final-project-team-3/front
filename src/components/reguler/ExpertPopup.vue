<template>
    <div v-if="isVisible" class="expert-popup-overlay">
        <div class="expert-popup">
            <h3>전문가 전환 신청</h3>
            <p>✔️ 하나 이상의 인증을 등록해야 전문가로 전환됩니다.</p>
            <p>✔️ 인증 소요시간 2일~3일 입니다.</p>

            <div class="form-group">
                <label for="exerciseCategory">운동 카테고리:</label>
                <select id="exerciseCategory" v-model="selectedCategory" required>
                    <option value="">카테고리 선택</option>
                    <option
                        v-for="category in exerciseCategories"
                        :key="category.exerciseCategoryCode"
                        :value="category.exerciseCategoryCode"
                    >
                        {{ category.exerciseCategoryName }}
                    </option>
                </select>
            </div>

            <div v-for="(category, index) in certificationCategories" :key="index" class="certification-category">
                <h4>{{ category.name }}</h4>
                <div v-for="(cert, certIndex) in category.certifications" :key="certIndex" class="certification-item">
                    <input v-model="cert.name" :placeholder="category.namePlaceholder" />
                    <template v-if="category.type === 'period'">
                        <input v-model="cert.startDate" type="date" placeholder="시작일" />
                        <input v-model="cert.endDate" type="date" placeholder="종료일" />
                    </template>
                    <template v-else>
                        <input v-model="cert.date" type="date" />
                    </template>
                    <textarea v-model="cert.detail" placeholder="상세 정보"></textarea>
                    <button @click="removeCertification(category, certIndex)" class="remove-btn">-</button>
                </div>
                <button @click="addCertification(category)" class="add-btn">+</button>
            </div>

            <div class="certification-category document-submission">
                <h4>증빙서류 제출</h4>
                ✔️ 파일명을 인증 이름으로 제출해주세요 (ex. 생활스포츠지도사 2급.jpg)
                <div v-for="(file, index) in attachedFiles" :key="index" class="file-item">
                    <span>{{ file.name }}</span>
                    <button @click="removeFile(index)" class="remove-btn">-</button>
                </div>
                <div class="file-upload">
                    <input
                        type="file"
                        @change="handleFileUpload"
                        ref="fileInput"
                        accept="image/*"
                        style="display: none"
                    />
                    <button @click="triggerFileUpload" class="btn-file-upload">파일 찾아보기</button>
                </div>
            </div>

            <div class="popup-actions">
                <button
                    @click="submitApplication"
                    class="btn-submit"
                    :disabled="!hasAnyCertification || !selectedCategory"
                >
                    신청하기
                </button>
                <button @click="close" class="btn-cancel">취소</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import jwtAxios, { API_SERVER_HOST } from '../../util/jwtUtil';

const props = defineProps({
    isVisible: Boolean,
});

const emit = defineEmits(['close', 'submit']);

const host = API_SERVER_HOST;
const authStore = useAuthStore();

const exerciseCategories = ref([]);
const selectedCategory = ref('');

const certificationCategories = reactive([
    { name: '교육사항', namePlaceholder: '교육 기관명', type: 'period', certifications: [] },
    { name: '수상이력', namePlaceholder: '수상명', type: 'date', certifications: [] },
    { name: '자격증', namePlaceholder: '자격증명', certifications: [] },
    { name: '경력', namePlaceholder: '회사명', type: 'period', certifications: [] },
]);

const addCertification = (category) => {
    if (category.type === 'period') {
        category.certifications.push({ name: '', startDate: '', endDate: '', detail: '' });
    } else {
        category.certifications.push({ name: '', date: '', detail: '' });
    }
};

const removeCertification = (category, index) => {
    category.certifications.splice(index, 1);
};

const attachedFiles = ref([]);
const fileInput = ref(null);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        attachedFiles.value.push(file);
    }
};

const triggerFileUpload = () => {
    fileInput.value.click();
};

const removeFile = (index) => {
    attachedFiles.value.splice(index, 1);
};

const hasAnyCertification = computed(() => {
    return certificationCategories.some((category) => category.certifications.length > 0);
});

onMounted(async () => {
    await fetchExerciseCategories();
});

const fetchExerciseCategories = async () => {
    try {
        const response = await jwtAxios.get(`http://${host}/api/trainer/exercise-categories`);
        exerciseCategories.value = response.data;
    } catch (error) {
        console.error('Failed to fetch exercise categories:', error);
    }
};

const uploadFiles = async () => {
    const uploadedFiles = [];
    for (const file of attachedFiles.value) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('mediaTypeCode', '1');
        formData.append('resourceId', authStore.id);

        try {
            const response = await jwtAxios.post(`http://${API_SERVER_HOST}/api/file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            uploadedFiles.push(response.data);
        } catch (error) {
            console.error('Failed to upload file:', error);
            alert(`파일 업로드 중 오류가 발생했습니다: ${file.name}`);
        }
    }
    return uploadedFiles;
};

const submitApplication = async () => {
    if (hasAnyCertification.value && selectedCategory.value) {
        try {
            // 파일 업로드
            const uploadedFiles = await uploadFiles();

            const profiles = certificationCategories.flatMap((category) =>
                category.certifications.map((cert) => ({
                    trainerId: authStore.id,
                    categoryCode: getCategoryCode(category.name),
                    categoryName: category.name,
                    title: cert.name,
                    startDate: cert.startDate || cert.date,
                    endDate: cert.endDate || cert.date,
                    detail: cert.detail,
                })),
            );

            // 프로필 정보 저장
            await jwtAxios.post(`http://${API_SERVER_HOST}/api/trainer/save`, profiles);

            // 운동 카테고리 업데이트
            await jwtAxios.put(`http://${API_SERVER_HOST}/api/trainer/${authStore.id}/update-category`, null, {
                params: { exerciseCategoryCode: selectedCategory.value },
            });

            alert('전문가 전환 신청이 완료되었습니다.');
            emit('close');
        } catch (error) {
            console.error('Failed to submit application:', error);
            alert('전문가 전환 신청 중 오류가 발생했습니다.');
        }
    }
};

const getCategoryCode = (categoryName) => {
    // 카테고리 이름에 따른 코드 매핑
    const codeMap = {
        교육사항: 'EDU',
        수상이력: 'AWARD',
        자격증: 'CERT',
        경력: 'EXP',
    };
    return codeMap[categoryName] || '';
};

const close = () => {
    emit('close');
};
</script>

<style scoped>
.expert-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.expert-popup {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
}

.certification-category {
    margin-bottom: 1rem;
}

.certification-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.certification-item input,
.certification-item textarea {
    margin-bottom: 0.5rem;
}

.certification-item textarea {
    height: 60px;
    resize: vertical;
}

.add-btn,
.remove-btn {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
}

.popup-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.btn-cancel {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
}

.btn-submit {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-submit:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.btn-cancel {
    background-color: #f44336;
    color: white;
    border: none;
}

.document-submission {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    padding: 1rem;
    border-top: 1px solid #e0e0e0;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    width: 100%;
    max-width: 300px;
}

.file-upload {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    width: 100%;
    max-width: 300px;
    justify-content: center;
}

.btn-file-upload {
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    margin-right: 0.5rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
}
</style>
