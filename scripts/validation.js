//TODO: tengo que separar esta validación en otros scripts
const form = document.getElementById('form-signup') || document.getElementById('form-login') || document.getElementById('form-edit');
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

    if (form.id === 'form-signup') {
        // Validar formulario de registro
        errors = validateSignupForm();
    } else if (form.id === 'form-login') {
        // Validar formulario de inicio de sesión
        errors = validateLoginForm();
    } else if (form.id === 'form-edit') {
        // Validar formulario de edición de datos
        errors = validateEditDataForm();
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(". ");
    }
});

// Función genérica para validar campo vacío o nulo
function validateField(input, message) {
    if (!input || !input.value || input.value.trim() === '') {
        if (input) input.parentElement.classList.add('incorrect');
        return message;
    }
    return null;
}

// Validación específica del formulario de registro
function validateSignupForm() {
    const errors = [];

    // Se validan los campos del formulario de registro
    errors.push(
        validateField(firstname_input, 'Nombre es requerido'),
        validateField(email_input, 'Email es requerido'),
        validateField(password_input, 'Contraseña es requerida'),
        validateField(identification_input, 'Cédula es requerida'),
        validateField(telephone_input, 'Teléfono es requerido'),
        validateField(wallet_input, 'Billetera es requerida'),
        validateField(work_area_input, 'Área de trabajo es requerida')
    );

    // Validaciones adicionales
    if (password_input && password_input.value && password_input.value.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
        password_input.parentElement.classList.add('incorrect');
    }
    if (repeat_password_input && password_input && password_input.value !== repeat_password_input.value) {
        errors.push('Las contraseñas no coinciden');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors.filter(error => error !== null); // Elimina errores nulos
}

// Validación específica del formulario de edición de datos
function validateEditDataForm() {
    const errors = [];

    // Se validan los campos del formulario de edición
    errors.push(
        validateField(firstname_input, 'Nombre es requerido'),
        validateField(email_input, 'Email es requerido'),
        validateField(identification_input, 'Cédula es requerida'),
        validateField(telephone_input, 'Teléfono es requerido'),
        validateField(wallet_input, 'Billetera es requerida'),
        validateField(work_area_input, 'Área de trabajo es requerida')
    );

    return errors.filter(error => error !== null);
}

// Validación específica del formulario de inicio de sesión
function validateLoginForm() {
    const errors = [];

    // Se validan los campos del formulario de login
    errors.push(
        validateField(email_input, 'Email es requerido'),
        validateField(password_input, 'Contraseña es requerida')
    );

    return errors.filter(error => error !== null);
}

// Quitar clase 'incorrect' y limpiar mensajes de error al modificar el campo
const allInputs = [firstname_input, email_input, password_input, repeat_password_input, identification_input, telephone_input, wallet_input, work_area_input]
  .filter(input => input != null); // Filtrar entradas que no sean nulas

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement) {
            input.parentElement.classList.remove('incorrect');
        }
        if (error_message) {
            error_message.innerText = ''; // Limpiar mensaje de error
        }
    });
});
