<script setup>
import { ref } from "vue";
import Api from "@/axios/axios";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import ButtonEdit from "@/components/Button/ButtonEdit.vue";
import ButtonDelete from "@/components/Button/ButtonDel.vue";
import Fungsi from "@/components/lib/FungsiCampur";
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("penilaian-settings");
const router = useRouter();
const route = useRoute();
const numberPattern = /\d+/g;
const dataDetail = ref({});
const dataForm = ref({});
const id = route.params.id;

const onSubmit = async (values) => {
    // console.log(values);
    let dataStore = {
        penilaian_guru: dataDetail.value.penilaian_guru,
        penilaian_pembimbinglapangan: dataDetail.value.penilaian_pembimbinglapangan,
        absensi: dataDetail.value.absensi,
        jurnal: dataDetail.value.jurnal,
    };
    // console.log(dataForm);
    try {
        const response = await Api.post(`guru/penilaian`, dataStore);
        console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({ name: "admin-penilaian-settings" });

        return true;
    } catch (error) {
        console.error(error);
    }
};
</script>
<template>
    <BreadCrumb />
    <div>
        <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="py-2 lg:py-4 px-4">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penilaian Guru</label>
                        <Field v-model="dataDetail.penilaian_guru" :rules="fnValidasi.validateDataSkor" type="text"
                            name="penilaian_guru" ref="penilaian_guru" class="input input-bordered md:w-full max-w-2xl"
                            required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.penilaian_guru }}
                        </div>
                    </div>

                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penilaian Pembimbing
                            lapangan</label>
                        <Field v-model="dataDetail.penilaian_pembimbinglapangan" :rules="fnValidasi.validateDataSkor"
                            type="text" name="penilaian_pembimbinglapangan" ref="penilaian_pembimbinglapangan"
                            class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.penilaian_pembimbinglapangan }}
                        </div>
                    </div>

                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penilaian Absensi</label>
                        <Field v-model="dataDetail.absensi" :rules="fnValidasi.validateDataSkor" type="text"
                            name="absensi" ref="absensi" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.absensi }}
                        </div>
                    </div>

                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penilaian Jurnal</label>
                        <Field v-model="dataDetail.jurnal" :rules="fnValidasi.validateDataSkor" type="text"
                            name="jurnal" ref="jurnal" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.jurnal }}
                        </div>
                    </div>

                </div>
            </div>

            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <span class="btn btn-secondary">Batal</span> -->
                <button class="btn btn-primary">Simpan</button>
            </div>
        </Form>
    </div>
</template>