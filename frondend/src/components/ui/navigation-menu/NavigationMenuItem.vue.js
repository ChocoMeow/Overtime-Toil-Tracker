import { reactiveOmit } from '@vueuse/core';
import { NavigationMenuItem } from 'reka-ui';
import { cn } from '@/lib/utils';
const props = defineProps();
const delegatedProps = reactiveOmit(props, 'class');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.NavigationMenuItem;
/** @type {[typeof __VLS_components.NavigationMenuItem, typeof __VLS_components.NavigationMenuItem, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dataSlot: "navigation-menu-item",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('relative', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "navigation-menu-item",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('relative', props.class)) },
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
            NavigationMenuItem: NavigationMenuItem,
            cn: cn,
            delegatedProps: delegatedProps,
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
