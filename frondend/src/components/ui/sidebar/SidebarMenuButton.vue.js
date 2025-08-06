import { reactiveOmit } from '@vueuse/core';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import SidebarMenuButtonChild from './SidebarMenuButtonChild.vue';
import { useSidebar } from './utils';
defineOptions({
    inheritAttrs: false,
});
const props = withDefaults(defineProps(), {
    as: 'button',
    variant: 'default',
    size: 'default',
});
const { isMobile, state } = useSidebar();
const delegatedProps = reactiveOmit(props, 'tooltip');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    as: 'button',
    variant: 'default',
    size: 'default',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (!__VLS_ctx.tooltip) {
    /** @type {[typeof SidebarMenuButtonChild, typeof SidebarMenuButtonChild, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SidebarMenuButtonChild, new SidebarMenuButtonChild({
        ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }),
    }));
    const __VLS_1 = __VLS_0({
        ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    var __VLS_3 = {};
    __VLS_2.slots.default;
    var __VLS_4 = {};
    var __VLS_2;
}
else {
    const __VLS_6 = {}.Tooltip;
    /** @type {[typeof __VLS_components.Tooltip, typeof __VLS_components.Tooltip, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    var __VLS_10 = {};
    __VLS_9.slots.default;
    const __VLS_11 = {}.TooltipTrigger;
    /** @type {[typeof __VLS_components.TooltipTrigger, typeof __VLS_components.TooltipTrigger, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        asChild: true,
    }));
    const __VLS_13 = __VLS_12({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_14.slots.default;
    /** @type {[typeof SidebarMenuButtonChild, typeof SidebarMenuButtonChild, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(SidebarMenuButtonChild, new SidebarMenuButtonChild({
        ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }),
    }));
    const __VLS_16 = __VLS_15({
        ...({ ...__VLS_ctx.delegatedProps, ...__VLS_ctx.$attrs }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    __VLS_17.slots.default;
    var __VLS_18 = {};
    var __VLS_17;
    var __VLS_14;
    const __VLS_20 = {}.TooltipContent;
    /** @type {[typeof __VLS_components.TooltipContent, typeof __VLS_components.TooltipContent, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        side: "right",
        align: "center",
        hidden: (__VLS_ctx.state !== 'collapsed' || __VLS_ctx.isMobile),
    }));
    const __VLS_22 = __VLS_21({
        side: "right",
        align: "center",
        hidden: (__VLS_ctx.state !== 'collapsed' || __VLS_ctx.isMobile),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    if (typeof __VLS_ctx.tooltip === 'string') {
        (__VLS_ctx.tooltip);
    }
    else {
        const __VLS_24 = ((__VLS_ctx.tooltip));
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
        const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    }
    var __VLS_23;
    var __VLS_9;
}
// @ts-ignore
var __VLS_5 = __VLS_4, __VLS_19 = __VLS_18;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Tooltip: Tooltip,
            TooltipContent: TooltipContent,
            TooltipTrigger: TooltipTrigger,
            SidebarMenuButtonChild: SidebarMenuButtonChild,
            isMobile: isMobile,
            state: state,
            delegatedProps: delegatedProps,
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
