<template>
  <div class="sales-page">
    <AdminNavbar />

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

              <button class="btn-add-sale" @click="openSaleModal">
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
                    <tr v-for="sale in sales" :key="sale.id">
                      <td>
                        <span class="sale-id"> #{{ sale.id }} </span>
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
                        <button class="btn-view" @click="viewSaleDetails(sale)">
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

                          <p>You haven't recorded any vehicle sales yet.</p>

                          <button class="btn-add-sale" @click="openSaleModal">
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
                <h5 class="modal-title" id="saleModalLabel">
                  Create New Vehicle Sale
                </h5>

                <p>Add vehicles and complete the customer transaction.</p>
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
                  <label for="vehicle"> Vehicle </label>

                  <select
                    id="vehicle"
                    class="form-control premium-control"
                    v-model="saleItem.product_id"
                  >
                    <option value="">Select a vehicle</option>

                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.id"
                      :disabled="product.quantity <= 0"
                    >
                      {{ product.name }}
                      — KSh {{ formatNumber(product.selling_price) }} — Stock:
                      {{ product.quantity }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="quantity"> Quantity </label>

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
              <div v-if="saleItem.product_id" class="selected-vehicle-info">
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
                  {{ salesList.length === 1 ? "Vehicle" : "Vehicles" }}
                </span>
              </div>

              <div v-if="salesList.length > 0" class="cart-table-wrapper">
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
                                  item.quantity,
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
                      {{ salesList.length === 1 ? "" : "s" }}
                    </small>
                  </div>

                  <strong> KSh {{ formatNumber(cartTotal) }} </strong>
                </div>
              </div>

              <!-- EMPTY CART -->
              <div v-else class="cart-empty">
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
                <h5 class="modal-title" id="viewModalLabel">
                  Sale #{{ currentSale.id }}
                </h5>

                <p>Detailed vehicle sale information.</p>
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
                  {{ currentSale.details ? currentSale.details.length : 0 }}
                </strong>
              </div>

              <div class="summary-item highlight">
                <span>
                  <i class="fas fa-coins"></i>
                  Total Amount
                </span>

                <strong> KSh {{ getSaleTotal(currentSale) }} </strong>
              </div>
            </div>

            <!-- DETAILS TABLE -->
            <div class="details-section">
              <div class="details-section-title">
                <h6>Vehicle Details</h6>
                <span> Sale #{{ currentSale.id }} </span>
              </div>

              <div
                v-if="currentSale.details && currentSale.details.length > 0"
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
                          {{ formatNumber(getProductPrice(detail.product_id)) }}
                        </td>

                        <td>
                          <strong class="subtotal">
                            KSh
                            {{
                              formatNumber(
                                getProductPrice(detail.product_id) *
                                  detail.quantity,
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

                  <strong> KSh {{ getSaleTotal(currentSale) }} </strong>
                </div>
              </div>

              <div v-else class="cart-empty">
                <div class="cart-empty-icon">
                  <i class="fas fa-file-invoice"></i>
                </div>

                <h6>No Sale Details</h6>

                <p>There are no vehicle details available for this sale.</p>
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
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { Modal } from "bootstrap";
import AdminNavbar from "@/components/AdminNavbar.vue";
export default {
  name: "SalesPage",

  components: {
    AdminNavbar,
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
        product_id: "",
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
        return (num / 1e6).toFixed(1) + "M";
      }

      if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + "K";
      }

      return num.toLocaleString();
    },

    formatNumber(num) {
      return num ? Number(num).toLocaleString() : "0";
    },

    formatDate(ts) {
      return ts ? new Date(ts).toLocaleString() : "N/A";
    },

    getProductName(id) {
      const product = this.products.find((p) => p.id === Number(id));

      return product ? product.name : "Unknown Vehicle";
    },

    getProductPrice(id) {
      const product = this.products.find((p) => p.id === Number(id));

      return product ? Number(product.selling_price) || 0 : 0;
    },

    getProductStock(id) {
      const product = this.products.find((p) => p.id === Number(id));

      return product ? Number(product.quantity) || 0 : 0;
    },

    getSaleTotalNum(sale) {
      let total = 0;

      if (sale.details) {
        for (let i = 0; i < sale.details.length; i++) {
          total +=
            this.getProductPrice(sale.details[i].product_id) *
            Number(sale.details[i].quantity || 0);
        }
      }

      return total;
    },

    getSaleTotal(sale) {
      return this.getSaleTotalNum(sale).toLocaleString();
    },

    async getProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
          withCredentials: true,
        });

        this.products = response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          this.$router.push("/login");
        }
      }
    },

    async getSales() {
      try {
        const response = await axios.get(`${API_BASE_URL}/sales`, {
          withCredentials: true,
        });

        this.sales = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;

        if (error.response?.status === 401) {
          this.$router.push("/login");
        }
      }
    },

    addToSaleList() {
      if (!this.saleItem.product_id || !this.saleItem.quantity) {
        alert("Please select a vehicle and enter quantity");

        return;
      }

      if (this.saleItem.quantity <= 0) {
        alert("Quantity must be greater than 0");

        return;
      }

      const product = this.products.find(
        (p) => p.id === Number(this.saleItem.product_id),
      );

      if (product && this.saleItem.quantity > product.quantity) {
        alert(`Insufficient stock! Available: ${product.quantity}`);

        return;
      }

      // Check if product already in cart – if so, merge
      const existing = this.salesList.find(
        (item) => Number(item.product_id) === Number(this.saleItem.product_id),
      );

      if (existing) {
        const newQty = existing.quantity + Number(this.saleItem.quantity);

        if (product && newQty > product.quantity) {
          alert(`Insufficient stock! Available: ${product.quantity}`);

          return;
        }

        existing.quantity = newQty;
      } else {
        this.salesList.push({
          product_id: Number(this.saleItem.product_id),
          quantity: Number(this.saleItem.quantity),
        });
      }

      this.saleItem = {
        product_id: "",
        quantity: 1,
      };
    },

    removeFromList(index) {
      this.salesList.splice(index, 1);
    },

    async makeSale() {
      if (this.salesList.length === 0) {
        alert("Add at least one vehicle before submitting!");

        return;
      }

      // Double-check stock before submitting
      for (let item of this.salesList) {
        const stock = this.getProductStock(item.product_id);

        if (item.quantity > stock) {
          alert(
            `Not enough stock for ${this.getProductName(
              item.product_id,
            )}. Available: ${stock}`,
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
          },
        );

        alert("Sale completed successfully.");

        this.salesList = [];

        this.saleModal?.hide();

        await this.getSales();
        await this.getProducts();
      } catch (error) {
        alert(`❌ Failed: ${error.response?.data?.detail || error.message}`);
      } finally {
        this.isSubmitting = false;
      }
    },

    openSaleModal() {
      if (!this.saleModal) {
        this.saleModal = new Modal(document.getElementById("saleModal"));
      }

      this.saleModal.show();
    },

    viewSaleDetails(sale) {
      this.currentSale = sale;

      if (!this.viewModal) {
        this.viewModal = new Modal(document.getElementById("viewModal"));
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

<style scoped src="../styles/pages/SalesPage.css"></style>
<!-- 840 lines -->
