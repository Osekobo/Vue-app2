<template>
  <div class="sales-page">
    <!-- ==================== NAVBAR ==================== -->
    <Navbar />

    <!-- ==================== SIDEBAR ==================== -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-header">
        <h4>OBerlo Admin</h4>
        <p>Vehicle Management</p>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/" class="sidebar-link">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </router-link>

        <router-link to="/dashboard" class="sidebar-link">
          <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/products" class="sidebar-link">
          <i class="fas fa-car"></i>
          <span>Inventory</span>
        </router-link>

        <router-link to="/purchases" class="sidebar-link">
          <i class="fas fa-shopping-cart"></i>
          <span>Purchase Orders</span>
        </router-link>

        <router-link to="/sales" class="sidebar-link active-link">
          <i class="fas fa-cash-register"></i>
          <span>Vehicle Sales</span>
        </router-link>

        <button class="sidebar-link logout-link" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </nav>
    </aside>

    <!-- Sidebar Toggle -->
    <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
      <i :class="sidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>

    <!-- Overlay -->
    <div
      class="sidebar-overlay"
      :class="{ show: sidebarOpen }"
      @click="sidebarOpen = false"
    ></div>

    <!-- ==================== MAIN CONTENT ==================== -->
    <main class="main-content">
      <div class="sales-container">

        <!-- PAGE HEADER -->
        <div class="page-header">
          <div class="header-text">
            <span class="eyebrow">
              <i class="fas fa-chart-line"></i>
              SALES MANAGEMENT
            </span>

            <h1>Vehicle Sales</h1>

            <p>
              Manage completed vehicle sales, track revenue, and create new
              customer orders.
            </p>
          </div>

          <div class="header-badge">
            <i class="fas fa-circle"></i>
            Sales System Active
          </div>
        </div>

        <!-- ==================== LOADING ==================== -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading sales...</p>
        </div>

        <template v-else>

          <!-- ==================== STATS ==================== -->
          <section class="stats-grid">

            <div class="stat-card">
              <div class="stat-icon gold">
                <i class="fas fa-receipt"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">TOTAL SALES</span>
                <h3>{{ sales.length }}</h3>
                <p>Completed orders</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon blue">
                <i class="fas fa-car"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">VEHICLES SOLD</span>
                <h3>{{ totalItemsSold }}</h3>
                <p>Total vehicles sold</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon green">
                <i class="fas fa-coins"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">TOTAL REVENUE</span>
                <h3>KSh {{ formatShortNumber(totalRevenueNum) }}</h3>
                <p>Revenue generated</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon purple">
                <i class="fas fa-users"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">CUSTOMERS SERVED</span>
                <h3>{{ sales.length }}</h3>
                <p>Completed customers</p>
              </div>
            </div>

          </section>

          <!-- ==================== SALES SECTION ==================== -->
          <section class="sales-section">

            <div class="section-header">
              <div>
                <span class="section-eyebrow">TRANSACTION HISTORY</span>
                <h2>Recent Vehicle Sales</h2>
                <p>View and manage all completed vehicle transactions.</p>
              </div>

              <button
                class="btn-add-sale"
                @click="openSaleModal"
              >
                <i class="fas fa-plus"></i>
                New Vehicle Sale
              </button>
            </div>

            <!-- SALES TABLE -->
            <div class="table-wrapper">

              <div class="table-responsive">
                <table class="sales-table">
                  <thead>
                    <tr>
                      <th>SALE ID</th>
                      <th>SOLD ON</th>
                      <th>VEHICLES</th>
                      <th>TOTAL AMOUNT</th>
                      <th class="text-right">ACTION</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr
                      v-for="sale in sales"
                      :key="sale.id"
                    >
                      <td>
                        <span class="sale-id">
                          #{{ sale.id }}
                        </span>
                      </td>

                      <td>
                        <div class="date-cell">
                          <i class="far fa-calendar-alt"></i>
                          <span>{{ formatDate(sale.created_at) }}</span>
                        </div>
                      </td>

                      <td>
                        <span class="vehicle-count">
                          <i class="fas fa-car"></i>
                          {{ sale.details ? sale.details.length : 0 }}
                        </span>
                      </td>

                      <td>
                        <span class="sale-amount">
                          KSh {{ getSaleTotal(sale) }}
                        </span>
                      </td>

                      <td class="text-right">
                        <button
                          class="btn-view"
                          @click="viewSaleDetails(sale)"
                        >
                          <i class="fas fa-eye"></i>
                          View
                        </button>
                      </td>
                    </tr>

                    <!-- EMPTY STATE -->
                    <tr v-if="sales.length === 0">
                      <td colspan="5">
                        <div class="empty-state">
                          <div class="empty-icon">
                            <i class="fas fa-receipt"></i>
                          </div>

                          <h3>No Sales Yet</h3>

                          <p>
                            You haven't recorded any vehicle sales yet.
                          </p>

                          <button
                            class="btn-add-sale"
                            @click="openSaleModal"
                          >
                            <i class="fas fa-plus"></i>
                            Create First Sale
                          </button>
                        </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>

          </section>

        </template>
      </div>
    </main>

    <!-- ========================================================= -->
    <!-- CREATE SALE MODAL -->
    <!-- ========================================================= -->

    <div
      class="modal fade"
      id="saleModal"
      tabindex="-1"
      aria-labelledby="saleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content premium-modal">

          <!-- MODAL HEADER -->
          <div class="modal-header premium-modal-header">

            <div class="modal-title-wrapper">
              <div class="modal-icon">
                <i class="fas fa-cash-register"></i>
              </div>

              <div>
                <h5
                  class="modal-title"
                  id="saleModalLabel"
                >
                  Create New Vehicle Sale
                </h5>

                <p>
                  Add vehicles and complete the customer transaction.
                </p>
              </div>
            </div>

            <button
              type="button"
              class="btn-close custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

          </div>

          <!-- MODAL BODY -->
          <div class="modal-body premium-modal-body">

            <!-- VEHICLE SELECT -->
            <div class="sale-form-section">

              <div class="form-section-title">
                <i class="fas fa-car"></i>
                <div>
                  <h6>Select Vehicle</h6>
                  <p>Choose a vehicle from your current inventory.</p>
                </div>
              </div>

              <div class="sale-form-grid">

                <div class="form-group">
                  <label for="vehicle">
                    Vehicle
                  </label>

                  <select
                    id="vehicle"
                    class="form-control premium-control"
                    v-model="saleItem.product_id"
                  >
                    <option value="">
                      Select a vehicle
                    </option>

                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.id"
                      :disabled="product.quantity <= 0"
                    >
                      {{ product.name }}
                      —
                      KSh {{ formatNumber(product.selling_price) }}
                      —
                      Stock: {{ product.quantity }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="quantity">
                    Quantity
                  </label>

                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    class="form-control premium-control"
                    v-model.number="saleItem.quantity"
                  />
                </div>

              </div>

              <!-- SELECTED VEHICLE INFO -->
              <div
                v-if="saleItem.product_id"
                class="selected-vehicle-info"
              >
                <div class="selected-info-item">
                  <span>Vehicle</span>
                  <strong>
                    {{ getProductName(saleItem.product_id) }}
                  </strong>
                </div>

                <div class="selected-info-item">
                  <span>Selling Price</span>
                  <strong>
                    KSh
                    {{ formatNumber(getProductPrice(saleItem.product_id)) }}
                  </strong>
                </div>

                <div class="selected-info-item">
                  <span>Available Stock</span>
                  <strong>
                    {{ getProductStock(saleItem.product_id) }}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                class="btn-add-vehicle"
                @click="addToSaleList"
              >
                <i class="fas fa-plus-circle"></i>
                Add Vehicle
              </button>

            </div>

            <!-- CART -->
            <div class="cart-section">

              <div class="cart-header">
                <div>
                  <span class="section-eyebrow">SALE CART</span>
                  <h6>Vehicles in This Sale</h6>
                </div>

                <span class="cart-count">
                  {{ salesList.length }}
                  {{ salesList.length === 1 ? 'Vehicle' : 'Vehicles' }}
                </span>
              </div>

              <div
                v-if="salesList.length > 0"
                class="cart-table-wrapper"
              >

                <div class="table-responsive">
                  <table class="cart-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Vehicle</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr
                        v-for="(item, index) in salesList"
                        :key="`${item.product_id}-${index}`"
                      >
                        <td>
                          <span class="cart-number">
                            {{ index + 1 }}
                          </span>
                        </td>

                        <td>
                          <div class="cart-product">
                            <div class="cart-product-icon">
                              <i class="fas fa-car"></i>
                            </div>

                            <span>
                              {{ getProductName(item.product_id) }}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span class="quantity-badge">
                            {{ item.quantity }}
                          </span>
                        </td>

                        <td>
                          KSh
                          {{ formatNumber(getProductPrice(item.product_id)) }}
                        </td>

                        <td>
                          <strong class="subtotal">
                            KSh
                            {{
                              formatNumber(
                                getProductPrice(item.product_id) *
                                item.quantity
                              )
                            }}
                          </strong>
                        </td>

                        <td>
                          <button
                            type="button"
                            class="btn-remove"
                            @click="removeFromList(index)"
                            title="Remove vehicle"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                <!-- CART TOTAL -->
                <div class="cart-total">
                  <div>
                    <span>Total Sale Amount</span>
                    <small>
                      {{ salesList.length }} vehicle
                      {{ salesList.length === 1 ? '' : 's' }}
                    </small>
                  </div>

                  <strong>
                    KSh {{ formatNumber(cartTotal) }}
                  </strong>
                </div>

              </div>

              <!-- EMPTY CART -->
              <div
                v-else
                class="cart-empty"
              >
                <div class="cart-empty-icon">
                  <i class="fas fa-shopping-cart"></i>
                </div>

                <h6>Your sale cart is empty</h6>

                <p>
                  Select a vehicle above and click
                  <strong>Add Vehicle</strong>
                  to begin.
                </p>
              </div>

            </div>

          </div>

          <!-- MODAL FOOTER -->
          <div class="modal-footer premium-modal-footer">

            <button
              type="button"
              class="btn-modal-cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              type="button"
              class="btn-complete-sale"
              @click="makeSale"
              :disabled="isSubmitting || salesList.length === 0"
            >
              <span v-if="isSubmitting">
                <span class="button-spinner"></span>
                Processing...
              </span>

              <span v-else>
                <i class="fas fa-check-circle"></i>
                Complete Sale
              </span>
            </button>

          </div>

        </div>
      </div>
    </div>

    <!-- ========================================================= -->
    <!-- VIEW SALE DETAILS MODAL -->
    <!-- ========================================================= -->

    <div
      class="modal fade"
      id="viewModal"
      tabindex="-1"
      aria-labelledby="viewModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content premium-modal">

          <!-- HEADER -->
          <div class="modal-header premium-modal-header">

            <div class="modal-title-wrapper">

              <div class="modal-icon">
                <i class="fas fa-file-invoice"></i>
              </div>

              <div>
                <h5
                  class="modal-title"
                  id="viewModalLabel"
                >
                  Sale #{{ currentSale.id }}
                </h5>

                <p>
                  Detailed vehicle sale information.
                </p>
              </div>

            </div>

            <button
              type="button"
              class="btn-close custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

          </div>

          <!-- BODY -->
          <div class="modal-body premium-modal-body">

            <!-- SALE SUMMARY -->
            <div class="sale-summary">

              <div class="summary-item">
                <span>
                  <i class="far fa-calendar-alt"></i>
                  Sale Date
                </span>

                <strong>
                  {{ formatDate(currentSale.created_at) }}
                </strong>
              </div>

              <div class="summary-item">
                <span>
                  <i class="fas fa-car"></i>
                  Vehicles
                </span>

                <strong>
                  {{
                    currentSale.details
                      ? currentSale.details.length
                      : 0
                  }}
                </strong>
              </div>

              <div class="summary-item highlight">
                <span>
                  <i class="fas fa-coins"></i>
                  Total Amount
                </span>

                <strong>
                  KSh {{ getSaleTotal(currentSale) }}
                </strong>
              </div>

            </div>

            <!-- DETAILS TABLE -->
            <div class="details-section">

              <div class="details-section-title">
                <h6>Vehicle Details</h6>
                <span>
                  Sale #{{ currentSale.id }}
                </span>
              </div>

              <div
                v-if="
                  currentSale.details &&
                  currentSale.details.length > 0
                "
                class="cart-table-wrapper"
              >

                <div class="table-responsive">
                  <table class="cart-table details-table">

                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr
                        v-for="(detail, index) in currentSale.details"
                        :key="index"
                      >
                        <td>
                          <div class="cart-product">
                            <div class="cart-product-icon">
                              <i class="fas fa-car"></i>
                            </div>

                            <span>
                              {{ getProductName(detail.product_id) }}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span class="quantity-badge">
                            {{ detail.quantity }}
                          </span>
                        </td>

                        <td>
                          KSh
                          {{
                            formatNumber(
                              getProductPrice(detail.product_id)
                            )
                          }}
                        </td>

                        <td>
                          <strong class="subtotal">
                            KSh
                            {{
                              formatNumber(
                                getProductPrice(detail.product_id) *
                                detail.quantity
                              )
                            }}
                          </strong>
                        </td>
                      </tr>

                    </tbody>

                  </table>
                </div>

                <!-- TOTAL -->
                <div class="cart-total">
                  <div>
                    <span>Total Sale Amount</span>
                    <small>Final transaction value</small>
                  </div>

                  <strong>
                    KSh {{ getSaleTotal(currentSale) }}
                  </strong>
                </div>

              </div>

              <div
                v-else
                class="cart-empty"
              >
                <div class="cart-empty-icon">
                  <i class="fas fa-file-invoice"></i>
                </div>

                <h6>No Sale Details</h6>

                <p>
                  There are no vehicle details available for this sale.
                </p>
              </div>

            </div>

          </div>

          <!-- FOOTER -->
          <div class="modal-footer premium-modal-footer">

            <button
              type="button"
              class="btn-modal-cancel"
              data-bs-dismiss="modal"
            >
              <i class="fas fa-times"></i>
              Close
            </button>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import { Modal } from 'bootstrap';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'SalesPage',

  components: {
    Navbar,
  },

  data() {
    return {
      sidebarOpen: false,

      products: [],
      sales: [],
      salesList: [],

      loading: true,
      isSubmitting: false,

      saleItem: {
        product_id: '',
        quantity: 1,
      },

      currentSale: {
        id: null,
        details: [],
        created_at: null,
      },

      saleModal: null,
      viewModal: null,
    };
  },

  computed: {
    totalItemsSold() {
      let total = 0;

      for (let i = 0; i < this.sales.length; i++) {
        if (this.sales[i].details) {
          for (let j = 0; j < this.sales[i].details.length; j++) {
            total += this.sales[i].details[j].quantity;
          }
        }
      }

      return total;
    },

    totalRevenueNum() {
      let total = 0;

      for (let i = 0; i < this.sales.length; i++) {
        total += this.getSaleTotalNum(this.sales[i]);
      }

      return total;
    },

    cartTotal() {
      let total = 0;

      for (let i = 0; i < this.salesList.length; i++) {
        total +=
          this.getProductPrice(this.salesList[i].product_id) *
          this.salesList[i].quantity;
      }

      return total;
    },
  },

  methods: {
    formatShortNumber(num) {
      num = Number(num) || 0;

      if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
      }

      if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';
      }

      return num.toLocaleString();
    },

    formatNumber(num) {
      return num
        ? Number(num).toLocaleString()
        : '0';
    },

    formatDate(ts) {
      return ts
        ? new Date(ts).toLocaleString()
        : 'N/A';
    },

    getProductName(id) {
      const product = this.products.find(
        p => p.id === Number(id)
      );

      return product
        ? product.name
        : 'Unknown Vehicle';
    },

    getProductPrice(id) {
      const product = this.products.find(
        p => p.id === Number(id)
      );

      return product
        ? Number(product.selling_price) || 0
        : 0;
    },

    getProductStock(id) {
      const product = this.products.find(
        p => p.id === Number(id)
      );

      return product
        ? Number(product.quantity) || 0
        : 0;
    },

    getSaleTotalNum(sale) {
      let total = 0;

      if (sale.details) {
        for (let i = 0; i < sale.details.length; i++) {
          total +=
            this.getProductPrice(
              sale.details[i].product_id
            ) *
            Number(sale.details[i].quantity || 0);
        }
      }

      return total;
    },

    getSaleTotal(sale) {
      return this
        .getSaleTotalNum(sale)
        .toLocaleString();
    },

    async getProducts() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products`,
          {
            withCredentials: true,
          }
        );

        this.products = response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
      }
    },

    async getSales() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/sales`,
          {
            withCredentials: true,
          }
        );

        this.sales = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;

        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
      }
    },

    addToSaleList() {
      if (
        !this.saleItem.product_id ||
        !this.saleItem.quantity
      ) {
        alert(
          'Please select a vehicle and enter quantity'
        );

        return;
      }

      if (this.saleItem.quantity <= 0) {
        alert(
          'Quantity must be greater than 0'
        );

        return;
      }

      const product = this.products.find(
        p => p.id === Number(this.saleItem.product_id)
      );

      if (
        product &&
        this.saleItem.quantity > product.quantity
      ) {
        alert(
          `Insufficient stock! Available: ${product.quantity}`
        );

        return;
      }

      // Check if product already in cart – if so, merge
      const existing = this.salesList.find(
        item =>
          Number(item.product_id) ===
          Number(this.saleItem.product_id)
      );

      if (existing) {
        const newQty =
          existing.quantity +
          Number(this.saleItem.quantity);

        if (
          product &&
          newQty > product.quantity
        ) {
          alert(
            `Insufficient stock! Available: ${product.quantity}`
          );

          return;
        }

        existing.quantity = newQty;
      } else {
        this.salesList.push({
          product_id: Number(
            this.saleItem.product_id
          ),
          quantity: Number(
            this.saleItem.quantity
          ),
        });
      }

      this.saleItem = {
        product_id: '',
        quantity: 1,
      };
    },

    removeFromList(index) {
      this.salesList.splice(index, 1);
    },

    async makeSale() {
      if (this.salesList.length === 0) {
        alert(
          'Add at least one vehicle before submitting!'
        );

        return;
      }

      // Double-check stock before submitting
      for (let item of this.salesList) {
        const stock = this.getProductStock(
          item.product_id
        );

        if (item.quantity > stock) {
          alert(
            `Not enough stock for ${this.getProductName(
              item.product_id
            )}. Available: ${stock}`
          );

          return;
        }
      }

      this.isSubmitting = true;

      try {
        await axios.post(
          `${API_BASE_URL}/sales`,
          {
            details: this.salesList,
          },
          {
            withCredentials: true,
          }
        );

        alert(
          '✅ Sale completed successfully!'
        );

        this.salesList = [];

        this.saleModal?.hide();

        await this.getSales();
        await this.getProducts();
      } catch (error) {
        alert(
          `❌ Failed: ${
            error.response?.data?.detail ||
            error.message
          }`
        );
      } finally {
        this.isSubmitting = false;
      }
    },

    openSaleModal() {
      if (!this.saleModal) {
        this.saleModal = new Modal(
          document.getElementById(
            'saleModal'
          )
        );
      }

      this.saleModal.show();
    },

    viewSaleDetails(sale) {
      this.currentSale = sale;

      if (!this.viewModal) {
        this.viewModal = new Modal(
          document.getElementById(
            'viewModal'
          )
        );
      }

      this.viewModal.show();
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
          'Logout error:',
          error
        );
      }

      this.$router.push('/login');
    },
  },

  mounted() {
    this.getProducts();
    this.getSales();
  },

  beforeUnmount() {
    // Clean up modal instances to prevent memory leaks
    if (this.saleModal) {
      this.saleModal.dispose();
    }

    if (this.viewModal) {
      this.viewModal.dispose();
    }
  },
};
</script>

