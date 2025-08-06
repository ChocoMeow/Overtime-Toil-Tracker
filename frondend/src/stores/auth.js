import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiClient } from "@/api/client";
export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const token = ref(localStorage.getItem("token"));
    const loading = ref(false);
    const error = ref(null);
    const isAuthenticated = computed(() => !!token.value && !!user.value);
    const login = async (credentials) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.login(credentials);
            // Backend returns data directly: {user: {...}, token: "..."}
            if (response && response.user && response.token) {
                console.log("Successfully logged in");
                user.value = response.user;
                token.value = response.token;
                localStorage.setItem("token", response.token);
                return response;
            }
            else {
                throw new Error("Invalid response format");
            }
        }
        catch (err) {
            console.error("Login error:", err);
            error.value = err.message || "Login failed";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const register = async (userData) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.register(userData);
            // Backend returns data directly: {user: {...}, token: "..."}
            if (response && response.user && response.token) {
                user.value = response.user;
                token.value = response.token;
                localStorage.setItem("token", response.token);
                return response;
            }
            else {
                throw new Error("Invalid response format");
            }
        }
        catch (err) {
            error.value = err.message || "Registration failed";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const logout = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem("token");
    };
    const fetchCurrentUser = async () => {
        if (!token.value)
            return null;
        try {
            const response = await apiClient.getCurrentUser();
            // Backend returns data directly: {user: {...}}
            if (response && response.user) {
                user.value = response.user;
                return response.user;
            }
        }
        catch (err) {
            console.error("Failed to fetch current user:", err);
            logout();
        }
        return null;
    };
    const clearError = () => {
        error.value = null;
    };
    return {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        fetchCurrentUser,
        clearError,
    };
});
