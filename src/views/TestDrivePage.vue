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
      <section class="test-hero">
        <div class="container">
          <h1>Book a <span>Test Drive</span></h1>
          <p class="text-white-50">
            Experience the thrill behind the wheel. Select your car and
            preferred time.
          </p>
        </div>
      </section>

      <section class="container py-5">
        <div class="form-card">
          <form @submit.prevent="handleSubmit">
            <div class="row g-4">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="John Doe"
                  v-model="form.name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="john@example.com"
                  v-model="form.email"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Phone Number</label>
                <input
                  type="tel"
                  class="form-control"
                  placeholder="+1 (800) 555-0199"
                  v-model="form.phone"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Select Vehicle</label>
                <select class="form-select" v-model="form.vehicleId" required>
                  <option value="">Choose a car...</option>
                  <option v-for="p in products" :key="p.id" :value="p.id">
                    {{ p.name }} ({{ p.model || '—' }})
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Preferred Date</label>
                <input type="date" class="form-control" v-model="form.date" required />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Preferred Time</label>
                <input type="time" class="form-control" v-model="form.time" required />
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Additional Notes</label>
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Any specific requests..."
                  v-model="form.notes"
                ></textarea>
              </div>
              <div class="col-12">
                <button type="submit" class="btn-send" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                  <i class="fas fa-calendar-check me-2"></i>
                  {{ isSubmitting ? 'Sending...' : 'Request Test Drive' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'TestDrivePage',
  data() {
    return {
      sidebarOpen: false,
      products: [],
      loading: true,
      isSubmitting: false,
      form: {
        name: '',
        email: '',
        phone: '',
        vehicleId: '',
        date: '',
        time: '',
        notes: '',
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
        console.error('Error fetching products:', error);
        this.loading = false;
        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
      }
    },
    handleSubmit() {
      // You can send the form data to your API endpoint if needed.
      // For now, we just show a success message and reset.
      this.isSubmitting = true;
      // Simulate async submission
      setTimeout(() => {
        alert(
          '✅ Your test drive request has been sent! We\'ll confirm your slot within 24 hours.'
        );
        this.resetForm();
        this.isSubmitting = false;
      }, 800);
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        vehicleId: '',
        date: '',
        time: '',
        notes: '',
      };
    },
    async handleLogout() {
      try {
        await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.error('Logout error:', error);
      }
      this.$router.push('/login');
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
/* ── Page-specific styles ── */
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
.sidebar .nav-link.active {
  background: #ffc107;
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

/* ── Hero ── */
.test-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 60px 0 40px;
  color: white;
  text-align: center;
}
.test-hero h1 {
  font-size: 42px;
  font-weight: 800;
}
.test-hero h1 span {
  color: #ffc107;
}
.test-hero p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

/* ── Form ── */
.form-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  max-width: 800px;
  margin: 0 auto;
}
.form-card .form-control,
.form-card .form-select {
  border-radius: 30px;
  padding: 14px 22px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
}
.form-card .form-control:focus,
.form-card .form-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.12);
}

.btn-send {
  background: #ffc107;
  color: #000;
  padding: 16px 0;
  border-radius: 40px;
  font-weight: 700;
  border: none;
  width: 100%;
  font-size: 18px;
  transition: all 0.3s;
}
.btn-send:hover {
  background: #ffca2c;
  transform: translateY(-2px);
}
.btn-send:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-card {
    padding: 24px;
  }
}
</style>