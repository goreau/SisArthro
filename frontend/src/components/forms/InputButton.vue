<template>
    <div class="field has-addons">
        <div class="control is-expanded">
            <input class="input" type="number" min="1" max="3" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder">
        </div>

        <div class="control">
            <button class="button" :class="buttonClass" @click="$emit('click')" :disabled="disa">
                <span class="icon">
                    <i :class="icon"></i>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    modelValue: String,
    placeholder: String,
    disa: Boolean,
    icon: {
        type: String,
        default: 'fas fa-comment'
    },
    buttonClass: {
        type: String,
        default: 'is-info is-dark'
    }
})

defineEmits([
    'update:modelValue',
    'click'
])
</script>
<style scoped>
.button {
    margin-left: 0 !important;
}
</style>