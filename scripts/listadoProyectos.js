let projectData = [];
let usuario =[];
let proyectoId=null; //ID of the open project


/**
 * Loads all projects in cards
 */
document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Fetch all projects using getProyectos()
        const proyectos = await getProyectos();

        if (proyectos && Array.isArray(proyectos)) {
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

            const cardsContainer = document.getElementById("cards-container");
            cardsContainer.innerHTML = ''; // Clear container before appending new data
            projectData.forEach((card) => {
                const progressPercentage = (card.recaudado / card.totalRecaudar) * 100;

                const cardElement = document.createElement("div");
                cardElement.classList.add("card");
                cardElement.setAttribute("data-id", card.id);
                cardElement.innerHTML = `
                    <h2 class="cardTitulo" >${card.titulo}</h2>
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

            updateProjectData();
        } else {
            console.error("No projects found or response is not an array.");
        }
    } catch (error) {
        console.error("Failed to load projects:", error);
    }
});

/**
 * Updates missing details for Details Modal
 * @returns {Promise<void>}
 */
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

    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');

    if (loggedInUserEmail) {
        usuario = listUsuarios.find(userTemp => userTemp.correo_electronico === loggedInUserEmail);
        //const user = Object.values(usersData).find(user => user.email === loggedInUserEmail);
    }
    else {
        usuario = listUsuarios.find(userTemp => userTemp.correo_electronico === "wayne.b@estudiantec.cr");
        //console.log(usuario);
    }
}

/**
 * Opens the Details Modal
 * @param id
 */
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


/* ------------------------------ MODAL DONACIONES ------------------------------ */
// Función para abrir el modal de donaciones con detalles del proyecto
/**
 * Opens the donations modals
 * @param id
 */
function openDonationModal(id) {
    // Busca el proyecto por ID
    const card = projectData.find(card => card.id === id);
    if (!card) {
        console.error("Proyecto no encontrado");
        return;
    }


    proyectoId=id;


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

    document.getElementById("donation-modal-donationAmount").value = 0;

    document.getElementById("donation-modal").style.display = "flex";
}

/**
 * Closes donations modal
 */
// Función para cerrar el modal
function closeDonationModal() {
    document.getElementById("donation-modal").style.display = "none";
    proyectoId=null;
}

/**
 * Validates phone for Donation
 * @param email
 * @returns {*|boolean}
 */
// Function to validate email
function isValidEmail(email) {
    return email.includes("@estudiantec.cr") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/**
 * Validates phone for Donation
 * @param phone
 * @returns {boolean}
 */
// Function to validate phone
function isValidPhone(phone) {
    const pattern = /\(\+\d{3}\)\d{8}|\(\+\d{3}\)\d{4}-\d{4}|\+\d{3} \d{8}|\+\d{3} \d{4}-\d{4}|\d{8}|\d{4}-\d{4}|\+\d{10,11}|\+\d{7,10}-\d{4}/;
    return pattern.test(phone);
}


/**
 * Verifies all donation values and inserts into the DB using the API
 * @returns {Promise<void>}
 */
// Function to validate and register donations
async function procesarDonacion() {
    const proyecto = projectData.find(proj => proj.id === proyectoId);

    if (!proyecto) {
        console.error("Proyecto no encontrado");
        Swal.fire('Error', 'Proyecto no encontrado', 'error');
        return;
    }

    const montoDonacion = parseFloat(document.getElementById('donation-modal-donationAmount').value);
    const donorEmail = document.getElementById('donation-modal-donorEmail').value;
    const donorPhone = document.getElementById('donation-modal-donorPhone').value;

    if (!isValidEmail(donorEmail)) {
        Swal.fire('Error', 'El correo electrónico es inválido', 'error');
        return;
    }

    if (!isValidPhone(donorPhone)) {
        Swal.fire('Error', 'El número de teléfono es inválido', 'error');
        return;
    }

    if (isNaN(montoDonacion) || montoDonacion <= 0) {
        Swal.fire('Error', 'Ingrese un monto de donación válido', 'error');
        return;
    }

    try {
        // Verificar si el usuario tiene fondos suficientes usando el API
        const fondosSuficientes = await validarFondosSuficientes(usuario.id, montoDonacion);

        if (!fondosSuficientes) {
            Swal.fire('Fondos insuficientes', 'No tienes suficientes fondos para esta donación', 'error');
            return;
        }

        // Registrar la donación usando el API
        const resultadoDonacion = await insertDonacion(usuario.id, proyecto.id, montoDonacion);

        if (!resultadoDonacion) {
            throw new Error('Error al registrar la donación en el servidor.');
        }

        // Actualiza el monto en la cartera del usuario y la vista del proyecto
        usuario.cartera_digital -= montoDonacion;
        proyecto.recaudado += montoDonacion;
        actualizarVistaProyecto(proyectoId);

        // Mostrar mensaje de éxito
        Swal.fire('Éxito', 'Tu donación ha sido procesada con éxito', 'success');

    } catch (error) {
        console.error('Error durante el procesamiento de la donación:', error);

        // Revertir cambios si hubo un error al registrar la donación
        usuario.cartera_digital += montoDonacion;
        proyecto.recaudado -= montoDonacion;
        actualizarVistaProyecto(proyectoId);

        Swal.fire('Error', 'Hubo un problema al procesar tu donación. Inténtalo de nuevo más tarde.', 'error');
    }
}


/**
 * Updates all the UI based on Donations
 * @param proyectoId
 */
// Función para actualizar la vista de un proyecto
function actualizarVistaProyecto(proyectoId) {
    const proyecto = projectData.find(proj => proj.id === proyectoId);

    if (proyecto) {
        // Actualizar la barra de progreso en el modal de donación
        const progressPercentage = (proyecto.recaudado / proyecto.totalRecaudar) * 100;
        document.getElementById("donation-modal-progress").style.width = progressPercentage + '%';
        document.getElementById("donation-modal-progress-text").textContent = `$${proyecto.recaudado.toFixed(2)} de $${proyecto.totalRecaudar.toFixed(2)}`;

        // Actualizar la barra de progreso en la tarjeta del proyecto
        const cardProgress = document.querySelector(`.card[data-id="${proyectoId}"] .progress-bar .progress`);
        const cardProgressText = document.querySelector(`.card[data-id="${proyectoId}"] .progress-text`);
        if (cardProgress && cardProgressText) {
            cardProgress.style.width = progressPercentage + '%';
            cardProgressText.textContent = `$${proyecto.recaudado.toFixed(2)} de $${proyecto.totalRecaudar.toFixed(2)}`;
        }

        // Actualizar los fondos disponibles del usuario en el modal
        document.getElementById("donation-modal-donorFunds").value = `$${usuario.cartera_digital.toFixed(2)}`;

        // Limpiar el campo de cantidad de donación
        document.getElementById("donation-modal-donationAmount").value = '';
    }
}




/* ------------------------------ MODAL DONACIONES ------------------------------ */

/**
 * Gives DD/MM/YYYY format to dates
 * @param isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options); // Using Spanish locale for month names in Spanish
}





