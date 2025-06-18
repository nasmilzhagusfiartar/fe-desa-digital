<script setup>
import router from '@/router'
import { useSocialAssistanceStore } from '@/stores/socialAssistance'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ModalDelete from '@/components/ui/ModalDelete.vue'
import { formatRupiah, formatToClientTimezone } from '@/helpers/format'

const route = useRoute()

const socialAssistance = ref({})
const showModalDelete = ref(false)

const socialAssistanceStore = useSocialAssistanceStore()
const { loading } = storeToRefs(socialAssistanceStore)
const { fetchSocialAssistance, deleteSocialAssistance } = socialAssistanceStore

const fetchData = async () => {
  const response = await fetchSocialAssistance(route.params.id)
  socialAssistance.value = response
}

async function handleDelete() {
  await deleteSocialAssistance(route.params.id)
  router.push({ name: 'social-assistance' })
}

onMounted(fetchData)
</script>

<template>
  <div id="Header" class="flex items-center justify-between">
    <div class="flex flex-col gap-2">
      <div class="flex gap-1 items-center leading-5 text-desa-secondary">
        <p class="last-of-type:text-desa-dark-green last-of-type:font-semibold capitalize">
          Bantuan sosial
        </p>
        <span>/</span>
        <p class="last-of-type:text-desa-dark-green last-of-type:font-semibold capitalize">
          Manage bantuan sosial
        </p>
      </div>
      <h1 class="font-semibold text-2xl">Manage Bantuan Sosial</h1>
    </div>
    <div class="flex items-center gap-3">
      <button
        data-modal="Modal-Delete"
        class="flex items-center rounded-2xl py-4 px-6 gap-[10px] bg-desa-red"
        @click="showModalDelete = true"
      >
        <p class="font-medium text-white">Hapus Data</p>
        <img src="@/assets/images/icons/trash-white.svg" class="flex size-6 shrink-0" alt="icon" />
      </button>
      <a
        href="kd-bantuan-sosial-edit.html"
        class="flex items-center rounded-2xl py-4 px-6 gap-[10px] bg-desa-black"
      >
        <p class="font-medium text-white">Ubah Data</p>
        <img src="@/assets/images/icons/edit-white.svg" class="flex size-6 shrink-0" alt="icon" />
      </a>
    </div>
  </div>

  <div class="flex gap-[14px]">
    <!-- SECTION: Informasi Bantuan Sosial -->
    <section
      id="Informasi-Bantuan-Sosial"
      class="flex flex-col shrink-0 w-[54.5%] h-fit rounded-3xl p-6 gap-6 bg-white"
    >
      <p class="font-medium leading-5 text-desa-secondary">Informasi Bantuan Sosial</p>

      <div class="flex items-center justify-between gap-4">
        <!-- Thumbnail -->
        <div class="w-[120px] h-[100px] shrink-0 rounded-2xl overflow-hidden bg-desa-foreshadow">
          <img
            :src="socialAssistance?.thumbnail || '/default-thumbnail.jpg'"
            class="w-full h-full object-cover"
            alt="photo"
          />
        </div>

        <!-- Status Ketersediaan -->
        <div
          v-if="socialAssistance?.is_available"
          class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center bg-desa-soft-green"
        >
          <span class="font-semibold text-xs text-white uppercase">Tersedia</span>
        </div>
        <div v-else class="badge rounded-full p-3 gap-2 flex justify-center bg-desa-red">
          <span class="font-semibold text-xs text-white uppercase">Tidak Tersedia</span>
        </div>
      </div>

      <!-- Nama dan Provider -->
      <div class="flex flex-col gap-[6px] w-full">
        <p class="font-semibold text-xl">{{ socialAssistance?.name || '-' }}</p>
        <p class="flex items-center gap-1">
          <img
            src="@/assets/images/icons/profile-secondary-green.svg"
            class="size-[18px] shrink-0"
            alt="icon"
          />
          <span class="font-medium text-sm text-desa-secondary">
            {{ socialAssistance?.provider || '-' }}
          </span>
        </p>
      </div>

      <hr class="border-desa-foreshadow" />

      <!-- Jumlah Uang -->
      <div class="flex items-center gap-3">
        <div
          class="size-[52px] shrink-0 rounded-2xl bg-desa-foreshadow flex items-center justify-center"
        >
          <img
            src="@/assets/images/icons/money-dark-green.svg"
            class="size-6 shrink-0"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="font-semibold text-lg leading-[22.5px] text-desa-dark-green">
            {{ formatRupiah(socialAssistance?.amount || 0) }}
          </p>
          <span class="font-medium text-desa-secondary">Uang Tunai</span>
        </div>
      </div>

      <hr class="border-desa-foreshadow" />

      <!-- Total Pengajuan -->
      <div class="flex items-center gap-3">
        <div
          class="size-[52px] shrink-0 rounded-2xl bg-desa-blue/10 flex items-center justify-center"
        >
          <img
            src="@/assets/images/icons/profile-2user-blue.svg"
            class="size-6 shrink-0"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="font-semibold text-lg leading-[22.5px] text-desa-blue">
            {{ socialAssistance?.social_assistance_recipients?.length || 0 }} Warga
          </p>
          <span class="font-medium text-desa-secondary">Total Pengajuan</span>
        </div>
      </div>

      <hr class="border-desa-foreshadow" />

      <!-- Deskripsi -->
      <div class="flex flex-col gap-3">
        <p class="font-medium text-sm text-desa-secondary">Tentang Bantuan</p>
        <p class="font-medium leading-8">
          {{ socialAssistance?.description || 'Tidak ada deskripsi tersedia.' }}
        </p>
      </div>
    </section>

    <!-- SECTION: Penerima Bansos Terakhir -->
    <section
      id="Penerima-Bansos-Terakhir"
      class="flex flex-col flex-1 h-fit shrink-0 rounded-3xl p-6 gap-6 bg-white"
    >
      <!-- Judul Section -->
      <p class="font-medium leading-5 text-desa-secondary">Penerima Bansos Terakhir</p>

      <!-- List Penerima -->
      <div id="List-Bansos-Terakhir" class="flex flex-col gap-6">
        <div
          v-for="recipient in socialAssistance.social_assistance_recipients"
          :key="recipient.id"
          class="card flex flex-col gap-4 rounded-2xl border border-desa-background p-4"
        >
          <!-- Waktu -->
          <div class="flex items-center justify-between">
            <p class="font-medium text-sm text-desa-secondary">
              {{ formatToClientTimezone(recipient.created_at) }}
            </p>
            <img
              src="@/assets/images/icons/calendar-2-secondary-green.svg"
              class="flex size-[18px] shrink-0"
              alt="icon"
            />
          </div>

          <hr class="border-desa-background" />

          <!-- Nominal dan Status -->
          <div class="flex items-center gap-3">
            <div class="flex flex-col gap-[6px] w-full">
              <p class="font-semibold text-lg leading-5">{{ formatRupiah(recipient.amount) }}</p>
              <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan</p>
            </div>

            <!-- Badge Status -->
            <!-- Badge Status -->
            <div
              v-if="recipient.status === 'pending'"
              class="px-3 py-[6px] rounded-full bg-desa-yellow flex items-center justify-center shrink-0"
            >
              <span class="text-xs font-semibold text-white uppercase">Menunggu</span>
            </div>
            <div
              v-else-if="recipient.status === 'approved'"
              class="px-3 py-[6px] rounded-full bg-desa-green flex items-center justify-center shrink-0"
            >
              <span class="text-xs font-semibold text-white uppercase">Disetujui</span>
            </div>
            <div
              v-else-if="recipient.status === 'rejected'"
              class="px-3 py-[6px] rounded-full bg-desa-red flex items-center justify-center shrink-0"
            >
              <span class="text-xs font-semibold text-white uppercase">Ditolak</span>
            </div>
          </div>

          <hr class="border-desa-background" />

          <!-- Informasi Penerima -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-0.5">
              <img
                src="@/assets/images/icons/profile-secondary-green.svg"
                class="flex size-[18px] shrink-0"
                alt="icon"
              />
              <p class="font-medium text-sm text-desa-secondary">Diberikan Kepada:</p>
            </div>
            <div class="flex items-center gap-1">
              <p class="font-medium leading-5">{{ recipient.head_of_family.user?.name }}</p>
              <div class="flex size-8 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden">
                <img
                  :src="recipient.head_of_family.profile_picture"
                  class="w-full h-full object-cover"
                  alt="photo"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Tombol View All -->
        <a
          href="#"
          class="flex items-center justify-center h-14 rounded-2xl py-4 px-6 gap-[10px] bg-desa-dark-green"
        >
          <span class="font-medium leading-5 text-white">View All</span>
        </a>
      </div>
    </section>
  </div>

  <!-- MODAL: Hapus Data -->
  <ModalDelete
    :show="showModalDelete"
    title="Hapus Bantuan Sosial?"
    :loading="loading"
    @close="showModalDelete = false"
    @confirm="handleDelete"
  />
</template>
