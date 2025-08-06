import { Primitive } from 'reka-ui';
import { cn } from '@/lib/utils';
import { sidebarMenuButtonVariants } from '.';
const props = withDefaults(defineProps(), {
    as: 'button',
    variant: 'default',
    size: 'default',
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    as: 'button',
    variant: 'default',
    size: 'default',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Primitive;
/** @type {[typeof __VLS_components.Primitive, typeof __VLS_components.Primitive, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dataSlot: "sidebar-menu-button",
    dataSidebar: "menu-button",
    dataSize: (__VLS_ctx.size),
    dataActive: (__VLS_ctx.isActive),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.sidebarMenuButtonVariants({ variant: __VLS_ctx.variant, size: __VLS_ctx.size }), props.class)) },
    as: (__VLS_ctx.as),
    asChild: (__VLS_ctx.asChild),
}));
const __VLS_2 = __VLS_1({
    dataSlot: "sidebar-menu-button",
    dataSidebar: "menu-button",
    dataSize: (__VLS_ctx.size),
    dataActive: (__VLS_ctx.isActive),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.sidebarMenuButtonVariants({ variant: __VLS_ctx.variant, size: __VLS_ctx.size }), props.class)) },
    as: (__VLS_ctx.as),
    asChild: (__VLS_ctx.asChild),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
var __VLS_5 = {};
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
[__VLS_dollars.$attrs,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Primitive: Primitive,
            cn: cn,
            sidebarMenuButtonVariants: sidebarMenuButtonVariants,
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
