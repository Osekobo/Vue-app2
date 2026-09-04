<template>
  <div class="register-container">
    <!-- Background glow effects -->
    <div class="background-glow glow-one"></div>
    <div class="background-glow glow-two"></div>

    <div class="register-card">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon">
          <i class="fas fa-user-plus"></i>
        </div>

        <div class="brand-name"><span>O</span>Berlo</div>

        <h2>Create Account</h2>
        <p>Join us and start your journey</p>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleRegister">
        <!-- Name -->
        <div class="input-group-custom">
          <i class="fas fa-user"></i>

          <input
            type="text"
            v-model="name"
            class="form-control-custom"
            placeholder="Full Name"
            required
            autocomplete="name"
          />
        </div>

        <!-- Phone -->
        <div class="input-group-custom">
          <i class="fas fa-phone"></i>

          <input
            type="tel"
            v-model="phone"
            class="form-control-custom"
            placeholder="Phone Number"
            required
            autocomplete="tel"
          />
        </div>

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
            autocomplete="new-password"
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

        <!-- Register Button -->
        <button type="submit" class="btn-register" :disabled="isLoading">
          <span v-if="isLoading" class="register-spinner"></span>

          <span>
            {{ isLoading ? "Creating account..." : "Register" }}
          </span>

          <i v-if="!isLoading" class="fas fa-arrow-right"></i>
        </button>

        <!-- Login Link -->
        <div class="login-link">
          <span>Already have an account?</span>

          <router-link to="/login"> Login </router-link>
        </div>

        <!-- Home Link -->
        <div class="login-link back-home">
          <router-link to="/">
            <i class="fas fa-arrow-left"></i>
            Back to Home
          </router-link>
        </div>
      </form>

      <!-- Alert -->
      <div v-if="message" class="alert-custom" :class="messageType">
        <i
          :class="
            messageType === 'alert-success-custom'
              ? 'fas fa-check-circle'
              : 'fas fa-exclamation-triangle'
          "
        ></i>

        <span>{{ message }}</span>
      </div>

      <!-- Security -->
      <div class="security-note">
        <i class="fas fa-shield-alt"></i>
        <span>Secure registration protected by OBerlo</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "RegisterPage",

  data() {
    return {
      name: "",
      phone: "",
      email: "",
      password: "",
      message: "",
      messageType: "alert-custom",
      isLoading: false,
      showPassword: false,
    };
  },

  methods: {
    async handleRegister() {
      if (!this.name || !this.email || !this.password || !this.phone) {
        this.message = "Please fill in all fields";
        this.messageType = "alert-custom";
        return;
      }

      this.message = "";
      this.isLoading = true;

      try {
        // Format phone number: ensure it starts with +254
        let phoneNumber = this.phone.trim();

        if (!phoneNumber.startsWith("+")) {
          if (phoneNumber.startsWith("0")) {
            phoneNumber = "+254" + phoneNumber.substring(1);
          } else if (phoneNumber.startsWith("254")) {
            phoneNumber = "+" + phoneNumber;
          } else {
            phoneNumber = "+254" + phoneNumber;
          }
        }

        const userData = {
          name: this.name,
          phone: phoneNumber,
          email: this.email,
          password: this.password,
        };

        const response = await axios.post(
          `${API_BASE_URL}/register`,
          userData,
          {
            withCredentials: true,
          },
        );

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: this.name,
              phone: phoneNumber,
              email: this.email,
            }),
          );
        }

        localStorage.setItem("isLoggedIn", "true");

        this.message = "Registration successful! Opening your account...";

        this.messageType = "alert-success-custom";

        this.$router.push("/");
      } catch (error) {
        console.error("Error registering:", error);

        const errorMsg =
          error.response?.data?.detail || "Failed to register user!";

        this.message = errorMsg;
        this.messageType = "alert-custom";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped src="../styles/pages/RegisterPage.css"></style>

<!-- 380 lines -->
