import { reactiveOmit } from '@vueuse/core';
import { Circle } from 'lucide-vue-next';
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits, } from 'reka-ui';
import { cn } from '@/lib/utils';
const props = defineProps();
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.DropdownMenuRadioItem;
/** @type {[typeof __VLS_components.DropdownMenuRadioItem, typeof __VLS_components.DropdownMenuRadioItem, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dataSlot: "dropdown-menu-radio-item",
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn(`focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`, props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "dropdown-menu-radio-item",
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn(`focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`, props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center" },
});
const __VLS_5 = {}.DropdownMenuItemIndicator;
/** @type {[typeof __VLS_components.DropdownMenuItemIndicator, typeof __VLS_components.DropdownMenuItemIndicator, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.Circle;
/** @type {[typeof __VLS_components.Circle, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ class: "size-2 fill-current" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "size-2 fill-current" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
var __VLS_8;
var __VLS_13 = {};
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['size-2']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-current']} */ ;
// @ts-ignore
var __VLS_14 = __VLS_13;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Circle: Circle,
            DropdownMenuItemIndicator: DropdownMenuItemIndicator,
            DropdownMenuRadioItem: DropdownMenuRadioItem,
            cn: cn,
            forwarded: forwarded,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
