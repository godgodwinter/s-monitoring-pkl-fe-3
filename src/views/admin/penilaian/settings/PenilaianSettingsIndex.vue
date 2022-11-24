<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
/* eslint-disable */
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("penilaian-settings");
</script>
<template>
    <BreadCrumb />
    <h4>Ini Setting Penilaian Index</h4>
</template>