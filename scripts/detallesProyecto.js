// Base URL del backend
const baseUrl = "https://backendproyap-production.up.railway.app";

// Obtener el contenedor de los detalles del proyecto
const projectDetailsContainer = document.getElementById('project-details');
const returnBtn = document.getElementById('return_btn');

// Función para obtener el ID del proyecto desde la URL
function getProjectIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    console.log("ID del proyecto obtenido de la URL:", projectId); // Debug
    return projectId;
}

// Función para obtener los detalles del proyecto usando el endpoint
// Función para obtener los detalles del proyecto usando el endpoint
async function getProjectDetails(id) {
    try {
        const url = `${baseUrl}/getProyecto/${id}`;
        console.log(`Obteniendo detalles del proyecto desde: ${url}`); // Debug
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al obtener datos: ${response.statusText}`);
        }

        const proyectoArray = await response.json();
        console.log("Datos del proyecto obtenidos:", proyectoArray); // Debug

        // Asegúrate de que la respuesta sea un array y tenga al menos un objeto
        if (Array.isArray(proyectoArray) && proyectoArray.length > 0) {
            const proyecto = proyectoArray[0]; // Obtener el primer objeto del array
            displayProjectDetails(proyecto);
        } else {
            projectDetailsContainer.textContent = 'No se encontraron detalles para este proyecto.';
        }
    } catch (error) {
        console.error('Error al obtener los detalles del proyecto:', error);
        projectDetailsContainer.textContent = 'Error al obtener los detalles del proyecto.';
    }
}


// Función para mostrar los detalles en la página
function displayProjectDetails(proyecto) {
    const content = `
        <h2>${proyecto.nombre_proyecto}</h2>
        <p><strong>Usuario:</strong> ${proyecto.nombre_usuario}</p>
        <p><strong>Descripción:</strong> ${proyecto.descripcion}</p>
        <p><strong>Objetivo de Financiación:</strong> ₡${Number(proyecto.objetivo_financiacion).toLocaleString()}</p>
        <p><strong>Monto Recaudado:</strong> ₡${Number(proyecto.monto_recaudado).toLocaleString()}</p>
        <p><strong>Fecha Límite:</strong> ${new Date(proyecto.fecha_limite).toLocaleDateString('es-ES')}</p>
        <p><strong>Categoría:</strong> ${proyecto.nombre_categoria}</p>
        <img src="${proyecto.imagenes_videos}" alt="Imagen del proyecto" style="max-width: 100%; height: auto;">
    `;
    projectDetailsContainer.innerHTML = content;
}

// Inicializar eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const projectId = getProjectIdFromURL();
    if (projectId) {
        getProjectDetails(projectId);
    } else {
        projectDetailsContainer.textContent = 'ID de proyecto no válido.';
    }

    returnBtn.addEventListener('click', () => {
        window.location.href = "admVerProyectos.html";
    });
});
