// Selección de formularios y elementos de entrada comunes
const form = document.getElementById('form-signup') || document.getElementById('form-login') || document.getElementById('form-edit');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const firstname_input = document.getElementById('firstname-input');
const identification_input = document.getElementById('identification-input');
const telephone_input = document.getElementById('telephone-input');
const wallet_input = document.getElementById('wallet-input');
const work_area_input = document.getElementById('work-area');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

// Agregar evento de escucha para el envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errors = [];

    if (form.id === 'form-signup') {
        errors = validateSignupForm();
    } else if (form.id === 'form-login') {
        errors = validateLoginForm();
        // Redirigir si no hay errores
        if (errors.length === 0) {
            window.location.href = "main_page_user.html";
            return;
        }
    } else if (form.id === 'form-edit') {
        errors = validateEditDataForm();
    }

    if (errors.length > 0) {
        error_message.innerText = errors.join(". ");
    }
});

// Función para validar el campo vacío o nulo
function validateField(input, message) {
    if (!input || !input.value || input.value.trim() === '') {
        input?.parentElement.classList.add('incorrect');
        return message;
    }
    return null;
}

// Validación para el formulario de registro
function validateSignupForm() {
    const errors = [];
    errors.push(
        validateField(firstname_input, 'Nombre es requerido'),
        validateField(email_input, 'Email es requerido'),
        validateField(password_input, 'Contraseña es requerida'),
        validateField(identification_input, 'Cédula es requerida'),
        validateField(telephone_input, 'Teléfono es requerido'),
        validateField(wallet_input, 'Billetera es requerida'),
        validateField(work_area_input, 'Área de trabajo es requerida')
    );

    if (password_input?.value.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
        password_input.parentElement.classList.add('incorrect');
    }

    if (password_input?.value !== repeat_password_input?.value) {
        errors.push('Las contraseñas no coinciden');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors.filter(error => error !== null);
}

// Validación para el formulario de inicio de sesión
function validateLoginForm() {
    const errors = [];
    errors.push(
        validateField(email_input, 'El correo electrónico es requerido'),
        validateField(password_input, 'La contraseña es requerida')
    );

    if (password_input && password_input.value.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors.filter(error => error !== null);
}

// Validación para el formulario de edición de datos
function validateEditDataForm() {
    const errors = [];
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

// Limpiar mensajes de error y clases incorrectas al modificar los campos
const allInputs = [firstname_input, email_input, password_input, repeat_password_input, identification_input, telephone_input, wallet_input, work_area_input]
  .filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.parentElement.classList.remove('incorrect');
        error_message.innerText = '';
    });
});
