<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    required: true,
  },
  filledIcon: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="relative">
      <input
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        class="peer w-full h-[56px] rounded-2xl pl-[48px] pr-4 border-[1.5px] border-desa-background font-medium leading-5 focus:outline-none"
        :class="{ 'border-red-500': errorMessage }"
      />
      <img
        :src="icon"
        alt="icon"
        class="absolute shrink-0 size-6 top-1/2 left-4 -translate-y-1/2 opacity-0 peer-placeholder-shown:opacity-100 transition-all"
      />
      <img
        :src="filledIcon"
        alt="icon"
        class="absolute shrink-0 size-6 top-1/2 left-4 -translate-y-1/2 opacity-100 peer-placeholder-shown:opacity-0 transition-all"
      />
    </div>

    <span class="text-left text-[12px] text-red-500" v-if="errorMessage">
      {{ errorMessage }}
    </span>
  </div>
</template>
