const btn_container = document.getElementById('focused_btn');
const buttons = Array.from(btn_container.getElementsByClassName('btn_2'));
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortRestBtn = document.getElementById('shortRestBtn');
const longRestBtn = document.getElementById('longRestBtn');
let status = document.getElementById('status');
const notificationPermission = document.getElementById('notificationPermission');
let title = document.getElementById('title');
let imageTimer = document.getElementById('imageTimer');

let focused_btn = null;
let timerInterval;
const display = document.querySelector('#time');
let pmdr_time = 25 * 60;
let short_break_time = 5 * 60;
let long_break_time = 15 * 60;
let remainingTime = pmdr_time;
let isStarted = false;
let isPaused = false;
let currentMode = 'pomodoro';
let intervalCount = 0;
let userDefinedInterval = 2; // Set this value based on user input
let settingModal = document.getElementById('settingModal');
let settingBtn = document.getElementById('settingBtn');
const pomodoroDuration = document.getElementById('pomodoroDuration');
const shortBreakDuration = document.getElementById('shortBreakDuration');
const longBreakDuration = document.getElementById('longBreakDuration');
const pomodoroInterval = document.getElementById('pomodoroInterval');
const saveSetting = document.getElementById('saveSettings');

pomodoroBtn.classList.add('focused');


pomodoroDuration.textContent = `${Math.floor(pmdr_time / 60)} minutes`;
shortBreakDuration.textContent = `${Math.floor(short_break_time / 60)} minutes`;
longBreakDuration.textContent = `${Math.floor(long_break_time / 60)} minutes`;

// Load durations from local storage
function loadDurations() {
    const savedPomodoroDuration = localStorage.getItem('pomodoroDuration');
    const savedShortBreakDuration = localStorage.getItem('shortBreakDuration');
    const savedLongBreakDuration = localStorage.getItem('longBreakDuration');
    const savedPomodoroInterval = localStorage.getItem('pomodoroInterval');

    if (savedPomodoroDuration) {
        pmdr_time = parseInt(savedPomodoroDuration) * 60;
        pomodoroDuration.value = savedPomodoroDuration;
    }
    if (savedShortBreakDuration) {
        short_break_time = parseInt(savedShortBreakDuration) * 60;
        shortBreakDuration.value = savedShortBreakDuration;
    }
    if (savedLongBreakDuration) {
        long_break_time = parseInt(savedLongBreakDuration) * 60;
        longBreakDuration.value = savedLongBreakDuration;
    }
    if (savedPomodoroInterval) {
        userDefinedInterval = parseInt(savedPomodoroInterval);
        pomodoroInterval.value = savedPomodoroInterval;
    }

    remainingTime = getCurrentTime();
    display.textContent = formatTime(remainingTime);
}

// Save durations to local storage
function saveDurations() {
    localStorage.setItem('pomodoroDuration', pomodoroDuration.value);
    localStorage.setItem('shortBreakDuration', shortBreakDuration.value);
    localStorage.setItem('longBreakDuration', longBreakDuration.value);
    localStorage.setItem('pomodoroInterval', pomodoroInterval.value);
}

saveSetting.addEventListener('click', function() {
    pmdr_time = parseInt(pomodoroDuration.value) * 60;
    short_break_time = parseInt(shortBreakDuration.value) * 60;
    long_break_time = parseInt(longBreakDuration.value) * 60;
    userDefinedInterval = parseInt(pomodoroInterval.value);
    remainingTime = getCurrentTime();
    display.textContent = formatTime(remainingTime);
    saveDurations(); // Save durations to local storage
    closeSetting();
});

function openSetting() {
    settingModal.classList.remove('hidden');
    settingModal.classList.add('flex');
}

function closeSetting() {
    settingModal.classList.remove('flex');
    settingModal.classList.add('hidden');
}

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
    document.getElementById('pause').textContent = 'Pause'; // Change button text to "Pause"
    timerInterval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        title.textContent = `${minutes}:${seconds} - Pomodoro Timer`; // Update title with remaining time

        if (--timer < 0) {
            clearInterval(timerInterval);
            remainingTime = 0;
            title.textContent = 'Pomodoro Timer'; // Clear title when timer ends
            checkTimerEnd();
        } else {
            remainingTime = timer;
        }
    },1000);
}

function resetPomodoro() {
    clearInterval(timerInterval);
    isStarted = false;
    isPaused = false;
    remainingTime = getCurrentTime();
    display.textContent = formatTime(remainingTime);
    title.textContent = 'Pomodoro Timer'; // Reset title
    document.getElementById('pause').textContent = 'Start';
}

function pausePomodoro() {
    if (!isStarted) {
        startTimer(remainingTime, display);
        isStarted = true;
        isPaused = false;
        document.getElementById('pause').textContent = 'Pause';
    } else if (isStarted && !isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
        document.getElementById('pause').textContent = 'Resume';
    } else if (isStarted && isPaused) {
        startTimer(remainingTime, display);
        isPaused = false;
        document.getElementById('pause').textContent = 'Pause';
    }
}

