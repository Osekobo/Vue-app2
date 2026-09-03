<template>
  <div class="purchase-page">
    <!-- Sidebar Toggle -->
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
        <div class="brand-icon">
          <i class="fas fa-car"></i>
        </div>

        <div>
          <h4>OBerlo</h4>
          <p>Inventory Management System</p>
        </div>
      </div>

      <ul class="sidebar-nav">
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
          <router-link class="nav-link active" to="/purchases">
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

    <!-- Main Content -->
    <main>
      <div class="purchase-container">

        <!-- Page Header -->
        <section class="page-header">
          <div class="header-content">
            <div class="header-icon">
              <i class="fas fa-truck"></i>
            </div>

            <div>
              <span class="eyebrow">PROCUREMENT</span>
              <h1>Purchase Orders</h1>
              <p>
                Record incoming vehicle purchases from suppliers and manage
                your yard inventory.
              </p>
            </div>
          </div>
        </section>

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner">
            <div class="spinner-border text-warning"></div>
          </div>

          <h5>Loading purchase data</h5>
          <p>Please wait while we retrieve your records...</p>
        </div>

        <div v-else>

          <!-- Statistics -->
          <section class="stats-grid">

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-file-invoice"></i>
              </div>

              <div class="stat-content">
                <span>Total Orders</span>
                <h3>{{ purchases.length }}</h3>
                <small>Purchase records</small>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-car"></i>
              </div>

              <div class="stat-content">
                <span>Vehicles Purchased</span>
                <h3>{{ totalQuantity }}</h3>
                <small>Total units acquired</small>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>

              <div class="stat-content">
                <span>Total Spent</span>
                <h3>KSh {{ totalCost }}</h3>
                <small>Purchase expenditure</small>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-tags"></i>
              </div>

              <div class="stat-content">
                <span>Unique Models</span>
                <h3>{{ uniqueProducts }}</h3>
                <small>Different vehicles</small>
              </div>
            </div>

          </section>

          <!-- Order Builder -->
          <section class="order-builder">

            <!-- Add Vehicle -->
            <div class="form-card add-vehicle-card">
              <div class="card-heading">
                <div class="heading-icon">
                  <i class="fas fa-plus"></i>
                </div>

                <div>
                  <h2>Add Vehicle</h2>
                  <p>Add a vehicle to the current purchase order</p>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">
                  Select Vehicle
                  <span class="required">*</span>
                </label>

                <select
                  class="form-select custom-select"
                  v-model="selectedProductId"
                  required
                >
                  <option value="">Choose a vehicle...</option>

                  <option
                    v-for="prod in products"
                    :key="prod.id"
                    :value="prod.id"
                  >
                    {{ prod.name }} ({{ prod.model }}) —
                    KSh {{ formatNumber(prod.buying_price) }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">
                  Quantity
                  <span class="required">*</span>
                </label>

                <div class="quantity-input">
                  <i class="fas fa-layer-group"></i>

                  <input
                    type="number"
                    class="form-control"
                    v-model.number="quantity"
                    placeholder="Number of units"
                    min="1"
                    required
                  />
                </div>
              </div>

              <button
                class="btn-add-order"
                @click="addToOrder"
              >
                <i class="fas fa-plus"></i>
                Add Vehicle
              </button>
            </div>

            <!-- Current Order -->
            <div class="form-card current-order-card">

              <div class="card-heading order-heading">
                <div class="heading-icon">
                  <i class="fas fa-clipboard-list"></i>
                </div>

                <div>
                  <h2>Current Order</h2>
                  <p>Review vehicles before placing the order</p>
                </div>

                <span class="items-badge">
                  {{ orderItems.length }}
                  {{ orderItems.length === 1 ? "item" : "items" }}
                </span>
              </div>

              <!-- Empty Order -->
              <div
                v-if="orderItems.length === 0"
                class="empty-order"
              >
                <div class="empty-icon">
                  <i class="fas fa-shopping-cart"></i>
                </div>

                <h4>Your order is empty</h4>
                <p>
                  Select a vehicle from the left and add it to this order.
                </p>
              </div>

              <!-- Order Items -->
              <div v-else class="order-content">

                <div class="table-wrapper">
                  <table class="table order-table">
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Qty</th>
                        <th>Unit Cost</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="(item, index) in orderItems"
                        :key="index"
                      >
                        <td>
                          <div class="order-vehicle">
                            <div class="vehicle-icon">
                              <i class="fas fa-car"></i>
                            </div>

                            <strong>{{ item.name }}</strong>
                          </div>
                        </td>

                        <td>
                          <input
                            type="number"
                            class="quantity-control"
                            v-model.number="item.quantity"
                            min="1"
                            @change="updateOrder"
                          />
                        </td>

                        <td>
                          <span class="price">
                            KSh {{ formatNumber(item.unit_price) }}
                          </span>
                        </td>

                        <td>
                          <strong class="subtotal">
                            KSh
                            {{
                              formatNumber(
                                item.quantity * item.unit_price
                              )
                            }}
                          </strong>
                        </td>

                        <td>
                          <button
                            class="order-item-remove"
                            @click="removeFromOrder(index)"
                            title="Remove"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>

                    <tfoot>
                      <tr>
                        <td colspan="3">
                          <span class="total-label">
                            Total Order Cost
                          </span>
                        </td>

                        <td colspan="2">
                          <span class="order-total">
                            KSh {{ formatNumber(orderTotal) }}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div class="order-footer">
                  <div class="order-summary">
                    <span>Order Total</span>
                    <strong>
                      KSh {{ formatNumber(orderTotal) }}
                    </strong>
                  </div>

                  <button
                    class="btn-place-order"
                    @click="placeOrder"
                    :disabled="orderItems.length === 0 || submitting"
                  >
                    <i
                      :class="
                        submitting
                          ? 'fas fa-spinner fa-spin'
                          : 'fas fa-check-circle'
                      "
                    ></i>

                    {{
                      submitting
                        ? "Processing..."
                        : "Place Purchase Order"
                    }}
                  </button>
                </div>

              </div>
            </div>

          </section>

          <!-- Purchase History -->
          <section class="history-section">

            <div class="section-header">
              <div>
                <span class="eyebrow">HISTORY</span>
                <h2>Purchase History</h2>
                <p>View all recorded vehicle purchases.</p>
              </div>

              <div class="record-count">
                <i class="fas fa-database"></i>
                {{ purchases.length }} Records
              </div>
            </div>

            <div class="history-card">

              <div class="table-wrapper">
                <table class="table purchase-table">

                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Vehicle</th>
                      <th>Model</th>
                      <th>Qty</th>
                      <th>Unit Cost</th>
                      <th>Selling Price</th>
                      <th>Total Spent</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="purchase in purchases"
                      :key="purchase.id"
                    >
                      <td>
                        <span class="order-id">
                          #{{ purchase.id }}
                        </span>
                      </td>

                      <td>
                        <div class="purchase-vehicle">
                          <div class="vehicle-icon small">
                            <i class="fas fa-car"></i>
                          </div>

                          <strong>
                            {{ purchase.product?.name || "N/A" }}
                          </strong>
                        </div>
                      </td>

                      <td>
                        {{ purchase.product?.model || "—" }}
                      </td>

                      <td>
                        <span class="quantity-badge">
                          {{ purchase.quantity }}
                        </span>
                      </td>

                      <td>
                        KSh
                        {{ formatNumber(purchase.unit_buying_price) }}
                      </td>

                      <td>
                        KSh
                        {{ formatNumber(purchase.unit_selling_price) }}
                      </td>

                      <td>
                        <strong class="table-total">
                          KSh
                          {{
                            formatNumber(
                              purchase.quantity *
                                purchase.unit_buying_price
                            )
                          }}
                        </strong>
                      </td>

                      <td>
                        <span class="date-text">
                          {{ formatDate(purchase.created_at) }}
                        </span>
                      </td>
                    </tr>

                    <tr v-if="purchases.length === 0">
                      <td
                        colspan="8"
                        class="empty-history"
                      >
                        <div class="empty-history-icon">
                          <i class="fas fa-file-invoice"></i>
                        </div>

                        <strong>No purchase orders yet</strong>

                        <span>
                          Your purchase history will appear here.
                        </span>
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>

            </div>

          </section>

        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "PurchasePage",

  data() {
    return {
      sidebarOpen: false,
      purchases: [],
      products: [],
      loading: true,
      selectedProductId: null,
      quantity: 1,
      orderItems: [],
      submitting: false,
    };
  },

  computed: {
    totalQuantity() {
      let total = 0;

      for (let i = 0; i < this.purchases.length; i++) {
        total += Number(this.purchases[i].quantity) || 0;
      }

      return total;
    },

    totalCost() {
      let total = 0;

      for (let i = 0; i < this.purchases.length; i++) {
        const purchase = this.purchases[i];

        total +=
          (Number(purchase.unit_buying_price) || 0) *
          (Number(purchase.quantity) || 0);
      }

      return total.toLocaleString();
    },

    uniqueProducts() {
      const ids = new Set();

      for (let i = 0; i < this.purchases.length; i++) {
        ids.add(this.purchases[i].product_id);
      }

      return ids.size;
    },

    orderTotal() {
      let total = 0;

      for (let i = 0; i < this.orderItems.length; i++) {
        total +=
          (Number(this.orderItems[i].quantity) || 0) *
          (Number(this.orderItems[i].unit_price) || 0);
      }

      return total;
    },
  },

  methods: {
    formatNumber(num) {
      const value = Number(num);

      if (!Number.isFinite(value)) {
        return "0";
      }

      return value.toLocaleString();
    },

    formatDate(date) {
      if (!date) return "—";

      const d = new Date(date);

      if (Number.isNaN(d.getTime())) {
        return "—";
      }

      return d.toLocaleDateString("en-KE", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    async getData() {
      try {
        const [productsRes, purchasesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/products`, {
            withCredentials: true,
          }),

          axios.get(`${API_BASE_URL}/purchase`, {
            withCredentials: true,
          }),
        ]);

        this.products = productsRes.data;
        this.purchases = purchasesRes.data;
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.response?.status === 401) {
          this.$router.push("/login");
        }
      } finally {
        this.loading = false;
      }
    },

    addToOrder() {
      if (
        !this.selectedProductId ||
        !this.quantity ||
        this.quantity < 1
      ) {
        alert(
          "Please select a vehicle and enter a valid quantity."
        );

        return;
      }

      const product = this.products.find(
        (p) => p.id === this.selectedProductId
      );

      if (!product) return;

      const existing = this.orderItems.find(
        (item) => item.product_id === product.id
      );

      if (existing) {
        existing.quantity += this.quantity;
      } else {
        this.orderItems.push({
          product_id: product.id,
          name: product.name,
          unit_price: product.buying_price,
          quantity: this.quantity,
        });
      }

      this.selectedProductId = null;
      this.quantity = 1;
    },

    removeFromOrder(index) {
      this.orderItems.splice(index, 1);
    },

    updateOrder() {
      this.orderItems = [...this.orderItems];
    },

    async placeOrder() {
      if (this.orderItems.length === 0) return;

      const confirmed = confirm(
        `You are about to purchase ${
          this.orderItems.length
        } vehicle(s) for KSh ${this.formatNumber(
          this.orderTotal
        )}. Proceed?`
      );

      if (!confirmed) return;

      this.submitting = true;

      try {
        const requests = this.orderItems.map((item) =>
          axios.post(
            `${API_BASE_URL}/purchase`,
            {
              product_id: item.product_id,
              quantity: item.quantity,
            },
            {
              withCredentials: true,
            }
          )
        );

        await Promise.all(requests);

        alert(
          "✅ Purchase order completed successfully!"
        );

        this.orderItems = [];

        await this.getData();
      } catch (error) {
        alert(
          "❌ Failed to record purchase:\n" +
            (error.response?.data?.detail || error.message)
        );
      } finally {
        this.submitting = false;
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

  mounted() {
    this.getData();
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

.purchase-page {
  min-height: 100vh;
  background: #f5f6fa;
  color: #1a1a2e;
}

main {
  min-height: 100vh;
  padding-top: 85px;
}

.purchase-container {
  width: min(1380px, calc(100% - 70px));
  margin: 0 auto;
  padding: 25px 0 80px;
}

/* =========================================================
   SIDEBAR
========================================================= */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: -290px;
  width: 280px;
  padding-top: 75px;
  background:
    radial-gradient(
      circle at top right,
      rgba(255, 193, 7, 0.08),
      transparent 30%
    ),
    linear-gradient(
      180deg,
      #141426 0%,
      #171c35 55%,
      #111426 100%
    );
  box-shadow: 10px 0 35px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease;
  z-index: 1001;
}

.sidebar.show {
  left: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 24px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #ffc107;
  color: #111;
  font-size: 19px;
  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.2);
}

.sidebar-header h4 {
  margin: 0;
  color: #ffc107;
  font-size: 21px;
  font-weight: 800;
}

.sidebar-header p {
  margin: 3px 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  line-height: 1.4;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar .nav-item {
  margin: 5px 10px;
}

.sidebar .nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 13px 15px;
  border-radius: 11px;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.sidebar .nav-link i {
  width: 22px;
  text-align: center;
  font-size: 16px;
}

.sidebar .nav-link:hover {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
  transform: translateX(4px);
}

.sidebar .nav-link.active {
  background: #ffc107;
  color: #111;
  box-shadow: 0 7px 18px rgba(255, 193, 7, 0.18);
}

.sidebar .logout-btn {
  margin-top: 35px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar .logout-btn .nav-link {
  color: #ff7373;
}

.sidebar .logout-btn .nav-link:hover {
  background: rgba(255, 80, 80, 0.12);
  color: #ff8585;
}

/* =========================================================
   SIDEBAR TOGGLE
========================================================= */

.sidebar-toggle {
  position: fixed;
  top: 82px;
  left: 20px;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: #ffc107;
  color: #111;
  font-size: 18px;
  cursor: pointer;
  z-index: 1002;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16);
  transition: all 0.25s ease;
}

.sidebar-toggle:hover {
  transform: translateY(-2px) scale(1.04);
  background: #ffca2c;
}

/* =========================================================
   OVERLAY
========================================================= */

.overlay {
  position: fixed;
  inset: 0;
  display: none;
  background: rgba(5, 8, 20, 0.58);
  backdrop-filter: blur(3px);
  z-index: 1000;
}

.overlay.show {
  display: block;
}

/* =========================================================
   PAGE HEADER
========================================================= */

.page-header {
  margin-bottom: 35px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 18px;
}

.header-icon {
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffc107;
  color: #111;
  border-radius: 17px;
  font-size: 25px;
  box-shadow: 0 10px 25px rgba(255, 193, 7, 0.18);
}

.eyebrow {
  display: block;
  margin-bottom: 5px;
  color: #a57a00;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.7px;
}

.page-header h1 {
  margin: 0;
  color: #17182b;
  font-size: clamp(28px, 3vw, 38px);
  font-weight: 800;
  letter-spacing: -0.8px;
}

.page-header p {
  margin: 7px 0 0;
  color: #737782;
  font-size: 14px;
}

/* =========================================================
   LOADING
========================================================= */

.loading-state {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(25, 30, 50, 0.05);
}

.loading-spinner {
  margin-bottom: 18px;
}

.loading-spinner .spinner-border {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

.loading-state h5 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
}

.loading-state p {
  margin: 7px 0 0;
  color: #858995;
  font-size: 13px;
}

/* =========================================================
   STAT CARDS
========================================================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  padding: 22px;
  background: #fff;
  border: 1px solid rgba(30, 35, 60, 0.05);
  border-radius: 18px;
  box-shadow: 0 9px 30px rgba(20, 25, 45, 0.055);
  transition: all 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(20, 25, 45, 0.09);
}

.stat-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: rgba(255, 193, 7, 0.13);
  color: #d49d00;
  font-size: 20px;
}

.stat-content {
  min-width: 0;
}

.stat-content span {
  display: block;
  color: #777b86;
  font-size: 12px;
  font-weight: 600;
}

.stat-content h3 {
  margin: 4px 0 2px;
  color: #17182b;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.15;
  word-break: break-word;
}

.stat-content small {
  color: #a1a4ac;
  font-size: 11px;
}

/* =========================================================
   ORDER BUILDER
========================================================= */

.order-builder {
  display: grid;
  grid-template-columns: minmax(310px, 0.85fr) minmax(0, 1.5fr);
  gap: 25px;
  margin-bottom: 45px;
}

.form-card {
  min-width: 0;
  padding: 28px;
  background: #fff;
  border: 1px solid rgba(30, 35, 60, 0.05);
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(20, 25, 45, 0.055);
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 27px;
}

.heading-icon {
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 193, 7, 0.13);
  color: #d49d00;
  font-size: 17px;
}

.card-heading h2 {
  margin: 0;
  color: #191a2b;
  font-size: 17px;
  font-weight: 750;
}

.card-heading p {
  margin: 3px 0 0;
  color: #9699a2;
  font-size: 11px;
}

.form-group {
  margin-bottom: 21px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #343746;
  font-size: 13px;
  font-weight: 700;
}

.required {
  color: #dc3545;
}

.custom-select,
.form-card .form-control {
  width: 100%;
  min-height: 45px;
  border: 1px solid #e3e5ea;
  border-radius: 11px;
  background: #fafbfc;
  color: #292b39;
  padding: 10px 14px;
  font-size: 13px;
  transition: all 0.2s ease;
}

.custom-select:focus,
.form-card .form-control:focus {
  border-color: #ffc107;
  background: #fff;
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.1);
}

.quantity-input {
  position: relative;
}

.quantity-input i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #9b9da5;
  font-size: 13px;
}

.quantity-input .form-control {
  padding-left: 40px;
}

.btn-add-order {
  width: 100%;
  min-height: 47px;
  border: none;
  border-radius: 12px;
  background: #ffc107;
  color: #111;
  font-size: 14px;
  font-weight: 750;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-add-order:hover {
  background: #ffca2c;
  transform: translateY(-2px);
  box-shadow: 0 9px 22px rgba(255, 193, 7, 0.2);
}

.btn-add-order i {
  margin-right: 7px;
}

/* =========================================================
   CURRENT ORDER
========================================================= */

.order-heading {
  margin-bottom: 22px;
}

.items-badge {
  margin-left: auto;
  padding: 7px 12px;
  border-radius: 30px;
  background: rgba(255, 193, 7, 0.14);
  color: #a27600;
  font-size: 11px;
  font-weight: 750;
  white-space: nowrap;
}

.empty-order {
  min-height: 245px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px dashed #e0e2e7;
  border-radius: 15px;
  background: #fafbfc;
  text-align: center;
}

.empty-icon {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
  border-radius: 50%;
  background: rgba(255, 193, 7, 0.11);
  color: #d49d00;
  font-size: 21px;
}

.empty-order h4 {
  margin: 0;
  color: #363846;
  font-size: 15px;
  font-weight: 700;
}

.empty-order p {
  max-width: 280px;
  margin: 7px 0 0;
  color: #999ca5;
  font-size: 12px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.order-table,
.purchase-table {
  width: 100%;
  min-width: 700px;
  margin: 0;
  border-collapse: separate;
  border-spacing: 0;
}

.order-table th,
.purchase-table th {
  padding: 12px 13px;
  border: none;
  background: #f7f8fa;
  color: #747783;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  white-space: nowrap;
}

.order-table th:first-child,
.purchase-table th:first-child {
  border-radius: 10px 0 0 10px;
}

.order-table th:last-child,
.purchase-table th:last-child {
  border-radius: 0 10px 10px 0;
}

.order-table td,
.purchase-table td {
  padding: 15px 13px;
  border-bottom: 1px solid #f0f1f4;
  color: #5f626d;
  font-size: 12px;
  vertical-align: middle;
}

.order-table tbody tr:last-child td {
  border-bottom: none;
}

.order-vehicle,
.purchase-vehicle {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 150px;
}

.vehicle-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #f4f5f7;
  color: #c08d00;
  font-size: 13px;
}

.vehicle-icon.small {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  font-size: 12px;
}

.order-vehicle strong,
.purchase-vehicle strong {
  color: #30323e;
  font-size: 12px;
}

.quantity-control {
  width: 65px;
  height: 34px;
  padding: 5px 8px;
  border: 1px solid #e1e3e8;
  border-radius: 8px;
  background: #fafbfc;
  text-align: center;
  font-size: 12px;
}

.quantity-control:focus {
  border-color: #ffc107;
  outline: none;
}

.price {
  white-space: nowrap;
  color: #656873;
}

.subtotal {
  white-space: nowrap;
  color: #252734;
}

.order-item-remove {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 9px;
  background: rgba(220, 53, 69, 0.08);
  color: #dc3545;
  cursor: pointer;
  transition: all 0.2s ease;
}

.order-item-remove:hover {
  background: #dc3545;
  color: white;
  transform: translateY(-1px);
}

.order-table tfoot td {
  padding-top: 18px;
  border-bottom: none;
  background: #fff;
}

.total-label {
  color: #70737e;
  font-size: 12px;
  font-weight: 700;
}

.order-total {
  color: #17182b;
  font-size: 17px;
  font-weight: 800;
  white-space: nowrap;
}

.order-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eceef2;
}

.order-summary span {
  display: block;
  margin-bottom: 3px;
  color: #92959f;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.order-summary strong {
  color: #181a2a;
  font-size: 21px;
  font-weight: 800;
}

.btn-place-order {
  min-height: 45px;
  padding: 0 23px;
  border: none;
  border-radius: 11px;
  background: #28a745;
  color: white;
  font-size: 13px;
  font-weight: 750;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.btn-place-order:hover:not(:disabled) {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 9px 22px rgba(40, 167, 69, 0.2);
}

.btn-place-order:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* =========================================================
   HISTORY
========================================================= */

.history-section {
  margin-top: 5px;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  color: #181a2b;
  font-size: 24px;
  font-weight: 800;
}

.section-header p {
  margin: 5px 0 0;
  color: #888b95;
  font-size: 12px;
}

.record-count {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  border: 1px solid #e5e6ea;
  border-radius: 30px;
  background: white;
  color: #6d707a;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.record-count i {
  color: #c49300;
}

.history-card {
  overflow: hidden;
  padding: 18px;
  background: white;
  border: 1px solid rgba(30, 35, 60, 0.05);
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(20, 25, 45, 0.055);
}

.purchase-table {
  min-width: 1000px;
}

.purchase-table tbody tr {
  transition: background 0.2s ease;
}

.purchase-table tbody tr:hover {
  background: #fafbfc;
}

.order-id {
  display: inline-block;
  padding: 6px 9px;
  border-radius: 7px;
  background: #f4f5f7;
  color: #565964;
  font-size: 11px;
  font-weight: 750;
}

.quantity-badge {
  display: inline-flex;
  min-width: 29px;
  height: 27px;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-radius: 8px;
  background: rgba(255, 193, 7, 0.13);
  color: #a17400;
  font-size: 11px;
  font-weight: 800;
}

.table-total {
  color: #252735;
  white-space: nowrap;
}

.date-text {
  color: #7d808a;
  font-size: 11px;
  white-space: nowrap;
}

.empty-history {
  height: 230px;
  text-align: center;
}

.empty-history-icon {
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #f7f8fa;
  color: #a4a6ad;
  font-size: 20px;
}

.empty-history strong,
.empty-history span {
  display: block;
}

.empty-history strong {
  color: #4a4c57;
  font-size: 14px;
}

.empty-history span {
  margin-top: 5px;
  color: #999ca5;
  font-size: 11px;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1200px) {
  .purchase-container {
    width: min(100% - 50px, 1100px);
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .order-builder {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .purchase-container {
    width: min(100% - 40px, 800px);
  }

  .order-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .btn-place-order {
    width: 100%;
  }

  .order-summary {
    text-align: center;
  }
}

@media (max-width: 768px) {
  main {
    padding-top: 75px;
  }

  .purchase-container {
    width: calc(100% - 28px);
    padding-top: 20px;
  }

  .sidebar-toggle {
    top: 72px;
    left: 12px;
    width: 42px;
    height: 42px;
  }

  .header-content {
    align-items: flex-start;
  }

  .header-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    font-size: 20px;
  }

  .page-header {
    margin-bottom: 25px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .page-header p {
    line-height: 1.5;
  }

  .stats-grid {
    gap: 14px;
    margin-bottom: 25px;
  }

  .stat-card {
    padding: 17px 14px;
    gap: 11px;
  }

  .stat-icon {
    width: 42px;
    height: 42px;
    border-radius: 11px;
    font-size: 16px;
  }

  .stat-content h3 {
    font-size: 19px;
  }

  .stat-content span {
    font-size: 10px;
  }

  .stat-content small {
    display: none;
  }

  .form-card {
    padding: 20px 17px;
    border-radius: 17px;
  }

  .card-heading {
    margin-bottom: 21px;
  }

  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .record-count {
    align-self: flex-start;
  }

  .history-card {
    padding: 10px;
    border-radius: 17px;
  }
}

@media (max-width: 576px) {
  .purchase-container {
    width: calc(100% - 20px);
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 17px 18px;
  }

  .stat-content small {
    display: block;
  }

  .header-content {
    gap: 12px;
  }

  .header-icon {
    width: 46px;
    height: 46px;
    font-size: 18px;
  }

  .page-header h1 {
    font-size: 23px;
  }

  .page-header p {
    font-size: 12px;
  }

  .items-badge {
    font-size: 10px;
    padding: 6px 9px;
  }

  .order-summary strong {
    font-size: 19px;
  }

  .section-header h2 {
    font-size: 21px;
  }
}

@media (max-width: 400px) {
  .purchase-container {
    width: calc(100% - 14px);
  }

  .sidebar {
    width: 270px;
  }

  .form-card {
    padding: 17px 13px;
  }

  .card-heading h2 {
    font-size: 15px;
  }

  .card-heading p {
    font-size: 10px;
  }

  .btn-add-order,
  .btn-place-order {
    font-size: 12px;
  }
}
</style>

<!-- 680 lines -->