const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const progressCircle = document.querySelector('.progress-ring__circle');
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// Date and time setup: Set to start the timer at 9:00 AM on 11th Oct 2024
const targetDate = new Date(2024, 9, 11, 9, 0, 0).getTime(); // Month is 0-indexed
const totalDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// Start the countdown automatically when the time reaches the target date
function checkTime() {
  const currentTime = new Date().getTime();

  if (currentTime >= targetDate) {
    startCountdown();
    startButton.disabled = false; // Enable the button when countdown starts
    startButton.textContent = 'Start'; // Change button text to "Start"
  } else {
    const timeLeft = targetDate - currentTime;
    const targetDateTime = new Date(targetDate).toLocaleString(); // Format date for display
    startButton.textContent = `Start Test at ${targetDateTime}`; // Update button text
  }
}

// Start the countdown
function startCountdown() {
  const endTime = targetDate + totalDuration;

  const mainInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      clearInterval(mainInterval);
      countdownElement.textContent = '00:00:00';
      setProgress(100);
      return;
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display countdown
    countdownElement.textContent = `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update progress circle
    const elapsedTime = now - targetDate;
    const progressPercent = (elapsedTime / totalDuration) * 100;
    setProgress(progressPercent);
  }, 1000);
}

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

// Check every second to see if we need to start the countdown
setInterval(checkTime, 1000);

// Button functionality
startButton.addEventListener('click', function () {
  if (startButton.textContent === 'Start') {
    window.open('https://www.jotform.com/242742382323049', '_blank');
  }
});
