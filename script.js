let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function startCountdown() {
    const countdownElement = document.getElementById("countdown-timer");

    // Function to calculate the time remaining until midnight (12:00 AM) in the Kolkata timezone
    function getTimeUntilMidnightInKolkata() {
        const now = new Date();
        
        // Calculate the current time in IST (Kolkata time)
        const options = { timeZone: 'Asia/Kolkata', hour12: false };
        const kolkataTimeString = now.toLocaleString('en-US', options);
        const kolkataTime = new Date(kolkataTimeString);
        
        // Get the next midnight in Kolkata
        const nextMidnight = new Date(kolkataTime);
        nextMidnight.setHours(24, 0, 0, 0); // Set time to 12:00 AM of the next day
        
        // Calculate the time difference in milliseconds
        const timeUntilMidnight = nextMidnight - kolkataTime;

        // Convert milliseconds to seconds
        return Math.floor(timeUntilMidnight / 1000);
    }

    function updateCountdown() {
        let remainingTime = getTimeUntilMidnightInKolkata();

        const interval = setInterval(function () {
            // Calculate hours, minutes, and seconds
            let hours = Math.floor(remainingTime / 3600);
            let minutes = Math.floor((remainingTime % 3600) / 60);
            let seconds = remainingTime % 60;

            // Add leading zeros if needed
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // Update the countdown display
            countdownElement.textContent = `${hours}:${minutes}:${seconds}`;

            // Decrement remaining time
            remainingTime--;

            // If the countdown reaches zero, restart it for the next day
            if (remainingTime < 0) {
                clearInterval(interval);
                startCountdown(); // Restart countdown for the next day
            }
        }, 1000); // Update every second
    }

    // Start the countdown
    updateCountdown();
}

// Start the countdown when the page loads
startCountdown();
