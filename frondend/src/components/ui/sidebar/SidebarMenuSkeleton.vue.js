import { computed } from 'vue';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
const props = defineProps();
const width = computed(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-slot': "sidebar-menu-skeleton",
    'data-sidebar': "menu-skeleton",
    ...{ class: (__VLS_ctx.cn('flex h-8 items-center gap-2 rounded-md px-2', props.class)) },
});
if (__VLS_ctx.showIcon) {
    const __VLS_0 = {}.Skeleton;
    /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "size-4 rounded-md" },
        dataSidebar: "menu-skeleton-icon",
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "size-4 rounded-md" },
        dataSidebar: "menu-skeleton-icon",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
const __VLS_4 = {}.Skeleton;
/** @type {[typeof __VLS_components.Skeleton, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "h-4 max-w-(--skeleton-width) flex-1" },
    dataSidebar: "menu-skeleton-text",
    ...{ style: ({ '--skeleton-width': __VLS_ctx.width }) },
}));
const __VLS_6 = __VLS_5({
    ...{ class: "h-4 max-w-(--skeleton-width) flex-1" },
    dataSidebar: "menu-skeleton-text",
    ...{ style: ({ '--skeleton-width': __VLS_ctx.width }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-(--skeleton-width)']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cn: cn,
            Skeleton: Skeleton,
            width: width,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
