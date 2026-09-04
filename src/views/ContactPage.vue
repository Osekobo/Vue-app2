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
          <a class="nav-link" href="#" @click.prevent="handleLogout">
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
          <h1>Get in <span>Touch</span></h1>

          <p>
            Have a question or want to schedule a private viewing? We'd love to
            hear from you.
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

                <p class="sub">Our team will respond within 24 hours.</p>

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
                      <button type="submit" class="btn-send">
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
                  Mombasa Road, Nairobi
                  <br />
                  Kenya
                </p>
              </div>

              <!-- Call Us -->
              <div class="contact-info-card">
                <div class="icon-wrap">
                  <i class="fas fa-phone-alt"></i>
                </div>

                <h5>Call Us</h5>

                <p>+254 700 123 456</p>
              </div>

              <!-- Email Us -->
              <div class="contact-info-card">
                <div class="icon-wrap">
                  <i class="fas fa-envelope"></i>
                </div>

                <h5>Email Us</h5>

                <p>hello@oberlo.co.ke</p>
              </div>

              <!-- Working Hours -->
              <div class="contact-info-card">
                <div class="icon-wrap">
                  <i class="fas fa-clock"></i>
                </div>

                <h5>Working Hours</h5>

                <p>
                  Mon–Sat: 8:00 AM – 6:00 PM EAT
                  <br />
                  Sunday: Closed
                </p>
              </div>

              <!-- Social Links -->
              <div class="contact-info-card social-card">
                <span class="follow-title"> Follow us: </span>

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

            <p>Find us on Mombasa Road, Nairobi</p>

            <small> Mombasa Road, Nairobi, Kenya </small>
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
          },
        );
      } catch (error) {
        console.error("Logout error:", error);
      }

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },

    handleSubmit() {
      alert(
        "Your message has been sent successfully. Our team will get back to you shortly.",
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

<style scoped src="../styles/pages/ContactPage.css"></style>
<!-- 600 lines -->
