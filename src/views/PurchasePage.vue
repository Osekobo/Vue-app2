<template>
  <div class="purchase-page">
    <AdminNavbar />

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
                Record incoming vehicle purchases from suppliers and manage your
                yard inventory.
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
                    {{ prod.name }} ({{ prod.model }}) — KSh
                    {{ formatNumber(prod.buying_price) }}
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

              <button class="btn-add-order" @click="addToOrder">
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
              <div v-if="orderItems.length === 0" class="empty-order">
                <div class="empty-icon">
                  <i class="fas fa-shopping-cart"></i>
                </div>

                <h4>Your order is empty</h4>
                <p>Select a vehicle from the left and add it to this order.</p>
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
                      <tr v-for="(item, index) in orderItems" :key="index">
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
                            {{ formatNumber(item.quantity * item.unit_price) }}
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
                          <span class="total-label"> Total Order Cost </span>
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
                    <strong> KSh {{ formatNumber(orderTotal) }} </strong>
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

                    {{ submitting ? "Processing..." : "Place Purchase Order" }}
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
                    <tr v-for="purchase in purchases" :key="purchase.id">
                      <td>
                        <span class="order-id"> #{{ purchase.id }} </span>
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
                              purchase.quantity * purchase.unit_buying_price,
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
                      <td colspan="8" class="empty-history">
                        <div class="empty-history-icon">
                          <i class="fas fa-file-invoice"></i>
                        </div>

                        <strong>No purchase orders yet</strong>

                        <span> Your purchase history will appear here. </span>
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
import AdminNavbar from "@/components/AdminNavbar.vue";

export default {
  name: "PurchasePage",

  components: {
    AdminNavbar,
  },

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
      if (!this.selectedProductId || !this.quantity || this.quantity < 1) {
        alert("Please select a vehicle and enter a valid quantity.");

        return;
      }

      const product = this.products.find(
        (p) => p.id === this.selectedProductId,
      );

      if (!product) return;

      const existing = this.orderItems.find(
        (item) => item.product_id === product.id,
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
        } vehicle(s) for KSh ${this.formatNumber(this.orderTotal)}. Proceed?`,
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
            },
          ),
        );

        await Promise.all(requests);

        alert("Purchase order completed successfully.");

        this.orderItems = [];

        await this.getData();
      } catch (error) {
        alert(
          "❌ Failed to record purchase:\n" +
            (error.response?.data?.detail || error.message),
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
    this.getData();
  },
};
</script>

<style scoped src="../styles/pages/PurchasePage.css"></style>

<!-- 680 lines -->
