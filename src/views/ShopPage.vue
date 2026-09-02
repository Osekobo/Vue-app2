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
      <section class="shop-hero">
        <div class="container">
          <h1>Our <span>Collection</span></h1>
          <p>Explore our curated selection of premium luxury vehicles</p>
        </div>
      </section>

      <section class="container py-4">
        <div class="filter-section">
          <div class="row g-3 align-items-end">
            <div class="col-md-3">
              <label class="form-label fw-semibold" style="font-size: 13px; color: #666">CATEGORY</label>
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
            <div class="col-md-3">
              <label class="form-label fw-semibold" style="font-size: 13px; color: #666">PRICE RANGE</label>
              <select class="form-select" v-model="priceFilter">
                <option value="all">Any Price</option>
                <option value="under100k">Under $100k</option>
                <option value="100k-250k">$100k – $250k</option>
                <option value="250k-500k">$250k – $500k</option>
                <option value="500kplus">$500k+</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label fw-semibold" style="font-size: 13px; color: #666">SORT BY</label>
              <select class="form-select" v-model="sortFilter">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <div class="col-md-3">
              <button class="btn-shop" id="applyFiltersBtn" @click="applyFilters">
                <i class="fas fa-sliders-h me-2"></i> Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div class="results-counter">
          Showing <span>{{ filteredProducts.length }}</span> vehicles
        </div>

        <div class="row g-4" id="shopGrid">
          <!-- No results -->
          <div v-if="filteredProducts.length === 0" class="col-12">
            <div class="no-results">
              <i class="fas fa-search"></i>
              <h4>No vehicles found</h4>
              <p>Try adjusting your filters or search terms.</p>
              <button class="btn-shop reset-btn" @click="resetFilters">
                <i class="fas fa-undo me-2"></i> Reset Filters
              </button>
            </div>
          </div>

          <!-- Product cards -->
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="col-6 col-md-6 col-lg-4 col-xl-3"
          >
            <div class="shop-card">
              <div class="card-img-wrap">
                <img :src="product.image || ''" :alt="product.name" loading="lazy" />
                <span class="card-badge">{{ product.badge || 'Featured' }}</span>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <div class="card-subtitle">{{ product.subtitle || product.engine || '' }}</div>
                <div class="card-price">
                  {{ product.display_price || '$' + parsePrice(product.selling_price).toLocaleString() }}
                </div>

                <div class="spec-grid">
                  <div class="spec-item">
                    <span class="label"><i class="fas fa-car" title="Engine"></i></span>
                    <span class="value">{{ product.engine || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fas fa-horse-head" title="Horsepower"></i></span>
                    <span class="value">{{ product.horsepower || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fas fa-clock" title="0-60 mph"></i></span>
                    <span class="value">{{ product.zero_to_sixty || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fas fa-gauge-high" title="Top Speed"></i></span>
                    <span class="value">{{ product.top_speed || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fas fa-gears" title="Transmission"></i></span>
                    <span class="value">{{ product.transmission || '—' }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="label"><i class="fas fa-road" title="Drivetrain"></i></span>
                    <span class="value">{{ product.drivetrain || '—' }}</span>
                  </div>
                </div>

                <p class="card-text">{{ truncate(product.description, 70) }}</p>
                <router-link :to="'/car-details?id=' + product.id" class="btn-shop">
                  View Details <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredProducts.length > 0" class="d-flex justify-content-center mt-5">
          <nav>
            <ul class="pagination pagination-custom">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'ShopPage',
  data() {
    return {
      sidebarOpen: false,
      products: [],
      categoryFilter: 'all',
      priceFilter: 'all',
      sortFilter: 'featured',
      searchTerm: '',
      currentPage: 1,
      pageSize: 12,
    };
  },
  computed: {
    filteredProducts() {
      let filtered = [...this.products];

      // Category filter
      if (this.categoryFilter !== 'all') {
        filtered = filtered.filter(p => this.getCarCategory(p) === this.categoryFilter);
      }

      // Price range filter
      if (this.priceFilter !== 'all') {
        filtered = filtered.filter(p => {
          const price = this.parsePrice(p.selling_price || p.price);
          switch (this.priceFilter) {
            case 'under100k': return price < 100000;
            case '100k-250k': return price >= 100000 && price <= 250000;
            case '250k-500k': return price > 250000 && price <= 500000;
            case '500kplus': return price > 500000;
            default: return true;
          }
        });
      }

      // Search term
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase().trim();
        filtered = filtered.filter(p =>
          (p.name && p.name.toLowerCase().includes(term)) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(term)) ||
          (p.description && p.description.toLowerCase().includes(term)) ||
          (p.engine && p.engine.toLowerCase().includes(term))
        );
      }

      // Sort
      switch (this.sortFilter) {
        case 'price-low':
          filtered.sort((a, b) => this.parsePrice(a.selling_price || a.price) - this.parsePrice(b.selling_price || b.price));
          break;
        case 'price-high':
          filtered.sort((a, b) => this.parsePrice(b.selling_price || b.price) - this.parsePrice(a.selling_price || a.price));
          break;
        case 'newest':
          filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
          break;
        default: // featured
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
    parsePrice(val) {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') return parseInt(val.replace(/[$,]/g, '')) || 0;
      return 0;
    },
    getCarCategory(product) {
      if (product.category) return product.category;
      const name = product.name.toLowerCase();
      if (name.includes('lamborghini') || name.includes('porsche') || name.includes('ferrari') || name.includes('mclaren'))
        return 'sports';
      if (name.includes('bentley') || name.includes('mercedes') || name.includes('bmw'))
        return 'luxury';
      if (name.includes('audi') && name.includes('e-tron')) return 'electric';
      return 'luxury';
    },
    truncate(text, length) {
      if (!text) return '';
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    applyFilters() {
      // Update search term from URL if needed, but we use v-model on searchInput
      // This method is called on button click – we can just update currentPage to 1
      this.currentPage = 1;
    },
    resetFilters() {
      this.categoryFilter = 'all';
      this.priceFilter = 'all';
      this.sortFilter = 'featured';
      this.searchTerm = '';
      this.currentPage = 1;
      // Optionally clear URL query param
      if (this.$route.query.search) {
        this.$router.replace({ query: {} });
      }
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    async fetchProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
          withCredentials: true,
        });
        this.products = response.data;
        // After products load, read URL search param
        const searchQuery = this.$route.query.search;
        if (searchQuery) {
          this.searchTerm = searchQuery;
        }
        // Apply filters (triggers computed)
        this.currentPage = 1;
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
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
  watch: {
    // Watch for changes in route query (search)
    '$route.query.search': {
      handler(newVal) {
        if (newVal !== undefined) {
          this.searchTerm = newVal;
          this.currentPage = 1;
        }
      },
      immediate: true,
    },
    // When filteredProducts changes, reset to page 1 if needed? 
    // We'll keep currentPage unless it's out of bounds.
    filteredProducts(newVal) {
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

<style scoped>
/* ── Reset & Base ── */
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

/* ── Shop Hero ── */
.shop-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 60px 0 50px;
  color: white;
  text-align: center;
}
.shop-hero h1 {
  font-size: 48px;
  font-weight: 800;
}
.shop-hero h1 span {
  color: #ffc107;
}
.shop-hero p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
}

/* ── Filter Section ── */
.filter-section {
  background: white;
  border-radius: 15px;
  padding: 20px 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
}
.filter-section .form-select,
.filter-section .form-control {
  border-radius: 30px;
  border: 1px solid #e0e0e0;
  padding: 10px 20px;
  font-size: 14px;
}
.filter-section .form-select:focus,
.filter-section .form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.15);
}

/* ── Shop Cards ── */
.shop-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.shop-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}
.shop-card .card-img-wrap {
  height: 200px;
  overflow: hidden;
  position: relative;
}
.shop-card .card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.shop-card:hover .card-img-wrap img {
  transform: scale(1.05);
}
.shop-card .card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ffc107;
  color: #000;
  font-weight: 700;
  font-size: 11px;
  padding: 4px 14px;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.shop-card .card-body {
  padding: 16px 18px 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.shop-card .card-title {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 2px;
  color: #1a1a2e;
}
.shop-card .card-subtitle {
  font-size: 13px;
  color: #888;
  margin-bottom: 6px;
}
.shop-card .card-price {
  font-size: 22px;
  font-weight: 700;
  color: #ffc107;
  margin-bottom: 10px;
}

.spec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 12px;
}
.spec-grid .spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 2px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.spec-grid .spec-item:last-child,
.spec-grid .spec-item:nth-last-child(2) {
  border-bottom: none;
}
.spec-grid .spec-item .label {
  color: #999;
  font-weight: 400;
  font-size: 13px;
  width: 24px;
  text-align: left;
}
.spec-grid .spec-item .value {
  color: #1a1a2e;
  font-weight: 600;
  font-size: 12px;
  text-align: right;
}

.shop-card .card-text {
  font-size: 13px;
  color: #666;
  flex: 1;
  margin-bottom: 12px;
  line-height: 1.5;
}

.btn-shop {
  background: #1a1a2e;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
  width: 100%;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  font-size: 14px;
}
.btn-shop:hover {
  background: #ffc107;
  color: #000;
}
.btn-shop i {
  margin-left: 8px;
  transition: transform 0.2s;
}
.btn-shop:hover i {
  transform: translateX(4px);
}
.btn-shop.reset-btn {
  background: #ffc107;
  color: #000;
  width: auto;
  padding: 10px 30px;
  display: inline-block;
}

.pagination-custom .page-link {
  color: #1a1a2e;
  border-radius: 30px;
  margin: 0 4px;
  border: none;
  padding: 8px 18px;
  font-weight: 500;
}
.pagination-custom .page-link:hover {
  background: #ffc107;
  color: #000;
}
.pagination-custom .page-item.active .page-link {
  background: #ffc107;
  color: #000;
  border: none;
}

.results-counter {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 16px;
  font-weight: 500;
}
.results-counter span {
  color: #ffc107;
  font-weight: 700;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}
.no-results i {
  font-size: 48px;
  color: #ddd;
  margin-bottom: 16px;
}
.no-results h4 {
  color: #1a1a2e;
  font-weight: 700;
}

/* ── Responsive ── */
@media (max-width: 576px) {
  .shop-card .card-img-wrap {
    height: 140px;
  }
  .spec-grid {
    grid-template-columns: 1fr 1fr;
    padding: 6px 10px;
    gap: 2px 6px;
  }
  .spec-grid .spec-item {
    font-size: 10px;
    padding: 1px 0;
  }
  .spec-grid .spec-item .label {
    font-size: 11px;
    width: 20px;
  }
  .spec-grid .spec-item .value {
    font-size: 10px;
  }
  .shop-card .card-price {
    font-size: 18px;
  }
  .shop-card .card-title {
    font-size: 15px;
  }
  .shop-card .card-subtitle {
    font-size: 11px;
  }
  .shop-card .card-text {
    font-size: 12px;
  }
}
</style>