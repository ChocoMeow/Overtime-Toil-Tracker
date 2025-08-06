import { useEventListener, useMediaQuery, useVModel } from '@vueuse/core';
import { TooltipProvider } from 'reka-ui';
import { computed, ref } from 'vue';
import { cn } from '@/lib/utils';
import { provideSidebarContext, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from './utils';
const props = withDefaults(defineProps(), {
    defaultOpen: true,
    open: undefined,
});
const emits = defineEmits();
const isMobile = useMediaQuery('(max-width: 768px)');
const openMobile = ref(false);
const open = useVModel(props, 'open', emits, {
    defaultValue: props.defaultOpen ?? false,
    passive: (props.open === undefined),
});
function setOpen(value) {
    open.value = value; // emits('update:open', value)
    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
}
function setOpenMobile(value) {
    openMobile.value = value;
}
// Helper to toggle the sidebar.
function toggleSidebar() {
    return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
}
useEventListener('keydown', (event) => {
    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
    }
});
// We add a state so that we can do data-state="expanded" or "collapsed".
// This makes it easier to style the sidebar with Tailwind classes.
const state = computed(() => open.value ? 'expanded' : 'collapsed');
provideSidebarContext({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    defaultOpen: true,
    open: undefined,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.TooltipProvider;
/** @type {[typeof __VLS_components.TooltipProvider, typeof __VLS_components.TooltipProvider, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    delayDuration: (0),
}));
const __VLS_2 = __VLS_1({
    delayDuration: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-slot': "sidebar-wrapper",
    ...{ style: ({
            '--sidebar-width': __VLS_ctx.SIDEBAR_WIDTH,
            '--sidebar-width-icon': __VLS_ctx.SIDEBAR_WIDTH_ICON,
        }) },
    ...{ class: (__VLS_ctx.cn('group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full', props.class)) },
});
var __VLS_5 = {};
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
[__VLS_dollars.$attrs,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TooltipProvider: TooltipProvider,
            cn: cn,
            SIDEBAR_WIDTH: SIDEBAR_WIDTH,
            SIDEBAR_WIDTH_ICON: SIDEBAR_WIDTH_ICON,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
