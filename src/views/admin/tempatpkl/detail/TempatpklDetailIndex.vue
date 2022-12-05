<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const id = route.params.id;
</script>
<template>
    <BreadCrumb />
    TempatPKL Detail {{ id }}
</template>