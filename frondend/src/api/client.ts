const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api"

class ApiClient {
    private baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`
        const token = localStorage.getItem("token")

        const config: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "An error occurred")
            }

            return data
        } catch (error) {
            console.error("API request failed:", error)
            throw error
        }
    }

    // Auth endpoints
    async login(credentials: { email: string; password: string }) {
        const response = await this.request<{ user: any; token: string }>("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        })

        return response
    }

    async register(userData: { email: string; password: string; name: string; department: string }) {
        return this.request<{ user: any; token: string }>("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        })
    }

    async getCurrentUser() {
        return this.request<any>("/auth/me")
    }

    // Leave endpoints
    async getLeaveRequests() {
        return this.request<any[]>("/leaves")
    }

    async getAllLeaveRequests() {
        return this.request<any[]>("/leaves/all")
    }

    async createLeaveRequest(leaveData: { leaveTypeId: string; startDate: string; endDate: string; startTime?: string; endTime?: string; reason?: string }) {
        return this.request<any>("/leaves", {
            method: "POST",
            body: JSON.stringify(leaveData),
        })
    }

    async updateLeaveRequest(
        id: string,
        leaveData: {
            startDate?: string
            endDate?: string
            startTime?: string
            endTime?: string
            reason?: string
        }
    ) {
        return this.request<any>(`/leaves/${id}`, {
            method: "PUT",
            body: JSON.stringify(leaveData),
        })
    }

    async deleteLeaveRequest(id: string) {
        return this.request<void>(`/leaves/${id}`, {
            method: "DELETE",
        })
    }

    // Approval methods
    async getPendingLeaveRequests() {
        return this.request<any[]>(`/leaves/pending`)
    }

    async updateLeaveRequestStatus(id: string, status: "APPROVED" | "REJECTED") {
        return this.request<any>(`/leaves/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        })
    }

    async getLeaveBalance() {
        return this.request<any[]>("/leaves/balance")
    }

    async getLeaveTypes() {
        return this.request<any[]>("/leaves/types")
    }

    // Overtime endpoints
    async getOvertimeEntries() {
        return this.request<any[]>("/overtime")
    }

    async getAllOvertimeEntries() {
        return this.request<any[]>("/overtime/all")
    }

    async createOvertimeEntry(overtimeData: any) {
        return this.request<any>("/overtime", {
            method: "POST",
            body: JSON.stringify(overtimeData),
        })
    }

    async updateOvertimeEntry(id: string, overtimeData: any) {
        return this.request<any>(`/overtime/${id}`, {
            method: "PUT",
            body: JSON.stringify(overtimeData),
        })
    }

    async deleteOvertimeEntry(id: string) {
        return this.request<void>(`/overtime/${id}`, {
            method: "DELETE",
        })
    }

    // Admin overtime approval
    async getPendingOvertimeEntries() {
        return this.request<any[]>(`/overtime/pending`)
    }

    async approveOvertimeEntry(id: string) {
        return this.request<any>(`/overtime/${id}/approve`, {
            method: "POST",
        })
    }

    async rejectOvertimeEntry(id: string) {
        return this.request<any>(`/overtime/${id}/reject`, {
            method: "POST",
        })
    }

    // TOIL endpoints
    async getTOILEntries() {
        return this.request<any[]>("/toil")
    }

    async getAllTOILEntries() {
        return this.request<any[]>("/toil/all")
    }

    async createTOILEntry(toilData: any) {
        return this.request<any>("/toil", {
            method: "POST",
            body: JSON.stringify(toilData),
        })
    }

    async updateTOILEntry(id: string, toilData: any) {
        return this.request<any>(`/toil/${id}`, {
            method: "PUT",
            body: JSON.stringify(toilData),
        })
    }

    async deleteTOILEntry(id: string) {
        return this.request<void>(`/toil/${id}`, {
            method: "DELETE",
        })
    }

    async useTOIL(id: string, toilUsageData: { usedDate: string; startTime: string; endTime: string }) {
        return this.request<any>(`/toil/${id}/use`, {
            method: "POST",
            body: JSON.stringify(toilUsageData),
        })
    }

    // Reports endpoints
    async getLeaveSummary() {
        return this.request<any>("/reports/leave-summary")
    }

    async getOvertimeSummary() {
        return this.request<any>("/reports/overtime-summary")
    }

    async getTOILSummary() {
        return this.request<any>("/reports/toil-summary")
    }
}

export const apiClient = new ApiClient(API_BASE_URL)
