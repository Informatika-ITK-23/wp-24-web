import confetti from "canvas-confetti";
import { gsap } from "gsap";
import { randomNum } from "./utils/randomNum.ts";
import { countdown } from "./utils/date.ts";

const rootStyle = getComputedStyle(document.documentElement);
const colors = {
  accentRed: rootStyle.getPropertyValue("--color-accent-red"),
  accentYellow: rootStyle.getPropertyValue("--color-accent-yellow"),
};

const eventStartDate = new Date("September 15, 2024 08:30:00 UTC+8:00");
const eventOpeningDate = new Date("September 15, 2024 09:55:00 UTC+8:00");

// === WIP section - Word color cycle ===
let counter: number = 0;

const changeColor = function () {
  const cycledColors =
    counter % 2
      ? [colors.accentYellow, colors.accentRed]
      : [colors.accentRed, colors.accentYellow];

  gsap.to(".wip__word span", {
    color: gsap.utils.wrapYoyo(cycledColors),
  });

  counter++;
};

gsap.set(changeColor, {
  delay: 2,
  onRepeat: changeColor,
  repeat: -1,
  repeatDelay: 2,
});

// === WIP section - Intro effects ===
const transitionYAndRotation = gsap.utils.wrap([50, -50]);

const tl = gsap.timeline();
tl.from(".wip__word span", {
  y: transitionYAndRotation,
  rotation: transitionYAndRotation,
  duration: 1,
  ease: "power4.in",
  opacity: 0,
  stagger: {
    each: 0.05,
  },
});

// === WIP section - Hover effects ===
const divChars = document.querySelectorAll(".wip__word span");
let tween: gsap.core.Tween;

divChars.forEach((el, i) => {
  el.addEventListener("mouseenter", () => {
    tween = gsap.to(el, {
      y: i % 2 === 0 ? 5 : -5,
      opacity: 0.85,
      scale: 1.075,
      duration: 0.2,
      ease: "elastic.out",
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.killTweensOf(tween);

    gsap.to(el, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "elastic.out",
    });
  });
});

// === Countdown section - Update countdown ===
const countdownEl = {
  hours: document.getElementById("countdown-hours")!,
  minutes: document.getElementById("countdown-minutes")!,
  seconds: document.getElementById("countdown-seconds")!,
};

const updateCountdown = (date: Date, onFinishCallback: (() => void) | null = null) => {
  const interval = setInterval(() => {
    try {
      const timeLeft = countdown(date);

      const hours = timeLeft.hours.toString().padStart(2, "0");
      const minutes = timeLeft.minutes.toString().padStart(2, "0");
      const seconds = timeLeft.seconds.toString().padStart(2, "0");

      countdownEl.hours.innerHTML = hours;
      countdownEl.minutes.innerHTML = minutes;
      countdownEl.seconds.innerHTML = seconds;
    }
    catch (e) {
      clearInterval(interval)

      if (onFinishCallback) {
        onFinishCallback()
      }

      return
    }
  }, 1000);
};


const onCountdownEnd = () => {
  const confettiColors = [colors.accentYellow, colors.accentRed];

  const duration: number = 10;
  const animationEnd = Date.now() + duration * 1000

  const confettiEffects = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.75 },
      colors: confettiColors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.75 },
      colors: confettiColors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(confettiEffects);
    }
  }

  confettiEffects()
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const timeLeft = countdown(eventStartDate);

    randomNum(
      timeLeft.hours,
      timeLeft.minutes,
      timeLeft.seconds,
      () => updateCountdown(eventStartDate, () => updateCountdown(eventOpeningDate)),
    );
  }
  catch (e) {
    const timeLeft = countdown(eventOpeningDate);

    randomNum(
      timeLeft.hours,
      timeLeft.minutes,
      timeLeft.seconds,
      () => updateCountdown(eventOpeningDate, onCountdownEnd),
    );
  }
});

// === Countdown section - Cloud9 effects ===
const cloud9TopTl = gsap.timeline({ repeat: -1, yoyo: true }),
  cloudNikaBotTl = gsap.timeline({ repeat: -1, yoyo: true });

cloud9TopTl
  .to(".cloud-img__top", {
    y: -5,
    duration: 2.25,
    ease: "linear",
  })
  .to(".cloud-img__top", {
    y: 5,
    duration: 2,
    ease: "linear",
  });

cloudNikaBotTl
  .to(".cloud-img__bottom", {
    y: 5,
    duration: 2.25,
    ease: "linear",
  })
  .to(".cloud-img__bottom", {
    y: -5,
    duration: 2,
    ease: "linear",
  });

// === About section - animate callout ===
const callOutTl = gsap.timeline();

callOutTl
  .from(".about-callout", {
    opacity: 0,
    scale: 0,
    duration: 0.75,
    ease: "power4.in",
    delay: 1.5,
  })
  .to(".about-callout__bg", {
    duration: 0.25,
    rotate: "+=" + gsap.utils.random(-3, 3, true)(),
    repeat: -1,
    yoyo: true,
    ease: "rough",
  })
  .to(".about-callout__exclamation", {
    duration: 0.2,
    x: "+=" + gsap.utils.random(-5, 5, true)(),
    y: "+=" + gsap.utils.random(-5, 5, true)(),
    repeat: -1,
    yoyo: true,
    ease: "rough",
  })
  .to(".about-callout__title__sub", {
    duration: 0.5,
    rotate: 5,
    repeat: -1,
    yoyo: true,
    ease: "rough",
  })
  .to(".about-callout__title__main", {
    duration: 0.75,
    rotate: -5,
    repeat: -1,
    yoyo: true,
    ease: "rough",
  });

// === Projects Section ===
const ctaProject = document.querySelectorAll(".project__cta");
const ctaCloseDesc = document.querySelectorAll(".project__yapping-close");
const descriptionProject = document.querySelectorAll(".project__yapping");

ctaProject?.forEach((cta) =>
  cta.addEventListener("click", function (e: any) {
    const clicked = e.target.closest(".project");

    if (!clicked) return;

    // Remove active classes
    descriptionProject.forEach((desc) =>
      desc.classList.remove("project__yapping-active")
    );

    console.log(e.target.closest(".project").dataset.yapping);

    // Activate content area
    document
      ?.querySelector(
        `.project__yapping-${
          clicked.querySelector(".project__yapping").dataset.yapping
        }`
      )
      ?.classList.add("project__yapping-active");
  })
);

ctaCloseDesc?.forEach((ctaClose) =>
  ctaClose.addEventListener("click", function (e: any) {
    const clicked = e.target.closest(".project");

    if (!clicked) return;

    console.log(e.target.closest(".project").dataset.yapping);

    // Deactivate content area
    document
      ?.querySelector(
        `.project__yapping-${
          clicked.querySelector(".project__yapping").dataset.yapping
        }`
      )
      ?.classList.remove("project__yapping-active");
  })
);

const visitExpoTitle = gsap.timeline({ repeat: -1, yoyo: true });
visitExpoTitle
  .to(".visit-expo", {
    rotate: 2,
    duration: 1.5,
    ease: "linear",
  })
  .to(".visit-expo", {
    rotate: -2,
    duration: 2,
    ease: "linear",
  });
