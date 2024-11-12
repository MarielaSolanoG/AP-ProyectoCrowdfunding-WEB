// Base URL del backend
const baseUrl = "https://backendproyap-production.up.railway.app";

// Obtener elementos del DOM
const projectsCountElement = document.getElementById('projects-count');
const donationsCountElement = document.getElementById('donations-count');
const usersCountElement = document.getElementById('users-count');
const errorMessage = document.getElementById('error-message');
const returnBtn = document.getElementById('return_btn');

// Función para obtener las estadísticas desde la API
async function fetchStatistics() {
    try {
        // Realiza la petición al endpoint para obtener las estadísticas
        const response = await fetch(`${baseUrl}/getEstadisticas`);
        if (!response.ok) throw new Error('Error en la solicitud');

        const stats = await response.json();

        if (stats && stats.length > 0) {
            // Mostrar las estadísticas en los elementos correspondientes
            const data = stats[0];
            projectsCountElement.textContent = data.Cantidad_Proyectos || '0';
            donationsCountElement.textContent = data.Cantidad_Donaciones || '0';
            usersCountElement.textContent = data.Cantidad_Usuarios_Activos || '0';
        } else {
            errorMessage.textContent = 'No se encontraron estadísticas';
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
        errorMessage.textContent = 'Error al obtener las estadísticas';
        errorMessage.classList.remove('hidden');
    }
}

// Inicializar eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchStatistics();

    // Botón de "Regresar"
    returnBtn.addEventListener('click', () => {
        window.location.href = "main_page_adm.html";
    });
});
