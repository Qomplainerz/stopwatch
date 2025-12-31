const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps-list');

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

function startStopwatch() {
	if (!isRunning) {
		startTime = Date.now() - elapsedTime;
		timerInterval = setInterval(updateDisplay, 10);
		startStopBtn.textContent = 'Stop';
		lapBtn.disabled = false;
		isRunning = true;
	} else {
		clearInterval(timerInterval);
		startStopBtn.textContent = 'Start';
		isRunning = false;
	}
}

function resetStopwatch() {
	clearInterval(timerInterval);
	elapsedTime = 0;
	isRunning = false;
	lapCounter = 0;
	display.textContent = '00:00:00.00';
	startStopBtn.textContent = 'Start';
	lapBtn.disabled = true;
	lapsList.innerHTML = '';
}

function recordLap() {
	lapCounter++;
	const lapTime = formatTime(elapsedTime);
	const lapItem = document.createElement('li');
	lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
	lapsList.appendChild(lapItem);
}

function updateDisplay() {
	elapsedTime = Date.now() - startTime;
	display.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const ms = Math.floor((milliseconds % 1000) / 10);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const paddedMs = String(ms).padStart(2, '0');
	const paddedSeconds = String(seconds).padStart(2, '0');
	const paddedMinutes = String(minutes).padStart(2, '0');
	const paddedHours = String(hours).padStart(2, '0');

	return `${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMs}`;
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
