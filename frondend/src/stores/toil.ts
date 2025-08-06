import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { apiClient } from "@/api/client"
import type { TOILEntry } from "@/types"

export const useTOILStore = defineStore("toil", () => {
    const toilEntries = ref<TOILEntry[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const activeEntries = computed(() => toilEntries.value.filter((entry) => entry.status === "ACTIVE"))

    const usedEntries = computed(() => toilEntries.value.filter((entry) => entry.status === "USED"))

    const expiredEntries = computed(() => toilEntries.value.filter((entry) => entry.status === "EXPIRED"))

    const expiringSoonEntries = computed(() => {
        const thirtyDaysFromNow = new Date()
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
        return toilEntries.value.filter((entry) => {
            const expiry = new Date(entry.expiryDate)
            return entry.status === "ACTIVE" && expiry <= thirtyDaysFromNow && expiry > new Date()
        })
    })

    const totalTOILBalance = computed(() => activeEntries.value.reduce((total, entry) => total + entry.hours, 0))

    const fetchTOILEntries = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await apiClient.getTOILEntries()
            toilEntries.value = response || []
        } catch (err: any) {
            console.error("Failed to fetch TOIL entries:", err)
            error.value = err.message || "Failed to fetch TOIL entries"
        } finally {
            loading.value = false
        }
    }

    const fetchAllTOILEntries = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await apiClient.getAllTOILEntries()
            return response || []
        } catch (err: any) {
            console.error("Failed to fetch all TOIL entries:", err)
            error.value = err.message || "Failed to fetch all TOIL entries"
            return []
        } finally {
            loading.value = false
        }
    }

    const createTOILEntry = async (toilData: { earnedDate: string; hours: number; expiryDate: string }) => {
        loading.value = true
        error.value = null

        try {
            const response = await apiClient.createTOILEntry(toilData)

            // Add the new entry to the list
            if (response) {
                toilEntries.value.unshift(response)
            }

            return response
        } catch (err: any) {
            console.error("Failed to create TOIL entry:", err)
            error.value = err.message || "Failed to create TOIL entry"
            throw err
        } finally {
            loading.value = false
        }
    }

    const updateTOILEntry = async (id: string, toilData: Partial<{ earnedDate: string; hours: number; expiryDate: string }>) => {
        loading.value = true
        error.value = null

        try {
            const response = await apiClient.updateTOILEntry(id, toilData)

            // Update the entry in the list
            const index = toilEntries.value.findIndex((entry) => entry.id === id)
            if (index !== -1 && response) {
                toilEntries.value[index] = response
            }

            return response
        } catch (err: any) {
            console.error("Failed to update TOIL entry:", err)
            error.value = err.message || "Failed to update TOIL entry"
            throw err
        } finally {
            loading.value = false
        }
    }

    const useTOIL = async (id: string, toilUsageData: { usedDate: string; startTime: string; endTime: string }) => {
        loading.value = true
        error.value = null

        try {
            const response = await apiClient.useTOIL(id, toilUsageData)

            // Update the entry in the list
            const index = toilEntries.value.findIndex((entry) => entry.id === id)
            if (index !== -1 && response) {
                toilEntries.value[index] = response
            }

            return response
        } catch (err: any) {
            console.error("Failed to use TOIL:", err)
            error.value = err.message || "Failed to use TOIL"
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteTOILEntry = async (id: string) => {
        loading.value = true
        error.value = null

        try {
            await apiClient.deleteTOILEntry(id)

            // Remove the entry from the list
            toilEntries.value = toilEntries.value.filter((entry) => entry.id !== id)
        } catch (err: any) {
            console.error("Failed to delete TOIL entry:", err)
            error.value = err.message || "Failed to delete TOIL entry"
            throw err
        } finally {
            loading.value = false
        }
    }

    const clearError = () => {
        error.value = null
    }

    return {
        toilEntries,
        loading,
        error,
        activeEntries,
        usedEntries,
        expiredEntries,
        expiringSoonEntries,
        totalTOILBalance,
        fetchTOILEntries,
        fetchAllTOILEntries,
        createTOILEntry,
        updateTOILEntry,
        useTOIL,
        deleteTOILEntry,
        clearError,
    }
})
