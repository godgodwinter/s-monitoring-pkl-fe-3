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
                name: "Penilaian Settings",
                path: `${prefix}/penilaian/settings/index`,
                goto: `${prefixName}penilaian-settings-index`,
              },
            },
            component: () =>
              import(
                "@/views/admin/penilaian/settings/PenilaianSettingsIndex.vue"
              ),
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
        ],
      },
    ],
  },
];
export default AdminRoutes;
