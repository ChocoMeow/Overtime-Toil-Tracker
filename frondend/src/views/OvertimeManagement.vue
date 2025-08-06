<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useOvertimeStore } from "@/stores/overtime"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Plus, Search, CheckCircle, XCircle, AlertCircle } from "lucide-vue-next"
import OvertimeLogModal from "@/components/OvertimeLogModal.vue"

const router = useRouter()
const overtimeStore = useOvertimeStore()

const searchQuery = ref("")
const statusFilter = ref("all")
const showOvertimeModal = ref(false)

const filteredEntries = computed(() => {
    let filtered = overtimeStore.overtimeEntries

    // Apply search filter
    if (searchQuery.value) {
        filtered = filtered.filter((entry) => entry.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }

    // Apply status filter
    if (statusFilter.value !== "all") {
        filtered = filtered.filter((entry) => entry.status === statusFilter.value)
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
            return AlertCircle
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

const handleOvertimeSuccess = async () => {
    // Refresh the overtime entries after successful creation
    await overtimeStore.fetchOvertimeEntries()
}

onMounted(async () => {
    try {
        await overtimeStore.fetchOvertimeEntries()
    } catch (error) {
        console.error("Failed to fetch overtime data:", error)
    }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">Overtime Management</h1>
                <p class="text-gray-600">Track and manage your overtime hours</p>
            </div>
            <Button @click="showOvertimeModal = true">
                <Plus class="mr-2 h-4 w-4" />
                Log Overtime
            </Button>
        </div>

        <!-- Overtime Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Total Hours</CardTitle>
                    <Clock class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ overtimeStore.totalOvertimeHours }}</div>
                    <p class="text-xs text-muted-foreground">All time</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">This Month</CardTitle>
                    <Clock class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ overtimeStore.monthlyOvertimeHours }}</div>
                    <p class="text-xs text-muted-foreground">Current month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Pending</CardTitle>
                    <Clock class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ overtimeStore.pendingEntries.length }}</div>
                    <p class="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
            </Card>
        </div>

        <!-- Overtime Entries -->
        <Card>
            <CardHeader>
                <CardTitle>My Overtime Entries</CardTitle>
                <CardDescription> View and manage your overtime entries </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col sm:flex-row gap-4 mb-6">
                    <!-- Search -->
                    <div class="relative flex-1">
                        <Search class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search overtime entries..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <!-- Status Filter -->
                    <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <!-- Overtime Entries List -->
                <div class="space-y-4">
                    <div v-for="entry in filteredEntries" :key="entry.id" class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div class="flex items-center space-x-4">
                            <Avatar class="h-10 w-10">
                                <AvatarImage :src="entry.user?.avatar || ''" />
                                <AvatarFallback>{{ entry.user?.name?.charAt(0) || "U" }}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 class="font-medium text-gray-900">{{ entry.hours }} hours</h3>
                                <p class="text-sm text-gray-500">{{ entry.description }}</p>
                                <p class="text-xs text-gray-400">
                                    {{ formatDate(entry.date) }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4">
                            <Badge :class="getStatusColor(entry.status)">
                                <component :is="getStatusIcon(entry.status)" class="mr-1 h-3 w-3" />
                                {{ entry.status }}
                            </Badge>

                            <div class="flex space-x-2">
                                <Button v-if="entry.status === 'PENDING'" variant="outline" size="sm" @click="router.push(`/overtime/${entry.id}/edit`)"> Edit </Button>
                                <Button v-if="entry.status === 'PENDING'" variant="outline" size="sm" @click="overtimeStore.deleteOvertimeEntry(entry.id)"> Delete </Button>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="filteredEntries.length === 0" class="text-center py-12">
                        <Clock class="mx-auto h-12 w-12 text-gray-400" />
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No overtime entries</h3>
                        <p class="mt-1 text-sm text-gray-500">
                            {{ searchQuery || statusFilter !== "all" ? "No entries match your filters." : "Get started by logging overtime." }}
                        </p>
                        <div class="mt-6">
                            <Button @click="showOvertimeModal = true">
                                <Plus class="mr-2 h-4 w-4" />
                                Log Overtime
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Overtime Log Modal -->
        <OvertimeLogModal v-model:open="showOvertimeModal" @success="handleOvertimeSuccess" />
    </div>
</template>
