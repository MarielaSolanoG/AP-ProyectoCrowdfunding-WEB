const cardsData = [
    {
        id: 1,
        titulo: "Plataforma Educativa de Realidad Virtual",
        descripcion: "Una plataforma que permite a los estudiantes aprender usando simulaciones de realidad virtual.",
        recaudado: 254516.0,
        totalRecaudar: 500000.0,
        fecha: "2025-12-01",
        imagenURL: "https://images.unsplash.com/photo-1522444195799-478538b28823?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Educación",
        creadorNombre: "Juan Pérez"
    },
    {
        id: 2,
        titulo: "Laboratorio de Ciencias Interactivo",
        descripcion: "Desarrollo de un laboratorio en el que los estudiantes pueden experimentar sin riesgos.",
        recaudado: 135000.0,
        totalRecaudar: 200000.0,
        fecha: "2025-06-01",
        imagenURL: "https://images.unsplash.com/photo-1522444195799-478538b28823?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Ciencias",
        creadorNombre: "Ana Gómez"
    },
    {
        id: 3,
        titulo: "Biblioteca Digital para Todos",
        descripcion: "Acceso a una amplia gama de libros y recursos educativos en formato digital.",
        recaudado: 78000.0,
        totalRecaudar: 150000.0,
        fecha: "2025-09-01",
        imagenURL: "https://images.unsplash.com/photo-1522444195799-478538b28823?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Educación",
        creadorNombre: "Carlos Rodríguez"
    },
    {
        id: 4,
        titulo: "Aplicación de Aprendizaje de Idiomas con IA",
        descripcion: "App que utiliza inteligencia artificial para personalizar el aprendizaje de idiomas basado en el ritmo del estudiante.",
        recaudado: 95000.0,
        totalRecaudar: 180000.0,
        fecha: "2025-11-15",
        imagenURL: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Tecnología",
        creadorNombre: "Laura Sánchez"
    },
    {
        id: 5,
        titulo: "Sistema de Tutoría Automatizada",
        descripcion: "Un sistema que conecta a los estudiantes con tutores virtuales basados en inteligencia artificial para reforzar su aprendizaje.",
        recaudado: 120000.0,
        totalRecaudar: 250000.0,
        fecha: "2025-08-01",
        imagenURL: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Educación",
        creadorNombre: "María López"
    },
    {
        id: 6,
        titulo: "Jardín Botánico en Realidad Aumentada",
        descripcion: "Una experiencia educativa donde los estudiantes pueden explorar plantas y ecosistemas en un entorno de realidad aumentada.",
        recaudado: 60000.0,
        totalRecaudar: 120000.0,
        fecha: "2025-10-10",
        imagenURL: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Ciencias",
        creadorNombre: "Felipe Martínez"
    },
    {
        id: 7,
        titulo: "Simulador de Historia Interactivo",
        descripcion: "Plataforma que permite a los estudiantes sumergirse en eventos históricos y aprender de manera inmersiva.",
        recaudado: 142000.0,
        totalRecaudar: 300000.0,
        fecha: "2025-07-20",
        imagenURL: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Historia",
        creadorNombre: "José Pérez"
    },
    {
        id: 8,
        titulo: "Tutoría para Programación Colaborativa",
        descripcion: "Herramienta en línea que facilita la programación en grupo y la tutoría entre pares para mejorar habilidades de codificación.",
        recaudado: 110000.0,
        totalRecaudar: 200000.0,
        fecha: "2025-05-30",
        imagenURL: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Tecnología",
        creadorNombre: "Raúl González"
    },
    {
        id: 9,
        titulo: "Portal de Noticias para Niños",
        descripcion: "Un sitio web que presenta noticias y acontecimientos actuales de manera apropiada para niños, con contenido educativo.",
        recaudado: 50000.0,
        totalRecaudar: 100000.0,
        fecha: "2025-09-15",
        imagenURL: "https://images.unsplash.com/photo-1522444195799-478538b28823?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "Educación",
        creadorNombre: "Sofía González"
    },
    {
        id: 10,
        titulo: "Curso de STEM para Zonas Rurales",
        descripcion: "Programa educativo para llevar cursos de ciencia, tecnología, ingeniería y matemáticas a estudiantes de zonas rurales.",
        recaudado: 180000.0,
        totalRecaudar: 300000.0,
        fecha: "2025-12-05",
        imagenURL: "https://images.unsplash.com/photo-1522444195799-478538b28823?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoria: "STEM",
        creadorNombre: "Luis Pérez"
    }
];



// JS actualizado con prefijo detalles_ solo en el modal

function detalles_openModal(id) {
    // Busca el proyecto por ID
    const card = cardsData.find(card => card.id === id);
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
document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cards-container");

    cardsData.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card"); // Sin prefijo para la clase de la tarjeta

        const progressPercentage = (card.recaudado / card.totalRecaudar) * 100;

        cardElement.innerHTML = `
            <h2 class="cardTitulo">${card.titulo}</h2>
            <p class="cardDescription">${card.descripcion}</p>
            <div>
                <div class="cardMiddleSection">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${progressPercentage}%"></div>
                        <span class="progress-text">$${card.recaudado.toFixed(2)} de $${card.totalRecaudar.toFixed(2)}</span>
                    </div>
                    <p class="cardDueDate"><b>Fecha límite de recaudación:</b> ${card.fecha}</p>
                </div>
                <div class="cardActionButtons">
                    <button class="btn donar-btn">Donar</button>
                    <button class="btn detalles-btn" onclick='detalles_openModal(${card.id})'>Detalles</button>
                </div>
            </div>
        `;

        cardsContainer.appendChild(cardElement);
    });

    // Cierra el modal al hacer clic fuera de él
    window.onclick = function (event) {
        const modal = document.getElementById("detalles_modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});