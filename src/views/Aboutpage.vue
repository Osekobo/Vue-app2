<template>
  <div>
    <!-- Sidebar toggle button -->
    <button
      class="sidebar-toggle"
      @click="sidebarOpen = true"
      aria-label="Open sidebar"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay -->
    <div
      class="overlay"
      :class="{ show: sidebarOpen }"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <nav class="sidebar" :class="{ show: sidebarOpen }">
      <div class="sidebar-header">
        <h4>OBerlo</h4>
        <p>Inventory Management System</p>
      </div>

      <ul class="sidebar-menu">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/products">
            <i class="fas fa-car"></i>
            <span>Inventory</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/purchases">
            <i class="fas fa-truck"></i>
            <span>Purchase Orders</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/sales">
            <i class="fas fa-dollar-sign"></i>
            <span>Vehicle Sales</span>
          </router-link>
        </li>

        <li class="nav-item logout-btn">
          <a
            class="nav-link"
            href="#"
            @click.prevent="handleLogout"
          >
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main>
      <!-- About Hero -->
      <section class="about-hero">
        <div class="container page-container">
          <h1>About <span>OBerlo</span></h1>

          <p>
            We are a passionate team dedicated to curating the world's finest
            luxury vehicles for discerning drivers.
          </p>
        </div>
      </section>

      <!-- Our Story -->
      <section class="about-section story-section">
        <div class="container page-container">
          <div class="story-grid">
            <!-- Story text -->
            <div class="story-content">
              <span class="section-label">WHO WE ARE</span>

              <h2>Our <span>Story</span></h2>

              <p>
                Founded in 2018, OBerlo began with a simple vision: to connect
                automotive enthusiasts with extraordinary vehicles. What
                started as a small boutique dealership has grown into a trusted
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
                curated inventory that spans iconic brands and emerging
                electric hypercars. We're not just selling cars — we're
                delivering experiences.
              </p>
            </div>

            <!-- Story image -->
            <div class="story-image">
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1000"
                alt="Luxury vehicle"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="about-section values-section">
        <div class="container page-container">
          <div class="section-heading">
            <span class="section-label">OUR VALUES</span>

            <h2>What We <span>Stand For</span></h2>

            <p>
              Our core values drive every decision we make.
            </p>
          </div>

          <div class="values-grid">
            <div class="about-icon-box">
              <div class="icon-circle">
                <i class="fas fa-gem"></i>
              </div>

              <h5>Quality First</h5>

              <p>
                Every vehicle is meticulously inspected and certified before it
                reaches our showroom.
              </p>
            </div>

            <div class="about-icon-box">
              <div class="icon-circle">
                <i class="fas fa-handshake"></i>
              </div>

              <h5>Trust & Transparency</h5>

              <p>
                We believe in honest communication, fair pricing, and building
                lasting relationships.
              </p>
            </div>

            <div class="about-icon-box">
              <div class="icon-circle">
                <i class="fas fa-heart"></i>
              </div>

              <h5>Passion for Performance</h5>

              <p>
                We live and breathe cars — our enthusiasm drives everything we
                do.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="about-section team-section">
        <div class="container page-container">
          <div class="section-heading">
            <span class="section-label">OUR PEOPLE</span>

            <h2>Meet the <span>Team</span></h2>

            <p>
              The people behind OBerlo who make the magic happen.
            </p>
          </div>

          <div class="team-grid">
            <div class="team-card">
              <img
                src="https://ui-avatars.com/api/?name=James+Mitchell&size=200&background=ffc107&color=000&bold=true"
                alt="James Mitchell"
              />

              <h5>James Mitchell</h5>

              <div class="role">Founder & CEO</div>

              <p>20+ years in luxury automotive</p>
            </div>

            <div class="team-card">
              <img
                src="https://ui-avatars.com/api/?name=Sarah+Chen&size=200&background=ffc107&color=000&bold=true"
                alt="Sarah Chen"
              />

              <h5>Sarah Chen</h5>

              <div class="role">Head of Operations</div>

              <p>Logistics & client experience</p>
            </div>

            <div class="team-card">
              <img
                src="https://ui-avatars.com/api/?name=Marcus+Wright&size=200&background=ffc107&color=000&bold=true"
                alt="Marcus Wright"
              />

              <h5>Marcus Wright</h5>

              <div class="role">Chief Curator</div>

              <p>Vehicle sourcing & authentication</p>
            </div>

            <div class="team-card">
              <img
                src="https://ui-avatars.com/api/?name=Elena+Rodriguez&size=200&background=ffc107&color=000&bold=true"
                alt="Elena Rodriguez"
              />

              <h5>Elena Rodriguez</h5>

              <div class="role">Client Relations</div>

              <p>Concierge & after-sales support</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Hero -->
      <section class="faq-hero">
        <div class="container page-container">
          <span class="section-label faq-label">NEED HELP?</span>

          <h1>
            Frequently Asked <span>Questions</span>
          </h1>

          <p>
            Find answers to the most common inquiries about buying, selling,
            and financing.
          </p>
        </div>
      </section>

      <!-- FAQ -->
      <section class="faq-section">
        <div class="container page-container">
          <div class="faq-container">
            <div class="accordion" id="faqAccordion">

              <!-- Q1 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q1"
                    aria-expanded="true"
                    aria-controls="q1"
                  >
                    <span class="question-number">01</span>
                    <span>Do you offer warranties on your vehicles?</span>
                  </button>
                </h2>

                <div
                  id="q1"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    Yes! Every vehicle sold through OBerlo comes with a
                    comprehensive 12-month / 12,000-mile warranty. Extended
                    warranties are also available for purchase.
                  </div>
                </div>
              </div>

              <!-- Q2 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q2"
                    aria-expanded="false"
                    aria-controls="q2"
                  >
                    <span class="question-number">02</span>
                    <span>Can I trade in my current vehicle?</span>
                  </button>
                </h2>

                <div
                  id="q2"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    Absolutely! We accept trade-ins of all makes and models.
                    Contact our team for an instant estimate, and we'll deduct
                    the value from your new purchase.
                  </div>
                </div>
              </div>

              <!-- Q3 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q3"
                    aria-expanded="false"
                    aria-controls="q3"
                  >
                    <span class="question-number">03</span>
                    <span>What financing options are available?</span>
                  </button>
                </h2>

                <div
                  id="q3"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    We offer flexible financing through our partner lenders
                    with rates starting at 2.9% APR. You can also lease or pay
                    in full. Visit our
                    <router-link to="/financing">
                      Financing page
                    </router-link>
                    to calculate your monthly payments.
                  </div>
                </div>
              </div>

              <!-- Q4 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q4"
                    aria-expanded="false"
                    aria-controls="q4"
                  >
                    <span class="question-number">04</span>
                    <span>Do you ship vehicles internationally?</span>
                  </button>
                </h2>

                <div
                  id="q4"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    Yes, we ship worldwide. We handle all logistics, customs,
                    and insurance. Shipping costs vary by destination—contact
                    our team for a personalized quote.
                  </div>
                </div>
              </div>

              <!-- Q5 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q5"
                    aria-expanded="false"
                    aria-controls="q5"
                  >
                    <span class="question-number">05</span>
                    <span>Can I return a car after purchase?</span>
                  </button>
                </h2>

                <div
                  id="q5"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    We offer a 7-day, 500-mile money-back guarantee. If you're
                    not completely satisfied, you can return the vehicle for a
                    full refund, no questions asked.
                  </div>
                </div>
              </div>

              <!-- Q6 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q6"
                    aria-expanded="false"
                    aria-controls="q6"
                  >
                    <span class="question-number">06</span>
                    <span>How do I book a test drive?</span>
                  </button>
                </h2>

                <div
                  id="q6"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    You can book a test drive directly through our
                    <router-link to="/test-drive">
                      Test Drive page
                    </router-link>.
                    Choose your preferred vehicle, date, and time, and our
                    concierge team will confirm your slot within 24 hours.
                  </div>
                </div>
              </div>

              <!-- Q7 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q7"
                    aria-expanded="false"
                    aria-controls="q7"
                  >
                    <span class="question-number">07</span>
                    <span>Are your vehicles inspected and certified?</span>
                  </button>
                </h2>

                <div
                  id="q7"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    Yes. Every car in our inventory undergoes a rigorous
                    150-point inspection by our master technicians. We provide
                    a full vehicle history report with every purchase.
                  </div>
                </div>
              </div>

              <!-- Q8 -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q8"
                    aria-expanded="false"
                    aria-controls="q8"
                  >
                    <span class="question-number">08</span>
                    <span>What payment methods do you accept?</span>
                  </button>
                </h2>

                <div
                  id="q8"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    We accept wire transfers, certified bank checks, and
                    financing through our lending partners. We also accept
                    credit cards for deposits (up to $5,000).
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default {
  name: "AboutPage",

  data() {
    return {
      sidebarOpen: false,
    };
  },

  methods: {
    async handleLogout() {
      try {
        await axios.post(
          `${API_BASE_URL}/logout`,
          {},
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Logout error:", error);
      }

      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* =========================================
   GLOBAL
========================================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  padding-top: 80px;
  min-height: 100vh;
  background: #ffffff;
}

.page-container {
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  padding-left: 35px;
  padding-right: 35px;
}

.section-label {
  display: inline-block;
  color: #ffc107;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

/* =========================================
   SIDEBAR
========================================= */

.sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  bottom: 0;
  width: 280px;

  background: linear-gradient(
    180deg,
    #1a1a2e 0%,
    #16213e 100%
  );

  transition: 0.3s ease-in-out;
  z-index: 1001;

  padding-top: 80px;

  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.15);
}

.sidebar.show {
  left: 0;
}

.sidebar-header {
  padding: 24px 22px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h4 {
  color: #ffc107;
  margin: 0;
  font-size: 22px;
  font-weight: 800;
}

.sidebar-header p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin: 6px 0 0;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar .nav-item {
  margin: 6px 0;
}

.sidebar .nav-link {
  color: white;
  text-decoration: none;

  display: flex;
  align-items: center;

  padding: 13px 20px;

  transition: all 0.3s;

  font-weight: 500;

  border-radius: 10px;

  margin: 0 12px;
}

.sidebar .nav-link i {
  width: 25px;
  margin-right: 15px;
  font-size: 17px;
}

.sidebar .nav-link:hover {
  background: #ffc107;
  color: #000;
  transform: translateX(5px);
}

.sidebar .nav-link.active {
  background: #ffc107;
  color: #000;
}

.sidebar .logout-btn {
  margin-top: 35px;
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

/* =========================================
   SIDEBAR TOGGLE
========================================= */

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

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.sidebar-toggle:hover {
  background: #ffca2c;
  transform: scale(1.05);
}

.sidebar-toggle i {
  font-size: 20px;
  color: #000;
}

/* =========================================
   OVERLAY
========================================= */

.overlay {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  z-index: 1000;

  display: none;
}

.overlay.show {
  display: block;
}

/* =========================================
   ABOUT HERO
========================================= */

.about-hero {
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 100%
  );

  padding: 85px 0 75px;

  color: white;

  text-align: center;
}

.about-hero h1 {
  font-size: 52px;
  font-weight: 800;

  margin-bottom: 18px;
}

.about-hero h1 span {
  color: #ffc107;
}

.about-hero p {
  color: rgba(255, 255, 255, 0.72);

  font-size: 18px;
  line-height: 1.7;

  max-width: 720px;

  margin: 0 auto;
}

/* =========================================
   ABOUT SECTIONS
========================================= */

.about-section {
  padding: 80px 0;
}

.story-section {
  background: #ffffff;
}

.story-grid {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr);

  gap: 70px;

  align-items: center;
}

.story-content {
  min-width: 0;
}

.about-section h2 {
  font-size: 38px;
  font-weight: 800;

  color: #1a1a2e;

  margin-bottom: 25px;
}

.about-section h2 span {
  color: #ffc107;
}

.story-content p {
  color: #555;

  line-height: 1.85;

  font-size: 16px;

  margin-bottom: 18px;
}

.story-content p:last-child {
  margin-bottom: 0;
}

.story-image {
  width: 100%;
  overflow: hidden;

  border-radius: 24px;

  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.12);
}

.story-image img {
  width: 100%;
  height: 460px;

  display: block;

  object-fit: cover;

  transition: transform 0.5s ease;
}

.story-image:hover img {
  transform: scale(1.04);
}

/* =========================================
   SECTION HEADING
========================================= */

.section-heading {
  text-align: center;

  max-width: 700px;

  margin: 0 auto 45px;
}

.section-heading h2 {
  margin-bottom: 12px;
}

.section-heading p {
  color: #666;

  max-width: 600px;

  margin: 0 auto;

  line-height: 1.7;
}

/* =========================================
   VALUES
========================================= */

.values-section {
  background: #f4f5f7;
}

.values-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 30px;
}

