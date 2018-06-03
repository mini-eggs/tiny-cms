export default {
  routes: [
    {
      path: "/",
      component: () => import("./scenes/Login.vue")
    },
    {
      path: "/dashboard",
      component: () => import("./scenes/Dashboard.vue")
    },
    {
      path: "/dashboard/models",
      component: () => import("./scenes/Models.vue")
    },
    {
      path: "/dashboard/content",
      component: () => import("./scenes/Content.vue")
    },
    {
      path: "/error",
      component: () => import("./scenes/Error.vue")
    }
  ]
};
