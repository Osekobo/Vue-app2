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

        <div class="brand-name">
          <span>O</span>Berlo
        </div>

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
            :aria-label="
              showPassword
                ? 'Hide password'
                : 'Show password'
            "
          >
            <i
              :class="
                showPassword
                  ? 'fas fa-eye-slash'
                  : 'fas fa-eye'
              "
            ></i>
          </button>
        </div>

        <!-- Register Button -->
        <button
          type="submit"
          class="btn-register"
          :disabled="isLoading"
        >
          <span
            v-if="isLoading"
            class="register-spinner"
          ></span>

          <span>
            {{
              isLoading
                ? "Creating account..."
                : "Register"
            }}
          </span>

          <i
            v-if="!isLoading"
            class="fas fa-arrow-right"
          ></i>
        </button>

        <!-- Login Link -->
        <div class="login-link">
          <span>Already have an account?</span>

          <router-link to="/login">
            Login
          </router-link>
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
      <div
        v-if="message"
        class="alert-custom"
        :class="messageType"
      >
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
      if (
        !this.name ||
        !this.email ||
        !this.password ||
        !this.phone
      ) {
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
            phoneNumber =
              "+254" + phoneNumber.substring(1);
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

        await axios.post(
          `${API_BASE_URL}/register`,
          userData,
          {
            withCredentials: true,
          }
        );

        this.message =
          "Registration successful! Redirecting to login...";

        this.messageType =
          "alert-success-custom";

        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);

      } catch (error) {
        console.error(
          "Error registering:",
          error
        );

        const errorMsg =
          error.response?.data?.detail ||
          "Failed to register user!";

        this.message = errorMsg;
        this.messageType = "alert-custom";

      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>

/* =========================================
   REGISTER PAGE
========================================= */

.register-container {
  min-height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;

  padding: 40px 20px;

  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(255, 193, 7, 0.08),
      transparent 30%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(255, 193, 7, 0.06),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #08090f 0%,
      #10111b 50%,
      #181927 100%
    );
}

/* =========================================
   BACKGROUND GLOW
========================================= */

.background-glow {
  position: absolute;

  border-radius: 50%;

  pointer-events: none;

  filter: blur(90px);
}

.glow-one {
  width: 320px;
  height: 320px;

  top: -140px;
  left: -120px;

  background: rgba(255, 193, 7, 0.08);
}

.glow-two {
  width: 360px;
  height: 360px;

  right: -160px;
  bottom: -160px;

  background: rgba(255, 193, 7, 0.06);
}

/* =========================================
   REGISTER CARD
========================================= */

