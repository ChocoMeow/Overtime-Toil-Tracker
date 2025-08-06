<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { useTOILStore } from "@/stores/toil"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "lucide-vue-next"

interface Props {
    isOpen: boolean
    toilEntry: any
}
const props = defineProps<Props>()
const emit = defineEmits(["close", "success"])

const toilStore = useTOILStore()
const usedDate = ref("")
const startTime = ref("09:00")
const endTime = ref("17:00")
const loading = ref(false)
const error = ref("")

// Calculate hours based on start and end time
const calculatedHours = computed(() => {
    if (!startTime.value || !endTime.value) return 0

    const [startHour, startMinute] = startTime.value.split(":").map(Number)
    const [endHour, endMinute] = endTime.value.split(":").map(Number)
    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = endHour * 60 + endMinute
    const durationMinutes = endTotalMinutes - startTotalMinutes

    return Math.max(0, durationMinutes / 60)
})

watch(
    () => props.isOpen,
    (newValue) => {
        if (newValue && props.toilEntry) {
            usedDate.value = new Date().toISOString().split("T")[0]
            startTime.value = "09:00"
            endTime.value = "17:00"
            error.value = ""
        }
    }
)

const isValid = computed(() => {
    return !!usedDate.value && calculatedHours.value > 0 && calculatedHours.value <= (props.toilEntry?.hours || 0) && !!startTime.value && !!endTime.value
})

const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : ""
}

const handleSubmit = async () => {
    if (!isValid.value) return
    loading.value = true
    error.value = ""
    try {
        await toilStore.useTOIL(props.toilEntry.id, {
            usedDate: usedDate.value,
            startTime: startTime.value,
            endTime: endTime.value,
        })
        emit("success")
        emit("close")
    } catch (err: any) {
        error.value = err.message || "Failed to use TOIL"
    } finally {
        loading.value = false
    }
}

const handleClose = () => {
    if (!loading.value) {
        usedDate.value = ""
        startTime.value = "09:00"
        endTime.value = "17:00"
        error.value = ""
        emit("close")
    }
}
</script>

<template>
    <Dialog :open="props.isOpen" @update:open="handleClose">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle class="flex items-center gap-2">
                    <Calendar class="h-5 w-5" />
                    Use TOIL
                </DialogTitle>
                <DialogDescription> Choose when you want to use your TOIL hours </DialogDescription>
            </DialogHeader>

            <div class="space-y-6">
                <div class="p-4 bg-gray-50 rounded-lg mb-2">
                    <h4 class="font-medium text-gray-900 mb-2">TOIL Entry Details</h4>
                    <div class="space-y-1 text-sm text-gray-600">
                        <p><strong>Available Hours:</strong> {{ props.toilEntry?.hours }} hours</p>
                        <p><strong>Earned Date:</strong> {{ formatDate(props.toilEntry?.earnedDate) }}</p>
                        <p><strong>Expires:</strong> {{ formatDate(props.toilEntry?.expiryDate) }}</p>
                    </div>
                </div>

                <Alert v-if="error" variant="destructive" class="mb-2">
                    <AlertDescription>{{ error }}</AlertDescription>
                </Alert>

                <div class="space-y-6">
                    <div class="space-y-2">
                        <Label for="usedDate">Date to Use TOIL</Label>
                        <Input id="usedDate" v-model="usedDate" type="date" :min="new Date().toISOString().split('T')[0]" required />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="startTime">Start Time</Label>
                            <Input id="startTime" v-model="startTime" type="time" required />
                        </div>
                        <div class="space-y-2">
                            <Label for="endTime">End Time</Label>
                            <Input id="endTime" v-model="endTime" type="time" required />
                        </div>
                    </div>

                    <div class="p-3 bg-blue-50 rounded-lg">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-blue-900">Calculated Hours:</span>
                            <span class="text-lg font-bold text-blue-700">{{ calculatedHours.toFixed(2) }} hours</span>
                        </div>
                        <p class="text-xs text-blue-600 mt-1">Maximum available: {{ props.toilEntry?.hours }} hours</p>
                    </div>
                </div>
            </div>

            <DialogFooter class="mt-8 flex flex-row gap-4 justify-end">
                <Button variant="outline" @click="handleClose" :disabled="loading"> Cancel </Button>
                <Button @click="handleSubmit" :disabled="!isValid || loading">
                    {{ loading ? "Using TOIL..." : "Use TOIL" }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
