const navigators = document.querySelectorAll(".content-selector");
const sections = document.querySelectorAll(".page-content");

// Function to handle switching sections
function showSection(targetId) {
  sections.forEach((section) => section.classList.add("hidden"));
  
  // Fallback to "home" if target ID is missing or invalid
  const targetSection = document.getElementById(targetId) || document.getElementById("home");
  if (targetSection) {
    targetSection.classList.remove("hidden");
  }
}

// Intercept click on navigators
navigators.forEach((navigator) => {
  navigator.addEventListener("click", (e) => {
    // Works whether you use href="#about" or data-target="about"
    const targetId = (navigator.getAttribute("href")?.replace("#", "") || 
                      navigator.getAttribute("data-target"));

    if (targetId) {
      window.location.hash = targetId; // Updates the URL bar
      showSection(targetId);
    }
  });
});

// Handle initial page load and Browser Back/Forward navigation
function handleHashChange() {
  const currentHash = window.location.hash.replace("#", "") || "home";
  showSection(currentHash);
}

window.addEventListener("DOMContentLoaded", handleHashChange);
window.addEventListener("hashchange", handleHashChange);

// --- Mobile Menu Logic ---
const menuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  const mobileLinks = mobileMenu.querySelectorAll(".content-selector");

  // Toggle dropdown on button click
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Auto-close menu when a link is tapped
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "3c64211a-7c1b-4d17-a137-11f9ff4e3bcf");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
