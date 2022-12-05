<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import { useStoreAdmin } from "@/stores/admin";
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("penilai-siswa");
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const absensi = ref(null);
const jurnal = ref(null);
const penilaian_guru = ref(null);
const siswa = ref(null);
const tempatpkl = ref(null);


const dataAsli = ref([]);
const data = ref([]);

const columns = [
    {
        label: "Actions",
        field: "actions",
        sortable: false,
        width: "50px",
        tdClass: "text-center",
        thClass: "text-center",
    },
    {
        label: "Nama ",
        field: "penilaian_nama",
        type: "String",
    },
    {
        label: "Nilai",
        field: "nilai",
        type: "number",
    },
];


const getData = async () => {
    try {
        const response = await Api.get(`guru/penilai/siswadetail/${id}`);
        dataAsli.value = response.data;
        data.value = response.data;
        penilaian_guru.value = data.value.penilaian_guru;
        absensi.value = data.value.absensi;
        jurnal.value = data.value.jurnal;
        siswa.value = data.value.siswa;
        tempatpkl.value = data.value.tempatpkl;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();


const formPenilaianGuru = ref(false);
const formAbsensi = ref(false);
const formJurnal = ref(false);

const doCetak = (id) => {
    Toast.warning("Info", "Menu belum tersedia");
};

const dataFormAbsensi = ref([]);
const onSubmitAbsensi = async (values) => {
    // console.log(values);
    let dataStore = {
        nilai: dataFormAbsensi.value.nilai,
    };
    // console.log(dataForm);
    try {
        const response = await Api.post(`guru/penilai/siswadetail/${id}/absensi`, dataStore);
        // console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        // router.push({ name: "admin-penilaian-settings" });
        // Toast.warning("Info", "Menu belum tersedia")
        getData();
        formAbsensi.value = false;
        return true;
    } catch (error) {
        console.error(error);
    }
};

const dataFormPenilaianGuru = ref([]);
const onSubmitPenilaianGuru = async (values) => {
    console.log(formPenilaianGuru.value);
    let dataStore = {
        nilai: dataFormPenilaianGuru.value.nilai,
        penilaian_guru_id: formPenilaianGuru.value.id,
    };
    // console.log(dataForm);
    try {
        const response = await Api.post(`guru/penilai/siswadetail/${id}/penilaian_guru`, dataStore);
        // console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        // router.push({ name: "admin-penilaian-settings" });
        // Toast.warning("Info", "Menu belum tersedia")
        getData();
        formPenilaianGuru.value = false;
        return true;
    } catch (error) {
        console.error(error);
    }
};

const dataFormJurnal = ref([]);
const onSubmitJurnal = async (values) => {
    // console.log(values);
    let dataStore = {
        nilai: dataFormJurnal.value.nilai,
    };
    // console.log(dataForm);
    try {
        const response = await Api.post(`guru/penilai/siswadetail/${id}/jurnal`, dataStore);
        // console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        // router.push({ name: "admin-penilaian-settings" });
        // Toast.warning("Info", "Menu belum tersedia")
        getData();
        formJurnal.value = false;
        return true;
    } catch (error) {
        console.error(error);
    }
};

const doLihatAbsensi = () => {
    Toast.warning("info", "Menu Belum tersedia");
}
const doLihatJurnal = () => {
    Toast.warning("info", "Menu Belum tersedia");
}
</script>
<template>
    <BreadCrumb />

    <article class="prose w-full lg:w-2/3">
        <span class="">
            <h4>Proses Penilaian Siswa</h4>
            <!-- <button @click="doCetak(id)" class="btn btn-primary btn-sm"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
            </button> -->
        </span>
        <span v-if="siswa">
            <p>Nama : {{ siswa.nama }}</p>
            <p>Kelas : {{ siswa.kelas_nama }}</p>
            <p>Nomer Induk : {{ siswa.nomeridentitas }}</p>
            <p>Tempat PKL : {{ tempatpkl.nama }}</p>
        </span>
    </article>

    <!-- Data Siswa Nilai {{ id }} -->

    <!-- nilai master guru -->
    <div v-if="penilaian_guru">
        <div class="lg:flex w-full">
            <div class="w-full lg:w-2/3">
                <vue-good-table :line-numbers="true" :columns="columns" :rows="penilaian_guru" :search-options="{
                    enabled: true,
                }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                    <template #table-actions>
                        <div class="space-x-1 space-y-1 gap-1" v-if="data.length < 1">
                            <!-- <router-link :to="{
                        name: 'admin-penilaian-settings-tambah',
                    }">
                        <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </router-link> -->
                        </div>
                    </template>
                    <template #table-row="props">
                        <span v-if="props.column.field == 'actions'">
                            <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                <!-- <ButtonEdit @click="doEditData(props.row.id, props.index)" /> -->
                                <label class="flex">
                                    <button
                                        @click="(formPenilaianGuru = { id: props.row.id, penilaian_nama: props.row.penilaian_nama })"
                                        class="tooltip btn btn-xs btn-success block rounded-md font-bold py-1 px-1 mr-2 flex items-center  rounded-lg"
                                        data-tip="Beri Nilai">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>


                                    </button>
                                    <!-- <ButtonEdit @click="doEditData(props.row.id, props.index)" /> -->
                                    <!-- <ButtonDelete @click="doDeleteData(props.row.id, props.index)" /> -->
                                </label>
                            </div>
                        </span>

                        <span v-else-if="props.column.field == 'nilai'">
                            <span v-if="props.row.nilai">{{ props.row.nilai }}</span>
                            <span v-else>Belum diisi</span>
                        </span>

                        <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                        </span>
                    </template>
                </vue-good-table>
            </div>
            <div class="w-full lg:w-1/3 px-2">
                <div>
                    <!-- Form Penilaian Guru -->

                    <div v-if="formPenilaianGuru">
                        <Form v-slot="{ errors }" @submit="onSubmitPenilaianGuru">
                            <div class="py-2 lg:py-4 px-4">
                                <div class="space-y-4">
                                    <div class="flex flex-col">
                                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nilai
                                            {{ formPenilaianGuru.penilaian_nama }}</label>
                                        <Field v-model="dataFormPenilaianGuru.nilai"
                                            :rules="fnValidasi.validateDataSkor" type="text" name="nilai" ref="nilai"
                                            class="input input-bordered md:w-full max-w-2xl" required />
                                        <div class="text-xs text-red-600 mt-1">
                                            {{ errors.nilai }}
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div class="w-full flex justify-end py-10 px-10 gap-4">
                                <!-- <span class="btn btn-secondary">Batal</span> -->
                                <button class="btn btn-primary">Simpan</button>
                                <span class="btn btn-danger" @click="(formPenilaianGuru = false)">Batal</span>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        Master Penilian belum diatur. Hubungi Kepala Jurusan.
    </div>
    <div class="py-4">
        <div class="lg:flex w-full">
            <article class="prose w-full lg:w-2/3">
                <h4>Absensi</h4>
                <p>
                    Nilai Absensi = {{ absensi ? absensi : "Belum diisi" }}
                </p>
                <div class="flex space-x-4">
                    <button class="btn btn-sm btn-primary" @click="doLihatAbsensi()"> Lihat Rekap Absensi</button>
                    <button class="btn btn-sm btn-success" @click="(formAbsensi = true)">Beri Nilai <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                </div>
            </article>
            <div class="w-full lg:w-1/3">
                <!-- Form Absensi -->
                <div v-if="formAbsensi">
                    <Form v-slot="{ errors }" @submit="onSubmitAbsensi">
                        <div class="py-2 lg:py-4 px-4">
                            <div class="space-y-4">
                                <div class="flex flex-col">
                                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nilai
                                        Absensi</label>
                                    <Field v-model="dataFormAbsensi.nilai" :rules="fnValidasi.validateDataSkor"
                                        type="text" name="nilai" ref="nilai"
                                        class="input input-bordered md:w-full max-w-2xl" required />
                                    <div class="text-xs text-red-600 mt-1">
                                        {{ errors.nilai }}
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="w-full flex justify-end py-10 px-10 gap-4">
                            <!-- <span class="btn btn-secondary">Batal</span> -->
                            <button class="btn btn-primary">Simpan</button>
                            <span class="btn btn-danger" @click="(formAbsensi = false)">Batal</span>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <div class="py-4">
        <div class="lg:flex w-full">
            <article class="prose w-full lg:w-2/3">
                <h4>Jurnal</h4>
                <p>
                    Nilai Jurnal = {{ jurnal ? jurnal : "Belum diisi" }}
                </p>
                <div class="flex space-x-4">
                    <button class="btn btn-sm btn-primary" @click="doLihatJurnal()">Lihat Rekap Jurnal</button>
                    <button class="btn btn-sm btn-success" @click="(formJurnal = true)">Beri Nilai <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                </div>
            </article>
            <div class="w-full lg:w-1/3">
                <!-- Form Jurnal -->

                <div v-if="formJurnal">
                    <Form v-slot="{ errors }" @submit="onSubmitJurnal">
                        <div class="py-2 lg:py-4 px-4">
                            <div class="space-y-4">
                                <div class="flex flex-col">
                                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nilai
                                        Jurnal</label>
                                    <Field v-model="dataFormJurnal.nilai" :rules="fnValidasi.validateDataSkor"
                                        type="text" name="nilai" ref="nilai"
                                        class="input input-bordered md:w-full max-w-2xl" required />
                                    <div class="text-xs text-red-600 mt-1">
                                        {{ errors.nilai }}
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="w-full flex justify-end py-10 px-10 gap-4">
                            <!-- <span class="btn btn-secondary">Batal</span> -->
                            <button class="btn btn-primary">Simpan</button>
                            <span class="btn btn-danger" @click="(formJurnal = false)">Batal</span>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>

</template>