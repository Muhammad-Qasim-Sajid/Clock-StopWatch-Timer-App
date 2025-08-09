let clockOption = document.querySelector(".clock");
let stopWatchOption = document.querySelector(".stop-watch");
let timerOption = document.querySelector(".timer");

// Clock visibility and all the other elements invisible
let clockDiv = document.querySelector(".clock-div");
let clockTime = document.querySelector(".clock-time");

clockOption.addEventListener("click", () => {
    if (clockOption.classList.contains("active")) return;

    clockOption.classList.add("active");
    stopWatchOption.classList.remove("active");
    timerOption.classList.remove("active");

    // First hiding stop-watch if opened
    stopWatchTime.classList.add("hide-stopwatch-time");
    stopWatchStart.classList.add("hide-start");
    stopWatchStop.classList.add("hide-stop");
    stopWatchResumeReset.classList.add("hide-resume-reset");

    // Then hiding timer if opened
    timerInputStart.classList.add("hide-timer");
    timerTimePauseReset.classList.add("hide-timer-clock");

    // Now un-hiding clock
    clockDiv.classList.remove("hide-clock");

    // lowering the opacity of clock
    clockOption.style.opacity = "0.5";
    stopWatchOption.style.opacity = "";
    timerOption.style.opacity = "";
});

// Stop-Watch visibility and all the other elements invisible
let stopWatchTime = document.querySelector(".stopwatch-time");
let stopWatchStart = document.querySelector(".start");
let stopWatchStop = document.querySelector(".stop");
let stopWatchResumeReset = document.querySelector(".resume-reset");
let stopWatchResume = document.querySelector(".resume");
let stopWatchReset = document.querySelector(".reset");

stopWatchOption.addEventListener("click", () => {
    if (stopWatchOption.classList.contains("active")) return;

    clockOption.classList.remove("active");
    stopWatchOption.classList.add("active");
    timerOption.classList.remove("active");

    clockDiv.classList.add("hide-clock");
    timerInputStart.classList.add("hide-timer");
    timerTimePauseReset.classList.add("hide-timer-clock");

    stopWatchTime.classList.remove("hide-stopwatch-time");
    stopWatchStart.classList.remove("hide-start");

    stopWatchOption.style.opacity = "0.5";
    clockOption.style.opacity = "";
    timerOption.style.opacity = "";
});

stopWatchStart.addEventListener("click", () => {
    stopWatchStart.classList.add("hide-start");
    stopWatchStop.classList.remove("hide-stop");
});

stopWatchStop.addEventListener("click", () => {
    stopWatchStop.classList.add("hide-stop");
    stopWatchResumeReset.classList.remove("hide-resume-reset");
});

// Timer visibility and all the other elements invisible
let timerInputStart = document.querySelector(".timer-clock");
let timerInput = document.querySelector(".input-minute");
let timerStart = document.querySelector(".start-timer");
let timerTimePauseReset = document.querySelector(".timer-div");
let timerTime = document.querySelector(".timer-time");
let timerPause = document.querySelector(".pause-timer");
let timerReset = document.querySelector(".reset-timer");
let timerRestart = document.querySelector(".re-timer");

timerOption.addEventListener("click", () => {
    if (timerOption.classList.contains("active")) return;

    clockOption.classList.remove("active");
    stopWatchOption.classList.remove("active");
    timerOption.classList.add("active");

    clockDiv.classList.add("hide-clock");
    stopWatchTime.classList.add("hide-stopwatch-time");
    stopWatchStart.classList.add("hide-start");
    stopWatchStop.classList.add("hide-stop");
    stopWatchResumeReset.classList.add("hide-resume-reset");

    timerInputStart.classList.remove("hide-timer");

    timerOption.style.opacity = "0.5";
    stopWatchOption.style.opacity = "";
    clockOption.style.opacity = "";
});

timerStart.addEventListener("click", () => {
    timerInputStart.classList.add("hide-timer");
    timerTimePauseReset.classList.remove("hide-timer-clock");
});

// clock
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let ampm = "AM";
    if (hours >= 12) ampm = "PM";
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    let time = `${hours}:${minutes}:${seconds} ${ampm}`;
    clockTime.textContent = time;
}

setInterval(updateClock, 1000);
updateClock();

// stop-Watch
let stopWatchInterval;
let stopSeconds = 0;
let stopMinutes = 0;
let stopHours = 0;

