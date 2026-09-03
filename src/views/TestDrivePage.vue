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
          <a
            class="nav-link"
            href="#"
            @click.prevent="handleLogout"
          >
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
          <h1>
            Book a <span>Test Drive</span>
          </h1>

          <p>
            Experience the thrill behind the wheel. Select your car
            and preferred time.
          </p>
        </div>
      </section>

      <!-- Form Section -->
      <section class="test-drive-section">

        <!-- Section heading -->
        <div class="section-heading">
          <h2>Schedule Your Test Drive</h2>
          <p>
            Fill in your details below and choose the vehicle,
            date, and time that works best for you.
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
                <label class="form-label">
                  Full Name
                </label>

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
                <label class="form-label">
                  Email Address
                </label>

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
                <label class="form-label">
                  Phone Number
                </label>

                <div class="input-wrapper">
                  <i class="fas fa-phone input-icon"></i>

                  <input
                    type="tel"
                    class="form-control"
                    placeholder="+1 (800) 555-0199"
                    v-model="form.phone"
                    required
                  />
                </div>
              </div>

              <!-- Vehicle -->
              <div class="form-group">
                <label class="form-label">
                  Select Vehicle
                </label>

                <div class="input-wrapper">
                  <i class="fas fa-car input-icon"></i>

                  <select
                    class="form-select"
                    v-model="form.vehicleId"
                    required
                  >
                    <option value="">
                      Choose a car...
                    </option>

                    <option
                      v-for="p in products"
                      :key="p.id"
                      :value="p.id"
                    >
                      {{ p.name }} ({{ p.model || "—" }})
                    </option>
                  </select>
                </div>
              </div>

              <!-- Date -->
              <div class="form-group">
                <label class="form-label">
                  Preferred Date
                </label>

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
                <label class="form-label">
                  Preferred Time
                </label>

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
                <label class="form-label">
                  Additional Notes
                </label>

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

              <button
                type="submit"
                class="btn-send"
                :disabled="isSubmitting"
              >
                <span
                  v-if="isSubmitting"
                  class="spinner-border spinner-border-sm"
                ></span>

                <i
                  v-else
                  class="fas fa-calendar-check"
                ></i>

                <span>
                  {{
                    isSubmitting
                      ? "Sending..."
                      : "Request Test Drive"
                  }}
                </span>
              </button>

              <p class="form-note">
                <i class="fas fa-shield-alt"></i>
                Your information is safe and will only be used
                to arrange your test drive.
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
        const response = await axios.get(
          `${API_BASE_URL}/products`,
          {
            withCredentials: true,
          }
        );

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
          "✅ Your test drive request has been sent! We'll confirm your slot within 24 hours."
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
          }
        );
      } catch (error) {
        console.error("Logout error:", error);
      }

      this.$router.push("/login");
    },
  },

  mounted() {
    this.fetchProducts();
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
  min-height: 100vh;
  background: #f7f8fa;
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
    2px 0 20px rgba(0, 0, 0, 0.15);
}

.sidebar.show {
  left: 0;
}

.sidebar-header {
  padding: 24px 22px;

  margin-bottom: 20px;

  border-bottom:
    1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h4 {
  color: #ffc107;

  margin: 0;

  font-size: 22px;

  font-weight: 800;
}

.sidebar-header p {
  color: rgba(255, 255, 255, 0.6);

  font-size: 12px;

  margin: 6px 0 0;
}

.sidebar-menu {
  list-style: none;

  padding: 0;

  margin: 0;
}

.sidebar .nav-item {
  margin: 6px 0;
}

.sidebar .nav-link {
  color: white;

  text-decoration: none;

  display: flex;

  align-items: center;

  padding: 13px 20px;

  transition: all 0.3s;

  font-weight: 500;

  border-radius: 10px;

  margin: 0 12px;
}

.sidebar .nav-link i {
  width: 25px;

  margin-right: 15px;

  font-size: 17px;
}

.sidebar .nav-link:hover {
  background: #ffc107;

  color: #000;

  transform: translateX(5px);
}

.sidebar .nav-link.active {
  background: #ffc107;

  color: #000;
}

.sidebar .logout-btn {
  margin-top: 35px;

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
    0 4px 15px rgba(0, 0, 0, 0.2);
}

.sidebar-toggle:hover {
  background: #ffca2c;

  transform: scale(1.05);
}

.sidebar-toggle i {
  font-size: 20px;

  color: #000;
}

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
   HERO
========================================= */

.test-hero {
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 100%
  );

  padding: 65px 20px 60px;

  color: white;

  text-align: center;
}

