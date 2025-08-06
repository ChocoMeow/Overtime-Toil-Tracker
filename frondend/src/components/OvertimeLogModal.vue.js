import { ref, watch } from "vue";
import { useOvertimeStore } from "@/stores/overtime";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, FileText } from "lucide-vue-next";
const props = defineProps();
const emit = defineEmits();
const overtimeStore = useOvertimeStore();
const form = ref({
    date: "",
    hours: "",
    description: "",
});
const loading = ref(false);
const handleSubmit = async () => {
    if (!form.value.date || !form.value.hours || !form.value.description) {
        return;
    }
    loading.value = true;
    try {
        await overtimeStore.createOvertimeEntry({
            date: form.value.date,
            hours: parseFloat(form.value.hours),
            description: form.value.description,
        });
        // Reset form
        form.value = {
            date: "",
            hours: "",
            description: "",
        };
        // Close modal and emit success
        emit("update:open", false);
        emit("success");
    }
    catch (error) {
        console.error("Failed to create overtime entry:", error);
    }
    finally {
        loading.value = false;
    }
};
const handleClose = () => {
    if (!loading.value) {
        emit("update:open", false);
        // Reset form on close
        form.value = {
            date: "",
            hours: "",
            description: "",
        };
        overtimeStore.clearError();
    }
};
// Watch for modal open/close to reset form and set default date
watch(() => props.open, (newValue) => {
    console.log("Overtime modal open state changed:", newValue);
    if (newValue) {
        // Set default date to today when modal opens
        form.value.date = new Date().toISOString().split("T")[0];
    }
    else {
        overtimeStore.clearError();
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.open),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    'onUpdate:open': (__VLS_ctx.handleClose)
};
var __VLS_8 = {};
__VLS_3.slots.default;
const __VLS_9 = {}.DialogContent;
/** @type {[typeof __VLS_components.DialogContent, typeof __VLS_components.DialogContent, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ class: "sm:max-w-[500px]" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "sm:max-w-[500px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.DialogHeader;
/** @type {[typeof __VLS_components.DialogHeader, typeof __VLS_components.DialogHeader, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.DialogTitle;
/** @type {[typeof __VLS_components.DialogTitle, typeof __VLS_components.DialogTitle, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
var __VLS_20;
const __VLS_21 = {}.DialogDescription;
/** @type {[typeof __VLS_components.DialogDescription, typeof __VLS_components.DialogDescription, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
var __VLS_24;
var __VLS_16;
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "space-y-4" },
});
if (__VLS_ctx.overtimeStore.error) {
    const __VLS_25 = {}.Alert;
    /** @type {[typeof __VLS_components.Alert, typeof __VLS_components.Alert, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        variant: "destructive",
    }));
    const __VLS_27 = __VLS_26({
        variant: "destructive",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_28.slots.default;
    const __VLS_29 = {}.AlertDescription;
    /** @type {[typeof __VLS_components.AlertDescription, typeof __VLS_components.AlertDescription, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
    const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
    __VLS_32.slots.default;
    (__VLS_ctx.overtimeStore.error);
    var __VLS_32;
    var __VLS_28;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-2" },
});
const __VLS_33 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    for: "date",
}));
const __VLS_35 = __VLS_34({
    for: "date",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
var __VLS_36;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative" },
});
const __VLS_37 = {}.Clock;
/** @type {[typeof __VLS_components.Clock, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ class: "absolute left-3 top-3 h-4 w-4 text-gray-400" },
}));
const __VLS_39 = __VLS_38({
    ...{ class: "absolute left-3 top-3 h-4 w-4 text-gray-400" },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const __VLS_41 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    id: "date",
    modelValue: (__VLS_ctx.form.date),
    type: "date",
    ...{ class: "pl-10" },
    required: true,
}));
const __VLS_43 = __VLS_42({
    id: "date",
    modelValue: (__VLS_ctx.form.date),
    type: "date",
    ...{ class: "pl-10" },
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-2" },
});
const __VLS_45 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    for: "hours",
}));
const __VLS_47 = __VLS_46({
    for: "hours",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
__VLS_48.slots.default;
var __VLS_48;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative" },
});
const __VLS_49 = {}.Clock;
/** @type {[typeof __VLS_components.Clock, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    ...{ class: "absolute left-3 top-3 h-4 w-4 text-gray-400" },
}));
const __VLS_51 = __VLS_50({
    ...{ class: "absolute left-3 top-3 h-4 w-4 text-gray-400" },
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const __VLS_53 = {}.Input;
/** @type {[typeof __VLS_components.Input, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    id: "hours",
    modelValue: (__VLS_ctx.form.hours),
    type: "number",
    step: "0.5",
    min: "0.5",
    max: "24",
    placeholder: "Enter hours worked",
    ...{ class: "pl-10" },
    required: true,
}));
const __VLS_55 = __VLS_54({
    id: "hours",
    modelValue: (__VLS_ctx.form.hours),
    type: "number",
    step: "0.5",
    min: "0.5",
    max: "24",
    placeholder: "Enter hours worked",
    ...{ class: "pl-10" },
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-xs text-gray-500" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-2" },
});
const __VLS_57 = {}.Label;
/** @type {[typeof __VLS_components.Label, typeof __VLS_components.Label, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    for: "description",
}));
const __VLS_59 = __VLS_58({
    for: "description",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
__VLS_60.slots.default;
var __VLS_60;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative" },
});
const __VLS_61 = {}.FileText;
/** @type {[typeof __VLS_components.FileText, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    ...{ class: "absolute left-3 top-3 h-4 w-4 text-gray-400" },
}));
const __VLS_63 = __VLS_62({
    ...{ class: "absolute left-3 top-3 h-4 w-4 text-gray-400" },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
const __VLS_65 = {}.Textarea;
/** @type {[typeof __VLS_components.Textarea, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    id: "description",
    modelValue: (__VLS_ctx.form.description),
    placeholder: "Describe the work you performed during overtime...",
    ...{ class: "pl-10 min-h-[80px]" },
    required: true,
}));
const __VLS_67 = __VLS_66({
    id: "description",
    modelValue: (__VLS_ctx.form.description),
    placeholder: "Describe the work you performed during overtime...",
    ...{ class: "pl-10 min-h-[80px]" },
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const __VLS_69 = {}.DialogFooter;
/** @type {[typeof __VLS_components.DialogFooter, typeof __VLS_components.DialogFooter, ]} */ ;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({}));
const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
__VLS_72.slots.default;
const __VLS_73 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    ...{ 'onClick': {} },
    type: "button",
    variant: "outline",
    disabled: (__VLS_ctx.loading),
}));
const __VLS_75 = __VLS_74({
    ...{ 'onClick': {} },
    type: "button",
    variant: "outline",
    disabled: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_77;
let __VLS_78;
let __VLS_79;
const __VLS_80 = {
    onClick: (__VLS_ctx.handleClose)
};
__VLS_76.slots.default;
var __VLS_76;
const __VLS_81 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    type: "submit",
    disabled: (__VLS_ctx.loading || !__VLS_ctx.form.date || !__VLS_ctx.form.hours || !__VLS_ctx.form.description),
}));
const __VLS_83 = __VLS_82({
    type: "submit",
    disabled: (__VLS_ctx.loading || !__VLS_ctx.form.date || !__VLS_ctx.form.hours || !__VLS_ctx.form.description),
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
__VLS_84.slots.default;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
var __VLS_84;
var __VLS_72;
var __VLS_12;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['sm:max-w-[500px]']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-10']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-10']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[80px]']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Dialog: Dialog,
            DialogContent: DialogContent,
            DialogDescription: DialogDescription,
            DialogFooter: DialogFooter,
            DialogHeader: DialogHeader,
            DialogTitle: DialogTitle,
            Button: Button,
            Input: Input,
            Label: Label,
            Textarea: Textarea,
            Alert: Alert,
            AlertDescription: AlertDescription,
            Clock: Clock,
            FileText: FileText,
            overtimeStore: overtimeStore,
            form: form,
            loading: loading,
            handleSubmit: handleSubmit,
            handleClose: handleClose,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
