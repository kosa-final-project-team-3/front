import { defineStore } from 'pinia';
import { ref } from 'vue';
import jwtAxios, { API_SERVER_HOST } from '../util/jwtUtil';
import { getCookie } from '../util/cookieUtil';

const host = API_SERVER_HOST;

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);

    const checkAuthStatus = () => {
        const id = getCookie('id');
        const provider = getCookie('provider');

        if (id && provider) {
            isAuthenticated.value = true;
        } else {
            isAuthenticated.value = false;
        }
    };

    const logout = async () => {
        try {
            const res = await jwtAxios.get(`http://${host}/api/member/logout`);
            if (res.status === 200) {
                console.log(res.data);
                isAuthenticated.value = false;
            }
        } catch (e) {
            console.error(`logout failed. \ncaused: ${e}`);
        }
    };

    return {
        isAuthenticated,
        checkAuthStatus,
        logout,
    };
});
