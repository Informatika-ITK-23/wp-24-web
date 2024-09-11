// implement random number before show the countdown

export function randomNum(
  dataHours: any,
  dataMinutes: any,
  dataSeconds: any
): void {
  let string = "9876543210"
  let allCounters = document.querySelectorAll(".countdown-time .random")

  allCounters.forEach(function (el: any) {
    let duration = 10000 + Array.from(allCounters).indexOf(el) * 4500
    let interval = setInterval(function () {
      el.innerText =
        string.charAt(+Math.random() * string.length) +
        string.charAt(+Math.random() * string.length)
      duration = duration - 500
      if (duration <= 0) {
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
      }
    }, 100)
  })
}