<style scoped>
/* =========================================================
   GLOBAL
========================================================= */

* {
  box-sizing: border-box;
}

.sales-page {
  min-height: 100vh;
  background: #f5f6fa;
  color: #20242d;
}

button,
input,
select {
  font-family: inherit;
}

/* =========================================================
   SIDEBAR
========================================================= */

.sidebar {
  position: fixed;
  top: 0;
  left: -290px;
  width: 280px;
  height: 100vh;
  z-index: 1100;
  padding: 95px 15px 25px;

  background:
    radial-gradient(
      circle at top right,
      rgba(212, 175, 55, 0.12),
      transparent 35%
    ),
    linear-gradient(
      180deg,
      #171827 0%,
      #121624 100%
    );

  box-shadow: 8px 0 35px rgba(0, 0, 0, 0.25);

  transition:
    left 0.3s ease;
}

.sidebar.open {
  left: 0;
}

.sidebar-header {
  padding: 0 15px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 22px;
}

.sidebar-header h4 {
  margin: 0 0 5px;
  color: #d4af37;
  font-size: 22px;
  font-weight: 800;
}

.sidebar-header p {
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.sidebar-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 14px 16px;

  border: 0;
  border-radius: 11px;

  background: transparent;
  color: rgba(255, 255, 255, 0.72);

  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  text-align: left;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.sidebar-link i {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

.sidebar-link:hover {
  color: #d4af37;
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(4px);
}

.sidebar-link.router-link-active,
.sidebar-link.active-link {
  color: #171827;
  background: linear-gradient(
    135deg,
    #d4af37,
    #f1d77a
  );

  box-shadow:
    0 8px 20px rgba(212, 175, 55, 0.2);
}

.logout-link {
  margin-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0 0 11px 11px;
  padding-top: 20px;
  color: #ff8585;
}

.logout-link:hover {
  color: #ff6b6b;
  background: rgba(255, 80, 80, 0.08);
}

/* =========================================================
   SIDEBAR TOGGLE
========================================================= */

.sidebar-toggle {
  position: fixed;
  top: 90px;
  left: 20px;

  width: 46px;
  height: 46px;

  z-index: 1200;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #d4af37,
    #f1d77a
  );

  color: #171827;

  font-size: 17px;

  cursor: pointer;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.2);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.sidebar-toggle:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.25);
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 1050;

  background: rgba(0, 0, 0, 0.45);

  opacity: 0;
  visibility: hidden;

  backdrop-filter: blur(3px);

  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.sidebar-overlay.show {
  opacity: 1;
  visibility: visible;
}

