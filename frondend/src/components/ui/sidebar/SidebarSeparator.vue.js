import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Separator;
/** @type {[typeof __VLS_components.Separator, typeof __VLS_components.Separator, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dataSlot: "sidebar-separator",
    dataSidebar: "separator",
    ...{ class: (__VLS_ctx.cn('bg-sidebar-border mx-2 w-auto', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "sidebar-separator",
    dataSidebar: "separator",
    ...{ class: (__VLS_ctx.cn('bg-sidebar-border mx-2 w-auto', props.class)) },
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
            cn: cn,
            Separator: Separator,
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
