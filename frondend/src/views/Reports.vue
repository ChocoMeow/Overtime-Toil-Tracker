<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useLeaveStore } from "@/stores/leave"
import { useOvertimeStore } from "@/stores/overtime"
import { useTOILStore } from "@/stores/toil"
import { useAuthStore } from "@/stores/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, TrendingUp, Download, BarChart3, Filter, CalendarDays, Target } from "lucide-vue-next"

const leaveStore = useLeaveStore()
const overtimeStore = useOvertimeStore()
const toilStore = useTOILStore()
// const authStore = useAuthStore()

// Filters
const selectedPeriod = ref("month")
const startDate = ref("")
const endDate = ref("")
const selectedDepartment = ref("all")

const periods = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
    { value: "custom", label: "Custom Range" },
]

const departments = [
    { value: "all", label: "All Departments" },
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "hr", label: "Human Resources" },
]

// Computed statistics with period filtering
const leaveStats = computed(() => {
    const requests = leaveStore.leaveRequests || []
    const filteredRequests = filterByPeriod(requests, "createdAt")
    return {
        totalRequests: filteredRequests.length,
        pendingRequests: filteredRequests.filter((r) => r.status === "pending").length,
        approvedRequests: filteredRequests.filter((r) => r.status === "approved").length,
        rejectedRequests: filteredRequests.filter((r) => r.status === "rejected").length,
        totalDays: leaveStore.totalLeaveDays || 0,
        averageProcessingTime: calculateAverageProcessingTime(filteredRequests),
    }
})

const overtimeStats = computed(() => {
    const entries = overtimeStore.overtimeEntries || []
    const filteredEntries = filterByPeriod(entries, "date")
    return {
        totalHours: filteredEntries.filter((e) => e.status === "APPROVED").reduce((sum, e) => sum + e.hours, 0),
        monthlyHours: overtimeStore.monthlyOvertimeHours || 0,
        pendingEntries: filteredEntries.filter((e) => e.status === "PENDING").length,
        approvedEntries: filteredEntries.filter((e) => e.status === "APPROVED").length,
        rejectedEntries: filteredEntries.filter((e) => e.status === "REJECTED").length,
        averageHoursPerEntry: calculateAverageHours(filteredEntries),
    }
})

const toilStats = computed(() => {
    const entries = toilStore.toilEntries || []
    const filteredEntries = filterByPeriod(entries, "earnedDate")
    return {
        totalBalance: toilStore.totalTOILBalance || 0,
        activeEntries: toilStore.activeEntries?.length || 0,
        expiringSoon: toilStore.expiringSoonEntries?.length || 0,
        usedEntries: toilStore.usedEntries?.length || 0,
        totalEarned: filteredEntries.reduce((sum, e) => sum + e.hours, 0),
        totalUsed: filteredEntries.filter((e) => e.status === "USED").reduce((sum, e) => sum + e.hours, 0),
        utilizationRate: calculateUtilizationRate(filteredEntries),
    }
})

// Helper functions
const filterByPeriod = (items: any[], dateField: string) => {
    if (selectedPeriod.value === "custom" && startDate.value && endDate.value) {
        const start = new Date(startDate.value)
        const end = new Date(endDate.value)
        return items.filter((item) => {
            const itemDate = new Date(item[dateField])
            return itemDate >= start && itemDate <= end
        })
    }

    const now = new Date()
    let start: Date

    switch (selectedPeriod.value) {
        case "week":
            start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            break
        case "month":
            start = new Date(now.getFullYear(), now.getMonth(), 1)
            break
        case "quarter":
            const quarter = Math.floor(now.getMonth() / 3)
            start = new Date(now.getFullYear(), quarter * 3, 1)
            break
        case "year":
            start = new Date(now.getFullYear(), 0, 1)
            break
        default:
            return items
    }

    return items.filter((item) => {
        const itemDate = new Date(item[dateField])
        return itemDate >= start && itemDate <= now
    })
}

const calculateAverageProcessingTime = (requests: any[]) => {
    const processedRequests = requests.filter((r) => r.status === "approved" && r.approvedAt)
    if (processedRequests.length === 0) return 0

    const totalTime = processedRequests.reduce((sum, r) => {
        const created = new Date(r.createdAt)
        const approved = new Date(r.approvedAt)
        return sum + (approved.getTime() - created.getTime())
    }, 0)
    return Math.round(totalTime / processedRequests.length / (1000 * 60 * 60 * 24)) // Days
}

const calculateAverageHours = (entries: any[]) => {
    if (entries.length === 0) return 0
    const totalHours = entries.reduce((sum, e) => sum + e.hours, 0)
    return Math.round((totalHours / entries.length) * 10) / 10
}

const calculateUtilizationRate = (entries: any[]) => {
    const totalEarned = entries.reduce((sum, e) => sum + e.hours, 0)
    const totalUsed = entries.filter((e) => e.status === "USED").reduce((sum, e) => sum + e.hours, 0)
    return totalEarned > 0 ? Math.round((totalUsed / totalEarned) * 100) : 0
}