/* =========================================================
   MAIN
========================================================= */

.main-content {
  min-height: 100vh;
  padding: 125px 0 70px;
}

.sales-container {
  width: min(1380px, calc(100% - 70px));
  margin: 0 auto;
}

/* =========================================================
   PAGE HEADER
========================================================= */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;

  margin-bottom: 38px;
}

.eyebrow,
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  margin-bottom: 9px;

  color: #b18d25;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.eyebrow i {
  font-size: 8px;
}

.header-text h1 {
  margin: 0 0 9px;

  color: #171827;

  font-size: clamp(32px, 4vw, 45px);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -1px;
}

.header-text p {
  max-width: 650px;

  margin: 0;

  color: #7c8290;

  font-size: 15px;
  line-height: 1.7;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 10px 15px;

  border: 1px solid rgba(35, 180, 105, 0.2);
  border-radius: 30px;

  background: rgba(35, 180, 105, 0.08);

  color: #16864d;

  font-size: 12px;
  font-weight: 700;

  white-space: nowrap;
}

.header-badge i {
  font-size: 7px;
}

/* =========================================================
   STATS
========================================================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;

  margin-bottom: 35px;
}

.stat-card {
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 17px;

  padding: 24px 22px;

  border: 1px solid #ebedf2;
  border-radius: 18px;

  background: #ffffff;

  box-shadow:
    0 8px 28px rgba(30, 35, 50, 0.055);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 16px 35px rgba(30, 35, 50, 0.1);
}

.stat-icon {
  width: 52px;
  height: 52px;
  flex: 0 0 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;

  font-size: 19px;
}

.stat-icon.gold {
  color: #a47c0b;
  background: rgba(212, 175, 55, 0.13);
}

.stat-icon.blue {
  color: #3679c7;
  background: rgba(54, 121, 199, 0.12);
}

.stat-icon.green {
  color: #1d9860;
  background: rgba(29, 152, 96, 0.12);
}

.stat-icon.purple {
  color: #7754c7;
  background: rgba(119, 84, 199, 0.12);
}

.stat-content {
  min-width: 0;
}

.stat-label {
  display: block;

  margin-bottom: 5px;

  color: #9499a5;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.1px;
}

.stat-content h3 {
  margin: 0 0 3px;

  color: #222631;

  font-size: 24px;
  font-weight: 800;

  white-space: nowrap;
}

.stat-content p {
  margin: 0;

  color: #9a9faa;

  font-size: 11px;
}

/* =========================================================
   SALES SECTION
========================================================= */

