document.addEventListener('DOMContentLoaded', function() {
    // Selección de formularios y elementos de entrada comunes
    const form = document.getElementById('form-signup') || document.getElementById('form-login');
    const formCreateProject = document.getElementById('form-create-project');
    const formEditProject = document.getElementById('form-edit-project');
    const formEditDataUser = document.getElementById('form-edit');
    
    /* USER */
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const firstnameInput = document.getElementById('firstname-input');
    const identificationInput = document.getElementById('identification-input');
    const telephoneInput = document.getElementById('telephone-input');
    const walletInput = document.getElementById('wallet-input');
    const workAreaInput = document.getElementById('work-area');
    const repeatPasswordInput = document.getElementById('repeat-password-input');
    
    /* PROJECT */
    const projectNameInput = document.getElementById('project-name-input');
    const descriptionInput = document.getElementById('description-input');
    const objectiveInput = document.getElementById('objective-input');
    const dateInput = document.getElementById('date-input');
    const projectNameEdit = document.getElementById('project-name-edit');
    const descriptionEdit = document.getElementById('description-edit');
    const objectiveEdit = document.getElementById('objective-edit');
    const dateEdit = document.getElementById('date-edit');
    
    const errorMessage = document.getElementById('error-message');
    const errorMessageCreate = document.getElementById('error-message-create');
    const errorMessageEditProject = document.getElementById('error-message-edit-project');
    const errorMessageEdit = document.getElementById('error-message-edit');
    
    // Verificar si el formulario está presente antes de agregar el eventListener
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let errors = [];

            if (form.id === 'form-signup') {
                errors = validateSignupForm();
            } else if (form.id === 'form-login') {
                errors = validateLoginForm();
                // Redirigir si no hay errores
                if (errors.length === 0) {
                    const userEmail = emailInput.value;
                    sessionStorage.setItem('loggedInUser', userEmail); // Guarda el correo electrónico del usuario en sessionStorage
                    window.location.href = "main_page_user.html";
                    return;
                }
            }
            if (errors.length > 0) {
                errorMessage.classList.add('error-message');
                errorMessage.innerText = errors.join(". ");
            }else{
                form.submit()
            }
        });
    }

    // Verificar si el formulario de editar proyecto está presente antes de agregar el eventListener
    if (formEditProject) {
        formEditProject.addEventListener('submit', (e) => {
            e.preventDefault();
            let errors = [];
            errors = validateEditProject();
            console.log('Edit Create Errors:', errors); // Depuración
            if (errors.length > 0) {
                errorMessageEditProject.classList.add('error-message');
                errorMessageEditProject.innerText = errors.join(". ");
            }else{
                formEditProject.submit()
            }
        });
    }

    // Verificar si el formulario de crear proyecto está presente antes de agregar el eventListener
    if (formCreateProject) {
        formCreateProject.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Realizar la validación del formulario
            let errors = validateCreateProject();
            console.log('Edit Create Errors:', errors); // Depuración

            if (errors.length > 0) {
                // Muestra los mensajes de error si hay algún problema en la validación
                errorMessageCreate.classList.add('error-message');
                errorMessageCreate.innerText = errors.join(". ");
            } else {
                // Si no hay errores, enviar el formulario a la API
                const projectData = {
                    id_usuario: 2,  
                    nombre_proyecto: projectNameInput.value,
                    descripcion: descriptionInput.value,
                    objetivo_financiacion: objectiveInput.value,
                    fecha_limite: dateInput.value,
                    categoria_id: 1
                };

                try {
                    const response = await fetch('https://backendproyap-production.up.railway.app/insertProyecto', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(projectData)
                    });

                    if (response.ok) {
                        alert('Proyecto insertado con éxito');
                        formCreateProject.reset(); // limpia el formulario después de un envío exitoso
                    } else {
                        const errorText = await response.text();
                        alert('Error al insertar proyecto: ' + errorText);
                    }
                } catch (error) {
                    alert('Error en la solicitud: ' + error.message);
                }
            }
        });
    }


    // Verificar si el formulario de editar datos está presente antes de agregar el eventListener
    if (formEditDataUser) {
        formEditDataUser.addEventListener('submit', (e) => {
            e.preventDefault();
            let errors = [];
            errors = validateEditDataForm();
            console.log('Edit Data User Errors:', errors); // Depuración
            if (errors.length > 0) {
                errorMessageEdit.classList.add('error-message');
                errorMessageEdit.innerText = errors.join(". ");
            }else{
                formEditDataUser.submit()
            }
        });
    }

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
            validateField(firstnameInput, 'Nombre es requerido'),
            validateField(emailInput, 'Email es requerido'),
            validateField(passwordInput, 'Contraseña es requerida'),
            validateField(identificationInput, 'Cédula es requerida'),
            validateField(telephoneInput, 'Teléfono es requerido'),
            validateField(walletInput, 'Billetera es requerida'),
            validateField(workAreaInput, 'Área de trabajo es requerida')
        );

        if (passwordInput?.value.length < 6) {
            errors.push('La contraseña debe tener al menos 6 caracteres');
            passwordInput.parentElement.classList.add('incorrect');
        }

        if (passwordInput?.value !== repeatPasswordInput?.value) {
            errors.push('Las contraseñas no coinciden');
            passwordInput.parentElement.classList.add('incorrect');
            repeatPasswordInput.parentElement.classList.add('incorrect');
        }

        return errors.filter(error => error !== null);
    }

    // Validación para el formulario de inicio de sesión
    function validateLoginForm() {
        const errors = [];
        errors.push(
            validateField(emailInput, 'El correo electrónico es requerido'),
            validateField(passwordInput, 'La contraseña es requerida')
        );

        if (passwordInput && passwordInput.value.length < 6) {
            errors.push('La contraseña debe tener al menos 6 caracteres');
            passwordInput.parentElement.classList.add('incorrect');
        }
        else {
            // Buscar el usuario en `usersData`
            const user = Object.values(usersData).find(user => user.email === emailInput.value);
    
            // Validar que el usuario exista y que la contraseña sea correcta
            if (!user) {
                errors.push("El usuario no existe.");
            } else if (passwordInput.value !== user.password) { 
                errors.push("Contraseña incorrecta.");
            }
        }
    
        return errors.filter(error => error !== null);
    }

    // Validación para el formulario de edición de datos
    function validateEditDataForm() {
        const errors = [];
        errors.push(
            validateField(firstnameInput, 'Nombre es requerido'),
            validateField(identificationInput, 'Cédula es requerida'),
            validateField(telephoneInput, 'Teléfono es requerido'),
            validateField(walletInput, 'Billetera es requerida'),
            validateField(workAreaInput, 'Área de trabajo es requerido')
        );

        return errors.filter(error => error !== null);
    }

    // Validación para el formulario de creación de proyecto
    function validateCreateProject() {
        const errors = [];
        errors.push(
            validateField(projectNameInput, 'Nombre es requerido'),
            validateField(descriptionInput, 'Descripción es requerido'),
            validateField(objectiveInput, 'Objetivo es requerido'),
            validateField(dateInput, 'Fecha es requerida'),
        );

        return errors.filter(error => error !== null);
    }

    

    // Validación para el formulario de edición de proyecto
    function validateEditProject() {
        const errors = [];
        errors.push(
            validateField(projectNameEdit, 'Nombre es requerido'),
            validateField(descriptionEdit, 'Descripción es requerido'),
            validateField(objectiveEdit, 'Objetivo es requerido'),
            validateField(dateEdit, 'Fecha es requerida'),
        );

        return errors.filter(error => error !== null);
    }

    // Limpiar mensajes de error y clases incorrectas al modificar los campos
    const allInputs = [firstnameInput, emailInput, passwordInput, repeatPasswordInput, identificationInput, telephoneInput, walletInput, workAreaInput,
        projectNameInput, descriptionInput, objectiveInput, dateInput, projectNameEdit, descriptionEdit, objectiveEdit, dateEdit]
      .filter(input => input != null);

    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('incorrect');
            // Limpiar los mensajes de error solo si el elemento existe
            if (errorMessage) {
                errorMessage.innerText = '';
            }
            if (errorMessageCreate) {
                errorMessageCreate.innerText = '';
            }
            if (errorMessageEditProject) {
                errorMessageEditProject.innerText = '';
            }
            if (errorMessageEdit) {
                errorMessageEdit.innerText = '';
            }
        });
    });
});
