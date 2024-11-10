// Función que alterna la clase "menu-open" en el elemento <body>
function fn_navHeader_toggleMenu() {
    document.body.classList.toggle("navHeader_menu-open");
}

// Función para manejar la visibilidad de formularios según el enlace clicado
function fn_navHeader_handleFormsVisibility() {
    const links = [
        { nav_option: document.getElementById('account-settings-link'), link:'main_page_user.html',     formId: 'wrapper-data-edit' },
        { nav_option: document.getElementById('create-projects-link'),  link:'main_page_user.html',     formId: 'wrapper-create-project' },
        { nav_option: document.getElementById('edit-projects-link'),    link:'main_page_user.html',     formId: 'wrapper-edit-project' },
        { nav_option: document.getElementById('list-projects-link'),    link:'listadoProyectos.html',   },
        { nav_option: document.getElementById('history-donations-link'),link:'historialDonaciones.html',},
    ];


    // Asigna el evento a cada enlace
    links.forEach(item => {
        item.nav_option.addEventListener('click', (event) => {
            event.preventDefault();
            if (item.formId) window.location.href = `${item.link}?form=${item.formId}`;
            else window.location.href = `${item.link}`;
        });
    });
}


// Función para manejar el evento de cierre de sesión
function fn_navHeader_handleLogout() {
    const logoutIcon = document.querySelector('.navHeader_logout-icon');
    logoutIcon.addEventListener('click', (event) => {
        event.preventDefault();  // Evita el comportamiento predeterminado del enlace
        console.log('Cerrar sesión');
        window.location.href = 'login.html'; // Redirige al login
    });
}

// Función para cargar una hoja de estilos
function fn_navHeader_loadStylesheet() {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '../styles/navigationHeader.css';
    document.head.appendChild(linkElement);
}

// Función para insertar un elemento en la parte superior del <body>
function fn_navHeader_insertHeaderBar() {
    const headerBar = document.createElement('div');
    headerBar.className = 'navHeader_header-bar';
    headerBar.innerHTML = `
        <div class="navHeader_menu-toggle" onclick="fn_navHeader_toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="navHeader_menu">
            <a id="create-projects-link">Creación de Proyectos</a>
            <a id="edit-projects-link">Edición de Proyectos</a>
            <a id="list-projects-link">Listado de Proyectos</a>
            <a id="history-donations-link">Historial de Donaciones</a>
            <a id="account-settings-link">Configuración de la cuenta</a>
        </nav>
        <a href="#logout" class="navHeader_logout-icon" title="Salir de la aplicación">
            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
            </svg>
        </a>
    `;
    document.body.insertBefore(headerBar, document.body.firstChild);
}

// Inicialización de los eventos una vez que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    fn_navHeader_loadStylesheet();
    fn_navHeader_insertHeaderBar();
    fn_navHeader_handleFormsVisibility();
    fn_navHeader_handleLogout();
});