.sales-section {
  margin-top: 10px;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 25px;

  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0 0 5px;

  color: #222631;

  font-size: 22px;
  font-weight: 800;
}

.section-header p {
  margin: 0;

  color: #8a8f9b;

  font-size: 13px;
}

.section-eyebrow {
  margin-bottom: 6px;
  font-size: 10px;
}

/* =========================================================
   ADD SALE BUTTON
========================================================= */

.btn-add-sale {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  min-height: 45px;

  padding: 0 19px;

  border: 0;
  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #c99f27,
    #e4c45e
  );

  color: #171827;

  font-size: 13px;
  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 7px 20px rgba(201, 159, 39, 0.18);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-add-sale:hover {
  transform: translateY(-2px);

  box-shadow:
    0 11px 25px rgba(201, 159, 39, 0.28);
}

.btn-add-sale i {
  font-size: 13px;
}

/* =========================================================
   TABLE
========================================================= */

.table-wrapper {
  overflow: hidden;

  border: 1px solid #ebedf2;
  border-radius: 20px;

  background: #ffffff;

  box-shadow:
    0 10px 35px rgba(30, 35, 50, 0.06);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.sales-table {
  width: 100%;
  min-width: 760px;

  border-collapse: collapse;
}

.sales-table th {
  padding: 18px 22px;

  border-bottom: 1px solid #eceef2;

  background: #fafbfc;

  color: #9096a2;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;

  text-align: left;
}

.sales-table td {
  padding: 19px 22px;

  border-bottom: 1px solid #f0f1f4;

  color: #555b68;

  font-size: 13px;
}

.sales-table tbody tr:last-child td {
  border-bottom: 0;
}

.sales-table tbody tr {
  transition: background 0.2s ease;
}

.sales-table tbody tr:hover {
  background: #fcfcfd;
}

.text-right {
  text-align: right !important;
}

.sale-id {
  display: inline-flex;

  padding: 6px 10px;

  border-radius: 8px;

  background: #f3f4f7;

  color: #3e4350;

  font-size: 12px;
  font-weight: 800;
}

.date-cell {
  display: inline-flex;
  align-items: center;
  gap: 9px;

  color: #737986;
}

.date-cell i {
  color: #b38b1d;
}

.vehicle-count {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  padding: 7px 10px;

  border-radius: 8px;

  background: rgba(54, 121, 199, 0.08);

  color: #3977b9;

  font-weight: 700;
}

.vehicle-count i {
  font-size: 11px;
}

.sale-amount {
  color: #188453;

  font-size: 14px;
  font-weight: 800;
}

.btn-view {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  padding: 9px 13px;

  border: 1px solid rgba(48, 154, 143, 0.18);
  border-radius: 9px;

  background: rgba(48, 154, 143, 0.08);

  color: #248f85;

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.btn-view:hover {
  background: rgba(48, 154, 143, 0.15);
  transform: translateY(-1px);
}

/* =========================================================
   EMPTY STATE
========================================================= */

.empty-state {
  padding: 70px 25px;

  text-align: center;
}

.empty-icon {
  width: 70px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 18px;

  border-radius: 20px;

  background: #f3f4f7;

  color: #a1a6b0;

  font-size: 25px;
}

.empty-state h3 {
  margin: 0 0 7px;

  color: #303541;

  font-size: 19px;
}

.empty-state p {
  margin: 0 auto 22px;

  color: #9398a4;

  font-size: 13px;
}

/* =========================================================
   LOADING
========================================================= */

.loading-container {
  min-height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #858a96;
}

.loading-spinner {
  width: 45px;
  height: 45px;

  margin-bottom: 15px;

  border: 4px solid #e7e8ec;
  border-top-color: #d4af37;

  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

.loading-container p {
  margin: 0;
  font-size: 13px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================================================
   MODAL
========================================================= */

.premium-modal {
  overflow: hidden;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;

  background:
    radial-gradient(
      circle at top right,
      rgba(212, 175, 55, 0.1),
      transparent 30%
    ),
    linear-gradient(
      145deg,
      #191b2b,
      #121522
    );

  color: #ffffff;

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.35);
}

.premium-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 24px 27px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-title-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.modal-icon {
  width: 48px;
  height: 48px;
  flex: 0 0 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 13px;

  background: rgba(212, 175, 55, 0.13);

  color: #d4af37;

  font-size: 18px;
}

.premium-modal-header .modal-title {
  margin: 0 0 4px;

  color: #ffffff;

  font-size: 18px;
  font-weight: 800;
}

.premium-modal-header p {
  margin: 0;

  color: rgba(255, 255, 255, 0.5);

  font-size: 11px;
}

.custom-close {
  filter: invert(1);
  opacity: 0.65;

  transition: opacity 0.2s ease;
}

.custom-close:hover {
  opacity: 1;
}

.premium-modal-body {
  max-height: 75vh;
  overflow-y: auto;

  padding: 28px;
}

/* =========================================================
   SALE FORM
========================================================= */

.sale-form-section,
.cart-section,
.details-section {
  padding: 22px;

  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.025);
}

.sale-form-section {
  margin-bottom: 20px;
}

.form-section-title {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 20px;
}

.form-section-title > i {
  color: #d4af37;
  font-size: 18px;
}

.form-section-title h6 {
  margin: 0 0 3px;

  color: #ffffff;

  font-size: 14px;
  font-weight: 800;
}

.form-section-title p {
  margin: 0;

  color: rgba(255, 255, 255, 0.45);

  font-size: 11px;
}

.sale-form-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(180px, 0.6fr);
  gap: 18px;
}

.form-group label {
  display: block;

  margin-bottom: 8px;

  color: rgba(255, 255, 255, 0.68);

  font-size: 11px;
  font-weight: 700;
}

.premium-control {
  width: 100%;
  min-height: 45px;

  padding: 0 13px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;

  outline: none;

  background: rgba(255, 255, 255, 0.055);

  color: #ffffff;

  font-size: 13px;

  transition:
    border 0.2s ease,
    background 0.2s ease;
}

.premium-control:focus {
  border-color: rgba(212, 175, 55, 0.7);

  background: rgba(255, 255, 255, 0.075);

  box-shadow:
    0 0 0 3px rgba(212, 175, 55, 0.08);
}

.premium-control option {
  background: #191b2b;
  color: #ffffff;
}

.selected-vehicle-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 12px;

  margin-top: 16px;
}

