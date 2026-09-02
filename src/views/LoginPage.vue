<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-section">
        <div class="logo-icon">
          <i class="fas fa-car"></i>
        </div>
        <h2>Welcome Back!</h2>
        <p>Sign in to access your dashboard</p>
      </div>

      <form @submit.prevent="handleLogin">
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

        <button type="submit" class="btn-login" :disabled="isLoading">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm me-2"
          ></span>
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <div class="register-link">
          Don't have an account? <router-link to="/register">Sign Up</router-link>
        </div>

        <div class="register-link mt-2">
          <router-link to="/">
            <i class="fas fa-arrow-left"></i> Back to Home
          </router-link>
        </div>
      </form>

      <div v-if="message" class="alert-custom">
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
            withCredentials: true, // Important for cookies
          }
        );

        if (response.data.message === 'Login successful') {
          // Store user info (token is in HTTP-only cookie)
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          localStorage.setItem('isLoggedIn', 'true');

          this.message = 'Login successful! Redirecting...';
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        } else {
          this.message = 'Login failed';
        }
      } catch (err) {
        console.error('Login error:', err.response?.data || err.message);
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
/* ── Login page styles (replaces login.css) ── */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
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

.login-card:hover {
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

.btn-login {
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

.btn-login:hover:not(:disabled) {
  background: #ffd54f;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.25);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 18px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

.register-link a {
  color: #ffc107;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #ffd54f;
  text-decoration: underline;
}

.register-link.mt-2 {
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

/* ── Responsive tweaks ── */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 20px;
  }
  .logo-section h2 {
    font-size: 24px;
  }
  .form-control-custom {
    padding: 12px 16px 12px 44px;
    font-size: 14px;
  }
  .btn-login {
    font-size: 15px;
    padding: 12px;
  }
}
</style>