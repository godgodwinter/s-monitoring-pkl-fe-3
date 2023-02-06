<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import { useStoreAdmin } from "@/stores/admin";
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("siswa");
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const dataId = null;
const dataSiswa = ref([]);
const dataAsli = ref([]);
const tempatpkl = ref([]);
const anggota = ref([]);
const pembimbinglapangan = ref([]);
const pembimbingsekolah = ref([]);
const status = ref('Disetujui');
// const dataDetail = ref({
//     siswa: { label: "-", id: id },
//     tempatpkl: { label: "-", id: id, tgl_pengajuan: "" },
//     pembimbinglapangan: { label: "-", id: id },
//     pembimbingsekolah: { label: "-", id: id },
// });
// const getDataId = async () => {
//     try {
//         const response = await Api.get(`pembimbinglapangan/datasiswa/profile/${id}`);
//         // console.log(response.data);
//         dataSiswa.value = response.data.siswa;
//         tempatpkl.value = response.data.tempatpkl;
//         anggota.value = response.data.anggota;
//         status.value = response.data.status;
//         dataAsli.value = response.data;
//         // console.log(dataSiswa.value, tempatpkl.value, anggota.value, status.value);
//         // dataDetail.value.siswa.label = ` ${dataAsli.value.nama} `;
//         // dataSiswa.value.kelas = ` ${dataAsli.value.kelasdetail.kelas.tingkatan} ${dataAsli.value.kelasdetail.kelas.jurusan} ${dataAsli.value.kelasdetail.kelas.suffix} `;
//         return response;
//     } catch (error) {
//         Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
//         console.error(error);
//     }
// };
// getDataId();

const data = ref(null)
const getData = async (blnthn) => {
    let date = '';
    if (blnthn) {
        date = `?blnthn=${blnthn}`;
    }
    // console.log(data);
    try {
        const response = await Api.get(`admin/pkl/absen/siswa/${id}${date}`);
        // data.value = response.data;
        let res = response.data;
        // storeDataProfile.setData(res);
        // console.log(response);

        return res;
    } catch (error) {
        console.error(error);
    }
};
// getData();


const formatter = new Intl.DateTimeFormat("id", { month: "long" });
let dt = new Date();
let dateNow = dt.getDate();
let month = dt.getMonth();
let year = dt.getFullYear();
let monthLong = formatter.format(new Date(year, month));

const dataDetail = ref({
    monthyear: {
        month: month,
        year: year,
    },
});
const onChangeMonth = async () => {
    let month = "01";
    if (parseInt(dataDetail.value.monthyear.month) < 10) {
        month = "0" + (parseInt(dataDetail.value.monthyear.month) + 1);
    } else {
        month = (parseInt(dataDetail.value.monthyear.month) + 1);
    }
    let dateTerpilih = dataDetail.value.monthyear.year + "-" + month;
    // console.log('====================================');
    // console.log(dateTerpilih);
    // console.log('====================================');
    let res = await getDataAbsensi(dateTerpilih);
    // console.log("====================================");
    // console.log(dataDetail.value.monthyear);
    // console.log("====================================");
};

const getDataAbsensi = async (blnthn) => {
    // console.log(blnthn);
    data.value = await getData(blnthn);
    // console.log(dataAbsensi.value);
    // console.log("get Data absensi");
};
getDataAbsensi();

const formCatatanKehadiran = ref(false);
const formCatatanJurnal = ref(false);

const dataForm = ref({
    siswa_id: id,
    tanggal: null,
    absensiStatus: null,
    absensiCatatan: null,
    jurnalStatus: null,
    jurnalCatatan: null
});

// const doSubmitKonfirmasiAbsensi = async (absensi_id) => {
//     let dataFormInput = {
//         status: dataForm.value.absensiStatus,
//         catatan_pembimbing: dataForm.value.absensiCatatan,
//     };
//     // console.log(dataForm);
//     try {
//         const response = await Api.post(`admin/pkl/absen/konfirmasi/${absensi_id}`, dataFormInput);
//         // console.log(response);
//         // data.id = response.id;
//         Toast.success("Info", "Data berhasil ditambahkan!");
//         // router.push({ name: "admin-penilaian-settings" });
//         getDataAbsensi();
//         dataForm.value.absensiStatus = 'Disetujui';
//         dataForm.value.absensiCatatan = null;
//         return true;
//     } catch (error) {
//         console.error(error);
//     }
// }


