// Base URL del backend
const baseUrl = "https://backendproyap-production.up.railway.app";

// Obtener elementos del DOM
const projectsCountElement = document.getElementById('projects-count');
const donationsCountElement = document.getElementById('donations-count');
const usersCountElement = document.getElementById('users-count');
const errorMessage = document.getElementById('error-message');
const returnBtn = document.getElementById('return_btn');
let statsChart; // Variable para el gráfico

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
            const projectsCount = data.Cantidad_Proyectos || 0;
            const donationsCount = data.Cantidad_Donaciones || 0;
            const usersCount = data.Cantidad_Usuarios_Activos || 0;

            projectsCountElement.textContent = projectsCount;
            donationsCountElement.textContent = donationsCount;
            usersCountElement.textContent = usersCount;

            // Actualizar el gráfico
            updateChart([projectsCount, donationsCount, usersCount]);
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

// Función para actualizar o crear el gráfico
function updateChart(data) {
    const ctx = document.getElementById('statsChart').getContext('2d');

    if (statsChart) {
        // Actualiza los datos del gráfico existente
        statsChart.data.datasets[0].data = data;
        statsChart.update();
    } else {
        // Crea un nuevo gráfico si no existe
        statsChart = new Chart(ctx, {
            type: 'bar', // Tipo de gráfico (puede ser 'bar', 'line', 'pie', etc.)
            data: {
                labels: ["Proyectos", "Donaciones", "Usuarios Activos"],
                datasets: [{
                    label: "Estadísticas Generales",
                    data: data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
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