.about-icon-box {
  background: #ffffff;

  border-radius: 20px;

  padding: 38px 28px;

  text-align: center;

  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.06);

  transition: all 0.3s;

  height: 100%;

  border: 1px solid rgba(0, 0, 0, 0.03);
}

.about-icon-box:hover {
  transform: translateY(-7px);

  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.icon-circle {
  width: 75px;
  height: 75px;

  border-radius: 50%;

  background: #fff8df;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 22px;
}

.about-icon-box i {
  font-size: 32px;
  color: #ffc107;
}

.about-icon-box h5 {
  font-weight: 750;

  font-size: 20px;

  color: #1a1a2e;

  margin-bottom: 12px;
}

.about-icon-box p {
  font-size: 14px;

  color: #777;

  line-height: 1.7;

  margin: 0;
}

/* =========================================
   TEAM
========================================= */

.team-section {
  background: #ffffff;
}

.team-grid {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: 25px;
}

.team-card {
  background: #ffffff;

  border-radius: 20px;

  padding: 30px 20px 25px;

  text-align: center;

  box-shadow: 0 5px 22px rgba(0, 0, 0, 0.07);

  transition: all 0.3s;

  border: 1px solid #eeeeee;

  height: 100%;
}

.team-card:hover {
  transform: translateY(-7px);

  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.11);
}

