<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios.js";
import Toast from "@/components/lib/Toast.js";
const router = useRouter();
const dataList = ref(null);
const getData = async () => {
    try {
        const response = await Api.get("kaprodi/pendaftaran/list/subsidebardata");
        dataList.value = response.data;
        return response;
    } catch (error) {
        Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
        console.error(error);
    }
};

getData();

const goTo = (name) => {
    getData();
    router.push({
        name
    })
}
</script>
<template>
    <div class="container mx-auto lg:mx-0 my-5 p-5">
        <div class="lg:flex no-wrap lg:-mx-2">
            <!-- Left Side -->
            <div class="w-full lg:w-3/12 lg:mx-2">
                <div>
                    <!-- Profile Card -->
                    <div class="bg-white p-3 border-t-4 border-green-400">
                        <div class="image overflow-hidden">
                            <img class="h-20 w-20 mx-auto" src="@/assets/img/flat/portfolio_2.png" alt="" />
                        </div>
                        <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-center pt-2">
                            Menu - menu pedaftaran Prakerin / PKL
                        </p>

                    </div>
                    <!-- End of profile card -->
                    <div class="my-4"></div>
                    <!-- Friends card -->
                    <div class="bg-white p-3 hover:shadow h-screen">
                        <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                            <span class="text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </span>
                            <span>Menu Utama</span>
                        </div>
                        <div class="grid grid-cols-2 xl:grid-cols-3">
                            <!-- <router-link :to="{ name: 'admin-pendaftaran-index' }"> -->
                            <!-- <button class="btn btn-info " @click="goTo('admin-pendaftaran-index')">Penempatan</button> -->
                            <span class="text-center py-2" @click="goTo('admin-pendaftaran-list-semuasiswa')">
                                <button class="btn btn-info btn-lg btn-circle">P</button><br>
                                Penempatan
                                Siswa</span>
                            <!-- </router-link> -->
                        </div>
                        <div class="divider"></div>
                        <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                            <span class="text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </span>

                            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-center pt-2">
                                Menu - menu pedaftaran Prakerin / PKL
                            </p>
                        </div>
                        <div class="grid grid-cols-2 xl:grid-cols-3 gap-4" v-if="dataList">
                            <!-- <router-link :to="{ name: 'admin-pendaftaran-list-semuasiswa' }" > -->
                            <span class="text-center py-2" @click="goTo('admin-pendaftaran-list-semuasiswa')">
                                <button class="btn btn-base-100 btn-lg btn-circle">{{ dataList.siswa }}</button><br>
                                Semua
                                Siswa</span>
                            <!-- </router-link> -->
                            <!-- <router-link :to="{ name: 'admin-pendaftaran-list-belumdaftar' }"> -->
                            <span class="text-center" @click="goTo('admin-pendaftaran-list-belumdaftar')">
                                <button class="btn btn-base-100 btn-lg btn-circle">{{
                                    dataList.belumdaftar
                                }}</button><br>
                                Belum
                                Daftar</span>
                            <!-- </router-link> -->
                            <span class="text-center" @click="goTo('admin-pendaftaran-list-pengajuan')">
                                <button class="btn btn-base-100 btn-lg btn-circle">{{ dataList.pengajuan }}</button><br>
                                Pengajuan</span>
                            <span class="text-center" @click="goTo('admin-pendaftaran-list-penempatan')">
                                <button class="btn btn-base-100 btn-lg btn-circle">{{
                                    dataList.penempatan
                                }}</button><br>
                                Penempatan</span>
                            <span class="text-center" @click="goTo('admin-pendaftaran-list-pemberkasan')">
                                <button class="btn btn-base-100 btn-lg btn-circle">{{
                                    dataList.pemberkasan
                                }}</button><br>
                                Pemberkasan</span>
                            <span class="text-center" @click="goTo('admin-pendaftaran-list-persetujuan')">
                                <button class="btn btn-base-100 btn-lg btn-circle">{{
                                    dataList.persetujuan
                                }}</button><br>
                                Persetujuan</span>
                            <span class="text-center" @click="goTo('admin-pendaftaran-list-disetujui')">
                                <button class="btn btn-base-100 btn-lg btn-circle">{{ dataList.disetujui }}</button><br>
                                Disetujui</span>
                            <!-- </router-link> -->
                        </div>
                        <!-- <MenuInformasiPendaftaranPkl></MenuInformasiPendaftaranPkl> -->
                        <ul
                            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li class="flex items-center py-3">
                                <span>Menu Refresh Data Sidebar</span>
                                <span class="ml-auto">
                                    <div class="flex justify-center">
                                        <button data-tip="Tombol Refresh Data" class="tooltip" @click="getData()">
                                            <div class="form-check form-switch">
                                                <button
                                                    class="bg-emerald-600 py-2 px-2 rounded-full text-gray-100 text-xs font-bold">
                                                    Refresh
                                                </button>
                                            </div>
                                        </button>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <!-- End of Data Statistik card -->
                </div>
            </div>
            <!-- Right Side -->
            <div class="w-full lg:w-9/12 mx-2 h-64 pt-10 lg:pt-0">
                <router-view />
            </div>
        </div>
    </div>

</template>