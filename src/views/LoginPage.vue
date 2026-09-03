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

        <div class="brand-name">
          <span>O</span>Berlo
        </div>

        <h2>Welcome Back!</h2>

        <p>
          Sign in to access your dashboard
        </p>

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
            <i
              :class="
                showPassword
                  ? 'fas fa-eye-slash'
                  : 'fas fa-eye'
              "
            ></i>
          </button>

        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="btn-login"
          :disabled="isLoading"
        >

          <span
            v-if="isLoading"
            class="login-spinner"
          ></span>

          <span>
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </span>

          <i
            v-if="!isLoading"
            class="fas fa-arrow-right"
          ></i>

        </button>

        <!-- Register -->
        <div class="register-link">
          <span>Don't have an account?</span>

          <router-link to="/register">
            Sign Up
          </router-link>
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
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
      message: '',
      isLoading: false,
      showPassword: false,
    };
  },

  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        this.message = 'Please fill in all fields';
        return;
      }

      this.message = '';
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
          }
        );

        if (response.data.message === 'Login successful') {

          // Store user info
          // Token is stored in an HTTP-only cookie
          if (response.data.user) {
            localStorage.setItem(
              'user',
              JSON.stringify(response.data.user)
            );
          }

          localStorage.setItem(
            'isLoggedIn',
            'true'
          );

          this.message =
            'Login successful! Redirecting...';

          setTimeout(() => {
            this.$router.push('/');
          }, 1000);

        } else {
          this.message = 'Login failed';
        }

      } catch (err) {

        console.error(
          'Login error:',
          err.response?.data || err.message
        );

        const errorMsg =
          err.response?.data?.detail ||
          'Login failed. Please check your credentials.';

        this.message = errorMsg;

      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>

/* =========================================================
   LOGIN PAGE
========================================================= */

.login-container {
  position: relative;

  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px 20px;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(212, 175, 55, 0.10),
      transparent 30%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(212, 175, 55, 0.08),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #0c0d15 0%,
      #151727 50%,
      #10121e 100%
    );

  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;
}

/* =========================================================
   BACKGROUND GLOWS
========================================================= */

.background-glow {
  position: absolute;

  width: 420px;
  height: 420px;

  border-radius: 50%;

  pointer-events: none;

  filter: blur(80px);

  opacity: 0.12;
}

.glow-one {
  top: -220px;
  left: -180px;

  background: #d4af37;
}

.glow-two {
  right: -220px;
  bottom: -220px;

  background: #d4af37;
}

/* =========================================================
   LOGIN CARD
========================================================= */

.login-card {
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 455px;

  padding: 45px 42px 35px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.075),
      rgba(255, 255, 255, 0.035)
    );

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  box-shadow:
    0 35px 90px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-3px);

  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* =========================================================
   LOGO SECTION
========================================================= */

.logo-section {
  text-align: center;

  margin-bottom: 32px;
}

