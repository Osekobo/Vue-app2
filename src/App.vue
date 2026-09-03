<template>
  <div id="app">
    <!-- Top Navbar (global) -->
    <Navbar />

    <!-- Main content area – rendered by Vue Router -->
    <router-view />

    <!-- Footer (global) -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
/* ── Global styles (no `scoped`) ── */
/* These were originally in your index.html <style> and apply to the entire app. */
/* Component‑specific styles should go in each component's <style scoped>. */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
}

/* ── Top Navbar styles (moved from the old navbar.html) ── */
/* We'll keep them here for global consistency, but you can also move them into Navbar.vue's scoped style. */
.top-navbar {
  background: #1a1a2e;
  padding: 12px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: all 0.3s ease;
}

.top-navbar.scrolled {
  background: #0f0f1a;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.top-navbar a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s;
  font-size: 14px;
}

.top-navbar a:hover,
.top-navbar a.active {
  color: #ffc107;
  background: rgba(255, 193, 7, 0.1);
}

/* ── Footer styles (global) ── */
footer {
  background: #1a1a2e;
  color: white;
  padding: 50px 0 20px;
}

footer .copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* ── Utility / helper classes (if needed) ── */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

#featuredGrid,
#shopGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

#featuredGrid > *,
#shopGrid > * {
  min-width: 0;
  margin: 0;
}

#featuredGrid .car-card,
#shopGrid .shop-card {
  width: 100%;
  min-width: 0;
  margin: 0;
}

#featuredGrid .car-card .card-body,
#shopGrid .shop-card .card-body {
  padding: 20px;
}

.row
  > [class*="col-"]
  > :where(
    .finance-card,
    .contact-info-card,
    .form-card,
    .calc-box,
    .blog-card,
    .service-box,
    .testimonial-card,
    .dashboard-card,
    .chart-card,
    .stat-card
  ) {
  width: 100%;
  height: 100%;
  margin: 0;
}

@media (max-width: 992px) {
  #featuredGrid,
  #shopGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ── Responsive tweaks ── */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .top-navbar a {
    padding: 6px 10px;
    font-size: 13px;
  }

  #featuredGrid,
  #shopGrid {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  #featuredGrid .car-card .card-body,
  #shopGrid .shop-card .card-body {
    padding: 16px;
  }
}
</style>
