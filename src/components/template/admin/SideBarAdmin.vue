<script setup>
/* eslint-disable */
import { ref } from "vue";
import Api from "@/axios/axios";
import { useStoreAdmin } from "@/stores/admin";
import { useStoreAdminAuth } from "@/stores/adminAuth";
import { computed } from "vue";
import serviceAuth from "@/services/authServices";
import { useRouter } from "vue-router";
const router = useRouter();
const storeAdmin = useStoreAdmin();
const storeAdminAuth = useStoreAdminAuth();

const pagesActive = computed(() => storeAdmin.pagesActive);
const me = computed(() => storeAdminAuth.me);
const kepalajurusan = computed(() => storeAdminAuth.kepalajurusan);
const jurusan = computed(() => storeAdminAuth.jurusan);
const penilai = computed(() => storeAdminAuth.penilai);
const pagesActiveClass = ref("border-b  border-info rounded-full shadow-lg");

const doLogout = async () => {
  if (confirm("Apakah anda yakin ingin Logout?")) {
    const resLogout = await serviceAuth.doLogout();
    if (resLogout) {
      router.push({ name: "home" });
    }
  }
};
// let a = "ini a";
// let b = "ok";
// console.log(a ?? b);
// const me = ref({});
const getDataDetail = async () => {
  try {
    const response = await Api.post(`pembimbingsekolah/auth/profile`);
    // me.value = response.data.me;
    storeAdminAuth.setMe(response.data.me)
    storeAdminAuth.setKepalaJurusan(response.data.kepalajurusan)
    storeAdminAuth.setPenilai(response.data.penilai)
    storeAdminAuth.setJurusan(response.data.jurusan)
    // console.log(me.value, response.data.jurusan);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataDetail();
</script>
<template>
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label>
    <ul class="menu p-4    w-80 bg-base-200 text-base-content space-y-1  max-w-sm ">
      <div class="py-4 border-secondary border-b w-full ">
        <div class="flex gap-2 items-center justify-center">
          <div class="avatar online">
            <div class="w-24 rounded-full border border-sky-200 hover:border-sky-400 shadow hover:shadow-lg">
              <img src="@/assets/img/avatar/user.png" />
            </div>
          </div>
        </div>
        <div>
          <div class="flex flex-col justify-center w-full">
            <div class="flex justify-center gap-2 w-full">
              <article>

                <p class="text-base-content text-md font-semibold text-center py-2 capitalize">
                  {{ me.nama }}
                </p>
                <p class="text-base-content text-md font-semibold text-center py-2 capitalize">
                  {{ me.nomeridentitas }}
                </p>
              </article>
              <!-- <router-link :to="{ name: 'admin-profile' }">
                <span class="py-2 hover:scale-125 tooltip" data-tip="Update Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clip-rule="evenodd" />
                  </svg></span>
              </router-link> -->
            </div>
            <div class="flex justify-center flex-col">
              <p class="text-base-content text-sm font-medium text-center link link-primary" v-if="kepalajurusan">
                Kepala Jurusan : {{ jurusan?.nama }}
              </p>
              <p class="text-base-content text-sm font-medium text-center link link-primary" v-else>
                Guru
              </p>
              <span class="py-2 hover:scale-125 tooltip mx-auto" data-tip="Logout" @click="doLogout()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd" />
                </svg></span>
            </div>
          </div>
        </div>
      </div>
      <span class="py-2 "></span>
      <!-- Sidebar content here -->
      <li :class="[pagesActive == 'dashboard' ? pagesActiveClass : '']">
        <router-link :to="{ name: 'admin-dashboard' }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span class="ml-3">Dashboard </span>
        </router-link>
      </li>

      <span class="py-2 "></span>
      <label># Guru Pembimbing</label>
      <li :class="[pagesActive == 'tempatpkl' ? pagesActiveClass : '']">

        <router-link :to="{ name: 'admin-tempatpkl' }"> <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <span class="ml-3">Tempat PKL</span>
        </router-link>
      </li>
      <li :class="[pagesActive == 'siswa' ? pagesActiveClass : '']">
        <router-link :to="{ name: 'admin-siswa' }"> <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <span class="ml-3">Siswa</span>
        </router-link>
      </li>
      <span class="py-2 "></span>

      <div v-if="penilai">
        <label># Guru Penilai</label>
        <li :class="[pagesActive == 'penilai-tempatpkl' ? pagesActiveClass : '']">

          <router-link :to="{ name: 'admin-penilai-tempatpkl' }"> <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <span class="ml-3">Tempat PKL</span>
          </router-link>
        </li>
        <li :class="[pagesActive == 'penilai-siswa' ? pagesActiveClass : '']">
          <router-link :to="{ name: 'admin-penilai-siswa' }"> <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <span class="ml-3">Siswa</span>
          </router-link>
        </li>
        <span class="py-2 "></span>
      </div>
      <span v-if="kepalajurusan">

        <label># Kepala Jurusan</label>
        <li :class="[pagesActive == 'mastering-kelas' ? pagesActiveClass : '']">
          <router-link :to="{ name: 'kepalajurusan-kelas' }"> <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <span class="ml-3">Kelas</span>
          </router-link>
        </li>
        <li :class="[pagesActive == 'mastering-pembimbinglapangan' ? pagesActiveClass : '']">
          <router-link :to="{ name: 'kepalajurusan-pembimbinglapangan' }"> <svg xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <span class="ml-3">Mastering Pembimbing Lapangan</span>
          </router-link>
        </li>
        <li :class="[pagesActive == 'mastering-tempatpkl' ? pagesActiveClass : '']">
          <router-link :to="{ name: 'kepalajurusan-tempatpkl' }"> <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <span class="ml-3">Mastering Tempat PKL</span>
          </router-link>
        </li>
        <li :class="[pagesActive == 'administrator' ? pagesActiveClass : '']">
          <router-link :to="{ name: 'admin-pendaftaran-index' }">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <span class="ml-3">Pendaftaran PKL</span>
          </router-link>
        </li>
        <li :class="[pagesActive == 'penilaian-settings' ? pagesActiveClass : '']">

          <router-link :to="{ name: 'admin-penilaian-settings' }"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <span class="ml-3">Settings Penilaian</span>
          </router-link>
        </li>
      </span>
    </ul>
  </div>
</template>
