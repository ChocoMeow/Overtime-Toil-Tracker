<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { useLeaveStore } from "@/stores/leave"
import { useOvertimeStore } from "@/stores/overtime"
import { useTOILStore } from "@/stores/toil"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, FileText, Plus, TrendingUp, User, Users } from "lucide-vue-next"
import LeaveRequestModal from "@/components/LeaveRequestModal.vue"
import OvertimeLogModal from "@/components/OvertimeLogModal.vue"
import TOILUsageModal from "@/components/TOILUsageModal.vue"

const router = useRouter()
const authStore = useAuthStore()
const leaveStore = useLeaveStore()
const overtimeStore = useOvertimeStore()
const toilStore = useTOILStore()

const showLeaveModal = ref(false)
const showOvertimeModal = ref(false)
const showTOILUsageModal = ref(false)
const selectedTOILEntry = ref<any>(null)
const showTimetableDetailsModal = ref(false)
const selectedActivity = ref<any>(null)

const user = computed(() => authStore.user)

const totalLeaveDays = computed(() => leaveStore.leaveBalances.reduce((total, balance) => total + balance.currentBalance, 0))

// Timetable data - combining all types of activities
const timetableData = ref<any[]>([])

const updateTimetableData = async () => {
    const activities: any[] = []

    try {
        // Fetch all users' data for the timetable
        const [allLeaveRequests, allTOILEntries] = await Promise.all([leaveStore.fetchAllLeaveRequests(), toilStore.fetchAllTOILEntries()])

        console.log("All leave requests:", allLeaveRequests)
        console.log("All TOIL entries:", allTOILEntries)

        // Add approved leave requests
        allLeaveRequests
            .filter((request) => request.status === "approved" || request.status === "APPROVED")
            .forEach((request) => {
                const startDate = new Date(request.startDate)
                const endDate = new Date(request.endDate)

                // Extract time from the datetime if available, otherwise use defaults
                const startTime = startDate.getHours() > 0 ? `${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")}` : "09:00"
                const endTime = endDate.getHours() > 0 ? `${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}` : "17:00"

                // Create entries for each day of the leave
                const currentDate = new Date(startDate)
                while (currentDate <= endDate) {
                    activities.push({
                        id: `leave-${request.id}-${currentDate.toISOString().split("T")[0]}`,
                        type: "leave",
                        title: `${request.user?.name || "Unknown"} - ${request.leaveType?.name || "Leave"}`,
                        description: request.reason || "Leave request",
                        date: new Date(currentDate),
                        startTime: startTime,
                        endTime: endTime,
                        status: request.status,
                        user: request.user,
                        color: request.leaveType?.color || "#3B82F6",
                        icon: Calendar,
                    })
                    currentDate.setDate(currentDate.getDate() + 1)
                }
            })

        // Add TOIL usage (when TOIL is used)
        allTOILEntries
            .filter((entry) => entry.status === "USED" && entry.usedDate)
            .forEach((entry) => {
                const usedDate = new Date(entry.usedDate!)
                // Use actual time fields if available, otherwise use defaults
                const startTime = entry.startTime || "09:00"
                const endTime = entry.endTime || `${9 + Math.floor(entry.hours)}:${(entry.hours % 1) * 60 || "00"}`

                activities.push({
                    id: `toil-${entry.id}`,
                    type: "toil",
                    title: `${entry.user?.name || "Unknown"} - TOIL Usage`,
                    description: `${entry.hours} hours TOIL used`,
                    date: usedDate,
                    startTime: startTime,
                    endTime: endTime,
                    status: entry.status,
                    user: entry.user,
                    color: "#F59E0B", // Yellow for TOIL
                    icon: FileText,
                    hours: entry.hours,
                })
            })

        // Sort activities by date and update the ref
        timetableData.value = activities.sort((a, b) => a.date.getTime() - b.date.getTime())
    } catch (error) {
        console.error("Failed to update timetable data:", error)
        timetableData.value = []
    }
}

// Group activities by date
const groupedTimetable = computed(() => {
    const grouped: { [key: string]: any[] } = {}

    timetableData.value.forEach((activity) => {
        const dateKey = activity.date.toISOString().split("T")[0]
        if (!grouped[dateKey]) {
            grouped[dateKey] = []
        }
        grouped[dateKey].push(activity)
    })

    return grouped
})

// Get next 7 days for the timetable
const nextSevenDays = computed(() => {
    const days = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        days.push(date)
    }

    return days
})

// Format time helper
const formatTime = (timeString: string) => {
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
}

// Format date helper
const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    })
}

