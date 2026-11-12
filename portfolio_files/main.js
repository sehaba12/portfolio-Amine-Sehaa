const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const menuBtn = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const backToTop = document.getElementById("back-to-top");

function setTheme(theme) {
    html.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    if (themeBtn) {
        themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
    }
}

const saved = localStorage.getItem("theme");
if (saved) {
    setTheme(saved);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
} else {
    setTheme("light");
}

themeBtn?.addEventListener("click", () => {
    setTheme(html.classList.contains("dark") ? "light" : "dark");
});

menuBtn?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        const target = id ? document.querySelector(id) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        mobileNav?.classList.remove("open");
        menuBtn?.setAttribute("aria-expanded", "false");
    });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-desktop a, .mobile-nav a")];

function onScroll() {
    const y = window.scrollY;
    backToTop?.classList.toggle("visible", y > 400);

    let current = sections[0]?.id;
    sections.forEach((section) => {
        if (y >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
