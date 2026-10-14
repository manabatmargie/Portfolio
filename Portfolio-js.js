/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("show");

  const icon = menuIcon.querySelector("i");

  if (navbar.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

/* Close menu when clicking a navigation link */

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");

    const icon = menuIcon.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

/* Close menu when clicking outside */
document.addEventListener("click", (e) => {
  if (
    navbar.classList.contains("show") &&
    !navbar.contains(e.target) &&
    !menuIcon.contains(e.target)
  ) {
    navbar.classList.remove("show");
    const icon = menuIcon.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }
});

/* Reset mobile menu on screen resize */
window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && navbar.classList.contains("show")) {
    navbar.classList.remove("show");
    const icon = menuIcon.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }
});

/* =========================================
   TYPING EFFECT
========================================= */

const typingText = document.querySelector(".typing-text");

const words = [
  "Web Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Creative Writer",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;

      wordIndex++;

      if (wordIndex === words.length) {
        wordIndex = 0;
      }
    }
  }

  const speed = isDeleting ? 60 : 100;

  setTimeout(typeEffect, speed);
}

typeEffect();

/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const subject = document.getElementById("subject")?.value || "";
    const message = document.getElementById("message")?.value || "";

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      subject.trim() === "" ||
      message.trim() === ""
    ) {
      if (formMessage) {
        formMessage.textContent = "Please fill in all fields.";
      }
      return;
    }

    if (formMessage) {
      formMessage.textContent =
        "Thank you! Your message has been prepared successfully.";
    }

    contactForm.reset();
  });
}

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  ".section-title, .about-container, .project-card, .skill-card, .skills-intro",
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  element.classList.add("reveal");

  revealObserver.observe(element);
});

/* =========================================
   ADD REVEAL CSS THROUGH JAVASCRIPT
========================================= */

const revealStyle = document.createElement("style");

revealStyle.textContent = `

.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.show {
    opacity: 1;
    transform: translateY(0);
}

`;

document.head.appendChild(revealStyle);

/* =========================================
   DARK / LIGHT THEME TOGGLE
========================================= */

const themeToggleBtn = document.getElementById("theme-toggle");

function getInitialTheme() {
  const savedTheme = localStorage.getItem("portfolio_theme");
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function updateThemeUI(theme) {
  const isDark = theme === "dark";

  if (isDark) {
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
    document.body.classList.remove("dark-mode");
  }

  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector("i");
    if (icon) {
      if (isDark) {
        icon.className = "fa-solid fa-sun";
      } else {
        icon.className = "fa-solid fa-moon";
      }
    }
    themeToggleBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
    themeToggleBtn.setAttribute(
      "title",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  }
}

// Initialize theme on script run
const initialTheme = getInitialTheme();
updateThemeUI(initialTheme);

// Handle toggle button click with smooth transition
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.add("theme-transitioning");

    const currentIsDark = document.body.classList.contains("dark-mode");
    const newTheme = currentIsDark ? "light" : "dark";

    updateThemeUI(newTheme);
    localStorage.setItem("portfolio_theme", newTheme);

    setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 360);
  });
}

// Listen for system color scheme changes (if user hasn't set explicit preference)
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("portfolio_theme")) {
      updateThemeUI(e.matches ? "dark" : "light");
    }
  });

/* =========================================
   SKILLS & PROJECTS CARD CLICK / HOVER SELECTION
========================================= */

const skillCards = document.querySelectorAll(".skill-card");
const projectCards = document.querySelectorAll(".project-card");

function setupCardSelection(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Huwag harangan ang navigation kapag clinick ang direct link tulad ng "View Project"
      if (e.target.closest("a, button")) {
        return;
      }

      const isAlreadyActive = card.classList.contains("active");

      // Alisin ang active state sa ibang cards sa parehong group
      cards.forEach((c) => c.classList.remove("active"));

      // Kung hindi pa active, i-activate (hover effect); kung active na, i-toggle off
      if (!isAlreadyActive) {
        card.classList.add("active");
      }
    });
  });
}

setupCardSelection(skillCards);
setupCardSelection(projectCards);

// Alisin ang active state kapag nag-click sa labas ng cards
document.addEventListener("click", (e) => {
  if (!e.target.closest(".skill-card") && !e.target.closest(".project-card")) {
    skillCards.forEach((c) => c.classList.remove("active"));
    projectCards.forEach((c) => c.classList.remove("active"));
  }
});
