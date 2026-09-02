<template>
  <div>
    <!-- Sidebar toggle button -->
    <button class="sidebar-toggle" id="sidebarToggle" @click="sidebarOpen = true">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay (closes sidebar when clicked) -->
    <div class="overlay" :class="{ show: sidebarOpen }" @click="sidebarOpen = false"></div>

    <!-- Sidebar -->
    <nav class="sidebar" :class="{ show: sidebarOpen }">
      <div class="sidebar-header">
        <h4>OBerlo</h4>
        <p>Inventory Management System</p>
      </div>
      <ul style="list-style: none; padding-left: 0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-chart-line"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">
            <i class="fas fa-car"></i> Inventory
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/purchases">
            <i class="fas fa-truck"></i> Purchase Orders
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/sales">
            <i class="fas fa-dollar-sign"></i> Vehicle Sales
          </router-link>
        </li>
        <li class="nav-item logout-btn">
          <a class="nav-link" href="#" @click.prevent="handleLogout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main>
      <!-- About Hero -->
      <section class="about-hero">
        <div class="container">
          <h1>About <span>OBerlo</span></h1>
          <p>
            We are a passionate team dedicated to curating the world's finest
            luxury vehicles for discerning drivers.
          </p>
        </div>
      </section>

      <!-- Our Story -->
      <section class="about-section">
        <div class="container">
          <div class="row align-items-center g-5">
            <div class="col-lg-6">
              <h2>Our <span>Story</span></h2>
              <p>
                Founded in 2018, OBerlo began with a simple vision: to connect
                automotive enthusiasts with extraordinary vehicles. What started
                as a small boutique dealership has grown into a trusted
                destination for luxury and performance cars.
              </p>
              <p>
                We hand-select every vehicle in our collection, ensuring each
                one meets our rigorous standards for quality, performance, and
                provenance. Our team of experts provides transparent,
                white-glove service from inquiry to delivery.
              </p>
              <p>
                Today, OBerlo serves clients across the globe, offering a
                curated inventory that spans iconic brands and emerging electric
                hypercars. We're not just selling cars — we're delivering
                experiences.
              </p>
            </div>
            <div class="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600"
                alt="Luxury showroom"
                class="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="about-section" style="background: #f0f2f5; padding: 70px 0">
        <div class="container">
          <div class="text-center mb-5">
            <h2>What We <span>Stand For</span></h2>
            <p style="color: #666; max-width: 600px; margin: 0 auto">
              Our core values drive every decision we make.
            </p>
          </div>
          <div class="row g-4">
            <div class="col-6 col-md-4">
              <div class="about-icon-box">
                <i class="fas fa-gem"></i>
                <h5>Quality First</h5>
                <p>
                  Every vehicle is meticulously inspected and certified before
                  it reaches our showroom.
                </p>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div class="about-icon-box">
                <i class="fas fa-handshake"></i>
                <h5>Trust & Transparency</h5>
                <p>
                  We believe in honest communication, fair pricing, and building
                  lasting relationships.
                </p>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div class="about-icon-box">
                <i class="fas fa-heart"></i>
                <h5>Passion for Performance</h5>
                <p>
                  We live and breathe cars — our enthusiasm drives everything we
                  do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="about-section">
        <div class="container">
          <div class="text-center mb-5">
            <h2>Meet the <span>Team</span></h2>
            <p style="color: #666; max-width: 600px; margin: 0 auto">
              The people behind OBerlo who make the magic happen.
            </p>
          </div>
          <div class="row g-4">
            <div class="col-md-3 col-6">
              <div class="team-card">
                <img
                  src="https://ui-avatars.com/api/?name=James+Mitchell&size=120&background=ffc107&color=000&bold=true"
                  alt="James"
                />
                <h5>James Mitchell</h5>
                <div class="role">Founder & CEO</div>
                <p>20+ years in luxury automotive</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="team-card">
                <img
                  src="https://ui-avatars.com/api/?name=Sarah+Chen&size=120&background=ffc107&color=000&bold=true"
                  alt="Sarah"
                />
                <h5>Sarah Chen</h5>
                <div class="role">Head of Operations</div>
                <p>Logistics & client experience</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="team-card">
                <img
                  src="https://ui-avatars.com/api/?name=Marcus+Wright&size=120&background=ffc107&color=000&bold=true"
                  alt="Marcus"
                />
                <h5>Marcus Wright</h5>
                <div class="role">Chief Curator</div>
                <p>Vehicle sourcing & authentication</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="team-card">
                <img
                  src="https://ui-avatars.com/api/?name=Elena+Rodriguez&size=120&background=ffc107&color=000&bold=true"
                  alt="Elena"
                />
                <h5>Elena Rodriguez</h5>
                <div class="role">Client Relations</div>
                <p>Concierge & after-sales support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-hero">
        <div class="container">
          <h1>Frequently Asked <span>Questions</span></h1>
          <p>Find answers to the most common inquiries about buying, selling, and financing.</p>
        </div>
      </section>

      <section class="container py-5 faq-section">
        <div class="accordion" id="faqAccordion">
          <!-- Q1 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                Do you offer warranties on your vehicles?
              </button>
            </h2>
            <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Yes! Every vehicle sold through OBerlo comes with a comprehensive 12-month / 12,000-mile warranty. Extended warranties are also available for purchase.
              </div>
            </div>
          </div>

          <!-- Q2 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
                Can I trade in my current vehicle?
              </button>
            </h2>
            <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Absolutely! We accept trade-ins of all makes and models. Contact our team for an instant estimate, and we'll deduct the value from your new purchase.
              </div>
            </div>
          </div>

          <!-- Q3 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
                What financing options are available?
              </button>
            </h2>
            <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                We offer flexible financing through our partner lenders with rates starting at 2.9% APR. You can also lease or pay in full. Visit our <router-link to="/financing">Financing page</router-link> to calculate your monthly payments.
              </div>
            </div>
          </div>

          <!-- Q4 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
                Do you ship vehicles internationally?
              </button>
            </h2>
            <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Yes, we ship worldwide. We handle all logistics, customs, and insurance. Shipping costs vary by destination—contact our team for a personalized quote.
              </div>
            </div>
          </div>

          <!-- Q5 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
                Can I return a car after purchase?
              </button>
            </h2>
            <div id="q5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                We offer a 7-day, 500-mile money-back guarantee. If you're not completely satisfied, you can return the vehicle for a full refund, no questions asked.
              </div>
            </div>
          </div>

          <!-- Q6 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q6">
                How do I book a test drive?
              </button>
            </h2>
            <div id="q6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                You can book a test drive directly through our <router-link to="/test-drive">Test Drive page</router-link>. Choose your preferred vehicle, date, and time, and our concierge team will confirm your slot within 24 hours.
              </div>
            </div>
          </div>

          <!-- Q7 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q7">
                Are your vehicles inspected and certified?
              </button>
            </h2>
            <div id="q7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Yes. Every car in our inventory undergoes a rigorous 150-point inspection by our master technicians. We provide a full vehicle history report with every purchase.
              </div>
            </div>
          </div>

          <!-- Q8 -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q8">
                What payment methods do you accept?
              </button>
            </h2>
            <div id="q8" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                We accept wire transfers, certified bank checks, and financing through our lending partners. We also accept credit cards for deposits (up to $5,000).
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
  name: 'AboutPage',
  data() {
    return {
      sidebarOpen: false,
    };
  },
  methods: {
    async handleLogout() {
      try {
        await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.error('Logout error:', error);
      }
      this.$router.push('/login');
    },
  },
  mounted() {
    // If you have any global search listeners, you can import and call them here
    // import { attachSearchListeners } from '@/utils/global';
    // attachSearchListeners();
  },
};
</script>

