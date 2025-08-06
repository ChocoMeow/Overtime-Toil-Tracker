<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useTOILStore } from "@/stores/toil"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Search, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-vue-next"
import TOILUsageModal from "@/components/TOILUsageModal.vue"

// const router = useRouter()
const toilStore = useTOILStore()

const searchQuery = ref("")
const statusFilter = ref("all")

const filteredEntries = computed(() => {
    let filtered = toilStore.toilEntries

    // Apply search filter
    if (searchQuery.value) {
        filtered = filtered.filter((entry) => entry.status.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }

    // Apply status filter
    if (statusFilter.value !== "all") {
        filtered = filtered.filter((entry) => entry.status === statusFilter.value)
    }

    return filtered
})

const getStatusIcon = (status: string) => {
    switch (status) {
        case "ACTIVE":
            return CheckCircle
        case "USED":
            return XCircle
        case "EXPIRED":
            return AlertCircle
        default:
            return Clock
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "ACTIVE":
            return "bg-green-100 text-green-800"
        case "USED":
            return "bg-blue-100 text-blue-800"
        case "EXPIRED":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}

const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    return expiry <= thirtyDaysFromNow && expiry > new Date()
}

const showUsageModal = ref(false)
const selectedTOILEntry = ref<any>(null)

const openUsageModal = (entry: any) => {
    selectedTOILEntry.value = entry
    showUsageModal.value = true
}

const handleUsageSuccess = async () => {
    await toilStore.fetchTOILEntries()
}

onMounted(async () => {
    try {
        await toilStore.fetchTOILEntries()
    } catch (error) {
        console.error("Failed to fetch TOIL data:", error)
    }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">TOIL Management</h1>
                <p class="text-gray-600">Track your Time Off In Lieu (TOIL) balance</p>
            </div>
        </div>

        <!-- TOIL Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Total Balance</CardTitle>
                    <FileText class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ toilStore.totalTOILBalance }}</div>
                    <p class="text-xs text-muted-foreground">hours available</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Active TOIL</CardTitle>
                    <FileText class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ toilStore.activeEntries?.length || 0 }}</div>
                    <p class="text-xs text-muted-foreground">entries</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Used TOIL</CardTitle>
                    <FileText class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ toilStore.usedEntries?.length || 0 }}</div>
                    <p class="text-xs text-muted-foreground">entries</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Expiring Soon</CardTitle>
                    <FileText class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ toilStore.expiringSoonEntries?.length || 0 }}</div>
                    <p class="text-xs text-muted-foreground">within 30 days</p>
                </CardContent>
            </Card>
        </div>

        <!-- TOIL Entries -->
        <Card>
            <CardHeader>
                <CardTitle>My TOIL Entries</CardTitle>
                <CardDescription> View and manage your TOIL entries </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col sm:flex-row gap-4 mb-6">
                    <!-- Search -->
                    <div class="relative flex-1">
                        <Search class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search TOIL entries..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <!-- Status Filter -->
                    <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="used">Used</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>

                <!-- TOIL Entries List -->
                <div class="space-y-4">
                    <div
                        v-for="entry in filteredEntries"
                        :key="entry.id"
                        class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        :class="{ 'border-yellow-200 bg-yellow-50': isExpiringSoon(entry.expiryDate) }"
                    >
                        <div class="flex items-center space-x-4">
                            <Avatar class="h-10 w-10">
                                <AvatarImage :src="entry.user?.avatar || ''" />
                                <AvatarFallback>{{ entry.user?.name?.charAt(0) || "U" }}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 class="font-medium text-gray-900">{{ entry.hours }} hours</h3>
                                <p class="text-sm text-gray-500">Earned: {{ formatDate(entry.earnedDate) }}</p>
                                <p class="text-xs text-gray-400">
                                    Expires: {{ formatDate(entry.expiryDate) }}
                                    <span v-if="isExpiringSoon(entry.expiryDate)" class="text-yellow-600 font-medium"> (Expiring soon!) </span>
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4">
                            <Badge :class="getStatusColor(entry.status)">
                                <component :is="getStatusIcon(entry.status)" class="mr-1 h-3 w-3" />
                                {{ entry.status }}
                            </Badge>

                            <div class="flex space-x-2">
                                <Button v-if="entry.status === 'ACTIVE'" variant="outline" size="sm" @click="openUsageModal(entry)"> Use TOIL </Button>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="filteredEntries.length === 0" class="text-center py-12">
                        <FileText class="mx-auto h-12 w-12 text-gray-400" />
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No TOIL entries</h3>
                        <p class="mt-1 text-sm text-gray-500">
                            {{ searchQuery || statusFilter !== "all" ? "No entries match your filters." : "TOIL is earned from approved overtime." }}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
        <TOILUsageModal :isOpen="showUsageModal" :toilEntry="selectedTOILEntry" @close="showUsageModal = false" @success="handleUsageSuccess" />
    </div>
</template>
