import { defineStore } from 'pinia';
import { ref } from 'vue';
import jwtAxios, { API_SERVER_HOST } from '../util/jwtUtil';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const host = API_SERVER_HOST;
    const isAuthenticated = ref(false);
    const role = ref('');
    const username = ref('');

    const checkAuthStatus = () => {
        axios
            .get(`http://${host}/api/member/me`, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data;
                    role.value = data.role;
                    username.value = data.username;
                    isAuthenticated.value = true;
                }
            })
            .catch((e) => {
                console.error(`authorization failed. \ncaused: ${JSON.stringify(e)}`);
                isAuthenticated.value = false;
            });
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
        role,
        username,
        checkAuthStatus,
        logout,
    };
});
