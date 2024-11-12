// Base URL del backend
const baseUrl = "https://backendproyap-production.up.railway.app";

// Obtener elementos del DOM
const tableBody = document.getElementById('projects-tbody');
const searchInput = document.getElementById('search-input');
const errorMessage = document.getElementById('error-message');
const returnBtn = document.getElementById('return_btn');

let proyectos = []; // Lista de proyectos

// Función para obtener la lista de proyectos desde la API
async function getProyectos() {
    try {
        const response = await fetch(`${baseUrl}/getProyectos`);
        if (!response.ok) throw new Error('Error al obtener proyectos');
        return await response.json();
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        return [];
    }
}

// Función para cargar todos los proyectos
async function cargarProyectos() {
    proyectos = await getProyectos();

    if (proyectos.length === 0) {
        errorMessage.textContent = 'No se encontraron proyectos';
        errorMessage.classList.remove('hidden');
        return;
    }

    actualizarTabla();
}

// Función para actualizar la tabla de proyectos
function actualizarTabla(filteredProjects = proyectos) {
    tableBody.innerHTML = '';

    filteredProjects.forEach((proyecto) => {
        const row = document.createElement('tr');

        // Crear columna para el nombre del proyecto
        const nameCell = document.createElement('td');
        nameCell.textContent = proyecto.nombre_proyecto;
        row.appendChild(nameCell);

        // Crear botón de "Detalles"
        const actionCell = document.createElement('td');
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Detalles';
        detailsButton.classList.add('purple-button');

        // Evento para redirigir a detallesProyecto.html con el ID correcto del proyecto
        detailsButton.addEventListener('click', () => {
            if (proyecto.id) {
                window.location.href = `detallesProyecto.html?id=${encodeURIComponent(proyecto.id)}`;
            } else {
                console.error('ID del proyecto no encontrado');
            }
        });

        actionCell.appendChild(detailsButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

// Función para manejar la búsqueda en tiempo real
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProjects = proyectos.filter(proyecto =>
        proyecto.nombre_proyecto.toLowerCase().includes(searchTerm)
    );
    actualizarTabla(filteredProjects);
});

// Inicializar la carga de proyectos
document.addEventListener('DOMContentLoaded', () => {
    cargarProyectos();

    returnBtn.addEventListener('click', () => {
        window.location.href = "main_page_adm.html";
    });
});
