/* =========================================================================
   Volkai HR Documentation — Main JS
   Shared script for index.html (User) & company.html (Company)
   ======================================================================== */

/* ========== Sidebar Toggle ========== */
const toggleBtn = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (toggleBtn && sidebar && overlay) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
}

/* ========== User <-> Company Toggle ========== */
const userBtn = document.getElementById("userBtn");
const companyBtn = document.getElementById("companyBtn");

if (userBtn && companyBtn) {
  const isCompanyPage = window.location.pathname.includes("company.html");

  if (isCompanyPage) {
    companyBtn.classList.add("active");
    companyBtn.setAttribute("aria-pressed", "true");
    userBtn.classList.remove("active");
    userBtn.setAttribute("aria-pressed", "false");
  } else {
    userBtn.classList.add("active");
    userBtn.setAttribute("aria-pressed", "true");
    companyBtn.classList.remove("active");
    companyBtn.setAttribute("aria-pressed", "false");
  }

  userBtn.addEventListener("click", () => {
    if (!userBtn.classList.contains("active")) {
      window.location.href = "index.html";
    }
  });

  companyBtn.addEventListener("click", () => {
    if (!companyBtn.classList.contains("active")) {
      window.location.href = "company.html";
    }
  });
}

/* ========== Smooth Scroll for Sidebar Links ========== */
const sidebarLinks = document.querySelectorAll(".sidebar a");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (window.innerWidth <= 900) {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
});

/* ========== Scrollspy Highlight ========== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = sec.id;
    }
  });
  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

/* ========== Fade-in Animation on Scroll ========== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach((section) => observer.observe(section));

/* ========== Back to Top Button ========== */
const backBtn = document.getElementById("backToTop");
if (backBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.classList.add("show");
    } else {
      backBtn.classList.remove("show");
    }
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ========== Auto-Close Sidebar on Resize ========== */
window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && sidebar && overlay) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
});
