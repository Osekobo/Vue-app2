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
          <router-link class="nav-link active" to="/purchases">
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
      <div class="container mt-4">
        <!-- Page Header -->
        <div class="page-header">
          <h1><i class="fas fa-truck me-2"></i>Purchase Orders</h1>
          <p>Record incoming vehicle purchases from suppliers to add to your yard inventory.</p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-warning" style="width: 3rem; height: 3rem"></div>
          <p class="text-muted mt-3">Loading...</p>
        </div>

        <div v-else>
          <!-- Stats -->
          <div class="row g-4 mb-4">
            <div class="col-md-3 col-6">
              <div class="stat-card">
                <i class="fas fa-file-invoice"></i>
                <h3>{{ purchases.length }}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="stat-card">
                <i class="fas fa-car"></i>
                <h3>{{ totalQuantity }}</h3>
                <p>Vehicles Purchased</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="stat-card">
                <i class="fas fa-dollar-sign"></i>
                <h3>KSh {{ totalCost }}</h3>
                <p>Total Spent</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="stat-card">
                <i class="fas fa-tags"></i>
                <h3>{{ uniqueProducts }}</h3>
                <p>Unique Models</p>
              </div>
            </div>
          </div>

          <!-- Purchase Order Builder -->
          <div class="row g-4 mb-4">
            <!-- Add Vehicle Section -->
            <div class="col-lg-5">
              <div class="form-card">
                <h5 class="mb-3">
                  <i class="fas fa-plus-circle text-warning me-2"></i>Add Vehicle to Order
                </h5>
                <div class="mb-3">
                  <label class="form-label">Select Vehicle <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="selectedProductId" required>
                    <option value="">Choose a vehicle...</option>
                    <option v-for="prod in products" :key="prod.id" :value="prod.id">
                      {{ prod.name }} ({{ prod.model }}) — KSh {{ formatNumber(prod.buying_price) }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Quantity <span class="text-danger">*</span></label>
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="quantity"
                    placeholder="Number of units"
                    min="1"
                    required
                  />
                </div>
                <button class="btn-add-order w-100" @click="addToOrder">
                  <i class="fas fa-plus me-2"></i>Add Vehicle
                </button>
              </div>
            </div>

            <!-- Current Order Summary -->
            <div class="col-lg-7">
              <div class="form-card">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="mb-0">
                    <i class="fas fa-clipboard-list text-warning me-2"></i>Current Order
                  </h5>
                  <span class="badge bg-warning text-dark">{{ orderItems.length }} items</span>
                </div>
                <div v-if="orderItems.length === 0" class="text-center py-4">
                  <p class="text-muted mb-0">Order is empty</p>
                </div>
                <div v-else>
                  <div class="table-responsive">
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
                          <td>{{ item.name }}</td>
                          <td>
                            <input
                              type="number"
                              class="form-control form-control-sm"
                              style="width: 70px"
                              v-model.number="item.quantity"
                              min="1"
                              @change="updateOrder"
                            />
                          </td>
                          <td>KSh {{ formatNumber(item.unit_price) }}</td>
                          <td>KSh {{ formatNumber(item.quantity * item.unit_price) }}</td>
                          <td>
                            <button class="order-item-remove" @click="removeFromOrder(index)" title="Remove">
                              <i class="fas fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colspan="3" class="text-end order-total">Total Cost:</th>
                          <th colspan="2" class="order-total">KSh {{ formatNumber(orderTotal) }}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <button
                    class="btn-place-order"
                    @click="placeOrder"
                    :disabled="orderItems.length === 0 || submitting"
                  >
                    <i class="fas fa-check me-2"></i>
                    {{ submitting ? 'Processing...' : 'Place Purchase Order' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Purchase History Table -->
          <div class="table-responsive">
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
                  <td>{{ purchase.id }}</td>
                  <td><strong>{{ purchase.product?.name || 'N/A' }}</strong></td>
                  <td>{{ purchase.product?.model || '—' }}</td>
                  <td>{{ purchase.quantity }}</td>
                  <td>KSh {{ formatNumber(purchase.unit_buying_price) }}</td>
                  <td>KSh {{ formatNumber(purchase.unit_selling_price) }}</td>
                  <td>KSh {{ formatNumber(purchase.quantity * purchase.unit_buying_price) }}</td>
                  <td>{{ formatDate(purchase.created_at) }}</td>
                </tr>
                <tr v-if="purchases.length === 0">
                  <td colspan="8" class="text-center text-muted py-4">
                    No purchase orders recorded yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'PurchasePage',
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
        total += this.purchases[i].quantity || 0;
      }
      return total;
    },
    totalCost() {
      let total = 0;
      for (let i = 0; i < this.purchases.length; i++) {
        const p = this.purchases[i];
        total += (p.unit_buying_price || 0) * (p.quantity || 0);
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
        total += this.orderItems[i].quantity * this.orderItems[i].unit_price;
      }
      return total;
    },
  },
  methods: {
    formatNumber(num) {
      return num ? Number(num).toLocaleString() : '0';
    },
    formatDate(date) {
      if (!date) return '—';
      const d = new Date(date);
      return d.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    async getData() {
      try {
        const [productsRes, purchasesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/products`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/purchase`, { withCredentials: true }),
        ]);
        this.products = productsRes.data;
        this.purchases = purchasesRes.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
      } finally {
        this.loading = false;
      }
    },
    addToOrder() {
      if (!this.selectedProductId || !this.quantity || this.quantity < 1) {
        alert('Please select a vehicle and enter a valid quantity.');
        return;
      }
      const product = this.products.find((p) => p.id === this.selectedProductId);
      if (!product) return;

      // Check if already in order
      const existing = this.orderItems.find((item) => item.product_id === product.id);
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
      // Reset selection
      this.selectedProductId = null;
      this.quantity = 1;
    },
    removeFromOrder(index) {
      this.orderItems.splice(index, 1);
    },
    updateOrder() {
      // Trigger reactivity
      this.orderItems = [...this.orderItems];
    },
    async placeOrder() {
      if (this.orderItems.length === 0) return;
      if (
        !confirm(
          `You are about to purchase ${this.orderItems.length} vehicle(s) for KSh ${this.formatNumber(this.orderTotal)}. Proceed?`
        )
      ) return;

      this.submitting = true;
      try {
        const requests = this.orderItems.map((item) =>
          axios.post(
            `${API_BASE_URL}/purchase`,
            {
              product_id: item.product_id,
              quantity: item.quantity,
            },
            { withCredentials: true }
          )
        );
        await Promise.all(requests);
        alert('✅ Purchase order completed successfully!');

        // Clear order
        this.orderItems = [];
        // Refresh history
        await this.getData();
      } catch (error) {
        alert(
          '❌ Failed to record purchase:\n' +
            (error.response?.data?.detail || error.message)
        );
      } finally {
        this.submitting = false;
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
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
/* ── Global & shared styles (scoped) ── */
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

/* ── Page styles ── */
.page-header h1 {
  color: #1a1a2e;
  font-weight: 800;
}
.page-header p {
  color: #666;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
.stat-card i {
  font-size: 32px;
  color: #ffc107;
  margin-bottom: 8px;
}
.stat-card h3 {
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}
.stat-card p {
  color: #888;
  margin: 0;
  font-size: 14px;
}

.purchase-table {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
}
.purchase-table th {
  background: #f8f9fa;
  color: #1a1a2e;
  font-weight: 600;
  border: none;
  padding: 14px 16px;
  font-size: 13px;
  white-space: nowrap;
}
.purchase-table td {
  padding: 12px 16px;
  border-color: #f0f0f0;
  vertical-align: middle;
  font-size: 13px;
}

.form-card {
  background: white;
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  height: 100%;
}
.form-card .form-label {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 14px;
}
.form-card .form-control,
.form-card .form-select {
  border-radius: 30px;
  padding: 10px 18px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
  font-size: 14px;
}
.form-card .form-control:focus,
.form-card .form-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.10);
}
.btn-add-order {
  background: #ffc107;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-add-order:hover {
  background: #ffca2c;
  transform: scale(1.02);
}
.btn-place-order {
  background: #28a745;
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 40px;
  font-weight: 700;
  transition: all 0.3s;
  font-size: 15px;
  width: 100%;
}
.btn-place-order:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(40, 167, 69, 0.25);
}
.btn-place-order:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.order-item-remove {
  color: #dc3545;
  cursor: pointer;
  transition: all 0.2s;
  background: none;
  border: none;
  padding: 4px 8px;
}
.order-item-remove:hover {
  color: #c82333;
  transform: scale(1.2);
}
.order-table td {
  vertical-align: middle;
}
.order-total {
  font-weight: 700;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .purchase-table th,
  .purchase-table td {
    font-size: 12px;
    padding: 8px 10px;
  }
  .form-card {
    padding: 16px;
  }
  .btn-add-order,
  .btn-place-order {
    width: 100%;
  }
}
</style>