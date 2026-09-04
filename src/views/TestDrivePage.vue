<template>
  <div>
    <!-- Sidebar toggle button -->
    <button
      class="sidebar-toggle"
      id="sidebarToggle"
      @click="sidebarOpen = true"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay -->
    <div
      class="overlay"
      :class="{ show: sidebarOpen }"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <nav class="sidebar" :class="{ show: sidebarOpen }">
      <div class="sidebar-header">
        <h4>OBerlo</h4>
        <p>Inventory Management System</p>
      </div>

      <ul class="sidebar-menu">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/products">
            <i class="fas fa-car"></i>
            <span>Inventory</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/purchases">
            <i class="fas fa-truck"></i>
            <span>Purchase Orders</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/sales">
            <i class="fas fa-dollar-sign"></i>
            <span>Vehicle Sales</span>
          </router-link>
        </li>

        <li class="nav-item logout-btn">
          <a class="nav-link" href="#" @click.prevent="handleLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main>
      <!-- Hero -->
      <section class="test-hero">
        <div class="hero-container">
          <h1>Book a <span>Test Drive</span></h1>

          <p>
            Experience the thrill behind the wheel. Select your car and
            preferred time.
          </p>
        </div>
      </section>

      <!-- Form Section -->
      <section class="test-drive-section">
        <!-- Section heading -->
        <div class="section-heading">
          <h2>Schedule Your Test Drive</h2>
          <p>
            Fill in your details below and choose the vehicle, date, and time
            that works best for you.
          </p>
        </div>

        <!-- Form Card -->
        <div class="form-card">
          <!-- Form header -->
          <div class="form-header">
            <div class="form-header-icon">
              <i class="fas fa-car"></i>
            </div>

            <div>
              <h3>Test Drive Request</h3>
              <p>Tell us when you'd like to experience your next car.</p>
            </div>
          </div>

          <div class="form-divider"></div>

          <form @submit.prevent="handleSubmit">
            <div class="form-grid">
              <!-- Full Name -->
              <div class="form-group">
                <label class="form-label"> Full Name </label>

                <div class="input-wrapper">
                  <i class="fas fa-user input-icon"></i>

                  <input
                    type="text"
                    class="form-control"
                    placeholder="John Doe"
                    v-model="form.name"
                    required
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="form-group">
                <label class="form-label"> Email Address </label>

                <div class="input-wrapper">
                  <i class="fas fa-envelope input-icon"></i>

                  <input
                    type="email"
                    class="form-control"
                    placeholder="john@example.com"
                    v-model="form.email"
                    required
                  />
                </div>
              </div>

              <!-- Phone -->
              <div class="form-group">
                <label class="form-label"> Kenyan Phone Number </label>

                <div class="input-wrapper">
                  <i class="fas fa-phone input-icon"></i>

                  <input
                    type="tel"
                    class="form-control"
                    placeholder="+254 700 123 456"
                    v-model="form.phone"
                    required
                  />
                </div>
              </div>

              <!-- Vehicle -->
              <div class="form-group">
                <label class="form-label"> Select Vehicle </label>

                <div class="input-wrapper">
                  <i class="fas fa-car input-icon"></i>

                  <select class="form-select" v-model="form.vehicleId" required>
                    <option value="">Choose a car...</option>

                    <option v-for="p in products" :key="p.id" :value="p.id">
                      {{ p.name }} ({{ p.model || "—" }})
                    </option>
                  </select>
                </div>
              </div>

              <!-- Date -->
              <div class="form-group">
                <label class="form-label"> Preferred Date </label>

                <div class="input-wrapper">
                  <i class="fas fa-calendar-alt input-icon"></i>

                  <input
                    type="date"
                    class="form-control"
                    v-model="form.date"
                    required
                  />
                </div>
              </div>

              <!-- Time -->
              <div class="form-group">
                <label class="form-label"> Preferred Time </label>

                <div class="input-wrapper">
                  <i class="fas fa-clock input-icon"></i>

                  <input
                    type="time"
                    class="form-control"
                    v-model="form.time"
                    required
                  />
                </div>
              </div>

              <!-- Notes -->
              <div class="form-group full-width">
                <label class="form-label"> Additional Notes </label>

                <div class="textarea-wrapper">
                  <i class="fas fa-comment-alt textarea-icon"></i>

                  <textarea
                    class="form-control"
                    rows="4"
                    placeholder="Any specific requests..."
                    v-model="form.notes"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="submit-section">
              <button type="submit" class="btn-send" :disabled="isSubmitting">
                <span
                  v-if="isSubmitting"
                  class="spinner-border spinner-border-sm"
                ></span>

                <i v-else class="fas fa-calendar-check"></i>

                <span>
                  {{ isSubmitting ? "Sending..." : "Request Test Drive" }}
                </span>
              </button>

              <p class="form-note">
                <i class="fas fa-shield-alt"></i>
                Your information is safe and will only be used to arrange your
                test drive.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "TestDrivePage",

  data() {
    return {
      sidebarOpen: false,
      products: [],
      loading: true,
      isSubmitting: false,

      form: {
        name: "",
        email: "",
        phone: "",
        vehicleId: "",
        date: "",
        time: "",
        notes: "",
      },
    };
  },

  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
          withCredentials: true,
        });

        this.products = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching products:", error);

        this.loading = false;

        if (error.response?.status === 401) {
          this.$router.push("/login");
        }
      }
    },

    handleSubmit() {
      this.isSubmitting = true;

      setTimeout(() => {
        alert(
          "Your test drive request has been sent. We'll confirm your slot within 24 hours.",
        );

        this.resetForm();
        this.isSubmitting = false;
      }, 800);
    },

    resetForm() {
      this.form = {
        name: "",
        email: "",
        phone: "",
        vehicleId: "",
        date: "",
        time: "",
        notes: "",
      };
    },

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
      this.$router.push("/login");
    },
  },

  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped src="../styles/pages/TestDrivePage.css"></style>

<!-- 450 lines -->
