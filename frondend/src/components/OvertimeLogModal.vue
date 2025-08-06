<script setup lang="ts">
import { ref, watch } from "vue"
import { useOvertimeStore } from "@/stores/overtime"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, FileText } from "lucide-vue-next"

interface Props {
    open: boolean
}

interface Emits {
    (e: "update:open", value: boolean): void
    (e: "success"): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const overtimeStore = useOvertimeStore()

const form = ref({
    date: "",
    hours: "",
    description: "",
})

const loading = ref(false)

const handleSubmit = async () => {
    if (!form.value.date || !form.value.hours || !form.value.description) {
        return
    }

    loading.value = true

    try {
        await overtimeStore.createOvertimeEntry({
            date: form.value.date,
            hours: parseFloat(form.value.hours),
            description: form.value.description,
        })

        // Reset form
        form.value = {
            date: "",
            hours: "",
            description: "",
        }

        // Close modal and emit success
        emit("update:open", false)
        emit("success")
    } catch (error) {
        console.error("Failed to create overtime entry:", error)
    } finally {
        loading.value = false
    }
}

const handleClose = () => {
    if (!loading.value) {
        emit("update:open", false)
        // Reset form on close
        form.value = {
            date: "",
            hours: "",
            description: "",
        }
        overtimeStore.clearError()
    }
}

// Watch for modal open/close to reset form and set default date
watch(
    () => props.open,
    (newValue) => {
        console.log("Overtime modal open state changed:", newValue)
        if (newValue) {
            // Set default date to today when modal opens
            form.value.date = new Date().toISOString().split("T")[0]
        } else {
            overtimeStore.clearError()
        }
    }
)
</script>

<template>
    <Dialog :open="open" @update:open="handleClose">
        <DialogContent class="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Log Overtime</DialogTitle>
                <DialogDescription> Record your overtime hours. Fill in all the required details below. </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Error Alert -->
                <Alert v-if="overtimeStore.error" variant="destructive">
                    <AlertDescription>{{ overtimeStore.error }}</AlertDescription>
                </Alert>

                <!-- Date -->
                <div class="space-y-2">
                    <Label for="date">Date</Label>
                    <div class="relative">
                        <Clock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="date" v-model="form.date" type="date" class="pl-10" required />
                    </div>
                </div>

                <!-- Hours -->
                <div class="space-y-2">
                    <Label for="hours">Hours</Label>
                    <div class="relative">
                        <Clock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="hours"
                            v-model="form.hours"
                            type="number"
                            step="0.5"
                            min="0.5"
                            max="24"
                            placeholder="Enter hours worked"
                            class="pl-10"
                            required
                        />
                    </div>
                    <p class="text-xs text-gray-500">Enter hours in decimal format (e.g., 2.5 for 2 hours 30 minutes)</p>
                </div>

                <!-- Description -->
                <div class="space-y-2">
                    <Label for="description">Description</Label>
                    <div class="relative">
                        <FileText class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Textarea
                            id="description"
                            v-model="form.description"
                            placeholder="Describe the work you performed during overtime..."
                            class="pl-10 min-h-[80px]"
                            required
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" @click="handleClose" :disabled="loading"> Cancel </Button>
                    <Button type="submit" :disabled="loading || !form.date || !form.hours || !form.description">
                        <span v-if="loading">Submitting...</span>
                        <span v-else>Submit Entry</span>
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
