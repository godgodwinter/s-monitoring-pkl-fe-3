<script setup>
/* eslint-disable */
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("dashboard");
</script>
<template>
    <BreadCrumb />
    <h4>Ini dashboard index</h4>
</template>