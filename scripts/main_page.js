
// Función que rellena el formulario al seleccionar un proyecto
function handleProjectSelection() {
    const projectSelect = document.getElementById("project-select");

    projectSelect.addEventListener("change", function() {
        const projectId = projectSelect.value;
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

// Función que carga los datos del usuario logueado desde sessionStorage
function loadLoggedInUser() {
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');

    if (loggedInUserEmail) {
        const user = Object.values(usersData).find(user => user.email === loggedInUserEmail);

        if (user) {
            document.getElementById("firstname-input").value = user.firstname;
            document.getElementById("identification-input").value = user.identification;
            document.getElementById("telephone-input").value = user.telephone;
            document.getElementById("wallet-input").value = user.wallet;
            document.getElementById("work-area").value = user.workArea;
        }
    }
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

// Inicialización de los eventos una vez que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    handleFileUpload();
    handleProjectSelection(); // Llamada para inicializar la selección del proyecto
    loadLoggedInUser();
});

// Script en main_page_user.html para mostrar el formulario correcto
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('form');

    const links = [
        { link: document.getElementById('account-settings-link'), form: document.getElementById('wrapper-data-edit') },
        { link: document.getElementById('create-projects-link'), form: document.getElementById('wrapper-create-project') },
        { link: document.getElementById('edit-projects-link'), form: document.getElementById('wrapper-edit-project') },
    ];

    if (formId) {
        const formToShow = document.getElementById(formId);
        if (formToShow) {

            links.forEach(item => {
                item.form.classList.add('hidden'); // Añade la clase 'hidden' para ocultar cada formulario
            });

            formToShow.classList.toggle('hidden'); // Alterna la visibilidad del formulario
        }
    }
});

