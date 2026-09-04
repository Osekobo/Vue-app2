<template>
  <div>
    <!-- Sidebar toggle button -->
    <button
      class="sidebar-toggle"
      id="sidebarToggle"
      @click="sidebarOpen = true"
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
        <h4>OBerlo</h4>
        <p>Inventory Management System</p>
      </div>

      <ul class="sidebar-menu">
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
          <router-link class="nav-link" to="/purchases">
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
          <a class="nav-link" href="#" @click.prevent="handleLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main>
      <!-- Hero -->
      <section class="finance-hero">
        <div class="hero-container">
          <h1>
            Financing &
            <span>Payments</span>
          </h1>

          <p>Flexible options tailored to your budget. Drive away today.</p>
        </div>
      </section>

      <!-- Main Content -->
      <section class="finance-content">
        <!-- Financing Options -->
        <div class="section-heading">
          <h2>Financing Options</h2>
          <p>Choose the payment option that works best for you.</p>
        </div>

        <div class="finance-options">
          <!-- Card 1 -->
          <div class="finance-card">
            <div class="finance-icon">
              <i class="fas fa-hand-holding-usd"></i>
            </div>

            <div class="finance-card-content">
              <h5>Auto Loans</h5>
              <p>
                Competitive rates from 2.9% APR. Get pre-approved in minutes.
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="finance-card">
            <div class="finance-icon">
              <i class="fas fa-file-signature"></i>
            </div>

            <div class="finance-card-content">
              <h5>Lease Options</h5>
              <p>
                Flexible mileage plans with low monthly payments and easy
                upgrades.
              </p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="finance-card">
            <div class="finance-icon">
              <i class="fas fa-coins"></i>
            </div>

            <div class="finance-card-content">
              <h5>Cash Purchase</h5>
              <p>
                Exclusive discounts for cash buyers. Clear title and delivery
                anywhere in Kenya.
              </p>
            </div>
          </div>
        </div>

        <!-- Calculator Section -->
        <div class="calculator-section">
          <div class="section-heading calculator-heading">
            <h2>Estimate Your Monthly Payment</h2>
            <p>
              Enter the vehicle details below to estimate your monthly payment.
            </p>
          </div>

          <div class="calc-box">
            <div class="calculator-fields">
              <!-- Vehicle Price -->
              <div class="input-group-custom">
                <label class="form-label"> Vehicle Price (KSh) </label>

                <input
                  type="number"
                  class="form-control"
                  v-model.number="price"
                  min="0"
                />
              </div>

              <!-- Down Payment -->
              <div class="input-group-custom">
                <label class="form-label"> Down Payment (KSh) </label>

                <input
                  type="number"
                  class="form-control"
                  v-model.number="downPayment"
                  min="0"
                />
              </div>

              <!-- Interest Rate -->
              <div class="input-group-custom">
                <label class="form-label"> Interest Rate (%) </label>

                <input
                  type="number"
                  class="form-control"
                  v-model.number="rate"
                  step="0.1"
                  min="0"
                />
              </div>

              <!-- Loan Term -->
              <div class="input-group-custom">
                <label class="form-label"> Loan Term </label>

                <select class="form-control" v-model.number="term">
                  <option :value="36">36 Months</option>
                  <option :value="48">48 Months</option>
                  <option :value="60">60 Months</option>
                  <option :value="72">72 Months</option>
                </select>
              </div>

              <!-- Button -->
              <div class="calculate-button-wrapper">
                <button class="btn-calc" @click="calculate">
                  <i class="fas fa-calculator"></i>
                  Calculate Payment
                </button>
              </div>
            </div>

            <!-- Result -->
            <div class="result-box">
              <p class="result-label">Estimated Monthly Payment</p>

              <div class="amount">
                {{ formattedMonthlyPayment }}
              </div>

              <p class="result-note">
                <i class="fas fa-info-circle"></i>
                Rates are estimates. Final terms depend on credit approval.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "FinancingPage",

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
        this.calculate();
      }

      return (
        "KSh " +
        this.monthlyPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
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

  watch: {
    price() {
      this.calculate();
    },

    downPayment() {
      this.calculate();
    },

    rate() {
      this.calculate();
    },

    term() {
      this.calculate();
    },
  },

  mounted() {
    this.calculate();
  },
};
</script>

<style scoped src="../styles/pages/FinancingPage.css"></style>

<!-- 500 lines -->
