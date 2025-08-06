import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiClient } from "@/api/client";
export const useOvertimeStore = defineStore("overtime", () => {
    const overtimeEntries = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const pendingEntries = computed(() => overtimeEntries.value.filter((entry) => entry.status === "PENDING"));
    const approvedEntries = computed(() => overtimeEntries.value.filter((entry) => entry.status === "APPROVED"));
    const totalOvertimeHours = computed(() => overtimeEntries.value.filter((entry) => entry.status === "APPROVED").reduce((total, entry) => total + entry.hours, 0));
    const monthlyOvertimeHours = computed(() => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return overtimeEntries.value
            .filter((entry) => {
            const entryDate = new Date(entry.date);
            return entry.status === "APPROVED" && entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
        })
            .reduce((total, entry) => total + entry.hours, 0);
    });
    const fetchOvertimeEntries = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.getOvertimeEntries();
            overtimeEntries.value = response || [];
        }
        catch (err) {
            console.error("Failed to fetch overtime entries:", err);
            error.value = err.message || "Failed to fetch overtime entries";
        }
        finally {
            loading.value = false;
        }
    };
    const fetchAllOvertimeEntries = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.getAllOvertimeEntries();
            return response || [];
        }
        catch (err) {
            console.error("Failed to fetch all overtime entries:", err);
            error.value = err.message || "Failed to fetch all overtime entries";
            return [];
        }
        finally {
            loading.value = false;
        }
    };
    const createOvertimeEntry = async (overtimeData) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.createOvertimeEntry(overtimeData);
            // Add the new entry to the list
            if (response) {
                overtimeEntries.value.unshift(response);
            }
            return response;
        }
        catch (err) {
            console.error("Failed to create overtime entry:", err);
            error.value = err.message || "Failed to create overtime entry";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const updateOvertimeEntry = async (id, overtimeData) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.updateOvertimeEntry(id, overtimeData);
            // Update the entry in the list
            const index = overtimeEntries.value.findIndex((entry) => entry.id === id);
            if (index !== -1 && response) {
                overtimeEntries.value[index] = response;
            }
            return response;
        }
        catch (err) {
            console.error("Failed to update overtime entry:", err);
            error.value = err.message || "Failed to update overtime entry";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const deleteOvertimeEntry = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            await apiClient.deleteOvertimeEntry(id);
            // Remove the entry from the list
            overtimeEntries.value = overtimeEntries.value.filter((entry) => entry.id !== id);
        }
        catch (err) {
            console.error("Failed to delete overtime entry:", err);
            error.value = err.message || "Failed to delete overtime entry";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const clearError = () => {
        error.value = null;
    };
    // Admin methods for overtime approval
    const pendingOvertimeEntries = ref([]);
    const fetchPendingOvertimeEntries = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.getPendingOvertimeEntries();
            pendingOvertimeEntries.value = response || [];
        }
        catch (err) {
            console.error("Failed to fetch pending overtime entries:", err);
            error.value = err.message || "Failed to fetch pending overtime entries";
        }
        finally {
            loading.value = false;
        }
    };
    const approveOvertimeEntry = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.approveOvertimeEntry(id);
            // Update the entry in the pending list
            const index = pendingOvertimeEntries.value.findIndex((entry) => entry.id === id);
            if (index !== -1 && response) {
                pendingOvertimeEntries.value[index] = response;
            }
            return response;
        }
        catch (err) {
            console.error("Failed to approve overtime entry:", err);
            error.value = err.message || "Failed to approve overtime entry";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    const rejectOvertimeEntry = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.rejectOvertimeEntry(id);
            // Update the entry in the pending list
            const index = pendingOvertimeEntries.value.findIndex((entry) => entry.id === id);
            if (index !== -1 && response) {
                pendingOvertimeEntries.value[index] = response;
            }
            return response;
        }
        catch (err) {
            console.error("Failed to reject overtime entry:", err);
            error.value = err.message || "Failed to reject overtime entry";
            throw err;
        }
        finally {
            loading.value = false;
        }
    };
    return {
        overtimeEntries,
        loading,
        error,
        pendingEntries,
        approvedEntries,
        totalOvertimeHours,
        monthlyOvertimeHours,
        pendingOvertimeEntries,
        fetchOvertimeEntries,
        fetchAllOvertimeEntries,
        createOvertimeEntry,
        updateOvertimeEntry,
        deleteOvertimeEntry,
        fetchPendingOvertimeEntries,
        approveOvertimeEntry,
        rejectOvertimeEntry,
        clearError,
    };
});
