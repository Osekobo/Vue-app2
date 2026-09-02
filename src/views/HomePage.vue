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
      <!-- Hero -->
      <section class="hero">
        <div class="container hero-content">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="badge-new">Luxury Car Dealer</div>
              <h1>Discover Your <span>Dream Car</span></h1>
              <p>
                Explore our handpicked collection of the world's finest luxury, sports, and hypercars.
                From classic elegance to cutting-edge electric performance, we bring you the best
                of the automotive world.
              </p>
              <div>
                <router-link to="/shop" class="btn-custom">
                  Browse Collection <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
              <div class="hero-stats">
                <div class="stat-item">
                  <div class="number">500+</div>
                  <div class="label">Vehicles Sold</div>
                </div>
                <div class="stat-item">
                  <div class="number">98%</div>
                  <div class="label">Client Satisfaction</div>
                </div>
                <div class="stat-item">
                  <div class="number">12</div>
                  <div class="label">Years of Excellence</div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600"
                alt="Luxury Car"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Models -->
      <section class="container py-5" id="featuredSection">
        <div class="text-center mb-5">
          <h2>Featured Models</h2>
          <p>Discover our most popular luxury vehicles</p>
        </div>
        <div class="row g-4" id="featuredGrid">
          <div
            v-for="car in featuredCars"
            :key="car.id"
            class="col-6 col-md-4 col-lg-4"
          >
            <div class="car-card">
              <div class="car-image">
                <img :src="car.image" :alt="car.name" loading="lazy" />
              </div>
              <div class="card-body">
                <h5>{{ car.name }}</h5>
                <div class="subtitle">{{ car.subtitle || car.engine }}</div>
                <div class="price">
                  {{ car.display_price || '$' + Number(car.selling_price).toLocaleString() }}
                </div>
                <div class="spec-grid-home">
                  <div class="spec-item">
                    <span class="label"><i class="fa-solid fa-gear" title="Engine"></i></span>
                    <span class="value">{{ car.engine || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fa-solid fa-horse-head" title="Horsepower"></i></span>
                    <span class="value">{{ car.horsepower || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fa-solid fa-clock" title="0-60 mph"></i></span>
                    <span class="value">{{ car.zero_to_sixty || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fa-solid fa-gauge-high" title="Top Speed"></i></span>
                    <span class="value">{{ car.top_speed || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fa-solid fa-gears" title="Transmission"></i></span>
                    <span class="value">{{ car.transmission || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fa-solid fa-road" title="Drivetrain"></i></span>
                    <span class="value">{{ car.drivetrain || '—' }}</span>
                  </div>
                </div>
                <router-link
                  :to="{ path: '/car-details', query: { id: car.id } }"
                  class="btn-outline-gold-sm mt-2"
                  style="align-self:flex-start;"
                >
                  View Details <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link to="/shop" class="btn-outline-gold">
            View All Vehicles <i class="fas fa-arrow-right ms-2"></i>
          </router-link>
        </div>
      </section>

      <!-- Why Choose OBerlo -->
      <section class="container py-5">
        <div class="text-center mb-5">
          <h2>Why Choose OBerlo</h2>
          <p>Experience automotive excellence like never before</p>
        </div>
        <div class="row g-4">
          <div class="col-6 col-md-3">
            <div class="service-box">
              <i class="fas fa-shield-alt"></i>
              <h5>Certified Quality</h5>
              <p>Every vehicle undergoes a 150-point inspection and comes with a full service history.</p>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="service-box">
              <i class="fas fa-hand-holding-usd"></i>
              <h5>Flexible Financing</h5>
              <p>Tailored loans, leases, and payment plans with competitive rates to suit your budget.</p>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="service-box">
              <i class="fas fa-truck"></i>
              <h5>Free Nationwide Delivery</h5>
              <p>We deliver your dream car to your doorstep with full insurance and transparent tracking.</p>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="service-box">
              <i class="fas fa-headset"></i>
              <h5>24/7 Concierge Support</h5>
              <p>Our dedicated team is always ready to assist you with any query or request.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Premium Services -->
      <section class="py-5" style="background:#f0f2f5;">
        <div class="container">
          <div class="text-center mb-5">
            <h2>Our Premium Services</h2>
            <p>Beyond just selling cars – we deliver experiences</p>
          </div>
          <div class="row g-4">
            <div class="col-6 col-md-4">
              <div class="service-box">
                <i class="fas fa-calendar-check"></i>
                <h5>Test Drive</h5>
                <p>Book a personalized test drive at your convenience. Experience the thrill before you buy.</p>
                <router-link to="/test-drive" class="btn-outline-gold mt-2" style="font-size:14px; padding:6px 20px;">
                  Book Now
                </router-link>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div class="service-box">
                <i class="fas fa-hand-holding-usd"></i>
                <h5>Financing Solutions</h5>
                <p>We work with top lenders to offer you the best rates and flexible terms for your next purchase.</p>
                <router-link to="/financing" class="btn-outline-gold mt-2" style="font-size:14px; padding:6px 20px;">
                  Learn More
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="container py-5">
        <div class="text-center mb-5">
          <h2>What Our Clients Say</h2>
          <p>Real stories from real customers</p>
        </div>
        <div class="row g-4">
          <div class="col-6 col-md-4">
            <div class="testimonial-card">
              <div class="stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <p>"The experience was flawless. The team found me the exact spec I wanted and delivered the car to my home. Absolutely thrilled!"</p>
              <div class="client">
                <img src="https://ui-avatars.com/api/?name=James+Mitchell&size=50&background=ffc107&color=000&bold=true" alt="Client" />
                <div>
                  <div class="name">James Mitchell</div>
                  <div class="role">CEO, TechCorp</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4">
            <div class="testimonial-card">
              <div class="stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <p>"I traded in my old Porsche and upgraded to a Ferrari SF90. The trade-in valuation was fair and the entire process was smooth. Highly recommend!"</p>
              <div class="client">
                <img src="https://ui-avatars.com/api/?name=Sarah+Chen&size=50&background=ffc107&color=000&bold=true" alt="Client" />
                <div>
                  <div class="name">Sarah Chen</div>
                  <div class="role">Entrepreneur</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4">
            <div class="testimonial-card">
              <div class="stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <p>"The financing options made it possible for me to own my dream car. The team walked me through every step and I couldn't be happier."</p>
              <div class="client">
                <img src="https://ui-avatars.com/api/?name=Marcus+Wright&size=50&background=ffc107&color=000&bold=true" alt="Client" />
                <div>
                  <div class="name">Marcus Wright</div>
                  <div class="role">Tech Executive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Brands -->
      <section class="py-5" style="background:#f8f9fa;">
        <div class="container">
          <div class="text-center mb-4">
            <h5 style="color:#888; font-weight:300; letter-spacing:2px;">TRUSTED BY LEADING BRANDS</h5>
          </div>
          <div class="brand-grid">
            <span class="brand-item">Lamborghini</span>
            <span class="brand-item">Porsche</span>
            <span class="brand-item">Ferrari</span>
            <span class="brand-item">McLaren</span>
            <span class="brand-item">Bentley</span>
            <span class="brand-item">Audi</span>
            <span class="brand-item">Mercedes-AMG</span>
            <span class="brand-item">BMW M</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
// import { attachSearchListeners } from '@/utils/global';

export default {
  name: 'HomePage',
  data() {
    return {
      featuredCars: [],
      sidebarOpen: false,
    };
  },
  async mounted() {
    // Attach any global search listeners (if needed)
    // attachSearchListeners();

    // Load featured cars from API
    await this.loadFeaturedCars();
  },
  methods: {
    async loadFeaturedCars() {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
          withCredentials: true,
        });
        this.featuredCars = response.data.slice(0, 6);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
        // Optionally show an error message
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
};
</script>

<style scoped>
/* ── All styles from the original <style> block, minus navbar/footer overrides ── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
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

main {
  padding-top: 80px;
}

/* ── Hero ── */
.hero {
  min-height: 90vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920") center/cover;
  opacity: 0.15;
}
.hero-content {
  position: relative;
  z-index: 1;
  padding: 100px 0;
}
.hero .badge-new {
  background: #ffc107;
  color: #000;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 20px;
}
.hero h1 {
  font-size: 68px;
  font-weight: 800;
  color: white;
}
.hero h1 span {
  color: #ffc107;
}
.hero p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}
.btn-custom {
  background: #ffc107;
  color: #000;
  padding: 12px 35px;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
}
.btn-custom:hover {
  background: #ffca2c;
  transform: translateY(-3px);
}
.hero-stats {
  display: flex;
  gap: 40px;
  margin-top: 30px;
}
.hero-stats .stat-item {
  color: rgba(255, 255, 255, 0.8);
}
.hero-stats .stat-item .number {
  font-size: 28px;
  font-weight: 700;
  color: #ffc107;
}
.hero-stats .stat-item .label {
  font-size: 14px;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 40px;
  }
  .hero-stats {
    gap: 20px;
    flex-wrap: wrap;
  }
  .hero-stats .stat-item .number {
    font-size: 22px;
  }
  .sidebar-toggle {
    top: 70px;
    left: 10px;
    width: 40px;
    height: 40px;
  }
}

/* ── Car Cards ── */
.car-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.car-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}
.car-card .car-image {
  height: 220px;
  overflow: hidden;
}
.car-card .car-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.car-card:hover .car-image img {
  transform: scale(1.05);
}
.car-card .card-body {
  padding: 18px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.car-card .card-body h5 {
  font-weight: 700;
  margin-bottom: 4px;
}
.car-card .card-body .subtitle {
  font-size: 14px;
  color: #888;
}
.car-card .card-body .price {
  font-size: 20px;
  font-weight: 700;
  color: #ffc107;
  margin-top: 6px;
}
.spec-grid-home {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 8px 12px;
  margin: 10px 0 12px;
}
.spec-grid-home .spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  padding: 2px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.spec-grid-home .spec-item:last-child,
.spec-grid-home .spec-item:nth-last-child(2) {
  border-bottom: none;
}
.spec-grid-home .spec-item .label {
  color: #999;
  font-weight: 400;
  font-size: 12px;
  width: 22px;
  text-align: left;
}
.spec-grid-home .spec-item .value {
  color: #1a1a2e;
  font-weight: 600;
  font-size: 11px;
  text-align: right;
}
.btn-outline-gold-sm {
  background: transparent;
  color: #ffc107;
  border: 2px solid #ffc107;
  padding: 4px 16px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}
.btn-outline-gold-sm:hover {
  background: #ffc107;
  color: #000;
}
.btn-outline-gold {
  background: transparent;
  color: #ffc107;
  border: 2px solid #ffc107;
  padding: 8px 20px;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}
.btn-outline-gold:hover {
  background: #ffc107;
  color: #000;
}
.service-box {
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;
  height: 100%;
}
.service-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
}
.service-box i {
  font-size: 42px;
  color: #ffc107;
  margin-bottom: 16px;
}
.service-box h5 {
  font-weight: 700;
  color: #1a1a2e;
}
.service-box p {
  font-size: 14px;
  color: #777;
  margin: 0;
}
.testimonial-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;
  height: 100%;
  text-align: center;
}
.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
}
.testimonial-card .stars {
  color: #ffc107;
  margin-bottom: 10px;
  font-size: 18px;
}
.testimonial-card p {
  font-style: italic;
  color: #555;
  font-size: 15px;
  line-height: 1.7;
}
.testimonial-card .client {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}
.testimonial-card .client img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffc107;
}
.testimonial-card .client .name {
  font-weight: 600;
  color: #1a1a2e;
}
.testimonial-card .client .role {
  font-size: 13px;
  color: #888;
}
.brand-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  align-items: center;
}
.brand-grid .brand-item {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  opacity: 0.4;
  transition: opacity 0.3s;
  letter-spacing: 1px;
}
.brand-grid .brand-item:hover {
  opacity: 0.8;
}

@media (max-width: 576px) {
  .spec-grid-home {
    padding: 6px 10px;
    gap: 2px 8px;
  }
  .spec-grid-home .spec-item {
    font-size: 10px;
  }
  .spec-grid-home .spec-item .label {
    font-size: 11px;
    width: 18px;
  }
  .spec-grid-home .spec-item .value {
    font-size: 10px;
  }
}
</style>