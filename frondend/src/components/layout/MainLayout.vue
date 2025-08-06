<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, Home, LogOut, Settings, User, BarChart3, FileText } from "lucide-vue-next"

const router = useRouter()
const authStore = useAuthStore()
const isSidebarOpen = ref(true)

const user = computed(() => authStore.user)
const userInitials = computed(() => {
    if (!user.value?.name) return "U"
    return user.value.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
})

const handleLogout = () => {
    authStore.logout()
    router.push("/login")
}

const handleNavigation = (path: string) => {
    console.log("Navigating to:", path)
    router.push(path)
}

const navigationItems = [
    {
        title: "Dashboard",
        icon: Home,
        href: "/",
    },
    {
        title: "My Leave",
        icon: Calendar,
        href: "/leave",
    },

    {
        title: "My Overtime",
        icon: Clock,
        href: "/overtime",
    },
    {
        title: "My TOIL",
        icon: FileText,
        href: "/toil",
    },

    {
        title: "Reports",
        icon: BarChart3,
        href: "/reports",
    },
]

// Add admin-only item if user is admin
const adminNavItems = computed(() => {
    if (user.value?.role === "ADMIN") {
        return [
            ...navigationItems,
            {
                title: "Admin Approvals",
                icon: Calendar,
                href: "/admin/approvals",
            },
        ]
    }
    return navigationItems
})
</script>

<template>
    <SidebarProvider>
        <div class="flex h-screen w-full">
            <!-- Sidebar -->
            <Sidebar :collapsed="!isSidebarOpen" class="border-r w-64">
                <SidebarHeader class="border-b p-4">
                    <div class="flex items-center gap-2">
                        <div class="h-6 w-6 rounded bg-primary"></div>
                        <span v-if="isSidebarOpen" class="font-semibold">Overtime Tracker</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarMenu>
                        <template v-for="item in adminNavItems" :key="item.title">
                            <SidebarMenuItem :value="item.title">
                                <button
                                    @click="handleNavigation(item.href)"
                                    class="flex w-full items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md text-left"
                                >
                                    <component :is="item.icon" class="h-4 w-4" />
                                    <span v-if="isSidebarOpen">{{ item.title }}</span>
                                </button>
                            </SidebarMenuItem>
                        </template>
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter class="border-t p-4">
                    <div v-if="isSidebarOpen" class="flex items-center gap-2">
                        <Avatar class="h-8 w-8">
                            <AvatarImage :src="user?.avatar ?? ''" />
                            <AvatarFallback>{{ userInitials ?? "" }}</AvatarFallback>
                        </Avatar>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium truncate">{{ user?.name }}</p>
                            <p class="text-xs text-muted-foreground truncate">{{ user?.email }}</p>
                        </div>
                    </div>
                    <DropdownMenu v-else>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" size="icon" class="h-8 w-8">
                                <Avatar class="h-6 w-6">
                                    <AvatarImage :src="user?.avatar ?? ''" />
                                    <AvatarFallback>{{ userInitials ?? "" }}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-56">
                            <DropdownMenuLabel>
                                <div class="flex flex-col space-y-1">
                                    <p class="text-sm font-medium">{{ user?.name }}</p>
                                    <p class="text-xs text-muted-foreground">{{ user?.email }}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="handleNavigation('/profile')">
                                <User class="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <!-- <DropdownMenuItem @click="handleNavigation('/settings')">
                                <Settings class="mr-2 h-4 w-4" />
                                Settings
                            </DropdownMenuItem> -->
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="handleLogout">
                                <LogOut class="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarFooter>
            </Sidebar>

            <!-- Main content -->
            <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
                <!-- Header -->
                <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div class="flex h-14 items-center gap-4 px-4">
                        <SidebarTrigger class="-ml-1" />
                        <div class="flex-1" />
                        <div class="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button variant="ghost" size="icon" class="h-8 w-8">
                                        <Avatar class="h-6 w-6">
                                            <AvatarImage :src="user?.avatar ?? ''" />
                                            <AvatarFallback>{{ userInitials ?? "" }}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" class="w-56">
                                    <DropdownMenuLabel>
                                        <div class="flex flex-col space-y-1">
                                            <p class="text-sm font-medium">{{ user?.name }}</p>
                                            <p class="text-xs text-muted-foreground">{{ user?.email }}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem @click="handleNavigation('/profile')">
                                        <User class="mr-2 h-4 w-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <!-- <DropdownMenuItem @click="handleNavigation('/settings')">
                                        <Settings class="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem> -->
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem @click="handleLogout">
                                        <LogOut class="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <!-- Page content -->
                <main class="flex-1 overflow-auto p-6 w-full">
                    <slot />
                </main>
            </div>
        </div>
    </SidebarProvider>
</template>
