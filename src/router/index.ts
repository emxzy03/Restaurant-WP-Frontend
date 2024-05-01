import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // component: HomeView,
      components: {
        default: HomeView,
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/user/UserView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        layout: "FullLayout",
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      components: {
        default: import("../views/dashboard/DashboardView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
        requiresURole: ["manager", "owner"],
      },
    },
    {
      path: "/table",
      name: "table",
      components: {
        default: import("../views/table/TableView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
        requiresURole: [
          "cleaning personnel",
          "waitress",
          "manager",
          "owner",
          "cashier",
        ],
      },
    },
    {
      path: "/chef",
      name: "chef",
      components: {
        default: import("../views/chef/ChefView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
        requiresURole: [
          "chef_pfried",
          "assistant chef",
          "manager",
          "owner",
          "beverage manager",
          "chef_stbaked",
          "chef_roastb",
          "chef_cboiled",
          "chef_noodles",
          "chef_dessert",
        ],
      },
    },
    {
      path: "/serve",
      name: "serve",
      components: {
        default: import("../views/serve/ServeView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
        requiresURole: ["waitress", "manager", "owner"],
      },
    },
    {
      path: "/check-bill",
      name: "check-bill",
      components: {
        default: import("../views/check_bill/CheckBillView.vue"),
        menu: () => import("@/components/menus/MainMenu.vue"),
        header: () => import("@/components/headers/MainHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
        requiresURole: ["manager", "owner", "cashier"],
      },
    },
    {
      path: "/manage",
      name: "manage",
      components: {
        default: import("../views/HomeView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
      },
    },
    {
      path: "/materials",
      name: "materials",
      components: {
        default: import("../views/materials/MaterialView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/bill-materials",
      name: "bill-materials",
      components: {
        default: import("../views/bill_materials/BillMatView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/salaries",
      name: "salaries",
      components: {
        default: import("../views/salary/SalaryView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
        requiresURole: ["manager", "owner"],
      },
    },
    {
      path: "/menus",
      name: "menus",
      components: {
        default: import("../views/menu/MenuView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/table-management",
      name: "table-management",
      components: {
        default: import("../views/table/management/TableMgmtView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/menu-queue-history",
      name: "menu-queue-history",
      components: {
        default: import("../views/chef/MenuQHistory.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/employee",
      name: "employee",
      components: {
        default: import("../views/employee/EmployeeView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
        requiresURole: ["manager", "owner"],
      },
    },
    {
      path: "/category",
      name: "category",
      components: {
        default: import("../views/category/CategoryView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/receipt",
      name: "receipt",
      components: {
        default: import("../views/receipt/ReceiptView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
        requiresURole: ["manager", "owner", "cashier"],
      },
    },
    // {
    //   path: "/receipt/:id",
    //   // path: "/receipt/pos",
    //   name: "Sell-id",
    //   components: {
    //     default: import("../views/point_of_sell/SellView.vue"),
    //     header: () => import("@/components/headers/ManageHeader.vue"),
    //   },
    //   meta: {
    //     layout: "FullLayout",
    //   },
    // },
    {
      path: "/POS-menus",
      // path: "/receipt/pos",
      name: "pos-sell",
      components: {
        default: import("../views/point_of_sell/SellView.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "FullLayout",
      },
    },
    {
      path: "/check-in-out-history",
      name: "check-in-out-history",
      components: {
        default: import("../views/salary/ChInOutHistory.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
      },
    },
    {
      path: "/check-material",
      name: "check-material",
      components: {
        default: import("../views/check_materials/CheckMatView.vue"),
        menu: () => import("@/components/menus/ManageMenu.vue"),
        header: () => import("@/components/headers/ManageHeader.vue"),
      },
      meta: {
        layout: "MainLayout",
        requiresAuth: true,
      },
    },
  ],
});

const isLogin = () => {
  const employee = localStorage.getItem("user");
  if (employee) {
    return true;
  }
  return false;
};
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  if (to.meta.requiresAuth && !isLogin()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  } else if (to.meta.requiresAuth && isLogin()) {
    const employee = JSON.parse(localStorage.getItem("user")!);
    const uRole = employee.role;
    const rolesChef = [
      "chef_pfried",
      "assistant chef",
      "beverage manager",
      "chef_stbaked",
      "chef_roastb",
      "chef_cboiled",
      "chef_noodles",
      "chef_dessert",
    ];
    if (
      to.meta.requiresURole &&
      !`[${to.meta.requiresURole}]`.includes(uRole)
    ) {
      // return {
      //   path: "/",
      //   query: { redirect: to.fullPath },
      // };
      if (rolesChef.includes(uRole)) {
        return {
          path: "/chef",
          query: { redirect: to.fullPath },
        };
      } else if (uRole == "cleaning personnel") {
        return {
          path: "/table",
          query: { redirect: to.fullPath },
        };
      } else if (uRole == "waitress") {
        return {
          path: "/serve",
          query: { redirect: to.fullPath },
        };
      } else if (uRole == "cashier") {
        return {
          path: "/check-bill",
          query: { redirect: to.fullPath },
        };
      }
    } else {
      console.log(`[${to.meta.requiresURole}]`);
    }
  }
});
export default router;

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: HomeView,
//     },
//     {
//       path: "/about",
//       name: "about",
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import("../views/AboutView.vue"),
//     },
//     {
//       path: "/user",
//       name: "user",
//       component: () => import("../views/user/UserView.vue"),
//     },
//     {
//       path: "/table",
//       name: "table",
//       component: () => import("../views/table/TableView.vue"),
//     },
//     {
//       path: "/chef",
//       name: "chef",
//       component: () => import("../views/chef/ChefView.vue"),
//     },
//     {
//       path: "/serve",
//       name: "serve",
//       component: () => import("../views/serve/ServeView.vue"),
//     },
//     {
//       path: "/check-bill",
//       name: "check-bill",
//       component: () => import("../views/check_bill/CheckBillView.vue"),
//     },
//     {
//       path: "/manage",
//       name: "manage",
//       component: () => import("../views/ManageView.vue"),
//     },
//     {
//       path: "/materials",
//       name: "materials",
//       component: () => import("../views/materials/MaterialView.vue"),
//     },
//     {
//       path: "/bill-materials",
//       name: "bill-materials",
//       component: () => import("../views/bill_materials/BillMatView.vue"),
//     },
//     {
//       path: "/salaries",
//       name: "salaries",
//       component: () => import("../views/salary/SalaryView.vue"),
//     },
//     {
//       path: "/menus",
//       name: "menus",
//       component: () => import("../views/menu/MenuView.vue"),
//     },
//     {
//       path: "/table-management",
//       name: "table-management",
//       component: () => import("../views/table/management/TableMgmtView.vue"),
//     },
//     {
//       path: "/menu-queue-history",
//       name: "menu-queue-history",
//       component: () => import("../views/chef/MenuQHistory.vue"),
//     },
//     {
//       path: "/employee",
//       name: "employee",
//       component: () => import("../views/employee/EmployeeView.vue"),
//     },
//     {
//       path: "/category",
//       name: "category",
//       component: () => import("../views/category/CategoryView.vue"),
//     },
//     {
//       path: "/receipt",
//       name: "receipt",
//       component: () => import("../views/receipt/ReceiptView.vue"),
//     },
//     {
//       path: "/receipt/:id",
//       name: "Sell-id",
//       component: () => import("../views/point_of_sell/SellView.vue"),
//     },
//   ],
// });

// export default router;
