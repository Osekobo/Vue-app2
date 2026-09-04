<template>
  <footer class="footer-premium">
    <div class="footer-container">
      <!-- Footer Top -->
      <div class="footer-top">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-column brand-column">
            <div class="footer-brand">
              <span class="brand-text"> O<span>Berlo</span> </span>

              <p class="tagline">
                Nairobi's destination for quality pre-owned, luxury and
                performance vehicles since 2018.
              </p>

              <div class="brand-line"></div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-column">
            <h5>Quick Links</h5>

            <ul class="footer-links">
              <li>
                <router-link to="/">
                  <i class="fas fa-chevron-right"></i>
                  <span>Home</span>
                </router-link>
              </li>

              <li>
                <router-link to="/shop">
                  <i class="fas fa-chevron-right"></i>
                  <span>Shop</span>
                </router-link>
              </li>

              <li>
                <router-link to="/about">
                  <i class="fas fa-chevron-right"></i>
                  <span>About Us</span>
                </router-link>
              </li>

              <li>
                <router-link to="/contact">
                  <i class="fas fa-chevron-right"></i>
                  <span>Contact</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-column">
            <h5>Services</h5>

            <ul class="footer-links">
              <li>
                <router-link to="/test-drive">
                  <i class="fas fa-chevron-right"></i>
                  <span>Test Drive</span>
                </router-link>
              </li>

              <li>
                <router-link to="/financing">
                  <i class="fas fa-chevron-right"></i>
                  <span>Financing</span>
                </router-link>
              </li>

              <li>
                <router-link to="/blog">
                  <i class="fas fa-chevron-right"></i>
                  <span>Blog</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-column contact-column">
            <h5>Contact</h5>

            <div class="contact-item">
              <i class="fas fa-location-dot"></i>
              <span>
                Mombasa Road, Nairobi,<br />
                Kenya
              </span>
            </div>

            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <a href="tel:+254700123456"> +254 700 123 456 </a>
            </div>

            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:concierge@oberlo.com"> hello@oberlo.co.ke </a>
            </div>

            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <span> Mon–Sat: 8:00 AM – 6:00 PM EAT </span>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="footer-column newsletter-column">
            <h5>Stay Updated</h5>

            <p class="newsletter-text">
              Subscribe for new arrivals, Nairobi deals and exclusive offers.
            </p>

            <div class="newsletter-wrap">
              <input
                type="email"
                placeholder="Your email address"
                v-model="email"
                @keydown.enter.prevent="subscribe"
              />

              <button class="btn-subscribe" type="button" @click="subscribe">
                <i class="fas fa-paper-plane"></i>
                <span>Subscribe</span>
              </button>
            </div>

            <!-- Social Icons -->
            <div class="social-section">
              <span class="social-label">Follow us</span>

              <div class="social-icons">
                <a href="#" aria-label="Facebook">
                  <i class="fab fa-facebook-f"></i>
                </a>

                <a href="#" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>

                <a href="#" aria-label="YouTube">
                  <i class="fab fa-youtube"></i>
                </a>

                <a href="#" aria-label="LinkedIn">
                  <i class="fab fa-linkedin-in"></i>
                </a>

                <a href="#" aria-label="Twitter">
                  <i class="fab fa-x-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="trust-badges">
          <div class="trust-badge">
            <i class="fas fa-shield-alt"></i>
            <span>Secure Payments</span>
          </div>

          <div class="trust-badge">
            <i class="fas fa-truck"></i>
            <span>Free Delivery</span>
          </div>

          <div class="trust-badge">
            <i class="fas fa-undo-alt"></i>
            <span>7-Day Returns</span>
          </div>

          <div class="trust-badge">
            <i class="fas fa-certificate"></i>
            <span>Certified Vehicles</span>
          </div>

          <div class="trust-badge">
            <i class="fas fa-headset"></i>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="copyright">
          &copy; 2025
          <router-link to="/">OBerlo</router-link>. All rights reserved.
        </div>

        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",

  data() {
    return {
      email: "",
    };
  },

  methods: {
    subscribe() {
      if (this.email.trim()) {
        alert("Thank you for subscribing. You'll receive our latest updates.");

        this.email = "";
      } else {
        alert("Please enter a valid email address.");
      }
    },
  },
};
</script>

<style scoped src="../styles/components/Footer.css"></style>

<!-- 580 lines -->
