// Llama a la API para obtener proyectos por usuario y llena el selector
async function populateProjectSelect() {
    const projectSelect = document.getElementById("project-select");
    try {
        const loggedInUserId = sessionStorage.getItem('loggedInUserId');
        const proyectos = await getProyectosById(loggedInUserId); // Llama a la API
        proyectos.forEach(proyecto => {
            const option = document.createElement("option");
            option.value = proyecto.id;
            option.textContent = proyecto.nombre_proyecto;
            projectSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al obtener los proyectos:", error);
    }
}

// Función que rellena el formulario al seleccionar un proyecto
function handleProjectSelection() {
    const projectSelect = document.getElementById("project-select");

    projectSelect.addEventListener("change", async function() {
        const projectId = projectSelect.value;
        console.log("ID del proyecto seleccionado:", projectId);  // Verifica que el ID esté correcto
        const proyectos = await getProyectosById(sessionStorage.getItem('loggedInUserId'));
        const proyectoSeleccionado = proyectos.find(proyecto => proyecto.id == projectId);
    
        if (proyectoSeleccionado) {
            console.log("Proyecto seleccionado:", proyectoSeleccionado);  // Verifica que el proyecto sea el correcto
            document.getElementById("project-name-edit").value = proyectoSeleccionado.nombre_proyecto;
            document.getElementById("description-edit").value = proyectoSeleccionado.descripcion;
            document.getElementById("objective-edit").value = proyectoSeleccionado.objetivo_financiacion;
            document.getElementById("date-edit").value = proyectoSeleccionado.fecha_limite.split('T')[0];
            document.getElementById("area-edit").value = proyectoSeleccionado.categoria_id;
        } else {
            console.error("No se encontró el proyecto seleccionado");
        }
    });
}


// Función que carga los datos del usuario logueado desde sessionStorage
async function loadLoggedInUser() {
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const user = await getUsuarioById(loggedInUserId);

        if (user) {
            document.getElementById("firstname-input").value = user.nombre_completo;
            document.getElementById("telephone-input").value = user.telefono;
            document.getElementById("wallet-input").value = user.cartera_digital;
            document.getElementById("work-area-input").value = user.area_trabajo;
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
    populateProjectSelect(); // Poblar el selector de proyectos
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

