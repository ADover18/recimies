const mainProfileImg = document.querySelector(".profile__info-image")

const pageLinks = document.querySelectorAll("a")

const profileText = document.querySelector(".profile__info")
const profileImage = document.querySelector(".profile__info-image")
const following = document.querySelector(".following")
const recipeGrid = document.querySelector(".recipes-grid--profile")

const editModal = document.querySelector(".modal")
const closeModalBtn = document.querySelector(".close")

const editBtn = document.querySelector(".profile__edit-btn")
const submitBtn = document.querySelector(".btn-success")
const crispyForm = document.querySelectorAll("form")[1]


const addBtnToForm = () =>{
  crispyForm.appendChild(submitBtn)
}

addBtnToForm()


editBtn.addEventListener("click", function(event){
  event.preventDefault()
  pageLinks.forEach(link=>link.style.pointerEvents = "none")
  editModal.style.display = "block"
  editModal.style.zIndex = "100"
})

closeModalBtn.addEventListener("click", function(event){
  event.preventDefault()
  pageLinks.forEach(link=>link.style.pointerEvents = "")
  editModal.style.display = "none"
  editModal.style.zIndex = ""
})