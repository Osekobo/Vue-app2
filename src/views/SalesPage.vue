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
        <p>Car Yard Management System</p>
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
          <router-link class="nav-link active" to="/sales">
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
          <h1><i class="fas fa-dollar-sign me-2"></i>Vehicle Sales</h1>
          <p>Record and manage vehicle sales from your yard inventory</p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-warning" style="width:2rem;height:2rem"></div>
          <p class="text-muted mt-2">Loading sales...</p>
        </div>

        <div v-else>
          <!-- Stats -->
          <div class="row g-2 g-md-3 mb-4">
            <div class="col-6 col-sm-3">
              <div class="stat-card">
                <i class="fas fa-file-invoice"></i>
                <h3>{{ sales.length }}</h3>
                <p>Total Sales</p>
              </div>
            </div>
            <div class="col-6 col-sm-3">
              <div class="stat-card">
                <i class="fas fa-car"></i>
                <h3>{{ totalItemsSold }}</h3>
                <p>Vehicles Sold</p>
              </div>
            </div>
            <div class="col-6 col-sm-3">
              <div class="stat-card">
                <i class="fas fa-wallet"></i>
                <h3>KSh {{ formatShortNumber(totalRevenueNum) }}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
            <div class="col-6 col-sm-3">
              <div class="stat-card">
                <i class="fas fa-users"></i>
                <h3>{{ sales.length }}</h3>
                <p>Customers Served</p>
              </div>
            </div>
          </div>

          <!-- New Sale Button -->
          <div class="text-end mb-3">
            <button type="button" class="btn-add" @click="openSaleModal">
              <i class="fas fa-plus me-1"></i>New Vehicle Sale
            </button>
          </div>

          <!-- Sales Table -->
          <div class="table-responsive">
            <table class="table sales-table">
              <thead>
                <tr>
                  <th>Sale ID</th>
                  <th>Sold On</th>
                  <th>Total Vehicles</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sale in sales" :key="sale.id">
                  <td>{{ sale.id }}</td>
                  <td>{{ formatDate(sale.created_at) }}</td>
                  <td>{{ sale.details ? sale.details.length : 0 }}</td>
                  <td class="text-success fw-bold">KSh {{ getSaleTotal(sale) }}</td>
                  <td>
                    <button class="btn-view" @click="viewSaleDetails(sale)">
                      <i class="fas fa-eye me-1"></i>View
                    </button>
                  </td>
                </tr>
                <tr v-if="sales.length === 0">
                  <td colspan="5" class="text-center text-muted py-4">No sales recorded yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- ===== SALE MODAL (Create New Sale) ===== -->
    <div class="modal fade" id="saleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5"><i class="fas fa-cart-plus me-2"></i>Create New Vehicle Sale</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-8 mb-3">
                <label class="form-label text-white">Select Vehicle</label>
                <select class="form-select-custom" v-model="saleItem.product_id" style="width:100%">
                  <option disabled value="">-- Select a vehicle --</option>
                  <option
                    v-for="c in products"
                    :key="c.id"
                    :value="c.id"
                    :disabled="c.quantity === 0"
                  >
                    {{ c.name }} - KSh {{ formatNumber(c.selling_price) }} (Stock: {{ c.quantity }})
                  </option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label text-white">Quantity</label>
                <input
                  type="number"
                  v-model.number="saleItem.quantity"
                  class="form-control-custom"
                  placeholder="Number"
                  min="1"
                />
              </div>
            </div>
            <div class="text-end mb-3">
              <button class="btn-modal-submit" @click="addToSaleList">
                <i class="fas fa-cart-plus me-1"></i>Add Vehicle
              </button>
            </div>

            <!-- Cart Table -->
            <div class="table-responsive mt-3">
              <table class="table cart-table">
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
                  <tr v-for="(item, index) in salesList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ getProductName(item.product_id) }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>KSh {{ formatNumber(getProductPrice(item.product_id)) }}</td>
                    <td class="text-success">
                      KSh {{ formatNumber(getProductPrice(item.product_id) * item.quantity) }}
                    </td>
                    <td>
                      <button class="btn-outline-danger-custom" @click="removeFromList(index)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="salesList.length === 0">
                    <td colspan="6" class="text-center text-muted">No vehicles added yet.</td>
                  </tr>
                </tbody>
                <tfoot v-if="salesList.length > 0">
                  <tr style="background:rgba(255,193,7,0.15)">
                    <th colspan="4" class="text-end">Total:</th>
                    <th colspan="2">KSh {{ formatNumber(cartTotal) }}</th>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div class="text-center mt-3" v-if="salesList.length > 0">
              <button
                class="btn-modal-submit"
                @click="makeSale"
                :disabled="isSubmitting"
                style="background:#28a745; color:white"
              >
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                <i class="fas fa-check-circle me-1"></i>
                {{ isSubmitting ? 'Processing...' : 'Complete Sale - KSh ' + formatNumber(cartTotal) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== VIEW DETAILS MODAL ===== -->
    <div class="modal fade" id="viewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5"><i class="fas fa-receipt me-2"></i>Sale #{{ currentSale.id }} Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Sale Date:</strong> {{ formatDate(currentSale.created_at) }}</p>
            <p>
              <strong>Total Amount:</strong>
              <span class="text-success fw-bold">KSh {{ getSaleTotal(currentSale) }}</span>
            </p>
            <hr />
            <div class="table-responsive">
              <table class="table" style="background:white; border-radius:10px">
                <thead style="background:#ffc107">
                  <tr>
                    <th style="color:#1a1a2e">Vehicle</th>
                    <th style="color:#1a1a2e">Qty</th>
                    <th style="color:#1a1a2e">Price</th>
                    <th style="color:#1a1a2e">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in currentSale.details" :key="idx">
                    <td>{{ getProductName(item.product_id) }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>KSh {{ formatNumber(getProductPrice(item.product_id)) }}</td>
                    <td class="text-success">
                      KSh {{ formatNumber(getProductPrice(item.product_id) * item.quantity) }}
                    </td>
                  </tr>
                  <tr v-if="!currentSale.details?.length">
                    <td colspan="4" class="text-center">No items found</td>
                  </tr>
                </tbody>
                <tfoot v-if="currentSale.details?.length">
                  <tr style="background:#fff3cd">
                    <th colspan="3" class="text-end">Total:</th>
                    <th>KSh {{ getSaleTotal(currentSale) }}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

export default {
  name: 'SalesPage',
  data() {
    return {
      sidebarOpen: false,
      products: [],
      sales: [],
      salesList: [],
      loading: true,
      isSubmitting: false,
      saleItem: { product_id: '', quantity: 1 },
      currentSale: { id: null, details: [], created_at: null },
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
        total += this.getProductPrice(this.salesList[i].product_id) * this.salesList[i].quantity;
      }
      return total;
    },
  },
  methods: {
    formatShortNumber(num) {
      if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
      if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
      return num.toLocaleString();
    },
    formatNumber(num) {
      return num ? Number(num).toLocaleString() : '0';
    },
    formatDate(ts) {
      return ts ? new Date(ts).toLocaleString() : 'N/A';
    },
    getProductName(id) {
      const p = this.products.find(p => p.id === id);
      return p ? p.name : 'Unknown';
    },
    getProductPrice(id) {
      const p = this.products.find(p => p.id === id);
      return p ? p.selling_price : 0;
    },
    getProductStock(id) {
      const p = this.products.find(p => p.id === id);
      return p ? p.quantity : 0;
    },
    getSaleTotalNum(sale) {
      let total = 0;
      if (sale.details) {
        for (let i = 0; i < sale.details.length; i++) {
          total += this.getProductPrice(sale.details[i].product_id) * sale.details[i].quantity;
        }
      }
      return total;
    },
    getSaleTotal(sale) {
      return this.getSaleTotalNum(sale).toLocaleString();
    },

    async getProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, { withCredentials: true });
        this.products = response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
      }
    },
    async getSales() {
      try {
        const response = await axios.get(`${API_BASE_URL}/sales`, { withCredentials: true });
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
      if (!this.saleItem.product_id || !this.saleItem.quantity) {
        alert('Please select a vehicle and enter quantity');
        return;
      }
      if (this.saleItem.quantity <= 0) {
        alert('Quantity must be greater than 0');
        return;
      }
      const product = this.products.find(p => p.id === this.saleItem.product_id);
      if (product && this.saleItem.quantity > product.quantity) {
        alert(`Insufficient stock! Available: ${product.quantity}`);
        return;
      }
      // Check if product already in cart – if so, merge
      const existing = this.salesList.find(item => item.product_id === this.saleItem.product_id);
      if (existing) {
        const newQty = existing.quantity + this.saleItem.quantity;
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
      this.saleItem = { product_id: '', quantity: 1 };
    },
    removeFromList(index) {
      this.salesList.splice(index, 1);
    },

    async makeSale() {
      if (this.salesList.length === 0) {
        alert('Add at least one vehicle before submitting!');
        return;
      }
      // Double-check stock before submitting
      for (let item of this.salesList) {
        const stock = this.getProductStock(item.product_id);
        if (item.quantity > stock) {
          alert(`Not enough stock for ${this.getProductName(item.product_id)}. Available: ${stock}`);
          return;
        }
      }
      this.isSubmitting = true;
      try {
        await axios.post(
          `${API_BASE_URL}/sales`,
          { details: this.salesList },
          { withCredentials: true }
        );
        alert('✅ Sale completed successfully!');
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
        this.saleModal = new Modal(document.getElementById('saleModal'));
      }
      this.saleModal.show();
    },

    viewSaleDetails(sale) {
      this.currentSale = sale;
      if (!this.viewModal) {
        this.viewModal = new Modal(document.getElementById('viewModal'));
      }
      this.viewModal.show();
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
    this.getProducts();
    this.getSales();
  },
  beforeUnmount() {
    // Clean up modal instances to prevent memory leaks
    if (this.saleModal) this.saleModal.dispose();
    if (this.viewModal) this.viewModal.dispose();
  },
};
</script>

<style scoped>
/* ── Shared styles ── */
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

.sales-table {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
}
.sales-table th {
  background: #f8f9fa;
  color: #1a1a2e;
  font-weight: 600;
  border: none;
  padding: 14px 16px;
  font-size: 13px;
  white-space: nowrap;
}
.sales-table td {
  padding: 12px 16px;
  border-color: #f0f0f0;
  vertical-align: middle;
  font-size: 13px;
}

.btn-add {
  background: #ffc107;
  color: #000;
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-add:hover {
  background: #ffca2c;
  transform: scale(1.02);
}

.btn-view {
  background: #17a2b8;
  color: #fff;
  border: none;
  padding: 5px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-view:hover {
  background: #138496;
  transform: scale(1.02);
}

/* ── Modal styles ── */
.modal-content {
  background: #1a1a2e;
  color: white;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 28px;
}
.modal-header .modal-title {
  font-weight: 700;
  font-size: 20px;
  color: white;
}
.modal-body {
  padding: 24px 28px;
  max-height: 75vh;
  overflow-y: auto;
}
.modal-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 28px;
}
.form-label {
  font-weight: 500;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  display: block;
}
.form-control-custom,
.form-select-custom {
  background: rgba(255, 255, 255, 0.07) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 10px;
  padding: 10px 16px;
  color: white !important;
  width: 100%;
  transition: all 0.3s;
  font-size: 14px;
}
.form-control-custom:focus,
.form-select-custom:focus {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: #ffc107 !important;
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.08);
  outline: none;
  color: white !important;
}
.form-select-custom option {
  background: #1a1a2e;
  color: white;
}
.btn-modal-submit {
  background: #ffc107;
  color: #000;
  border: none;
  padding: 10px 30px;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 14px;
}
.btn-modal-submit:hover {
  background: #ffca2c;
  transform: scale(1.02);
}

.cart-table {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  overflow: hidden;
}
.cart-table th {
  color: #ffc107;
  font-weight: 600;
  font-size: 12px;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.cart-table td {
  color: white;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.btn-outline-danger-custom {
  background: transparent;
  border: 1px solid #dc3545;
  color: #dc3545;
  border-radius: 8px;
  padding: 4px 8px;
  transition: all 0.2s;
}
.btn-outline-danger-custom:hover {
  background: #dc3545;
  color: white;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .sales-table th,
  .sales-table td {
    font-size: 12px;
    padding: 8px 10px;
  }
  .modal-body {
    padding: 16px;
  }
  .modal-header,
  .modal-footer {
    padding: 16px;
  }
}
</style>