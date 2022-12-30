<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import { useStoreAdmin } from "@/stores/admin";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("penilai-siswa");
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const dataSiswa = ref([]);
const dataAsli = ref([]);
const tempatpkl = ref([]);
const anggota = ref([]);
const pembimbinglapangan = ref([]);
const pembimbingsekolah = ref([]);
const status = ref([]);

const getDataId = async () => {
    try {
        const response = await Api.get(`guru/datasiswa/profile/${id}`);
        // console.log(response.data);
        dataSiswa.value = response.data.siswa;
        tempatpkl.value = response.data.tempatpkl;
        anggota.value = response.data.anggota;
        status.value = response.data.status;
        dataAsli.value = response.data;
        // console.log(dataSiswa.value, tempatpkl.value, anggota.value, status.value);
        // dataDetail.value.siswa.label = ` ${dataAsli.value.nama} `;
        // dataSiswa.value.kelas = ` ${dataAsli.value.kelasdetail.kelas.tingkatan} ${dataAsli.value.kelasdetail.kelas.jurusan} ${dataAsli.value.kelasdetail.kelas.suffix} `;
        return response;
    } catch (error) {
        Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
        console.error(error);
    }
};
getDataId();
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
        console.log(response);

        return res;
    } catch (error) {
        console.error(error);
    }
};
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
const dataForm = ref({
    siswa_id: id,
    tanggal: null,
    absensiStatus: null,
    absensiCatatan: null,
    jurnalStatus: null,
    jurnalCatatan: null
});

const doBeriNilai = async (id) => {
    router.push({
        name: "admin-penilai-siswadetail-index",
        params: { id: id },
    });
};
</script>
<template>
    <BreadCrumb />

    <article class="prose w-full lg:w-2/3">
        <span class="">
            <h4>Proses Penilaian Absensi dan Jurnal Siswa </h4>
            <!-- <button @click="doCetak(id)" class="btn btn-primary btn-sm"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
            </button> -->
        </span>
        <span v-if="dataSiswa">
            <p>Nama : {{ dataSiswa.nama }}</p>
            <p>Kelas : {{ dataSiswa.kelas_nama }}</p>
            <p>Nomer Induk : {{ dataSiswa.nomeridentitas }}</p>
            <p>Tempat PKL : {{ tempatpkl.nama }}</p>
            <button class="btn btn-info" @click="doBeriNilai(id)">Beri Nilai</button>
        </span>
    </article>

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
                <div class="divider"></div>

                Catatan Absensi : {{ item.kehadiranCatatanPembimbing }}
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
                    <!-- <div class="w-full flex justify-end">
                        <button class="btn btn-sm btn-primary" @click="doJurnalKonfirmasi()">Konfirmasi</button>
                    </div> -->

                    <div class="divider"></div>
                    Catatan Jurnal : {{ item.jurnalCatatanPembimbing }}
                    <div>
                    </div>
                </div>
            </label>
        </label>
    </div>
</template>