.register-card {
  width: 100%;
  max-width: 460px;

  position: relative;
  z-index: 2;

  padding: 44px 40px;

  background: rgba(255, 255, 255, 0.045);

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 30px;

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.register-card:hover {
  transform: translateY(-3px);

  box-shadow:
    0 35px 90px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* =========================================
   LOGO
========================================= */

.logo-section {
  text-align: center;

  margin-bottom: 30px;
}

.logo-icon {
  width: 70px;
  height: 70px;

  margin: 0 auto 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #ffc107,
    #ffca28
  );

  color: #14151e;

  font-size: 28px;

  box-shadow:
    0 10px 30px rgba(255, 193, 7, 0.22);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.logo-icon:hover {
  transform:
    scale(1.06)
    rotate(-4deg);

  box-shadow:
    0 14px 35px rgba(255, 193, 7, 0.3);
}

/* =========================================
   BRAND NAME
========================================= */

.brand-name {
  margin-bottom: 9px;

  color: rgba(255, 255, 255, 0.85);

  font-size: 22px;
  font-weight: 800;

  letter-spacing: 1px;
}

.brand-name span {
  color: #ffc107;
}

/* =========================================
   HEADINGS
========================================= */

.logo-section h2 {
  margin: 0 0 7px;

  color: #ffffff;

  font-size: 28px;
  font-weight: 700;

  letter-spacing: -0.4px;
}

.logo-section p {
  margin: 0;

  color: rgba(255, 255, 255, 0.48);

  font-size: 14px;
}

/* =========================================
   INPUTS
========================================= */

.input-group-custom {
  position: relative;

  margin-bottom: 17px;
}

.input-group-custom > i {
  position: absolute;

  left: 18px;
  top: 50%;

  transform: translateY(-50%);

  color: rgba(255, 255, 255, 0.32);

  font-size: 15px;

  pointer-events: none;

  z-index: 2;

  transition: color 0.25s ease;
}

.input-group-custom:focus-within > i {
  color: #ffc107;
}

.form-control-custom {
  width: 100%;
  height: 52px;

  box-sizing: border-box;

  padding:
    0
    20px
    0
    50px;

  border:
    1px solid
    rgba(255, 255, 255, 0.09);

  border-radius: 28px;

  outline: none;

  background:
    rgba(255, 255, 255, 0.045);

  color: #ffffff;

  font-size: 14px;

  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.form-control-custom::placeholder {
  color: rgba(255, 255, 255, 0.27);
}

.form-control-custom:hover {
  border-color:
    rgba(255, 255, 255, 0.14);
}

.form-control-custom:focus {
  border-color:
    rgba(255, 193, 7, 0.5);

  background:
    rgba(255, 255, 255, 0.065);

  box-shadow:
    0 0 0 4px
    rgba(255, 193, 7, 0.055);
}

/* =========================================
   PASSWORD
========================================= */

.password-input {
  padding-right: 52px;
}

.password-toggle {
  position: absolute;

  right: 16px;
  top: 50%;

  transform: translateY(-50%);

  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;

  background: transparent;

  color: rgba(255, 255, 255, 0.32);

  cursor: pointer;

  transition: color 0.25s ease;
}

.password-toggle:hover {
  color: #ffc107;
}

/* =========================================
   REGISTER BUTTON
========================================= */

.btn-register {
  width: 100%;
  height: 52px;

  margin-top: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  border: none;
  border-radius: 28px;

  background:
    linear-gradient(
      135deg,
      #ffc107,
      #ffca28
    );

  color: #14151e;

  font-size: 15px;
  font-weight: 750;

  cursor: pointer;

  box-shadow:
    0 10px 25px
    rgba(255, 193, 7, 0.15);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.btn-register:hover:not(:disabled) {
  transform: translateY(-2px);

  background:
    linear-gradient(
      135deg,
      #ffd54f,
      #ffca28
    );

  box-shadow:
    0 14px 30px
    rgba(255, 193, 7, 0.25);
}

.btn-register:active:not(:disabled) {
  transform: translateY(0);
}

.btn-register:disabled {
  opacity: 0.65;

  cursor: not-allowed;
}

/* =========================================
   LOADING SPINNER
========================================= */

.register-spinner {
  width: 17px;
  height: 17px;

  border:
    2px solid
    rgba(20, 21, 30, 0.25);

  border-top-color: #14151e;

  border-radius: 50%;

  animation:
    registerSpin 0.7s linear infinite;
}

@keyframes registerSpin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================================
   LINKS
========================================= */

.login-link {
  margin-top: 18px;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 5px;

  color:
    rgba(255, 255, 255, 0.42);

  font-size: 13px;

  text-align: center;
}

.login-link a {
  color: #ffc107;

  text-decoration: none;

  font-weight: 650;

  transition:
    color 0.25s ease,
    opacity 0.25s ease;
}

.login-link a:hover {
  color: #ffd54f;

  text-decoration: underline;
}

.back-home {
  margin-top: 12px;
}

.back-home a {
  display: inline-flex;

  align-items: center;

  gap: 7px;

  color:
    rgba(255, 255, 255, 0.48);
}

.back-home a:hover {
  color: #ffc107;

  text-decoration: none;
}

/* =========================================
   ALERT
========================================= */

.alert-custom {
  margin-top: 20px;

  padding: 13px 16px;

  display: flex;
  align-items: center;

  gap: 9px;

  border-radius: 15px;

  background:
    rgba(255, 82, 82, 0.1);

  border:
    1px solid
    rgba(255, 82, 82, 0.16);

  color: #ff7777;

  font-size: 13px;

  line-height: 1.45;
}

.alert-custom i {
  flex-shrink: 0;
}

.alert-success-custom {
  background:
    rgba(40, 167, 69, 0.1);

  border-color:
    rgba(40, 167, 69, 0.18);

  color: #54d477;
}

/* =========================================
   SECURITY NOTE
========================================= */

.security-note {
  margin-top: 24px;

  padding-top: 18px;

  border-top:
    1px solid
    rgba(255, 255, 255, 0.06);

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 7px;

  color:
    rgba(255, 255, 255, 0.28);

  font-size: 11px;

  text-align: center;
}

.security-note i {
  color:
    rgba(255, 193, 7, 0.55);
}

/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 600px) {
  .register-container {
    padding: 25px 15px;
  }

  .register-card {
    padding: 35px 24px;

    border-radius: 25px;
  }

  .logo-icon {
    width: 64px;
    height: 64px;

    font-size: 25px;
  }

  .logo-section h2 {
    font-size: 25px;
  }

  .form-control-custom {
    height: 50px;
  }

  .btn-register {
    height: 50px;
  }
}

@media (max-width: 420px) {
  .register-container {
    padding: 20px 12px;
  }

  .register-card {
    padding: 30px 18px;

    border-radius: 22px;
  }

  .logo-section {
    margin-bottom: 25px;
  }

  .logo-section h2 {
    font-size: 23px;
  }

  .logo-section p {
    font-size: 13px;
  }

  .form-control-custom {
    height: 48px;

    padding-left: 46px;

    font-size: 13px;
  }

  .input-group-custom > i {
    left: 16px;
  }

  .btn-register {
    height: 48px;

    font-size: 14px;
  }

  .login-link {
    font-size: 12px;
  }
}

@media (max-width: 350px) {
  .register-card {
    padding: 25px 15px;
  }

  .logo-icon {
    width: 58px;
    height: 58px;

    font-size: 22px;
  }

  .brand-name {
    font-size: 20px;
  }

  .logo-section h2 {
    font-size: 21px;
  }
}
</style>

<!-- 380 lines -->