.hero-container {
  width: 100%;

  max-width: 900px;

  margin: 0 auto;
}

.test-hero h1 {
  font-size: 44px;

  font-weight: 800;

  line-height: 1.2;

  margin-bottom: 14px;
}

.test-hero h1 span {
  color: #ffc107;
}

.test-hero p {
  color: rgba(255, 255, 255, 0.72);

  font-size: 18px;

  max-width: 650px;

  margin: 0 auto;

  line-height: 1.7;
}


/* =========================================
   MAIN FORM SECTION
========================================= */

.test-drive-section {
  width: 100%;

  max-width: 1150px;

  margin: 0 auto;

  padding: 70px 35px 90px;
}


/* =========================================
   SECTION HEADING
========================================= */

.section-heading {
  text-align: center;

  margin-bottom: 38px;
}

.section-heading h2 {
  color: #1a1a2e;

  font-size: 30px;

  font-weight: 800;

  margin-bottom: 10px;
}

.section-heading p {
  color: #777;

  font-size: 15px;

  max-width: 650px;

  margin: 0 auto;

  line-height: 1.7;
}


/* =========================================
   FORM CARD
========================================= */

.form-card {
  width: 100%;

  max-width: 1000px;

  margin: 0 auto;

  background: #ffffff;

  border-radius: 24px;

  padding: 40px;

  border: 1px solid #eeeeee;

  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.07);
}


/* =========================================
   FORM HEADER
========================================= */

.form-header {
  display: flex;

  align-items: center;

  gap: 18px;

  margin-bottom: 25px;
}

.form-header-icon {
  width: 58px;

  height: 58px;

  flex-shrink: 0;

  border-radius: 16px;

  background: rgba(255, 193, 7, 0.13);

  display: flex;

  align-items: center;

  justify-content: center;
}

.form-header-icon i {
  font-size: 25px;

  color: #ffc107;
}

.form-header h3 {
  color: #1a1a2e;

  font-size: 23px;

  font-weight: 800;

  margin-bottom: 5px;
}

.form-header p {
  color: #777;

  font-size: 14px;

  margin: 0;
}

.form-divider {
  height: 1px;

  background: #eeeeee;

  margin-bottom: 32px;
}


/* =========================================
   FORM GRID
========================================= */

.form-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 26px 28px;
}

.form-group {
  width: 100%;
}

.full-width {
  grid-column: 1 / -1;
}


/* =========================================
   LABELS
========================================= */

.form-label {
  display: block;

  color: #1a1a2e;

  font-size: 14px;

  font-weight: 700;

  margin-bottom: 9px;
}


/* =========================================
   INPUTS
========================================= */

.input-wrapper {
  position: relative;

  width: 100%;
}

.input-icon {
  position: absolute;

  left: 18px;

  top: 50%;

  transform: translateY(-50%);

  color: #999;

  font-size: 14px;

  z-index: 2;

  pointer-events: none;
}

.form-card .form-control,
.form-card .form-select {
  width: 100%;

  height: 52px;

  border-radius: 12px;

  border: 1px solid #dedede;

  background: #ffffff;

  padding: 12px 18px 12px 46px;

  font-size: 14px;

  color: #333;

  transition: all 0.25s ease;
}

.form-card .form-control::placeholder {
  color: #aaa;
}

