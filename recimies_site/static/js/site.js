
// Get the modal
const logInModal = document.getElementById("signInModal");

// Get the button that opens the logInModal
const logInBtn = document.querySelector(".sign-in");

// Get the <span> element that closes the logInModal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the logInModal 
logInBtn.onclick = function() {
  logInModal.style.display = "block";
}

// When the user clicks on <span> (x), close the logInModal
span.onclick = function() {
  logInModal.style.display = "none";
}

// When the user clicks anywhere outside of the logInModal, close it
window.onclick = function(event) {
  if (event.target == logInModal) {
    logInModal.style.display = "none";
  }
}