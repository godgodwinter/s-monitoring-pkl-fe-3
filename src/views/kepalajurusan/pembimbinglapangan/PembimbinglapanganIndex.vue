<script setup>
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios.js";
import Toast from "@/components/lib/Toast.js";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
import Button from "@/components/atoms/ButtonFour.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("mastering-pembimbinglapangan");
const router = useRouter();
const route = useRoute();
const data = ref("");
const dataDetail = ref({
    nama: "",
});
let dataId = null;
const dataTemp = ref({});
function resetForm() {
    dataDetail.value = {
        nama: "",
    };
    dataId = null;
    dataTemp.value.agama = null;
    dataTemp.value.jk = null;
}
let dataAgama = [
    { label: "Islam" },
    { label: "Protestan" },
    { label: "Katolik" },
    { label: "Hindu" },
    { label: "Buddha" },
    { label: "Khonghucu" },
];
let dataJk = [{ label: "Laki-laki" }, { label: "Perempuan" }];
// function Form and Validation
const getData = async () => {
    try {
        const response = await Api.get("admin/pembimbinglapangan");
        // console.log(response);
        data.value = response.data;
        return response;
    } catch (error) {
        Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
        console.error(error);
    }
};

getData();

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
        label: "Nama",
        field: "nama",
        type: "String",
    },
    {
        label: "Tempat PKL",
        field: "tempatpkl_nama",
        type: "String",
    },
    {
        label: "Status Akun", //aktif / nonaktif / disabled (telah lulus/keluar/dll)
        field: "status_login",
        type: "String",
    },
];

