<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
import ButtonEdit from "@/components/Button/ButtonEdit.vue";
import ButtonDelete from "@/components/Button/ButtonDel.vue";
import Toast from "@/components/lib/Toast";
import { useRouter } from "vue-router";
import Fungsi from "@/components/lib/FungsiCampur"
const router = useRouter();
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("penilai-siswa");
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
        label: "Nama Siswa",
        field: "nama",
        type: "String",
    },
    {
        label: "Tempat PKL",
        field: "tempatpkl_nama",
        type: "String",
    },
    {
        label: "Absensi",
        field: "absensi",
        type: "String",
    },
    {
        label: "Jurnal",
        field: "jurnal",
        type: "String",
    },
    {
        label: "Telp",
        field: "telp",
        type: "String",
    },
    {
        label: "Nilai Akhir",
        field: "nilai_akhir",
        type: "number",
    },
];

const dataAsli = ref([]);
const data = ref([]);
const getData = async () => {
    try {
        const response = await Api.get(`guru/dataku/penilai/siswa`);
        dataAsli.value = response.data;
        data.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();
const doEditData = async (id, index) => {
    Toast.warning("Info", "Menu belum tersedia")
    // console.log(id, index);
    // router.push({
    //     name: "admin-penilaian-settings-edit",
    //     params: { id: id },
    // });
};
const doPenilaian = async (id, index) => {
    router.push({
        name: "admin-penilai-siswadetail-index",
        params: { id: id },
    });
};
const doDetailData = async (id, index) => {
    router.push({
        name: "admin-siswadetail-index",
        params: { id: id },
    });
};
// const doDeleteData = async (id, index) => {
//     if (confirm("Apakah anda yakin menghapus data ini?")) {
//         try {
//             const response = await Api.delete(`guru/penilaian/${id}`);
//             // data.value.splice(index, 1);
//             Toast.success("Success", "Data Berhasil dihapus!");
//             getData();
//             // Toast.warning("Info", "Menu belum tersedia")
//             // return response.data;
//         } catch (error) {
//             console.error(error);
//         }
//     }
// };


const doPenilaianGuru = async (id, index) => {
    Toast.warning("Info", "Menu belum tersedia")
    console.log(id, index);
    // router.push({
    //     name: "admin-penilaian-settings-edit",
    //     params: { id: id },
    // });
};

const doPenilaianPembimbingLapangan = async (id, index) => {
    Toast.warning("Info", "Menu belum tersedia")
    console.log(id, index);
    // router.push({
    //     name: "admin-penilaian-settings-edit",
    //     params: { id: id },
    // });
};
</script>
<template>
    <BreadCrumb />
    <div>

        <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
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
                            <button @click="doDetailData(props.row.id, props.index)"
                                class="tooltip btn btn-xs btn-info block rounded-md font-bold py-1 px-1 mr-2 flex items-center  rounded-lg"
                                data-tip="Detail">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                </svg>

                            </button>
                            <button @click="doPenilaian(props.row.id, props.index)"
                                class="tooltip block rounded-md font-bold py-1 px-1 mr-2 flex items-center btn btn-warning btn-xs rounded-lg"
                                data-tip="Penilaian">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>


                            </button>
                            <!-- <ButtonEdit @click="doEditData(props.row.id, props.index)" /> -->
                            <!-- <ButtonDelete @click="doDeleteData(props.row.id, props.index)" /> -->
                        </label>
                    </div>
                </span>

                <span v-else-if="props.column.field == 'penilaian_guru'">
                    <button @click="doPenilaianGuru(props.row.id, props.index)"
                        class="tooltip text-sky-100 block rounded-md font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg"
                        data-tip="Detail">

                        {{ props.row.penilaian_guru }}

                    </button>

                </span>
                <span v-else-if="props.column.field == 'absensi'"> <button
                        class="tooltip text-sky-100 block rounded-md font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg"
                        data-tip="Detail">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>

                    </button>


                </span>
                <span v-else-if="props.column.field == 'jurnal'">
                    <button
                        class="tooltip text-sky-100 block rounded-md font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg"
                        data-tip="Detail">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                    </button>
                </span>
                <span v-else-if="props.column.field == 'penilaian'">
                    <button class="tooltip  font-bold py-1 px-1 mr-2 flex items-center btn btn-success btn-sm"
                        data-tip="Detail">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>

                    </button>
                </span>
                <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                </span>
            </template>
        </vue-good-table>
    </div>
    <!-- <div class="py-4">
        <article class="prose prose-sm lg:prose-sm">
            <h4>Catatan : </h4>
            <p>
                Setiap tahun pembelajaran satu jurusan hanya memiliki satu parrent penilaian.
            </p>
            <p>
                Jadi jika sudah diinput sekali maka tidak dapat di input lagi.
            </p>
        </article>
    </div> -->
</template>