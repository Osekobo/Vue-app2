<template>
  <nav
    class="top-navbar"
    id="topNavbar"
    :class="{ scrolled: isScrolled }"
  >
    <div class="navbar-container">

      <!-- Navbar Top Row -->
      <div class="navbar-main">

        <!-- Brand / Logo -->
        <router-link
          to="/"
          class="navbar-brand"
          @click="closeMobileMenu"
        >
          OBerlo
        </router-link>

        <!-- Desktop Navigation -->
        <div class="desktop-nav">

          <router-link
            to="/"
            class="nav-link-top"
            exact
            active-class="active"
          >
            Home
          </router-link>

          <router-link
            to="/shop"
            class="nav-link-top"
            active-class="active"
          >
            Shop
          </router-link>

          <router-link
            to="/about"
            class="nav-link-top"
            active-class="active"
          >
            About
          </router-link>

          <router-link
            to="/blog"
            class="nav-link-top"
            active-class="active"
          >
            Blog
          </router-link>

          <router-link
            to="/test-drive"
            class="nav-link-top"
            active-class="active"
          >
            Test Drive
          </router-link>

          <router-link
            to="/financing"
            class="nav-link-top"
            active-class="active"
          >
            Financing
          </router-link>

          <router-link
            to="/contact"
            class="nav-link-top"
            active-class="active"
          >
            Contact
          </router-link>

          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="nav-link-top login-link"
            active-class="active"
          >
            Login
          </router-link>

          <!-- Desktop Search -->
          <div class="search-wrapper">

            <input
              type="text"
              placeholder="Search cars..."
              v-model="searchQuery"
              @keydown.enter="handleSearch"
            />

            <button
              type="button"
              class="search-btn"
              @click="handleSearch"
              aria-label="Search"
            >
              <i class="fas fa-search"></i>
            </button>

          </div>

        </div>

        <!-- Mobile Hamburger -->
        <button
          type="button"
          class="hamburger-btn"
          @click="toggleMobileMenu"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation"
        >
          <i
            :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
          ></i>
        </button>

      </div>

      <!-- Mobile Menu -->
      <div
        id="mobileMenu"
        class="mobile-menu"
        :class="{ active: mobileMenuOpen }"
      >

        <router-link
          to="/"
          @click="closeMobileMenu"
          exact
          active-class="active"
        >
          <i class="fas fa-home"></i>
          Home
        </router-link>

        <router-link
          to="/shop"
          @click="closeMobileMenu"
          active-class="active"
        >
          <i class="fas fa-car"></i>
          Shop
        </router-link>

        <router-link
          to="/about"
          @click="closeMobileMenu"
          active-class="active"
        >
          <i class="fas fa-info-circle"></i>
          About
        </router-link>

        <router-link
          to="/blog"
          @click="closeMobileMenu"
          active-class="active"
        >
          <i class="fas fa-newspaper"></i>
          Blog
        </router-link>

        <router-link
          to="/test-drive"
          @click="closeMobileMenu"
          active-class="active"
        >
          <i class="fas fa-road"></i>
          Test Drive
        </router-link>

        <router-link
          to="/financing"
          @click="closeMobileMenu"
          active-class="active"
        >
          <i class="fas fa-hand-holding-usd"></i>
          Financing
        </router-link>

        <router-link
          to="/contact"
          @click="closeMobileMenu"
          active-class="active"
        >
          <i class="fas fa-envelope"></i>
          Contact
        </router-link>

        <router-link
          v-if="!isLoggedIn"
          to="/login"
          @click="closeMobileMenu"
          active-class="active"
        >
          <i class="fas fa-sign-in-alt"></i>
          Login
        </router-link>

        <!-- Mobile Search -->
        <div class="search-wrapper-mobile">

          <div class="mobile-search-row">
            <input
              type="text"
              placeholder="Search cars..."
              v-model="searchQuery"
              @keydown.enter="handleSearch"
            />

            <button
              type="button"
              class="mobile-search-btn"
              @click="handleSearch"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>

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
        this.$router.push({
          path: "/shop",
          query: {
            search: query,
          },
        });
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

    window.addEventListener(
      "storage",
      this.checkAuth
    );

    window.addEventListener(
      "scroll",
      this.handleScroll
    );

    this.handleScroll();
  },

  beforeUnmount() {
    window.removeEventListener(
      "storage",
      this.checkAuth
    );

    window.removeEventListener(
      "scroll",
      this.handleScroll
    );
  },
};
</script>