const getDataId = async () => {
    try {
        const response = await Api.get(`admin/pembimbinglapangan/${dataId}`);
        dataDetail.value = response.data;
        dataTemp.value.agama = { label: dataDetail.value.agama };
        dataTemp.value.jk = { label: dataDetail.value.jk };
        // console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};

const doDeleteData = async (id) => {
    if (confirm("Do you really want to delete?")) {
        try {
            const response = await Api.delete(`admin/pembimbinglapangan/${id}`);

            Toast.success("Success", "Data Berhasil dihapus!");
            getData();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};
// validasi
function validateData(value) {
    if (!value) {
        return "This field is required";
    }
    if (value.length < 1) {
        return "This Field must be at least 2 characters";
    }
    return true;
}
function onSubmit() {
    let err = 0;
    if (dataTemp.value.agama == null) {
        Toast.danger("Warning", "Agama tidak boleh kosong");
        err++;
    } else {
        if (dataTemp.value.agama.label == null) {
            Toast.danger("Warning", "Agama tidak boleh kosong");
            err++;
        }
    }
    if (dataTemp.value.jk == null) {
        Toast.danger("Warning", "Jenis kelamin tidak boleh kosong");
        err++;
    } else {
        if (dataTemp.value.jk.label == null) {
            Toast.danger("Warning", "Jenis kelamin tidak boleh kosong");
            err++;
        }
    }

    if (err < 1) {
        data.value = null;
        dataDetail.value.agama = dataTemp.value.agama.label;
        dataDetail.value.jk = dataTemp.value.jk.label;
        const res = doStoreData(dataDetail.value);
        getData();
        // console.log("tes");
        resetForm();
    }
}
const doEditData = async (id) => {
    dataId = id;
    getDataId();
};

const doStoreData = async (d) => {
    // console.log(data);
    try {
        if (dataId) {
            const response = await Api.put(`admin/pembimbinglapangan/${dataId}`, {
                nama: d.nama,
                nomeridentitas: d.nomeridentitas,
                agama: d.agama,
                tempatlahir: d.tempatlahir,
                tgllahir: d.tgllahir,
                alamat: d.alamat,
                jk: d.jk,
                telp: d.telp,
                // kelas_id: d.kelas_id,
            });

            Toast.success("Success", "Data Berhasil diupdate!");
            getData();
            return response.data;
        }
        const response = await Api.post("admin/pembimbinglapangan/store", {
            nama: d.nama,
            nomeridentitas: d.nomeridentitas,
            agama: d.agama,
            tempatlahir: d.tempatlahir,
            tgllahir: d.tgllahir,
            alamat: d.alamat,
            jk: d.jk,
            telp: d.telp,
            // kelas_id: d.kelas_id,
        });

        getData();
        Toast.success("Success", "Data Berhasil ditambahkan!");
        return response.data;
    } catch (error) {
        Toast.danger("Warning", "Data gagal ditambahkan!");
        console.error(error);
    }
};

const file = ref(null);
let formData = new FormData();
const doStoreDataImport = async (d) => {
    // console.log(data);
    try {
        Toast.babeng("Info", "Upload sedang diproses");
        // const response = await Api.post("testing/apiprobk/upload", formData);
        const response = await Api.post(`admin/proses/import/pembimbinglapangan`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        Toast.babeng("Info", "Proses Upload berhasil!");
        // console.log(response.data);
        // Toast.success("Success", "Data Berhasil ditambahkan!");
        getData();
        return response.data;
    } catch (error) {
        // Toast.danger("Warning", "Data gagal ditambahkan!");
        console.error(error);
    }
};
const doSubmitFile = async () => {
    formData.append("file", file.value.files[0]);
    doStoreDataImport();
};
</script>
<template>
    <BreadCrumb />
    <div class="pt-4 px-10">
        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Pembimbing Lapangan</span>
    </div>
    <div class="p-4">
        <div class="space-x-1 space-y-1 pt-1 md:pt-0">
            <!-- <label for="modalImport"
                class="btn modal-button btn-info hover:shadow-lg shadow text-white hover:text-gray-100 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Import
            </label> -->
            <!-- <button class="btn btn-info hover:shadow-lg shadow text-white hover:text-gray-100 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Export
      </button> -->
        </div>
    </div>

    <div class="pt-6 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-7/12">
            <div v-if="data">
                <vue-good-table :columns="columns" :rows="data" :line-numbers="true" :search-options="{
    enabled: true,
}" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                    <template #table-row="props">
                        <span v-if="props.column.field == 'actions'">
                            <div class="text-sm font-medium text-center flex justify-center">
                                <ButtonEdit @click="doEditData(props.row.id)" />
                                <ButtonDelete @click="doDeleteData(props.row.id)" />
                                <!-- <button
                                    class="text-orange-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-orange-300 bg-orange-400 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button> -->

                                <!-- <router-link
                                    :to="{ name: 'admin-pembimbimbinglapangan-profile', params: { id: props.row.id } }">
                                    <button
                                        class="text-sky-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                </router-link> -->
                            </div>
                        </span>

                        <!-- <span v-else-if="props.column.field == 'no'">
                            <div class="text-center">{{ props.index + 1 }}</div>
                        </span> -->

                        <span v-else-if="props.column.field == 'status_login'">
                            <div class="text-center" v-if="props.row.status_login == 'Aktif'">
                                <span class="text-green-500">Aktif</span>
                                <!-- <div class="text-center" v-if="props.row.password">
                  <span class="text-green-500">Aktif</span>
                </div>
                <div class="text-center" v-else>
                  <span class="text-yellow-500">Belum Aktif</span>
                </div> -->
                            </div>
                            <div class="text-center" v-else>
                                <span class="text-yellow-500">Disabled</span>
                            </div>
                        </span>

                        <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>

        <div class="wfull lg:w-4/12 mx-4">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <button
                    class="text-base font-normal text-gray-800 hover:text-gray-400 hover:bg-gray-100 bg-gray-300 border-2 px-2 py-2 rounded-md mb-2"
                    @click="resetForm()" v-if="dataDetail.nama">
                    Reset
                </button>
                <Form v-slot="{ errors }" @submit="onSubmit" v-if="data">
                    <div class="pt-0 px-0">
                        <div class="w-full mx-0">
                            <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                                <div class="grid grid-cols-1 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name"
                                            class="text-sm font-medium text-gray-900 block mb-2">Nama</label>
                                        <Field v-model="dataDetail.nama" :rules="validateData" type="text" name="nama"
                                            ref="nama"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            required />
                                        <div class="text-xs text-red-600 mt-1">{{ errors.nama }}</div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nomer
                                            Identitas</label>
                                        <Field v-model="dataDetail.nomeridentitas" :rules="validateData" type="text"
                                            name="nomeridentitas" ref="nomeridentitas"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            required />
                                        <div class="text-xs text-red-600 mt-1">
                                            {{ errors.nomeridentitas }}
                                        </div>
                                    </div>
                                </div>


                                <div class="grid grid-cols-1 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name"
                                            class="text-sm font-medium text-gray-900 block mb-2">Agama</label>

                                        <v-select :options="dataAgama" v-model="dataTemp.agama"></v-select>
                                        <div class="text-xs text-red-600 mt-1">{{ errors.agama }}</div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tempat
                                            Lahir</label>
                                        <Field v-model="dataDetail.tempatlahir" :rules="validateData" type="text"
                                            name="tempatlahir" ref="tempatlahir"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            required />
                                        <div class="text-xs text-red-600 mt-1">{{ errors.tempatlahir }}</div>
                                    </div>
                                </div>

                                <!-- <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tanggal Lahir</label>
                    <Field v-model="dataDetail.tgllahir" :rules="validateData" type="text" name="tgllahir"
                      ref="tgllahir"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.tgllahir }}</div>
                  </div>
                </div> -->

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tanggal
                                            Lahir</label>
                                        <Datepicker v-model="dataDetail.tgllahir" format="yyyy/MM/dd"
                                            value-format="yyyy-MM-dd" :rules="validateData" required>
                                            <template #calendar-header="{ index, day }">
                                                <div :class="index === 5 || index === 6 ? 'red-color' : ''">
                                                    {{ day }}
                                                </div>
                                            </template>
                                        </Datepicker>

                                        <div class="text-xs text-red-600 mt-1">{{ errors.tgllahir }}</div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Alamat
                                            Lengkap</label>
                                        <Field v-model="dataDetail.alamat" :rules="validateData" type="text"
                                            name="alamat" ref="alamat"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            required />
                                        <div class="text-xs text-red-600 mt-1">{{ errors.alamat }}</div>
                                    </div>
                                </div>


                                <div class="grid grid-cols-1 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Jenis
                                            Kelamin</label>
                                        <v-select :options="dataJk" v-model="dataTemp.jk"></v-select>
                                        <div class="text-xs text-red-600 mt-1">{{ errors.jk }}</div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">No
                                            Telp</label>
                                        <Field v-model="dataDetail.telp" :rules="validateData" type="text" name="telp"
                                            ref="telp"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            required />
                                        <div class="text-xs text-red-600 mt-1">{{ errors.telp }}</div>
                                    </div>
                                </div>
                                <div class="w-full flex justify-end mt-4">
                                    <Button title="Simpan" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="modalImport" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <label for="modalImport" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="font-bold text-lg">Import data menggunakan .xlx / .xlxs !</h3>
            <div class="py-4">
                <input type="file" ref="file" />
                <button class="btn btn-info text-gray-100" @click="doSubmitFile()">
                    Upload
                </button>
            </div>
            <div class="modal-action">
                <!-- <label for="modalImport" class="btn">Done!</label> -->
            </div>
        </div>
    </div>
</template>
