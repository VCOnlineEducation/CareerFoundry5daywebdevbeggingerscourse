let emailElement = document.querySelector("#email");
let messageElement = document.querySelector("#message");

let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    
    
    let emailValue = emailElement.value;
    let messageValue = messageElement.value;

    if (emailValue.includes("@")) {
        //all good
        Swal.fire({
            icon: "success",
            title: "Thank you so much for being a part of this career changing journey!",
            text: "🎉Your message has been sent 🎊",
        })
        // do this for 30 seconds
        var duration = 7 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            // launch a few confetti from the left edge
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            // and launch a few from the right edge
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            // keep going until we are out of time
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
        document.getElementById("contact-form").reset()
    }
    else {
        Swal.fire({
            icon: "error",
            title: "404",
            text: "Oh no.  It looks like you've entered an invalid email address.  Please try again.",
            
        })
    }

})


const toggleInput = document.getElementById('darkModeSwitch');
const body = document.body;
const starContainer = document.getElementById('stars-container');
const numStars = 300; // Adjust the number of stars as desired
let scrollPosition = 0;

// Check if dark mode preference is stored in local storage
const isDarkMode = localStorage.getItem('darkMode');

// Set dark mode based on stored preference or user's device settings
if (isDarkMode === 'true') {
enableDarkMode();
} else if (isDarkMode === 'false') {
disableDarkMode();
} else if (window.matchMedia) {
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
    enableDarkMode();
} else {
    disableDarkMode();
}
} else {
disableDarkMode();
}

// Toggle dark mode on switch click
toggleInput.addEventListener('click', function() {
if (body.classList.contains('dark-mode')) {
    disableDarkMode();
} else {
    enableDarkMode();
}
});

// Function to enable dark mode
function enableDarkMode() {
body.classList.add('dark-mode');
toggleInput.checked = true;
toggleInput.parentElement.classList.add('dark-mode');
localStorage.setItem('darkMode', 'true');
createStars();
}

// Function to disable dark mode
function disableDarkMode() {
body.classList.remove('dark-mode');
toggleInput.checked = false;
toggleInput.parentElement.classList.remove('dark-mode');
localStorage.setItem('darkMode', 'false');
removeStars();
}

// Function to create stars
function createStars() {
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 4}s`; // Adjust twinkle speed
    starContainer.appendChild(star);
}

  // Update scroll position on scroll
window.addEventListener('scroll', updateScrollPosition);
updateScrollPosition();
}

// Function to remove stars
function removeStars() {
while (starContainer.firstChild) {
    starContainer.removeChild(starContainer.firstChild);
}

  // Remove scroll event listener
window.removeEventListener('scroll', updateScrollPosition);
}

// Function to update scroll position and remove/create stars
function updateScrollPosition() {
const windowHeight = window.innerHeight;
const containerTop = starContainer.getBoundingClientRect().top;
const containerBottom = starContainer.getBoundingClientRect().bottom;

if (containerTop >= windowHeight || containerBottom <= 0) {
    // Stars are outside the viewport, remove them
    removeStars();
} else if (starContainer.childElementCount === 0) {
    // Stars need to be created (scrolled back up)
    createStars();
}

  // Update scroll position
scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
}

// Check if dark mode is enabled and create stars accordingly
if (isDarkMode === 'true') {
createStars();
}