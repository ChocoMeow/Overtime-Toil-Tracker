import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Home, LogOut, Settings, User, BarChart3, FileText } from "lucide-vue-next";
const router = useRouter();
const authStore = useAuthStore();
const isSidebarOpen = ref(true);
const user = computed(() => authStore.user);
const userInitials = computed(() => {
    if (!user.value?.name)
        return "U";
    return user.value.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
});
const handleLogout = () => {
    authStore.logout();
    router.push("/login");
};
const handleNavigation = (path) => {
    console.log("Navigating to:", path);
    router.push(path);
};
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
    {
        title: "Settings",
        icon: Settings,
        href: "/settings",
    },
];
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
        ];
    }
    return navigationItems;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.SidebarProvider;
/** @type {[typeof __VLS_components.SidebarProvider, typeof __VLS_components.SidebarProvider, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex h-screen w-full" },
});
const __VLS_5 = {}.Sidebar;
/** @type {[typeof __VLS_components.Sidebar, typeof __VLS_components.Sidebar, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    collapsed: (!__VLS_ctx.isSidebarOpen),
    ...{ class: "border-r w-64" },
}));
const __VLS_7 = __VLS_6({
    collapsed: (!__VLS_ctx.isSidebarOpen),
    ...{ class: "border-r w-64" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.SidebarHeader;
/** @type {[typeof __VLS_components.SidebarHeader, typeof __VLS_components.SidebarHeader, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ class: "border-b p-4" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "border-b p-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "h-6 w-6 rounded bg-primary" },
});
if (__VLS_ctx.isSidebarOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "font-semibold" },
    });
}
var __VLS_12;
const __VLS_13 = {}.SidebarContent;
/** @type {[typeof __VLS_components.SidebarContent, typeof __VLS_components.SidebarContent, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.SidebarMenu;
/** @type {[typeof __VLS_components.SidebarMenu, typeof __VLS_components.SidebarMenu, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.adminNavItems))) {
    const __VLS_21 = {}.SidebarMenuItem;
    /** @type {[typeof __VLS_components.SidebarMenuItem, typeof __VLS_components.SidebarMenuItem, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        value: (item.title),
    }));
    const __VLS_23 = __VLS_22({
        value: (item.title),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleNavigation(item.href);
            } },
        ...{ class: "flex w-full items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md text-left" },
    });
    const __VLS_25 = ((item.icon));
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_27 = __VLS_26({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    if (__VLS_ctx.isSidebarOpen) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (item.title);
    }
    var __VLS_24;
}
var __VLS_20;
var __VLS_16;
const __VLS_29 = {}.SidebarFooter;
/** @type {[typeof __VLS_components.SidebarFooter, typeof __VLS_components.SidebarFooter, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ class: "border-t p-4" },
}));
const __VLS_31 = __VLS_30({
    ...{ class: "border-t p-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
if (__VLS_ctx.isSidebarOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center gap-2" },
    });
    const __VLS_33 = {}.Avatar;
    /** @type {[typeof __VLS_components.Avatar, typeof __VLS_components.Avatar, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        ...{ class: "h-8 w-8" },
    }));
    const __VLS_35 = __VLS_34({
        ...{ class: "h-8 w-8" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    __VLS_36.slots.default;
    const __VLS_37 = {}.AvatarImage;
    /** @type {[typeof __VLS_components.AvatarImage, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        src: (__VLS_ctx.user?.avatar ?? ''),
    }));
    const __VLS_39 = __VLS_38({
        src: (__VLS_ctx.user?.avatar ?? ''),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    const __VLS_41 = {}.AvatarFallback;
    /** @type {[typeof __VLS_components.AvatarFallback, typeof __VLS_components.AvatarFallback, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
    const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
    __VLS_44.slots.default;
    (__VLS_ctx.userInitials ?? "");
    var __VLS_44;
    var __VLS_36;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex-1 min-w-0" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm font-medium truncate" },
    });
    (__VLS_ctx.user?.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-xs text-muted-foreground truncate" },
    });
    (__VLS_ctx.user?.email);
}
else {
    const __VLS_45 = {}.DropdownMenu;
    /** @type {[typeof __VLS_components.DropdownMenu, typeof __VLS_components.DropdownMenu, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
    const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_48.slots.default;
    const __VLS_49 = {}.DropdownMenuTrigger;
    /** @type {[typeof __VLS_components.DropdownMenuTrigger, typeof __VLS_components.DropdownMenuTrigger, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        asChild: true,
    }));
    const __VLS_51 = __VLS_50({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_52.slots.default;
    const __VLS_53 = {}.Button;
    /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        variant: "ghost",
        size: "icon",
        ...{ class: "h-8 w-8" },
    }));
    const __VLS_55 = __VLS_54({
        variant: "ghost",
        size: "icon",
        ...{ class: "h-8 w-8" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_56.slots.default;
    const __VLS_57 = {}.Avatar;
    /** @type {[typeof __VLS_components.Avatar, typeof __VLS_components.Avatar, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
        ...{ class: "h-6 w-6" },
    }));
    const __VLS_59 = __VLS_58({
        ...{ class: "h-6 w-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    __VLS_60.slots.default;
    const __VLS_61 = {}.AvatarImage;
    /** @type {[typeof __VLS_components.AvatarImage, ]} */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        src: (__VLS_ctx.user?.avatar ?? ''),
    }));
    const __VLS_63 = __VLS_62({
        src: (__VLS_ctx.user?.avatar ?? ''),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    const __VLS_65 = {}.AvatarFallback;
    /** @type {[typeof __VLS_components.AvatarFallback, typeof __VLS_components.AvatarFallback, ]} */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
    const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
    __VLS_68.slots.default;
    (__VLS_ctx.userInitials ?? "");
    var __VLS_68;
    var __VLS_60;
    var __VLS_56;
    var __VLS_52;
    const __VLS_69 = {}.DropdownMenuContent;
    /** @type {[typeof __VLS_components.DropdownMenuContent, typeof __VLS_components.DropdownMenuContent, ]} */ ;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
        align: "end",
        ...{ class: "w-56" },
    }));
    const __VLS_71 = __VLS_70({
        align: "end",
        ...{ class: "w-56" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    __VLS_72.slots.default;
    const __VLS_73 = {}.DropdownMenuLabel;
    /** @type {[typeof __VLS_components.DropdownMenuLabel, typeof __VLS_components.DropdownMenuLabel, ]} */ ;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({}));
    const __VLS_75 = __VLS_74({}, ...__VLS_functionalComponentArgsRest(__VLS_74));
    __VLS_76.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-col space-y-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.user?.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-xs text-muted-foreground" },
    });
    (__VLS_ctx.user?.email);
    var __VLS_76;
    const __VLS_77 = {}.DropdownMenuSeparator;
    /** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({}));
    const __VLS_79 = __VLS_78({}, ...__VLS_functionalComponentArgsRest(__VLS_78));
    const __VLS_81 = {}.DropdownMenuItem;
    /** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        ...{ 'onClick': {} },
    }));
    const __VLS_83 = __VLS_82({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    let __VLS_85;
    let __VLS_86;
    let __VLS_87;
    const __VLS_88 = {
        onClick: (...[$event]) => {
            if (!!(__VLS_ctx.isSidebarOpen))
                return;
            __VLS_ctx.handleNavigation('/profile');
        }
    };
    __VLS_84.slots.default;
    const __VLS_89 = {}.User;
    /** @type {[typeof __VLS_components.User, ]} */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
        ...{ class: "mr-2 h-4 w-4" },
    }));
    const __VLS_91 = __VLS_90({
        ...{ class: "mr-2 h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    var __VLS_84;
    const __VLS_93 = {}.DropdownMenuSeparator;
    /** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({}));
    const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
    const __VLS_97 = {}.DropdownMenuItem;
    /** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        ...{ 'onClick': {} },
    }));
    const __VLS_99 = __VLS_98({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    let __VLS_101;
    let __VLS_102;
    let __VLS_103;
    const __VLS_104 = {
        onClick: (__VLS_ctx.handleLogout)
    };
    __VLS_100.slots.default;
    const __VLS_105 = {}.LogOut;
    /** @type {[typeof __VLS_components.LogOut, ]} */ ;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        ...{ class: "mr-2 h-4 w-4" },
    }));
    const __VLS_107 = __VLS_106({
        ...{ class: "mr-2 h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    var __VLS_100;
    var __VLS_72;
    var __VLS_48;
}
var __VLS_32;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-1 flex flex-col min-w-0 overflow-hidden" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex h-14 items-center gap-4 px-4" },
});
const __VLS_109 = {}.SidebarTrigger;
/** @type {[typeof __VLS_components.SidebarTrigger, ]} */ ;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
    ...{ class: "-ml-1" },
}));
const __VLS_111 = __VLS_110({
    ...{ class: "-ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: "flex-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
});
const __VLS_113 = {}.DropdownMenu;
/** @type {[typeof __VLS_components.DropdownMenu, typeof __VLS_components.DropdownMenu, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({}));
const __VLS_115 = __VLS_114({}, ...__VLS_functionalComponentArgsRest(__VLS_114));
__VLS_116.slots.default;
const __VLS_117 = {}.DropdownMenuTrigger;
/** @type {[typeof __VLS_components.DropdownMenuTrigger, typeof __VLS_components.DropdownMenuTrigger, ]} */ ;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
    asChild: true,
}));
const __VLS_119 = __VLS_118({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
__VLS_120.slots.default;
const __VLS_121 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
    variant: "ghost",
    size: "icon",
    ...{ class: "h-8 w-8" },
}));
const __VLS_123 = __VLS_122({
    variant: "ghost",
    size: "icon",
    ...{ class: "h-8 w-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
__VLS_124.slots.default;
const __VLS_125 = {}.Avatar;
/** @type {[typeof __VLS_components.Avatar, typeof __VLS_components.Avatar, ]} */ ;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
    ...{ class: "h-6 w-6" },
}));
const __VLS_127 = __VLS_126({
    ...{ class: "h-6 w-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
__VLS_128.slots.default;
const __VLS_129 = {}.AvatarImage;
/** @type {[typeof __VLS_components.AvatarImage, ]} */ ;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
    src: (__VLS_ctx.user?.avatar ?? ''),
}));
const __VLS_131 = __VLS_130({
    src: (__VLS_ctx.user?.avatar ?? ''),
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
const __VLS_133 = {}.AvatarFallback;
/** @type {[typeof __VLS_components.AvatarFallback, typeof __VLS_components.AvatarFallback, ]} */ ;
// @ts-ignore
const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({}));
const __VLS_135 = __VLS_134({}, ...__VLS_functionalComponentArgsRest(__VLS_134));
__VLS_136.slots.default;
(__VLS_ctx.userInitials ?? "");
var __VLS_136;
var __VLS_128;
var __VLS_124;
var __VLS_120;
const __VLS_137 = {}.DropdownMenuContent;
/** @type {[typeof __VLS_components.DropdownMenuContent, typeof __VLS_components.DropdownMenuContent, ]} */ ;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
    align: "end",
    ...{ class: "w-56" },
}));
const __VLS_139 = __VLS_138({
    align: "end",
    ...{ class: "w-56" },
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
__VLS_140.slots.default;
const __VLS_141 = {}.DropdownMenuLabel;
/** @type {[typeof __VLS_components.DropdownMenuLabel, typeof __VLS_components.DropdownMenuLabel, ]} */ ;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({}));
const __VLS_143 = __VLS_142({}, ...__VLS_functionalComponentArgsRest(__VLS_142));
__VLS_144.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col space-y-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm font-medium" },
});
(__VLS_ctx.user?.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-xs text-muted-foreground" },
});
(__VLS_ctx.user?.email);
var __VLS_144;
const __VLS_145 = {}.DropdownMenuSeparator;
/** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({}));
const __VLS_147 = __VLS_146({}, ...__VLS_functionalComponentArgsRest(__VLS_146));
const __VLS_149 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({
    ...{ 'onClick': {} },
}));
const __VLS_151 = __VLS_150({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_150));
let __VLS_153;
let __VLS_154;
let __VLS_155;
const __VLS_156 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleNavigation('/profile');
    }
};
__VLS_152.slots.default;
const __VLS_157 = {}.User;
/** @type {[typeof __VLS_components.User, ]} */ ;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_159 = __VLS_158({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_158));
var __VLS_152;
const __VLS_161 = {}.DropdownMenuSeparator;
/** @type {[typeof __VLS_components.DropdownMenuSeparator, ]} */ ;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({}));
const __VLS_163 = __VLS_162({}, ...__VLS_functionalComponentArgsRest(__VLS_162));
const __VLS_165 = {}.DropdownMenuItem;
/** @type {[typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ]} */ ;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({
    ...{ 'onClick': {} },
}));
const __VLS_167 = __VLS_166({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_166));
let __VLS_169;
let __VLS_170;
let __VLS_171;
const __VLS_172 = {
    onClick: (__VLS_ctx.handleLogout)
};
__VLS_168.slots.default;
const __VLS_173 = {}.LogOut;
/** @type {[typeof __VLS_components.LogOut, ]} */ ;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_175 = __VLS_174({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_174));
var __VLS_168;
var __VLS_140;
var __VLS_116;
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "flex-1 overflow-auto p-6 w-full" },
});
var __VLS_177 = {};
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-accent-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background/95']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['supports-[backdrop-filter]:bg-background/60']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['-ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
// @ts-ignore
var __VLS_178 = __VLS_177;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Sidebar: Sidebar,
            SidebarContent: SidebarContent,
            SidebarFooter: SidebarFooter,
            SidebarHeader: SidebarHeader,
            SidebarMenu: SidebarMenu,
            SidebarMenuItem: SidebarMenuItem,
            SidebarProvider: SidebarProvider,
            SidebarTrigger: SidebarTrigger,
            Button: Button,
            Avatar: Avatar,
            AvatarFallback: AvatarFallback,
            AvatarImage: AvatarImage,
            DropdownMenu: DropdownMenu,
            DropdownMenuContent: DropdownMenuContent,
            DropdownMenuItem: DropdownMenuItem,
            DropdownMenuLabel: DropdownMenuLabel,
            DropdownMenuSeparator: DropdownMenuSeparator,
            DropdownMenuTrigger: DropdownMenuTrigger,
            LogOut: LogOut,
            User: User,
            isSidebarOpen: isSidebarOpen,
            user: user,
            userInitials: userInitials,
            handleLogout: handleLogout,
            handleNavigation: handleNavigation,
            adminNavItems: adminNavItems,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
