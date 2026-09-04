<template>
  <div id="app">
    <!-- Top Navbar (global) -->
    <Navbar v-if="showNavbar" />

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

  computed: {
    showNavbar() {
      return !this.$route.meta.hideNavbar;
    },
  },
};
</script>
