<template>
  <nav class="top-navbar" id="topNavbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <!-- Navbar Top Row -->
      <div class="navbar-main">
        <!-- Brand / Logo -->
        <router-link to="/" class="navbar-brand" @click="closeMobileMenu">
          OBerlo Kenya
        </router-link>

        <!-- Desktop Navigation -->
        <div class="desktop-nav">
          <router-link to="/" class="nav-link-top" exact active-class="active">
            Home
          </router-link>

          <router-link to="/shop" class="nav-link-top" active-class="active">
            Shop
          </router-link>

          <router-link to="/about" class="nav-link-top" active-class="active">
            About
          </router-link>

          <router-link to="/blog" class="nav-link-top" active-class="active">
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

          <router-link to="/contact" class="nav-link-top" active-class="active">
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
              placeholder="Search cars in Kenya..."
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
          <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
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

        <router-link to="/shop" @click="closeMobileMenu" active-class="active">
          <i class="fas fa-car"></i>
          Shop
        </router-link>

        <router-link to="/about" @click="closeMobileMenu" active-class="active">
          <i class="fas fa-info-circle"></i>
          About
        </router-link>

        <router-link to="/blog" @click="closeMobileMenu" active-class="active">
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
              placeholder="Search cars in Kenya..."
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

    window.addEventListener("storage", this.checkAuth);

    window.addEventListener("scroll", this.handleScroll);

    this.handleScroll();
  },

  beforeUnmount() {
    window.removeEventListener("storage", this.checkAuth);

    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped src="../styles/components/Navbar.css"></style>

<!-- 240 lines -->
