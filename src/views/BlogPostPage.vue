<template>
  <main class="blog-post-page">
    <article v-if="post" class="blog-post">
      <router-link to="/blog" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to blog
      </router-link>

      <div class="post-category">{{ post.category }}</div>
      <h1>{{ post.title }}</h1>
      <p class="post-date">{{ post.date }}</p>

      <img class="post-image" :src="post.image" :alt="post.imageAlt" />

      <div class="post-copy">
        <p>{{ post.intro }}</p>
        <h2>{{ post.heading }}</h2>
        <p v-for="paragraph in post.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>

      <router-link to="/shop" class="post-action">
        Browse vehicles in Nairobi
        <i class="fas fa-arrow-right"></i>
      </router-link>
    </article>

    <section v-else class="post-not-found">
      <h1>Article not found</h1>
      <p>The article you requested is no longer available.</p>
      <router-link to="/blog" class="post-action"
        >Return to the blog</router-link
      >
    </section>
  </main>
</template>

<script>
const posts = {
  "top-5-supercars-2026": {
    category: "Supercars",
    date: "May 15, 2026",
    title: "Top 5 Supercars of 2026",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1000",
    imageAlt: "A sports car on the road",
    intro:
      "The latest supercars combine serious performance with better technology and more usable road manners.",
    heading: "Performance that still works on the road",
    paragraphs: [
      "For Kenyan buyers, the right performance car needs more than impressive figures. Ground clearance, service support and parts availability matter just as much as acceleration.",
      "Our shortlist focuses on cars that bring the excitement of a supercar while remaining practical enough for planned drives around Nairobi and beyond.",
    ],
  },
  "electric-vs-petrol": {
    category: "Electric",
    date: "May 8, 2026",
    title: "Electric vs. Petrol: The Great Debate",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1000",
    imageAlt: "A modern vehicle",
    intro:
      "Choosing between an electric and petrol vehicle comes down to how and where you drive.",
    heading: "Start with your daily routine",
    paragraphs: [
      "Electric vehicles are quiet, quick and inexpensive to run when home or workplace charging is available. Petrol vehicles still offer simpler long-distance planning and a familiar refuelling network.",
      "We help customers compare real running costs, charging access and after-sales support before choosing a vehicle.",
    ],
  },
  "maintain-your-lamborghini": {
    category: "Maintenance",
    date: "April 28, 2026",
    title: "How to Maintain Your Lamborghini",
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1000",
    imageAlt: "A luxury sports car",
    intro:
      "A performance car rewards careful maintenance. Small checks prevent expensive surprises later.",
    heading: "Keep a consistent service record",
    paragraphs: [
      "Use the recommended fluids, inspect tyres regularly and allow the engine and brakes to reach operating temperature before driving hard.",
      "Keep every service invoice and inspection report. A clear record protects the vehicle's value and makes future servicing much easier.",
    ],
  },
  "porsche-911-turbo-s-review": {
    category: "Reviews",
    date: "April 15, 2026",
    title: "Porsche 911 Turbo S: A Legend Evolved",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000",
    imageAlt: "A Porsche sports car",
    intro:
      "The 911 Turbo S remains one of the easiest fast cars to live with, balancing speed, comfort and confidence.",
    heading: "Fast without being difficult",
    paragraphs: [
      "Its all-wheel-drive traction and composed ride make it suitable for everyday use, while the power remains available whenever the road opens up.",
      "For Nairobi drivers looking for a special weekend car that can still handle regular use, it is a particularly strong choice.",
    ],
  },
  "mercedes-amg-gt-63-s-review": {
    category: "Reviews",
    date: "April 2, 2026",
    title: "Mercedes-AMG GT 63 S Review",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1000",
    imageAlt: "A Mercedes performance car",
    intro:
      "The AMG GT 63 S brings sports-car pace to a cabin that works for passengers and daily errands.",
    heading: "A practical performance car",
    paragraphs: [
      "The four-door layout gives it useful space without losing the low, focused driving position that makes the car feel special.",
      "It suits buyers who want one vehicle for weekday travel, family use and an engaging drive on the weekend.",
    ],
  },
  "bentley-continental-gt": {
    category: "Luxury",
    date: "March 20, 2026",
    title: "Bentley Continental GT: The Grand Tourer",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1000",
    imageAlt: "A luxury grand tourer",
    intro:
      "The Continental GT is built for long journeys, combining a quiet cabin with strong performance.",
    heading: "Comfort comes first",
    paragraphs: [
      "Its appeal is the way it covers distance without tiring the driver. Materials, seating and cabin refinement all support the grand-touring brief.",
      "For customers travelling between Nairobi and the coast, it offers a relaxed alternative to a more focused sports car.",
    ],
  },
};

export default {
  name: "BlogPostPage",

  computed: {
    post() {
      return posts[this.$route.params.slug];
    },
  },
};
</script>

<style scoped src="../styles/pages/BlogPostPage.css"></style>
