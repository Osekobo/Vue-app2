<template>
  <div>
    <!-- Sidebar toggle button -->
    <button
      class="sidebar-toggle"
      @click="sidebarOpen = true"
      aria-label="Open sidebar"
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
      <!-- Shop Hero -->
      <section class="shop-hero">
        <div class="container page-container">
          <span class="hero-label">OBERLO MOTORS</span>

          <h1>
            Our <span>Collection</span>
          </h1>

          <p>
            Explore our curated selection of premium luxury vehicles
          </p>
        </div>
      </section>

      <!-- Main Shop Section -->
      <section class="shop-section">
        <div class="container page-container">

          <!-- Filter Section -->
          <div class="filter-section">
            <div class="filter-grid">

              <!-- Category -->
              <div class="filter-group">
                <label class="filter-label">
                  CATEGORY
                </label>

                <select
                  class="form-select"
                  v-model="categoryFilter"
                >
                  <option value="all">All Vehicles</option>
                  <option value="sports">Sports Cars</option>
                  <option value="luxury">Luxury Sedans</option>
                  <option value="suv">SUVs</option>
                  <option value="electric">Electric</option>
                  <option value="hypercar">Hypercars</option>
                  <option value="muscle">Muscle Cars</option>
                  <option value="performance">Performance</option>
                  <option value="supercar">Supercars</option>
                </select>
              </div>

              <!-- Price -->
              <div class="filter-group">
                <label class="filter-label">
                  PRICE RANGE
                </label>

                <select
                  class="form-select"
                  v-model="priceFilter"
                >
                  <option value="all">Any Price</option>
                  <option value="under100k">Under $100k</option>
                  <option value="100k-250k">
                    $100k – $250k
                  </option>
                  <option value="250k-500k">
                    $250k – $500k
                  </option>
                  <option value="500kplus">
                    $500k+
                  </option>
                </select>
              </div>

              <!-- Sort -->
              <div class="filter-group">
                <label class="filter-label">
                  SORT BY
                </label>

                <select
                  class="form-select"
                  v-model="sortFilter"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">
                    Price: Low to High
                  </option>
                  <option value="price-high">
                    Price: High to Low
                  </option>
                  <option value="newest">
                    Newest
                  </option>
                </select>
              </div>

              <!-- Apply -->
              <div class="filter-action">
                <button
                  class="btn-shop"
                  @click="applyFilters"
                >
                  <i class="fas fa-sliders-h"></i>
                  Apply Filters
                </button>
              </div>

            </div>
          </div>

          <!-- Results header -->
          <div class="results-header">
            <div class="results-counter">
              Showing
              <span>{{ filteredProducts.length }}</span>
              vehicles
            </div>

            <button
              v-if="
                categoryFilter !== 'all' ||
                priceFilter !== 'all' ||
                sortFilter !== 'featured' ||
                searchTerm
              "
              class="clear-filters"
              @click="resetFilters"
            >
              <i class="fas fa-times"></i>
              Clear Filters
            </button>
          </div>

          <!-- Product Grid -->
          <div
            v-if="filteredProducts.length > 0"
            class="shop-grid"
          >
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="product-column"
            >
              <div class="shop-card">

                <!-- Image -->
                <div class="card-img-wrap">
                  <img
                    :src="product.image || ''"
                    :alt="product.name"
                    loading="lazy"
                  />

                  <span class="card-badge">
                    {{ product.badge || "Featured" }}
                  </span>
                </div>

                <!-- Card body -->
                <div class="card-body">

                  <div class="card-heading">
                    <h5 class="card-title">
                      {{ product.name }}
                    </h5>

                    <div class="card-subtitle">
                      {{
                        product.subtitle ||
                        product.engine ||
                        ""
                      }}
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="card-price">
                    {{
                      product.display_price ||
                      "$" +
                        parsePrice(
                          product.selling_price
                        ).toLocaleString()
                    }}
                  </div>

                  <!-- Specifications -->
                  <div class="spec-grid">

                    <div class="spec-item">
                      <div class="spec-label">
                        <i
                          class="fas fa-car"
                          title="Engine"
                        ></i>
                        <span>Engine</span>
                      </div>

                      <div class="spec-value">
                        {{ product.engine || "—" }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i
                          class="fas fa-horse-head"
                          title="Horsepower"
                        ></i>
                        <span>Power</span>
                      </div>

                      <div class="spec-value">
                        {{
                          product.horsepower || "—"
                        }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i
                          class="fas fa-clock"
                          title="0-60 mph"
                        ></i>
                        <span>0-60</span>
                      </div>

                      <div class="spec-value">
                        {{
                          product.zero_to_sixty || "—"
                        }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i
                          class="fas fa-gauge-high"
                          title="Top Speed"
                        ></i>
                        <span>Speed</span>
                      </div>

                      <div class="spec-value">
                        {{
                          product.top_speed || "—"
                        }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i
                          class="fas fa-gears"
                          title="Transmission"
                        ></i>
                        <span>Gearbox</span>
                      </div>

                      <div class="spec-value">
                        {{
                          product.transmission || "—"
                        }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i
                          class="fas fa-road"
                          title="Drivetrain"
                        ></i>
                        <span>Drive</span>
                      </div>

                      <div class="spec-value">
                        {{
                          product.drivetrain || "—"
                        }}
                      </div>
                    </div>

                  </div>

                  <!-- Description -->
                  <p class="card-text">
                    {{
                      truncate(
                        product.description,
                        90
                      )
                    }}
                  </p>

                  <!-- Button -->
                  <router-link
                    :to="'/car-details?id=' + product.id"
                    class="btn-shop details-btn"
                  >
                    View Details
                    <i class="fas fa-arrow-right"></i>
                  </router-link>

                </div>
              </div>
            </div>
          </div>

          <!-- No results -->
          <div
            v-else
            class="no-results"
          >
            <div class="no-results-icon">
              <i class="fas fa-car"></i>
            </div>

            <h4>No vehicles found</h4>

            <p>
              Try adjusting your filters or search terms.
            </p>

            <button
              class="btn-shop reset-btn"
              @click="resetFilters"
            >
              <i class="fas fa-undo"></i>
              Reset Filters
            </button>
          </div>

          <!-- Pagination -->
          <div
            v-if="filteredProducts.length > 0 && totalPages > 1"
            class="pagination-wrapper"
          >
            <nav aria-label="Vehicle pagination">
              <ul class="pagination pagination-custom">

                <!-- Previous -->
                <li
                  class="page-item"
                  :class="{
                    disabled: currentPage === 1
                  }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="
                      changePage(currentPage - 1)
                    "
                  >
                    <i class="fas fa-chevron-left"></i>
                  </a>
                </li>

                <!-- Pages -->
                <li
                  v-for="page in totalPages"
                  :key="page"
                  class="page-item"
                  :class="{
                    active: page === currentPage
                  }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(page)"
                  >
                    {{ page }}
                  </a>
                </li>

                <!-- Next -->
                <li
                  class="page-item"
                  :class="{
                    disabled:
                      currentPage === totalPages
                  }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="
                      changePage(currentPage + 1)
                    "
                  >
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </li>

              </ul>
            </nav>
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
  name: "ShopPage",

  data() {
    return {
      sidebarOpen: false,

      products: [],

      categoryFilter: "all",
      priceFilter: "all",
      sortFilter: "featured",

      searchTerm: "",

      currentPage: 1,
      pageSize: 12,
    };
  },

  computed: {
    filteredProducts() {
      let filtered = [...this.products];

      // Category filter
      if (this.categoryFilter !== "all") {
        filtered = filtered.filter(
          (product) =>
            this.getCarCategory(product) ===
            this.categoryFilter
        );
      }

      // Price filter
      if (this.priceFilter !== "all") {
        filtered = filtered.filter((product) => {
          const price = this.parsePrice(
            product.selling_price || product.price
          );

          switch (this.priceFilter) {
            case "under100k":
              return price < 100000;

            case "100k-250k":
              return (
                price >= 100000 &&
                price <= 250000
              );

            case "250k-500k":
              return (
                price > 250000 &&
                price <= 500000
              );

            case "500kplus":
              return price > 500000;

            default:
              return true;
          }
        });
      }

      // Search
      if (this.searchTerm) {
        const term =
          this.searchTerm.toLowerCase().trim();

        filtered = filtered.filter((product) => {
          return (
            (product.name &&
              product.name
                .toLowerCase()
                .includes(term)) ||

            (product.subtitle &&
              product.subtitle
                .toLowerCase()
                .includes(term)) ||

            (product.description &&
              product.description
                .toLowerCase()
                .includes(term)) ||

            (product.engine &&
              product.engine
                .toLowerCase()
                .includes(term))
          );
        });
      }

      // Sort
      switch (this.sortFilter) {
        case "price-low":
          filtered.sort(
            (a, b) =>
              this.parsePrice(
                a.selling_price || a.price
              ) -
              this.parsePrice(
                b.selling_price || b.price
              )
          );
          break;

        case "price-high":
          filtered.sort(
            (a, b) =>
              this.parsePrice(
                b.selling_price || b.price
              ) -
              this.parsePrice(
                a.selling_price || a.price
              )
          );
          break;

        case "newest":
          filtered.sort(
            (a, b) =>
              (b.year || 0) -
              (a.year || 0)
          );
          break;

        default:
          break;
      }

      return filtered;
    },

    totalPages() {
      return Math.ceil(
        this.filteredProducts.length /
          this.pageSize
      );
    },

    paginatedProducts() {
      const start =
        (this.currentPage - 1) *
        this.pageSize;

      const end = start + this.pageSize;

      return this.filteredProducts.slice(
        start,
        end
      );
    },
  },

  methods: {
    parsePrice(value) {
      if (typeof value === "number") {
        return value;
      }

      if (typeof value === "string") {
        return (
          parseFloat(
            value.replace(/[$,]/g, "")
          ) || 0
        );
      }

      return 0;
    },

    getCarCategory(product) {
      if (product.category) {
        return product.category;
      }

      const name = (
        product.name || ""
      ).toLowerCase();

      if (
        name.includes("lamborghini") ||
        name.includes("porsche") ||
        name.includes("ferrari") ||
        name.includes("mclaren")
      ) {
        return "sports";
      }

      if (
        name.includes("bentley") ||
        name.includes("mercedes") ||
        name.includes("bmw")
      ) {
        return "luxury";
      }

      if (
        name.includes("audi") &&
        name.includes("e-tron")
      ) {
        return "electric";
      }

      return "luxury";
    },

    truncate(text, length) {
      if (!text) {
        return "";
      }

      return text.length > length
        ? text.substring(0, length) + "..."
        : text;
    },

    applyFilters() {
      this.currentPage = 1;
    },

    resetFilters() {
      this.categoryFilter = "all";
      this.priceFilter = "all";
      this.sortFilter = "featured";
      this.searchTerm = "";
      this.currentPage = 1;

      if (this.$route.query.search) {
        this.$router.replace({
          query: {},
        });
      }
    },

    changePage(page) {
      if (
        page < 1 ||
        page > this.totalPages
      ) {
        return;
      }

      this.currentPage = page;

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    async fetchProducts() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products`,
          {
            withCredentials: true,
          }
        );

        this.products = response.data;

        const searchQuery =
          this.$route.query.search;

        if (searchQuery) {
          this.searchTerm = searchQuery;
        }

        this.currentPage = 1;
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );

        if (
          error.response?.status === 401
        ) {
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
        console.error(
          "Logout error:",
          error
        );
      }

      this.$router.push("/login");
    },
  },

  watch: {
    "$route.query.search": {
      handler(newValue) {
        if (newValue !== undefined) {
          this.searchTerm = newValue;
          this.currentPage = 1;
        }
      },

      immediate: true,
    },

    filteredProducts() {
      if (
        this.currentPage >
        this.totalPages
      ) {
        this.currentPage =
          Math.max(1, this.totalPages);
      }
    },
  },

  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
/* =========================================
   GLOBAL
========================================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  padding-top: 80px;
  min-height: 100vh;
  background: #f7f8fa;
}

.page-container {
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  padding-left: 35px;
  padding-right: 35px;
}

/* =========================================
   SIDEBAR
========================================= */

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

  box-shadow:
    2px 0 20px rgba(0, 0, 0, 0.15);
}

.sidebar.show {
  left: 0;
}

.sidebar-header {
  padding: 24px 22px;

  margin-bottom: 20px;

  border-bottom:
    1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h4 {
  color: #ffc107;

  margin: 0;

  font-size: 22px;

  font-weight: 800;
}

.sidebar-header p {
  color:
    rgba(255, 255, 255, 0.6);

  font-size: 12px;

  margin: 6px 0 0;
}

.sidebar-menu {
  list-style: none;

  padding: 0;

  margin: 0;
}

.sidebar .nav-item {
  margin: 6px 0;
}

.sidebar .nav-link {
  color: white;

  text-decoration: none;

  display: flex;

  align-items: center;

  padding: 13px 20px;

  transition: all 0.3s;

  font-weight: 500;

  border-radius: 10px;

  margin: 0 12px;
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

.sidebar .nav-link.active {
  background: #ffc107;

  color: #000;
}

.sidebar .logout-btn {
  margin-top: 35px;

  border-top:
    1px solid rgba(255, 255, 255, 0.1);

  padding-top: 20px;
}

.sidebar .logout-btn .nav-link {
  color: #ff6b6b;
}

.sidebar .logout-btn .nav-link:hover {
  background: #ff6b6b;

  color: white;
}

/* =========================================
   SIDEBAR BUTTON
========================================= */

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
    0 4px 15px rgba(0, 0, 0, 0.2);
}

.sidebar-toggle:hover {
  background: #ffca2c;

  transform: scale(1.05);
}

.sidebar-toggle i {
  font-size: 20px;

  color: #000;
}

/* =========================================
   OVERLAY
========================================= */

.overlay {
  position: fixed;

  inset: 0;

  background:
    rgba(0, 0, 0, 0.5);

  z-index: 1000;

  display: none;
}

.overlay.show {
  display: block;
}

/* =========================================
   SHOP HERO
========================================= */

.shop-hero {
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 100%
  );

  padding: 75px 0 65px;

  color: white;

  text-align: center;
}

.hero-label {
  display: inline-block;

  color: #ffc107;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 2px;

  margin-bottom: 10px;
}

.shop-hero h1 {
  font-size: 50px;

  font-weight: 800;

  margin-bottom: 14px;
}

.shop-hero h1 span {
  color: #ffc107;
}

.shop-hero p {
  color:
    rgba(255, 255, 255, 0.7);

  font-size: 18px;

  line-height: 1.6;

  margin: 0;
}

/* =========================================
   SHOP SECTION
========================================= */

.shop-section {
  padding: 60px 0 80px;
}

/* =========================================
   FILTERS
========================================= */

.filter-section {
  background: white;

  border-radius: 20px;

  padding: 25px 28px;

  box-shadow:
    0 6px 25px rgba(0, 0, 0, 0.06);

  margin-bottom: 25px;

  border:
    1px solid rgba(0, 0, 0, 0.03);
}

.filter-grid {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: 18px;

  align-items: end;
}

.filter-group {
  min-width: 0;
}

.filter-label {
  display: block;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 0.7px;

  color: #666;

  margin-bottom: 8px;
}

.filter-section .form-select {
  width: 100%;

  min-height: 45px;

  border-radius: 30px;

  border:
    1px solid #e0e0e0;

  padding: 10px 18px;

  font-size: 14px;

  color: #333;

  background-color: white;
}

.filter-section .form-select:focus {
  border-color: #ffc107;

  box-shadow:
    0 0 0 3px
    rgba(255, 193, 7, 0.15);
}

.filter-action {
  min-width: 0;
}

.filter-action .btn-shop {
  min-height: 45px;
}

/* =========================================
   RESULTS HEADER
========================================= */

.results-header {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 20px;

  gap: 15px;
}

.results-counter {
  font-size: 14px;

  color: #888;

  font-weight: 500;
}

.results-counter span {
  color: #d49f00;

  font-weight: 800;
}

.clear-filters {
  border: none;

  background: transparent;

  color: #888;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition: color 0.2s;
}

.clear-filters:hover {
  color: #d49f00;
}

.clear-filters i {
  margin-right: 5px;
}

/* =========================================
   PRODUCT GRID
========================================= */

.shop-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 30px;
}

.product-column {
  min-width: 0;

  display: flex;
}

/* =========================================
   SHOP CARD
========================================= */

.shop-card {
  width: 100%;

  background: white;

  border-radius: 18px;

  overflow: hidden;

  box-shadow:
    0 5px 22px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  display: flex;

  flex-direction: column;

  height: 100%;

  border:
    1px solid rgba(0, 0, 0, 0.035);
}

.shop-card:hover {
  transform: translateY(-7px);

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.12);
}

/* =========================================
   PRODUCT IMAGE
========================================= */

.card-img-wrap {
  height: 225px;

  overflow: hidden;

  position: relative;

  background: #eeeeee;
}

.card-img-wrap img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;

  transition:
    transform 0.5s ease;
}

.shop-card:hover
.card-img-wrap img {
  transform: scale(1.06);
}

.card-badge {
  position: absolute;

  top: 14px;

  right: 14px;

  background: #ffc107;

  color: #000;

  font-weight: 800;

  font-size: 10px;

  padding: 6px 13px;

  border-radius: 30px;

  text-transform: uppercase;

  letter-spacing: 0.6px;

  box-shadow:
    0 3px 10px
    rgba(0, 0, 0, 0.12);
}

/* =========================================
   CARD BODY
========================================= */

.card-body {
  padding: 20px;

  flex: 1;

  display: flex;

  flex-direction: column;

  min-width: 0;
}

.card-heading {
  min-height: 53px;
}

.card-title {
  font-size: 18px;

  font-weight: 750;

  color: #1a1a2e;

  margin: 0 0 5px;

  line-height: 1.3;
}

.card-subtitle {
  font-size: 13px;

  color: #888;

  line-height: 1.4;
}

.card-price {
  font-size: 23px;

  font-weight: 800;

  color: #d49f00;

  margin: 12px 0 15px;
}

/* =========================================
   SPECIFICATIONS
========================================= */

.spec-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 7px;

  background: #f7f8fa;

  border-radius: 12px;

  padding: 12px;

  margin-bottom: 15px;
}

.spec-item {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 6px;

  min-width: 0;

  padding: 5px 0;

  border-bottom:
    1px solid rgba(0, 0, 0, 0.04);
}

.spec-item:nth-last-child(-n + 2) {
  border-bottom: none;
}

.spec-label {
  display: flex;

  align-items: center;

  gap: 6px;

  color: #999;

  font-size: 11px;

  min-width: 0;
}

.spec-label i {
  width: 14px;

  color: #c99700;

  font-size: 12px;

  flex-shrink: 0;
}

.spec-label span {
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.spec-value {
  color: #1a1a2e;

  font-size: 11px;

  font-weight: 700;

  text-align: right;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}

/* =========================================
   DESCRIPTION
========================================= */

.card-text {
  color: #666;

  font-size: 13px;

  line-height: 1.6;

  margin: 0 0 18px;

  flex: 1;
}

/* =========================================
   BUTTON
========================================= */

.btn-shop {
  background: #1a1a2e;

  color: white;

  border: none;

  padding: 11px 18px;

  border-radius: 40px;

  font-weight: 650;

  transition: all 0.3s;

  width: 100%;

  text-decoration: none;

  text-align: center;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  font-size: 14px;

  cursor: pointer;
}

.btn-shop:hover {
  background: #ffc107;

  color: #000;
}

.btn-shop i {
  transition:
    transform 0.2s;
}

.btn-shop:hover i {
  transform: translateX(4px);
}

.details-btn {
  margin-top: auto;
}

.reset-btn {
  width: auto;

  padding: 11px 28px;

  display: inline-flex;

  background: #ffc107;

  color: #000;
}

.reset-btn:hover {
  background: #ffca2c;

  color: #000;
}

/* =========================================
   NO RESULTS
========================================= */

.no-results {
  background: white;

  border-radius: 20px;

  padding: 75px 25px;

  text-align: center;

  box-shadow:
    0 5px 20px
    rgba(0, 0, 0, 0.05);
}

.no-results-icon {
  width: 75px;

  height: 75px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: #f3f3f3;

  margin: 0 auto 20px;
}

.no-results-icon i {
  font-size: 30px;

  color: #bbb;
}

.no-results h4 {
  color: #1a1a2e;

  font-weight: 750;

  margin-bottom: 8px;
}

.no-results p {
  color: #888;

  font-size: 14px;

  margin-bottom: 25px;
}

/* =========================================
   PAGINATION
========================================= */

.pagination-wrapper {
  display: flex;

  justify-content: center;

  margin-top: 50px;
}

.pagination-custom {
  display: flex;

  align-items: center;

  gap: 5px;

  margin: 0;
}

.pagination-custom .page-link {
  display: flex;

  align-items: center;

  justify-content: center;

  width: 42px;

  height: 42px;

  color: #1a1a2e;

  border-radius: 50%;

  margin: 0;

  border: none;

  padding: 0;

  font-weight: 600;

  background: white;

  box-shadow:
    0 3px 12px
    rgba(0, 0, 0, 0.05);
}

.pagination-custom .page-link:hover {
  background: #ffc107;

  color: #000;
}

.pagination-custom
.page-item.active
.page-link {
  background: #ffc107;

  color: #000;
}

.pagination-custom
.page-item.disabled
.page-link {
  opacity: 0.4;

  pointer-events: none;
}

/* =========================================
   TABLET
========================================= */

@media (max-width: 1100px) {
  .shop-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 25px;
  }

  .filter-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .filter-action {
    align-self: end;
  }
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 767px) {
  main {
    padding-top: 70px;
  }

  .page-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  .sidebar-toggle {
    top: 70px;

    left: 12px;

    width: 42px;

    height: 42px;
  }

  .shop-hero {
    padding: 60px 0 50px;
  }

  .shop-hero h1 {
    font-size: 38px;
  }

  .shop-hero p {
    font-size: 16px;
  }

  .shop-section {
    padding: 45px 0 65px;
  }

  .filter-section {
    padding: 20px;

    border-radius: 16px;
  }

  .filter-grid {
    grid-template-columns: 1fr;

    gap: 15px;
  }

  .filter-action {
    width: 100%;
  }

  .results-header {
    align-items: flex-start;

    flex-direction: column;

    margin-bottom: 18px;
  }

  .shop-grid {
    grid-template-columns: 1fr;

    gap: 22px;
  }

  .card-img-wrap {
    height: 230px;
  }

  .card-body {
    padding: 18px;
  }

  .pagination-wrapper {
    margin-top: 40px;
  }
}

/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {
  .page-container {
    padding-left: 16px;

    padding-right: 16px;
  }

  .shop-hero h1 {
    font-size: 32px;
  }

  .shop-hero p {
    font-size: 15px;
  }

  .filter-section {
    padding: 17px;
  }

  .card-img-wrap {
    height: 200px;
  }

  .card-title {
    font-size: 17px;
  }

  .card-price {
    font-size: 21px;
  }

  .spec-grid {
    padding: 10px;

    gap: 5px;
  }

  .spec-label span {
    display: none;
  }

  .spec-label i {
    width: 18px;

    text-align: center;
  }

  .spec-value {
    font-size: 10px;
  }

  .card-text {
    font-size: 12px;
  }

  .pagination-custom .page-link {
    width: 36px;

    height: 36px;

    font-size: 13px;
  }
}
</style>

<!-- 900 lines -->