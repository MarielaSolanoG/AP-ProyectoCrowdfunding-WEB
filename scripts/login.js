const form = document.getElementById('form-login');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message');

// Agregar evento de escucha para la acción de enviar el formulario
form.addEventListener('submit', (e) => {
    // Prevenir el comportamiento por defecto del formulario (evitar que se recargue la página)
    e.preventDefault();
    
    // Limpiar cualquier mensaje de error previo
    error_message.innerText = '';

    // Arreglo para almacenar los mensajes de error
    let errors = [];

    // Validación del campo de correo electrónico
    const email = email_input.value.trim();
    if (email === '') {
        // Si el campo está vacío, agregar un error
        errors.push('El correo electrónico es requerido');
        email_input.parentElement.classList.add('incorrect'); // Marca el campo como incorrecto
    }

    // Validación del campo de contraseña
    const password = password_input.value.trim();
    if (password === '') {
        // Si la contraseña está vacía, agregar un error
        errors.push('La contraseña es requerida');
        password_input.parentElement.classList.add('incorrect');
    } else if (password.length < 6) {
        // Si la contraseña es demasiado corta, agregar un error
        errors.push('La contraseña debe tener al menos 6 caracteres');
        password_input.parentElement.classList.add('incorrect');
    }

    // Si se encontraron errores, mostrar el mensaje de error
    if (errors.length > 0) {
        error_message.innerText = errors.join(". "); // Mostrar todos los errores
    } else {
        // Si no hay errores, redirigir a la página principal del usuario
        window.location.href = "main_page_user.html";
    }
});

// Limpiar los mensajes de error y las clases incorrectas al modificar los campos
email_input.addEventListener('input', () => {
    if (email_input.parentElement) {
        email_input.parentElement.classList.remove('incorrect');
    }
    error_message.innerText = '';
});

password_input.addEventListener('input', () => {
    if (password_input.parentElement) {
        password_input.parentElement.classList.remove('incorrect');
    }
    error_message.innerText = '';
});