// Export functionality
const exportReport = async (type: string) => {
    try {
        const data = {
            type,
            period: selectedPeriod.value,
            startDate: startDate.value,
            endDate: endDate.value,
            department: selectedDepartment.value,
            timestamp: new Date().toISOString(),
        }

        // Generate report data based on type
        let reportData = {}
        switch (type) {
            case "leave":
                reportData = {
                    summary: leaveStats.value,
                    details: leaveStore.leaveRequests || [],
                }
                break
            case "overtime":
                reportData = {
                    summary: overtimeStats.value,
                    details: overtimeStore.overtimeEntries || [],
                }
                break
            case "toil":
                reportData = {
                    summary: toilStats.value,
                    details: toilStore.toilEntries || [],
                }
                break
            case "all":
                reportData = {
                    leave: { summary: leaveStats.value, details: leaveStore.leaveRequests || [] },
                    overtime: { summary: overtimeStats.value, details: overtimeStore.overtimeEntries || [] },
                    toil: { summary: toilStats.value, details: toilStore.toilEntries || [] },
                }
                break
        }

        // Create and download JSON file
        const blob = new Blob([JSON.stringify({ ...data, ...reportData }, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${type}_report_${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        console.log(`Exported ${type} report successfully`)
    } catch (error) {
        console.error("Export failed:", error)
        alert("Export failed. Please try again.")
    }
}

// Initialize date range
const initializeDateRange = () => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    startDate.value = startOfMonth.toISOString().split("T")[0]
    endDate.value = now.toISOString().split("T")[0]
}

onMounted(async () => {
    try {
        initializeDateRange()
        await Promise.all([leaveStore.fetchLeaveRequests(), leaveStore.fetchLeaveBalance(), overtimeStore.fetchOvertimeEntries(), toilStore.fetchTOILEntries()])
    } catch (error) {
        console.error("Failed to fetch report data:", error)
    }
})
</script>

<template>
    <div class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p class="text-gray-600">Comprehensive insights into leave, overtime, and TOIL data</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
                <Button variant="outline" @click="exportReport('all')">
                    <Download class="mr-2 h-4 w-4" />
                    Export All
                </Button>
            </div>
        </div>

        <!-- Filters -->
        <Card>
            <CardHeader>
                <CardTitle class="flex items-center">
                    <Filter class="mr-2 h-5 w-5" />
                    Filters
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Period</label>
                        <select v-model="selectedPeriod" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option v-for="period in periods" :key="period.value" :value="period.value">
                                {{ period.label }}
                            </option>
                        </select>
                    </div>

                    <div v-if="selectedPeriod === 'custom'">
                        <label class="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            v-model="startDate"
                            type="date"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div v-if="selectedPeriod === 'custom'">
                        <label class="block text-sm font-medium text-gray-700">End Date</label>
                        <input v-model="endDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Department</label>
                        <select v-model="selectedDepartment" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option v-for="dept in departments" :key="dept.value" :value="dept.value">
                                {{ dept.label }}
                            </option>
                        </select>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card class="bg-gradient-to-br from-blue-50">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-blue-800">Leave Requests</CardTitle>
                    <Calendar class="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-blue-900">{{ leaveStats.totalRequests }}</div>
                    <p class="text-xs text-blue-700">{{ leaveStats.pendingRequests }} pending</p>
                    <div class="mt-2">
                        <Button variant="outline" size="sm" @click="exportReport('leave')" class="text-blue-600 border-blue-300 hover:bg-blue-50">
                            <Download class="mr-1 h-3 w-3" />
                            Export
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card class="bg-gradient-to-br from-green-50">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-green-800">Overtime Hours</CardTitle>
                    <Clock class="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-green-900">{{ overtimeStats.totalHours }}</div>
                    <p class="text-xs text-green-700">{{ overtimeStats.monthlyHours }} this month</p>
                    <div class="mt-2">
                        <Button variant="outline" size="sm" @click="exportReport('overtime')" class="text-green-600 border-green-300 hover:bg-green-50">
                            <Download class="mr-1 h-3 w-3" />
                            Export
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card class="bg-gradient-to-br from-yellow-50">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-yellow-800">TOIL Balance</CardTitle>
                    <FileText class="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-yellow-900">{{ toilStats.totalBalance }}</div>
                    <p class="text-xs text-yellow-700">{{ toilStats.activeEntries }} active entries</p>
                    <div class="mt-2">
                        <Button variant="outline" size="sm" @click="exportReport('toil')" class="text-yellow-600 border-yellow-300 hover:bg-yellow-50">
                            <Download class="mr-1 h-3 w-3" />
                            Export
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card class="bg-gradient-to-br from-purple-50">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-purple-800">Utilization Rate</CardTitle>
                    <Target class="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-purple-900">{{ toilStats.utilizationRate }}%</div>
                    <p class="text-xs text-purple-700">TOIL usage rate</p>
                    <div class="mt-2">
                        <Button variant="outline" size="sm" @click="exportReport('all')" class="text-purple-600 border-purple-300 hover:bg-purple-50">
                            <Download class="mr-1 h-3 w-3" />
                            All Data
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Detailed Reports -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Leave Analytics -->
            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <Calendar class="mr-2 h-5 w-5" />
                        Leave Analytics
                    </CardTitle>
                    <CardDescription>Request patterns and approval metrics</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-center p-3 bg-blue-50 rounded-lg">
                            <div class="text-xl font-bold text-blue-600">{{ leaveStats.approvedRequests }}</div>
                            <div class="text-xs text-blue-600">Approved</div>
                        </div>
                        <div class="text-center p-3 bg-yellow-50 rounded-lg">
                            <div class="text-xl font-bold text-yellow-600">{{ leaveStats.pendingRequests }}</div>
                            <div class="text-xs text-yellow-600">Pending</div>
                        </div>
                        <div class="text-center p-3 bg-red-50 rounded-lg">
                            <div class="text-xl font-bold text-red-600">{{ leaveStats.rejectedRequests }}</div>
                            <div class="text-xs text-red-600">Rejected</div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <CalendarDays class="mr-2 h-4 w-4 text-gray-600" />
                                <span class="text-sm font-medium">Total Leave Days</span>
                            </div>
                            <Badge variant="outline">{{ leaveStats.totalDays }}</Badge>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <Clock class="mr-2 h-4 w-4 text-gray-600" />
                                <span class="text-sm font-medium">Avg Processing Time</span>
                            </div>
                            <Badge variant="secondary">{{ leaveStats.averageProcessingTime }} days</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Overtime Analytics -->
            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <Clock class="mr-2 h-5 w-5" />
                        Overtime Analytics
                    </CardTitle>
                    <CardDescription>Hours logged and approval trends</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-center p-3 bg-green-50 rounded-lg">
                            <div class="text-xl font-bold text-green-600">{{ overtimeStats.approvedEntries }}</div>
                            <div class="text-xs text-green-600">Approved</div>
                        </div>
                        <div class="text-center p-3 bg-yellow-50 rounded-lg">
                            <div class="text-xl font-bold text-yellow-600">{{ overtimeStats.pendingEntries }}</div>
                            <div class="text-xs text-yellow-600">Pending</div>
                        </div>
                        <div class="text-center p-3 bg-red-50 rounded-lg">
                            <div class="text-xl font-bold text-red-600">{{ overtimeStats.rejectedEntries }}</div>
                            <div class="text-xs text-red-600">Rejected</div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <TrendingUp class="mr-2 h-4 w-4 text-gray-600" />
                                <span class="text-sm font-medium">Total Hours</span>
                            </div>
                            <Badge variant="outline">{{ overtimeStats.totalHours }}h</Badge>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <BarChart3 class="mr-2 h-4 w-4 text-gray-600" />
                                <span class="text-sm font-medium">Avg Hours/Entry</span>
                            </div>
                            <Badge variant="secondary">{{ overtimeStats.averageHoursPerEntry }}h</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- TOIL Analytics -->
            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <FileText class="mr-2 h-5 w-5" />
                        TOIL Analytics
                    </CardTitle>
                    <CardDescription>Balance, usage, and expiry tracking</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-center p-3 bg-green-50 rounded-lg">
                            <div class="text-xl font-bold text-green-600">{{ toilStats.activeEntries }}</div>
                            <div class="text-xs text-green-600">Active</div>
                        </div>
                        <div class="text-center p-3 bg-blue-50 rounded-lg">
                            <div class="text-xl font-bold text-blue-600">{{ toilStats.usedEntries }}</div>
                            <div class="text-xs text-blue-600">Used</div>
                        </div>
                        <div class="text-center p-3 bg-orange-50 rounded-lg">
                            <div class="text-xl font-bold text-orange-600">{{ toilStats.expiringSoon }}</div>
                            <div class="text-xs text-orange-600">Expiring Soon</div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <TrendingUp class="mr-2 h-4 w-4 text-gray-600" />
                                <span class="text-sm font-medium">Total Earned</span>
                            </div>
                            <Badge variant="outline">{{ toilStats.totalEarned }}h</Badge>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <Target class="mr-2 h-4 w-4 text-gray-600" />
                                <span class="text-sm font-medium">Utilization Rate</span>
                            </div>
                            <Badge variant="secondary">{{ toilStats.utilizationRate }}%</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Trends Chart -->
            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <BarChart3 class="mr-2 h-5 w-5" />
                        Monthly Trends
                    </CardTitle>
                    <CardDescription>Activity patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                        <div class="text-center">
                            <BarChart3 class="mx-auto h-16 w-16 text-gray-400 mb-4" />
                            <p class="text-sm text-gray-500 mb-2">Interactive charts coming soon</p>
                            <p class="text-xs text-gray-400">Will show monthly trends for leave, overtime, and TOIL</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
