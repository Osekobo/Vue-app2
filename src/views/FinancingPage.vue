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
      <section class="finance-hero">
        <div class="container">
          <h1>Financing & <span>Payments</span></h1>
          <p class="text-white-50">
            Flexible options tailored to your budget. Drive away today.
          </p>
        </div>
      </section>

      <section class="container py-5">
        <!-- Financing Options Cards -->
        <div class="row g-4 mb-5">
          <div class="col-6 col-md-4">
            <div class="finance-card">
              <i class="fas fa-hand-holding-usd"></i>
              <h5>Auto Loans</h5>
              <p>
                Competitive rates from 2.9% APR. Get pre-approved in minutes.
              </p>
            </div>
          </div>
          <div class="col-6 col-md-4">
            <div class="finance-card">
              <i class="fas fa-file-signature"></i>
              <h5>Lease Options</h5>
              <p>
                Flexible mileage plans with low monthly payments and easy
                upgrades.
              </p>
            </div>
          </div>
          <div class="col-6 col-md-4">
            <div class="finance-card">
              <i class="fas fa-coins"></i>
              <h5>Cash Purchase</h5>
              <p>
                Exclusive discounts for cash buyers. Clear title and immediate
                delivery.
              </p>
            </div>
          </div>
        </div>

        <!-- Calculator -->
        <h3 class="fw-bold text-center mb-4">Estimate Your Monthly Payment</h3>
        <div class="calc-box">
          <div class="row g-4">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Vehicle Price ($)</label>
              <input
                type="number"
                class="form-control"
                v-model.number="price"
                min="0"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label fw-semibold">Down Payment ($)</label>
              <input
                type="number"
                class="form-control"
                v-model.number="downPayment"
                min="0"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label fw-semibold">Interest Rate (%)</label>
              <input
                type="number"
                class="form-control"
                v-model.number="rate"
                step="0.1"
                min="0"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">Loan Term (Months)</label>
              <select class="form-control" v-model.number="term">
                <option value="36">36 Months</option>
                <option value="48">48 Months</option>
                <option value="60">60 Months</option>
                <option value="72">72 Months</option>
              </select>
            </div>
            <div class="col-md-6 d-flex align-items-end">
              <button class="btn-calc" @click="calculate">Calculate Payment</button>
            </div>
          </div>
          <div class="result-box mt-4">
            <p class="mb-0 text-white-50">Estimated Monthly Payment</p>
            <div class="amount" id="monthlyResult">{{ formattedMonthlyPayment }}</div>
            <small class="text-white-50"
              >*Rates are estimates. Final terms depend on credit
              approval.</small
            >
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'FinancingPage',
  data() {
    return {
      sidebarOpen: false,
      price: 350000,
      downPayment: 50000,
      rate: 5.9,
      term: 48,
      monthlyPayment: 0,
    };
  },
  computed: {
    formattedMonthlyPayment() {
      if (this.monthlyPayment === 0) {
        // Compute on first load or when inputs change
        this.calculate();
      }
      return '$' + this.monthlyPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    calculate() {
      const principal = this.price - this.downPayment;
      if (principal <= 0) {
        this.monthlyPayment = 0;
        return;
      }
      const monthlyRate = this.rate / 100 / 12;
      if (monthlyRate === 0) {
        // If rate is 0, payment is simply principal / term
        this.monthlyPayment = principal / this.term;
        return;
      }
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, this.term)) /
        (Math.pow(1 + monthlyRate, this.term) - 1);
      this.monthlyPayment = payment;
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
    // Recalculate when any input changes
    price() { this.calculate(); },
    downPayment() { this.calculate(); },
    rate() { this.calculate(); },
    term() { this.calculate(); },
  },
  mounted() {
    this.calculate();
  },
};
</script>

<style scoped>
/* ── All styles from original financing.html, scoped ── */
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
.sidebar .nav-link:hover i {
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

/* ── Finance Hero ── */
.finance-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 60px 0 40px;
  color: white;
  text-align: center;
}
.finance-hero h1 {
  font-size: 42px;
  font-weight: 800;
}
.finance-hero h1 span {
  color: #ffc107;
}
.finance-hero p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

/* ── Finance Cards ── */
.finance-card {
  background: white;
  border-radius: 20px;
  padding: 30px 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  height: 100%;
  transition: all 0.3s;
  text-align: center;
}
.finance-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
}
.finance-card i {
  font-size: 48px;
  color: #ffc107;
  margin-bottom: 16px;
}
.finance-card h5 {
  font-weight: 700;
}
.finance-card p {
  color: #666;
  font-size: 14px;
}

/* ── Calculator ── */
.calc-box {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
}
.calc-box .form-control {
  border-radius: 30px;
  padding: 14px 22px;
  border: 1px solid #e0e0e0;
}
.calc-box .form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.12);
}
.result-box {
  background: #1a1a2e;
  border-radius: 20px;
  padding: 30px;
  color: white;
  text-align: center;
}
.result-box .amount {
  font-size: 48px;
  font-weight: 800;
  color: #ffc107;
}
.btn-calc {
  background: #ffc107;
  color: #000;
  padding: 14px 0;
  border-radius: 40px;
  font-weight: 700;
  border: none;
  width: 100%;
  transition: all 0.3s;
}
.btn-calc:hover {
  background: #ffca2c;
}

/* ── Responsive ── */
@media (max-width: 767px) {
  .finance-card {
    padding: 20px 16px;
  }
  .finance-card i {
    font-size: 36px;
  }
  .finance-card h5 {
    font-size: 16px;
  }
  .finance-card p {
    font-size: 13px;
  }
}
</style>