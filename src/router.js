import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import LayoutDefault from "@/components/LayoutDefault.vue";
import { default as store } from "@/store/index";
import { routePaths } from "@/helpers/constants";
import { toastedInfo, toastedError } from "@/helpers/toasted";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: LayoutDefault,
    children: [{ path: "", component: Home }]
  },
  {
    path: "/auth",
    component: () => import("@/components/LayoutAuth"),
    meta: { preventAuth: true },
    children: [
      { path: "", component: () => import("@/views/auth/Login") },
      {
        path: "register",
        component: () => import("@/views/auth/Register")
      },
      {
        path: "register/2",
        meta: { preventAuth_Exception: true },
        component: () => import("@/views/auth/Register2")
      },
      {
        path: "forgot-password",
        component: () => import("@/views/auth/ForgotPassword")
      }
    ]
  },
  {
    path: "/dashboard",
    component: () => import("@/components/LayoutDashboard"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("@/views/dashboard/Home")
      },
      {
        path: "account",
        component: () => import("@/views/dashboard/Account")
      },
      {
        path: "profile",
        component: () => import("@/views/dashboard/Profile")
      }
    ]
  },
  {
    path: "/dashboard/project",
    component: () => import("@/components/LayoutDashboard"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("@/views/dashboard/project/Home")
      },
      {
        path: "add",
        component: () => import("@/views/dashboard/project/Add")
      },
      {
        path: ":id",
        component: () => import("@/components/LayoutProject"),
        meta: { Project: true },
        children: [
          {
            path: "",
            component: () => import("@/views/dashboard/project/View")
          },
          {
            path: "edit",
            component: () => import("@/views/dashboard/project/Edit")
          }
        ]
      }
    ]
  },
  {
    path: "/admin",
    component: LayoutDefault,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        component: () => import("@/views/admin/Home")
      }
    ]
  },
  {
    path: "/500",
    component: () => import("@/views/error/500")
  }
];

const router = new Router({ mode: "history", routes });

/* Global Route's Guard */
router.beforeEach(function(to, from, next) {
  const {
    "users/isAuthenticated": isAuthenticated,
    "users/isAdmin": isAdmin
  } = store.getters;
  // Guard "requiresAuth === TRUE"
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const requiresAdmin = to.matched.some(x => x.meta.requiresAdmin);
  if (!isAuthenticated && requiresAuth) {
    toastedInfo(Vue.toasted, "Please log in first.");
    return next(routePaths.auth.login);
  }
  if (!isAdmin && requiresAdmin) {
    toastedInfo(Vue.toasted, "You are not the admin");
    return next(from.path);
  }

  // Guard "preventAuth === TRUE"
  const preventAuth = to.matched.some(x => x.meta.preventAuth);
  const preventAuth_Exception = to.matched.some(
    x => x.meta.preventAuth_Exception
  );
  if (isAuthenticated && preventAuth && !preventAuth_Exception) {
    toastedInfo(Vue.toasted, "You already logged in.");
    return next(from.path);
  }
  // Fallback
  next();
});

router.onError(function(error) {
  const { $router, $toasted } = router.app;
  toastedError($toasted, error.message);
  $router.push(routePaths.error[500]);
});

export default router;
