const openModalBtn = document.querySelector(".main__article-btn")
const modal = document.querySelector(".modal")
const closeModalBtn = document.querySelector(".modal__close-btn")
const inputEmailPhone = document.querySelector(".modal__email-phone")
const inputPassword = document.querySelector(".modal__password")
const form = document.querySelector(".modal__form-sign-in")
const checkboxRestorePass = document.querySelector(".modal__remember-password-checkbox")
const signInBtn = document.querySelector(".modal__sign-in")


//modal
openModalBtn.addEventListener("click", () => {
  modal.classList.add("modal_active")
})

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("modal_active")
})


//form
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const validation = validationForm()
  validation && sendFormToServer()
})


//validation
const validationEmail = (email) => {
  inputEmailPhone.style = email === "" ? "background-color: #ff7a7a66" : "background-color: #D7E2F6"
  return email !== ""
}

const validationPassword = (password) => {
  inputPassword.style = password === "" ? "background-color: #ff7a7a66" : "background-color: #D7E2F6"
  return password !== ""
}

const validationForm = () => {
  const validEmailPhone = validationEmail(inputEmailPhone.value)
  const validPassword = validationPassword(inputPassword.value)
  return validEmailPhone && validPassword
}

let isLoading = false

const sendFormToServer = async () => {
  isLoading = true
  loaderSubmitButton()
  try {
    await fetch("https://636de0e191576e19e3326ef1.mockapi.io/all/Projects", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailPhone: inputEmailPhone.value, 
        password: inputPassword.value,
        restorePassword: checkboxRestorePass.checked,
      })
    })
    .then((response) => response.json())
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading = false
    loaderSubmitButton()
    inputEmailPhone.value = ""
    inputPassword.value = ""
    checkboxRestorePass.checked = false
  }
}


//loader
const loader = `<div class="loader"></div>`

const loaderSubmitButton = () => {
  signInBtn.innerHTML = isLoading ? loader : "Войти"
}