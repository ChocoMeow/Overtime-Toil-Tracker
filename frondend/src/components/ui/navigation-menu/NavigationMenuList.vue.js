import { reactiveOmit } from '@vueuse/core';
import { NavigationMenuList, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';
const props = defineProps();
const delegatedProps = reactiveOmit(props, 'class');
const forwardedProps = useForwardProps(delegatedProps);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.NavigationMenuList;
/** @type {[typeof __VLS_components.NavigationMenuList, typeof __VLS_components.NavigationMenuList, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dataSlot: "navigation-menu-list",
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn('group flex flex-1 list-none items-center justify-center gap-1', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "navigation-menu-list",
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn('group flex flex-1 list-none items-center justify-center gap-1', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
var __VLS_5 = {};
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            NavigationMenuList: NavigationMenuList,
            cn: cn,
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