<style scoped>

/* =====================================================
   NAVBAR
===================================================== */

.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1100;

  background: rgba(10, 10, 18, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  padding: 15px 0;

  transition:
    background 0.3s ease,
    padding 0.3s ease,
    box-shadow 0.3s ease;
}

.top-navbar.scrolled {
  padding: 10px 0;

  background: rgba(10, 10, 18, 0.98);

  box-shadow:
    0 5px 25px rgba(0, 0, 0, 0.25);
}

/* =====================================================
   CONTAINER
===================================================== */

.navbar-container {
  width: min(1380px, calc(100% - 50px));
  margin: 0 auto;
}

/* =====================================================
   MAIN NAVBAR ROW
===================================================== */

.navbar-main {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 45px;
}

/* =====================================================
   LOGO
===================================================== */

.navbar-brand {
  flex-shrink: 0;

  color: #ffc107 !important;
  text-decoration: none;

  font-size: 28px;
  font-weight: 800;

  letter-spacing: 2px;

  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.navbar-brand:hover {
  color: #ffca2c !important;
  transform: translateY(-1px);
}

/* =====================================================
   DESKTOP NAVIGATION
===================================================== */

.desktop-nav {
  display: flex;
  align-items: center;

  gap: 22px;
}

/* =====================================================
   NAV LINKS
===================================================== */

.nav-link-top {
  position: relative;

  color: rgba(255, 255, 255, 0.78) !important;
  text-decoration: none;

  font-size: 13px;
  font-weight: 600;

  padding: 9px 0;

  white-space: nowrap;

  transition:
    color 0.25s ease;
}

.nav-link-top::after {
  content: "";

  position: absolute;
  left: 50%;
  bottom: 1px;

  width: 0;
  height: 2px;

  background: #ffc107;

  transform: translateX(-50%);

  transition:
    width 0.25s ease;
}

.nav-link-top:hover {
  color: #ffc107 !important;
}

.nav-link-top:hover::after {
  width: 100%;
}

.nav-link-top.active {
  color: #ffc107 !important;
}

.nav-link-top.active::after {
  width: 100%;
}

/* =====================================================
   LOGIN
===================================================== */

.login-link {
  border: 1px solid rgba(255, 193, 7, 0.5);

  padding: 7px 15px;

  border-radius: 25px;
}

.login-link::after {
  display: none;
}

.login-link:hover {
  background: #ffc107;
  color: #000 !important;
}

.login-link.active {
  background: #ffc107;
  color: #000 !important;
}

/* =====================================================
   DESKTOP SEARCH
===================================================== */

.search-wrapper {
  display: flex;
  align-items: center;

  margin-left: 5px;

  background: rgba(255, 255, 255, 0.07);

  border: 1px solid rgba(255, 255, 255, 0.13);

  border-radius: 30px;

  padding: 3px;

  transition:
    border-color 0.25s ease,
    background 0.25s ease;
}

.search-wrapper:focus-within {
  background: rgba(255, 255, 255, 0.1);

  border-color: rgba(255, 193, 7, 0.6);

  box-shadow:
    0 0 0 3px rgba(255, 193, 7, 0.08);
}

.search-wrapper input {
  width: 160px;

  border: none;
  outline: none;

  background: transparent;

  color: white;

  font-size: 12px;

  padding: 8px 10px 8px 15px;
}

.search-wrapper input::placeholder {
  color: rgba(255, 255, 255, 0.42);
}

.search-btn {
  width: 33px;
  height: 33px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: #ffc107;
  color: #000;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.search-btn:hover {
  background: #ffca2c;
  transform: scale(1.05);
}

.search-btn i {
  font-size: 12px;
}

/* =====================================================
   HAMBURGER
===================================================== */

.hamburger-btn {
  display: none;

  width: 42px;
  height: 42px;

  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.06);

  color: white;

  cursor: pointer;

  font-size: 19px;

  transition:
    background 0.25s ease,
    color 0.25s ease;
}

