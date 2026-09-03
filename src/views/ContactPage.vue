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
            <i class="fas fa-home"></i>
            Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-chart-line"></i>
            Dashboard
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/products">
            <i class="fas fa-car"></i>
            Inventory
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/purchases">
            <i class="fas fa-truck"></i>
            Purchase Orders
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/sales">
            <i class="fas fa-dollar-sign"></i>
            Vehicle Sales
          </router-link>
        </li>

        <li class="nav-item logout-btn">
          <a
            class="nav-link"
            href="#"
            @click.prevent="handleLogout"
          >
            <i class="fas fa-sign-out-alt"></i>
            Logout
          </a>
        </li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main>
      <!-- Contact Hero -->
      <section class="contact-hero">
        <div class="container hero-container">
          <h1>
            Get in <span>Touch</span>
          </h1>

          <p>
            Have a question or want to schedule a private viewing?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="contact-container">

          <!-- Contact Form + Info -->
          <div class="contact-layout">

            <!-- LEFT: FORM -->
            <div class="form-column">
              <div class="form-card">
                <h4>Send us a message</h4>

                <p class="sub">
                  Our team will respond within 24 hours.
                </p>

                <form @submit.prevent="handleSubmit">

                  <div class="form-grid">

                    <!-- Name -->
                    <div class="form-field half">
                      <input
                        type="text"
                        class="form-control-custom"
                        placeholder="Full Name"
                        v-model="form.name"
                        required
                      />
                    </div>

                    <!-- Email -->
                    <div class="form-field half">
                      <input
                        type="email"
                        class="form-control-custom"
                        placeholder="Email Address"
                        v-model="form.email"
                        required
                      />
                    </div>

                    <!-- Subject -->
                    <div class="form-field full">
                      <input
                        type="text"
                        class="form-control-custom"
                        placeholder="Subject"
                        v-model="form.subject"
                      />
                    </div>

                    <!-- Message -->
                    <div class="form-field full">
                      <textarea
                        class="form-control-custom"
                        placeholder="Your message..."
                        v-model="form.message"
                        required
                      ></textarea>
                    </div>

                    <!-- Submit -->
                    <div class="form-field full">
                      <button
                        type="submit"
                        class="btn-send"
                      >
                        Send Message
                        <i class="fas fa-paper-plane"></i>
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>

            <!-- RIGHT: CONTACT INFO -->
            <div class="info-column">

              <!-- Visit Us -->
              <div class="contact-info-card">
                <div class="icon-wrap">
                  <i class="fas fa-location-dot"></i>
                </div>

                <h5>Visit Us</h5>

                <p>
                  450 Park Avenue, Suite 1200
                  <br />
                  New York, NY 10022
                </p>
              </div>

              <!-- Call Us -->
              <div class="contact-info-card">
                <div class="icon-wrap">
                  <i class="fas fa-phone-alt"></i>
                </div>

                <h5>Call Us</h5>

                <p>
                  +1 (800) 555-0199
                </p>
              </div>

              <!-- Email Us -->
              <div class="contact-info-card">
                <div class="icon-wrap">
                  <i class="fas fa-envelope"></i>
                </div>

                <h5>Email Us</h5>

                <p>
                  concierge@oberlo.com
                </p>
              </div>

              <!-- Working Hours -->
              <div class="contact-info-card">
                <div class="icon-wrap">
                  <i class="fas fa-clock"></i>
                </div>

                <h5>Working Hours</h5>

                <p>
                  Mon–Sat: 9:00 AM – 7:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>

              <!-- Social Links -->
              <div class="contact-info-card social-card">
                <span class="follow-title">
                  Follow us:
                </span>

                <div class="social-links">
                  <a href="#" aria-label="Instagram">
                    <i class="fab fa-instagram"></i>
                  </a>

                  <a href="#" aria-label="YouTube">
                    <i class="fab fa-youtube"></i>
                  </a>

                  <a href="#" aria-label="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                  </a>

                  <a href="#" aria-label="Twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>

          <!-- MAP -->
          <div class="map-placeholder">
            <i class="fas fa-map-location-dot"></i>

            <p>
              Find us in the heart of New York
            </p>

            <small>
              450 Park Avenue, NYC
            </small>
          </div>

        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "ContactPage",

  data() {
    return {
      sidebarOpen: false,

      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },

  methods: {
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

    handleSubmit() {
      alert(
        "✅ Your message has been sent successfully! Our team will get back to you shortly."
      );

      this.form = {
        name: "",
        email: "",
        subject: "",
        message: "",
      };
    },
  },

  mounted() {
    // Add global listeners here if needed
  },
};
</script>

