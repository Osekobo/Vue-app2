<template>
  <nav class="top-navbar" id="topNavbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center w-100">
        <!-- Brand / Logo -->
        <router-link to="/" class="navbar-brand">OBerlo</router-link>

        <!-- Desktop Navigation Links + Search -->
        <div class="d-none d-md-flex align-items-center gap-3">
          <router-link to="/" class="nav-link-top" exact active-class="active">Home</router-link>
          <router-link to="/shop" class="nav-link-top" active-class="active">Shop</router-link>
          <router-link to="/about" class="nav-link-top" active-class="active">About</router-link>
          <router-link to="/blog" class="nav-link-top" active-class="active">Blog</router-link>
          <router-link to="/test-drive" class="nav-link-top" active-class="active">Test Drive</router-link>
          <router-link to="/financing" class="nav-link-top" active-class="active">Financing</router-link>
          <router-link to="/contact" class="nav-link-top" active-class="active">Contact</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link-top" active-class="active">Login</router-link>
        

          <!-- Search Input -->
          <div class="search-wrapper d-flex align-items-center">
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="Search cars..."
              v-model="searchQuery"
              @keydown.enter="handleSearch"
            />
            <button class="btn btn-sm btn-warning ms-1" @click="handleSearch">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Hamburger -->
        <button class="d-md-none hamburger-btn" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobileMenu" class="d-md-none" :class="{ active: mobileMenuOpen }">
        <router-link to="/" @click="closeMobileMenu" exact active-class="active">Home</router-link>
        <router-link to="/shop" @click="closeMobileMenu" active-class="active">Shop</router-link>
        <router-link to="/about" @click="closeMobileMenu" active-class="active">About</router-link>
        <router-link to="/blog" @click="closeMobileMenu" active-class="active">Blog</router-link>
        <router-link to="/test-drive" @click="closeMobileMenu" active-class="active">Test Drive</router-link>
        <router-link to="/financing" @click="closeMobileMenu" active-class="active">Financing</router-link>
        <router-link to="/contact" @click="closeMobileMenu" active-class="active">Contact</router-link>
        <router-link v-if="!isLoggedIn" to="/login" @click="closeMobileMenu" active-class="active">Login</router-link>

        <!-- Mobile Search -->
        <div class="search-wrapper-mobile mt-2">
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Search cars..."
            v-model="searchQuery"
            @keydown.enter="handleSearch"
          />
          <button class="btn btn-sm btn-warning mt-1 w-100" @click="handleSearch">
            <i class="fas fa-search me-1"></i> Search
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      mobileMenuOpen: false,
      searchQuery: "",
      isScrolled: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
    handleSearch() {
      const query = this.searchQuery.trim();
      if (query) {
        this.$router.push({ path: "/shop", query: { search: query } });
      } else {
        this.$router.push("/shop");
      }
      this.closeMobileMenu();
    },
    checkAuth() {
      this.isLoggedIn = !!localStorage.getItem("isLoggedIn");
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
  },
  watch: {
    "$route.query.search": {
      handler(newVal) {
        if (newVal !== undefined) {
          this.searchQuery = newVal;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.checkAuth();
    window.addEventListener("storage", this.checkAuth);
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll(); // initial check
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.checkAuth);
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
/* ── Navbar styles ── */
.top-navbar {
  background: rgba(0, 0, 0, 0.95);
  padding: 12px 0;
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.top-navbar.scrolled {
  padding: 8px 0;
  background: rgba(0, 0, 0, 0.98);
}
.navbar-brand {
  font-size: 28px;
  font-weight: bold;
  color: #ffc107 !important;
  letter-spacing: 2px;
  text-decoration: none;
}
.nav-link-top {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500;
  margin: 0 6px;
  transition: all 0.3s;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 0;
}
.nav-link-top:hover {
  color: #ffc107 !important;
}
.nav-link-top.active {
  color: #ffc107 !important;
  border-bottom: 2px solid #ffc107;
}
.search-wrapper input {
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 6px 18px;
  width: 200px;
  font-size: 13px;
}
.search-wrapper input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.search-wrapper input:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.15);
  background: rgba(255, 255, 255, 0.12);
  color: white;
}
.hamburger-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
#mobileMenu {
  display: none;
  flex-direction: column;
  background: #1a1a2e;
  padding: 16px;
  gap: 10px;
}
#mobileMenu.active {
  display: flex;
}
#mobileMenu a {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.3s;
}
#mobileMenu a:hover {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}
#mobileMenu a.active {
  background: rgba(255, 193, 7, 0.15);
  color: #ffc107;
}
.search-wrapper-mobile input {
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 8px 18px;
  width: 100%;
}
.search-wrapper-mobile input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
@media (max-width: 991px) {
  .nav-link-top {
    font-size: 12px;
    margin: 0 4px;
  }
}
@media (max-width: 576px) {
  .navbar-brand {
    font-size: 22px;
  }
}
</style>