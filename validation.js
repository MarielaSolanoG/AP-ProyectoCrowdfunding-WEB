const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const identification_input = document.getElementById('identification-input')
const telephone_input = document.getElementById('telephone-input')
const wallet_input = document.getElementById('wallet-input')
const work_area_input= document.getElementById('work-area')
const error_message = document.getElementById('error-message')


form.addEventListener('submit', (e) => {
    let errors = []
  
    if(firstname_input){
      // If we have a firstname input then we are in the signup
      errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value,
       identification_input.value, telephone_input.value, wallet_input.value, work_area_input.value)
    }
    else{
      // If we don't have a firstname input then we are in the login
      errors = getLoginFormErrors(email_input.value, password_input.value)
    }
  
    if(errors.length > 0){
      // If there are any errors
      e.preventDefault()
      error_message.innerText  = errors.join(". ")
    }
  })

  function getSignupFormErrors(firstname, email, password, repeatPassword, identification, telephone, wallet, work_area){
    let errors = []
  
    if(firstname === '' || firstname == null){
      errors.push('Nombre es requerido')
      firstname_input.parentElement.classList.add('incorrect')
    }
    if(email === '' || email == null){
      errors.push('Email es requerido')
      email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null){
      errors.push('Contraseña es requerido')
      password_input.parentElement.classList.add('incorrect')
    }
    if(password.length < 6){
      errors.push('La contraseña debe tener al menos 6 caracteres')
      password_input.parentElement.classList.add('incorrect')
    }
    if(password !== repeatPassword){
      errors.push('Las contraseñas no coinciden')
      password_input.parentElement.classList.add('incorrect')
      repeat_password_input.parentElement.classList.add('incorrect')
    }
    if(identification === '' || identification == null){
        errors.push('Cédula es requerido')
        identification_input.parentElement.classList.add('incorrect')
    }
    if(telephone === '' || telephone == null){
        errors.push('Telefono es requerido')
        telephone_input.parentElement.classList.add('incorrect')
    }
    if(wallet === '' || wallet == null){
        errors.push('Billetera es requerido')
        wallet_input.parentElement.classList.add('incorrect')
    }
    if(work_area === '' || work_area == null){
        errors.push('Área de trabajo es requerido')
        work_area_input.parentElement.classList.add('incorrect')
    }
    return errors;
  }

  function getLoginFormErrors(email, password){
    let errors = []
  
    if(email === '' || email == null){
      errors.push('Email is requerido')
      email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null){
      errors.push('Contraseña es requerido')
      password_input.parentElement.classList.add('incorrect')
    }
  
    return errors;
  }
  
  const allInputs = [firstname_input, email_input, password_input, repeat_password_input, identification_input, telephone_input,
  wallet_input, work_area_input].filter(input => input != null)
  
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      if(input.parentElement.classList.contains('incorrect')){
        input.parentElement.classList.remove('incorrect')
        error_message.innerText = ''
      }
    })
  })