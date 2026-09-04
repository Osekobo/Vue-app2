<template>
  <div class="login-container">
    <!-- Decorative background elements -->
    <div class="background-glow glow-one"></div>
    <div class="background-glow glow-two"></div>

    <div class="login-card">
      <!-- Logo / Welcome -->
      <div class="logo-section">
        <div class="logo-icon">
          <i class="fas fa-car"></i>
        </div>

        <div class="brand-name"><span>O</span>Berlo</div>

        <h2>Welcome Back!</h2>

        <p>Sign in to access your dashboard</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="input-group-custom">
          <i class="fas fa-envelope"></i>

          <input
            type="email"
            v-model="email"
            class="form-control-custom"
            placeholder="Email Address"
            required
            autocomplete="email"
          />
        </div>

        <!-- Password -->
        <div class="input-group-custom">
          <i class="fas fa-lock"></i>

          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="form-control-custom password-input"
            placeholder="Password"
            required
            autocomplete="current-password"
          />

          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>

        <!-- Login Button -->
        <button type="submit" class="btn-login" :disabled="isLoading">
          <span v-if="isLoading" class="login-spinner"></span>

          <span>
            {{ isLoading ? "Logging in..." : "Login" }}
          </span>

          <i v-if="!isLoading" class="fas fa-arrow-right"></i>
        </button>

        <!-- Register -->
        <div class="register-link">
          <span>Don't have an account?</span>

          <router-link to="/register"> Sign Up </router-link>
        </div>

        <!-- Back Home -->
        <div class="register-link back-home">
          <router-link to="/">
            <i class="fas fa-arrow-left"></i>
            Back to Home
          </router-link>
        </div>
      </form>

      <!-- Message -->
      <div
        v-if="message"
        class="alert-custom"
        :class="{ success: message.includes('successful') }"
      >
        <i
          :class="
            message.includes('successful')
              ? 'fas fa-check-circle'
              : 'fas fa-exclamation-triangle'
          "
        ></i>

        <span>{{ message }}</span>
      </div>

      <!-- Security note -->
      <div class="security-note">
        <i class="fas fa-shield-alt"></i>
        <span>Secure login protected by OBerlo</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      message: "",
      isLoading: false,
      showPassword: false,
    };
  },

  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        this.message = "Please fill in all fields";
        return;
      }

      this.message = "";
      this.isLoading = true;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/login`,
          {
            email: this.email,
            password: this.password,
          },
          {
            withCredentials: true,
          },
        );

        if (response.data.message === "Login successful") {
          // Store user info
          // Token is stored in an HTTP-only cookie
          if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }

          localStorage.setItem("isLoggedIn", "true");

          this.message = "Login successful! Redirecting...";

          setTimeout(() => {
            const redirectPath = this.$route.query.redirect || "/";
            this.$router.push(redirectPath);
          }, 1000);
        } else {
          this.message = "Login failed";
        }
      } catch (err) {
        console.error("Login error:", err.response?.data || err.message);

        const errorMsg =
          err.response?.data?.detail ||
          "Login failed. Please check your credentials.";

        this.message = errorMsg;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped src="../styles/pages/LoginPage.css"></style>

<!-- 340 lines -->
