function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute("href");
  const targetPosition = document.querySelector(targetId).offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}


function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute("href");
  const targetPosition = document.querySelector(targetId).offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}

(function () {
  const EMAIL = "jefferyoseisomuah77@gmail.com";
 
  function initMailto() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const emailIcon = document.querySelector(".email-icon");
 
    if (!emailLinks.length) return;
 
    emailLinks.forEach(function (link) {
      // Ensure href is always correct
      link.href = "mailto:" + EMAIL;
 
      link.addEventListener("click", function (e) {
        handleMailtoClick(e, link);
      });
    });
 
    // Optional: clicking the email icon also triggers the first mailto link
    if (emailIcon && emailLinks[0]) {
      emailIcon.style.cursor = "pointer";
      emailIcon.addEventListener("click", function () {
        emailLinks[0].click();
      });
    }
  }
 
  function handleMailtoClick(e, link) {
    // Visual feedback
    showFeedback(link, "Opening mail client...");
 
    // Fallback: if mail client doesn't open within 1.5s, show copy option
    const timeout = setTimeout(function () {
      showCopyFallback(link);
    }, 1500);
 
    // Clear timeout if page loses focus (mail client opened)
    window.addEventListener(
      "blur",
      function () {
        clearTimeout(timeout);
        showFeedback(link, EMAIL); // Reset label
      },
      { once: true }
    );
  }
 
  function showFeedback(link, message) {
    const original = link.dataset.originalText || link.textContent;
    link.dataset.originalText = original;
    link.textContent = message;
 
    // Reset after 2 seconds
    setTimeout(function () {
      link.textContent = original;
    }, 2000);
  }
 
  function showCopyFallback(link) {
    if (!navigator.clipboard) return;
 
    link.textContent = "Click to copy email";
    link.style.cursor = "pointer";
 
    link.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        navigator.clipboard
          .writeText(EMAIL)
          .then(function () {
            showFeedback(link, "Email copied!");
          })
          .catch(function () {
            showFeedback(link, EMAIL);
          });
      },
      { once: true }
    );
  }
 
  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMailto);
  } else {
    initMailto();
  }
})();