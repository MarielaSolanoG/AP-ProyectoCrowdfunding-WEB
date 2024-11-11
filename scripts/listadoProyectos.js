let projectData = [];
let usuario =[];

// Load projects data on page load
document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Fetch all projects using getProyectos()
        const proyectos = await getProyectos();

        if (proyectos && Array.isArray(proyectos)) {
            // Populate projectData with the fetched projects, converting strings to numbers
            projectData = proyectos.map(proyecto => ({
                id: proyecto.id,
                titulo: proyecto.nombre_proyecto || 'Título no disponible',
                descripcion: proyecto.descripcion || 'Descripción no disponible',
                recaudado: proyecto.monto_recaudado ? Number(proyecto.monto_recaudado) : 0, // Convert to number and default to 0 if NaN
                totalRecaudar: proyecto.objetivo_financiacion ? Number(proyecto.objetivo_financiacion) : 1, // Convert to number and default to 1 to avoid division by zero
                fecha: proyecto.fecha_limite ? formatDate(proyecto.fecha_limite) : 'Fecha no disponible',
                creacion: proyecto.fecha_creacion ? formatDate(proyecto.fecha_creacion) : 'Creación no disponible',
                imagenURL: proyecto.imagenes_videos || 'https://via.placeholder.com/150',
                categoriaID: proyecto.categoria_id,
                categoria: proyecto.nombre_categoria,
                creadorID: proyecto.id_usuario,
                creadorNombre: null
            }));

            // Render the cards
            const cardsContainer = document.getElementById("cards-container");
            cardsContainer.innerHTML = ''; // Clear container before appending new data
            projectData.forEach((card) => {
                const progressPercentage = (card.recaudado / card.totalRecaudar) * 100;

                const cardElement = document.createElement("div");
                cardElement.classList.add("card");

                cardElement.innerHTML = `
                    <h2 class="cardTitulo">${card.titulo}</h2>
                    <p class="cardDescription">${card.descripcion}</p>
                    <div>
                        <div>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${progressPercentage}%"></div>
                                <span class="progress-text">$${card.recaudado.toFixed(2)} de $${card.totalRecaudar.toFixed(2)}</span>
                            </div>
                            <p class="cardDueDate"><b>Fecha límite de recaudación:</b> ${card.fecha}</p>
                        </div>
                        <div>
                            <button class="btn donar-btn" onclick='openDonationModal(${card.id})'>Donar</button>
                            <button class="btn detalles-btn" onclick='detalles_openModal(${card.id})'>Detalles</button>
                        </div>
                    </div>
                `;

                cardsContainer.appendChild(cardElement);
            });

            // Add event listeners to donation buttons
            createDonationButtons();
            updateProjectData();
        } else {
            console.error("No projects found or response is not an array.");
        }
    } catch (error) {
        console.error("Failed to load projects:", error);
    }
});


async function updateProjectData() {
    const usuarios = await getUsuarios();
    let listUsuarios = [];

    if (usuarios && Array.isArray(usuarios)) {
        listUsuarios = usuarios.map(usuario => ({
            id: usuario.id,
            area_trabajo: usuario.area_trabajo,
            cartera_digital: usuario.cartera_digital ? Number(usuario.cartera_digital) : 0,
            estado: usuario.estado,
            nombre_completo: usuario.nombre_completo,  // Correct property here
            rol: usuario.rol,
            telefono: usuario.telefono,
            correo_electronico: usuario.correo_electronico,
            fecha_registro: usuario.fecha_registro
        }));
    }
    //console.log(listUsuarios);
    projectData.forEach(project => {
        const user = listUsuarios.find(userTemp => userTemp.id === project.creadorID);
        if (user) {
            project.creadorNombre = user.nombre_completo; // Use nombre_completo here
        }
    });

    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');

    if (loggedInUserEmail) {
        usuario = listUsuarios.find(userTemp => userTemp.correo_electronico === loggedInUserEmail);
        //const user = Object.values(usersData).find(user => user.email === loggedInUserEmail);
    }
    else {
        usuario = listUsuarios.find(userTemp => userTemp.correo_electronico === "wayne.b@estudiantec.cr");
        console.log(usuario);
    }
}

// JS actualizado con prefijo detalles_ solo en el modal

