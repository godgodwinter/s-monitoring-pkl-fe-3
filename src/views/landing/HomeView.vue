<script setup>
/* eslint-disable */
import { ref } from "vue";
import API from "@/services/authServices";
import { useRouter } from "vue-router";
const router = useRouter();
const username = ref("");
const password = ref("");
const onSubmit = async () => {
    // console.log(username.value, password.value);
    const res = await API.doLogin(username.value, password.value);
    if (res === true) {
        router.push({ name: "AdminLayout" });
        // console.log("Login Berhasil");
    }
};
</script>
<template>
    <div class=" w-full flex justify-center">
        <div class="space-x-2 py-10 px-4 ">
            <button class="btn btn-sm btn-secondary">Menu Siswa</button>
            <button class="btn btn-sm btn-secondary">Menu Pembimbing Lapangan</button>
            <button class="btn btn-sm btn-secondary">Menu Admin</button>
        </div>
    </div>
    <div class="hero h-96 bg-base-100">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Login </h1>
                <p class="py-6">Masuk Sebagai Guru.</p>
            </div>
            <div class="cards w-full max-w-sm shadow-2xl bg-base-100 ">
                <div class="card-body  flex justify-center ">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email / Username</span>
                        </label>
                        <input v-model="username" name="username" type="text" placeholder="email"
                            class="input input-bordered input-secondary" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input v-model="password" name="password" type="password" placeholder="password"
                            class="input input-bordered input-secondary" />

                    </div>
                    <div class="form-control mt-6">
                        <button class="btn btn-primary" @click="onSubmit()">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
