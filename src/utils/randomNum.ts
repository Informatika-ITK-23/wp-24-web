// implement random number before show the countdown

export function randomNum(
  dataHours: any,
  dataMinutes: any,
  dataSeconds: any,
  onAnimationFinish: (() => void) | null = null,
): void {
  const string = "9876543210"
  const allCounters = document.querySelectorAll<HTMLElement>(".countdown-time .random")

  allCounters.forEach((el: HTMLElement) => {
    let duration = 10000 + Array.from(allCounters).indexOf(el) * 4500

    let interval = setInterval(function () {
      el.innerText =
        string.charAt(Math.random() * string.length) +
        string.charAt(Math.random() * string.length)

      duration = duration - 500

      if (duration > 0) {
        return
      }

      clearInterval(interval)

      if (el.getAttribute("data-time") === "hour") {
        el.innerText = dataHours
      }

      if (el.getAttribute("data-time") === "minute") {
        el.innerText = dataMinutes
      }

      if (el.getAttribute("data-time") === "second") {
        el.innerText = dataSeconds
      }

      if (onAnimationFinish) {
        onAnimationFinish()
      }
    }, 100)
  })
}