function detalles_openModal(id) {
    // Busca el proyecto por ID
    const card = projectData.find(card => card.id === id);
    if (!card) {
        console.error("Proyecto no encontrado");
        return;
    }

    const progressPercentage = (card.recaudado / card.totalRecaudar) * 100;

    // Asigna los valores a los elementos del modal
    document.getElementById("detalles_modal-title").textContent = card.titulo;
    document.getElementById("detalles_modal-description").textContent = card.descripcion;
    document.getElementById("detalles_modal-progress-bar").style.width = progressPercentage + '%';
    document.getElementById("detalles_modal-progress-text").textContent = `$${card.recaudado.toFixed(2)} de $${card.totalRecaudar.toFixed(2)}`;
    document.getElementById("detalles_modal-date").textContent = card.fecha;
    document.getElementById("detalles_modal-creator").textContent = card.creadorNombre;
    document.getElementById("detalles_modal-category").textContent = card.categoria;
    document.getElementById("detalles_modal-created-date").textContent = card.creacion || 'N/A';
    document.getElementById("detalles_modal-image").src = card.imagenURL;

    document.getElementById("detalles_modal").style.display = "flex";
}

function detalles_closeModal() {
    document.getElementById("detalles_modal").style.display = "none";
}

// Modifica la parte de creación de botones solo para el botón de detalles
// document.addEventListener("DOMContentLoaded", function () {
//     const cardsContainer = document.getElementById("cards-container");
//
//     projectData.forEach((card) => {
//         const cardElement = document.createElement("div");
//         cardElement.classList.add("card"); // Sin prefijo para la clase de la tarjeta
//
//         const progressPercentage = (card.recaudado / card.totalRecaudar) * 100;
//
//         cardElement.innerHTML = `
//             <h2 class="cardTitulo">${card.titulo}</h2>
//             <p class="cardDescription">${card.descripcion}</p>
//             <div>
//                 <div >
//                     <div class="progress-bar">
//                         <div class="progress" style="width: ${progressPercentage}%"></div>
//                         <span class="progress-text">$${card.recaudado.toFixed(2)} de $${card.totalRecaudar.toFixed(2)}</span>
//                     </div>
//                     <p class="cardDueDate"><b>Fecha límite de recaudación:</b> ${card.fecha}</p>
//                 </div>
//                 <div >
//                     <button class="btn donar-btn" onclick='openDonationModal()'>Donar</button>
//                     <button class="btn detalles-btn" onclick='detalles_openModal(${card.id})'>Detalles</button>
//                 </div>
//             </div>
//         `;
//
//         cardsContainer.appendChild(cardElement);
//     });
//
//     // Cierra el modal al hacer clic fuera de él
//     window.onclick = function (event) {
//         const modal = document.getElementById("detalles_modal");
//         if (event.target === modal) {
//             modal.style.display = "none";
//         }
//     };
// });


/* ------------------------------ MODAL DONACIONES ------------------------------ */
// Función para abrir el modal de donaciones con detalles del proyecto
function openDonationModal(id) {
    // Busca el proyecto por ID
    const card = projectData.find(card => card.id === id);
    if (!card) {
        console.error("Proyecto no encontrado");
        return;
    }

    // Asigna los valores a los elementos del modal
    document.getElementById("donation-modal-title").textContent = `Donación para: ${card.titulo}`;
    document.getElementById("donation-modal-description").textContent = card.descripcion;
    document.getElementById("donation-modal-progress").style.width = (card.recaudado / card.totalRecaudar) * 100 + '%';
    document.getElementById("donation-modal-progress-text").textContent = `$${card.recaudado.toFixed(2)} de $${card.totalRecaudar.toFixed(2)}`;
    document.getElementById("donation-modal-deadline").textContent = `Fecha límite: ${card.fecha}`;

    // Carga valores por defecto a los campos
    document.getElementById("donation-modal-donorName").value = usuario.nombre_completo;
    document.getElementById("donation-modal-donorEmail").value = usuario.correo_electronico;
    document.getElementById("donation-modal-donorPhone").value = usuario.telefono;
    document.getElementById("donation-modal-donorFunds").value = `$${usuario.cartera_digital}`;

    document.getElementById("donation-modal").style.display = "flex";
}

// Función para cerrar el modal
function closeDonationModal() {
    document.getElementById("donation-modal").style.display = "none";
}

// Agrega event listeners a los botones de donación
function createDonationButtons() {
    document.querySelectorAll('.btn.donar-btn').forEach((button, index) => {
        button.addEventListener('click', () => {
            openDonationModal(projectData[index].id);
        });
    });
}

/* ------------------------------ MODAL DONACIONES ------------------------------ */


function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options); // Using Spanish locale for month names in Spanish
}