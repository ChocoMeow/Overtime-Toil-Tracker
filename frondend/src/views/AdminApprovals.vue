<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { useLeaveStore } from "@/stores/leave"
import { useOvertimeStore } from "@/stores/overtime"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { apiClient } from "@/api/client"

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)
// const leaveStore = useLeaveStore()
const overtimeStore = useOvertimeStore()

// Leave approvals
const leaveLoading = ref(false)
const leaveError = ref<string | null>(null)
const pendingLeaveRequests = ref<any[]>([])

const fetchPendingLeaves = async () => {
    leaveLoading.value = true
    leaveError.value = null
    try {
        pendingLeaveRequests.value = await apiClient.getPendingLeaveRequests()
    } catch (e: any) {
        leaveError.value = e.message || "Failed to fetch pending leave requests"
    } finally {
        leaveLoading.value = false
    }
}

const handleLeaveAction = async (id: string, status: "APPROVED" | "REJECTED") => {
    leaveLoading.value = true
    leaveError.value = null
    try {
        await apiClient.updateLeaveRequestStatus(id, status)
        await fetchPendingLeaves()
    } catch (e: any) {
        leaveError.value = e.message || `Failed to ${status.toLowerCase()} request`
    } finally {
        leaveLoading.value = false
    }
}

// Overtime approvals
const overtimeLoading = ref(false)
const overtimeError = ref<string | null>(null)

const fetchPendingOvertime = async () => {
    overtimeLoading.value = true
    overtimeError.value = null
    try {
        await overtimeStore.fetchPendingOvertimeEntries()
    } catch (e: any) {
        overtimeError.value = e.message || "Failed to fetch pending overtime entries"
    } finally {
        overtimeLoading.value = false
    }
}

const handleOvertimeAction = async (id: string, action: "approve" | "reject") => {
    overtimeLoading.value = true
    overtimeError.value = null
    try {
        if (action === "approve") {
            await overtimeStore.approveOvertimeEntry(id)
        } else {
            await overtimeStore.rejectOvertimeEntry(id)
        }
        await fetchPendingOvertime()
    } catch (e: any) {
        overtimeError.value = e.message || `Failed to ${action} overtime entry`
    } finally {
        overtimeLoading.value = false
    }
}

onMounted(() => {
    if (user.value?.role !== "ADMIN") {
        router.replace("/")
        return
    }
    fetchPendingLeaves()
    fetchPendingOvertime()
})

const formatDate = (date: string) => new Date(date).toLocaleDateString()
</script>

<template>
    <div class="max-w-6xl mx-auto py-8 space-y-8">
        <!-- Leave Approvals -->
        <Card>
            <CardHeader>
                <CardTitle>Pending Leave Approvals</CardTitle>
            </CardHeader>
            <CardContent>
                <div v-if="leaveLoading" class="text-center py-8">Loading...</div>
                <div v-else-if="leaveError" class="text-center text-red-500 py-8">{{ leaveError }}</div>
                <div v-else>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th class="px-4 py-2 text-left">Employee</th>
                                <th class="px-4 py-2 text-left">Type</th>
                                <th class="px-4 py-2 text-left">Dates</th>
                                <th class="px-4 py-2 text-left">Reason</th>
                                <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="req in pendingLeaveRequests" :key="req.id" class="border-b">
                                <td class="px-4 py-2">
                                    <div class="font-medium">{{ req.user?.name }}</div>
                                    <div class="text-xs text-gray-500">{{ req.user?.email }}</div>
                                </td>
                                <td class="px-4 py-2">
                                    <Badge>{{ req.leaveType?.name || "Leave" }}</Badge>
                                </td>
                                <td class="px-4 py-2">{{ formatDate(req.startDate) }} - {{ formatDate(req.endDate) }}</td>
                                <td class="px-4 py-2">{{ req.reason }}</td>
                                <td class="px-4 py-2 space-x-2">
                                    <Button size="sm" variant="default" @click="handleLeaveAction(req.id, 'APPROVED')" :disabled="leaveLoading">Approve</Button>
                                    <Button size="sm" variant="destructive" @click="handleLeaveAction(req.id, 'REJECTED')" :disabled="leaveLoading">Reject</Button>
                                </td>
                            </tr>
                            <tr v-if="pendingLeaveRequests.length === 0">
                                <td colspan="5" class="text-center py-8 text-gray-500">No pending leave requests</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <!-- Overtime Approvals -->
        <Card>
            <CardHeader>
                <CardTitle>Pending Overtime Approvals</CardTitle>
            </CardHeader>
            <CardContent>
                <div v-if="overtimeLoading" class="text-center py-8">Loading...</div>
                <div v-else-if="overtimeError" class="text-center text-red-500 py-8">{{ overtimeError }}</div>
                <div v-else>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th class="px-4 py-2 text-left">Employee</th>
                                <th class="px-4 py-2 text-left">Date</th>
                                <th class="px-4 py-2 text-left">Hours</th>
                                <th class="px-4 py-2 text-left">Category</th>
                                <th class="px-4 py-2 text-left">Description</th>
                                <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="entry in overtimeStore.pendingOvertimeEntries" :key="entry.id" class="border-b">
                                <td class="px-4 py-2">
                                    <div class="font-medium">{{ entry.user?.name }}</div>
                                    <div class="text-xs text-gray-500">{{ entry.user?.email }}</div>
                                </td>
                                <td class="px-4 py-2">{{ formatDate(entry.date) }}</td>
                                <td class="px-4 py-2">{{ entry.hours }}</td>
                                <td class="px-4 py-2">
                                    <Badge>{{ entry.category }}</Badge>
                                </td>
                                <td class="px-4 py-2">{{ entry.description }}</td>
                                <td class="px-4 py-2 space-x-2">
                                    <Button size="sm" variant="default" @click="handleOvertimeAction(entry.id, 'approve')" :disabled="overtimeLoading">Approve</Button>
                                    <Button size="sm" variant="destructive" @click="handleOvertimeAction(entry.id, 'reject')" :disabled="overtimeLoading">Reject</Button>
                                </td>
                            </tr>
                            <tr v-if="overtimeStore.pendingOvertimeEntries.length === 0">
                                <td colspan="6" class="text-center py-8 text-gray-500">No pending overtime requests</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}
th,
td {
    border-bottom: 1px solid #e5e7eb;
}
</style>
