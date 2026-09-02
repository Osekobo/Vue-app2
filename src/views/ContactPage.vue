<template>
  <div>
    <!-- Sidebar toggle button -->
    <button class="sidebar-toggle" id="sidebarToggle" @click="sidebarOpen = true">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay (closes sidebar when clicked) -->
    <div class="overlay" :class="{ show: sidebarOpen }" @click="sidebarOpen = false"></div>

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
      <!-- Contact Hero -->
      <section class="contact-hero">
        <div class="container">
          <h1>Get in <span>Touch</span></h1>
          <p>Have a question or want to schedule a private viewing? We'd love to hear from you.</p>
        </div>
      </section>

      <!-- Contact Form + Info -->
      <section class="contact-section">
        <div class="container">
          <div class="row g-4">
            <!-- Left: Form -->
            <div class="col-lg-7">
              <div class="form-card">
                <h4>Send us a message</h4>
                <p class="sub">Our team will respond within 24 hours.</p>
                <form @submit.prevent="handleSubmit">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control-custom"
                        placeholder="Full Name"
                        v-model="form.name"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <input
                        type="email"
                        class="form-control-custom"
                        placeholder="Email Address"
                        v-model="form.email"
                        required
                      />
                    </div>
                    <div class="col-12">
                      <input
                        type="text"
                        class="form-control-custom"
                        placeholder="Subject"
                        v-model="form.subject"
                      />
                    </div>
                    <div class="col-12">
                      <textarea
                        class="form-control-custom"
                        placeholder="Your message..."
                        v-model="form.message"
                        required
                      ></textarea>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn-send">
                        Send Message <i class="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Right: Contact Info Cards -->
            <div class="col-lg-5">
              <div class="row g-3">
                <!-- Card 1: Visit Us -->
                <div class="col-6 col-md-12">
                  <div class="contact-info-card">
                    <div class="icon-wrap">
                      <i class="fas fa-location-dot"></i>
                    </div>
                    <h5>Visit Us</h5>
                    <p>450 Park Avenue, Suite 1200<br />New York, NY 10022</p>
                  </div>
                </div>
                <!-- Card 2: Call Us -->
                <div class="col-6 col-md-12">
                  <div class="contact-info-card">
                    <div class="icon-wrap">
                      <i class="fas fa-phone-alt"></i>
                    </div>
                    <h5>Call Us</h5>
                    <p>+1 (800) 555‑0199</p>
                  </div>
                </div>
                <!-- Card 3: Email Us -->
                <div class="col-6 col-md-12">
                  <div class="contact-info-card">
                    <div class="icon-wrap">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <h5>Email Us</h5>
                    <p>concierge@oberlo.com</p>
                  </div>
                </div>
                <!-- Card 4: Working Hours -->
                <div class="col-6 col-md-12">
                  <div class="contact-info-card">
                    <div class="icon-wrap">
                      <i class="fas fa-clock"></i>
                    </div>
                    <h5>Working Hours</h5>
                    <p>Mon–Sat: 9:00 AM – 7:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
                <!-- Card 5: Social Links -->
                <div class="col-12">
                  <div class="contact-info-card" style="flex-direction: row; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <span style="font-weight: 600; color: #1a1a2e; margin-right: 8px;">Follow us:</span>
                    <div class="social-links">
                      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                      <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                      <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                      <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="map-placeholder">
            <i class="fas fa-map-location-dot"></i>
            <p>Find us in the heart of New York</p>
            <small>450 Park Avenue, NYC</small>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'ContactPage',
  data() {
    return {
      sidebarOpen: false,
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
    };
  },
  methods: {
    async handleLogout() {
      try {
        await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.error('Logout error:', error);
      }
      this.$router.push('/login');
    },
    handleSubmit() {
      // Simulate sending the message
      alert('✅ Your message has been sent successfully! Our team will get back to you shortly.');
      // Reset form
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
    },
  },
  mounted() {
    // If you have global listeners, import and call them here
    // e.g., import { attachSearchListeners } from '@/utils/global';
    // attachSearchListeners();
  },
};
</script>

<style scoped>
/* ── All styles from original contact.html, scoped ── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  padding-top: 80px;
}

/* ── Sidebar ── */
.sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  bottom: 0;
  width: 280px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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

@media (max-width: 768px) {
  .sidebar-toggle {
    top: 70px;
    left: 10px;
    width: 40px;
    height: 40px;
  }
}

/* ── Contact Hero ── */
.contact-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 70px 0 60px;
  color: white;
  text-align: center;
}
.contact-hero h1 {
  font-size: 48px;
  font-weight: 800;
}
.contact-hero h1 span {
  color: #ffc107;
}
.contact-hero p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

/* ── Contact Section ── */
.contact-section {
  padding: 60px 0;
}

.contact-info-card {
  background: white;
  border-radius: 20px;
  padding: 30px 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.contact-info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.10);
}
.contact-info-card .icon-wrap {
  background: rgba(255, 193, 7, 0.12);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.contact-info-card .icon-wrap i {
  font-size: 26px;
  color: #ffc107;
}
.contact-info-card h5 {
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}
.contact-info-card p {
  color: #555;
  line-height: 1.6;
  margin: 0;
  font-size: 15px;
}

/* ── Form Card ── */
.form-card {
  background: white;
  border-radius: 20px;
  padding: 40px 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  height: 100%;
}
.form-card h4 {
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 6px;
}
.form-card .sub {
  color: #888;
  margin-bottom: 25px;
  font-size: 15px;
}

.form-control-custom {
  border-radius: 30px;
  padding: 12px 22px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
  font-size: 15px;
  width: 100%;
}
.form-control-custom:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.12);
  outline: none;
}
textarea.form-control-custom {
  border-radius: 20px;
  resize: vertical;
  min-height: 120px;
}

.btn-send {
  background: #1a1a2e;
  color: white;
  border: none;
  padding: 14px 0;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
  width: 100%;
  font-size: 16px;
}
.btn-send:hover {
  background: #ffc107;
  color: #000;
}
.btn-send i {
  margin-left: 10px;
  transition: transform 0.2s;
}
.btn-send:hover i {
  transform: translateX(5px);
}

/* ── Map Placeholder ── */
.map-placeholder {
  background: linear-gradient(145deg, #e9ecef, #dee2e6);
  border-radius: 20px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #555;
  overflow: hidden;
  position: relative;
  margin-top: 40px;
}
.map-placeholder i {
  font-size: 48px;
  color: #ffc107;
  margin-bottom: 12px;
}
.map-placeholder p {
  font-weight: 500;
  margin: 0;
}
.map-placeholder small {
  color: #888;
}

/* ── Social Links ── */
.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f1f3f5;
  color: #1a1a2e;
  transition: all 0.3s;
  margin-right: 8px;
  text-decoration: none;
  font-size: 18px;
}
.social-links a:hover {
  background: #ffc107;
  color: #000;
  transform: translateY(-3px);
}

/* ── Responsive ── */
@media (max-width: 576px) {
  .contact-info-card {
    padding: 20px 18px;
  }
  .contact-info-card .icon-wrap {
    width: 48px;
    height: 48px;
  }
  .contact-info-card .icon-wrap i {
    font-size: 20px;
  }
  .contact-info-card h5 {
    font-size: 15px;
  }
  .contact-info-card p {
    font-size: 13px;
  }
}
</style>