.selected-info-item {
  padding: 13px;

  border-radius: 10px;

  background: rgba(255, 255, 255, 0.04);
}

.selected-info-item span {
  display: block;

  margin-bottom: 4px;

  color: rgba(255, 255, 255, 0.42);

  font-size: 10px;
}

.selected-info-item strong {
  color: #ffffff;

  font-size: 12px;
}

.btn-add-vehicle {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin-top: 18px;
  padding: 11px 16px;

  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 10px;

  background: rgba(212, 175, 55, 0.1);

  color: #e4c45e;

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.btn-add-vehicle:hover {
  background: rgba(212, 175, 55, 0.17);
  transform: translateY(-1px);
}

/* =========================================================
   CART
========================================================= */

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 18px;
}

.cart-header h6 {
  margin: 0;

  color: #ffffff;

  font-size: 15px;
  font-weight: 800;
}

.cart-count {
  padding: 7px 11px;

  border-radius: 20px;

  background: rgba(212, 175, 55, 0.1);

  color: #d4af37;

  font-size: 10px;
  font-weight: 700;
}

.cart-table-wrapper {
  overflow: hidden;

  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
}

.cart-table {
  width: 100%;
  min-width: 700px;

  border-collapse: collapse;
}

.cart-table th {
  padding: 13px 15px;

  background: rgba(255, 255, 255, 0.045);

  color: rgba(255, 255, 255, 0.48);

  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.9px;

  text-align: left;
}

