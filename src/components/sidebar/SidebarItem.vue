<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const isActive = computed(() => route.path === props.item.path)

const isChildActive = computed(() => {
  if (props.item.children) {
    return props.item.children.some((child) => route.path === child.path)
  }
  return false
})

const isOpen = ref(isChildActive.value)

watch(
  () => route.path,
  () => {
    if (props.item.children) {
      isOpen.value = props.item.children.some((child) => route.path === child.path)
    }
  },
  { immediate: true },
)
</script>

<template>
  <li v-if="!item.children" class="group" :class="{ active: isActive }">
    <RouterLink
      :to="item.path"
      class="flex items-center h-14 gap-2 rounded-2xl p-4 group-hover:bg-desa-foreshadow group-[.active]:bg-desa-foreshadow transition-setup"
    >
      <div v-if="item.iconActive && item.iconInactive" class="relative flex size-6 shrink-0">
        <img
          :src="item.iconActive"
          class="absolute size-6 opacity-0 group-hover:opacity-100 group-[.active]:opacity-100 transition-setup"
          alt="icon"
        />
        <img
          :src="item.iconInactive"
          class="absolute size-6 opacity-100 group-hover:opacity-0 group-[.active]:opacity-0 transition-setup"
          alt="icon"
        />
      </div>
      <span
        class="text-left leading-5 text-desa-secondary flex flex-1 group-hover:text-desa-dark-green group-[.active]:text-desa-dark-green group-[.active]:font-medium transition-setup"
      >
        {{ item.label }}
      </span>
    </RouterLink>
  </li>

  <li v-else class="flex flex-col w-full">
    <button
      class="group flex w-full items-center h-14 gap-2 rounded-2xl p-4"
      @click="isOpen = !isOpen"
    >
      <div v-if="item.iconActive && item.iconInactive" class="relative flex size-6 shrink-0">
        <img :src="item.iconActive" class="absolute size-6 transition-setup" alt="icon" />
        <img :src="item.iconInactive" class="absolute size-6 transition-setup" alt="icon" />
      </div>
      <span
        class="text-left leading-5 text-desa-secondary flex flex-1 group-[.active]:text-desa-dark-green transition-setup"
      >
        {{ item.label }}
      </span>
      <div class="relative flex size-6 shrink-0">
        <img
          src="@/assets/images/icons/arrow-circle-dark-green-up.svg"
          class="absolute size-6 transition-setup"
          alt="icon"
          v-if="isOpen"
        />
        <img
          src="@/assets/images/icons/arrow-circle-secondary-green-down.svg"
          class="absolute size-6 transition-setup"
          alt="icon"
          v-else
        />
      </div>
    </button>
    <ul v-show="isOpen" class="flex flex-col pl-[28px]">
      <SidebarItem v-for="child in item.children" :key="child.path" :item="child" />
    </ul>
  </li>
</template>