function pomodoro() {
    clearInterval(timerInterval);
    isStarted = false;
    isPaused = false;
    currentMode = 'pomodoro';
    remainingTime = pmdr_time;
    display.textContent = formatTime(pmdr_time);
    document.getElementById('pause').textContent = 'Start';
    status.textContent = 'Pomodoro';
    pomodoroBtn.classList.add('focused');
    shortRestBtn.classList.remove('focused');
    longRestBtn.classList.remove('focused');
    imageTimer.src = './style/images/gura-work.gif';
}

function shortBreak() {
    clearInterval(timerInterval);
    isStarted = false;
    isPaused = false;
    currentMode = 'shortBreak';
    remainingTime = short_break_time;
    display.textContent = formatTime(short_break_time);
    document.getElementById('pause').textContent = 'Start';
    status.textContent = 'Short Rest';
    shortRestBtn.classList.add('focused');
    pomodoroBtn.classList.remove('focused');
    longRestBtn.classList.remove('focused');
    imageTimer.src = './style/images/artoria_rest.gif';
}

function longBreak() {
    clearInterval(timerInterval);
    isStarted = false;
    isPaused = false;
    currentMode = 'longBreak';
    remainingTime = long_break_time;
    display.textContent = formatTime(long_break_time);
    document.getElementById('pause').textContent = 'Start';
    status.textContent = 'Long Rest';
    longRestBtn.classList.add('focused');
    pomodoroBtn.classList.remove('focused');
    shortRestBtn.classList.remove('focused');
    imageTimer.src = './style/images/long_rest.gif';
}

function getCurrentTime() {
    switch (currentMode) {
        case 'shortBreak':
            return short_break_time;
        case 'longBreak':
            return long_break_time;
        default:
            return pmdr_time;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function askNotificationPermission() {
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            console.log("Notification permission: ", permission);
            if (permission === "granted") {
                new Notification("Notifications enabled!");
            }
        });
    }
    notificationPermission.classList.add('translate-x-[500px]');
    setTimeout(() => {
        notificationPermission.classList.add('hidden');
    }, 500);
}

if (Notification.permission === "granted") {
    notificationPermission.classList.add('hidden');
}

function notifyAndStartShortBreak() {
    if (Notification.permission === "granted") {
        new Notification("Istirahat dulu bre");
    }
    shortBreak();
}

function notifyAndStartLongBreak() {
    if (Notification.permission === "granted") {
        new Notification("Rehat dulu yang lama");
    }
    longBreak();
}

function checkTimerEnd() {
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        title.textContent = 'Pomodoro Timer'; // Clear title when timer ends
        if (currentMode === 'pomodoro') {
            intervalCount++;
            if (intervalCount % userDefinedInterval === 0) {
                notifyAndStartLongBreak();
            } else {
                notifyAndStartShortBreak();
            }
        } else if (currentMode === 'shortBreak') {
            if (Notification.permission === "granted") {
                new Notification("Udah istirahatnya, balik nguli!");
            }
            pomodoro();
        } else if (currentMode === 'longBreak') {
            if (Notification.permission === "granted") {
                new Notification("Long break selesai, nguli lagi!");
            }
            pomodoro();
        }
    }
}

setInterval(checkTimerEnd, 1000);

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.textContent,
            completed: li.querySelector('input').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.classList.add('check');
        check.checked = task.completed;
        p.classList.add('taskText');
        p.textContent = task.text;
        li.appendChild(p);
        li.appendChild(check);
        li.classList.add('taskLi');
        if (task.completed) {
            li.classList.add('lineThrough');
        }
        document.getElementById('taskList').appendChild(li);
    });
}

function addTask() {
    const task = document.getElementById('task').value;
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    const p = document.createElement('p');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('check');
    p.classList.add('taskText');
    if (!task) {
        alert('Task harus diisi!');
        return;
    }
    p.textContent = task;
    li.appendChild(p);
    li.appendChild(check);
    li.classList.add('taskLi');
    taskList.appendChild(li);
    document.getElementById('task').value = '';
    saveTasks(); // Save tasks to local storage
}

document.getElementById('taskList').addEventListener('change', function(event) {
    if (event.target.classList.contains('check')) {
        const listItem = event.target.parentElement;
        if (event.target.checked) {
            listItem.classList.add('lineThrough');
        } else {
            listItem.classList.remove('lineThrough');
        }
        saveTasks(); // Save tasks to local storage
    }
});

function deleteTask() {
    const checked = document.getElementsByClassName('lineThrough');
    while (checked.length > 0) {
        checked[0].parentElement.removeChild(checked[0]);
    }
    saveTasks(); // Save tasks to local storage
}

// Load tasks and durations from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    loadDurations();
    if (Notification.permission === "granted") {
        notificationPermission.style.display = 'none';
    }
});
