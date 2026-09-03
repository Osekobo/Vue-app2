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
          <a
            class="nav-link"
            href="#"
            @click.prevent="handleLogout"
          >
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
          <div
            class="spinner-border text-warning"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>

          <p class="text-white-50 mt-3">
            Loading vehicle details...
          </p>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="detail-hero">
        <div class="container car-not-found">
          <h1 class="text-white">⚠️ Error</h1>

          <p class="text-white-50">
            {{ error }}
          </p>

          <router-link
            to="/shop"
            class="btn-gold mt-3"
          >
            Back to Shop
          </router-link>
        </div>
      </div>

      <!-- Car not found -->
      <div v-else-if="!car" class="detail-hero">
        <div class="container car-not-found">
          <h1 class="text-white">🚗 Car Not Found</h1>

          <p class="text-white-50">
            Sorry, we couldn't find the vehicle you're looking for.
          </p>

          <router-link
            to="/shop"
            class="btn-gold mt-3"
          >
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

                <router-link
                  to="/shop"
                  class="btn-back-shop"
                >
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

                    <p class="text-warning display-6 fw-bold">
                      {{
                        car.display_price ||
                        "$" +
                        Number(car.selling_price).toLocaleString()
                      }}
                    </p>
                  </div>

                  <span
                    class="badge bg-warning text-dark p-2 stock-badge"
                  >
                    In Stock
                  </span>

                </div>

                <p class="text-white-50 car-subtitle">
                  {{ car.subtitle || car.engine || "" }}
                </p>

                <div class="d-flex flex-wrap gap-3 mt-4">

                  <router-link
                    to="/test-drive"
                    class="btn-gold"
                  >
                    <i
                      class="fas fa-calendar-check me-2"
                    ></i>
                    Book Test Drive
                  </router-link>

                  <router-link
                    to="/financing"
                    class="btn-outline-gold"
                  >
                    Finance Options
                  </router-link>

                </div>

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

                <h3 class="fw-bold overview-title">
                  Car Details
                </h3>

                <p class="text-secondary overview-description">
                  {{
                    car.description ||
                    "No description available."
                  }}
                </p>


                <!-- SPECIFICATION CARDS -->
                <div class="spec-cards">

                  <!-- Engine -->
                  <div class="spec-card">
                    <div class="spec-item">

                      <span class="icon">
                        <i class="fa-solid fa-gear"></i>
                      </span>

                      <div class="label">
                        Engine
                      </div>

                      <div class="value">
                        {{ car.engine || "—" }}
                      </div>

                    </div>
                  </div>


                  <!-- Horsepower -->
                  <div class="spec-card">
                    <div class="spec-item">

                      <span class="icon">
                        <i
                          class="fa-solid fa-horse-head"
                        ></i>
                      </span>

                      <div class="label">
                        Horsepower
                      </div>

                      <div class="value">
                        {{ car.horsepower || "—" }}
                      </div>

                    </div>
                  </div>


                  <!-- 0-60 -->
                  <div class="spec-card">
                    <div class="spec-item">

                      <span class="icon">
                        <i class="fa-solid fa-clock"></i>
                      </span>

                      <div class="label">
                        0-60 mph
                      </div>

                      <div class="value">
                        {{ car.zero_to_sixty || "—" }}
                      </div>

                    </div>
                  </div>


                  <!-- Top Speed -->
                  <div class="spec-card">
                    <div class="spec-item">

                      <span class="icon">
                        <i
                          class="fa-solid fa-gauge-high"
                        ></i>
                      </span>

                      <div class="label">
                        Top Speed
                      </div>

                      <div class="value">
                        {{ car.top_speed || "—" }}
                      </div>

                    </div>
                  </div>


                  <!-- Transmission -->
                  <div class="spec-card">
                    <div class="spec-item">

                      <span class="icon">
                        <i
                          class="fa-solid fa-gears"
                        ></i>
                      </span>

                      <div class="label">
                        Transmission
                      </div>

                      <div class="value">
                        {{ car.transmission || "—" }}
                      </div>

                    </div>
                  </div>


                  <!-- Drivetrain -->
                  <div class="spec-card">
                    <div class="spec-item">

                      <span class="icon">
                        <i
                          class="fa-solid fa-road"
                        ></i>
                      </span>

                      <div class="label">
                        Drivetrain
                      </div>

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

                  <h5 class="fw-bold">
                    Why Buy From OBerlo?
                  </h5>

                  <ul class="list-unstyled mt-3">

                    <li
                      v-for="(feature, index) in features"
                      :key="index"
                      class="feature-item"
                    >
                      <i
                        class="fa-solid fa-check-circle text-warning"
                      ></i>

                      <span>
                        {{ feature }}
                      </span>
                    </li>

                    <li
                      v-if="!features.length"
                      class="text-muted"
                    >
                      No features listed
                    </li>

                  </ul>

                  <hr />

                  <p class="mb-0 phone-info">
                    <i
                      class="fa-solid fa-phone-alt"
                    ></i>

                    <span>
                      Call us: +1 (800) 555-0199
                    </span>
                  </p>

                </div>

              </div>

            </div>

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
  },

  methods: {
    async fetchCar(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/${id}`,
          {
            withCredentials: true,
          }
        );

        this.car = response.data;
      } catch (err) {
        if (err.response?.status === 404) {
          this.car = null;
          this.error = null;
        } else {
          this.error =
            err.message ||
            "Failed to load vehicle details.";
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
          }
        );
      } catch (error) {
        console.error("Logout error:", error);
      }

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


<style scoped>

/* =========================================
   GLOBAL
========================================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  padding-top: 80px;
}


/* =========================================
   SIDEBAR
========================================= */

.sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  bottom: 0;
  width: 280px;

  background: linear-gradient(
    180deg,
    #1a1a2e 0%,
    #16213e 100%
  );

  transition: 0.3s ease-in-out;
  z-index: 1001;

  padding-top: 80px;

  box-shadow:
    2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.show {
  left: 0;
}

.sidebar-header {
  padding: 20px;

  border-bottom:
    1px solid rgba(255, 255, 255, 0.1);

  margin-bottom: 20px;
}

.sidebar-header h4 {
  color: #ffc107;
  margin: 0;
}

.sidebar-header p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin: 5px 0 0;
}

.sidebar .nav-item {
  margin: 5px 0;
}

.sidebar .nav-link {
  color: white;
  text-decoration: none;

  display: flex;
  align-items: center;

  padding: 12px 20px;

  transition: all 0.3s;

  font-weight: 500;

  border-radius: 8px;

  margin: 0 10px;
}

.sidebar .nav-link i {
  width: 25px;
  margin-right: 15px;
  font-size: 18px;
}

.sidebar .nav-link:hover {
  background: #ffc107;
  color: #000;
  transform: translateX(5px);
}

.sidebar .logout-btn {
  margin-top: 30px;

  border-top:
    1px solid rgba(255, 255, 255, 0.1);

  padding-top: 20px;
}

.sidebar .logout-btn .nav-link {
  color: #ff6b6b;
}

.sidebar .logout-btn .nav-link:hover {
  background: #ff6b6b;
  color: white;
}


/* =========================================
   SIDEBAR TOGGLE
========================================= */

.sidebar-toggle {
  position: fixed;

  left: 20px;
  top: 80px;

  z-index: 1002;

  background: #ffc107;

  border: none;

  width: 45px;
  height: 45px;

  border-radius: 50%;

  cursor: pointer;

  transition: all 0.3s;

  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.2);
}

.sidebar-toggle:hover {
  background: #ffca2c;
  transform: scale(1.05);
}

.sidebar-toggle i {
  font-size: 20px;
  color: #000;
}


/* =========================================
   OVERLAY
========================================= */

.overlay {
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);

  z-index: 1000;

  display: none;
}

.overlay.show {
  display: block;
}


/* =========================================
   DETAIL HERO
========================================= */

.detail-hero {
  background: #1a1a2e;

  padding:
    55px 0 60px;
}


/* =========================================
   HERO CONTAINER
========================================= */

.detail-container {
  width: 100%;

  max-width: 1320px;

  margin: 0 auto;

  padding-left: 45px;
  padding-right: 45px;
}


/* =========================================
   IMAGE + TEXT LAYOUT
========================================= */

.detail-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1.15fr)
    minmax(0, 0.85fr);

  align-items: center;

  column-gap: 80px;
}


/* =========================================
   CAR IMAGE
========================================= */

.car-image-section {
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;
}

.car-detail-image {
  display: block;

  width: 100%;

  max-width: 650px;

  height: 450px;

  object-fit: cover;

  border-radius: 24px;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.3);
}


/* =========================================
   CAR INFORMATION
========================================= */

.car-info-section {
  width: 100%;

  max-width: 520px;

  justify-self: end;
}

.car-title-row {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 25px;
}

.car-title-row h1 {
  line-height: 1.15;
}

.stock-badge {
  flex-shrink: 0;

  margin-top: 5px;
}

.car-subtitle {
  max-width: 500px;

  line-height: 1.7;

  font-size: 16px;
}


/* =========================================
   SPEC BADGE
========================================= */

.spec-badge {
  background:
    rgba(255, 193, 7, 0.12);

  padding: 8px 16px;

  border-radius: 30px;

  font-size: 14px;

  color: #ffc107;

  font-weight: 600;

  display: inline-block;
}


/* =========================================
   BUTTONS
========================================= */

.btn-gold {
  background: #ffc107;

  color: #000;

  padding: 14px 40px;

  border-radius: 40px;

  font-weight: 700;

  border: none;

  transition: all 0.3s;

  font-size: 16px;

  text-decoration: none;

  display: inline-block;
}

.btn-gold:hover {
  background: #ffca2c;

  transform: translateY(-2px);

  color: #000;
}

.btn-outline-gold {
  background: transparent;

  color: #ffc107;

  border: 2px solid #ffc107;

  padding: 12px 35px;

  border-radius: 40px;

  font-weight: 600;

  transition: all 0.3s;

  text-decoration: none;

  display: inline-block;
}

.btn-outline-gold:hover {
  background: #ffc107;
  color: #000;
}


/* =========================================
   BACK TO SHOP
========================================= */

.btn-back-shop {
  display: inline-flex;

  align-items: center;

  gap: 8px;

  background:
    rgba(255, 255, 255, 0.06);

  color:
    rgba(255, 255, 255, 0.7);

  border:
    1px solid rgba(255, 255, 255, 0.08);

  padding: 8px 18px;

  border-radius: 40px;

  font-size: 0.85rem;

  font-weight: 500;

  text-decoration: none;

  transition: all 0.3s ease;

  margin-bottom: 22px;
}

.btn-back-shop:hover {
  background:
    rgba(255, 193, 7, 0.12);

  color: #ffc107;

  border-color:
    rgba(255, 193, 7, 0.2);

  transform: translateX(-4px);
}

.btn-back-shop i {
  font-size: 0.75rem;

  transition:
    transform 0.3s ease;
}

.btn-back-shop:hover i {
  transform: translateX(-4px);
}


/* =========================================
   CAR DETAILS SECTION
========================================= */

.car-details-section {
  background: #f8f9fa;

  padding:
    70px 0 80px;
}


/* =========================================
   LOWER CONTENT CONTAINER
========================================= */

.details-container {
  width: 100%;

  max-width: 1320px;

  margin: 0 auto;

  padding-left: 45px;
  padding-right: 45px;
}


/* =========================================
   OVERVIEW + WHY BUY LAYOUT
========================================= */

.details-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1.75fr)
    minmax(320px, 0.75fr);

  align-items: start;

  column-gap: 55px;
}


/* =========================================
   OVERVIEW
========================================= */

.overview-section {
  width: 100%;

  min-width: 0;
}

.overview-title {
  color: #1a1a2e;

  font-size: 28px;

  margin-bottom: 18px;
}

.overview-description {
  font-size: 16px;

  line-height: 1.8;

  max-width: 850px;

  margin-bottom: 35px;
}


/* =========================================
   SPECIFICATION CARDS
========================================= */

.spec-cards {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 20px;

  width: 100%;
}

.spec-card {
  width: 100%;
}

.spec-item {
  background: white;

  border-radius: 16px;

  padding: 22px 15px;

  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.05);

  text-align: center;

  height: 100%;

  min-height: 145px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.spec-item:hover {
  transform: translateY(-5px);

  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.09);
}

.spec-item .icon {
  font-size: 24px;

  color: #ffc107;

  display: block;

  margin-bottom: 8px;
}

.spec-item .label {
  font-size: 11px;

  color: #999;

  text-transform: uppercase;

  letter-spacing: 0.7px;

  margin-bottom: 5px;
}

.spec-item .value {
  font-size: 17px;

  font-weight: 700;

  color: #1a1a2e;

  max-width: 100%;

  word-break: break-word;
}


/* =========================================
   WHY BUY CARD
========================================= */

.why-buy-section {
  width: 100%;
}

.why-buy-card {
  background: white;

  padding: 30px;

  border-radius: 18px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.06);

  width: 100%;

  position: sticky;

  top: 100px;
}

.why-buy-card h5 {
  color: #1a1a2e;

  font-size: 20px;

  margin-bottom: 5px;
}

.feature-item {
  display: flex;

  align-items: flex-start;

  gap: 10px;

  margin-bottom: 14px;

  line-height: 1.5;

  color: #555;
}

.feature-item i {
  flex-shrink: 0;

  margin-top: 3px;
}

.phone-info {
  display: flex;

  align-items: center;

  gap: 8px;

  color: #333;

  font-size: 14px;
}


/* =========================================
   NOT FOUND
========================================= */

.car-not-found {
  min-height: 60vh;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 1100px) {

  .detail-container,
  .details-container {
    padding-left: 35px;
    padding-right: 35px;
  }

  .detail-layout {
    column-gap: 50px;
  }

  .details-layout {
    grid-template-columns:
      minmax(0, 1.6fr)
      minmax(280px, 0.8fr);

    column-gap: 35px;
  }

  .spec-cards {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 18px;
  }
}


/* =========================================
   TABLET / SMALL LAPTOP
========================================= */

@media (max-width: 991px) {

  .detail-container,
  .details-container {
    padding-left: 30px;
    padding-right: 30px;
  }

  /* Hero becomes stacked */
  .detail-layout {
    grid-template-columns: 1fr;

    row-gap: 45px;
  }

  .car-image-section {
    justify-content: center;
  }

  .car-detail-image {
    max-width: 700px;

    height: 420px;
  }

  .car-info-section {
    max-width: 700px;

    width: 100%;

    justify-self: center;
  }


  /* Lower section also stacks */
  .details-layout {
    grid-template-columns: 1fr;

    row-gap: 40px;
  }

  .why-buy-card {
    position: static;

    max-width: 700px;

    margin: 0 auto;
  }

  .overview-section {
    max-width: 850px;

    margin: 0 auto;

    width: 100%;
  }

  .spec-cards {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));

    gap: 18px;
  }
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 576px) {

  main {
    padding-top: 70px;
  }

  .detail-hero {
    padding: 35px 0 45px;
  }

  .detail-container,
  .details-container {
    padding-left: 18px;
    padding-right: 18px;
  }

  /* Hero */
  .detail-layout {
    row-gap: 35px;
  }

  .car-detail-image {
    width: 100%;

    height: 280px;

    border-radius: 18px;
  }

  .car-title-row {
    gap: 12px;
  }

  .car-title-row h1 {
    font-size: 2rem;
  }

  .stock-badge {
    font-size: 11px;
  }

  .car-subtitle {
    font-size: 14px;
  }


  /* Details section */
  .car-details-section {
    padding:
      50px 0 60px;
  }

  .overview-title {
    font-size: 24px;
  }

  .overview-description {
    font-size: 15px;

    line-height: 1.7;

    margin-bottom: 28px;
  }


  /* Specification cards */
  .spec-cards {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 14px;
  }

  .spec-item {
    padding: 16px 8px;

    min-height: 125px;

    border-radius: 14px;
  }

  .spec-item .value {
    font-size: 15px;
  }

  .spec-item .icon {
    font-size: 20px;
  }

  .spec-item .label {
    font-size: 10px;
  }


  /* Why buy */
  .why-buy-card {
    padding: 24px;

    border-radius: 16px;
  }

  .why-buy-card h5 {
    font-size: 18px;
  }


  /* Buttons */
  .btn-gold,
  .btn-outline-gold {
    width: 100%;

    text-align: center;
  }

  .btn-back-shop {
    font-size: 0.78rem;

    padding: 6px 14px;
  }
}

</style>

<!-- 562 lines -->