import { Request } from "express"
import type { User } from "@prisma/client"

// Type definitions for the string-based enums
export type UserRole = "ADMIN" | "MANAGER" | "EMPLOYEE"
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED"
export type OvertimeStatus = "PENDING" | "APPROVED" | "REJECTED"
export type OvertimeCategory = "REGULAR" | "EMERGENCY" | "WEEKEND" | "HOLIDAY"
export type TOILStatus = "ACTIVE" | "USED" | "EXPIRED"

// Safe user type (no password)
export type SafeUser = {
    id: string
    email: string
    name: string
    role: UserRole
    department?: string | null
    managerId?: string | null
    joinDate: Date
    createdAt: Date
    updatedAt: Date
}

// Extended Request interface with user
export interface AuthenticatedRequest extends Request {
    user?: SafeUser
}

// Auth types
export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    name: string
    role?: UserRole
    department?: string
    managerId?: string
}

export interface AuthResponse {
    user: Omit<User, "password">
    token: string
}

// Leave types
export interface CreateLeaveRequest {
    leaveTypeId: string
    startDate: string
    endDate: string
    startTime?: string
    endTime?: string
    reason?: string
}

export interface UpdateLeaveRequest {
    status: LeaveStatus
    approvedBy?: string
}

export interface LeaveRequestWithDetails {
    id: string
    userId: string
    leaveTypeId: string
    startDate: Date
    endDate: Date
    status: LeaveStatus
    reason?: string
    approvedBy?: string
    approvedAt?: Date
    createdAt: Date
    updatedAt: Date
    user: {
        id: string
        name: string
        email: string
        department?: string
    }
    leaveType: {
        id: string
        name: string
        color: string
    }
}

// Overtime types
export interface CreateOvertimeRequest {
    date: string
    hours: number
    description?: string
    category?: OvertimeCategory
}

export interface UpdateOvertimeRequest {
    status: OvertimeStatus
    approvedBy?: string
}

export interface OvertimeEntryWithDetails {
    id: string
    userId: string
    date: Date
    hours: number
    description?: string
    status: OvertimeStatus
    category: OvertimeCategory
    approvedBy?: string
    approvedAt?: Date
    createdAt: Date
    updatedAt: Date
    user: {
        id: string
        name: string
        email: string
        department?: string
    }
}

// TOIL types
export interface CreateTOILRequest {
    earnedDate: string
    hours: number
    expiryDate?: string
}

export interface UpdateTOILRequest {
    status: TOILStatus
    usedDate?: string
}

export interface TOILEntryWithDetails {
    id: string
    userId: string
    earnedDate: Date
    hours: number
    expiryDate?: Date
    status: TOILStatus
    usedDate?: Date
    startTime?: string
    endTime?: string
    createdAt: Date
    updatedAt: Date
    user: {
        id: string
        name: string
        email: string
        department?: string
    }
}

// Leave Balance types
export interface LeaveBalanceWithDetails {
    id: string
    userId: string
    leaveTypeId: string
    currentBalance: number
    totalEarned: number
    totalUsed: number
    year: number
    createdAt: Date
    updatedAt: Date
    user: {
        id: string
        name: string
        email: string
    }
    leaveType: {
        id: string
        name: string
        color: string
    }
}

// Report types
export interface LeaveSummary {
    totalRequests: number
    approvedRequests: number
    pendingRequests: number
    rejectedRequests: number
    totalDays: number
    approvedDays: number
}

export interface OvertimeSummary {
    totalEntries: number
    totalHours: number
    approvedHours: number
    pendingHours: number
    averageHoursPerMonth: number
}

export interface TOILSummary {
    totalEarned: number
    totalUsed: number
    currentBalance: number
    expiringSoon: number
}

// Pagination types
export interface PaginationParams {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
    data: T[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

// Filter types
export interface LeaveFilters extends PaginationParams {
    status?: LeaveStatus
    leaveTypeId?: string
    startDate?: string
    endDate?: string
    userId?: string
}

export interface OvertimeFilters extends PaginationParams {
    status?: OvertimeStatus
    category?: OvertimeCategory
    startDate?: string
    endDate?: string
    userId?: string
}

export interface TOILFilters extends PaginationParams {
    status?: TOILStatus
    startDate?: string
    endDate?: string
    userId?: string
}