<style scoped>
/* ── Page-specific styles (same as original, but scoped) ── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  padding-top: 80px;
}

/* ── Sidebar ── */
.sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  bottom: 0;
  width: 280px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  transition: 0.3s ease-in-out;
  z-index: 1001;
  padding-top: 80px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
.sidebar.show {
  left: 0;
}
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}
.sidebar-header h4 {
  color: #ffc107;
  margin: 0;
}
.sidebar-header p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin: 5px 0 0;
}
.sidebar .nav-item {
  margin: 5px 0;
}
.sidebar .nav-link {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  transition: all 0.3s;
  font-weight: 500;
  border-radius: 8px;
  margin: 0 10px;
}
.sidebar .nav-link i {
  width: 25px;
  margin-right: 15px;
  font-size: 18px;
}
.sidebar .nav-link:hover {
  background: #ffc107;
  color: #000;
  transform: translateX(5px);
}
.sidebar .nav-link:hover i {
  color: #000;
}
.sidebar .logout-btn {
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
}
.sidebar .logout-btn .nav-link {
  color: #ff6b6b;
}
.sidebar .logout-btn .nav-link:hover {
  background: #ff6b6b;
  color: white;
}

.sidebar-toggle {
  position: fixed;
  left: 20px;
  top: 80px;
  z-index: 1002;
  background: #ffc107;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.sidebar-toggle:hover {
  background: #ffca2c;
  transform: scale(1.05);
}
.sidebar-toggle i {
  font-size: 20px;
  color: #000;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: none;
}
.overlay.show {
  display: block;
}

