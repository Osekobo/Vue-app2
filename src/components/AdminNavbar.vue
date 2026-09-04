<template>
  <div class="admin-navbar">
    <button
      type="button"
      class="admin-sidebar-toggle"
      :aria-expanded="isOpen"
      aria-label="Open admin navigation"
      @click="isOpen = true"
    >
      <i :class="isOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>

    <div
      class="admin-sidebar-overlay"
      :class="{ show: isOpen }"
      @click="isOpen = false"
    ></div>

    <aside class="admin-sidebar" :class="{ open: isOpen }">
      <div class="admin-sidebar-header">
        <div class="admin-brand-icon">
          <i class="fas fa-car"></i>
        </div>
        <div>
          <h4>OBerlo</h4>
          <p>Car Yard Management</p>
        </div>
      </div>

      <nav class="admin-sidebar-nav" aria-label="Admin navigation">
        <router-link to="/" class="admin-nav-link">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/dashboard" class="admin-nav-link">
          <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/products" class="admin-nav-link">
          <i class="fas fa-car"></i>
          <span>Inventory</span>
        </router-link>
        <router-link to="/purchases" class="admin-nav-link">
          <i class="fas fa-truck"></i>
          <span>Purchase Orders</span>
        </router-link>
        <router-link to="/sales" class="admin-nav-link">
          <i class="fas fa-dollar-sign"></i>
          <span>Vehicle Sales</span>
        </router-link>
        <button
          type="button"
          class="admin-nav-link admin-logout"
          @click="handleLogout"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "AdminNavbar",

  data() {
    return {
      isOpen: false,
    };
  },

  watch: {
    $route() {
      this.isOpen = false;
    },
  },

  methods: {
    async handleLogout() {
      try {
        await axios.post(
          `${API_BASE_URL}/logout`,
          {},
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error("Logout error:", error);
      }

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      this.isOpen = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped src="../styles/components/AdminNavbar.css"></style>
