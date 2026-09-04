const navigators = document.querySelectorAll(".content-selector");
const sections = document.querySelectorAll(".page-content");

navigators.forEach((navigator) => {
  navigator.addEventListener("click", () => {
    const targetId = navigator.getAttribute("data-target");

    sections.forEach((section) => {section.classList.add("hidden");});
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.remove("hidden");
    }
  });
});

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

const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('.content-selector');

  // Toggle dropdown on button click
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Auto-close menu when a link is tapped
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });