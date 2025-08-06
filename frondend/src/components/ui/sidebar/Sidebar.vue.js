import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue';
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue';
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue';
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from './utils';
defineOptions({
    inheritAttrs: false,
});
const props = withDefaults(defineProps(), {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
});
const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.collapsible === 'none') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-slot': "sidebar",
        ...{ class: (__VLS_ctx.cn('bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col', props.class)) },
    });
    var __VLS_0 = {};
}
else if (__VLS_ctx.isMobile) {
    const __VLS_2 = {}.Sheet;
    /** @type {[typeof __VLS_components.Sheet, typeof __VLS_components.Sheet, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(__VLS_2, new __VLS_2({
        ...{ 'onUpdate:open': {} },
        open: (__VLS_ctx.openMobile),
    }));
    const __VLS_4 = __VLS_3({
        ...{ 'onUpdate:open': {} },
        open: (__VLS_ctx.openMobile),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    let __VLS_6;
    let __VLS_7;
    let __VLS_8;
    const __VLS_9 = {
        'onUpdate:open': (__VLS_ctx.setOpenMobile)
    };
    var __VLS_10 = {};
    __VLS_5.slots.default;
    const __VLS_11 = {}.SheetContent;
    /** @type {[typeof __VLS_components.SheetContent, typeof __VLS_components.SheetContent, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        dataSidebar: "sidebar",
        dataSlot: "sidebar",
        dataMobile: "true",
        side: (__VLS_ctx.side),
        ...{ class: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden" },
        ...{ style: ({
                '--sidebar-width': __VLS_ctx.SIDEBAR_WIDTH_MOBILE,
            }) },
    }));
    const __VLS_13 = __VLS_12({
        dataSidebar: "sidebar",
        dataSlot: "sidebar",
        dataMobile: "true",
        side: (__VLS_ctx.side),
        ...{ class: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden" },
        ...{ style: ({
                '--sidebar-width': __VLS_ctx.SIDEBAR_WIDTH_MOBILE,
            }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_14.slots.default;
    /** @type {[typeof SheetHeader, typeof SheetHeader, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(SheetHeader, new SheetHeader({
        ...{ class: "sr-only" },
    }));
    const __VLS_16 = __VLS_15({
        ...{ class: "sr-only" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    __VLS_17.slots.default;
    /** @type {[typeof SheetTitle, typeof SheetTitle, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(SheetTitle, new SheetTitle({}));
    const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_20.slots.default;
    var __VLS_20;
    /** @type {[typeof SheetDescription, typeof SheetDescription, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(SheetDescription, new SheetDescription({}));
    const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    var __VLS_23;
    var __VLS_17;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex h-full w-full flex-col" },
    });
    var __VLS_24 = {};
    var __VLS_14;
    var __VLS_5;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "group peer text-sidebar-foreground hidden md:block" },
        'data-slot': "sidebar",
        'data-state': (__VLS_ctx.state),
        'data-collapsible': (__VLS_ctx.state === 'collapsed' ? __VLS_ctx.collapsible : ''),
        'data-variant': (__VLS_ctx.variant),
        'data-side': (__VLS_ctx.side),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ class: (__VLS_ctx.cn('relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear', 'group-data-[collapsible=offcanvas]:w-0', 'group-data-[side=right]:rotate-180', __VLS_ctx.variant === 'floating' || __VLS_ctx.variant === 'inset'
                ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
                : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (__VLS_ctx.cn('fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex', __VLS_ctx.side === 'left'
                ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]', 
            // Adjust the padding for floating and inset variants.
            __VLS_ctx.variant === 'floating' || __VLS_ctx.variant === 'inset'
                ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
                : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l', props.class)) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-sidebar': "sidebar",
        ...{ class: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm" },
    });
    var __VLS_26 = {};
}
/** @type {__VLS_StyleScopedClasses['bg-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sidebar-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['w-(--sidebar-width)']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
/** @type {__VLS_StyleScopedClasses['[&>button]:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['peer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sidebar-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:block']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[variant=floating]:border-sidebar-border']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[variant=floating]:rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[variant=floating]:border']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[variant=floating]:shadow-sm']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_25 = __VLS_24, __VLS_27 = __VLS_26;
[__VLS_dollars.$attrs, __VLS_dollars.$attrs, __VLS_dollars.$attrs,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cn: cn,
            Sheet: Sheet,
            SheetContent: SheetContent,
            SheetDescription: SheetDescription,
            SheetHeader: SheetHeader,
            SheetTitle: SheetTitle,
            SIDEBAR_WIDTH_MOBILE: SIDEBAR_WIDTH_MOBILE,
            isMobile: isMobile,
            state: state,
            openMobile: openMobile,
            setOpenMobile: setOpenMobile,
        };
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
