// Memorial Weekend - JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      const expanded =
        navToggle.getAttribute("aria-expanded") === "true" || false;
      navToggle.setAttribute("aria-expanded", !expanded);
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ============================================
  // SCHEDULE TABS
  // ============================================
  const scheduleTabs = document.querySelectorAll(".schedule-tab");
  const scheduleDays = document.querySelectorAll(".schedule-day");

  scheduleTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetDay = this.getAttribute("data-day");

      // Remove active class from all tabs and days
      scheduleTabs.forEach((t) => t.classList.remove("active"));
      scheduleDays.forEach((d) => d.classList.remove("active"));

      // Add active class to clicked tab and corresponding day
      this.classList.add("active");
      document.getElementById(targetDay).classList.add("active");
    });
  });

  // ============================================
  // SMOOTH SCROLLING
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // FORM VALIDATION
  // ============================================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Simple validation
      if (name === "" || email === "" || message === "") {
        alert("Please fill in all required fields.");
        return;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // If validation passes
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();

      // Here you would typically send the form data to your server
      // Example: fetch('/submit-form', { method: 'POST', body: formData })
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Add shadow to navbar when scrolled
    if (currentScroll > 50) {
      navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // GALLERY LIGHTBOX (SIMPLE VERSION)
  // ============================================
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (img) {
        // Simple alert - you can replace this with a proper lightbox library
        window.open(img.src, "_blank");
      }
    });
  });

  // ============================================
  // SCROLL ANIMATIONS (Fade in on scroll)
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // ============================================
  // BACK TO TOP BUTTON (OPTIONAL)
  // ============================================
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--patriotic-red);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  console.log("Memorial Weekend website loaded successfully!");
});
