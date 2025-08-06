<script setup lang="ts">
import { computed } from "vue"
import { useAuthStore } from "@/stores/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Building, Calendar, Edit } from "lucide-vue-next"

const authStore = useAuthStore()

const user = computed(() => authStore.user)
const userInitials = computed(() => {
    if (!user.value?.name) return "U"
    return user.value.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
            <p class="text-gray-600">View and manage your profile information</p>
        </div>

        <!-- Profile Information -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Profile Card -->
            <div class="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center justify-between">
                            <span>Personal Information</span>
                            <Button variant="outline" size="sm">
                                <Edit class="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </CardTitle>
                        <CardDescription> Your basic profile information </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <div class="flex items-center space-x-4">
                            <Avatar class="h-20 w-20">
                                <AvatarImage :src="user?.avatar || ''" />
                                <AvatarFallback class="text-lg">{{ userInitials }}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 class="text-xl font-semibold">{{ user?.name || "User Name" }}</h3>
                                <p class="text-gray-600">{{ user?.role || "Employee" }}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center space-x-3">
                                <Mail class="h-5 w-5 text-gray-400" />
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Email</p>
                                    <p class="text-sm text-gray-600">{{ user?.email || "user@example.com" }}</p>
                                </div>
                            </div>

                            <div class="flex items-center space-x-3">
                                <Building class="h-5 w-5 text-gray-400" />
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Department</p>
                                    <p class="text-sm text-gray-600">{{ user?.department || "Not specified" }}</p>
                                </div>
                            </div>

                            <div class="flex items-center space-x-3">
                                <Calendar class="h-5 w-5 text-gray-400" />
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Join Date</p>
                                    <p class="text-sm text-gray-600">
                                        {{ user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "Not specified" }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-center space-x-3">
                                <User class="h-5 w-5 text-gray-400" />
                                <div>
                                    <p class="text-sm font-medium text-gray-900">Role</p>
                                    <p class="text-sm text-gray-600 capitalize">{{ user?.role || "Employee" }}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Quick Actions -->
            <div class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription> Common profile actions </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <Button variant="outline" class="w-full justify-start">
                            <Edit class="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                        <Button variant="outline" class="w-full justify-start">
                            <User class="mr-2 h-4 w-4" />
                            Change Password
                        </Button>
                        <Button variant="outline" class="w-full justify-start">
                            <Mail class="mr-2 h-4 w-4" />
                            Update Email
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Account Status</CardTitle>
                        <CardDescription> Your account information </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Account Status</span>
                            <span class="text-sm font-medium text-green-600">Active</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Last Login</span>
                            <span class="text-sm text-gray-900">Today</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Member Since</span>
                            <span class="text-sm text-gray-900">
                                {{ user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A" }}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>
