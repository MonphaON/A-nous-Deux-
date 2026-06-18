let code = "";
const correctCode = "200225";

const intro = document.getElementById("intro");
const lockScreen = document.getElementById("lockScreen");
const lockBox = document.getElementById("lockBox");
const site = document.getElementById("site");

const codeDisplay = document.getElementById("codeDisplay");
const errorText = document.getElementById("errorText");
const lockIcon = document.getElementById("lockIcon");

/* =========================
   AUTO UNLOCK (SESSION)
========================= */
if (sessionStorage.getItem("unlocked") === "true") {
    lockScreen.style.display = "none";
    intro.style.display = "none";
    site.style.display = "block";
    site.style.opacity = "1";
}

/* =========================
   INTRO BUTTON
========================= */
document.getElementById("enterBtn").addEventListener("click", () => {
    intro.style.display = "none";
    lockScreen.style.display = "flex";
});

/* =========================
   KEYPAD
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

/* =========================
   WRONG EFFECT
========================= */
function wrongEffect() {
    errorText.textContent = "Code incorrect ❌";

    lockBox.classList.remove("shake");
    void lockBox.offsetWidth;
    lockBox.classList.add("shake");
}

/* =========================
   SUCCESS EFFECT + CADENAS
========================= */
function successEffect() {

    sessionStorage.setItem("unlocked", "true");

    // 🔓 cadenas animation
    if (lockIcon) {
        lockIcon.textContent = "🔓";
        lockIcon.classList.add("open");
    }

    lockBox.classList.add("zoom-out");

    setTimeout(() => {

        lockScreen.style.opacity = "0";
        lockScreen.style.transition = "0.8s ease";

        setTimeout(() => {
            lockScreen.style.display = "none";

            site.style.display = "block";

            setTimeout(() => {
                site.style.opacity = "1";
            }, 100);

        }, 800);

    }, 400);
}

/* =========================
   CHECK CODE
========================= */
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
   STATS
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

/* =========================
   SCROLL REVEAL
========================= */
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

/* =========================
   TIMELINE POPUP (FIX IMPORTANT)
========================= */
function openTimeline(title, text){
    const popup = document.getElementById("timelinePopup");

    document.getElementById("popupTitle").textContent = title;
    document.getElementById("popupText").textContent = text;

    popup.style.display = "flex";
}

function closeTimeline(){
    document.getElementById("timelinePopup").style.display = "none";
}

/* fermer popup en cliquant dehors */
document.getElementById("timelinePopup").addEventListener("click", function(e){
    if (e.target === this) {
        closeTimeline();
    }
});
