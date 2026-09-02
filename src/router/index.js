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

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/shop", component: ShopPage },
  { path: "/contact", component: ContactPage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/dashboard", component: DashboardPage },
  { path: "/products", component: ProductsPage },
  { path: "/purchases", component: PurchasePage },
  { path: "/sales", component: SalesPage },
  { path: "/test-drive", component: TestDrivePage },
  { path: "/financing", component: FinancingPage },
  { path: "/car-details", component: CarDetailsPage },
  { path: "/blog", component: BlogPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
