<script setup>
import { ref, computed } from "vue";
import { Field, Form } from "vee-validate";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios.js";
import Toast from "@/components/lib/Toast.js";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import Button from "@/components/atoms/ButtonFour.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import { useStoreAdminAuth } from "@/stores/adminAuth";
import { useStoreAdmin } from "@/stores/admin";
const storeAdminAuth = useStoreAdminAuth();
const jurusan = computed(() => storeAdminAuth.jurusan);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("mastering-kelas");
const router = useRouter();
const route = useRoute();
const kelas_id = route.params.kelas_id;
const data = ref([]);
const dataDetail = ref({
    nama: "",
});
let dataId = null;
// function Form and Validation
const getData = async () => {
    try {
        const response = await Api.get(`kaprodi/datakelas/nilai/${kelas_id}`);
        response.data.forEach(element => {
            // console.log(response.data, jurusan.value.id == element.jurusan);

            // console.log(jurusan.value.id, element)
            // if (jurusan.value.id == element.jurusan) {
            data.value.push(element);
            // }
        });
        // data.value = response.data;
        // return response;
    } catch (error) {
        Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
        console.error(error);
    }
};

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
        label: "Nilai Pembimbing Sekolah",
        field: "nilai_pembimbingsekolah",
        type: "String",
    },
    {
        label: "Nilai Pembimbing Lapangan",
        field: "nilai_pembimbinglapangan",
        type: "String",
    },
    {
        label: "Nilai Absensi",
        field: "nilai_absensi",
        type: "String",
    },
    {
        label: "Nilai Jurnal",
        field: "nilai_jurnal",
        type: "String",
    },
    {
        label: "Nilai Akhir",
        field: "nilai_akhir",
        type: "String",
    },
];

// setTimeout(() => {
//     if (jurusan.value.nama) {
getData();
//     }
// }, 2000)
const doHasil = async (id, index) => {
    router.push({
        name: "admin-siswa-hasil",
        params: { id: id },
    });
};
</script>
<template>
    <BreadCrumb>
        <template v-slot:content> Kelas
            <BreadCrumbSpace /> Index
        </template>
    </BreadCrumb>

    <div class="pt-4 px-10">
        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Detail Nilai</span>
    </div>

    <div class="pt-4 px-10">
        <button @click="router.go(-1)" class="btn btn-sm btn-secondary">Kembali</button>
    </div>

    <div class="pt-6 px-4 lg:flex flex-wrap gap-4">
        <div class="w-full lg:w-full">
            <div v-if="data">
                <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
                    enabled: true,
                }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                    <template #table-row="props">
                        <span v-if="props.column.field == 'actions'">
                            <div class="text-sm font-medium text-center flex justify-center">
                                <!-- <ButtonEdit @click="doEditData(props.row.id)" /> -->
                                <!-- <ButtonDelete @click="doDeleteData(props.row.id)" /> -->
                                <button
                                    class="tooltip  font-bold py-1 px-1 mr-2 flex items-center btn btn-success btn-sm"
                                    @click="doHasil(props.row.id, props.index)" data-tip="Detail">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>

                                </button>
                            </div>
                        </span>



                        <!-- <span v-else-if="props.column.field == 'nama'">
                            {{ props.row.tingkatan }} {{ props.row.jurusan_table ? props.row.jurusan_table.nama : "-" }}
                            {{
                                props.row.suffix
                            }}
                        </span> -->

                        <!-- <span v-else-if="props.column.field == 'tagihan'">
                            <button class="btn btn-sm btn-primary"
                                @click="doOpenFormTagihan(props.row.id)">Atur</button>
                        </span> -->

                        <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>

    </div>
</template>
