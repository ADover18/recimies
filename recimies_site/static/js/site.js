// Get the modal
const logInModal = document.getElementById("signInModal");

// Get the button that opens the logInModal
const logInBtn = document.querySelector(".sign-in");

// Get the <span> element that closes the logInModal
const span = document.getElementsByClassName("close")[0];

// Get the sign in button
const signInBtn = document.querySelector("[value='Sign In']")

//Get the error elements
const errors = document.querySelectorAll(".errorlist")

//Get the username input field
const usernameFields = document.getElementById("id_username")


console.log(usernameFields);
//Only show the logIn button on the index page
if (
  window.location.href.includes("recipe") ||
  window.location.href.includes("register")
) {
  logInBtn.style.display = "none";
} else {
  // When the user clicks the button, open the logInModal
  logInBtn.onclick = function () {
    logInModal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the logInModal
  span.onclick = function () {
    logInModal.style.display = "none";
  };

  // When the user clicks anywhere outside of the logInModal, close it
  window.onclick = function (event) {
    if (event.target === logInModal) {
      logInModal.style.display = "none";
    }
  };
}




//Add an extra class to the username field to diffrentiate it fron the username field on the register page so it can be individually selected in the CSS.

if (window.location.href.includes('register')===false){
  usernameFields.classList.add("login-username-field")
}

//If there are errors following a sign in attempt display modal window

if (errors.length > 0){
  errors[0].innerHTML = '<p>Please enter a correct username and password. Both fields are case-sensitive.</p>'
  logInModal.style.display = "block"
  inputFields.forEach(input=> {
    input.style.borderBottomColor = "rgb(220, 53, 69)";
    input.style.borderLeftColor = "rgb(220, 53, 69)";
    input.style.borderRightColor = "rgb(220, 53, 69)";
    input.style.borderTopColor = "rgb(220, 53, 69)";
  })
}
