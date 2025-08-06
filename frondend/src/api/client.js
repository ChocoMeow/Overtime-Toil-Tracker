const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "An error occurred");
            }
            return data;
        }
        catch (error) {
            console.error("API request failed:", error);
            throw error;
        }
    }
    // Auth endpoints
    async login(credentials) {
        const response = await this.request("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
        return response;
    }
    async register(userData) {
        return this.request("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    }
    async getCurrentUser() {
        return this.request("/auth/me");
    }
    // Leave endpoints
    async getLeaveRequests() {
        return this.request("/leaves");
    }
    async getAllLeaveRequests() {
        return this.request("/leaves/all");
    }
    async createLeaveRequest(leaveData) {
        return this.request("/leaves", {
            method: "POST",
            body: JSON.stringify(leaveData),
        });
    }
    async updateLeaveRequest(id, leaveData) {
        return this.request(`/leaves/${id}`, {
            method: "PUT",
            body: JSON.stringify(leaveData),
        });
    }
    async deleteLeaveRequest(id) {
        return this.request(`/leaves/${id}`, {
            method: "DELETE",
        });
    }
    // Approval methods
    async getPendingLeaveRequests() {
        return this.request(`/leaves/pending`);
    }
    async updateLeaveRequestStatus(id, status) {
        return this.request(`/leaves/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        });
    }
    async getLeaveBalance() {
        return this.request("/leaves/balance");
    }
    async getLeaveTypes() {
        return this.request("/leaves/types");
    }
    // Overtime endpoints
    async getOvertimeEntries() {
        return this.request("/overtime");
    }
    async getAllOvertimeEntries() {
        return this.request("/overtime/all");
    }
    async createOvertimeEntry(overtimeData) {
        return this.request("/overtime", {
            method: "POST",
            body: JSON.stringify(overtimeData),
        });
    }
    async updateOvertimeEntry(id, overtimeData) {
        return this.request(`/overtime/${id}`, {
            method: "PUT",
            body: JSON.stringify(overtimeData),
        });
    }
    async deleteOvertimeEntry(id) {
        return this.request(`/overtime/${id}`, {
            method: "DELETE",
        });
    }
    // Admin overtime approval
    async getPendingOvertimeEntries() {
        return this.request(`/overtime/pending`);
    }
    async approveOvertimeEntry(id) {
        return this.request(`/overtime/${id}/approve`, {
            method: "POST",
        });
    }
    async rejectOvertimeEntry(id) {
        return this.request(`/overtime/${id}/reject`, {
            method: "POST",
        });
    }
    // TOIL endpoints
    async getTOILEntries() {
        return this.request("/toil");
    }
    async getAllTOILEntries() {
        return this.request("/toil/all");
    }
    async createTOILEntry(toilData) {
        return this.request("/toil", {
            method: "POST",
            body: JSON.stringify(toilData),
        });
    }
    async updateTOILEntry(id, toilData) {
        return this.request(`/toil/${id}`, {
            method: "PUT",
            body: JSON.stringify(toilData),
        });
    }
    async deleteTOILEntry(id) {
        return this.request(`/toil/${id}`, {
            method: "DELETE",
        });
    }
    async useTOIL(id, toilUsageData) {
        return this.request(`/toil/${id}/use`, {
            method: "POST",
            body: JSON.stringify(toilUsageData),
        });
    }
    // Reports endpoints
    async getLeaveSummary() {
        return this.request("/reports/leave-summary");
    }
    async getOvertimeSummary() {
        return this.request("/reports/overtime-summary");
    }
    async getTOILSummary() {
        return this.request("/reports/toil-summary");
    }
}
export const apiClient = new ApiClient(API_BASE_URL);
