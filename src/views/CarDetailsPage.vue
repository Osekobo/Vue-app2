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
          <h1 class="text-white">⚠️ Error</h1>
          <p class="text-white-50">{{ error }}</p>
          <router-link to="/shop" class="btn-gold mt-3">Back to Shop</router-link>
        </div>
      </div>

      <!-- Car not found -->
      <div v-else-if="!car" class="detail-hero">
        <div class="container car-not-found">
          <h1 class="text-white">🚗 Car Not Found</h1>
          <p class="text-white-50">Sorry, we couldn't find the vehicle you're looking for.</p>
          <router-link to="/shop" class="btn-gold mt-3">Browse Our Collection</router-link>
        </div>
      </div>

      <!-- Car details (loaded) -->
      <template v-else>
        <!-- Detail Hero -->
        <section class="detail-hero">
          <div class="container">
            <div class="row g-4 align-items-center">
              <div class="col-lg-7">
                <img
                  :src="car.hero_image || car.image || ''"
                  :alt="car.name"
                  class="img-fluid rounded-4"
                  style="width:100%; max-height:450px; object-fit:cover;"
                />
              </div>
              <div class="col-lg-5 text-white">
                <router-link to="/shop" class="btn-back-shop">
                  <i class="fas fa-arrow-left"></i> Back to Shop
                </router-link>
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <span class="spec-badge">{{ car.badge || 'Featured' }}</span>
                    <h1 class="display-5 fw-bold mt-2">{{ car.name }}</h1>
                    <p class="text-warning display-6 fw-bold">
                      {{ car.display_price || '$' + Number(car.selling_price).toLocaleString() }}
                    </p>
                  </div>
                  <span class="badge bg-warning text-dark p-2">In Stock</span>
                </div>
                <p class="text-white-50">{{ car.subtitle || car.engine || '' }}</p>
                <div class="d-flex flex-wrap gap-3 mt-3">
                  <router-link to="/test-drive" class="btn-gold">
                    <i class="fas fa-calendar-check me-2"></i>Book Test Drive
                  </router-link>
                  <router-link to="/financing" class="btn-outline-gold">
                    Finance Options
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Body: Specs & Description -->
        <section class="container py-5">
          <div class="row g-4">
            <div class="col-lg-8">
              <h3 class="fw-bold">Overview</h3>
              <p class="text-secondary">{{ car.description || 'No description available.' }}</p>
              <div class="row g-3 mt-3">
                <div class="col-4 col-md-2">
                  <div class="spec-item">
                    <span class="icon"><i class="fa-solid fa-gear"></i></span>
                    <div class="label">Engine</div>
                    <div class="value">{{ car.engine || '—' }}</div>
                  </div>
                </div>
                <div class="col-4 col-md-2">
                  <div class="spec-item">
                    <span class="icon"><i class="fa-solid fa-horse-head"></i></span>
                    <div class="label">Horsepower</div>
                    <div class="value">{{ car.horsepower || '—' }}</div>
                  </div>
                </div>
                <div class="col-4 col-md-2">
                  <div class="spec-item">
                    <span class="icon"><i class="fa-solid fa-clock"></i></span>
                    <div class="label">0-60 mph</div>
                    <div class="value">{{ car.zero_to_sixty || '—' }}</div>
                  </div>
                </div>
                <div class="col-4 col-md-2">
                  <div class="spec-item">
                    <span class="icon"><i class="fa-solid fa-gauge-high"></i></span>
                    <div class="label">Top Speed</div>
                    <div class="value">{{ car.top_speed || '—' }}</div>
                  </div>
                </div>
                <div class="col-4 col-md-2">
                  <div class="spec-item">
                    <span class="icon"><i class="fa-solid fa-gears"></i></span>
                    <div class="label">Transmission</div>
                    <div class="value">{{ car.transmission || '—' }}</div>
                  </div>
                </div>
                <div class="col-4 col-md-2">
                  <div class="spec-item">
                    <span class="icon"><i class="fa-solid fa-road"></i></span>
                    <div class="label">Drivetrain</div>
                    <div class="value">{{ car.drivetrain || '—' }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="bg-white p-4 rounded-4 shadow-sm">
                <h5 class="fw-bold">Why Buy From OBerlo?</h5>
                <ul class="list-unstyled mt-3">
                  <li v-for="(feature, index) in features" :key="index" class="mb-2">
                    <i class="fa-solid fa-check-circle text-warning me-2"></i> {{ feature }}
                  </li>
                  <li v-if="!features.length" class="text-muted">No features listed</li>
                </ul>
                <hr />
                <p class="mb-0"><i class="fa-solid fa-phone-alt me-2"></i> Call us: +1 (800) 555-0199</p>
              </div>
            </div>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'CarDetailsPage',
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
        const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
          withCredentials: true,
        });
        this.car = response.data;
      } catch (err) {
        if (err.response?.status === 404) {
          this.car = null;
          this.error = null; // handled by v-else-if="!car"
        } else {
          this.error = err.message || 'Failed to load vehicle details.';
        }
      } finally {
        this.loading = false;
      }
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
    const id = this.$route.query.id;
    if (id) {
      this.fetchCar(id);
    } else {
      this.loading = false;
      this.car = null; // will show "No Car Specified"
    }
  },
  watch: {
    '$route.query.id'(newId) {
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
/* ── All styles from the original car-details.html, scoped ── */
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

/* ── Detail Hero ── */
.detail-hero {
  background: #1a1a2e;
  padding: 40px 0 30px;
}

.spec-badge {
  background: rgba(255, 193, 7, 0.12);
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
  color: #ffc107;
  font-weight: 600;
  display: inline-block;
}

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

.btn-back-shop {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 18px;
  border-radius: 40px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}
.btn-back-shop:hover {
  background: rgba(255, 193, 7, 0.12);
  color: #ffc107;
  border-color: rgba(255, 193, 7, 0.2);
  transform: translateX(-4px);
}
.btn-back-shop i {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}
.btn-back-shop:hover i {
  transform: translateX(-4px);
}

.car-not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* ── Spec Items ── */
.spec-item {
  background: white;
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  text-align: center;
  height: 100%;
  transition: transform 0.3s ease;
}
.spec-item:hover {
  transform: translateY(-4px);
}
.spec-item .icon {
  font-size: 22px;
  color: #ffc107;
  display: block;
  margin-bottom: 4px;
}
.spec-item .label {
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.spec-item .value {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
}

@media (max-width: 576px) {
  .btn-back-shop {
    font-size: 0.78rem;
    padding: 6px 14px;
  }
  .spec-item .value {
    font-size: 16px;
  }
  .spec-item .icon {
    font-size: 18px;
  }
}
</style>