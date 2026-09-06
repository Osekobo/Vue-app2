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
          <a class="nav-link" href="#" @click.prevent="handleLogout">
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
            We are a Nairobi-based team helping Kenyan drivers find quality
            vehicles with transparent pricing and dependable support.
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
                Founded in 2018, OBerlo began in Nairobi with a simple vision:
                to make buying a quality vehicle in Kenya straightforward,
                trusted and enjoyable.
              </p>

              <p>
                We hand-select every vehicle in our collection, ensuring each
                one meets our rigorous standards for quality, performance, and
                provenance. Our team of experts provides transparent,
                white-glove service from inquiry to delivery.
              </p>

              <p>
                Today, OBerlo serves drivers across Nairobi and Kenya with a
                curated inventory, flexible financing and support from viewing
                through delivery. We're not just selling cars — we're helping
                people move forward.
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

            <p>Our core values drive every decision we make.</p>
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

            <p>The people behind OBerlo who make the magic happen.</p>
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

          <h1>Frequently Asked <span>Questions</span></h1>

          <p>
            Find answers to the most common inquiries about buying, selling, and
            financing.
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
                    We offer flexible financing through our partner lenders with
                    rates starting at 2.9% APR. You can also lease or pay in
                    full. Visit our
                    <router-link to="/financing"> Financing page </router-link>
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
                    <span>Do you deliver vehicles across Kenya?</span>
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
                    <router-link to="/test-drive"> Test Drive page </router-link
                    >. Choose your preferred vehicle, date, and time, and our
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
                    150-point inspection by our master technicians. We provide a
                    full vehicle history report with every purchase.
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
                    M-Pesa, bank transfer and cards for deposits.
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
          },
        );
      } catch (error) {
        console.error("Logout error:", error);
      }

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped src="../styles/pages/AboutPage.css"></style>

<!-- 800 lines -->
