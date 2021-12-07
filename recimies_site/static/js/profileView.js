const mainProfileImg = document.querySelector(".profile__info-image")

const profileText = document.querySelector(".profile__info")
const profileImage = document.querySelector(".profile__info-image")
const following = document.querySelector(".following")
const recipeGrid = document.querySelector(".recipes-grid--profile")
const editBtn = document.querySelector(".profile__edit-btn")
const submitBtn = document.querySelector(".btn-success")
const crispyForm = document.querySelectorAll("form")[1]
// const newSubmitBtn = submitBtn.cloneNode(true)
console.log(crispyForm);

const addBtnToForm = () =>{
  crispyForm.appendChild(submitBtn)
}

addBtnToForm()

"resize load".split(" ").forEach(function(e){
  window.addEventListener(e, function(){
    following.style.width = `${profileText.scrollWidth + profileImage.scrollWidth}px`
    // recipeGrid.style.width = `${profileText.scrollWidth + profileImage.scrollWidth}px`
  })
})
