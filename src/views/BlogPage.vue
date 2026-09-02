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
      <!-- Blog Hero -->
      <section class="blog-hero">
        <div class="container">
          <h1>Our <span>Blog</span></h1>
          <p class="text-white-50">Insights, news, and stories from the world of luxury automobiles.</p>
        </div>
      </section>

      <!-- Blog Posts Grid -->
      <section class="container py-5">
        <div class="row g-4">
          <!-- Post 1 -->
          <div class="col-6 col-md-6 col-lg-4">
            <div class="blog-card">
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600"
                alt="Luxury Car"
              />
              <div class="body">
                <div class="date">May 15, 2026</div>
                <h5>Top 5 Supercars of 2026</h5>
                <p>From hybrid hypercars to naturally aspirated V12s, here's our definitive list.</p>
                <router-link to="#" class="read-more">
                  Read More <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Post 2 -->
          <div class="col-6 col-md-6 col-lg-4">
            <div class="blog-card">
              <img
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600"
                alt="EV"
              />
              <div class="body">
                <div class="date">May 8, 2026</div>
                <h5>Electric vs. Petrol: The Great Debate</h5>
                <p>We compare performance, range, and the visceral experience of both.</p>
                <router-link to="#" class="read-more">
                  Read More <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Post 3 -->
          <div class="col-6 col-md-6 col-lg-4">
            <div class="blog-card">
              <img
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600"
                alt="Maintenance"
              />
              <div class="body">
                <div class="date">April 28, 2026</div>
                <h5>How to Maintain Your Lamborghini</h5>
                <p>Essential tips to keep your Italian supercar in pristine condition.</p>
                <router-link to="#" class="read-more">
                  Read More <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Post 4 -->
          <div class="col-6 col-md-6 col-lg-4">
            <div class="blog-card">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600"
                alt="Porsche"
              />
              <div class="body">
                <div class="date">April 15, 2026</div>
                <h5>Porsche 911 Turbo S: A Legend Evolved</h5>
                <p>We take the latest 992 generation for a spin on the Autobahn.</p>
                <router-link to="#" class="read-more">
                  Read More <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Post 5 -->
          <div class="col-6 col-md-6 col-lg-4">
            <div class="blog-card">
              <img
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600"
                alt="Mercedes"
              />
              <div class="body">
                <div class="date">April 2, 2026</div>
                <h5>Mercedes-AMG GT 63 S Review</h5>
                <p>A four-door coupe that redefines the meaning of "practical performance".</p>
                <router-link to="#" class="read-more">
                  Read More <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Post 6 -->
          <div class="col-6 col-md-6 col-lg-4">
            <div class="blog-card">
              <img
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600"
                alt="Bentley"
              />
              <div class="body">
                <div class="date">March 20, 2026</div>
                <h5>Bentley Continental GT: The Grand Tourer</h5>
                <p>Luxury, speed, and craftsmanship combined in a single package.</p>
                <router-link to="#" class="read-more">
                  Read More <i class="fas fa-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
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
  name: 'BlogPage',
  data() {
    return {
      sidebarOpen: false,
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
  },
  mounted() {
    // If you have global listeners, import and call them here
    // e.g., import { attachSearchListeners } from '@/utils/global';
    // attachSearchListeners();
  },
};
</script>

<style scoped>
/* ── Page-specific styles (scoped to this component) ── */
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

/* ── Blog Hero ── */
.blog-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 60px 0 40px;
  color: white;
  text-align: center;
}
.blog-hero h1 {
  font-size: 42px;
  font-weight: 800;
}
.blog-hero h1 span {
  color: #ffc107;
}
.blog-hero p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
}

/* ── Blog Cards ── */
.blog-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  height: 100%;
}
.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.10);
}
.blog-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}
.blog-card .body {
  padding: 20px 22px 25px;
}
.blog-card .date {
  color: #ffc107;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.blog-card h5 {
  font-weight: 700;
  margin: 8px 0 10px;
}
.blog-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}
.blog-card .read-more {
  color: #1a1a2e;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}
.blog-card .read-more:hover {
  color: #ffc107;
}

/* ── Responsive ── */
@media (max-width: 576px) {
  .blog-card img {
    height: 150px;
  }
  .blog-card .body {
    padding: 14px 16px 18px;
  }
  .blog-card h5 {
    font-size: 16px;
  }
  .blog-card p {
    font-size: 13px;
  }
}
</style>