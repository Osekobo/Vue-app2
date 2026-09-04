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
          <a class="nav-link" href="#" @click.prevent="handleLogout">
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
              <div class="badge-new">Nairobi's Trusted Motor Dealer</div>

              <h1>
                Discover Your
                <span>Dream Car</span>
              </h1>

              <p>
                Explore quality vehicles selected for Kenyan roads and
                lifestyles. From reliable daily drivers to luxury and
                performance cars, find your next vehicle in Nairobi.
              </p>

              <div class="hero-actions">
                <router-link to="/shop" class="btn-custom">
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
            <p>Discover our most popular luxury vehicles</p>
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
                  <img :src="car.image" :alt="car.name" loading="lazy" />

                  <div class="car-badge">Featured</div>
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
                      "KSh " + Number(car.selling_price).toLocaleString()
                    }}
                  </div>

                  <!-- SPECS -->
                  <div class="spec-grid-home">
                    <div class="spec-item">
                      <span class="label">
                        <i class="fa-solid fa-gear" title="Engine"></i>
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
                        <i class="fa-solid fa-clock" title="0-60 mph"></i>
                      </span>

                      <span class="value">
                        {{ car.zero_to_sixty || "—" }}
                      </span>
                    </div>

                    <div class="spec-item">
                      <span class="label">
                        <i class="fa-solid fa-gauge-high" title="Top Speed"></i>
                      </span>

                      <span class="value">
                        {{ car.top_speed || "—" }}
                      </span>
                    </div>

                    <div class="spec-item">
                      <span class="label">
                        <i class="fa-solid fa-gears" title="Transmission"></i>
                      </span>

                      <span class="value">
                        {{ car.transmission || "—" }}
                      </span>
                    </div>

                    <div class="spec-item">
                      <span class="label">
                        <i class="fa-solid fa-road" title="Drivetrain"></i>
                      </span>

                      <span class="value">
                        {{ car.drivetrain || "—" }}
                      </span>
                    </div>
                  </div>

                  <router-link
                    :to="{
                      path: '/car-details',
                      query: { id: car.id },
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
            <router-link to="/shop" class="btn-outline-gold">
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
            <p>Experience automotive excellence like never before</p>
          </div>

          <div class="services-grid four-columns">
            <div class="service-box">
              <div class="service-icon">
                <i class="fas fa-shield-alt"></i>
              </div>

              <h5>Certified Quality</h5>

              <p>
                Every vehicle undergoes a 150-point inspection and comes with a
                full service history.
              </p>
            </div>

            <div class="service-box">
              <div class="service-icon">
                <i class="fas fa-hand-holding-usd"></i>
              </div>

              <h5>Flexible Financing</h5>

              <p>
                Tailored loans, leases, and payment plans with competitive rates
                to suit your budget.
              </p>
            </div>

            <div class="service-box">
              <div class="service-icon">
                <i class="fas fa-truck"></i>
              </div>

              <h5>Kenya-Wide Delivery</h5>

              <p>
                We deliver your dream car to your doorstep with full insurance
                and transparent tracking.
              </p>
            </div>

            <div class="service-box">
              <div class="service-icon">
                <i class="fas fa-headset"></i>
              </div>

              <h5>24/7 Concierge Support</h5>

              <p>
                Our dedicated team is always ready to assist you with any query
                or request.
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
            <p>Beyond just selling cars – we deliver experiences</p>
          </div>

          <div class="services-grid two-columns">
            <div class="service-box premium-box">
              <div class="service-icon">
                <i class="fas fa-calendar-check"></i>
              </div>

              <h5>Test Drive</h5>

              <p>
                Book a personalized test drive at your convenience. Experience
                the thrill before you buy.
              </p>

              <router-link to="/test-drive" class="btn-outline-gold small-btn">
                Book Now
              </router-link>
            </div>

            <div class="service-box premium-box">
              <div class="service-icon">
                <i class="fas fa-hand-holding-usd"></i>
              </div>

              <h5>Financing Solutions</h5>

              <p>
                We work with top lenders to offer you the best rates and
                flexible terms for your next purchase.
              </p>

              <router-link to="/financing" class="btn-outline-gold small-btn">
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
            <p>Real stories from real customers</p>
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
                "The experience was flawless. The team found me the exact spec I
                wanted and delivered the car to my home. Absolutely thrilled!"
              </p>

              <div class="client">
                <img
                  src="https://ui-avatars.com/api/?name=James+Mitchell&size=50&background=ffc107&color=000&bold=true"
                  alt="James Mitchell"
                />

                <div>
                  <div class="name">James Mitchell</div>

                  <div class="role">CEO, TechCorp</div>
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
                "I traded in my old Porsche and upgraded to a Ferrari SF90. The
                trade-in valuation was fair and the entire process was smooth.
                Highly recommend!"
              </p>

              <div class="client">
                <img
                  src="https://ui-avatars.com/api/?name=Sarah+Chen&size=50&background=ffc107&color=000&bold=true"
                  alt="Sarah Chen"
                />

                <div>
                  <div class="name">Sarah Chen</div>

                  <div class="role">Entrepreneur</div>
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
                "The financing options made it possible for me to own my dream
                car. The team walked me through every step and I couldn't be
                happier."
              </p>

              <div class="client">
                <img
                  src="https://ui-avatars.com/api/?name=Marcus+Wright&size=50&background=ffc107&color=000&bold=true"
                  alt="Marcus Wright"
                />

                <div>
                  <div class="name">Marcus Wright</div>

                  <div class="role">Tech Executive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BRANDS -->
      <section class="brands-section">
        <div class="section-container">
          <div class="brand-heading">TRUSTED BY LEADING BRANDS</div>

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
        const response = await axios.get(`${API_BASE_URL}/products`, {
          withCredentials: true,
        });

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
};
</script>

<style scoped src="../styles/pages/HomePage.css"></style>

<!-- 800 lines -->
