const btn_container = document.getElementById('focused_btn');
const buttons = Array.from(btn_container.getElementsByClassName('btn_2'));

let focused_btn = null;
let timerInterval;
const display = document.querySelector('#time');
const pmdr_time = 25 * 60;
let remainingTime = pmdr_time;
let isStarted = false;
let isPaused = false;

document.addEventListener('click', function(event) {
    if (!btn_container.contains(event.target) && focused_btn) {
        focused_btn.classList.add('focused');
    }
});

buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (focused_btn) {
            focused_btn.classList.remove('focused');
        }
        this.classList.add('focused');
        focused_btn = this;
    });
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerInterval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        remainingTime = timer;
    }, 1000);
}

function startPomodoro() {
    if (!isStarted) {
        startTimer(pmdr_time, display);
        isStarted = true;
        document.getElementById('start_pmdr').disabled = true;
    }
}

function resetPomodoro() {
    clearInterval(timerInterval);
    isStarted = false;
    isPaused = false;
    remainingTime = pmdr_time;
    display.textContent = "25:00";
    document.getElementById('start_pmdr').disabled = false;
    document.getElementById('pause').textContent = 'Pause';
}

function pausePomodoro() {
    if (isStarted && !isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
        document.getElementById('start_pmdr').disabled = false;
        document.getElementById('pause').textContent = 'Resume';
    } else if (isStarted && isPaused) {
        startTimer(remainingTime, display);
        isPaused = false;
        document.getElementById('start_pmdr').disabled = true;
        document.getElementById('pause').textContent = 'Pause';
    }
}