<style scoped>
/* =========================================================
   GLOBAL
========================================================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  padding-top: 80px;
  width: 100%;
}

/* =========================================================
   SIDEBAR
========================================================= */

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

  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.show {
  left: 0;
}

.sidebar-header {
  padding: 20px;

  border-bottom: 1px solid
    rgba(255, 255, 255, 0.1);

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

.sidebar .nav-link:hover i {
  color: #000;
}

.sidebar .logout-btn {
  margin-top: 30px;

  border-top: 1px solid
    rgba(255, 255, 255, 0.1);

  padding-top: 20px;
}

.sidebar .logout-btn .nav-link {
  color: #ff6b6b;
}

.sidebar .logout-btn .nav-link:hover {
  background: #ff6b6b;
  color: white;
}

/* =========================================================
   SIDEBAR TOGGLE
========================================================= */

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

/* =========================================================
   OVERLAY
========================================================= */

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

/* =========================================================
   CONTACT HERO
========================================================= */

.contact-hero {
  background:
    linear-gradient(
      135deg,
      #1a1a2e 0%,
      #16213e 100%
    );

  padding: 70px 0 60px;

  color: white;

  text-align: center;
}

.hero-container {
  max-width: 900px;
  margin: 0 auto;

  padding-left: 30px;
  padding-right: 30px;
}

.contact-hero h1 {
  font-size: 48px;
  font-weight: 800;

  margin-bottom: 15px;
}

.contact-hero h1 span {
  color: #ffc107;
}

.contact-hero p {
  color: rgba(255, 255, 255, 0.7);

  font-size: 18px;

  max-width: 650px;

  margin: 0 auto;

  line-height: 1.7;
}

/* =========================================================
   CONTACT SECTION
========================================================= */

.contact-section {
  padding: 70px 0 80px;

  background: #f8f9fa;
}

/* Main content width */
.contact-container {
  width: 100%;

  max-width: 1250px;

  margin: 0 auto;

  padding-left: 35px;
  padding-right: 35px;
}

/* =========================================================
   FORM + INFO LAYOUT
========================================================= */

.contact-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1.45fr)
    minmax(320px, 0.9fr);

  gap: 45px;

  align-items: stretch;
}

/* =========================================================
   FORM CARD
========================================================= */

.form-card {
  background: white;

  border-radius: 22px;

  padding: 38px;

  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.07);

  height: 100%;

  border: 1px solid rgba(0, 0, 0, 0.03);
}

.form-card h4 {
  font-weight: 700;

  color: #1a1a2e;

  margin-bottom: 7px;

  font-size: 25px;
}

.form-card .sub {
  color: #888;

  margin-bottom: 28px;

  font-size: 15px;
}

/* =========================================================
   FORM GRID
========================================================= */

.form-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 18px;
}

.form-field {
  min-width: 0;
}

.form-field.half {
  grid-column: span 1;
}

.form-field.full {
  grid-column: 1 / -1;
}

/* =========================================================
   INPUTS
========================================================= */

.form-control-custom {
  border-radius: 30px;

  padding: 14px 22px;

  border: 1px solid #e0e0e0;

  transition: all 0.3s;

  font-size: 15px;

  width: 100%;

  background: #fff;

  color: #1a1a2e;
}

.form-control-custom::placeholder {
  color: #999;
}

.form-control-custom:focus {
  border-color: #ffc107;

  box-shadow:
    0 0 0 4px
    rgba(255, 193, 7, 0.12);

  outline: none;
}

textarea.form-control-custom {
  border-radius: 20px;

  resize: vertical;

  min-height: 150px;
}

/* =========================================================
   SEND BUTTON
========================================================= */

.btn-send {
  background: #1a1a2e;

  color: white;

  border: none;

  padding: 15px 0;

  border-radius: 40px;

  font-weight: 600;

  transition: all 0.3s;

  width: 100%;

  font-size: 16px;

  cursor: pointer;
}

.btn-send:hover {
  background: #ffc107;

  color: #000;

  transform: translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(255, 193, 7, 0.2);
}

.btn-send i {
  margin-left: 10px;

  transition: transform 0.2s;
}

.btn-send:hover i {
  transform: translateX(5px);
}

/* =========================================================
   CONTACT INFO COLUMN
========================================================= */

.info-column {
  display: flex;

  flex-direction: column;

  gap: 18px;

  height: 100%;
}

/* =========================================================
   CONTACT INFO CARDS
========================================================= */

.contact-info-card {
  background: white;

  border-radius: 20px;

  padding: 24px 26px;

  box-shadow:
    0 6px 22px rgba(0, 0, 0, 0.06);

  transition: all 0.3s;

  width: 100%;

  border: 1px solid
    rgba(0, 0, 0, 0.03);

  display: flex;

  flex-direction: column;

  align-items: flex-start;

  justify-content: center;

  min-height: 150px;
}

