<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import MainLayout from "@/components/layout/MainLayout.vue"

const authStore = useAuthStore()
const route = useRoute()

const isAuthenticated = computed(() => !!authStore.token)
const isPublicRoute = computed(() => route.meta.public)

onMounted(async () => {
    // Try to fetch current user if token exists
    if (authStore.token) {
        await authStore.fetchCurrentUser()
    }
})
</script>

<template>
    <MainLayout v-if="isAuthenticated && !isPublicRoute">
        <router-view />
    </MainLayout>
    <router-view v-else />
</template>

<style>
/* Global styles can go here */
</style>
