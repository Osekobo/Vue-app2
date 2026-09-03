<template>
  <footer class="footer-premium">
    <div class="footer-container">

      <!-- Footer Top -->
      <div class="footer-top">
        <div class="footer-grid">

          <!-- Brand -->
          <div class="footer-column brand-column">
            <div class="footer-brand">
              <span class="brand-text">
                O<span>Berlo</span>
              </span>

              <p class="tagline">
                Curating the world's finest luxury vehicles for discerning
                drivers since 2018.
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
                450 Park Avenue,<br />
                New York, NY 10022
              </span>
            </div>

            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <a href="tel:+18005550199">
                +1 (800) 555-0199
              </a>
            </div>

            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:concierge@oberlo.com">
                concierge@oberlo.com
              </a>
            </div>

            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <span>
                Mon–Sat: 9:00 AM – 7:00 PM
              </span>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="footer-column newsletter-column">
            <h5>Stay Updated</h5>

            <p class="newsletter-text">
              Subscribe to get the latest arrivals and exclusive offers.
            </p>

            <div class="newsletter-wrap">
              <input
                type="email"
                placeholder="Your email address"
                v-model="email"
                @keydown.enter.prevent="subscribe"
              />

              <button
                class="btn-subscribe"
                type="button"
                @click="subscribe"
              >
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
          <router-link to="/">OBerlo</router-link>.
          All rights reserved.
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
        alert(
          "✅ Thank you for subscribing! You'll receive our latest updates."
        );

        this.email = "";
      } else {
        alert("Please enter a valid email address.");
      }
    },
  },
};
</script>

<style scoped>
/* ================================
   PREMIUM FOOTER
================================ */

.footer-premium {
  width: 100%;
  margin-top: auto;
  background:
    radial-gradient(
      circle at 85% 15%,
      rgba(255, 193, 7, 0.06),
      transparent 28%
    ),
    linear-gradient(
      180deg,
      #0d0d16 0%,
      #141423 55%,
      #10101b 100%
    );
  color: rgba(255, 255, 255, 0.72);
  border-top: 1px solid rgba(255, 193, 7, 0.1);
}

/* ================================
   CONTAINER
================================ */

.footer-container {
  width: min(1380px, calc(100% - 60px));
  margin: 0 auto;
}

/* ================================
   FOOTER TOP
================================ */

.footer-top {
  padding: 70px 0 38px;
}

/* ================================
   GRID
================================ */

.footer-grid {
  display: grid;
  grid-template-columns:
    minmax(190px, 1.25fr)
    minmax(130px, 0.8fr)
    minmax(130px, 0.8fr)
    minmax(190px, 1fr)
    minmax(250px, 1.45fr);

  gap: 42px;
}

/* ================================
   COLUMNS
================================ */

.footer-column {
  min-width: 0;
}

.brand-column {
  padding-right: 15px;
}

/* ================================
   BRAND
================================ */

.footer-brand {
  position: relative;
}

.brand-text {
  display: inline-block;
  color: #ffffff;
  font-size: 31px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1px;
}

.brand-text span {
  color: #ffc107;
}

.tagline {
  max-width: 300px;
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.9rem;
  line-height: 1.7;
}

.brand-line {
  width: 42px;
  height: 3px;
  margin-top: 22px;
  background: #ffc107;
  border-radius: 20px;
}

/* ================================
   HEADINGS
================================ */

.footer-premium h5 {
  position: relative;
  margin: 0 0 25px;
  padding-bottom: 10px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.footer-premium h5::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 28px;
  height: 2px;
  background: #ffc107;
  border-radius: 10px;
}

/* ================================
   LINKS
================================ */

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer-links li {
  margin: 0;
}

.footer-links a {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: rgba(255, 255, 255, 0.53);
  text-decoration: none;
  font-size: 0.88rem;
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.footer-links a i {
  width: 10px;
  color: #ffc107;
  font-size: 0.62rem;
  opacity: 0;
  transform: translateX(-5px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.footer-links a:hover {
  color: #ffc107;
  transform: translateX(5px);
}

.footer-links a:hover i {
  opacity: 1;
  transform: translateX(0);
}

/* ================================
   CONTACT
================================ */

.contact-column {
  padding-right: 5px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.52);
  font-size: 0.85rem;
  line-height: 1.55;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-item i {
  flex-shrink: 0;
  width: 18px;
  margin-top: 3px;
  color: #ffc107;
  font-size: 0.9rem;
  text-align: center;
}

.contact-item a {
  color: rgba(255, 255, 255, 0.52);
  text-decoration: none;
  transition: color 0.25s ease;
  word-break: break-word;
}

.contact-item a:hover {
  color: #ffc107;
}

/* ================================
   NEWSLETTER
================================ */

.newsletter-text {
  max-width: 340px;
  margin: 0 0 17px;
  color: rgba(255, 255, 255, 0.43);
  font-size: 0.84rem;
  line-height: 1.6;
}

.newsletter-wrap {
  display: flex;
  width: 100%;
  gap: 8px;
}

.newsletter-wrap input {
  min-width: 0;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 30px;
  outline: none;
  background: rgba(255, 255, 255, 0.055);
  color: #ffffff;
  font-size: 0.82rem;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.newsletter-wrap input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.newsletter-wrap input:focus {
  border-color: rgba(255, 193, 7, 0.45);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.06);
}

.btn-subscribe {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 12px 18px;
  border: none;
  border-radius: 30px;
  background: #ffc107;
  color: #000000;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.btn-subscribe:hover {
  background: #ffd54f;
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(255, 193, 7, 0.2);
}

.btn-subscribe i {
  font-size: 0.75rem;
}

/* ================================
   SOCIAL
================================ */

.social-section {
  margin-top: 24px;
}

.social-label {
  display: block;
  margin-bottom: 11px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.social-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.045);
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  font-size: 0.9rem;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;
}

.social-icons a:hover {
  transform: translateY(-4px);
  border-color: #ffc107;
  background: #ffc107;
  color: #000000;
  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.2);
}

/* ================================
   TRUST BADGES
================================ */

.trust-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px 38px;
  margin-top: 52px;
  padding: 23px 0 7px;
  border-top: 1px solid rgba(255, 255, 255, 0.055);
}