.contact-info-card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 12px 30px
    rgba(0, 0, 0, 0.1);
}

/* =========================================================
   ICON
========================================================= */

.contact-info-card .icon-wrap {
  background:
    rgba(255, 193, 7, 0.12);

  width: 54px;

  height: 54px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  margin-bottom: 13px;
}

.contact-info-card .icon-wrap i {
  font-size: 23px;

  color: #ffc107;
}

/* =========================================================
   CARD TEXT
========================================================= */

.contact-info-card h5 {
  font-weight: 700;

  color: #1a1a2e;

  margin-bottom: 5px;

  font-size: 18px;
}

.contact-info-card p {
  color: #555;

  line-height: 1.6;

  margin: 0;

  font-size: 14px;
}

/* =========================================================
   SOCIAL CARD
========================================================= */

.social-card {
  min-height: 90px;

  flex-direction: row;

  align-items: center;

  justify-content: flex-start;

  gap: 18px;

  flex-wrap: wrap;
}

.follow-title {
  font-weight: 600;

  color: #1a1a2e;

  white-space: nowrap;
}

.social-links {
  display: flex;

  align-items: center;

  gap: 9px;
}

.social-links a {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 42px;

  height: 42px;

  border-radius: 50%;

  background: #f1f3f5;

  color: #1a1a2e;

  transition: all 0.3s;

  text-decoration: none;

  font-size: 17px;

  margin: 0;
}

.social-links a:hover {
  background: #ffc107;

  color: #000;

  transform: translateY(-3px);
}

/* =========================================================
   MAP
========================================================= */

.map-placeholder {
  background:
    linear-gradient(
      145deg,
      #e9ecef,
      #dee2e6
    );

  border-radius: 22px;

  height: 280px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  color: #555;

  overflow: hidden;

  position: relative;

  margin-top: 50px;

  width: 100%;

  box-shadow:
    0 6px 22px rgba(0, 0, 0, 0.05);
}

.map-placeholder i {
  font-size: 48px;

  color: #ffc107;

  margin-bottom: 12px;
}

.map-placeholder p {
  font-weight: 600;

  margin: 0 0 5px;

  font-size: 17px;
}

.map-placeholder small {
  color: #888;

  font-size: 14px;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 992px) {

  .contact-container {
    padding-left: 28px;
    padding-right: 28px;
  }

  .contact-layout {
    grid-template-columns: 1fr;

    gap: 30px;
  }

  .form-card {
    padding: 32px;
  }

  .info-column {
    display: grid;

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 18px;
  }

  .social-card {
    grid-column: 1 / -1;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 576px) {

  main {
    padding-top: 70px;
  }

  .sidebar-toggle {
    top: 70px;

    left: 10px;

    width: 40px;

    height: 40px;
  }

  /* Hero */

  .contact-hero {
    padding: 55px 0 45px;
  }

  .hero-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  .contact-hero h1 {
    font-size: 36px;
  }

  .contact-hero p {
    font-size: 15px;

    line-height: 1.6;
  }

  /* Section */

  .contact-section {
    padding: 45px 0 55px;
  }

  .contact-container {
    padding-left: 16px;
    padding-right: 16px;
  }

  /* Form */

  .form-card {
    padding: 25px 20px;

    border-radius: 18px;
  }

  .form-card h4 {
    font-size: 22px;
  }

  .form-grid {
    grid-template-columns: 1fr;

    gap: 15px;
  }

  .form-field.half,
  .form-field.full {
    grid-column: 1 / -1;
  }

  /* Info cards */

  .info-column {
    display: flex;

    flex-direction: column;

    gap: 15px;
  }

  .contact-info-card {
    padding: 20px;

    min-height: 135px;

    border-radius: 18px;
  }

  .contact-info-card .icon-wrap {
    width: 48px;

    height: 48px;
  }

  .contact-info-card .icon-wrap i {
    font-size: 20px;
  }

  .contact-info-card h5 {
    font-size: 16px;
  }

  .contact-info-card p {
    font-size: 13px;
  }

  /* Social */

  .social-card {
    min-height: auto;

    flex-direction: column;

    align-items: flex-start;

    gap: 12px;
  }

  .social-links {
    gap: 8px;
  }

  /* Map */

  .map-placeholder {
    margin-top: 35px;

    height: 220px;

    border-radius: 18px;

    text-align: center;

    padding: 20px;
  }

  .map-placeholder i {
    font-size: 40px;
  }

  .map-placeholder p {
    font-size: 15px;
  }

  .map-placeholder small {
    font-size: 12px;
  }
}
</style>
<!-- 600 lines -->