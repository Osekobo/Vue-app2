<template>
  <div class="home-page">
    <!-- Sidebar Toggle -->
    <button
      class="sidebar-toggle"
      id="sidebarToggle"
      @click="sidebarOpen = true"
      aria-label="Open navigation"
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
      <!-- HERO -->
      <section class="hero">
        <div class="hero-overlay"></div>

        <div class="hero-content">
          <div class="hero-layout">

            <!-- HERO TEXT -->
            <div class="hero-text">
              <div class="badge-new">
                Luxury Car Dealer
              </div>

              <h1>
                Discover Your
                <span>Dream Car</span>
              </h1>

              <p>
                Explore our handpicked collection of the world's finest
                luxury, sports, and hypercars. From classic elegance to
                cutting-edge electric performance, we bring you the best
                of the automotive world.
              </p>

              <div class="hero-actions">
                <router-link
                  to="/shop"
                  class="btn-custom"
                >
                  Browse Collection
                  <i class="fas fa-arrow-right"></i>
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

            <!-- ROUND CAR IMAGE -->
            <div class="hero-car">
              <div class="car-circle">
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600"
                  alt="Luxury Car"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- FEATURED MODELS -->
      <section class="featured-section">
        <div class="section-container">

          <div class="section-heading">
            <span class="section-label">OUR COLLECTION</span>
            <h2>Featured Models</h2>
            <p>
              Discover our most popular luxury vehicles
            </p>
          </div>

          <!-- FEATURED CARS -->
          <div class="featured-grid">
            <div
              v-for="car in featuredCars"
              :key="car.id"
              class="featured-card-wrapper"
            >
              <div class="car-card">

                <div class="car-image">
                  <img
                    :src="car.image"
                    :alt="car.name"
                    loading="lazy"
                  />

                  <div class="car-badge">
                    Featured
                  </div>
                </div>

                <div class="card-body">

                  <h5>
                    {{ car.name }}
                  </h5>

                  <div class="subtitle">
                    {{ car.subtitle || car.engine }}
                  </div>

                  <div class="price">
                    {{
                      car.display_price ||
                      "$" + Number(car.selling_price).toLocaleString()
                    }}
                  </div>

                  <!-- SPECS -->
                  <div class="spec-grid-home">

                    <div class="spec-item">
                      <span class="label">
                        <i
                          class="fa-solid fa-gear"
                          title="Engine"
                        ></i>
                      </span>

                      <span class="value">
                        {{ car.engine || "—" }}
                      </span>
                    </div>

                    <div class="spec-item">
                      <span class="label">
                        <i
                          class="fa-solid fa-horse-head"
                          title="Horsepower"
                        ></i>
                      </span>

                      <span class="value">
                        {{ car.horsepower || "—" }}
                      </span>
                    </div>

                    <div class="spec-item">
                      <span class="label">
                        <i
                          class="fa-solid fa-clock"
                          title="0-60 mph"
                        ></i>
                      </span>

                      <span class="value">
                        {{ car.zero_to_sixty || "—" }}
                      </span>
                    </div>

                    <div class="spec-item">
                      <span class="label">
                        <i
                          class="fa-solid fa-gauge-high"
                          title="Top Speed"
                        ></i>
                      </span>

                      <span class="value">
                        {{ car.top_speed || "—" }}
                      </span>
                    </div>

                    <div class="spec-item">
                      <span class="label">
                        <i
                          class="fa-solid fa-gears"
                          title="Transmission"
                        ></i>
                      </span>

                      <span class="value">
                        {{ car.transmission || "—" }}
                      </span>
                    </div>

                    <div class="spec-item">
                      <span class="label">
                        <i
                          class="fa-solid fa-road"
                          title="Drivetrain"
                        ></i>
                      </span>

                      <span class="value">
                        {{ car.drivetrain || "—" }}
                      </span>
                    </div>

                  </div>

                  <router-link
                    :to="{
                      path: '/car-details',
                      query: { id: car.id }
                    }"
                    class="btn-outline-gold-sm"
                  >
                    View Details
                    <i class="fas fa-arrow-right"></i>
                  </router-link>

                </div>
              </div>
            </div>
          </div>

          <!-- VIEW ALL -->
          <div class="section-button">
            <router-link
              to="/shop"
              class="btn-outline-gold"
            >
              View All Vehicles
              <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>

        </div>
      </section>

      <!-- WHY CHOOSE OBERLO -->
      <section class="services-section">
        <div class="section-container">

          <div class="section-heading">
            <span class="section-label">WHY OBERLO</span>
            <h2>Why Choose OBerlo?</h2>
            <p>
              Experience automotive excellence like never before
            </p>
          </div>

          <div class="services-grid four-columns">

            <div class="service-box">
              <div class="service-icon">
                <i class="fas fa-shield-alt"></i>
              </div>

              <h5>Certified Quality</h5>

              <p>
                Every vehicle undergoes a 150-point inspection
                and comes with a full service history.
              </p>
            </div>

            <div class="service-box">
              <div class="service-icon">
                <i class="fas fa-hand-holding-usd"></i>
              </div>

              <h5>Flexible Financing</h5>

              <p>
                Tailored loans, leases, and payment plans with
                competitive rates to suit your budget.
              </p>
            </div>

            <div class="service-box">
              <div class="service-icon">
                <i class="fas fa-truck"></i>
              </div>

              <h5>Free Nationwide Delivery</h5>

              <p>
                We deliver your dream car to your doorstep with
                full insurance and transparent tracking.
              </p>
            </div>

            <div class="service-box">
              <div class="service-icon">
                <i class="fas fa-headset"></i>
              </div>

              <h5>24/7 Concierge Support</h5>

              <p>
                Our dedicated team is always ready to assist
                you with any query or request.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- PREMIUM SERVICES -->
      <section class="premium-section">
        <div class="section-container">

          <div class="section-heading">
            <span class="section-label">OUR SERVICES</span>
            <h2>Our Premium Services</h2>
            <p>
              Beyond just selling cars – we deliver experiences
            </p>
          </div>

          <div class="services-grid two-columns">

            <div class="service-box premium-box">
              <div class="service-icon">
                <i class="fas fa-calendar-check"></i>
              </div>

              <h5>Test Drive</h5>

              <p>
                Book a personalized test drive at your convenience.
                Experience the thrill before you buy.
              </p>

              <router-link
                to="/test-drive"
                class="btn-outline-gold small-btn"
              >
                Book Now
              </router-link>
            </div>

            <div class="service-box premium-box">
              <div class="service-icon">
                <i class="fas fa-hand-holding-usd"></i>
              </div>

              <h5>Financing Solutions</h5>

              <p>
                We work with top lenders to offer you the best
                rates and flexible terms for your next purchase.
              </p>

              <router-link
                to="/financing"
                class="btn-outline-gold small-btn"
              >
                Learn More
              </router-link>
            </div>

          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="testimonials-section">
        <div class="section-container">

          <div class="section-heading">
            <span class="section-label">TESTIMONIALS</span>
            <h2>What Our Clients Say</h2>
            <p>
              Real stories from real customers
            </p>
          </div>

          <div class="testimonial-grid">

            <div class="testimonial-card">

              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>

              <p>
                "The experience was flawless. The team found me
                the exact spec I wanted and delivered the car to
                my home. Absolutely thrilled!"
              </p>

              <div class="client">
                <img
                  src="https://ui-avatars.com/api/?name=James+Mitchell&size=50&background=ffc107&color=000&bold=true"
                  alt="James Mitchell"
                />

                <div>
                  <div class="name">
                    James Mitchell
                  </div>

                  <div class="role">
                    CEO, TechCorp
                  </div>
                </div>
              </div>

            </div>

            <div class="testimonial-card">

              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>

              <p>
                "I traded in my old Porsche and upgraded to a
                Ferrari SF90. The trade-in valuation was fair
                and the entire process was smooth. Highly recommend!"
              </p>

              <div class="client">
                <img
                  src="https://ui-avatars.com/api/?name=Sarah+Chen&size=50&background=ffc107&color=000&bold=true"
                  alt="Sarah Chen"
                />

                <div>
                  <div class="name">
                    Sarah Chen
                  </div>

                  <div class="role">
                    Entrepreneur
                  </div>
                </div>
              </div>

            </div>

            <div class="testimonial-card">

              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>

              <p>
                "The financing options made it possible for me
                to own my dream car. The team walked me through
                every step and I couldn't be happier."
              </p>

              <div class="client">
                <img
                  src="https://ui-avatars.com/api/?name=Marcus+Wright&size=50&background=ffc107&color=000&bold=true"
                  alt="Marcus Wright"
                />

                <div>
                  <div class="name">
                    Marcus Wright
                  </div>

                  <div class="role">
                    Tech Executive
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- BRANDS -->
      <section class="brands-section">
        <div class="section-container">

          <div class="brand-heading">
            TRUSTED BY LEADING BRANDS
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
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "HomePage",

  data() {
    return {
      featuredCars: [],
      sidebarOpen: false,
    };
  },

  async mounted() {
    await this.loadFeaturedCars();
  },

  methods: {
    async loadFeaturedCars() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products`,
          {
            withCredentials: true,
          }
        );

        this.featuredCars = response.data.slice(0, 6);
      } catch (error) {
        console.error("Error fetching products:", error);

        if (error.response?.status === 401) {
          this.$router.push("/login");
        }
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
};
</script>

<style scoped>
/* =====================================================
   GLOBAL
===================================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-page {
  min-height: 100vh;
  background: #f8f9fa;
  color: #1a1a2e;
}

main {
  padding-top: 80px;
}

.section-container {
  width: min(1250px, calc(100% - 70px));
  margin: 0 auto;
}

/* =====================================================
   SIDEBAR
===================================================== */

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
  transition: left 0.3s ease;
  z-index: 1001;
  padding-top: 80px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
}

.sidebar.show {
  left: 0;
}

.sidebar-header {
  padding: 22px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}

.sidebar-header h4 {
  color: #ffc107;
  margin: 0;
  font-size: 24px;
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
  margin: 5px 0;
}

.sidebar .nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 13px 20px;
  transition: all 0.25s ease;
  font-weight: 500;
  border-radius: 9px;
  margin: 0 10px;
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

.sidebar .nav-link:hover i {
  color: #000;
}

.sidebar .nav-link.router-link-active {
  background: rgba(255, 193, 7, 0.15);
  color: #ffc107;
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

/* =====================================================
   SIDEBAR TOGGLE
===================================================== */

.sidebar-toggle {
  position: fixed;
  left: 20px;
  top: 95px;
  z-index: 1002;
  background: #ffc107;
  border: none;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.2);
}

.sidebar-toggle:hover {
  background: #ffca2c;
  transform: scale(1.08);
}

.sidebar-toggle i {
  font-size: 20px;
  color: #000;
}

/* =====================================================
   OVERLAY
===================================================== */

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1000;
  display: none;
  backdrop-filter: blur(2px);
}

.overlay.show {
  display: block;
}

/* =====================================================
   HERO
===================================================== */

.hero {
  min-height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #10101f 0%,
    #16213e 55%,
    #111827 100%
  );
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(15, 15, 30, 0.98) 0%,
      rgba(15, 15, 30, 0.82) 42%,
      rgba(15, 15, 30, 0.25) 100%
    ),
    url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920")
      center / cover;
  opacity: 0.8;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(1250px, calc(100% - 70px));
  margin: 0 auto;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 70px 0;
}

.hero-layout {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
  align-items: center;
  gap: 55px;
}

.hero-text {
  padding-left: 65px;
  max-width: 700px;
}

.badge-new {
  display: inline-block;
  background: #ffc107;
  color: #000;
  padding: 7px 17px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin-bottom: 22px;
}

.hero h1 {
  color: white;
  font-size: clamp(48px, 5vw, 68px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -2px;
  margin-bottom: 25px;
}

.hero h1 span {
  display: block;
  color: #ffc107;
}

.hero p {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 17px;
  line-height: 1.8;
  margin-bottom: 30px;
}

.hero-actions {
  margin-bottom: 35px;
}

.btn-custom {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #ffc107;
  color: #000;
  padding: 13px 28px;
  border-radius: 40px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.2);
}

.btn-custom:hover {
  background: #ffca2c;
  color: #000;
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(255, 193, 7, 0.3);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 45px;
}

.stat-item {
  color: rgba(255, 255, 255, 0.75);
}

.stat-item .number {
  color: #ffc107;
  font-size: 28px;
  line-height: 1;
  font-weight: 800;
  margin-bottom: 7px;
}

.stat-item .label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
}

/* =====================================================
   ROUND HERO CAR
===================================================== */

.hero-car {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 25px;
}

.car-circle {
  width: 370px;
  height: 370px;
  border-radius: 50%;
  padding: 10px;
  background: linear-gradient(
    135deg,
    rgba(255, 193, 7, 0.95),
    rgba(255, 193, 7, 0.15)
  );
  box-shadow:
    0 0 0 1px rgba(255, 193, 7, 0.15),
    0 25px 70px rgba(0, 0, 0, 0.45);
}

.car-circle img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 50%;
}

/* =====================================================
   SECTION HEADINGS
===================================================== */

.section-heading {
  text-align: center;
  margin-bottom: 45px;
}

.section-label {
  display: inline-block;
  color: #c99500;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.section-heading h2 {
  color: #1a1a2e;
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;
}

.section-heading p {
  color: #777;
  font-size: 15px;
  margin: 0;
}

/* =====================================================
   FEATURED SECTION
===================================================== */

.featured-section {
  background: #fff;
  padding: 85px 0 90px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;
}

.featured-card-wrapper {
  min-width: 0;
  display: flex;
}

.car-card {
  width: 100%;
  background: #fff;
  border-radius: 17px;
  overflow: hidden;
  border: 1px solid #eee;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.07);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.car-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.13);
}

.car-image {
  position: relative;
  height: 225px;
  overflow: hidden;
  background: #e9ecef;
}

.car-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.car-card:hover .car-image img {
  transform: scale(1.06);
}

.car-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #ffc107;
  color: #000;
  font-size: 11px;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 20px;
}

.card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-body h5 {
  color: #1a1a2e;
  font-size: 18px;
  font-weight: 750;
  margin-bottom: 5px;
}

.subtitle {
  color: #888;
  font-size: 13px;
  min-height: 20px;
}

.price {
  color: #d59d00;
  font-size: 22px;
  font-weight: 800;
  margin-top: 7px;
}

/* =====================================================
   CAR SPECS
===================================================== */

.spec-grid-home {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 12px;
  background: #f7f8fa;
  border: 1px solid #eef0f2;
  border-radius: 11px;
  padding: 10px 12px;
  margin: 15px 0 18px;
}

.spec-item {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
  padding: 4px 0;
  border-bottom: 1px solid #e9ecef;
}

.spec-item:nth-last-child(-n + 2) {
  border-bottom: none;
}

.spec-item .label {
  flex-shrink: 0;
  width: 20px;
  color: #999;
  font-size: 12px;
}

.spec-item .value {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #25283a;
  font-size: 11px;
  font-weight: 650;
  text-align: right;
}

/* =====================================================
   BUTTONS
===================================================== */

.btn-outline-gold-sm {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #b18100;
  background: transparent;
  border: 2px solid #ffc107;
  padding: 7px 17px;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  margin-top: auto;
}

.btn-outline-gold-sm:hover {
  background: #ffc107;
  color: #000;
}

.btn-outline-gold {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: transparent;
  color: #a97900;
  border: 2px solid #ffc107;
  padding: 10px 23px;
  border-radius: 40px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-outline-gold:hover {
  background: #ffc107;
  color: #000;
}

.section-button {
  text-align: center;
  margin-top: 45px;
}

/* =====================================================
   SERVICES
===================================================== */

.services-section {
  background: #f8f9fa;
  padding: 85px 0;
}

.services-grid {
  display: grid;
  gap: 28px;
}

.four-columns {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.two-columns {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.service-box {
  height: 100%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 17px;
  padding: 35px 25px;
  text-align: center;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.service-box:hover {
  transform: translateY(-7px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: rgba(255, 193, 7, 0.13);
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon i {
  color: #d59d00;
  font-size: 30px;
}

.service-box h5 {
  color: #1a1a2e;
  font-size: 18px;
  font-weight: 750;
  margin-bottom: 12px;
}

.service-box p {
  color: #777;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
}

/* =====================================================
   PREMIUM SERVICES
===================================================== */

.premium-section {
  background: #f0f2f5;
  padding: 85px 0;
}

.premium-box {
  padding: 40px;
}

.small-btn {
  margin-top: 22px;
  font-size: 13px;
  padding: 8px 22px;
}

/* =====================================================
   TESTIMONIALS
===================================================== */

.testimonials-section {
  background: #fff;
  padding: 85px 0;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;
}

.testimonial-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 17px;
  padding: 30px 27px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.stars {
  color: #ffc107;
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 17px;
}

.testimonial-card > p {
  flex: 1;
  color: #555;
  font-size: 14px;
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 22px;
}

.client {
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #eee;
  padding-top: 18px;
}

.client img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffc107;
}

.client .name {
  color: #1a1a2e;
  font-size: 14px;
  font-weight: 700;
}

.client .role {
  color: #888;
  font-size: 12px;
  margin-top: 2px;
}

/* =====================================================
   BRANDS
===================================================== */

.brands-section {
  background: #f8f9fa;
  padding: 60px 0;
}

.brand-heading {
  text-align: center;
  color: #999;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 30px;
}

.brand-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  align-items: center;
  justify-items: center;
}

.brand-item {
  color: #1a1a2e;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: 0.5px;
  opacity: 0.35;
  text-align: center;
  transition: opacity 0.25s ease;
}

.brand-item:hover {
  opacity: 0.8;
}

/* =====================================================
   LARGE TABLETS
===================================================== */

@media (max-width: 1100px) {
  .hero-text {
    padding-left: 30px;
  }

  .hero-layout {
    gap: 30px;
  }

  .car-circle {
    width: 330px;
    height: 330px;
  }

  .four-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* =====================================================
   TABLETS
===================================================== */

@media (max-width: 992px) {
  .section-container,
  .hero-content {
    width: min(900px, calc(100% - 45px));
  }

  .hero {
    min-height: auto;
  }

  .hero-content {
    min-height: auto;
    padding: 80px 0;
  }

  .hero-layout {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text {
    padding-left: 0;
    margin: 0 auto;
    max-width: 750px;
  }

  .hero p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    display: flex;
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .hero-car {
    justify-content: center;
    padding: 20px 0 0;
  }

  .featured-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .testimonial-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .testimonial-card:last-child {
    grid-column: 1 / -1;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
  }

  .brand-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 768px) {
  main {
    padding-top: 65px;
  }

  .section-container,
  .hero-content {
    width: calc(100% - 30px);
  }

  .sidebar-toggle {
    top: 78px;
    left: 12px;
    width: 42px;
    height: 42px;
  }

  .hero-content {
    padding: 65px 0;
  }

  .hero h1 {
    font-size: 46px;
    letter-spacing: -1px;
  }

  .hero p {
    font-size: 15px;
    line-height: 1.7;
  }

  .car-circle {
    width: 290px;
    height: 290px;
  }

  .hero-stats {
    gap: 25px;
  }

  .stat-item .number {
    font-size: 23px;
  }

  .featured-section,
  .services-section,
  .premium-section,
  .testimonials-section {
    padding: 65px 0;
  }

  .section-heading {
    margin-bottom: 35px;
  }

  .section-heading h2 {
    font-size: 30px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
    max-width: 550px;
    margin: 0 auto;
  }

  .two-columns {
    grid-template-columns: 1fr;
  }

  .testimonial-grid {
    grid-template-columns: 1fr;
    max-width: 550px;
    margin: 0 auto;
  }

  .testimonial-card:last-child {
    grid-column: auto;
    max-width: none;
  }

  .brand-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 22px 15px;
  }
}

/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 576px) {
  .section-container,
  .hero-content {
    width: calc(100% - 24px);
  }

  .hero-content {
    padding: 55px 0;
  }

  .hero h1 {
    font-size: 39px;
  }

  .hero p {
    font-size: 14px;
  }

  .badge-new {
    font-size: 11px;
    padding: 6px 13px;
  }

  .btn-custom {
    padding: 11px 21px;
    font-size: 13px;
  }

  .hero-stats {
    gap: 18px;
    flex-wrap: wrap;
  }

  .stat-item .number {
    font-size: 20px;
  }

  .stat-item .label {
    font-size: 10px;
  }

  .car-circle {
    width: 240px;
    height: 240px;
    padding: 7px;
  }

  .car-image {
    height: 195px;
  }

  .card-body {
    padding: 17px;
  }

  .card-body h5 {
    font-size: 17px;
  }

  .price {
    font-size: 20px;
  }

  .spec-grid-home {
    padding: 8px 9px;
    gap: 4px 8px;
  }

  .spec-item .label {
    width: 18px;
    font-size: 11px;
  }

  .spec-item .value {
    font-size: 10px;
  }

  .service-box {
    padding: 28px 20px;
  }

  .premium-box {
    padding: 30px 20px;
  }

  .testimonial-card {
    padding: 25px 20px;
  }

  .brand-item {
    font-size: 16px;
  }
}
</style>

<!-- 800 lines -->