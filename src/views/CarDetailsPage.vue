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

      <ul style="list-style: none; padding-left: 0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-chart-line"></i> Dashboard
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/products">
            <i class="fas fa-car"></i> Inventory
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/purchases">
            <i class="fas fa-truck"></i> Purchase Orders
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/sales">
            <i class="fas fa-dollar-sign"></i> Vehicle Sales
          </router-link>
        </li>

        <li class="nav-item logout-btn">
          <a class="nav-link" href="#" @click.prevent="handleLogout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main>
      <!-- Loading state -->
      <div v-if="loading" class="detail-hero">
        <div class="container text-center py-5">
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <p class="text-white-50 mt-3">Loading vehicle details...</p>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="detail-hero">
        <div class="container car-not-found">
          <h1 class="text-white">Unable to load vehicle</h1>

          <p class="text-white-50">
            {{ error }}
          </p>

          <router-link to="/shop" class="btn-gold mt-3">
            Back to Shop
          </router-link>
        </div>
      </div>

      <!-- Car not found -->
      <div v-else-if="!car" class="detail-hero">
        <div class="container car-not-found">
          <h1 class="text-white">Car Not Found</h1>

          <p class="text-white-50">
            Sorry, we couldn't find the vehicle you're looking for.
          </p>

          <router-link to="/shop" class="btn-gold mt-3">
            Browse Our Collection
          </router-link>
        </div>
      </div>

      <!-- Car details -->
      <template v-else>
        <!-- =====================================
             DETAIL HERO
        ====================================== -->
        <section class="detail-hero">
          <div class="container detail-container">
            <div class="detail-layout">
              <!-- LEFT: CAR IMAGE -->
              <div class="car-image-section">
                <img
                  :src="car.hero_image || car.image || ''"
                  :alt="car.name"
                  class="car-detail-image"
                />
              </div>

              <!-- RIGHT: CAR INFORMATION -->
              <div class="car-info-section text-white">
                <router-link to="/shop" class="btn-back-shop">
                  <i class="fas fa-arrow-left"></i>
                  Back to Shop
                </router-link>

                <div class="car-title-row">
                  <div>
                    <span class="spec-badge">
                      {{ car.badge || "Featured" }}
                    </span>

                    <h1 class="display-5 fw-bold mt-2">
                      {{ car.name }}
                    </h1>

                    <p class="vehicle-price">
                      {{ formatPrice(car.display_price || car.selling_price) }}
                    </p>
                  </div>

                  <span class="badge bg-warning text-dark p-2 stock-badge">
                    In Stock
                  </span>
                </div>

                <p class="text-white-50 car-subtitle">
                  {{ car.subtitle || car.engine || "" }}
                </p>

                <div class="d-flex flex-wrap gap-3 mt-4">
                  <router-link to="/test-drive" class="btn-gold">
                    <i class="fas fa-calendar-check me-2"></i>
                    Book Test Drive
                  </router-link>

                  <router-link to="/financing" class="btn-outline-gold">
                    Finance Options
                  </router-link>

                  <a
                    :href="whatsappLink"
                    class="btn-outline-gold"
                    target="_blank"
                    rel="noopener"
                  >
                    <i class="fab fa-whatsapp me-2"></i>
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div class="vehicle-summary">
              <div>
                <span>Year</span>
                <strong>{{ car.year || "Available on request" }}</strong>
              </div>
              <div>
                <span>Condition</span>
                <strong>{{ car.condition || "Inspected pre-owned" }}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{{ car.location || "Nairobi, Kenya" }}</strong>
              </div>
            </div>
          </div>
        </section>

        <!-- =====================================
             CAR DETAILS / OVERVIEW
        ====================================== -->
        <section class="car-details-section">
          <div class="details-container">
            <div class="details-layout">
              <!-- LEFT: OVERVIEW + SPECS -->
              <div class="overview-section">
                <h3 class="fw-bold overview-title">Car Details</h3>

                <p class="text-secondary overview-description">
                  {{ car.description || "No description available." }}
                </p>

                <div class="spec-cards">
                  <div class="spec-card">
                    <div class="spec-item">
                      <span class="icon">
                        <i class="fa-solid fa-gear"></i>
                      </span>
                      <div class="label">Engine</div>
                      <div class="value">{{ car.engine || "—" }}</div>
                    </div>
                  </div>

                  <div class="spec-card">
                    <div class="spec-item">
                      <span class="icon">
                        <i class="fa-solid fa-horse-head"></i>
                      </span>
                      <div class="label">Horsepower</div>
                      <div class="value">{{ car.horsepower || "—" }}</div>
                    </div>
                  </div>

                  <div class="spec-card">
                    <div class="spec-item">
                      <span class="icon">
                        <i class="fa-solid fa-clock"></i>
                      </span>
                      <div class="label">0-60 mph</div>
                      <div class="value">{{ car.zero_to_sixty || "—" }}</div>
                    </div>
                  </div>

                  <!-- Top Speed -->
                  <div class="spec-card">
                    <div class="spec-item">
                      <span class="icon">
                        <i class="fa-solid fa-gauge-high"></i>
                      </span>

                      <div class="label">Top Speed</div>

                      <div class="value">
                        {{ car.top_speed || "—" }}
                      </div>
                    </div>
                  </div>

                  <!-- Transmission -->
                  <div class="spec-card">
                    <div class="spec-item">
                      <span class="icon">
                        <i class="fa-solid fa-gears"></i>
                      </span>

                      <div class="label">Transmission</div>

                      <div class="value">
                        {{ car.transmission || "—" }}
                      </div>
                    </div>
                  </div>

                  <!-- Drivetrain -->
                  <div class="spec-card">
                    <div class="spec-item">
                      <span class="icon">
                        <i class="fa-solid fa-road"></i>
                      </span>

                      <div class="label">Drivetrain</div>

                      <div class="value">
                        {{ car.drivetrain || "—" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- =================================
                   WHY BUY FROM OBERLO
              ================================== -->
              <div class="why-buy-section">
                <div class="why-buy-card">
                  <h5 class="fw-bold">Why Buy From OBerlo?</h5>

                  <ul class="list-unstyled mt-3">
                    <li
                      v-for="(feature, index) in features"
                      :key="index"
                      class="feature-item"
                    >
                      <i class="fa-solid fa-check-circle text-warning"></i>

                      <span>
                        {{ feature }}
                      </span>
                    </li>

                    <li v-if="!features.length" class="text-muted">
                      No features listed
                    </li>
                  </ul>

                  <hr />

                  <p class="mb-0 phone-info">
                    <i class="fa-solid fa-phone-alt"></i>

                    <span> Call us: +254 700 123 456 </span>
                  </p>
                </div>
              </div>
            </div>

            <section class="ownership-section">
              <div class="section-heading">
                <span class="section-label">BUY WITH CONFIDENCE</span>
                <h3>What happens next</h3>
                <p>
                  Our Nairobi team can guide you from inspection to delivery.
                </p>
              </div>

              <div class="ownership-grid">
                <div class="ownership-item">
                  <i class="fas fa-clipboard-check"></i>
                  <div>
                    <h5>Vehicle inspection</h5>
                    <p>
                      View the car, review its condition and take a test drive.
                    </p>
                  </div>
                </div>

                <div class="ownership-item">
                  <i class="fas fa-file-signature"></i>
                  <div>
                    <h5>Clear paperwork</h5>
                    <p>
                      We help with the purchase documents and ownership
                      transfer.
                    </p>
                  </div>
                </div>

                <div class="ownership-item">
                  <i class="fas fa-truck"></i>
                  <div>
                    <h5>Delivery across Kenya</h5>
                    <p>
                      Arrange collection in Nairobi or delivery to your town.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "CarDetailsPage",

  data() {
    return {
      sidebarOpen: false,
      car: null,
      loading: true,
      error: null,
    };
  },

  computed: {
    features() {
      return this.car?.features || [];
    },

    whatsappLink() {
      const vehicleName = this.car?.name || "this vehicle";
      const message = `Hello OBerlo, I would like to enquire about ${vehicleName}.`;
      return `https://wa.me/254700123456?text=${encodeURIComponent(message)}`;
    },
  },

  methods: {
    formatPrice(value) {
      const amount = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
      return Number.isFinite(amount)
        ? `KSh ${amount.toLocaleString()}`
        : "Price available on request";
    },

    async fetchCar(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
          withCredentials: true,
        });

        this.car = response.data;
      } catch (err) {
        if (err.response?.status === 404) {
          this.car = null;
          this.error = null;
        } else {
          this.error = err.message || "Failed to load vehicle details.";
        }
      } finally {
        this.loading = false;
      }
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
    const id = this.$route.query.id;

    if (id) {
      this.fetchCar(id);
    } else {
      this.loading = false;
      this.car = null;
    }
  },

  watch: {
    "$route.query.id"(newId) {
      if (newId) {
        this.fetchCar(newId);
      } else {
        this.car = null;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped src="../styles/pages/CarDetailsPage.css"></style>

<!-- 562 lines -->
