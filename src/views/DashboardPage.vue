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
        <h1 class="text-center mb-4" style="color: #ffc107">
          <i class="fas fa-chart-line me-2"></i>Dashboard
        </h1>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-warning" style="width: 3rem; height: 3rem"></div>
          <p class="text-muted mt-3">Loading dashboard data...</p>
        </div>

        <!-- Data loaded -->
        <div v-else>
          <!-- Stats Cards -->
          <div class="row g-4 mb-4">
            <div class="col-md-3">
              <div class="dashboard-card stat-card text-center">
                <i class="fas fa-car fa-2x mb-2" style="color: #ffc107"></i>
                <h6>Total Vehicles</h6>
                <h2>{{ rpp.length }}</h2>
              </div>
            </div>
            <div class="col-md-3">
              <div class="dashboard-card stat-card text-center">
                <i class="fas fa-file-invoice fa-2x mb-2" style="color: #ffc107"></i>
                <h6>Total Sales</h6>
                <h2>{{ spp.length }}</h2>
              </div>
            </div>
            <div class="col-md-3">
              <div class="dashboard-card stat-card text-center">
                <i class="fas fa-wallet fa-2x mb-2" style="color: #ffc107"></i>
                <h6>Total Profit</h6>
                <h2>KSh {{ totalProfit }}</h2>
              </div>
            </div>
            <div class="col-md-3">
              <div class="dashboard-card stat-card text-center">
                <i class="fas fa-car-side fa-2x mb-2" style="color: #ffc107"></i>
                <h6>Vehicles Sold</h6>
                <h2>{{ totalItemsSold }}</h2>
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="chart-card">
                <h5><i class="fas fa-chart-bar me-2"></i>Remaining Stock Per Vehicle</h5>
                <div class="chart-container">
                  <canvas id="remaining-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="chart-card">
                <h5><i class="fas fa-chart-bar me-2"></i>Total Quantity Sold Per Vehicle</h5>
                <div class="chart-container">
                  <canvas id="sold-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="chart-card">
                <h5><i class="fas fa-chart-bar me-2"></i>Total Profit Per Vehicle</h5>
                <div class="chart-container">
                  <canvas id="profit-product-chart"></canvas>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="chart-card">
                <h5><i class="fas fa-chart-line me-2"></i>Profit Per Day</h5>
                <div class="chart-container">
                  <canvas id="profit-day-chart"></canvas>
                </div>
              </div>
            </div>

            <!-- Table -->
            <div class="col-12">
              <div class="chart-card">
                <h5><i class="fas fa-table me-2"></i>Sales Per Vehicle (Details)</h5>
                <div class="table-responsive">
                  <table class="table custom-table">
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Qty Sold</th>
                        <th>Total Sales Amount (KSh)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in spp" :key="row.product_id">
                        <td>{{ row.product_name }}</td>
                        <td>{{ row.total_quantity_sold }}</td>
                        <td>{{ formatNumber(row.total_sales_amount) }}</td>
                      </tr>
                      <tr v-if="spp.length === 0">
                        <td colspan="3" class="text-center">No sales data available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import Chart from 'chart.js/auto'; // Chart.js v3+ auto-import