.cart-table td {
  padding: 14px 15px;

  border-top: 1px solid rgba(255, 255, 255, 0.055);

  color: rgba(255, 255, 255, 0.7);

  font-size: 12px;
}

.cart-number {
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
}

.cart-product {
  display: flex;
  align-items: center;
  gap: 10px;

  color: #ffffff;
  font-weight: 600;
}

.cart-product-icon {
  width: 31px;
  height: 31px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: rgba(212, 175, 55, 0.1);

  color: #d4af37;

  font-size: 11px;
}

.quantity-badge {
  display: inline-flex;

  min-width: 28px;
  min-height: 26px;

  align-items: center;
  justify-content: center;

  padding: 0 7px;

  border-radius: 7px;

  background: rgba(255, 255, 255, 0.07);

  color: #ffffff;

  font-size: 11px;
  font-weight: 700;
}

.subtotal {
  color: #d4af37;
}

.btn-remove {
  width: 33px;
  height: 33px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 88, 88, 0.2);
  border-radius: 8px;

  background: rgba(255, 88, 88, 0.07);

  color: #ff7777;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.btn-remove:hover {
  background: rgba(255, 88, 88, 0.15);
  transform: scale(1.04);
}

.cart-total {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 18px;

  border-top: 1px solid rgba(255, 255, 255, 0.07);

  background: rgba(212, 175, 55, 0.045);
}

