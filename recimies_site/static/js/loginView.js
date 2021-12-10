const logInModal = document.querySelector(".sign-in-modal");
const logInBtn = document.querySelector(".nav-bar__sub-menu-modal-link");
const closeModal = document.querySelector(".close");
const signInBtn = document.querySelector("[value='Sign In']")
const formErrors = document.querySelectorAll(".errorlist")
const usernameFields = document.getElementById("id_username")
const navBar = document.querySelector(".nav-bar")



logInBtn.onclick = function () {
  logInModal.style.display = "block";
};


closeModal.onclick = function () {
  logInModal.style.display = "none";
};


window.onclick = function (event) {
  if (event.target === logInModal) {
    logInModal.style.display = "none";
  }
};

//Styling the username field
usernameFields.classList.add("login-username-field")


//Styling the Form in the instance of Errors
if (formErrors.length > 0){
  formErrors[0].innerHTML = '<p>Please enter a correct username and password. Both fields are case-sensitive.</p>'
  logInModal.style.display = "block"
  inputFields.forEach(input=> {
    input.style.borderBottomColor = "rgb(220, 53, 69)";
    input.style.borderLeftColor = "rgb(220, 53, 69)";
    input.style.borderRightColor = "rgb(220, 53, 69)";
    input.style.borderTopColor = "rgb(220, 53, 69)";
  })
}