// const doSubmitKonfirmasiJurnal = async (jurnal_id) => {
//     let dataFormInput = {
//         status: dataForm.value.jurnalStatus,
//         catatan_pembimbing: dataForm.value.jurnalCatatan,
//     };
//     // console.log(dataForm);
//     try {
//         const response = await Api.post(`admin/pkl/jurnal/konfirmasi/${jurnal_id}`, dataFormInput);
//         // console.log(response);
//         // data.id = response.id;
//         Toast.success("Info", "Data berhasil ditambahkan!");
//         // router.push({ name: "admin-penilaian-settings" });
//         getDataAbsensi();
//         dataForm.value.jurnalStatus = 'Disetujui';
//         dataForm.value.jurnalCatatan = null;
//         return true;
//     } catch (error) {
//         console.error(error);
//     }
// }
</script>
<template>
    <BreadCrumb />

    <div class="py-4">
        <span class="text-lg sm:text-lg leading-none font-bold text-gray-700 shadow-sm">Absensi dan Jurnal</span>
    </div>

    <div>
        <div class="py-2 flex gap-2">
            <Datepicker format="yyyy/MM" value-format="yyyy-MM" v-model="dataDetail.monthyear" monthPicker required>
                <template #calendar-header="{ index, day }">
                    <div :class="index === 5 || index === 6 ? 'red-color' : ''">
                        {{ day }}
                    </div>
                </template>
            </Datepicker>
            <button class="btn btn-primary" @click="onChangeMonth">
                PILIH
            </button>
        </div>
    </div>
    <!-- {{ data }} -->
    <div v-if="status === 'Disetujui'">
        <div class="overflow-x-auto">
            <table class="table table-compact w-full ">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tanggal</th>
                        <th>Hari</th>
                        <th>Kehadiran</th>
                        <th>Jurnal</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in data" :key="item.id"
                        :class="{ 'text-red-500': moment(item.tanggal).format('dddd').substring(0, 10) == 'Minggu' || moment(item.tanggal).format('dddd').substring(0, 10) == 'Sabtu' }">
                        <th>{{ index + 1 }}</th>
                        <td>{{ moment(item.tanggal).format('DD MMMM YYYY') }}</td>
                        <td>{{ moment(item.tanggal).format('dddd').substring(0, 10) }}</td>
                        <td> <label :for="item.id" class="shadow border-2 rounded-lg font-medium text-sm capitalize">
                                {{ item.kehadiran }} -
                                {{ item.kehadiranStatus }}
                                <!-- {{ item }} -->
                            </label></td>
                        <td> <label :for="'jurnal-' + item.id"
                                class="shadow border-2 rounded-lg font-medium text-sm capitalize">
                                {{ item.jurnal }} - {{ item.jurnalStatus }}</label></td>
                        <td> {{ item.kehadiranStatus }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Tanggal</th>
                        <th>Hari</th>
                        <th>Kehadiran</th>
                        <th>Jurnal</th>
                        <th>Status</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>


    <div v-else>
        Absensi tidak tersedia hubungi admin!
    </div>


    <div v-for="(item, index) in data" :key="data.id">
        <!-- Put this part before </body> tag -->
        <input type="checkbox" :id="item.id" class="modal-toggle" />
        <label :for="item.id" class="modal cursor-pointer">
            <label class="modal-box relative" for="">
                <h3 class="text-lg font-bold">
                    CATATAN : "{{ item.kehadiranStatus }}"
                    <a :href="item.kehadiranBukti" target="_blank" v-if="
                        item.kehadiran != 'Hadir' && item.kehadiran != null
                    ">
                        <span class="btn btn-primary">Download </span></a>
                </h3>
                <p class="py-4">
                    {{ item.kehadiranCatatan }}
                </p>
                <div v-if="item.kehadiran" class="space-y-2">
                    <!-- <div class="w-full flex justify-end">
                        <button class="btn btn-sm btn-primary" @click="doAbsensiKonfirmasi()">Konfirmasi</button>
                    </div> -->
                    <div class="divider"></div>

                    Catatan Absensi : {{ item.kehadiranCatatanPembimbing }}
                    <!-- <div class="divider"></div>
                    => "{{
                        dataForm.absensiStatus ? dataForm.absensiStatus :
                            "Disetujui"
                    }}"
                    <div class="divider"></div>
                    <div class="py-1 flex space-x-2">
                        <button class="btn btn-sm btn-success"
                            @click="dataForm.absensiStatus = 'Disetujui'">Disetujui</button>
                        <button class="btn btn-sm btn-error"
                            @click="dataForm.absensiStatus = 'Ditolak'">Ditolak</button>
                    </div> -->
                    <!-- <div>
                        <input v-model="dataForm.absensiCatatan" type="text" name="absensiCatatan" ref="absensiCatatan"
                            class="input input-bordered md:w-full max-w-2xl" required />
                    </div>
                    <div class="w-full flex justify-end">
                        <button class="btn btn-sm btn-info"
                            @click="doSubmitKonfirmasiAbsensi(item.absensi_id)">Simpan</button>
                    </div> -->
                </div>
            </label>
        </label>

        <input type="checkbox" :id="'jurnal-' + item.id" class="modal-toggle" />
        <label :for="'jurnal-' + item.id" class="modal cursor-pointer">
            <label class="modal-box relative" for="">
                <h3 class="text-lg font-bold">
                    DETAIL JURNAL :
                    <a :href="item.jurnalFile" target="_blank" v-if="item.jurnalFile">
                        <span class="btn btn-primary">Download </span></a>
                </h3>
                <p class="py-4">
                    {{ item.jurnalCatatan }}
                </p>
                <div v-if="item.kehadiran" class="space-y-2">

                    <div class="divider"></div>
                    Catatan Jurnal : {{ item.jurnalCatatanPembimbing }}

                    <div class="divider"></div>
                    => "{{
    dataForm.jurnalStatus ? dataForm.jurnalStatus :
        "Disetujui"
                    }}"
                    <div class="divider"></div>

                    <!-- <div class="py-1 flex space-x-2">
                        <button class="btn btn-sm btn-success"
                            @click="dataForm.jurnalStatus = 'Disetujui'">Disetujui</button>
                        <button class="btn btn-sm btn-error" @click="dataForm.jurnalStatus = 'Ditolak'">Ditolak</button>
                    </div>
                    <div>
                        <input v-model="dataForm.jurnalCatatan" type="text" name="jurnalCatatan" ref="jurnalCatatan"
                            class="input input-bordered md:w-full max-w-2xl" required />
                    </div>
                    <div class="w-full flex justify-end">
                        <button class="btn btn-sm btn-info"
                            @click="doSubmitKonfirmasiJurnal(item.jurnal_id)">Simpan</button>
                    </div> -->
                </div>
            </label>
        </label>
    </div>
</template>

<!-- <style scoped>
tr:nth-child(even) {
    background-color: #ccc;
}

tr:nth-child(od) {
    background-color: #fff;
}
</style> -->