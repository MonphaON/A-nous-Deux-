let code = "";
const correctCode = "200225";

const intro = document.getElementById("intro");
const lockScreen = document.getElementById("lockScreen");
const lockBox = document.getElementById("lockBox");
const site = document.getElementById("site");

const codeDisplay = document.getElementById("codeDisplay");
const errorText = document.getElementById("errorText");

/* =========================
   🔓 VERROUILLAGE SITE
========================= */

if (sessionStorage.getItem("unlocked") === "true") {

    intro.style.display = "none";
    lockScreen.style.display = "none";

    site.style.display = "block";

    setTimeout(() => {
        site.style.opacity = "1";
    }, 50);
}

/* =========================
   🌸 BOUTON ENTRER
========================= */

document.getElementById("enterBtn").addEventListener("click", () => {

    intro.style.display = "none";
    lockScreen.style.display = "flex";

});

/* =========================
   🔢 CODE
========================= */

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

    errorText.textContent = "Mot de passe incorrect ❌";

    lockBox.classList.add("shake");
    lockScreen.classList.add("flash-red");

    setTimeout(() => {
        lockBox.classList.remove("shake");
        lockScreen.classList.remove("flash-red");
    }, 400);
}

function successEffect() {

    sessionStorage.setItem("unlocked", "true");

    lockBox.classList.add("zoom-out");
    lockScreen.classList.add("flash-white");

    setTimeout(() => {

        lockScreen.style.display = "none";
        site.style.display = "block";

        setTimeout(() => {
            site.style.opacity = "1";
        }, 50);

    }, 500);
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
   🌟 SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach(el => {

        const rect = el.getBoundingClientRect();

        const isVisible =
            rect.top < windowHeight - 100 &&
            rect.bottom > 100;

        if (isVisible) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }

    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   💖 STATS (VERSION SAFE + FIXÉE)
========================= */

const startDate = new Date("2025-02-20");

function updateDaysTogether() {

    const daysEl = document.getElementById("daysTogether");
    const daysBox = document.getElementById("daysBox");

    if (!daysEl || !daysBox) return;

    const today = new Date();

    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    const hours = diffDays * 24;
    const years = (diffDays / 365).toFixed(2);

    // jour principal
    daysEl.textContent = diffDays;

    // éviter duplication
    if (document.querySelector(".clone-top")) return;

    // clones
    const top = document.createElement("div");
    top.className = "stat-box clone-stat clone-top";
    top.innerHTML = `<h3>${hours}</h3><p>heures ensemble ⏳</p>`;

    const bottom = document.createElement("div");
    bottom.className = "stat-box clone-stat clone-bottom";
    bottom.innerHTML = `<h3>${years}</h3><p>années ensemble 💍</p>`;

    daysBox.appendChild(top);
    daysBox.appendChild(bottom);
}

updateDaysTogether();