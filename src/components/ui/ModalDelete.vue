<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div id="Modal-Delete" class="modal fixed inset-0 h-screen z-40 flex bg-[#080C1ACC]" v-if="show">
    <div
      id="Alert"
      class="flex flex-col w-[335px] shrink-0 rounded-2xl overflow-hidden bg-white m-auto"
    >
      <div class="flex items-center justify-between p-4 gap-3 bg-desa-black">
        <p class="font-medium leading-5 text-white">{{ title }}</p>
        <button class="btn-close-modal" @click="$emit('close')">
          <img
            src="@/assets/images/icons/close-circle-white.svg"
            class="flex size-6 shrink-0"
            alt="icon"
          />
        </button>
      </div>
      <div class="flex flex-col p-4 gap-3">
        <p class="font-medium text-sm leading-[22.5px] text-desa-secondary">
          Tindakan ini permanen dan tidak bisa dibatalkan!
        </p>
        <hr class="border-desa-background" />
        <div class="flex items-center gap-3">
          <button
            class="btn-close-modal flex items-center h-14 rounded-2xl py-3 px-8 gap-[10px] border border-desa-background hover:bg-desa-black hover:text-white transition-setup"
            @click="$emit('close')"
          >
            <span class="font-semibold text-sm">Batal</span>
          </button>
          <button
            class="flex items-center h-14 rounded-2xl py-3 px-8 gap-[10px] bg-desa-red w-full"
            @click="$emit('confirm')"
            :disabled="loading"
          >
            <span class="flex items-center gap-[10px]" v-if="!loading">
              <img
                src="@/assets/images/icons/trash-white.svg"
                class="flex size-6 shrink-0"
                alt=""
              />
              <span class="font-semibold text-sm text-white">Iya Hapus</span>
            </span>
            <span v-if="loading">
              <span class="font-semibold text-sm text-white">Loading...</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
