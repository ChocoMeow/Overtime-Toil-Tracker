// User types
export interface User {
    id: string
    email: string
    name: string
    role: "EMPLOYEE" | "MANAGER" | "ADMIN"
    department: string
    joinDate: string
    avatar?: string
}

// Leave types
export interface LeaveType {
    id: string
    name: string
    description: string
    color: string
    maxDays: number
}

export interface LeaveRequest {
    id: string
    userId: string
    leaveTypeId: string
    startDate: string
    endDate: string
    status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED"
    reason: string
    createdAt: string
    updatedAt: string
    leaveType?: LeaveType
    user?: User
}

export interface LeaveBalance {
    id: string
    userId: string
    leaveTypeId: string
    currentBalance: number
    totalEarned: number
    totalUsed: number
    leaveType?: LeaveType
}

// Overtime types
export interface OvertimeEntry {
    id: string
    userId: string
    date: string
    hours: number
    description: string
    status: "PENDING" | "APPROVED" | "REJECTED"
    category: "REGULAR" | "EMERGENCY" | "WEEKEND" | "HOLIDAY"
    createdAt: string
    updatedAt: string
    user?: User
}

// TOIL types
export interface TOILEntry {
    id: string
    userId: string
    earnedDate: string
    hours: number
    expiryDate: string
    status: "ACTIVE" | "USED" | "EXPIRED"
    usedDate?: string
    startTime?: string
    endTime?: string
    createdAt: string
    user?: User
}

// API Response types
export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

// Auth types
export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterData {
    email: string
    password: string
    name: string
    department: string
}

export interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
}

// Dashboard types
export interface DashboardStats {
    totalLeaveDays: number
    pendingRequests: number
    overtimeHours: number
    toilBalance: number
}

// Form types
export interface LeaveRequestForm {
    leaveTypeId: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    reason: string
}

export interface OvertimeEntryForm {
    date: string
    hours: number
    description: string
}
