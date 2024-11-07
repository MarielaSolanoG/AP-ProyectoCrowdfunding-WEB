const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const identification_input = document.getElementById('identification-input');
const telephone_input = document.getElementById('telephone-input');
const wallet_input = document.getElementById('wallet-input');
const work_area_input = document.getElementById('work-area');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    let errors = [];
  
    if (repeat_password_input) {
        // Signup form
        errors = validateSignupForm();
    } else if (firstname_input) {
        // Edit user data form
        errors = validateEditDataForm();
    } else {
        // Login form
        errors = validateLoginForm();
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(". ");
    }
});

// Función genérica para validar campo vacío o nulo
function validateField(input, message) {
    if (!input.value || input.value.trim() === '') {
        input.parentElement.classList.add('incorrect');
        return message;
    }
    return null;
}

// Validación específica del formulario de registro
function validateSignupForm() {
    const errors = [];
    
    errors.push(
        validateField(firstname_input, 'Nombre es requerido'),
        validateField(email_input, 'Email es requerido'),
        validateField(password_input, 'Contraseña es requerido'),
        validateField(identification_input, 'Cédula es requerido'),
        validateField(telephone_input, 'Teléfono es requerido'),
        validateField(wallet_input, 'Billetera es requerido'),
        validateField(work_area_input, 'Área de trabajo es requerido')
    );

    // Validaciones adicionales
    if (password_input.value && password_input.value.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
        password_input.parentElement.classList.add('incorrect');
    }
    if (password_input.value !== repeat_password_input.value) {
        errors.push('Las contraseñas no coinciden');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors.filter(error => error !== null); // Elimina errores nulos
}

// Validación específica del formulario de edición de datos
function validateEditDataForm() {
    const errors = [];
    
    errors.push(
        validateField(firstname_input, 'Nombre es requerido'),
        validateField(email_input, 'Email es requerido'),
        validateField(identification_input, 'Cédula es requerido'),
        validateField(telephone_input, 'Teléfono es requerido'),
        validateField(wallet_input, 'Billetera es requerido'),
        validateField(work_area_input, 'Área de trabajo es requerido')
    );

    return errors.filter(error => error !== null);
}

// Validación específica del formulario de inicio de sesión
function validateLoginForm() {
    const errors = [];
    
    errors.push(
        validateField(email_input, 'Email es requerido'),
        validateField(password_input, 'Contraseña es requerido')
    );

    return errors.filter(error => error !== null);
}

// Quitar clase 'incorrect' y limpiar mensajes de error al modificar el campo
const allInputs = [firstname_input, email_input, password_input, repeat_password_input, identification_input, telephone_input, wallet_input, work_area_input]
  .filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.parentElement.classList.remove('incorrect');
        error_message.innerText = '';
    });
});
