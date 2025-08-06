import { PanelLeft } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSidebar } from './utils';
const props = defineProps();
const { toggleSidebar } = useSidebar();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    dataSidebar: "trigger",
    dataSlot: "sidebar-trigger",
    variant: "ghost",
    size: "icon",
    ...{ class: (__VLS_ctx.cn('h-7 w-7', props.class)) },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    dataSidebar: "trigger",
    dataSlot: "sidebar-trigger",
    variant: "ghost",
    size: "icon",
    ...{ class: (__VLS_ctx.cn('h-7 w-7', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.toggleSidebar)
};
var __VLS_8 = {};
__VLS_3.slots.default;
const __VLS_9 = {}.PanelLeft;
/** @type {[typeof __VLS_components.PanelLeft, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "sr-only" },
});
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PanelLeft: PanelLeft,
            cn: cn,
            Button: Button,
            toggleSidebar: toggleSidebar,
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