export default {
  name: 'DashboardPage',
  data() {
    return {
      sidebarOpen: false,
      spp: [],        // sales per product
      rpp: [],        // remaining per product
      ppp: [],        // profit per product
      ppd: [],        // profit per day
      loading: true,
      chartInstances: {
        remaining: null,
        sold: null,
        profitProduct: null,
        profitDay: null,
      },
    };
  },
  computed: {
    totalProfit() {
      let total = 0;
      for (let item of this.ppp) {
        total += item.total_profit || 0;
      }
      return total.toLocaleString();
    },
    totalItemsSold() {
      let total = 0;
      for (let item of this.spp) {
        total += item.total_quantity_sold || 0;
      }
      return total;
    },
  },
  methods: {
    formatNumber(num) {
      return num ? Number(num).toLocaleString() : '0';
    },

    async fetchDashboardData() {
      this.loading = true;
      try {
        const [sppRes, rppRes, pppRes, ppdRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/dashboard/spp`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/dashboard/rpp`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/dashboard/ppp`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/dashboard/ppd`, { withCredentials: true }),
        ]);
        this.spp = sppRes.data || [];
        this.rpp = rppRes.data || [];
        this.ppp = pppRes.data || [];
        this.ppd = ppdRes.data || [];
        this.loading = false;

        // After DOM update, create charts
        await this.$nextTick();
        this.createCharts();
      } catch (error) {
        console.error('Error fetching dashboard:', error);
        this.loading = false;
        if (error.response && error.response.status === 401) {
          alert('Please login first');
          this.$router.push('/login');
        }
      }
    },

    createCharts() {
      // Destroy previous charts if any
      Object.values(this.chartInstances).forEach(chart => {
        if (chart) chart.destroy();
      });

      // Remaining stock chart
      if (this.rpp.length > 0) {
        const ctx = document.getElementById('remaining-chart');
        if (ctx) {
          this.chartInstances.remaining = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.rpp.map(x => x.product_name),
              datasets: [{
                label: 'Remaining Quantity',
                data: this.rpp.map(x => x.remaining_quantity),
                backgroundColor: 'rgba(255, 193, 7, 0.7)',
                borderColor: '#ffc107',
                borderWidth: 1,
              }],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: '#1a1a2e' } } },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Quantity', color: '#1a1a2e' }, ticks: { color: '#1a1a2e' } },
                x: { ticks: { color: '#1a1a2e' } },
              },
            },
          });
        }
      }

      // Sold quantity chart
      if (this.spp.length > 0) {
        const ctx = document.getElementById('sold-chart');
        if (ctx) {
          this.chartInstances.sold = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.spp.map(x => x.product_name),
              datasets: [{
                label: 'Quantity Sold',
                data: this.spp.map(x => x.total_quantity_sold),
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: '#4bc0c0',
                borderWidth: 1,
              }],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: '#1a1a2e' } } },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Quantity', color: '#1a1a2e' }, ticks: { color: '#1a1a2e' } },
                x: { ticks: { color: '#1a1a2e' } },
              },
            },
          });
        }
      }

      // Profit per product chart
      if (this.ppp.length > 0) {
        const ctx = document.getElementById('profit-product-chart');
        if (ctx) {
          this.chartInstances.profitProduct = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.ppp.map(x => x.product_name),
              datasets: [{
                label: 'Profit (KSh)',
                data: this.ppp.map(x => x.total_profit),
                backgroundColor: 'rgba(153, 102, 255, 0.7)',
                borderColor: '#9966ff',
                borderWidth: 1,
              }],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: '#1a1a2e' } } },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Profit (KSh)', color: '#1a1a2e' }, ticks: { color: '#1a1a2e' } },
                x: { ticks: { color: '#1a1a2e' } },
              },
            },
          });
        }
      }

      // Profit per day (line chart)
      if (this.ppd.length > 0) {
        const ctx = document.getElementById('profit-day-chart');
        if (ctx) {
          this.chartInstances.profitDay = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.ppd.map(x => x.date),
              datasets: [{
                label: 'Profit per Day (KSh)',
                data: this.ppd.map(x => x.total_profit),
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
              }],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: '#1a1a2e' } } },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Profit (KSh)', color: '#1a1a2e' }, ticks: { color: '#1a1a2e' } },
                x: { ticks: { color: '#1a1a2e' } },
              },
            },
          });
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
  mounted() {
    this.fetchDashboardData();
  },
  beforeUnmount() {
    // Cleanup chart instances
    Object.values(this.chartInstances).forEach(chart => {
      if (chart) chart.destroy();
    });
  },
};
</script>

<style scoped>
/* ── Shared styles from original dashboard (scoped) ── */
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

/* ── Dashboard cards ── */
.dashboard-card {
  background: white;
  border-radius: 16px;
  padding: 24px 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}
.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
.dashboard-card h6 {
  color: #1a1a2e;
  font-weight: 600;
  margin-bottom: 4px;
}
.dashboard-card h2 {
  color: #1a1a2e;
  font-weight: 800;
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
}
.chart-card h5 {
  color: #1a1a2e;
  font-weight: 700;
  margin-bottom: 16px;
}
.chart-container {
  position: relative;
  height: 250px;
}

.custom-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
}
.custom-table thead {
  background: #ffc107;
}
.custom-table th {
  color: #1a1a2e;
  font-weight: 600;
  border: none;
  padding: 12px 16px;
}
.custom-table td {
  padding: 10px 16px;
  border-color: #f0f0f0;
  color: #1a1a2e;
}

@media (max-width: 768px) {
  .dashboard-card {
    padding: 16px;
  }
  .chart-container {
    height: 200px;
  }
}
</style>