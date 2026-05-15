let code = "";
const correctCode = "200225";

const intro = document.getElementById("intro");
const lockScreen = document.getElementById("lockScreen");
const lockBox = document.getElementById("lockBox");
const site = document.getElementById("site");

const codeDisplay = document.getElementById("codeDisplay");
const errorText = document.getElementById("errorText");

document.getElementById("enterBtn").addEventListener("click", () => {
    intro.style.display = "none";
    lockScreen.style.display = "flex";
});

function addNumber(num) {
    if (code.length < 6) {
        code += num;
        updateDisplay();
    }
}

function clearCode() {
    code = code.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    codeDisplay.textContent = code.padEnd(6, "_");
    errorText.textContent = "";
}

function wrongEffect() {
    errorText.textContent = "Code incorrect ❌";
    lockBox.classList.add("shake");

    setTimeout(() => {
        lockBox.classList.remove("shake");
    }, 400);
}

function successEffect() {
    sessionStorage.setItem("unlocked", "true");

    lockScreen.style.display = "none";
    site.style.display = "block";

    setTimeout(() => {
        site.style.opacity = "1";
    }, 50);
}

function checkCode() {
    if (code === correctCode) {
        successEffect();
    } else {
        code = "";
        updateDisplay();
        wrongEffect();
    }
}

/* =========================
   STATS FIX POSITION SAFE
========================= */

const startDate = new Date("2025-02-20");

function updateDaysTogether() {

    const daysEl = document.getElementById("daysTogether");
    const hoursEl = document.getElementById("hoursTogether");
    const yearsEl = document.getElementById("yearsTogether");

    const today = new Date();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    daysEl.textContent = diffDays;
    hoursEl.textContent = diffDays * 24;
    yearsEl.textContent = (diffDays / 365).toFixed(2);
}

updateDaysTogether();

/* SCROLL */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();

        if (rect.top < windowHeight - 100) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
