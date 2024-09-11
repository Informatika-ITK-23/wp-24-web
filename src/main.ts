import { gsap } from "gsap"
import { randomNum } from "./utils/randomNum.ts"
// import { countdown } from "./utils/date.ts"

const rootStyle = getComputedStyle(document.documentElement)
const colors = {
  accentRed: rootStyle.getPropertyValue("--color-accent-red"),
  accentYellow: rootStyle.getPropertyValue("--color-accent-yellow"),
}

// === WIP section - Word color cycle ===
let counter: number = 0

const changeColor = function () {
  const cycledColors =
    counter % 2
      ? [colors.accentYellow, colors.accentRed]
      : [colors.accentRed, colors.accentYellow]

  gsap.to(".wip__word span", {
    color: gsap.utils.wrapYoyo(cycledColors),
  })

  counter++
}

gsap.set(changeColor, {
  delay: 2,
  onRepeat: changeColor,
  repeat: -1,
  repeatDelay: 2,
})

// === WIP section - Intro effects ===
const transitionYAndRotation = gsap.utils.wrap([50, -50])

const tl = gsap.timeline()
tl.from(".wip__word span", {
  y: transitionYAndRotation,
  rotation: transitionYAndRotation,
  duration: 1,
  ease: "power4.in",
  opacity: 0,
  stagger: {
    each: 0.05,
  },
})

// === WIP section - Hover effects ===
const divChars = document.querySelectorAll(".wip__word span")
let tween: gsap.core.Tween

divChars.forEach((el, i) => {
  el.addEventListener("mouseenter", () => {
    tween = gsap.to(el, {
      y: i % 2 === 0 ? 5 : -5,
      opacity: 0.85,
      scale: 1.075,
      duration: 0.2,
      ease: "elastic.out",
    })
  })

  el.addEventListener("mouseleave", () => {
    gsap.killTweensOf(tween)

    gsap.to(el, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "elastic.out",
    })
  })
})

// === Countdown section - Cloud9 effects ===
document.addEventListener("DOMContentLoaded", () => randomNum(10, 21, 29)) // just delete this function if too hard to implement ~ Nico

const cloud9TopTl = gsap.timeline({ repeat: -1, yoyo: true }),
  cloudNikaBotTl = gsap.timeline({ repeat: -1, yoyo: true })

cloud9TopTl
  .to(".cloud-img__upper", {
    y: -15,
    x: 15,
    duration: 2.25,
    ease: "linear",
  })
  .to(".cloud-img__upper", {
    y: 5,
    x: -10,
    duration: 2,
    ease: "linear",
  })

cloudNikaBotTl
  .to(".cloud-img__bottom", {
    y: 15,
    x: -15,
    duration: 2.25,
    ease: "linear",
  })
  .to(".cloud-img__bottom", {
    y: -5,
    x: 10,
    duration: 2,
    ease: "linear",
  })

// setInterval(() => {
//   const a = document.getElementById("a")
//   const date = new Date()
//   date.setDate(15)
//   date.setHours(8, 0, 0, 0)
//
//   const timeLeft= countdown(date)
//
//   const hours = timeLeft.hours.toString().padStart(2, "0")
//   const minutes = timeLeft.minutes.toString().padStart(2, "0")
//   const seconds = timeLeft.seconds.toString().padStart(2, "0")
//
//   a!.innerHTML = `${hours}:${minutes}:${seconds}`
// }, 1000)
