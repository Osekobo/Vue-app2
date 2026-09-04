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
          <a class="nav-link" href="#" @click.prevent="handleLogout">
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

          <h1>Our <span>Collection</span></h1>

          <p>Explore our curated selection of premium luxury vehicles</p>
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
                <label class="filter-label"> CATEGORY </label>

                <select class="form-select" v-model="categoryFilter">
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
                <label class="filter-label"> PRICE RANGE </label>

                <select class="form-select" v-model="priceFilter">
                  <option value="all">Any Price</option>
                  <option value="under100k">Under KSh 10M</option>
                  <option value="100k-250k">KSh 10M – 25M</option>
                  <option value="250k-500k">KSh 25M – 50M</option>
                  <option value="500kplus">KSh 50M+</option>
                </select>
              </div>

              <!-- Sort -->
              <div class="filter-group">
                <label class="filter-label"> SORT BY </label>

                <select class="form-select" v-model="sortFilter">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <!-- Apply -->
              <div class="filter-action">
                <button class="btn-shop" @click="applyFilters">
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
          <div v-if="filteredProducts.length > 0" class="shop-grid">
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
                      {{ product.subtitle || product.engine || "" }}
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="card-price">
                    {{
                      product.display_price ||
                      "KSh " +
                        parsePrice(product.selling_price).toLocaleString()
                    }}
                  </div>

                  <!-- Specifications -->
                  <div class="spec-grid">
                    <div class="spec-item">
                      <div class="spec-label">
                        <i class="fas fa-car" title="Engine"></i>
                        <span>Engine</span>
                      </div>

                      <div class="spec-value">
                        {{ product.engine || "—" }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i class="fas fa-horse-head" title="Horsepower"></i>
                        <span>Power</span>
                      </div>

                      <div class="spec-value">
                        {{ product.horsepower || "—" }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i class="fas fa-clock" title="0-60 mph"></i>
                        <span>0-60</span>
                      </div>

                      <div class="spec-value">
                        {{ product.zero_to_sixty || "—" }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i class="fas fa-gauge-high" title="Top Speed"></i>
                        <span>Speed</span>
                      </div>

                      <div class="spec-value">
                        {{ product.top_speed || "—" }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i class="fas fa-gears" title="Transmission"></i>
                        <span>Gearbox</span>
                      </div>

                      <div class="spec-value">
                        {{ product.transmission || "—" }}
                      </div>
                    </div>

                    <div class="spec-item">
                      <div class="spec-label">
                        <i class="fas fa-road" title="Drivetrain"></i>
                        <span>Drive</span>
                      </div>

                      <div class="spec-value">
                        {{ product.drivetrain || "—" }}
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="card-text">
                    {{ truncate(product.description, 90) }}
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
          <div v-else class="no-results">
            <div class="no-results-icon">
              <i class="fas fa-car"></i>
            </div>

            <h4>No vehicles found</h4>

            <p>Try adjusting your filters or search terms.</p>

            <button class="btn-shop reset-btn" @click="resetFilters">
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
                    disabled: currentPage === 1,
                  }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(currentPage - 1)"
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
                    active: page === currentPage,
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
                    disabled: currentPage === totalPages,
                  }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(currentPage + 1)"
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
          (product) => this.getCarCategory(product) === this.categoryFilter,
        );
      }

      // Price filter
      if (this.priceFilter !== "all") {
        filtered = filtered.filter((product) => {
          const price = this.parsePrice(product.selling_price || product.price);

          switch (this.priceFilter) {
            case "under100k":
              return price < 100000;

            case "100k-250k":
              return price >= 100000 && price <= 250000;

            case "250k-500k":
              return price > 250000 && price <= 500000;

            case "500kplus":
              return price > 500000;

            default:
              return true;
          }
        });
      }

      // Search
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase().trim();

        filtered = filtered.filter((product) => {
          return (
            (product.name && product.name.toLowerCase().includes(term)) ||
            (product.subtitle &&
              product.subtitle.toLowerCase().includes(term)) ||
            (product.description &&
              product.description.toLowerCase().includes(term)) ||
            (product.engine && product.engine.toLowerCase().includes(term))
          );
        });
      }

      // Sort
      switch (this.sortFilter) {
        case "price-low":
          filtered.sort(
            (a, b) =>
              this.parsePrice(a.selling_price || a.price) -
              this.parsePrice(b.selling_price || b.price),
          );
          break;

        case "price-high":
          filtered.sort(
            (a, b) =>
              this.parsePrice(b.selling_price || b.price) -
              this.parsePrice(a.selling_price || a.price),
          );
          break;

        case "newest":
          filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
          break;

        default:
          break;
      }

      return filtered;
    },

    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },

    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;

      const end = start + this.pageSize;

      return this.filteredProducts.slice(start, end);
    },
  },

  methods: {
    parsePrice(value) {
      if (typeof value === "number") {
        return value;
      }

      if (typeof value === "string") {
        return parseFloat(String(value).replace(/[^0-9.-]/g, "")) || 0;
      }

      return 0;
    },

    getCarCategory(product) {
      if (product.category) {
        return product.category;
      }

      const name = (product.name || "").toLowerCase();

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

      if (name.includes("audi") && name.includes("e-tron")) {
        return "electric";
      }

      return "luxury";
    },

    truncate(text, length) {
      if (!text) {
        return "";
      }

      return text.length > length ? text.substring(0, length) + "..." : text;
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
      if (page < 1 || page > this.totalPages) {
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
        const response = await axios.get(`${API_BASE_URL}/products`, {
          withCredentials: true,
        });

        this.products = response.data;

        const searchQuery = this.$route.query.search;

        if (searchQuery) {
          this.searchTerm = searchQuery;
        }

        this.currentPage = 1;
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
      if (this.currentPage > this.totalPages) {
        this.currentPage = Math.max(1, this.totalPages);
      }
    },
  },

  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped src="../styles/pages/ShopPage.css"></style>

<!-- 900 lines -->
