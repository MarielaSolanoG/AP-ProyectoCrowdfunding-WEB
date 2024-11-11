document.addEventListener('DOMContentLoaded', function() {
    // Selección de formularios y elementos de entrada comunes
    const form = document.getElementById('form-signup') || document.getElementById('form-login');
    const formCreateProject = document.getElementById('form-create-project');
    const formEditProject = document.getElementById('form-edit-project');
    const formEditDataUser = document.getElementById('form-edit');
    const createProjectButton = document.getElementById('create-project'); // Selecciona el botón específico
    
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
    const areaInput = document.getElementById('area');
    // Captura el archivo seleccionado
    const fileInput = document.getElementById('file-input');
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
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let errors = [];

            if (form.id === 'form-signup') {
                errors = validateSignupForm();
                // si no hay errores
                if (errors.length === 0) {
                    // Si no hay errores, preparar los datos del usuario
                    const userData = {
                        nombre_completo: firstnameInput.value,  
                        cedula: identificationInput.value,
                        correo_electronico: emailInput.value,
                        area_trabajo: workAreaInput.value,
                        cartera_digital: walletInput.value,
                        telefono: telephoneInput.value,
                        contrasena: passwordInput.value,
                        rol: 2
                    };
                    try {
                        // Llamar a la función insertUsuario para insertar el usuario
                        const response = await insertUsuario(userData);
        
                        // Verificar si la respuesta es un texto
                        if (typeof response === 'string') {
                            // Si es un mensaje de texto, se muestra
                            alert(response); // Puede ser "Usuario insertado" o un error}
                            console.log(response);
                            if (response === 'Usuario insertado') {
                                form.reset(); // Limpia el formulario después de un envío exitoso
                            }
                        } else if (response.ok) {
                            // Si la respuesta es un objeto y la propiedad ok existe
                            alert('Proyecto insertado con éxito');
                            formCreateProject.reset(); // Limpia el formulario después de un envío exitoso
                        } else {
                            // En caso de que la respuesta no sea lo esperado
                            alert('Error desconocido al insertar el proyecto');
                        }
                    } catch (error) {
                        alert('Error en la solicitud: ' + error.message);
                    }
                }
                
            } else if (form.id === 'form-login') {
                errors = validateLoginForm();
                // si no hay errores
                if (errors.length === 0) {
                    try {
                        // Llamar a la función login para validar el inicio de sesión
                        const response = await login(emailInput.value, passwordInput.value);
                        console.log(emailInput.value);
                        console.log(passwordInput.value);
                        // Verifica la respuesta
                        if (response) {
                            // Si el inicio de sesión es exitoso
                            console.log("Inicio de sesión exitoso");

                            const userId = response[0].id;
                            const userEmail = response[0].correo_electronico;
                            // Guarda el id y el correo electrónico en sessionStorage
                            sessionStorage.setItem('loggedInUserId', userId);
                            sessionStorage.setItem('loggedInUserEmail', userEmail);
                            
                            // Redirige al usuario a la página principal
                            window.location.href = "main_page_user.html";
                        } else {
                            // Si la respuesta no tiene los datos esperados (id o correo_electronico)
                            errorMessage.classList.add('error-message');
                            errorMessage.innerText = "Correo electrónico o contraseña incorrectos";
                        }
                    } catch (error) {
                        // Manejar errores de la solicitud
                        console.log('Error al intentar iniciar sesión: ' + error.message);
                    }
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

   

    // Verificar si el formulario de crear proyecto y el botón están presentes antes de agregar el eventListener
    if (formCreateProject && createProjectButton) {
        createProjectButton.addEventListener('click', async (e) => {
            e.preventDefault(); // Evita el comportamiento predeterminado del botón
    
            // Realizar la validación del formulario
            let errors = validateCreateProject();
            console.log('Edit Create Errors:', errors); // Depuración
    
            if (errors.length > 0) {
                // Muestra los mensajes de error si hay algún problema en la validación
                errorMessageCreate.classList.add('error-message');
                errorMessageCreate.innerText = errors.join(". ");
            } else {
                // Si no hay errores, preparar los datos del proyecto
                const loggedInUserId = sessionStorage.getItem('loggedInUserId');
                let filePath = "";

                if (fileInput && fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const projectImagePath = 'assets/images/'; 
                    filePath = projectImagePath + file.name; 
                }

                alert("Ruta completa del archivo en el proyecto: " + filePath);
                const projectData = {
                    id_usuario: loggedInUserId,  
                    nombre_proyecto: projectNameInput.value,
                    descripcion: descriptionInput.value,
                    objetivo_financiacion: objectiveInput.value,
                    fecha_limite: dateInput.value,
                    categoria_id: areaInput.value, 
                    imagenes_videos: filePath
                };
    
                try {
                    // Llamar a la función insertProyecto para insertar el proyecto
                    const response = await insertProyecto(projectData);
                    console.log(response); // Depuración para ver el contenido de response
                
                    // Verificar si la respuesta es un texto
                    if (typeof response === 'string') {
                        alert(response); // Puede ser "Proyecto insertado" o un error
                        if (response === 'Proyecto insertado') {
                            formCreateProject.reset(); // Limpia el formulario después de un envío exitoso
                        }
                    } else if (response && response.ok) {
                        // Si la respuesta es un objeto y tiene la propiedad ok
                        alert('Proyecto insertado con éxito');
                        formCreateProject.reset(); // Limpia el formulario después de un envío exitoso
                    } else {
                        // Si la respuesta no es lo esperado
                        alert('Error desconocido al insertar el proyecto');
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
