import { gsap } from "gsap"

const transitionYAndRotation = gsap.utils.wrap([50, -50])
const divChars = document.querySelectorAll("h1 .text-wrapper div")

const tl = gsap.timeline()
let counter: number = 0

const changeColor = function () {
  if (counter % 2 === 0) {
    const colors = gsap.utils.wrapYoyo(["#b02746", "#eda454"])

    gsap.to("h1 .text-wrapper *", {
      color: colors,
    })
  } else {
    const colors = gsap.utils.wrapYoyo(["#eda454", "#b02746"])

    gsap.to("h1 .text-wrapper *", {
      color: colors,
    })
  }

  counter++
}

gsap.set(changeColor, {
  delay: 5,
  onRepeat: changeColor,
  repeat: -1,
  repeatDelay: 5,
})

tl.from("h1 .text-wrapper *", {
  y: transitionYAndRotation,
  rotation: transitionYAndRotation,
  duration: 1,
  ease: "power4.in",
  opacity: 0,
  stagger: {
    each: 0.05,
  },
})

let tween: any

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
