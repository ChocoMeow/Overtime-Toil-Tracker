<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, Building } from "lucide-vue-next"

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)

const departments = ["IT"]

const handleRegister = async () => {
    if (!form.value.name || !form.value.email || !form.value.password || !form.value.department) {
        return
    }

    if (form.value.password !== form.value.confirmPassword) {
        return
    }

    loading.value = true

    try {
        await authStore.register({
            name: form.value.name,
            email: form.value.email,
            password: form.value.password,
            department: form.value.department,
        })

        router.push("/")
    } catch (error) {
        console.error("Registration failed:", error)
    } finally {
        loading.value = false
    }
}

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value
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
                <h2 class="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
                <p class="mt-2 text-sm text-gray-600">Join the Overtime & TOIL Tracker platform</p>
            </div>

            <!-- Registration Form -->
            <Card>
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription> Fill in your details to create your account </CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="handleRegister" class="space-y-4">
                        <!-- Error Alert -->
                        <Alert v-if="authStore.error" variant="destructive">
                            <AlertDescription>{{ authStore.error }}</AlertDescription>
                        </Alert>

                        <!-- Name Field -->
                        <div class="space-y-2">
                            <Label for="name">Full name</Label>
                            <div class="relative">
                                <User class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input id="name" v-model="form.name" type="text" placeholder="Enter your full name" class="pl-10" required />
                            </div>
                        </div>

                        <!-- Email Field -->
                        <div class="space-y-2">
                            <Label for="email">Email address</Label>
                            <div class="relative">
                                <Mail class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input id="email" v-model="form.email" type="email" placeholder="Enter your email" class="pl-10" required />
                            </div>
                        </div>

                        <!-- Department Field -->
                        <div class="space-y-2">
                            <Label for="department">Department</Label>
                            <div class="relative">
                                <Building class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Select v-model="form.department" required>
                                    <SelectTrigger class="pl-10">
                                        <SelectValue placeholder="Select your department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="dept in departments" :key="dept" :value="dept">
                                            {{ dept }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <!-- Password Field -->
                        <div class="space-y-2">
                            <Label for="password">Password</Label>
                            <div class="relative">
                                <Lock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Create a password"
                                    class="pl-10 pr-10"
                                    required
                                />
                                <button type="button" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600" @click="togglePasswordVisibility">
                                    <Eye v-if="!showPassword" class="h-4 w-4" />
                                    <EyeOff v-else class="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <!-- Confirm Password Field -->
                        <div class="space-y-2">
                            <Label for="confirmPassword">Confirm password</Label>
                            <div class="relative">
                                <Lock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    v-model="form.confirmPassword"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    placeholder="Confirm your password"
                                    class="pl-10 pr-10"
                                    required
                                />
                                <button type="button" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600" @click="toggleConfirmPasswordVisibility">
                                    <Eye v-if="!showConfirmPassword" class="h-4 w-4" />
                                    <EyeOff v-else class="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <!-- Password Mismatch Alert -->
                        <Alert v-if="form.password && form.confirmPassword && form.password !== form.confirmPassword" variant="destructive">
                            <AlertDescription>Passwords do not match</AlertDescription>
                        </Alert>

                        <!-- Submit Button -->
                        <Button
                            type="submit"
                            class="w-full"
                            :disabled="loading || !form.name || !form.email || !form.password || !form.department || form.password !== form.confirmPassword"
                        >
                            <span v-if="loading">Creating account...</span>
                            <span v-else>Create account</span>
                        </Button>
                    </form>

                    <!-- Links -->
                    <div class="mt-6 text-center">
                        <p class="text-sm text-gray-600">
                            Already have an account?
                            <router-link to="/login" class="font-medium text-primary hover:text-primary/80"> Sign in here </router-link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
