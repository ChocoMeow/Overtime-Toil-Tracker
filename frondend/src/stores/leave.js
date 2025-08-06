import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiClient } from "@/api/client";
export const useLeaveStore = defineStore("leave", () => {
    const leaveRequests = ref([]);
    const leaveBalances = ref([]);
    const leaveTypes = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const pendingRequests = computed(() => leaveRequests.value.filter((request) => request.status === "PENDING"));
    const approvedRequests = computed(() => leaveRequests.value.filter((request) => request.status === "APPROVED"));
    const totalLeaveDays = computed(() => approvedRequests.value.reduce((total, request) => {
        const start = new Date(request.startDate);
        const end = new Date(request.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (100 * 60 * 24)) + 1;
        return total + diffDays;
    }, 0));
    const fetchLeaveRequests = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.getLeaveRequests();
            leaveRequests.value = response || [];
        }
        catch (err) {
            console.error("Failed to fetch leave requests:", err);
            error.value = err.message || "Failed to fetch leave requests";
        }
        finally {
            loading.value = false;
        }
    };
    const fetchAllLeaveRequests = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.getAllLeaveRequests();
            return response || [];
        }
        catch (err) {
            console.error("Failed to fetch all leave requests:", err);
            error.value = err.message || "Failed to fetch all leave requests";
            return [];
        }
        finally {
            loading.value = false;
        }
    };
    const createLeaveRequest = async (leaveData) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.createLeaveRequest(leaveData);
            // Add the new request to the list
            if (response) {
                leaveRequests.value.unshift(response);
            }
            return response;
        }
        catch (err) {
            console.error("Failed to create leave request:", err);
            error.value = err.message || "Failed to create leave request";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const updateLeaveRequest = async (id, leaveData) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.updateLeaveRequest(id, leaveData);
            // Update the request in the list
            const index = leaveRequests.value.findIndex((request) => request.id === id);
            if (index !== -1 && response) {
                leaveRequests.value[index] = response;
            }
            return response;
        }
        catch (err) {
            console.error("Failed to update leave request:", err);
            error.value = err.message || "Failed to update leave request";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const deleteLeaveRequest = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            await apiClient.deleteLeaveRequest(id);
            // Remove the request from the list
            leaveRequests.value = leaveRequests.value.filter((request) => request.id !== id);
        }
        catch (err) {
            console.error("Failed to delete leave request:", err);
            error.value = err.message || "Failed to delete leave request";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const fetchLeaveBalance = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.getLeaveBalance();
            leaveBalances.value = response || [];
        }
        catch (err) {
            console.error("Failed to fetch leave balance:", err);
            error.value = err.message || "Failed to fetch leave balance";
        }
        finally {
            loading.value = false;
        }
    };
    const fetchLeaveTypes = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.getLeaveTypes();
            leaveTypes.value = response || [];
        }
        catch (err) {
            console.error("Failed to fetch leave types:", err);
            error.value = err.message || "Failed to fetch leave types";
        }
        finally {
            loading.value = false;
        }
    };
    const clearError = () => {
        error.value = null;
    };
    return {
        leaveRequests,
        leaveBalances,
        leaveTypes,
        loading,
        error,
        pendingRequests,
        approvedRequests,
        totalLeaveDays,
        fetchLeaveRequests,
        createLeaveRequest,
        updateLeaveRequest,
        deleteLeaveRequest,
        fetchLeaveBalance,
        fetchLeaveTypes,
        fetchAllLeaveRequests,
        clearError,
    };
});
