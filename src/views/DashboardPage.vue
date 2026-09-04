<template>
  <div class="dashboard-page">
    <AdminNavbar />

    <!-- Main Content -->
    <main class="dashboard-main">
      <div class="dashboard-container">
        <!-- Page Header -->
        <div class="dashboard-header">
          <div>
            <span class="header-label">OVERVIEW</span>

            <h1>
              <i class="fas fa-chart-line"></i>
              Dashboard
            </h1>

            <p>
              Monitor your vehicle inventory, sales and business performance.
            </p>
          </div>

          <div class="header-badge">
            <i class="fas fa-circle"></i>
            Live Overview
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner">
            <div class="spinner-border text-warning"></div>
          </div>

          <h5>Loading dashboard</h5>
          <p>Please wait while we retrieve your latest data...</p>
        </div>

        <!-- Dashboard Data -->
        <div v-else>
          <!-- Statistics -->
          <section class="stats-grid">
            <!-- Total Vehicles -->
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-car"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">Total Vehicles</span>
                <h2>{{ rpp.length }}</h2>
                <span class="stat-description"> Vehicles in inventory </span>
              </div>
            </div>

            <!-- Total Sales -->
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-file-invoice"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">Total Sales</span>
                <h2>{{ spp.length }}</h2>
                <span class="stat-description"> Vehicle sales records </span>
              </div>
            </div>

            <!-- Total Profit -->
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-wallet"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">Total Profit</span>
                <h2>KSh {{ totalProfit }}</h2>
                <span class="stat-description"> Overall generated profit </span>
              </div>
            </div>

            <!-- Vehicles Sold -->
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-car-side"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">Vehicles Sold</span>
                <h2>{{ totalItemsSold }}</h2>
                <span class="stat-description"> Total units sold </span>
              </div>
            </div>
          </section>

          <!-- Charts -->
          <section class="charts-grid">
            <!-- Remaining Stock -->
            <div class="chart-card">
              <div class="chart-header">
                <div>
                  <h5>
                    <i class="fas fa-boxes-stacked"></i>
                    Remaining Stock
                  </h5>

                  <p>Current stock per vehicle</p>
                </div>

                <div class="chart-icon">
                  <i class="fas fa-chart-bar"></i>
                </div>
              </div>

              <div class="chart-container">
                <canvas id="remaining-chart"></canvas>
              </div>
            </div>

            <!-- Quantity Sold -->
            <div class="chart-card">
              <div class="chart-header">
                <div>
                  <h5>
                    <i class="fas fa-car-side"></i>
                    Vehicles Sold
                  </h5>

                  <p>Total quantity sold per vehicle</p>
                </div>

                <div class="chart-icon">
                  <i class="fas fa-chart-bar"></i>
                </div>
              </div>

              <div class="chart-container">
                <canvas id="sold-chart"></canvas>
              </div>
            </div>

            <!-- Profit Per Product -->
            <div class="chart-card">
              <div class="chart-header">
                <div>
                  <h5>
                    <i class="fas fa-coins"></i>
                    Profit Per Vehicle
                  </h5>

                  <p>Total profit generated per vehicle</p>
                </div>

                <div class="chart-icon">
                  <i class="fas fa-chart-column"></i>
                </div>
              </div>

              <div class="chart-container">
                <canvas id="profit-product-chart"></canvas>
              </div>
            </div>

            <!-- Profit Per Day -->
            <div class="chart-card">
              <div class="chart-header">
                <div>
                  <h5>
                    <i class="fas fa-chart-line"></i>
                    Profit Per Day
                  </h5>

                  <p>Daily profit performance</p>
                </div>

                <div class="chart-icon">
                  <i class="fas fa-arrow-trend-up"></i>
                </div>
              </div>

              <div class="chart-container">
                <canvas id="profit-day-chart"></canvas>
              </div>
            </div>
          </section>

          <!-- Sales Table -->
          <section class="sales-section">
            <div class="chart-card table-card">
              <div class="chart-header table-header">
                <div>
                  <h5>
                    <i class="fas fa-table"></i>
                    Sales Per Vehicle
                  </h5>

                  <p>Detailed breakdown of vehicle sales</p>
                </div>

                <div class="table-count">{{ spp.length }} Records</div>
              </div>

              <div class="table-wrapper">
                <table class="custom-table">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Qty Sold</th>
                      <th>Total Sales Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="row in spp" :key="row.product_id">
                      <td>
                        <div class="vehicle-name">
                          <div class="vehicle-icon">
                            <i class="fas fa-car"></i>
                          </div>

                          <span>{{ row.product_name }}</span>
                        </div>
                      </td>

                      <td>
                        <span class="quantity-badge">
                          {{ row.total_quantity_sold }}
                        </span>
                      </td>

                      <td class="sales-amount">
                        KSh {{ formatNumber(row.total_sales_amount) }}
                      </td>
                    </tr>

                    <tr v-if="spp.length === 0">
                      <td colspan="3">
                        <div class="empty-state">
                          <i class="fas fa-chart-column"></i>
                          <h6>No sales data available</h6>
                          <p>
                            Sales information will appear here once vehicles are
                            sold.
                          </p>
                        </div>
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
import Chart from "chart.js/auto";
import AdminNavbar from "@/components/AdminNavbar.vue";

