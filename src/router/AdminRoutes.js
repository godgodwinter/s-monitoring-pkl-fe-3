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
        path: `${prefix}/pengumuman/detail/:id`,
        name: `${prefixName}pengumuman-detail`,
        meta: {
          title: "Pengumuman",
          icon: "mdi-home",
          breadcrumb: {
            name: "Pengumuman",
            path: `${prefix}/pengumuman/detail/:id`,
            goto: `${prefixName}pengumuman-detail`,
          },
        },
        component: () => import("@/views/admin/dashboard/PengumumanDetail.vue"),
      },
      {
        path: `${prefix}/tempatpkl`,
        name: `${prefixName}tempatpkl`,
        meta: {
          title: "Tempat PKL",
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
        path: `${prefix}/tempatpkllayout`,
        name: `${prefixName}tempatpkllayout`,
        meta: {
          title: "Tempat PKL",
          icon: "mdi-home",
          breadcrumb: {
            name: "Tempat PKL",
            path: `${prefix}/siswa`,
            goto: `${prefixName}siswa`,
          },
        },
        component: () => import("@/views/admin/tempatpkl/Layout.vue"),
        redirect: `${prefix}/tempatpkl`,
        children: [
          {
            path: `${prefix}/tempatpkldetail/:id`,
            name: `${prefixName}tempatpkldetail-index`,
            meta: {
              title: "Detail",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail",
                path: `${prefix}/tempatpkldetail/:id`,
                goto: `${prefixName}tempatpkldetail-index`,
              },
            },
            component: () =>
              import("@/views/admin/tempatpkl/detail/TempatpklDetailIndex.vue"),
          },
        ],
      },
      {
        path: `${prefix}/siswa`,
        name: `${prefixName}siswa`,
        meta: {
          title: "Siswa",
          icon: "mdi-home",
          breadcrumb: {
            name: "Siswa",
            path: `${prefix}/siswa`,
            goto: `${prefixName}siswa`,
          },
        },
        component: () => import("@/views/admin/siswa/SiswaIndex.vue"),
      },
      {
        path: `${prefix}/siswalayout`,
        name: `${prefixName}siswalayout`,
        meta: {
          title: "Siswa",
          icon: "mdi-home",
          breadcrumb: {
            name: "Siswa",
            path: `${prefix}/siswa`,
            goto: `${prefixName}siswa`,
          },
        },
        component: () => import("@/views/admin/siswa/Layout.vue"),
        redirect: `${prefix}/siswa`,
        children: [
          {
            path: `${prefix}/siswadetail/:id`,
            name: `${prefixName}siswadetail-index`,
            meta: {
              title: "Profile",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail Nilai",
                path: `${prefix}/siswadetail/:id`,
                goto: `${prefixName}siswadetail-index`,
              },
            },
            component: () =>
              import("@/views/admin/siswa/detail/SiswaDetailIndex.vue"),
          },
          {
            path: `${prefix}/siswa/:id/hasil`,
            name: `${prefixName}siswa-hasil`,
            meta: {
              title: "Profile",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail Nilai",
                path: `${prefix}/siswa/:id/hasil`,
                goto: `${prefixName}siswa-hasil`,
              },
            },
            component: () =>
              import("@/views/penilai/siswa/SiswaHasil.vue"),
          },
          {
            path: `${prefix}/siswa/:id/absensi`,
            name: `${prefixName}siswa-absensi`,
            meta: {
              title: "Profile",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail Nilai",
                path: `${prefix}/siswa/:id/absensi`,
                goto: `${prefixName}siswa-absensi`,
              },
            },
            component: () =>
              import("@/views/penilai/siswa/SiswaAbsensi.vue"),
          },
        ],
      },

      //GURU KEPALA JURUSAN
      {
        path: `pages/kepalajurusan/kelas`,
        name: `kepalajurusan-kelas`,
        meta: {
          title: "Mastering Kelas",
          icon: "mdi-home",
          breadcrumb: {
            name: "Mastering Kelas",
            path: `pages/kepalajurusan/kelas`,
            goto: `kepalajurusan-kelas`,
          },
        },
        component: () =>
          import(
            "@/views/kepalajurusan/kelas/KelasIndex.vue"
          )
      },
      {
        path: `pages/kepalajurusan/kelas/nilai/:kelas_id`,
        name: `kepalajurusan-kelas-nilai`,
        meta: {
          title: "Nilai",
          icon: "mdi-home",
          breadcrumb: {
            name: "Nilai",
            path: `pages/kepalajurusan/kelas/nilai/:kelas_id`,
            goto: `kepalajurusan-kelas-nilai`,
          },
        },
        component: () =>
          import(
            "@/views/kepalajurusan/kelas/KelasNilai.vue"
          )
      },
      {
        path: `pages/kepalajurusan/pembimbinglapangan`,
        name: `kepalajurusan-pembimbinglapangan`,
        meta: {
          title: "Mastering Pembimbing Lapangan",
          icon: "mdi-home",
          breadcrumb: {
            name: "Mastering Pembimbing Lapangan",
            path: `pages/kepalajurusan/pembimbinglapangan`,
            goto: `kepalajurusan-pembimbinglapangan`,
          },
        },
        component: () =>
          import(
            "@/views/kepalajurusan/pembimbinglapangan/PembimbinglapanganIndex.vue"
          )
      },

      {
        path: `pages/kepalajurusan/tempatpkl`,
        name: `kepalajurusan-tempatpkl`,
        meta: {
          title: "Mastering Tempatpkl",
          icon: "mdi-home",
          breadcrumb: {
            name: "Mastering Tempatpkl",
            path: `pages/kepalajurusan/tempatpkl`,
            goto: `kepalajurusan-tempatpkl`,
          },
        },
        component: () =>
          import(
            "@/views/kepalajurusan/tempatpkl/TempatpklIndex.vue"
          )
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
              {
                path: `${prefix}/penilaian/settings/:id/guru/edit/:id2`,
                name: `${prefixName}penilaian-settings-guru-edit`,
                meta: {
                  title: "Penilaian Settings guru",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "edit",
                    path: `${prefix}/penilaian/settings/:id/guru/edit/:id2`,
                    goto: `${prefixName}penilaian-settings-guru-edit`,
                    params: {
                      id: `id`,
                      id2: `id2`,
                    },
                  },
                },
                component: () =>
                  import(
                    "@/views/admin/penilaian/settings/penilaian_guru/PenilaianGuruEdit.vue"
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
              {
                path: `${prefix}/penilaian/settings/:id/pembimbinglapangan/edit/:id2`,
                name: `${prefixName}penilaian-settings-pembimbinglapangan-edit`,
                meta: {
                  title: "Penilaian Settings pembimbinglapangan",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "edit",
                    path: `${prefix}/penilaian/settings/:id/pembimbinglapangan/edit/:id2`,
                    goto: `${prefixName}penilaian-settings-pembimbinglapangan-edit`,
                  },
                },
                component: () =>
                  import(
                    "@/views/admin/penilaian/settings/penilaian_pembimbinglapangan/PenilaianPembimbinglapanganEdit.vue"
                  ),
              },
            ],
          },
        ],
      },

      //GURU PENILAI
      {
        path: `${prefix}/penilai/tempatpkl`,
        name: `${prefixName}penilai-tempatpkl`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Tempat PKL",
            path: `${prefix}/penilai/tempatpkl`,
            goto: `${prefixName}penilai-tempatpkl`,
          },
        },
        component: () => import("@/views/penilai/tempatpkl/TempatpklIndex.vue"),
      },
      {
        path: `${prefix}/penilai/siswa`,
        name: `${prefixName}penilai-siswa`,
        meta: {
          title: "Siswa",
          icon: "mdi-home",
          breadcrumb: {
            name: "Siswa",
            path: `${prefix}/penilai/siswa`,
            goto: `${prefixName}penilai-siswa`,
          },
        },
        component: () => import("@/views/penilai/siswa/SiswaIndex.vue"),
      },
      {
        path: `${prefix}/pembimbing/siswa/detailnilai`,
        name: `${prefixName}pembimbing-siswa-detailnilai`,
        meta: {
          title: "Siswa",
          icon: "mdi-home",
          breadcrumb: {
            name: "Siswa",
            path: `${prefix}/pembimbing/siswa/detailnilai`,
            goto: `${prefixName}pembimbing-siswa-detailnilai`,
          },
        },
        component: () => import("@/views/penilai/siswa/SiswaDetailNilai.vue"),
      },
      {
        path: `${prefix}/pembimbing/siswa/detailnilai`,
        name: `${prefixName}pembimbing-siswa-detailnilai`,
        meta: {
          title: "Siswa",
          icon: "mdi-home",
          breadcrumb: {
            name: "Siswa",
            path: `${prefix}/penilai/siswa/detailnilai`,
            goto: `${prefixName}penilai-siswa-detailnilai`,
          },
        },
        component: () => import("@/views/admin/siswa/GuruSiswaDetailNilai.vue"),
      },

      {
        path: `${prefix}/siswaabsensi/:id`,
        name: `${prefixName}siswaabsensi-index`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Profile",
            path: `${prefix}/siswaabsensi/:id`,
            goto: `${prefixName}siswaabsensi-index`,
          },
        },
        component: () =>
          import("@/views/admin/siswa/detail/SiswaAbsensiIndex.vue"),
      },
      {
        path: `${prefix}/penilai/siswalayout`,
        name: `${prefixName}penilai-siswalayout`,
        meta: {
          title: "Siswa",
          icon: "mdi-home",
          breadcrumb: {
            name: "Siswa",
            path: `${prefix}/penilai/siswa`,
            goto: `${prefixName}penilai-siswa`,
          },
        },
        component: () => import("@/views/penilai/siswa/SiswaLayout.vue"),
        redirect: `${prefix}/penilaian/siswa`,
        children: [
          {
            path: `${prefix}/penilai/siswadetail/:id`,
            name: `${prefixName}penilai-siswadetail-index`,
            meta: {
              title: "Profile",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail Nilai",
                path: `${prefix}/penilai/siswadetail/:id`,
                goto: `${prefixName}penilai-siswadetail-index`,
              },
            },
            component: () =>
              import("@/views/penilai/siswa/nilai/SiswaNilaiIndex.vue"),
          },
        ],
      },
      {
        path: `${prefix}/pendaftaran/index`,
        name: `${prefixName}pendaftaran-index`,
        meta: {
          title: "Pendaftaran PKL",
          breadcrumb: {
            name: "Pendaftaran",
            path: `${prefix}/pendaftaran/index`,
            goto: `${prefixName}pendaftaran-index`,
          },
        },
        component: () =>
          import(
            "@/views/kepalajurusan/pendaftaran/SubSidebarPendaftaran.vue"
          ),
        redirect: `${prefix}/pendaftaran/proses/penempatan`,
        children: [
          {
            path: `${prefix}/pendaftaran/proses/penempatan`,
            name: `${prefixName}pendaftaran-proses-penempatan`,
            meta: {
              title: "Proses Penempatan",
              breadcrumb: {
                name: "Proses Penempatan",
                path: `${prefix}/pendaftaran/proses/penempatan`,
                goto: `${prefixName}pendaftaran-proses-penempatan`,
              },
            },
            component: () =>
              import("@/views/kepalajurusan/pendaftaran/ProsesPenempatan.vue"),
          },
          {
            path: `${prefix}/pendaftaran/list/semuasiswa`,
            name: `${prefixName}pendaftaran-list-semuasiswa`,
            meta: {
              title: "list semuasiswa",
              breadcrumb: {
                name: "list semuasiswa",
                path: `${prefix}/pendaftaran/list/semuasiswa`,
                goto: `${prefixName}pendaftaran-list-semuasiswa`,
              },
            },
            component: () =>
              import("@/views/kepalajurusan/pendaftaran/ListSemuaSiswa.vue"),
          },
          {
            path: `${prefix}/pendaftaran/list/belumdaftar`,
            name: `${prefixName}pendaftaran-list-belumdaftar`,
            meta: {
              title: "list belumdaftar",
              breadcrumb: {
                name: "list belumdaftar",
                path: `${prefix}/pendaftaran/list/belumdaftar`,
                goto: `${prefixName}pendaftaran-list-belumdaftar`,
              },
            },
            component: () =>
              import("@/views/kepalajurusan/pendaftaran/ListBelumDaftar.vue"),
          },
          {
            path: `${prefix}/pendaftaran/list/pengajuan`,
            name: `${prefixName}pendaftaran-list-pengajuan`,
            meta: {
              title: "list pengajuan",
              breadcrumb: {
                name: "list pengajuan",
                path: `${prefix}/pendaftaran/list/pengajuan`,
                goto: `${prefixName}pendaftaran-list-pengajuan`,
              },
            },
            component: () =>
              import("@/views/kepalajurusan/pendaftaran/ListPengajauan.vue"),
          },
          {
            path: `${prefix}/pendaftaran/list/penempatan`,
            name: `${prefixName}pendaftaran-list-penempatan`,
            meta: {
              title: "list penempatan",
              breadcrumb: {
                name: "list penempatan",
                path: `${prefix}/pendaftaran/list/penempatan`,
                goto: `${prefixName}pendaftaran-list-penempatan`,
              },
            },
            component: () =>
              import("@/views/kepalajurusan/pendaftaran/ListPenempatan.vue"),
          },
          {
            path: `${prefix}/pendaftaran/list/pemberkasan`,
            name: `${prefixName}pendaftaran-list-pemberkasan`,
            meta: {
              title: "list pemberkasan",
              breadcrumb: {
                name: "list pemberkasan",
                path: `${prefix}/pendaftaran/list/pemberkasan`,
                goto: `${prefixName}pendaftaran-list-pemberkasan`,
              },
            },
            component: () =>
              import("@/views/kepalajurusan/pendaftaran/ListPemberkasan.vue"),
          },
          {
            path: `${prefix}/pendaftaran/list/persetujuan`,
            name: `${prefixName}pendaftaran-list-persetujuan`,
            meta: {
              title: "list persetujuan",
              breadcrumb: {
                name: "list persetujuan",
                path: `${prefix}/pendaftaran/list/persetujuan`,
                goto: `${prefixName}pendaftaran-list-persetujuan`,
              },
            },
            component: () =>
              import("@/views/kepalajurusan/pendaftaran/ListPersetujuan.vue"),
          },
          {
            path: `${prefix}/pendaftaran/list/disetujui`,
            name: `${prefixName}pendaftaran-list-disetujui`,
            meta: {
              title: "list disetujui",
              breadcrumb: {
                name: "list disetujui",
                path: `${prefix}/pendaftaran/list/disetujui`,
                goto: `${prefixName}pendaftaran-list-disetujui`,
              },
            },
            component: () =>
              import("@/views/kepalajurusan/pendaftaran/ListDisetujui.vue"),
          },
        ],
      },
    ],
  },
];
export default AdminRoutes;
