// Base URL del backend
const baseUrl = "https://backendproyap-production.up.railway.app";

// Obtener elementos del DOM
const tableBody = document.getElementById('donations-tbody');
const errorMessage = document.getElementById('error-message');
const returnBtn = document.getElementById('return_btn');

let donaciones = []; // Lista de donaciones

// Función para obtener todas las donaciones desde el endpoint
async function fetchDonations() {
    try {
        const response = await fetch(`${baseUrl}/getDonaciones`);
        if (!response.ok) throw new Error('Error en la solicitud');

        donaciones = await response.json();
        if (donaciones && Array.isArray(donaciones)) {
            actualizarTabla(donaciones);
        } else {
            mostrarError('No se encontraron donaciones');
        }
    } catch (error) {
        console.error('Error al obtener las donaciones:', error);
        mostrarError('Error al obtener las donaciones');
    }
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorMessage.classList.remove('hidden');
}

// Función para actualizar la tabla de donaciones
function actualizarTabla(donacionesFiltradas = donaciones) {
    tableBody.innerHTML = '';

    donacionesFiltradas.forEach((donacion, index) => {
        const row = document.createElement('tr');
        row.style.backgroundColor = index % 2 === 0 ? '#F3F0FF' : 'white';

        // Crear columnas para donante, proyecto y monto donado
        row.innerHTML = `
            <td>${donacion.nombre_usuario}</td>
            <td>${donacion.nombre_proyecto}</td>
            <td>₡${Number(donacion.monto_donado).toLocaleString()}</td>
        `;

        tableBody.appendChild(row);
    });

    // Iniciar DataTable para aplicar los filtros
    $('#donations-table').DataTable({
        destroy: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
        }
    });
}

// Inicializar eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchDonations();

    // Botón de "Regresar"
    returnBtn.addEventListener('click', () => {
        window.location.href = "main_page_adm.html";
    });
});
