<template>
  <div class="register-container">
    <div class="register-card">
      <div class="logo-section">
        <div class="logo-icon">
          <i class="fas fa-user-plus"></i>
        </div>
        <h2>Create Account</h2>
        <p>Join us and start your journey</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="input-group-custom">
          <i class="fas fa-user"></i>
          <input
            type="text"
            v-model="name"
            class="form-control-custom"
            placeholder="Full Name"
            required
          />
        </div>

        <div class="input-group-custom">
          <i class="fas fa-phone"></i>
          <input
            type="tel"
            v-model="phone"
            class="form-control-custom phone-input"
            placeholder="Phone Number"
            required
          />
        </div>

        <div class="input-group-custom">
          <i class="fas fa-envelope"></i>
          <input
            type="email"
            v-model="email"
            class="form-control-custom"
            placeholder="Email Address"
            required
          />
        </div>

        <div class="input-group-custom">
          <i class="fas fa-lock"></i>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="form-control-custom"
            placeholder="Password"
            required
          />
          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>

        <button type="submit" class="btn-register" :disabled="isLoading">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm me-2"
          ></span>
          {{ isLoading ? 'Creating account...' : 'Register' }}
        </button>

        <div class="login-link">
          Already have an account? <router-link to="/login">Login</router-link>
        </div>

        <div class="login-link mt-2">
          <router-link to="/">
            <i class="fas fa-arrow-left"></i> Back to Home
          </router-link>
        </div>
      </form>

      <div v-if="message" class="alert-custom" :class="messageType">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      password: '',
      message: '',
      messageType: 'alert-custom',
      isLoading: false,
      showPassword: false,
    };
  },
  methods: {
    async handleRegister() {
      if (!this.name || !this.email || !this.password || !this.phone) {
        this.message = 'Please fill in all fields';
        this.messageType = 'alert-custom';
        return;
      }

      this.message = '';
      this.isLoading = true;

      try {
        // Format phone number: ensure it starts with +254
        let phoneNumber = this.phone;
        if (!phoneNumber.startsWith('+')) {
          if (phoneNumber.startsWith('0')) {
            phoneNumber = '+254' + phoneNumber.substring(1);
          } else if (phoneNumber.startsWith('254')) {
            phoneNumber = '+' + phoneNumber;
          } else {
            phoneNumber = '+254' + phoneNumber;
          }
        }

        const userData = {
          name: this.name,
          phone: phoneNumber,
          email: this.email,
          password: this.password,
        };

        await axios.post(`${API_BASE_URL}/register`, userData, {
          withCredentials: true,
        });

        this.message = 'Registration successful! Redirecting to login...';
        this.messageType = 'alert-success-custom';

        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        console.error('Error registering:', error);
        const errorMsg =
          error.response?.data?.detail || 'Failed to register user!';
        this.message = errorMsg;
        this.messageType = 'alert-custom';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* ── Registration page styles (replaces register.css) ── */
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.register-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 32px;
  padding: 48px 40px;
  max-width: 440px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.register-card:hover {
  transform: translateY(-4px);
}

.logo-section {
  text-align: center;
  margin-bottom: 32px;
}

.logo-icon {
  width: 72px;
  height: 72px;
  background: #ffc107;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  font-size: 32px;
  color: #1a1a2e;
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.25);
  transition: transform 0.3s ease;
}

.logo-icon:hover {
  transform: scale(1.05) rotate(-4deg);
}

.logo-section h2 {
  color: white;
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 4px;
}

.logo-section p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 15px;
  margin: 0;
}

.input-group-custom {
  position: relative;
  margin-bottom: 20px;
}

.input-group-custom i {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.3);
  font-size: 16px;
  pointer-events: none;
  transition: color 0.3s ease;
}

.input-group-custom:focus-within i {
  color: #ffc107;
}

.form-control-custom {
  width: 100%;
  padding: 14px 20px 14px 50px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.04);
  color: white;
  font-size: 15px;
  transition: all 0.3s ease;
  outline: none;
}

.form-control-custom::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.form-control-custom:focus {
  border-color: rgba(255, 193, 7, 0.3);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.04);
}

/* .phone-input { */
  /* Additional phone-specific styles if needed */
/* } */

.password-toggle {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #ffc107;
}

.btn-register {
  width: 100%;
  padding: 14px;
  background: #ffc107;
  border: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 16px;
  color: #1a1a2e;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;
}

.btn-register:hover:not(:disabled) {
  background: #ffd54f;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.25);
}

.btn-register:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 18px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

.login-link a {
  color: #ffc107;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #ffd54f;
  text-decoration: underline;
}

.login-link.mt-2 {
  margin-top: 10px;
}

.alert-custom {
  margin-top: 18px;
  padding: 14px 18px;
  background: rgba(255, 107, 107, 0.12);
  border: 1px solid rgba(255, 107, 107, 0.15);
  border-radius: 16px;
  color: #ff6b6b;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.alert-success-custom {
  background: rgba(40, 167, 69, 0.12);
  border-color: rgba(40, 167, 69, 0.15);
  color: #28a745;
}

/* ── Responsive tweaks ── */
@media (max-width: 480px) {
  .register-card {
    padding: 32px 20px;
  }
  .logo-section h2 {
    font-size: 24px;
  }
  .form-control-custom {
    padding: 12px 16px 12px 44px;
    font-size: 14px;
  }
  .btn-register {
    font-size: 15px;
    padding: 12px;
  }
}
</style>