// Helper functions for timetable positioning
const getActivityPosition = (startTime: string) => {
    const [hours] = startTime.split(":").map(Number)
    const position = ((hours == 9 ? hours : hours + 1) - 9) * 36.33 // 36px per hour
    return Math.max(0, position)
}

const getActivityHeight = (startTime: string, endTime: string) => {
    const [startHours] = startTime.split(":").map(Number)
    const [endHours] = endTime.split(":").map(Number)
    return (endHours - startHours) * 36.33
}

const getDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number)
    const [endHours, endMinutes] = endTime.split(":").map(Number)
    const startTotal = startHours * 60 + startMinutes
    const endTotal = endHours * 60 + endMinutes
    const durationMinutes = endTotal - startTotal
    const hours = Math.floor(durationMinutes / 60)
    const minutes = durationMinutes % 60

    if (hours === 0) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""}`
    } else if (minutes === 0) {
        return `${hours} hour${hours !== 1 ? "s" : ""}`
    } else {
        return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`
    }
}

const openTOILUsageModal = () => {
    console.log("openTOILUsageModal called")
    console.log("Active entries:", toilStore.activeEntries)
    console.log("All entries:", toilStore.toilEntries)

    // Use the most recent active TOIL entry
    const entry = toilStore.activeEntries[0]
    if (entry) {
        console.log("Selected entry:", entry)
        selectedTOILEntry.value = entry
        showTOILUsageModal.value = true
    } else {
        console.log("No active TOIL entries found")
        alert("No active TOIL entries available. TOIL is earned from approved overtime.")
    }
}

const openTimetableDetailsModal = (activity: any) => {
    selectedActivity.value = activity
    showTimetableDetailsModal.value = true
}

const quickActions = [
    {
        title: "Request Leave",
        description: "Submit a new leave request",
        icon: Calendar,
        action: () => {
            console.log("Opening leave modal")
            showLeaveModal.value = true
        },
        color: "bg-blue-500",
    },
    {
        title: "Log Overtime",
        description: "Record overtime hours",
        icon: Clock,
        action: () => {
            console.log("Opening overtime modal")
            showOvertimeModal.value = true
        },
        color: "bg-green-500",
    },
    {
        title: "Use TOIL",
        description: "Use your accrued TOIL hours",
        icon: FileText,
        action: openTOILUsageModal,
        color: "bg-yellow-500",
    },
    {
        title: "View Reports",
        description: "Check your reports",
        icon: TrendingUp,
        action: () => router.push("/reports"),
        color: "bg-purple-500",
    },
]

// Computed property for recent activity from real data
const recentActivity = computed(() => {
    const activities: any[] = []
    // Add leave requests
    leaveStore.leaveRequests.slice(0, 5).forEach((request) => {
        activities.push({
            id: `leave-${request.id}`,
            type: "leave",
            title: `Leave Request ${
                request.status === "APPROVED" ? "Approved" : request.status === "REJECTED" ? "Rejected" : request.status === "CANCELLED" ? "Cancelled" : "Pending"
            }`,
            description: `${request.leaveType?.name || "Leave"} from ${new Date(request.startDate).toLocaleDateString()} to ${new Date(request.endDate).toLocaleDateString()}`,
            time: formatTimeAgo(request.createdAt),
            status: request.status,
            date: request.createdAt,
        })
    })

    // Add TOIL entries
    toilStore.toilEntries.slice(0, 5).forEach((entry) => {
        activities.push({
            id: `toil-${entry.id}`,
            type: "toil",
            title: `TOIL ${entry.status === "ACTIVE" ? "Earned" : entry.status === "USED" ? "Used" : "Expired"}`,
            description: `${entry.hours} hours ${entry.status === "ACTIVE" ? "earned" : entry.status === "USED" ? "used" : "expired"} on ${new Date(
                entry.earnedDate
            ).toLocaleDateString()}`,
            time: formatTimeAgo(entry.createdAt),
            status: entry.status,
            date: entry.createdAt,
        })
    })

    // Sort by date (most recent first) and take the latest 6
    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6)
})

// Helper function to format time ago
const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 1) {
        return "Just now"
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    } else {
        return date.toLocaleDateString()
    }
}

const handleLeaveSuccess = async () => {
    // Refresh the leave data after successful creation
    await Promise.all([leaveStore.fetchLeaveBalance(), leaveStore.fetchLeaveRequests()])
}

const handleOvertimeSuccess = async () => {
    // Refresh the overtime data after successful creation
    await overtimeStore.fetchOvertimeEntries()
}

