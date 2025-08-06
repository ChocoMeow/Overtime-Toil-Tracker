<script setup lang="ts">
import { ref, watch, computed } from "vue"
import { useLeaveStore } from "@/stores/leave"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, FileText } from "lucide-vue-next"

interface Props {
    open: boolean
}

interface Emits {
    (e: "update:open", value: boolean): void
    (e: "success"): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const leaveStore = useLeaveStore()

const form = ref({
    leaveTypeId: "",
    startDate: "",
    endDate: "",
    startTime: "09:00",
    endTime: "17:00",
    reason: "",
})

const loading = ref(false)

// Fetch leave types from API
const leaveTypes = computed(() => leaveStore.leaveTypes)

const handleSubmit = async () => {
    if (!form.value.leaveTypeId || !form.value.startDate || !form.value.endDate || !form.value.reason) {
        return
    }

    loading.value = true

    try {
        await leaveStore.createLeaveRequest({
            leaveTypeId: form.value.leaveTypeId,
            startDate: form.value.startDate,
            endDate: form.value.endDate,
            startTime: form.value.startTime,
            endTime: form.value.endTime,
            reason: form.value.reason,
        })

        // Reset form
        form.value = {
            leaveTypeId: "",
            startDate: "",
            endDate: "",
            startTime: "09:00",
            endTime: "17:00",
            reason: "",
        }

        // Close modal and emit success
        emit("update:open", false)
        emit("success")
    } catch (error) {
        console.error("Failed to create leave request:", error)
    } finally {
        loading.value = false
    }
}

const calculateDays = () => {
    if (!form.value.startDate || !form.value.endDate) return 0

    const start = new Date(form.value.startDate)
    const end = new Date(form.value.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays + 1 // Include both start and end dates
}

const handleClose = () => {
    if (!loading.value) {
        emit("update:open", false)
        // Reset form on close
        form.value = {
            leaveTypeId: "",
            startDate: "",
            endDate: "",
            startTime: "09:00",
            endTime: "17:00",
            reason: "",
        }
        console.log(form.value)
        leaveStore.clearError()
    }
}

// Watch for modal open/close to reset form
watch(
    () => props.open,
    (newValue) => {
        console.log("Leave modal open state changed:", newValue)
        if (newValue) {
            // Set default date to today when modal opens
            form.value.startDate = new Date().toISOString().split("T")[0]
            // Fetch leave types if not already loaded
            if (leaveTypes.value.length === 0) {
                leaveStore.fetchLeaveTypes()
            }
        } else {
            leaveStore.clearError()
        }
    }
)
</script>

<template>
    <Dialog :open="open" @update:open="handleClose">
        <DialogContent class="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Request Leave</DialogTitle>
                <DialogDescription> Submit a new leave request. Fill in all the required details below. </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Error Alert -->
                <Alert v-if="leaveStore.error" variant="destructive">
                    <AlertDescription>{{ leaveStore.error }}</AlertDescription>
                </Alert>

                <!-- Leave Type -->
                <div class="space-y-2">
                    <Label for="leaveType">Leave Type</Label>
                    <Select v-model="form.leaveTypeId" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="type in leaveTypes" :key="type.id" :value="type.id">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: type.color }"></div>
                                    <span>{{ type.name }}</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <!-- Date Range -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="startDate">Start Date</Label>
                        <div class="relative">
                            <Calendar class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="startDate" v-model="form.startDate" type="date" class="pl-10" required />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <Label for="endDate">End Date</Label>
                        <div class="relative">
                            <Calendar class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="endDate" v-model="form.endDate" type="date" class="pl-10" required />
                        </div>
                    </div>
                </div>

                <!-- Time Range -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="startTime">Start Time</Label>
                        <Input id="startTime" v-model="form.startTime" type="time" required />
                    </div>

                    <div class="space-y-2">
                        <Label for="endTime">End Time</Label>
                        <Input id="endTime" v-model="form.endTime" type="time" required />
                    </div>
                </div>

                <!-- Days Calculation -->
                <div v-if="form.startDate && form.endDate" class="p-3 bg-blue-50 rounded-lg">
                    <div class="flex items-center space-x-2">
                        <Calendar class="h-4 w-4 text-blue-600" />
                        <span class="text-sm font-medium text-blue-900"> {{ calculateDays() }} day{{ calculateDays() !== 1 ? "s" : "" }} requested </span>
                    </div>
                </div>

                <!-- Reason -->
                <div class="space-y-2">
                    <Label for="reason">Reason for Leave</Label>
                    <div class="relative">
                        <FileText class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Textarea
                            id="reason"
                            v-model="form.reason"
                            placeholder="Please provide a reason for your leave request..."
                            class="pl-10 min-h-[80px]"
                            required
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" @click="handleClose" :disabled="loading"> Cancel </Button>
                    <Button type="submit" :disabled="loading || !form.leaveTypeId || !form.startDate || !form.endDate || !form.reason">
                        <span v-if="loading">Submitting...</span>
                        <span v-else>Submit Request</span>
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
