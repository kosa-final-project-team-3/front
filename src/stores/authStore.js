import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCookie } from '../util/cookieUtil';
import jwtAxios, { API_SERVER_HOST } from '../util/jwtUtil';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const host = API_SERVER_HOST;
    const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
    const role = ref(localStorage.getItem('role') || '');
    const username = ref(localStorage.getItem('username') || '');
    const id = ref(localStorage.getItem('id') || '');

    const checkAuthStatus = () => {
        axios
            .get(`http://${host}/api/member/me`, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data;
                    console.log(data);
                    updateAuthState(true, data.role, data.username, data.id);
                }
            })
            .catch((e) => {
                console.error(`authorization failed. \ncaused: ${JSON.stringify(e)}`);
                updateAuthState(false, '', '');
            });
    };

    const updateAuthState = (auth, userRole, name, userId) => {
        isAuthenticated.value = auth;
        role.value = userRole;
        username.value = name;
        id.value = userId;
        localStorage.setItem('isAuthenticated', auth);
        localStorage.setItem('role', userRole);
        localStorage.setItem('username', name);
        localStorage.setItem('id', id);
    };

    const logout = () => {
        jwtAxios
            .get(`http://${host}/api/member/logout`)
            .then((res) => {
                if (res.status === 200) {
                    updateAuthState(false, '', '');
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return {
        isAuthenticated,
        role,
        username,
        id,
        checkAuthStatus,
        logout,
    };
});