const handleTOILUsageSuccess = async () => {
    await toilStore.fetchTOILEntries()
}

onMounted(async () => {
    try {
        // Fetch data for dashboard
        await Promise.all([
            leaveStore.fetchLeaveBalance(),
            leaveStore.fetchLeaveRequests(),
            leaveStore.fetchLeaveTypes(),
            overtimeStore.fetchOvertimeEntries(),
            toilStore.fetchTOILEntries(),
        ])

        // Update timetable data with all users' information
        await updateTimetableData()
    } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
    }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Welcome Section -->
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, {{ user?.name }}!</h1>
            <p class="text-gray-600">Here's what's happening with your leave, overtime, and TOIL.</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Total Leave Days</CardTitle>
                    <Calendar class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ totalLeaveDays }}</div>
                    <p class="text-xs text-muted-foreground">{{ leaveStore.pendingRequests.length }} pending requests</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">TOIL Balance</CardTitle>
                    <FileText class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ toilStore.totalTOILBalance }}</div>
                    <p class="text-xs text-muted-foreground">hours available</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Overtime Hours</CardTitle>
                    <Clock class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ overtimeStore.monthlyOvertimeHours }}</div>
                    <p class="text-xs text-muted-foreground">This month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Department</CardTitle>
                    <User class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ user?.department || "N/A" }}</div>
                    <p class="text-xs text-muted-foreground">
                        {{ user?.role || "Employee" }}
                    </p>
                </CardContent>
            </Card>
        </div>

        <!-- Timetable Section -->
        <Card>
            <CardHeader>
                <CardTitle class="flex items-center gap-2">
                    <Users class="h-5 w-5" />
                    Team Schedule - Next 7 Days
                </CardTitle>
                <CardDescription>View who is on leave, working overtime, or using TOIL</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto">
                    <div class="grid grid-cols-8 gap-4 min-w-[800px]">
                        <!-- Time column -->
                        <div class="col-span-1">
                            <div class="h-12 flex items-center justify-center font-semibold text-sm text-gray-600 border-b">Time</div>
                            <div class="space-y-2 pt-2">
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">9:00 AM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">10:00 AM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">11:00 AM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">12:00 PM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">1:00 PM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">2:00 PM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">3:00 PM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">4:00 PM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">5:00 PM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">6:00 PM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">7:00 PM</div>
                                <div class="h-8 flex items-center justify-center text-xs text-gray-500">8:00 PM</div>
                            </div>
                        </div>

                        <!-- Day columns -->
                        <div v-for="day in nextSevenDays" :key="day.toISOString()" class="col-span-1">
                            <div class="h-12 flex items-center justify-center font-semibold text-sm text-gray-600 border-b">
                                {{ formatDate(day) }}
                            </div>
                            <div class="relative space-y-1 pt-2">
                                <!-- Activities for this day -->
                                <div
                                    v-for="activity in groupedTimetable[day.toISOString().split('T')[0]] || []"
                                    :key="activity.id"
                                    class="absolute left-0 right-0 mx-1 rounded-md p-2 text-xs text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                                    :style="{
                                        backgroundColor: activity.color,
                                        top: `${getActivityPosition(activity.startTime)}px`,
                                        height: `${getActivityHeight(activity.startTime, activity.endTime)}px`,
                                        zIndex: 10,
                                    }"
                                    @click="openTimetableDetailsModal(activity)"
                                >
                                    <div class="font-medium truncate">{{ activity.user?.name }}</div>
                                    <div class="text-xs opacity-90 truncate">{{ activity.type.toUpperCase() }}</div>
                                    <div class="text-xs opacity-75">{{ formatTime(activity.startTime) }} - {{ formatTime(activity.endTime) }}</div>
                                </div>

                                <!-- Empty time slots -->
                                <div v-for="i in 12" :key="i" class="h-8 border-b border-gray-100"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Legend -->
                <div class="mt-6 flex flex-wrap gap-4 text-sm">
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded bg-blue-500"></div>
                        <span>Leave</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded bg-yellow-500"></div>
                        <span>TOIL Usage</span>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Quick Actions and Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Quick Actions -->
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks you can perform</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div
                        v-for="action in quickActions"
                        :key="action.title"
                        class="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        @click="action.action"
                    >
                        <div :class="`${action.color} p-2 rounded-lg`">
                            <component :is="action.icon" class="h-5 w-5 text-white" />
                        </div>
                        <div class="ml-4 flex-1">
                            <h3 class="font-medium text-gray-900">{{ action.title }}</h3>
                            <p class="text-sm text-gray-500">{{ action.description }}</p>
                        </div>
                        <Plus class="h-4 w-4 text-gray-400" />
                    </div>
                </CardContent>
            </Card>

            <!-- Recent Activity -->
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest leave, overtime, and TOIL activities</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-4 p-4 border rounded-lg">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <component :is="activity.type === 'leave' ? Calendar : activity.type === 'overtime' ? Clock : FileText" class="h-4 w-4 text-gray-600" />
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                                <Badge :variant="activity.status === 'approved' ? 'default' : activity.status === 'pending' ? 'secondary' : 'outline'" class="text-xs">
                                    {{ activity.status }}
                                </Badge>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">{{ activity.description }}</p>
                            <p class="text-xs text-gray-400 mt-2">{{ activity.time }}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Modals -->
        <LeaveRequestModal v-model:open="showLeaveModal" @success="handleLeaveSuccess" />
        <OvertimeLogModal v-model:open="showOvertimeModal" @success="handleOvertimeSuccess" />
        <TOILUsageModal :isOpen="showTOILUsageModal" :toilEntry="selectedTOILEntry" @close="showTOILUsageModal = false" @success="handleTOILUsageSuccess" />

        <!-- Timetable Details Modal -->
        <Dialog :open="showTimetableDetailsModal" @update:open="showTimetableDetailsModal = false">
            <DialogContent class="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle class="flex items-center gap-2">
                        <component :is="selectedActivity?.icon" class="h-5 w-5" />
                        {{ selectedActivity?.type?.toUpperCase() }} Details
                    </DialogTitle>
                    <DialogDescription> Detailed information about this activity </DialogDescription>
                </DialogHeader>

                <div v-if="selectedActivity" class="space-y-4">
                    <!-- Activity Type Badge -->
                    <div class="flex items-center gap-2">
                        <Badge :style="{ backgroundColor: selectedActivity.color }" class="text-white">
                            {{ selectedActivity.type?.toUpperCase() }}
                        </Badge>
                        <span class="text-sm text-gray-500">
                            {{
                                new Date(selectedActivity.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                            }}
                        </span>
                    </div>

                    <!-- User Information -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-900 mb-2">Employee</h3>
                        <div class="space-y-1">
                            <p class="text-sm"><span class="font-medium">Name:</span> {{ selectedActivity.user?.name }}</p>
                            <p class="text-sm"><span class="font-medium">Email:</span> {{ selectedActivity.user?.email }}</p>
                            <p v-if="selectedActivity.user?.department" class="text-sm"><span class="font-medium">Department:</span> {{ selectedActivity.user?.department }}</p>
                        </div>
                    </div>

                    <!-- Time Information -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-900 mb-2">Schedule</h3>
                        <div class="space-y-1">
                            <p class="text-sm">
                                <span class="font-medium">Time:</span>
                                {{ formatTime(selectedActivity.startTime) }} - {{ formatTime(selectedActivity.endTime) }}
                            </p>
                            <p class="text-sm">
                                <span class="font-medium">Duration:</span>
                                {{ getDuration(selectedActivity.startTime, selectedActivity.endTime) }}
                            </p>
                        </div>
                    </div>

                    <!-- Activity Specific Details -->
                    <div v-if="selectedActivity.type === 'leave'" class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-900 mb-2">Leave Details</h3>
                        <div class="space-y-1">
                            <p class="text-sm">
                                <span class="font-medium">Leave Type:</span>
                                {{ selectedActivity.title?.split(" - ")[1] || "Leave" }}
                            </p>
                            <p v-if="selectedActivity.description" class="text-sm">
                                <span class="font-medium">Reason:</span>
                                {{ selectedActivity.description }}
                            </p>
                        </div>
                    </div>

                    <div v-if="selectedActivity.type === 'toil'" class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-900 mb-2">TOIL Details</h3>
                        <div class="space-y-1">
                            <p class="text-sm">
                                <span class="font-medium">Hours Used:</span>
                                {{ selectedActivity.hours }} hours
                            </p>
                            <p class="text-sm">
                                <span class="font-medium">Type:</span>
                                TOIL Usage
                            </p>
                        </div>
                    </div>

                    <!-- Status Information -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-900 mb-2">Status</h3>
                        <div class="flex items-center gap-2">
                            <Badge :variant="selectedActivity.status === 'approved' || selectedActivity.status === 'APPROVED' ? 'default' : 'secondary'">
                                {{ selectedActivity.status?.toUpperCase() }}
                            </Badge>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button @click="showTimetableDetailsModal = false">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
