import { ref } from 'vue';
import jwtAxios, { API_SERVER_HOST } from '../util/jwtUtil';

export function useFileUpload() {
    const uploadStatus = ref('');
    const host = API_SERVER_HOST;

    const uploadFile = (file) => {
        if (!file) {
            uploadStatus.value = '파일이 선택되지 않았습니다.';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('mediaTypeCode', '001');
        formData.append('resourceId', 1);

        jwtAxios
            .post(`http://${host}/api/file`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => {
                console.log('response', response);
                if (response.status === 201) {
                    uploadStatus.value = '파일 업로드 성공!';
                } else {
                    uploadStatus.value = '파일 업로드 실패!';
                }
            })
            .catch((error) => {
                console.error(error);
                uploadStatus.value = '업로드 중 오류 발생!';
            });
    };

    return {
        uploadStatus,
        uploadFile,
    };
}
