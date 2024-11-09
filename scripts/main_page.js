
// Función que rellena el formulario al seleccionar un proyecto
function handleProjectSelection() {
    const projectSelect = document.getElementById("project-select");

    projectSelect.addEventListener("change", function() {
        const projectId = projectSelect.value;
        console.log(projectId)
        const project = projectsData[projectId];
        console.log(project.name)
        if (project) {
            document.getElementById("project-name-edit").value = project.name;
            document.getElementById("description-edit").value = project.description;
            document.getElementById("objective-edit").value = project.objective;
            document.getElementById("date-edit").value = project.date;
        }
    });
}

// Función que alterna la clase "menu-open" en el elemento <body>
function toggleMenu() {
    document.body.classList.toggle("menu-open");
}

// Función para manejar el botón de carga de archivo
function handleFileUpload() {
    const uploadButton = document.getElementById("upload-btn");
    const fileInput = document.getElementById("file-input");

    uploadButton.addEventListener("click", function() {
        fileInput.click(); // Esto abrirá el explorador de archivos
    });

    // Maneja la selección de archivos
    fileInput.addEventListener("change", function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            console.log("Archivo seleccionado:", files[0].name);
        }
    });
}

// Función para manejar la visibilidad de formularios según el enlace clicado
function handleFormsVisibility() {
    const links = [
        { link: document.getElementById('account-settings-link'), form: document.getElementById('wrapper-data-edit') },
        { link: document.getElementById('create-projects-link'), form: document.getElementById('wrapper-create-project') },
        { link: document.getElementById('edit-projects-link'), form: document.getElementById('wrapper-edit-project') },
    ];

    // Función para ocultar todos los formularios
    function hideAllForms() {
        links.forEach(item => {
            item.form.classList.add('hidden'); // Añade la clase 'hidden' para ocultar cada formulario
        });
    }

    // Asigna el evento a cada enlace
    links.forEach(item => {
        item.link.addEventListener('click', (event) => {
            event.preventDefault();
            hideAllForms(); // Oculta todos los formularios
            item.form.classList.toggle('hidden'); // Muestra el formulario asociado al enlace clicado
        });
    });
}

// Función para manejar el evento de cierre de sesión
function handleLogout() {
    const logoutIcon = document.querySelector('.logout-icon');
    logoutIcon.addEventListener('click', (event) => {
        event.preventDefault();  // Evita el comportamiento predeterminado del enlace
        console.log('Cerrar sesión');
        window.location.href = 'login.html'; // Redirige al login
    });
}

// Inicialización de los eventos una vez que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    handleFileUpload();
    handleFormsVisibility();
    handleLogout();
    handleProjectSelection(); // Llamada para inicializar la selección del proyecto
});