.hamburger-btn:hover {
  background: #ffc107;
  color: #000;
}

/* =====================================================
   MOBILE MENU
===================================================== */

.mobile-menu {
  display: none;

  margin-top: 15px;

  padding: 15px;

  background:
    linear-gradient(
      180deg,
      #1a1a2e 0%,
      #16213e 100%
    );

  border:
    1px solid rgba(255, 255, 255, 0.08);

  border-radius: 14px;

  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.3);
}

.mobile-menu.active {
  display: flex;
  flex-direction: column;

  gap: 5px;
}

/* =====================================================
   MOBILE LINKS
===================================================== */

.mobile-menu > a {
  display: flex;
  align-items: center;

  gap: 13px;

  color: rgba(255, 255, 255, 0.88);

  text-decoration: none;

  padding: 11px 13px;

  border-radius: 9px;

  font-size: 14px;
  font-weight: 600;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}

.mobile-menu > a i {
  width: 20px;

  color: rgba(255, 193, 7, 0.8);

  text-align: center;
}

.mobile-menu > a:hover {
  background: rgba(255, 193, 7, 0.1);

  color: #ffc107;

  transform: translateX(4px);
}

.mobile-menu > a.active {
  background: rgba(255, 193, 7, 0.15);

  color: #ffc107;
}

.mobile-menu > a.active i {
  color: #ffc107;
}

/* =====================================================
   MOBILE SEARCH
===================================================== */

.search-wrapper-mobile {
  margin-top: 10px;

  padding-top: 14px;

  border-top:
    1px solid rgba(255, 255, 255, 0.1);
}

.mobile-search-row {
  display: flex;
  align-items: center;

  gap: 7px;
}

.mobile-search-row input {
  flex: 1;

  min-width: 0;

  height: 40px;

  border:
    1px solid rgba(255, 255, 255, 0.15);

  border-radius: 25px;

  outline: none;

  background: rgba(255, 255, 255, 0.08);

  color: white;

  padding: 0 16px;

  font-size: 13px;
}

.mobile-search-row input::placeholder {
  color: rgba(255, 255, 255, 0.42);
}

.mobile-search-row input:focus {
  border-color: #ffc107;

  box-shadow:
    0 0 0 3px rgba(255, 193, 7, 0.1);
}

.mobile-search-btn {
  flex-shrink: 0;

  width: 40px;
  height: 40px;

  border: none;

  border-radius: 50%;

  background: #ffc107;

  color: #000;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.mobile-search-btn:hover {
  background: #ffca2c;

  transform: scale(1.05);
}

/* =====================================================
   LARGE TABLETS
===================================================== */

@media (max-width: 1200px) {
  .desktop-nav {
    gap: 15px;
  }

  .nav-link-top {
    font-size: 12px;
  }

  .search-wrapper input {
    width: 140px;
  }
}

/* =====================================================
   TABLET / MOBILE
===================================================== */

@media (max-width: 991px) {
  .navbar-container {
    width: calc(100% - 35px);
  }

  .desktop-nav {
    display: none;
  }

  .hamburger-btn {
    display: flex;
  }

  .navbar-brand {
    font-size: 25px;
  }
}

/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 576px) {
  .top-navbar {
    padding: 12px 0;
  }

  .top-navbar.scrolled {
    padding: 9px 0;
  }

  .navbar-container {
    width: calc(100% - 24px);
  }

  .navbar-brand {
    font-size: 22px;
    letter-spacing: 1.5px;
  }

  .hamburger-btn {
    width: 39px;
    height: 39px;
    font-size: 17px;
  }

  .mobile-menu {
    margin-top: 12px;
    padding: 12px;
  }

  .mobile-menu > a {
    padding: 10px 11px;
    font-size: 13px;
  }
}

/* =====================================================
   VERY SMALL SCREENS
===================================================== */

@media (max-width: 360px) {
  .navbar-container {
    width: calc(100% - 18px);
  }

  .navbar-brand {
    font-size: 20px;
  }

  .hamburger-btn {
    width: 37px;
    height: 37px;
  }
}

</style>

<!-- 240 lines -->