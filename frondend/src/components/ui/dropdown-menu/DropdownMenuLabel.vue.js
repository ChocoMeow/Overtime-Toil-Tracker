import { reactiveOmit } from '@vueuse/core';
import { DropdownMenuLabel, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';
const props = defineProps();
const delegatedProps = reactiveOmit(props, 'class', 'inset');
const forwardedProps = useForwardProps(delegatedProps);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.DropdownMenuLabel;
/** @type {[typeof __VLS_components.DropdownMenuLabel, typeof __VLS_components.DropdownMenuLabel, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dataSlot: "dropdown-menu-label",
    dataInset: (__VLS_ctx.inset ? '' : undefined),
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "dropdown-menu-label",
    dataInset: (__VLS_ctx.inset ? '' : undefined),
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', props.class)) },
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
            DropdownMenuLabel: DropdownMenuLabel,
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
