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
          <a class="nav-link" href="#" @click.prevent="handleLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main>
      <!-- Blog Hero -->
      <section class="blog-hero">
        <div class="hero-container">
          <h1>Our <span>Blog</span></h1>

          <p>
            Insights, news, and stories from the world of luxury automobiles.
          </p>
        </div>
      </section>

      <!-- Blog Posts -->
      <section class="blog-section">
        <div class="section-heading">
          <h2>Latest From OBerlo</h2>

          <p>
            Discover the latest automotive news, reviews, guides, and stories
            from the world of luxury cars.
          </p>
        </div>

        <div class="blog-grid">
          <!-- Post 1 -->
          <article class="blog-card">
            <div class="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600"
                alt="Luxury Car"
              />

              <span class="category">Supercars</span>
            </div>

            <div class="blog-body">
              <div class="date">May 15, 2026</div>

              <h5>Top 5 Supercars of 2026</h5>

              <p>
                From hybrid hypercars to naturally aspirated V12s, here's our
                definitive list.
              </p>

              <router-link to="/blog/top-5-supercars-2026" class="read-more">
                Read More
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </article>

          <!-- Post 2 -->
          <article class="blog-card">
            <div class="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600"
                alt="Electric Vehicle"
              />

              <span class="category">Electric</span>
            </div>

            <div class="blog-body">
              <div class="date">May 8, 2026</div>

              <h5>Electric vs. Petrol: The Great Debate</h5>

              <p>
                We compare performance, range, and the visceral experience of
                both.
              </p>

              <router-link to="/blog/electric-vs-petrol" class="read-more">
                Read More
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </article>

          <!-- Post 3 -->
          <article class="blog-card">
            <div class="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600"
                alt="Car Maintenance"
              />

              <span class="category">Maintenance</span>
            </div>

            <div class="blog-body">
              <div class="date">April 28, 2026</div>

              <h5>How to Maintain Your Lamborghini</h5>

              <p>
                Essential tips to keep your Italian supercar in pristine
                condition.
              </p>

              <router-link
                to="/blog/maintain-your-lamborghini"
                class="read-more"
              >
                Read More
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </article>

          <!-- Post 4 -->
          <article class="blog-card">
            <div class="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600"
                alt="Porsche"
              />

              <span class="category">Reviews</span>
            </div>

            <div class="blog-body">
              <div class="date">April 15, 2026</div>

              <h5>Porsche 911 Turbo S: A Legend Evolved</h5>

              <p>
                We take the latest 992 generation for a spin on the Autobahn.
              </p>

              <router-link
                to="/blog/porsche-911-turbo-s-review"
                class="read-more"
              >
                Read More
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </article>

          <!-- Post 5 -->
          <article class="blog-card">
            <div class="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600"
                alt="Mercedes"
              />

              <span class="category">Reviews</span>
            </div>

            <div class="blog-body">
              <div class="date">April 2, 2026</div>

              <h5>Mercedes-AMG GT 63 S Review</h5>

              <p>
                A four-door coupe that redefines the meaning of practical
                performance.
              </p>

              <router-link
                to="/blog/mercedes-amg-gt-63-s-review"
                class="read-more"
              >
                Read More
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </article>

          <!-- Post 6 -->
          <article class="blog-card">
            <div class="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600"
                alt="Bentley"
              />

              <span class="category">Luxury</span>
            </div>

            <div class="blog-body">
              <div class="date">March 20, 2026</div>

              <h5>Bentley Continental GT: The Grand Tourer</h5>

              <p>
                Luxury, speed, and craftsmanship combined in a single package.
              </p>

              <router-link to="/blog/bentley-continental-gt" class="read-more">
                Read More
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "BlogPage",

  data() {
    return {
      sidebarOpen: false,
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
  },
};
</script>

<style scoped src="../styles/pages/BlogPage.css"></style>

<!-- 460 lines -->