.team-card img {
  width: 120px;
  height: 120px;

  border-radius: 50%;

  object-fit: cover;

  display: block;

  margin: 0 auto 18px;

  border: 4px solid #ffc107;
}

.team-card h5 {
  color: #1a1a2e;

  font-size: 18px;

  font-weight: 750;

  margin: 0 0 7px;
}

.team-card .role {
  font-size: 14px;

  color: #d49f00;

  font-weight: 600;

  margin-bottom: 8px;
}

.team-card p {
  font-size: 14px;

  color: #777;

  line-height: 1.5;

  margin: 0;
}

/* =========================================
   FAQ HERO
========================================= */

.faq-hero {
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 100%
  );

  padding: 75px 0 65px;

  color: white;

  text-align: center;
}

.faq-label {
  color: #ffc107;
}

.faq-hero h1 {
  font-size: 46px;

  font-weight: 800;

  margin-bottom: 16px;
}

.faq-hero h1 span {
  color: #ffc107;
}

.faq-hero p {
  color: rgba(255, 255, 255, 0.72);

  font-size: 18px;

  line-height: 1.7;

  max-width: 720px;

  margin: 0 auto;
}

/* =========================================
   FAQ SECTION
========================================= */

.faq-section {
  background: #f7f8fa;

  padding: 75px 0 90px;
}

