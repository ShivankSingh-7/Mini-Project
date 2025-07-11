
function tame(hour, min, sec, ampm) {
    if (hour > 12) {
        hour = hour - 12;
        if (hour < 10) {
            hour = "0" + hour
        }
    }
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    let html = document.querySelector(".container")
    html.innerHTML = `<div class="hour">${hour} :</div>
        <div class="min">${min} :</div>
        <div class="sec">${sec} :</div>
        <div class="ampm">${ampm}</div>`
}

let now = new Date()
console.log(now)
let ampm = "AM";
if (now.getHours() > 12) {
    ampm = "PM"
}
tame(now.getHours(), now.getMinutes(), now.getSeconds(), ampm)


setInterval(() => {
    let now = new Date()
    let ampm = now.getHours() >= 12 ? "PM" : "AM";
    tame(now.getHours(), now.getMinutes(), now.getSeconds(), ampm)
}, 1000)