function updateStopWatch() {
    stopSeconds++;
    if (stopSeconds === 60) {
        stopSeconds = 0;
        stopMinutes++;
    }
    if (stopMinutes === 60) {
        stopMinutes = 0;
        stopHours++;
    }

    s = stopSeconds.toString().padStart(2, "0");
    m = stopMinutes.toString().padStart(2, "0");
    h = stopHours.toString().padStart(2, "0");

    stopWatchTime.textContent = `${h}:${m}:${s}`;
}

stopWatchStart.addEventListener("click", () => {
    stopWatchInterval = setInterval(updateStopWatch, 1000);
});

stopWatchStop.addEventListener("click", () => {
    clearInterval(stopWatchInterval);
});

stopWatchResume.addEventListener("click", () => {
    stopWatchInterval = setInterval(updateStopWatch, 1000);
    stopWatchResumeReset.classList.add("hide-resume-reset");
    stopWatchStop.classList.remove("hide-stop");
});

stopWatchReset.addEventListener("click", () => {
    clearInterval(stopWatchInterval);
    stopSeconds = 0;
    stopMinutes = 0;
    stopHours = 0;
    stopWatchTime.textContent = "00:00:00";
    stopWatchResumeReset.classList.add("hide-resume-reset");
    stopWatchStart.classList.remove("hide-start");
});

// timer
let timeInterval;
let inputSecs = 0;

timerStart.addEventListener("click", () => {
    clearInterval(timeInterval);
    inputSecs = parseInt(timerInput.value) * 60;

    if (isNaN(inputSecs) || inputSecs <= 0) {
        alert("Please enter a valid number or go to Hell.");
        timerInputStart.classList.remove("hide-timer");
        timerTimePauseReset.classList.add("hide-timer-clock");
        return;
    }

    let timerHours = Math.floor(inputSecs / 3600);
    let timerMints = Math.floor((inputSecs % 3600) / 60);
    let timerSecs = inputSecs % 60;

    let hr = timerHours.toString().padStart(2, "0");
    let min = timerMints.toString().padStart(2, "0");
    let secs = timerSecs.toString().padStart(2, "0");

    timerTime.textContent = `${hr}:${min}:${secs}`;

    timeInterval = setInterval(() => {
        inputSecs--;
        if (inputSecs <= 0) {
            clearInterval(timeInterval);
            timerTime.textContent = "00:00:00";
            alert("Time muk gya.");
            return;
        }

        let timerHours = Math.floor(inputSecs / 3600);
        let timerMints = Math.floor((inputSecs % 3600) / 60);
        let timerSecs = inputSecs % 60;

        let hr = timerHours.toString().padStart(2, "0");
        let min = timerMints.toString().padStart(2, "0");
        let secs = timerSecs.toString().padStart(2, "0");

        timerTime.textContent = `${hr}:${min}:${secs}`;
    }, 1000);
});

timerPause.addEventListener("click", () => {
    clearInterval(timeInterval);
    timerPause.classList.add("hide-re-timer");
    timerReset.classList.add("hide-re-timer");
    timerRestart.classList.remove("hide-re-timer");
});

timerRestart.addEventListener("click", () => {
    timerRestart.classList.add("hide-re-timer");
    timerPause.classList.remove("hide-re-timer");
    timerReset.classList.remove("hide-re-timer");

    timeInterval = setInterval(() => {
        inputSecs--;
        if (inputSecs <= 0) {
            clearInterval(timeInterval);
            timerTime.textContent = "00:00:00";
            alert("Time muk gya.");
            return;
        }

        let timerHours = Math.floor(inputSecs / 3600);
        let timerMints = Math.floor((inputSecs % 3600) / 60);
        let timerSecs = inputSecs % 60;

        let hr = timerHours.toString().padStart(2, "0");
        let min = timerMints.toString().padStart(2, "0");
        let secs = timerSecs.toString().padStart(2, "0");

        timerTime.textContent = `${hr}:${min}:${secs}`;
    }, 1000);
});

timerReset.addEventListener("click", () => {
    clearInterval(timeInterval);
    timerTime.textContent = "00:00:00";
    timerInput.value = "";
    timerInputStart.classList.remove("hide-timer");
    timerTimePauseReset.classList.add("hide-timer-clock");
});