.faq-container {
  max-width: 950px;

  margin: 0 auto;
}

.accordion {
  display: flex;

  flex-direction: column;

  gap: 16px;
}

.accordion-item {
  border: none !important;

  background: #ffffff;

  border-radius: 16px !important;

  overflow: hidden;

  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
}

.accordion-button {
  display: flex;

  align-items: center;

  gap: 18px;

  padding: 22px 25px;

  font-weight: 700;

  color: #1a1a2e;

  background: #ffffff;

  border-radius: 16px !important;

  box-shadow: none !important;

  border: none;

  font-size: 16px;

  line-height: 1.4;
}

.accordion-button:not(.collapsed) {
  color: #1a1a2e;

  background: #ffffff;
}

.accordion-button:focus {
  box-shadow: none;
}

.accordion-button::after {
  margin-left: auto;
}

.question-number {
  flex-shrink: 0;

  width: 38px;
  height: 38px;

  border-radius: 50%;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #fff8df;

  color: #d49f00;

  font-size: 12px;

  font-weight: 800;
}

.accordion-body {
  padding: 0 25px 25px 81px;

  color: #4f4f4f;

  background: #ffffff;

  line-height: 1.8;

  font-size: 15px;
}

.accordion-body a {
  color: #c99700;

  text-decoration: none;

  font-weight: 700;
}

