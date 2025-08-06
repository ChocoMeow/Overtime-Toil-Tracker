import { reactiveOmit } from '@vueuse/core';
import { NavigationMenuIndicator, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';
const props = defineProps();
const delegatedProps = reactiveOmit(props, 'class');
const forwardedProps = useForwardProps(delegatedProps);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.NavigationMenuIndicator;
/** @type {[typeof __VLS_components.NavigationMenuIndicator, typeof __VLS_components.NavigationMenuIndicator, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dataSlot: "navigation-menu-indicator",
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn('data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "navigation-menu-indicator",
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn('data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: "bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" },
});
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['bg-border']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[60%]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-45']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-tl-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            NavigationMenuIndicator: NavigationMenuIndicator,
            cn: cn,
            forwardedProps: forwardedProps,
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
