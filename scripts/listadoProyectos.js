const cardsData = [
    {
        titulo: "Plataforma Educativa de Realidad Virtual",
        descripcion:
            "Una plataforma que permite a los estudiantes aprender usando simulaciones de realidad virtual.",
        recaudado: 254516.0,
        totalRecaudar: 500000.0,
        fecha: "2025-12-01"
    },
    {
        titulo: "Laboratorio de Ciencias Interactivo",
        descripcion:
            "Desarrollo de un laboratorio en el que los estudiantes pueden experimentar sin riesgos.",
        recaudado: 135000.0,
        totalRecaudar: 200000.0,
        fecha: "2025-06-01"
    },
    {
        titulo: "Biblioteca Digital para Todos",
        descripcion:
            "Acceso a una amplia gama de libros y recursos educativos en formato digital.",
        recaudado: 78000.0,
        totalRecaudar: 150000.0,
        fecha: "2025-09-01"
    },
    {
        titulo: "Aplicación de Aprendizaje de Idiomas con IA",
        descripcion:
            "App que utiliza inteligencia artificial para personalizar el aprendizaje de idiomas basado en el ritmo del estudiante.",
        recaudado: 95000.0,
        totalRecaudar: 180000.0,
        fecha: "2025-11-15"
    },
    {
        titulo: "Sistema de Tutoría Automatizada",
        descripcion:
            "Un sistema que conecta a los estudiantes con tutores virtuales basados en inteligencia artificial para reforzar su aprendizaje.",
        recaudado: 120000.0,
        totalRecaudar: 250000.0,
        fecha: "2025-08-01"
    },
    {
        titulo: "Jardín Botánico en Realidad Aumentada",
        descripcion:
            "Una experiencia educativa donde los estudiantes pueden explorar plantas y ecosistemas en un entorno de realidad aumentada.",
        recaudado: 60000.0,
        totalRecaudar: 120000.0,
        fecha: "2025-10-10"
    },
    {
        titulo: "Simulador de Historia Interactivo",
        descripcion:
            "Plataforma que permite a los estudiantes sumergirse en eventos históricos y aprender de manera inmersiva.",
        recaudado: 142000.0,
        totalRecaudar: 300000.0,
        fecha: "2025-07-20"
    },
    {
        titulo: "Tutoría para Programación Colaborativa",
        descripcion:
            "Herramienta en línea que facilita la programación en grupo y la tutoría entre pares para mejorar habilidades de codificación.",
        recaudado: 110000.0,
        totalRecaudar: 200000.0,
        fecha: "2025-05-30"
    },
    {
        titulo: "Portal de Noticias para Niños",
        descripcion:
            "Un sitio web que presenta noticias y acontecimientos actuales de manera apropiada para niños, con contenido educativo.",
        recaudado: 50000.0,
        totalRecaudar: 100000.0,
        fecha: "2025-09-15"
    },
    {
        titulo: "Curso de STEM para Zonas Rurales",
        descripcion:
            "Programa educativo para llevar cursos de ciencia, tecnología, ingeniería y matemáticas a estudiantes de zonas rurales.",
        recaudado: 180000.0,
        totalRecaudar: 300000.0,
        fecha: "2025-12-05"
    }
];




document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cards-container");
    console.log(cardsContainer);

    cardsData.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

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
                    <button class="btn donar-btn" onclick="openModal()">Donar</button>
                    <button class="btn detalles-btn" onclick="openModal()">Detalles</button>
                </div>
            </div>
        `;

        cardsContainer.appendChild(cardElement);
    });

    function openModal() {
        document.getElementById("modal").style.display = "flex";
    }

    window.onclick = function (event) {
        const modal = document.getElementById("modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
