<template>
  <footer class="footer-premium">
    <div class="container">
      <!-- Footer Top -->
      <div class="footer-top">
        <div class="row g-4">
          <!-- Brand -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-brand">
              <span class="brand-text">O<span>Berlo</span></span>
              <p class="tagline">
                Curating the world's finest luxury vehicles for discerning drivers since 2018.
              </p>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><router-link to="/"><i class="fas fa-chevron-right"></i> Home</router-link></li>
              <li><router-link to="/shop"><i class="fas fa-chevron-right"></i> Shop</router-link></li>
              <li><router-link to="/about"><i class="fas fa-chevron-right"></i> About Us</router-link></li>
              <li><router-link to="/contact"><i class="fas fa-chevron-right"></i> Contact</router-link></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="col-lg-2 col-md-6">
            <h5>Services</h5>
            <ul class="footer-links">
              <li><router-link to="/test-drive"><i class="fas fa-chevron-right"></i> Test Drive</router-link></li>
              <li><router-link to="/financing"><i class="fas fa-chevron-right"></i> Financing</router-link></li>
              <li><router-link to="/blog"><i class="fas fa-chevron-right"></i> Blog</router-link></li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="col-lg-2 col-md-6">
            <h5>Contact</h5>
            <div class="contact-item">
              <i class="fas fa-location-dot"></i>
              <span>450 Park Avenue,<br />New York, NY 10022</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <a href="tel:+18005550199">+1 (800) 555‑0199</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:concierge@oberlo.com">concierge@oberlo.com</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
            </div>
          </div>

          <!-- Newsletter + Social -->
          <div class="col-lg-3 col-md-12">
            <h5>Stay Updated</h5>
            <p style="font-size:0.88rem; color:rgba(255,255,255,0.45); margin-bottom:14px;">
              Subscribe to get the latest arrivals and exclusive offers.
            </p>
            <div class="newsletter-wrap">
              <input
                type="email"
                placeholder="Your email address"
                v-model="email"
                @keydown.enter.prevent="subscribe"
              />
              <button class="btn-subscribe" @click="subscribe">
                <i class="fas fa-paper-plane"></i> Subscribe
              </button>
            </div>
            <div style="margin-top: 18px;">
              <div class="social-icons">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="trust-badges">
          <span class="trust-badge"><i class="fas fa-shield-alt"></i> Secure Payments</span>
          <span class="trust-badge"><i class="fas fa-truck"></i> Free Delivery</span>
          <span class="trust-badge"><i class="fas fa-undo-alt"></i> 7-Day Returns</span>
          <span class="trust-badge"><i class="fas fa-certificate"></i> Certified Vehicles</span>
          <span class="trust-badge"><i class="fas fa-headset"></i> 24/7 Support</span>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="copyright">
          &copy; 2025 <router-link to="/">OBerlo</router-link>. All rights reserved.
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
  name: 'Footer',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    subscribe() {
      if (this.email.trim()) {
        alert('✅ Thank you for subscribing! You\'ll receive our latest updates.');
        this.email = '';
      } else {
        alert('Please enter a valid email address.');
      }
    },
  },
};
</script>

<style scoped>
/* ── PREMIUM FOOTER (scoped to this component) ── */
.footer-premium {
  background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
  color: rgba(255, 255, 255, 0.75);
  padding-top: 60px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 193, 7, 0.08);
}

.footer-top {
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-premium .container {
  max-width: 1280px;
  padding: 0 1.5rem;
}

/* Brand */
.footer-brand .brand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #ffc107;
  border-radius: 14px;
  font-size: 22px;
  font-weight: 800;
  color: #000;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}
.footer-brand:hover .brand-icon {
  transform: rotate(-6deg) scale(1.05);
}
.footer-brand .brand-text {
  font-size: 28px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
  display: block;
}
.footer-brand .brand-text span {
  color: #ffc107;
}
.footer-brand .tagline {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 6px;
  line-height: 1.6;
  max-width: 300px;
}

/* Headings */
.footer-premium h5 {
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 18px;
  letter-spacing: 0.3px;
  position: relative;
}
.footer-premium h5::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 30px;
  height: 2.5px;
  background: #ffc107;
  border-radius: 4px;
}
.footer-premium .text-center h5::after {
  left: 50%;
  transform: translateX(-50%);
}

/* Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-links li {
  margin-bottom: 10px;
}
.footer-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.92rem;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.footer-links a i {
  font-size: 0.7rem;
  color: #ffc107;
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.25s ease;
}
.footer-links a:hover {
  color: #ffc107;
  transform: translateX(6px);
}
.footer-links a:hover i {
  opacity: 1;
  transform: translateX(0);
}

/* Contact */
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.92rem;
}
.contact-item i {
  color: #ffc107;
  font-size: 1rem;
  width: 20px;
  margin-top: 3px;
  flex-shrink: 0;
}
.contact-item a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.25s ease;
}
.contact-item a:hover {
  color: #ffc107;
}

/* Newsletter */
.newsletter-wrap {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}
.newsletter-wrap input {
  flex: 1;
  padding: 12px 18px;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  min-width: 0;
}
.newsletter-wrap input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.newsletter-wrap input:focus {
  border-color: rgba(255, 193, 7, 0.3);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.04);
}
.btn-subscribe {
  padding: 12px 24px;
  background: #ffc107;
  color: #000;
  border: none;
  border-radius: 40px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-subscribe:hover {
  background: #ffd54f;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.25);
}

/* Social */
.social-icons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.05rem;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.04);
}
.social-icons a:hover {
  background: #ffc107;
  color: #000;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.25);
  border-color: #ffc107;
}

/* Trust Badges */
.trust-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 32px;
  justify-content: center;
  padding: 24px 0 8px;
}
.trust-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.3px;
}
.trust-badge i {
  font-size: 1.4rem;
  color: #ffc107;
}

/* Footer Bottom */
.footer-bottom {
  padding: 24px 0 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-bottom .copyright {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.35);
}
.footer-bottom .copyright a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.25s ease;
}
.footer-bottom .copyright a:hover {
  color: #ffc107;
}
.footer-bottom .legal-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.footer-bottom .legal-links a {
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.25s ease;
}
.footer-bottom .legal-links a:hover {
  color: #ffc107;
}

/* ── Responsive ── */
@media (max-width: 991px) {
  .footer-premium {
    padding-top: 44px;
  }
  .footer-brand .tagline {
    max-width: 100%;
  }
  .footer-premium h5 {
    margin-top: 24px;
  }
  .footer-premium h5:first-of-type {
    margin-top: 0;
  }
  .trust-badges {
    gap: 14px 24px;
  }
  .trust-badge {
    font-size: 0.78rem;
  }
}

@media (max-width: 576px) {
  .footer-premium {
    padding-top: 32px;
  }
  .footer-premium .container {
    padding: 0 1rem;
  }
  .footer-brand .brand-text {
    font-size: 22px;
  }
  .footer-premium h5 {
    font-size: 0.95rem;
    margin-top: 20px;
  }
  .footer-premium h5::after {
    width: 24px;
  }
  .footer-links a {
    font-size: 0.85rem;
  }
  .contact-item {
    font-size: 0.85rem;
    gap: 10px;
  }
  .newsletter-wrap {
    flex-direction: column;
  }
  .newsletter-wrap input {
    padding: 14px 18px;
    width: 100%;
  }
  .btn-subscribe {
    width: 100%;
    justify-content: center;
    padding: 14px;
  }
  .social-icons {
    justify-content: center;
  }
  .social-icons a {
    width: 40px;
    height: 40px;
    font-size: 0.95rem;
  }
  .trust-badges {
    gap: 12px 16px;
    flex-direction: column;
    align-items: center;
  }
  .trust-badge {
    font-size: 0.75rem;
  }
  .trust-badge i {
    font-size: 1.1rem;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 10px;
    padding: 20px 0 24px;
  }
  .footer-bottom .copyright {
    font-size: 0.8rem;
  }
  .footer-bottom .legal-links {
    justify-content: center;
    gap: 14px;
  }
  .footer-bottom .legal-links a {
    font-size: 0.78rem;
  }
}

@media (max-width: 380px) {
  .footer-brand .brand-text {
    font-size: 20px;
  }
  .footer-premium h5 {
    font-size: 0.9rem;
  }
  .contact-item {
    font-size: 0.8rem;
  }
}
</style>