.form-card .form-control:focus,
.form-card .form-select:focus {
  border-color: #ffc107;

  box-shadow:
    0 0 0 4px rgba(255, 193, 7, 0.12);

  outline: none;
}

.form-card .form-control:focus + .input-icon {
  color: #ffc107;
}


/* =========================================
   TEXTAREA
========================================= */

.textarea-wrapper {
  position: relative;

  width: 100%;
}

.textarea-icon {
  position: absolute;

  left: 18px;

  top: 18px;

  color: #999;

  font-size: 14px;

  z-index: 2;

  pointer-events: none;
}

.form-card textarea.form-control {
  height: auto;

  min-height: 125px;

  resize: vertical;

  padding-top: 15px;

  padding-left: 46px;

  line-height: 1.6;
}


/* =========================================
   SUBMIT SECTION
========================================= */

.submit-section {
  margin-top: 32px;

  padding-top: 30px;

  border-top: 1px solid #eeeeee;

  text-align: center;
}

.btn-send {
  width: 100%;

  height: 56px;

  background: #ffc107;

  color: #000;

  border: none;

  border-radius: 12px;

  font-size: 16px;

  font-weight: 750;

  cursor: pointer;

  transition: all 0.3s ease;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;
}

.btn-send:hover {
  background: #ffca2c;

  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(255, 193, 7, 0.25);
}

.btn-send:disabled {
  opacity: 0.7;

  cursor: not-allowed;

  transform: none;

  box-shadow: none;
}

.btn-send i {
  font-size: 17px;
}

.form-note {
  color: #999;

  font-size: 12px;

  margin: 14px 0 0;

  line-height: 1.5;
}

.form-note i {
  margin-right: 5px;

  color: #ffc107;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 992px) {

  .test-drive-section {
    padding-left: 28px;

    padding-right: 28px;
  }

  .form-card {
    padding: 32px;
  }

  .form-grid {
    gap: 22px 24px;
  }
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 767px) {

  main {
    padding-top: 70px;
  }

  .sidebar-toggle {
    top: 70px;

    left: 12px;

    width: 42px;

    height: 42px;
  }

  .test-hero {
    padding: 50px 20px 45px;
  }

  .test-hero h1 {
    font-size: 34px;
  }

  .test-hero p {
    font-size: 15px;
  }

  .test-drive-section {
    padding: 50px 20px 70px;
  }

  .section-heading {
    margin-bottom: 30px;
  }

  .section-heading h2 {
    font-size: 25px;
  }

  .section-heading p {
    font-size: 14px;
  }

  .form-card {
    padding: 25px 20px;

    border-radius: 20px;
  }

  .form-header {
    gap: 14px;

    align-items: flex-start;
  }

  .form-header-icon {
    width: 50px;

    height: 50px;

    border-radius: 13px;
  }

  .form-header-icon i {
    font-size: 21px;
  }

  .form-header h3 {
    font-size: 20px;
  }

  .form-header p {
    font-size: 13px;
  }

  .form-divider {
    margin-bottom: 25px;
  }

  .form-grid {
    grid-template-columns: 1fr;

    gap: 20px;
  }

  .full-width {
    grid-column: auto;
  }

  .submit-section {
    margin-top: 25px;

    padding-top: 25px;
  }

  .btn-send {
    height: 53px;

    font-size: 15px;
  }
}


/* =========================================
   SMALL PHONES
========================================= */

@media (max-width: 480px) {

  .test-hero h1 {
    font-size: 29px;
  }

  .test-drive-section {
    padding-left: 16px;

    padding-right: 16px;
  }

  .form-card {
    padding: 22px 16px;
  }

  .form-header h3 {
    font-size: 18px;
  }

  .form-header p {
    font-size: 12px;
  }

  .form-card .form-control,
  .form-card .form-select {
    height: 50px;

    padding-left: 43px;
  }

  .form-card textarea.form-control {
    min-height: 110px;

    padding-left: 43px;
  }
}
</style>


<!-- 450 lines -->