@media (max-width: 768px) {
  .sidebar-toggle {
    top: 70px;
    left: 10px;
    width: 40px;
    height: 40px;
  }
}

/* ── About hero ── */
.about-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 70px 0 60px;
  color: white;
  text-align: center;
}
.about-hero h1 {
  font-size: 48px;
  font-weight: 800;
}
.about-hero h1 span {
  color: #ffc107;
}
.about-hero p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
}

/* ── About sections ── */
.about-section {
  padding: 60px 0;
}
.about-section h2 {
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 20px;
}
.about-section h2 span {
  color: #ffc107;
}
.about-section p {
  color: #555;
  line-height: 1.8;
  font-size: 16px;
}

.about-icon-box {
  background: white;
  border-radius: 20px;
  padding: 35px 25px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  height: 100%;
}
.about-icon-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
}
.about-icon-box i {
  font-size: 42px;
  color: #ffc107;
  margin-bottom: 18px;
}
.about-icon-box h5 {
  font-weight: 700;
  color: #1a1a2e;
}
.about-icon-box p {
  font-size: 14px;
  color: #777;
  margin: 0;
}

.team-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  text-align: center;
  padding: 25px 15px 20px;
}
.team-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
}
.team-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 15px;
  border: 4px solid #ffc107;
}
.team-card h5 {
  font-weight: 700;
  margin: 0;
}
.team-card .role {
  font-size: 14px;
  color: #ffc107;
  font-weight: 500;
}
.team-card p {
  font-size: 14px;
  color: #777;
  margin: 8px 0 0;
}

/* ── FAQ ── */
.faq-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 60px 0 40px;
  color: white;
  text-align: center;
}
.faq-hero h1 {
  font-size: 42px;
  font-weight: 800;
}
.faq-hero h1 span {
  color: #ffc107;
}
.faq-hero p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
}

.faq-section {
  max-width: 900px;
  margin: 0 auto;
}
.accordion-item {
  border: none;
  background: white;
  border-radius: 16px !important;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}
.accordion-button {
  padding: 20px 25px;
  font-weight: 700;
  color: #1a1a2e;
  background: white;
  border-radius: 16px !important;
  box-shadow: none !important;
  border: none;
  font-size: 17px;
}
.accordion-button:not(.collapsed) {
  color: #ffc107;
  background: white;
}
.accordion-button:focus {
  box-shadow: none;
}
.accordion-button::after {
  filter: none;
}
.accordion-body {
  padding: 0 25px 25px 25px;
  color: #555;
  line-height: 1.7;
  font-size: 15px;
}
.accordion-body a {
  color: #ffc107;
  text-decoration: none;
  font-weight: 500;
}
.accordion-body a:hover {
  text-decoration: underline;
}
</style>