export default {
  name: "DashboardPage",

  components: {
    AdminNavbar,
  },

  data() {
    return {
      sidebarOpen: false,

      spp: [],
      rpp: [],
      ppp: [],
      ppd: [],

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

      for (const item of this.ppp) {
        total += Number(item.total_profit) || 0;
      }

      return total.toLocaleString();
    },

    totalItemsSold() {
      let total = 0;

      for (const item of this.spp) {
        total += Number(item.total_quantity_sold) || 0;
      }

      return total;
    },
  },

  methods: {
    formatNumber(num) {
      return num ? Number(num).toLocaleString() : "0";
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

        await this.$nextTick();

        this.createCharts();
      } catch (error) {
        console.error("Error fetching dashboard:", error);

        this.loading = false;

        if (error.response && error.response.status === 401) {
          alert("Please login first");
          this.$router.push("/login");
        }
      }
    },

    createCharts() {
      /*
       * Destroy previous charts
       * before creating new ones.
       */
      Object.values(this.chartInstances).forEach((chart) => {
        if (chart) {
          chart.destroy();
        }
      });

      /*
       * Common chart settings
       */
      const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            labels: {
              color: "#555",
              font: {
                size: 12,
              },
            },
          },
        },

        scales: {
          y: {
            beginAtZero: true,

            grid: {
              color: "rgba(0, 0, 0, 0.06)",
            },

            ticks: {
              color: "#777",
            },
          },

          x: {
            grid: {
              display: false,
            },

            ticks: {
              color: "#777",
            },
          },
        },
      };

      /*
       * Remaining Stock Chart
       */
      if (this.rpp.length > 0) {
        const ctx = document.getElementById("remaining-chart");

        if (ctx) {
          this.chartInstances.remaining = new Chart(ctx, {
            type: "bar",

            data: {
              labels: this.rpp.map((x) => x.product_name),

              datasets: [
                {
                  label: "Remaining Quantity",

                  data: this.rpp.map((x) => x.remaining_quantity),

                  backgroundColor: "rgba(255, 193, 7, 0.75)",

                  borderColor: "#ffc107",

                  borderWidth: 1,

                  borderRadius: 6,
                },
              ],
            },

            options: {
              ...commonOptions,

              scales: {
                ...commonOptions.scales,

                y: {
                  ...commonOptions.scales.y,

                  title: {
                    display: true,
                    text: "Quantity",
                    color: "#555",
                  },
                },
              },
            },
          });
        }
      }

      /*
       * Sold Quantity Chart
       */
      if (this.spp.length > 0) {
        const ctx = document.getElementById("sold-chart");

        if (ctx) {
          this.chartInstances.sold = new Chart(ctx, {
            type: "bar",

            data: {
              labels: this.spp.map((x) => x.product_name),

              datasets: [
                {
                  label: "Quantity Sold",

                  data: this.spp.map((x) => x.total_quantity_sold),

                  backgroundColor: "rgba(75, 192, 192, 0.7)",

                  borderColor: "#4bc0c0",

                  borderWidth: 1,

                  borderRadius: 6,
                },
              ],
            },

            options: commonOptions,
          });
        }
      }

      /*
       * Profit Per Product Chart
       */
      if (this.ppp.length > 0) {
        const ctx = document.getElementById("profit-product-chart");

        if (ctx) {
          this.chartInstances.profitProduct = new Chart(ctx, {
            type: "bar",

            data: {
              labels: this.ppp.map((x) => x.product_name),

              datasets: [
                {
                  label: "Profit (KSh)",

                  data: this.ppp.map((x) => x.total_profit),

                  backgroundColor: "rgba(153, 102, 255, 0.7)",

                  borderColor: "#9966ff",

                  borderWidth: 1,

                  borderRadius: 6,
                },
              ],
            },

            options: commonOptions,
          });
        }
      }

      /*
       * Profit Per Day Chart
       */
      if (this.ppd.length > 0) {
        const ctx = document.getElementById("profit-day-chart");

        if (ctx) {
          this.chartInstances.profitDay = new Chart(ctx, {
            type: "line",

            data: {
              labels: this.ppd.map((x) => x.date),

              datasets: [
                {
                  label: "Profit Per Day (KSh)",

                  data: this.ppd.map((x) => x.total_profit),

                  borderColor: "#ffc107",

                  backgroundColor: "rgba(255, 193, 7, 0.12)",

                  borderWidth: 3,

                  fill: true,

                  tension: 0.35,

                  pointRadius: 4,

                  pointHoverRadius: 6,

                  pointBackgroundColor: "#ffc107",
                },
              ],
            },

            options: commonOptions,
          });
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

  mounted() {
    this.fetchDashboardData();
  },

  beforeUnmount() {
    Object.values(this.chartInstances).forEach((chart) => {
      if (chart) {
        chart.destroy();
      }
    });
  },
};
</script>

<style scoped src="../styles/pages/DashboardPage.css"></style>

<!-- 580 lines -->