.accordion-body a:hover {
  text-decoration: underline;
}

/* =========================================
   TABLET
========================================= */

@media (max-width: 992px) {
  .page-container {
    padding-left: 28px;
    padding-right: 28px;
  }

  .story-grid {
    grid-template-columns: 1fr;

    gap: 40px;
  }

  .story-image img {
    height: 420px;
  }

  .values-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .team-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .about-hero h1 {
    font-size: 46px;
  }

  .faq-hero h1 {
    font-size: 40px;
  }
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 767px) {
  main {
    padding-top: 70px;
  }

  .page-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  .sidebar-toggle {
    top: 70px;
    left: 12px;

    width: 42px;
    height: 42px;
  }

  .about-hero {
    padding: 65px 0 55px;
  }

  .about-hero h1 {
    font-size: 38px;
  }

  .about-hero p {
    font-size: 16px;
  }

  .about-section {
    padding: 60px 0;
  }

  .about-section h2 {
    font-size: 32px;
  }

  .story-grid {
    gap: 32px;
  }

  .story-image img {
    height: 300px;
  }

  .values-grid {
    grid-template-columns: 1fr;

    gap: 20px;
  }

  .team-grid {
    grid-template-columns: 1fr;

    gap: 20px;
  }

  .section-heading {
    margin-bottom: 35px;
  }

  .faq-hero {
    padding: 60px 0 50px;
  }

  .faq-hero h1 {
    font-size: 34px;
  }

  .faq-hero p {
    font-size: 16px;
  }

  .faq-section {
    padding: 55px 0 70px;
  }

  .accordion-button {
    padding: 18px;

    gap: 12px;

    font-size: 15px;
  }

  .question-number {
    width: 34px;
    height: 34px;

    font-size: 11px;
  }

  .accordion-body {
    padding: 0 18px 22px 64px;

    font-size: 14px;
  }
}

/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {
  .page-container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .about-hero h1 {
    font-size: 32px;
  }

  .about-hero p {
    font-size: 15px;
  }

  .about-section h2 {
    font-size: 28px;
  }

  .story-content p {
    font-size: 15px;
  }

  .story-image img {
    height: 250px;
  }

  .about-icon-box {
    padding: 30px 20px;
  }

  .faq-hero h1 {
    font-size: 29px;
  }

  .accordion-button {
    padding: 16px;

    font-size: 14px;
  }

  .question-number {
    width: 30px;
    height: 30px;
  }

  .accordion-body {
    padding: 0 16px 20px 58px;

    font-size: 14px;
  }
}
</style>


<!-- 800 lines -->