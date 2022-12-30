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
            <h4>Rekap Hasil PKL Siswa </h4>
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
</template>