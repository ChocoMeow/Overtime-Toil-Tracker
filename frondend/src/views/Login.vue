<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-vue-next"

const router = useRouter()
const authStore = useAuthStore()

const email = ref("")
const password = ref("")
const showPassword = ref(false)
const loading = ref(false)

const handleLogin = async () => {
    if (!email.value || !password.value) return

    loading.value = true

    try {
        await authStore.login({
            email: email.value,
            password: password.value,
        })

        router.push("/")
    } catch (error) {
        console.error("Login failed:", error)
    } finally {
        loading.value = false
    }
}

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

onMounted(() => {
    // Clear any previous errors
    authStore.clearError()
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <!-- Logo/Brand -->
            <div class="text-center">
                <div class="mx-auto h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-xl">OT</span>
                </div>
                <h2 class="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
                <p class="mt-2 text-sm text-gray-600">Sign in to your Overtime & TOIL Tracker account</p>
            </div>

            <!-- Login Form -->
            <Card>
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription> Enter your credentials to access your account </CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="handleLogin" class="space-y-4">
                        <!-- Error Alert -->
                        <Alert v-if="authStore.error" variant="destructive">
                            <AlertDescription>{{ authStore.error }}</AlertDescription>
                        </Alert>

                        <!-- Email Field -->
                        <div class="space-y-2">
                            <Label for="email">Email address</Label>
                            <div class="relative">
                                <Mail class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input id="email" v-model="email" type="email" placeholder="Enter your email" class="pl-10" required />
                            </div>
                        </div>

                        <!-- Password Field -->
                        <div class="space-y-2">
                            <Label for="password">Password</Label>
                            <div class="relative">
                                <Lock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    v-model="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Enter your password"
                                    class="pl-10 pr-10"
                                    required
                                />
                                <button type="button" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600" @click="togglePasswordVisibility">
                                    <Eye v-if="!showPassword" class="h-4 w-4" />
                                    <EyeOff v-else class="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <Button type="submit" class="w-full" :disabled="loading || !email || !password">
                            <span v-if="loading">Signing in...</span>
                            <span v-else>Sign in</span>
                        </Button>
                    </form>

                    <!-- Links -->
                    <div class="mt-6 text-center">
                        <p class="text-sm text-gray-600">
                            Don't have an account?
                            <router-link to="/register" class="font-medium text-primary hover:text-primary/80"> Sign up here </router-link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