.logo-icon {
  width: 72px;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 15px;

  border-radius: 21px;

  background:
    linear-gradient(
      135deg,
      #d4af37,
      #f0d36d
    );

  color: #151727;

  font-size: 29px;

  box-shadow:
    0 12px 30px rgba(212, 175, 55, 0.22);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.logo-icon:hover {
  transform: translateY(-3px) rotate(-3deg);

  box-shadow:
    0 16px 35px rgba(212, 175, 55, 0.3);
}

.brand-name {
  margin-bottom: 12px;

  color: rgba(255, 255, 255, 0.55);

  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.brand-name span {
  color: #d4af37;
}

.logo-section h2 {
  margin: 0 0 7px;

  color: #ffffff;

  font-size: 29px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.logo-section p {
  margin: 0;

  color: rgba(255, 255, 255, 0.48);

  font-size: 14px;
  line-height: 1.6;
}

/* =========================================================
   FORM
========================================================= */

.input-group-custom {
  position: relative;

  margin-bottom: 17px;
}

.input-group-custom > i {
  position: absolute;

  left: 18px;
  top: 50%;

  transform: translateY(-50%);

  z-index: 2;

  color: rgba(255, 255, 255, 0.32);

  font-size: 15px;

  pointer-events: none;

  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.input-group-custom:focus-within > i {
  color: #d4af37;

  transform:
    translateY(-50%)
    scale(1.05);
}

/* =========================================================
   INPUTS
========================================================= */

.form-control-custom {
  width: 100%;
  height: 52px;

  padding:
    0 50px
    0 49px;

  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 14px;

  outline: none;

  background: rgba(255, 255, 255, 0.045);

  color: #ffffff;

  font-size: 14px;

  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.form-control-custom::placeholder {
  color: rgba(255, 255, 255, 0.28);
}

.form-control-custom:hover {
  background: rgba(255, 255, 255, 0.06);

  border-color: rgba(255, 255, 255, 0.13);
}

.form-control-custom:focus {
  border-color: rgba(212, 175, 55, 0.55);

  background: rgba(255, 255, 255, 0.065);

  box-shadow:
    0 0 0 4px rgba(212, 175, 55, 0.07),
    0 8px 25px rgba(0, 0, 0, 0.08);
}

/* =========================================================
   PASSWORD TOGGLE
========================================================= */

.password-toggle {
  position: absolute;

  right: 14px;
  top: 50%;

  width: 32px;
  height: 32px;

  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 9px;

  background: transparent;

  color: rgba(255, 255, 255, 0.32);

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.password-toggle:hover {
  color: #d4af37;

  background: rgba(212, 175, 55, 0.08);
}

/* =========================================================
   LOGIN BUTTON
========================================================= */

.btn-login {
  width: 100%;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  margin-top: 7px;

  border: 0;
  border-radius: 14px;

  background:
    linear-gradient(
      135deg,
      #c79b28,
      #e5c45e
    );

  color: #151727;

  font-size: 14px;
  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 10px 25px rgba(212, 175, 55, 0.17);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);

  background:
    linear-gradient(
      135deg,
      #d4af37,
      #f0d36d
    );

  box-shadow:
    0 14px 30px rgba(212, 175, 55, 0.27);
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.btn-login:disabled {
  opacity: 0.62;

  cursor: not-allowed;

  box-shadow: none;
}

.btn-login i {
  font-size: 12px;

  transition: transform 0.2s ease;
}

.btn-login:hover:not(:disabled) i {
  transform: translateX(3px);
}

/* =========================================================
   LOADING SPINNER
========================================================= */

.login-spinner {
  width: 15px;
  height: 15px;

  border: 2px solid rgba(21, 23, 39, 0.25);
  border-top-color: #151727;

  border-radius: 50%;

  animation: loginSpin 0.7s linear infinite;
}

@keyframes loginSpin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================================================
   REGISTER / HOME LINKS
========================================================= */

.register-link {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5px;

  margin-top: 19px;

  color: rgba(255, 255, 255, 0.4);

  font-size: 13px;
}

.register-link a {
  color: #d4af37;

  text-decoration: none;

  font-weight: 700;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.register-link a:hover {
  color: #f0d36d;

  text-decoration: none;
}

.back-home {
  margin-top: 12px;
}

.back-home a {
  display: inline-flex;
  align-items: center;

  gap: 7px;

  color: rgba(255, 255, 255, 0.5);

  font-weight: 600;
}

.back-home a:hover {
  color: #d4af37;
}

.back-home i {
  font-size: 11px;

  transition: transform 0.2s ease;
}

.back-home a:hover i {
  transform: translateX(-3px);
}

/* =========================================================
   ALERT / MESSAGE
========================================================= */

.alert-custom {
  display: flex;
  align-items: flex-start;

  gap: 10px;

  margin-top: 21px;

  padding: 13px 15px;

  border: 1px solid rgba(255, 100, 100, 0.18);
  border-radius: 12px;

  background: rgba(255, 80, 80, 0.09);

  color: #ff8585;

  font-size: 12px;
  line-height: 1.5;
}

.alert-custom i {
  margin-top: 2px;

  flex: 0 0 auto;
}

.alert-custom.success {
  border-color: rgba(70, 190, 120, 0.18);

  background: rgba(70, 190, 120, 0.09);

  color: #6bd39a;
}

/* =========================================================
   SECURITY NOTE
========================================================= */

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  margin-top: 25px;
  padding-top: 19px;

  border-top: 1px solid rgba(255, 255, 255, 0.07);

  color: rgba(255, 255, 255, 0.28);

  font-size: 10px;
}

.security-note i {
  color: rgba(212, 175, 55, 0.65);

  font-size: 11px;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 600px) {
  .login-container {
    padding: 25px 15px;
  }

  .login-card {
    max-width: 100%;

    padding: 36px 25px 28px;

    border-radius: 23px;
  }

  .logo-icon {
    width: 65px;
    height: 65px;

    font-size: 26px;
  }

  .logo-section h2 {
    font-size: 25px;
  }

  .logo-section p {
    font-size: 13px;
  }

  .form-control-custom {
    height: 49px;

    font-size: 13px;
  }

  .btn-login {
    height: 49px;
  }
}

@media (max-width: 400px) {
  .login-container {
    padding: 20px 12px;
  }

  .login-card {
    padding: 30px 19px 24px;

    border-radius: 20px;
  }

  .logo-section {
    margin-bottom: 26px;
  }

  .logo-icon {
    width: 60px;
    height: 60px;

    margin-bottom: 12px;

    border-radius: 18px;

    font-size: 24px;
  }

  .brand-name {
    font-size: 12px;
  }

  .logo-section h2 {
    font-size: 23px;
  }

  .register-link {
    font-size: 12px;
  }

  .security-note {
    font-size: 9px;
  }
}

</style>

<!-- 340 lines -->