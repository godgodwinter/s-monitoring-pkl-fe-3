/* eslint-disable */
const LandingRoutes = [
  {
    path: "/landing",
    name: "LandingLayout",
    component: () => import("@/layouts/LandingLayout.vue"),
    redirect: "/home",
    meta: {
      title: "Home",
      icon: "mdi-home",
      breadcrumb: {
        name: "Home",
        path: "/landing",
        goto: "LandingLayout",
      },
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/adminlogin",
        name: "AdminLogin",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/home",
        name: "homeIndex",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/landinglogin",
        name: "LandingLogin",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/404",
        name: "NotFound",
        component: () => import("@/views/landing/other/404.vue"),
      },
    ],
  },
  // {
  //   path: "/:catchAll(.*)",
  //   redirect: "/404",
  // },
];
export default LandingRoutes;
