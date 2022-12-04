/* eslint-disable */
const prefix = "/pages/admin";
const prefixName = "admin-";

const AdminRoutes = [
  {
    path: `${prefix}/homeLayout`,
    name: "AdminLayout",
    component: () => import("@/layouts/AdminLayout.vue"),
    redirect: `${prefix}/home`,
    meta: {
      requireAuth: true,
      title: "Admin",
      icon: "mdi-home",
      breadcrumb: {
        name: "Home",
        path: "/pages/admin/home",
        goto: "AdminLayout",
      },
    },
    children: [
      {
        path: `${prefix}/home`,
        name: `${prefixName}dashboard`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Beranda",
            path: `${prefix}/home`,
            goto: `${prefixName}dashboard`,
          },
        },
        component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
      },
      {
        path: `${prefix}/tempatpkl`,
        name: `${prefixName}tempatpkl`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Tempat PKL",
            path: `${prefix}/tempatpkl`,
            goto: `${prefixName}tempatpkl`,
          },
        },
        component: () => import("@/views/admin/tempatpkl/TempatpklIndex.vue"),
      },
      {
        path: `${prefix}/siswa`,
        name: `${prefixName}siswa`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Tempat PKL",
            path: `${prefix}/siswa`,
            goto: `${prefixName}siswa`,
          },
        },
        component: () => import("@/views/admin/siswa/SiswaIndex.vue"),
      },
      {
        path: `${prefix}/penilaian/settings`,
        name: `${prefixName}penilaian-settings`,
        meta: {
          title: "Penilaian Settings",
          icon: "mdi-home",
          breadcrumb: {
            name: "Penilaian Settings",
            path: `${prefix}/penilaian/settings`,
            goto: `${prefixName}penilaian-settings`,
          },
        },
        redirect: `${prefix}/penilaian/settings/index`,
        component: () =>
          import(
            "@/views/admin/penilaian/settings/PenilaianSettingsLayout.vue"
          ),
        children: [
          {
            path: `${prefix}/penilaian/settings/index`,
            name: `${prefixName}penilaian-settings-index`,
            meta: {
              title: "Penilaian Settings",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/penilaian/settings/index`,
                goto: `${prefixName}penilaian-settings-index`,
              },
            },
            component: () =>
              import(
                "@/views/admin/penilaian/settings/PenilaianSettingsIndex.vue"
              ),
            children: [],
          },
          {
            path: `${prefix}/penilaian/settings/tambah`,
            name: `${prefixName}penilaian-settings-tambah`,
            meta: {
              title: "Penilaian Settings Tambah",
              icon: "mdi-home",
              breadcrumb: {
                name: "Tambah",
                path: `${prefix}/penilaian/settings/tambah`,
                goto: `${prefixName}penilaian-settings-tambah`,
              },
            },
            component: () =>
              import(
                "@/views/admin/penilaian/settings/PenilaianSettingsTambah.vue"
              ),
          },
          {
            path: `${prefix}/penilaian/settings/edit/:id`,
            name: `${prefixName}penilaian-settings-edit`,
            meta: {
              title: "Penilaian Settings Edit",
              icon: "mdi-home",
              breadcrumb: {
                name: " Edit",
                path: `${prefix}/penilaian/settings/edit`,
                goto: `${prefixName}penilaian-settings-edit`,
                params: {
                  id: "id",
                },
              },
            },
            component: () =>
              import(
                "@/views/admin/penilaian/settings/PenilaianSettingsEdit.vue"
              ),
          },
          {
            path: `${prefix}/penilaian/settings/:id/guru`,
            name: `${prefixName}penilaian-settings-guru`,
            component: () =>
              import(
                "@/views/admin/penilaian/settings/penilaian_guru/PenilaianGuruLayout.vue"
              ),
            meta: {
              title: "Penilaian Guru",
              icon: "mdi-home",
              breadcrumb: {
                name: "Penilaian Guru",
                path: `${prefix}/penilaian/settings/:id?/guru`,
                goto: `${prefixName}penilaian-settings-guru-index`,
                params: {
                  id: `:id`,
                },
              },
            },
            redirect: `${prefix}/penilaian/settings/:id/guru/index`,
            children: [
              {
                path: `${prefix}/penilaian/settings/:id/guru/index`,
                name: `${prefixName}penilaian-settings-guru-index`,
                meta: {
                  title: "Penilaian Settings guru",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "Index",
                    path: `${prefix}/penilaian/settings/:id/guru/index`,
                    goto: `${prefixName}penilaian-settings-guru-index`,
                    params: {
                      id: `id`,
                    },
                  },
                },
                component: () =>
                  import(
                    "@/views/admin/penilaian/settings/penilaian_guru/PenilaianGuruIndex.vue"
                  ),
              },
              {
                path: `${prefix}/penilaian/settings/:id/guru/tambah`,
                name: `${prefixName}penilaian-settings-guru-tambah`,
                meta: {
                  title: "Penilaian Settings guru",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "tambah",
                    path: `${prefix}/penilaian/settings/:id/guru/tambah`,
                    goto: `${prefixName}penilaian-settings-guru-tambah`,
                    params: {
                      id: `id`,
                    },
                  },
                },
                component: () =>
                  import(
                    "@/views/admin/penilaian/settings/penilaian_guru/PenilaianGuruTambah.vue"
                  ),
              },
            ],
          },

          {
            path: `${prefix}/penilaian/settings/:id/pembimbinglapangan`,
            name: `${prefixName}penilaian-settings-pembimbinglapangan`,
            component: () =>
              import(
                "@/views/admin/penilaian/settings/penilaian_pembimbinglapangan/PenilaianPembimbinglapanganLayout.vue"
              ),
            meta: {
              title: "Penilaian pembimbinglapangan",
              icon: "mdi-home",
              breadcrumb: {
                name: "Penilaian pembimbinglapangan",
                path: `${prefix}/penilaian/settings/:id?/pembimbinglapangan`,
                goto: `${prefixName}penilaian-settings-pembimbinglapangan-index`,
                params: {
                  id: `:id`,
                },
              },
            },
            redirect: `${prefix}/penilaian/settings/:id/pembimbinglapangan/index`,
            children: [
              {
                path: `${prefix}/penilaian/settings/:id/pembimbinglapangan/index`,
                name: `${prefixName}penilaian-settings-pembimbinglapangan-index`,
                meta: {
                  title: "Penilaian Settings pembimbinglapangan",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "Index",
                    path: `${prefix}/penilaian/settings/:id/pembimbinglapangan/index`,
                    goto: `${prefixName}penilaian-settings-pembimbinglapangan-index`,
                    params: {
                      id: `id`,
                    },
                  },
                },
                component: () =>
                  import(
                    "@/views/admin/penilaian/settings/penilaian_pembimbinglapangan/PenilaianPembimbinglapanganIndex.vue"
                  ),
              },
              {
                path: `${prefix}/penilaian/settings/:id/pembimbinglapangan/tambah`,
                name: `${prefixName}penilaian-settings-pembimbinglapangan-tambah`,
                meta: {
                  title: "Penilaian Settings pembimbinglapangan",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "tambah",
                    path: `${prefix}/penilaian/settings/:id/pembimbinglapangan/tambah`,
                    goto: `${prefixName}penilaian-settings-pembimbinglapangan-tambah`,
                    params: {
                      id: `id`,
                    },
                  },
                },
                component: () =>
                  import(
                    "@/views/admin/penilaian/settings/penilaian_pembimbinglapangan/PenilaianPembimbinglapanganTambah.vue"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
];
export default AdminRoutes;
