import { reactiveOmit } from '@vueuse/core';
import { ChevronDown } from 'lucide-vue-next';
import { NavigationMenuTrigger, useForwardProps, } from 'reka-ui';
import { cn } from '@/lib/utils';
import { navigationMenuTriggerStyle } from '.';
const props = defineProps();
const delegatedProps = reactiveOmit(props, 'class');
const forwardedProps = useForwardProps(delegatedProps);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.NavigationMenuTrigger;
/** @type {[typeof __VLS_components.NavigationMenuTrigger, typeof __VLS_components.NavigationMenuTrigger, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dataSlot: "navigation-menu-trigger",
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.navigationMenuTriggerStyle(), 'group', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "navigation-menu-trigger",
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.navigationMenuTriggerStyle(), 'group', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
var __VLS_5 = {};
const __VLS_7 = {}.ChevronDown;
/** @type {[typeof __VLS_components.ChevronDown, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ...{ class: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" },
    'aria-hidden': "true",
}));
const __VLS_9 = __VLS_8({
    ...{ class: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" },
    'aria-hidden': "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[1px]']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['size-3']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['group-data-[state=open]:rotate-180']} */ ;
// @ts-ignore
var __VLS_6 = __VLS_5;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ChevronDown: ChevronDown,
            NavigationMenuTrigger: NavigationMenuTrigger,
            cn: cn,
            navigationMenuTriggerStyle: navigationMenuTriggerStyle,
            forwardedProps: forwardedProps,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
