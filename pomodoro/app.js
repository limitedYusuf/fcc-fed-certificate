$(document).ready(function () {
   let sessionLength = 25 * 60;
   let breakLength = 5 * 60;
   let isRunning = false;
   let isSession = true;
   let timerInterval;

   updateDisplay();

   $("#break-decrement").click(function () {
      if (breakLength > 60) {
         breakLength -= 60;
         updateDisplay();
      }
   });

   $("#break-increment").click(function () {
      if (breakLength < 60 * 60) {
         breakLength += 60;
         updateDisplay();
      }
   });

   $("#session-decrement").click(function () {
      if (sessionLength > 60) {
         sessionLength -= 60;
         updateDisplay();
      }
   });

   $("#session-increment").click(function () {
      if (sessionLength < 60 * 60) {
         sessionLength += 60;
         updateDisplay();
      }
   });

   $("#start_stop").click(function () {
      isRunning = !isRunning;
      if (isRunning) {
         startTimer();
      } else {
         pauseTimer();
      }
   });

   // Handle reset button
   $("#reset").click(function () {
      resetTimer();
   });

   function startTimer() {
      if (!timerInterval) {
         timerInterval = setInterval(function () {
            if (isSession) {
               if (sessionLength === 0) {
                  isSession = false;
                  sessionLength = breakLength;
                  updateDisplay();
                  playBeep();
               } else {
                  sessionLength--;
                  updateDisplay();
               }
            } else {
               if (breakLength === 0) {
                  isSession = true;
                  breakLength = sessionLength;
                  updateDisplay();
                  playBeep();
               } else {
                  breakLength--;
                  updateDisplay();
               }
            }
         }, 1000);
      }
   }

   function pauseTimer() {
      if (timerInterval) {
         clearInterval(timerInterval);
         timerInterval = null;
      }
   }

   function resetTimer() {
      pauseTimer();
      isRunning = false;
      isSession = true;
      sessionLength = 25 * 60;
      breakLength = 5 * 60;
      updateDisplay();
      stopBeep();
   }

   function updateDisplay() {
      let time = isSession ? sessionLength : breakLength;
      $("#break-length").text(breakLength / 60);
      $("#session-length").text(sessionLength / 60);
      $("#timer-label").text(isSession ? "Session" : "Break");
      $("#time-left").text(formatTime(time));
   }

   function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   }

   function playBeep() {
      const beep = document.getElementById("beep");
      beep.play();
   }

   function stopBeep() {
      const beep = document.getElementById("beep");
      beep.pause();
      beep.currentTime = 0;
   }
});