.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.78rem;
  font-weight: 500;
  white-space: nowrap;
}

.trust-badge i {
  color: #ffc107;
  font-size: 1rem;
}

/* ================================
   FOOTER BOTTOM
================================ */

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 0 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.045);
}

.copyright {
  color: rgba(255, 255, 255, 0.32);
  font-size: 0.78rem;
}

.copyright a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.25s ease;
}

.copyright a:hover {
  color: #ffc107;
}

.legal-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 18px;
}

.legal-links a {
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  font-size: 0.76rem;
  transition: color 0.25s ease;
}

.legal-links a:hover {
  color: #ffc107;
}

/* ================================
   LARGE TABLET
================================ */

@media (max-width: 1200px) {
  .footer-container {
    width: min(100% - 50px, 1100px);
  }

  .footer-grid {
    grid-template-columns:
      1.2fr
      0.8fr
      0.8fr
      1fr;

    gap: 38px 30px;
  }

  .newsletter-column {
    grid-column: 1 / -1;
    max-width: 600px;
  }

  .newsletter-text {
    max-width: 500px;
  }

  .newsletter-wrap {
    max-width: 600px;
  }
}

/* ================================
   TABLET
================================ */

@media (max-width: 991px) {
  .footer-top {
    padding: 55px 0 35px;
  }

  .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 42px 45px;
  }

  .brand-column {
    grid-column: 1 / -1;
    padding-right: 0;
  }

  .newsletter-column {
    grid-column: 1 / -1;
    max-width: none;
  }

  .newsletter-wrap {
    max-width: 600px;
  }

  .trust-badges {
    margin-top: 42px;
    gap: 15px 28px;
  }
}

/* ================================
   MOBILE
================================ */

@media (max-width: 767px) {
  .footer-container {
    width: min(100% - 34px, 600px);
  }

  .footer-top {
    padding: 45px 0 30px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .brand-column,
  .newsletter-column {
    grid-column: auto;
  }

  .brand-text {
    font-size: 28px;
  }

  .tagline {
    max-width: 100%;
  }

  .footer-premium h5 {
    margin-bottom: 20px;
  }

  .newsletter-wrap {
    max-width: none;
    flex-direction: column;
  }

  .newsletter-wrap input {
    padding: 13px 17px;
  }

  .btn-subscribe {
    width: 100%;
    padding: 13px;
  }

  .social-section {
    margin-top: 22px;
  }

  .trust-badges {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: 38px;
    padding-left: 5px;
  }

  .footer-bottom {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 14px;
    padding: 22px 0 27px;
  }

  .legal-links {
    justify-content: center;
    gap: 12px 18px;
  }
}

/* ================================
   SMALL MOBILE
================================ */

@media (max-width: 480px) {
  .footer-container {
    width: min(100% - 28px, 400px);
  }

  .footer-top {
    padding-top: 38px;
  }

  .brand-text {
    font-size: 25px;
  }

  .tagline {
    font-size: 0.84rem;
  }

  .footer-premium h5 {
    font-size: 0.94rem;
  }

  .footer-links a {
    font-size: 0.84rem;
  }

  .contact-item {
    font-size: 0.82rem;
  }

  .social-icons a {
    width: 36px;
    height: 36px;
    font-size: 0.85rem;
  }

  .trust-badge {
    font-size: 0.75rem;
  }

  .trust-badge i {
    font-size: 0.95rem;
  }

  .copyright {
    font-size: 0.74rem;
  }

  .legal-links a {
    font-size: 0.72rem;
  }
}

/* ================================
   VERY SMALL SCREENS
================================ */

@media (max-width: 360px) {
  .footer-container {
    width: calc(100% - 24px);
  }

  .footer-grid {
    gap: 30px;
  }

  .brand-text {
    font-size: 23px;
  }

  .newsletter-text {
    font-size: 0.8rem;
  }

  .contact-item {
    gap: 9px;
  }
}
</style>

<!-- 580 lines -->