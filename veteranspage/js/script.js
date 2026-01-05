/**
 * Memorial Weekend 2026 - Interactive JavaScript
 * Handles navigation, form validation, and interactive elements
 */

// ===========================
// Navigation Toggle
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
    });
  }

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// ===========================
// Navbar Scroll Effect
// ===========================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  }
});

// ===========================
// Schedule Tabs
// ===========================
const scheduleTabs = document.querySelectorAll(".schedule-tab");
const scheduleDays = document.querySelectorAll(".schedule-day");

scheduleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const day = tab.getAttribute("data-day");

    // Remove active class from all tabs and days
    scheduleTabs.forEach((t) => t.classList.remove("active"));
    scheduleDays.forEach((d) => d.classList.remove("active"));

    // Add active class to clicked tab and corresponding day
    tab.classList.add("active");
    document.getElementById(day).classList.add("active");
  });
});

// ===========================
// Contact Form Validation & Submission
// ===========================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone")?.value || "",
      interest: document.getElementById("interest")?.value || "",
      message: document.getElementById("message").value,
    };

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Success
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = "#28a745";

      // Reset form
      contactForm.reset();

      // Show success message
      showNotification(
        "Thank you for reaching out! We'll get back to you soon.",
        "success"
      );

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.style.background = "";
      }, 3000);
    }, 1500);

    // In production, use something like:
    /*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Success handling
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      showNotification('Oops! Something went wrong. Please try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
    */
  });
}

// ===========================
// Form Input Validation
// ===========================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\d\s\-\(\)]+$/;
  return !phone || re.test(phone);
}

// Real-time validation
const emailInput = document.getElementById("email");
if (emailInput) {
  emailInput.addEventListener("blur", function () {
    if (this.value && !validateEmail(this.value)) {
      this.style.borderColor = "#B22234";
      showFieldError(this, "Please enter a valid email address");
    } else {
      this.style.borderColor = "";
      clearFieldError(this);
    }
  });
}

const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("blur", function () {
    if (!validatePhone(this.value)) {
      this.style.borderColor = "#B22234";
      showFieldError(this, "Please enter a valid phone number");
    } else {
      this.style.borderColor = "";
      clearFieldError(this);
    }
  });
}

// ===========================
// Helper Functions
// ===========================
function showFieldError(field, message) {
  clearFieldError(field);
  const error = document.createElement("span");
  error.className = "field-error";
  error.style.color = "#B22234";
  error.style.fontSize = "0.85rem";
  error.style.marginTop = "0.25rem";
  error.style.display = "block";
  error.textContent = message;
  field.parentElement.appendChild(error);
}

function clearFieldError(field) {
  const error = field.parentElement.querySelector(".field-error");
  if (error) {
    error.remove();
  }
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#28a745" : "#B22234"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
document
  .querySelectorAll(
    ".highlight-item, .timeline-item, .value-item, .gallery-item, .donation-tier"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ===========================
// Sticky Donate Button Show/Hide
// ===========================
const stickyDonate = document.querySelector(".sticky-donate");
const donateSection = document.querySelector("#donate");

if (stickyDonate && donateSection) {
  window.addEventListener("scroll", () => {
    const donatePosition = donateSection.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;

    // Show button when scrolled past hero, hide when at donate section
    if (window.scrollY > 800 && scrollPosition < donatePosition) {
      stickyDonate.style.display = "block";
      stickyDonate.style.animation = "fadeIn 0.3s ease";
    } else {
      stickyDonate.style.display = "none";
    }
  });
}

// ===========================
// Gallery Lightbox (Optional Enhancement)
// ===========================
const galleryItems = document.querySelectorAll(".gallery-item img");
galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Create lightbox modal
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
    `;

    const img = document.createElement("img");
    img.src = this.src;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.objectFit = "contain";

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";

    lightbox.addEventListener("click", () => {
      lightbox.remove();
      document.body.style.overflow = "";
    });
  });
});

// ===========================
// Donation Amount Selection
// ===========================
const monthlyOptions = document.querySelectorAll(".monthly-option");
monthlyOptions.forEach((option) => {
  option.addEventListener("click", function () {
    const radio = this.querySelector('input[type="radio"]');
    radio.checked = true;
  });
});

// ===========================
// Add CSS Animations
// ===========================
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// ===========================
// Print Functionality
// ===========================
function printSchedule() {
  window.print();
}

// ===========================
// Share Functionality
// ===========================
function shareEvent(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(
    "Memorial Weekend 2026 - Honoring Our Fallen Heroes"
  );
  const description = encodeURIComponent(
    "Join us May 23-25, 2026 at Woodward Park, Manteca, CA"
  );

  let shareUrl;
  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case "email":
      shareUrl = `mailto:?subject=${title}&body=${description}%0A%0A${url}`;
      break;
  }

  if (shareUrl && platform !== "email") {
    window.open(shareUrl, "_blank", "width=600,height=400");
  } else if (shareUrl) {
    window.location.href = shareUrl;
  }
}

// ===========================
// Countdown Timer (Optional)
// ===========================
function updateCountdown() {
  const eventDate = new Date("2026-05-23T17:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
      countdownEl.innerHTML = `
        <div class="countdown-item">
          <span class="countdown-number">${days}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${hours}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${minutes}</span>
          <span class="countdown-label">Minutes</span>
        </div>
      `;
    }
  }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown();

// ===========================
// Accessibility Enhancements
// ===========================
// Trap focus in mobile menu when open
document.addEventListener("keydown", function (e) {
  const navMenu = document.querySelector(".nav-menu");
  if (!navMenu.classList.contains("active")) return;

  if (e.key === "Escape") {
    navMenu.classList.remove("active");
    document.querySelector(".nav-toggle").focus();
  }

  // Trap focus within menu
  const focusableElements = navMenu.querySelectorAll("a, button");
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});

// ===========================
// Console Welcome Message
// ===========================
console.log(
  "%c Memorial Weekend 2026 ",
  "background: #002868; color: #FFFFFF; font-size: 24px; font-weight: bold; padding: 10px;"
);
console.log(
  "%c Honoring Our Fallen Heroes ",
  "background: #B22234; color: #FFFFFF; font-size: 16px; padding: 5px;"
);
console.log("Website developed with respect and honor for those who served.");

// ===========================
// Page Load Performance Logging
// ===========================
window.addEventListener("load", function () {
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${(pageLoadTime / 1000).toFixed(2)} seconds`);
  }
});