.cart-total span {
  display: block;

  color: rgba(255, 255, 255, 0.7);

  font-size: 12px;
  font-weight: 700;
}

.cart-total small {
  display: block;

  margin-top: 3px;

  color: rgba(255, 255, 255, 0.38);

  font-size: 10px;
}

.cart-total strong {
  color: #e5c65c;

  font-size: 19px;
  font-weight: 800;
}

.cart-empty {
  padding: 45px 20px;

  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;

  text-align: center;
}

.cart-empty-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 13px;

  border-radius: 14px;

  background: rgba(255, 255, 255, 0.05);

  color: rgba(255, 255, 255, 0.35);
}

.cart-empty h6 {
  margin: 0 0 6px;

  color: rgba(255, 255, 255, 0.78);

  font-size: 13px;
}

.cart-empty p {
  margin: 0;

  color: rgba(255, 255, 255, 0.4);

  font-size: 11px;
}

/* =========================================================
   SALE SUMMARY
========================================================= */

.sale-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 15px;

  margin-bottom: 20px;
}

.summary-item {
  padding: 17px;

  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.035);
}

.summary-item span {
  display: flex;
  align-items: center;
  gap: 7px;

  margin-bottom: 7px;

  color: rgba(255, 255, 255, 0.42);

  font-size: 10px;
  font-weight: 700;
}

