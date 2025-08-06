<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useLeaveStore } from "@/stores/leave"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Plus, Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-vue-next"
import LeaveRequestModal from "@/components/LeaveRequestModal.vue"

const router = useRouter()
const leaveStore = useLeaveStore()

const searchQuery = ref("")
const statusFilter = ref("all")
const showLeaveModal = ref(false)

const filteredRequests = computed(() => {
    let filtered = leaveStore.leaveRequests

    // Apply search filter
    if (searchQuery.value) {
        filtered = filtered.filter(
            (request) => request.reason.toLowerCase().includes(searchQuery.value.toLowerCase()) || request.leaveType?.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    }

    // Apply status filter
    if (statusFilter.value !== "all") {
        filtered = filtered.filter((request) => request.status === statusFilter.value)
    }

    return filtered
})

const getStatusIcon = (status: string) => {
    switch (status) {
        case "approved":
            return CheckCircle
        case "rejected":
            return XCircle
        case "pending":
            return Clock
        default:
            return AlertCircle
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "approved":
            return "bg-green-100 text-green-800"
        case "rejected":
            return "bg-red-100 text-red-800"
        case "pending":
            return "bg-yellow-100 text-yellow-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}

const handleLeaveSuccess = async () => {
    // Refresh the leave requests after successful creation
    await leaveStore.fetchLeaveRequests()
}

onMounted(async () => {
    try {
        await Promise.all([leaveStore.fetchLeaveRequests(), leaveStore.fetchLeaveBalance(), leaveStore.fetchLeaveTypes()])
    } catch (error) {
        console.error("Failed to fetch leave data:", error)
    }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">Leave Management</h1>
                <p class="text-gray-600">Manage your leave requests and view balances</p>
            </div>
            <Button @click="showLeaveModal = true">
                <Plus class="mr-2 h-4 w-4" />
                Request Leave
            </Button>
        </div>

        <!-- Leave Balance Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card v-for="balance in leaveStore.leaveBalances" :key="balance.id">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">{{ balance.leaveType?.name || "Leave" }}</CardTitle>
                    <Calendar class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ balance.currentBalance }}</div>
                    <p class="text-xs text-muted-foreground">{{ balance.totalEarned - balance.totalUsed }} days used</p>
                </CardContent>
            </Card>
        </div>

        <!-- Filters and Search -->
        <Card>
            <CardHeader>
                <CardTitle>My Leave Requests</CardTitle>
                <CardDescription> View and manage your leave requests </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col sm:flex-row gap-4 mb-6">
                    <!-- Search -->
                    <div class="relative flex-1">
                        <Search class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search leave requests..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <!-- Status Filter -->
                    <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <!-- Leave Requests List -->
                <div class="space-y-4">
                    <div v-for="request in filteredRequests" :key="request.id" class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div class="flex items-center space-x-4">
                            <Avatar class="h-10 w-10">
                                <AvatarImage :src="request.user?.avatar || ''" />
                                <AvatarFallback>{{ request.user?.name?.charAt(0) || "U" }}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 class="font-medium text-gray-900">{{ request.leaveType?.name }}</h3>
                                <p class="text-sm text-gray-500">{{ request.reason }}</p>
                                <p class="text-xs text-gray-400">{{ formatDate(request.startDate) }} - {{ formatDate(request.endDate) }}</p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4">
                            <Badge :class="getStatusColor(request.status)">
                                <component :is="getStatusIcon(request.status)" class="mr-1 h-3 w-3" />
                                {{ request.status }}
                            </Badge>

                            <div class="flex space-x-2">
                                <Button v-if="request.status === 'PENDING'" variant="outline" size="sm" @click="router.push(`/leave/${request.id}/edit`)"> Edit </Button>
                                <Button v-if="request.status === 'PENDING'" variant="outline" size="sm" @click="leaveStore.deleteLeaveRequest(request.id)"> Cancel </Button>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="filteredRequests.length === 0" class="text-center py-12">
                        <Calendar class="mx-auto h-12 w-12 text-gray-400" />
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No leave requests</h3>
                        <p class="mt-1 text-sm text-gray-500">
                            {{ searchQuery || statusFilter !== "all" ? "No requests match your filters." : "Get started by requesting leave." }}
                        </p>
                        <div class="mt-6">
                            <Button @click="showLeaveModal = true">
                                <Plus class="mr-2 h-4 w-4" />
                                Request Leave
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Leave Request Modal -->
        <LeaveRequestModal v-model:open="showLeaveModal" @success="handleLeaveSuccess" />
    </div>
</template>
