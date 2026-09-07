import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import ShopPage from "@/views/ShopPage.vue";
import ContactPage from "@/views/ContactPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import ProductsPage from "@/views/ProductsPage.vue";
import PurchasePage from "@/views/PurchasePage.vue";
import SalesPage from "@/views/SalesPage.vue";
import TestDrivePage from "@/views/TestDrivePage.vue";
import FinancingPage from "@/views/FinancingPage.vue";
import CarDetailsPage from "@/views/CarDetailsPage.vue";
import BlogPage from "@/views/BlogPage.vue";
import BlogPostPage from "@/views/BlogPostPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage, meta: { requiresAuth: true } },
  { path: "/shop", component: ShopPage, meta: { requiresAuth: true } },
  { path: "/contact", component: ContactPage, meta: { requiresAuth: true } },
  { path: "/login", component: LoginPage, meta: { hideNavbar: true } },
  { path: "/register", component: RegisterPage, meta: { hideNavbar: true } },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  { path: "/products", component: ProductsPage, meta: { requiresAuth: true } },
  { path: "/purchases", component: PurchasePage, meta: { requiresAuth: true } },
  { path: "/sales", component: SalesPage, meta: { requiresAuth: true } },
  {
    path: "/test-drive",
    component: TestDrivePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/financing",
    component: FinancingPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/car-details",
    component: CarDetailsPage,
    meta: { requiresAuth: true },
  },
  { path: "/blog", component: BlogPage, meta: { requiresAuth: true } },
  {
    path: "/blog/:slug",
    component: BlogPostPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0, left: 0 };
  },
});

router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }

  if ((to.path === "/login" || to.path === "/register") && isLoggedIn) {
    return "/";
  }

  return true;
});

export default router;