.summary-item span i {
  color: #d4af37;
}

.summary-item strong {
  color: #ffffff;

  font-size: 14px;
}

.summary-item.highlight {
  background: rgba(212, 175, 55, 0.07);
  border-color: rgba(212, 175, 55, 0.13);
}

.summary-item.highlight strong {
  color: #e5c65c;
}

.details-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 15px;
}

.details-section-title h6 {
  margin: 0;

  color: #ffffff;

  font-size: 14px;
  font-weight: 800;
}

.details-section-title span {
  color: rgba(255, 255, 255, 0.4);

  font-size: 10px;
}

/* =========================================================
   MODAL FOOTER
========================================================= */

.premium-modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 10px;

  padding: 18px 27px;

  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.btn-modal-cancel {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  min-height: 42px;

  padding: 0 17px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.045);

  color: rgba(255, 255, 255, 0.7);

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;
}

.btn-modal-cancel:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.btn-complete-sale {
  min-height: 42px;

  padding: 0 20px;

  border: 0;
  border-radius: 10px;

  background: linear-gradient(
    135deg,
    #23955e,
    #31b773
  );

  color: #ffffff;

  font-size: 12px;
  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 7px 20px rgba(35, 149, 94, 0.2);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-complete-sale:hover:not(:disabled) {
  transform: translateY(-1px);

  box-shadow:
    0 10px 25px rgba(35, 149, 94, 0.3);
}

.btn-complete-sale:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.button-spinner {
  display: inline-block;

  width: 13px;
  height: 13px;

  margin-right: 6px;

  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;

  border-radius: 50%;

  vertical-align: -2px;

  animation: spin 0.7s linear infinite;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sales-container {
    width: min(1100px, calc(100% - 50px));
  }
}

@media (max-width: 900px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .header-badge {
    align-self: flex-start;
  }

  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .sale-form-grid {
    grid-template-columns: 1fr;
  }

  .selected-vehicle-info,
  .sale-summary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .main-content {
    padding-top: 110px;
  }

  .sales-container {
    width: calc(100% - 30px);
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .stat-card {
    padding: 19px;
  }

  .page-header {
    margin-bottom: 28px;
  }

  .header-text h1 {
    font-size: 31px;
  }

  .header-text p {
    font-size: 13px;
  }

  .section-header h2 {
    font-size: 19px;
  }

  .btn-add-sale {
    width: 100%;
  }

  .premium-modal-header {
    padding: 19px;
  }

  .premium-modal-body {
    padding: 18px;
  }

  .premium-modal-footer {
    padding: 15px 18px;
  }

  .modal-title-wrapper {
    gap: 10px;
  }

  .modal-icon {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    font-size: 15px;
  }

  .premium-modal-header .modal-title {
    font-size: 15px;
  }

  .premium-modal-header p {
    font-size: 9px;
  }

  .sale-form-section,
  .cart-section,
  .details-section {
    padding: 16px;
  }

  .btn-complete-sale,
  .btn-modal-cancel {
    flex: 1;
  }
}

@media (max-width: 420px) {
  .sales-container {
    width: calc(100% - 22px);
  }

  .main-content {
    padding-top: 105px;
  }

  .sidebar-toggle {
    left: 12px;
    top: 82px;

    width: 42px;
    height: 42px;
  }

  .header-text h1 {
    font-size: 28px;
  }

  .stat-content h3 {
    font-size: 21px;
  }

  .premium-modal-footer {
    flex-direction: column-reverse;
  }

  .btn-complete-sale,
  .btn-modal-cancel {
    width: 100%;
  }

  .cart-total strong {
    font-size: 16px;
  }
}
</style>
<!-- 840 lines -->