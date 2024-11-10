// Función que alterna la clase "menu-open" en el elemento <body>
function fn_navHeader_toggleMenu() {
    document.body.classList.toggle("navHeader_menu-open");
}

const links = [
    { nav_option_name: 'Creación de Proyectos', nav_option_id: 'create-projects-link', link: 'main_page_user.html', formId: 'wrapper-create-project' },
    { nav_option_name: 'Edición de Proyectos', nav_option_id: 'edit-projects-link', link: 'main_page_user.html', formId: 'wrapper-edit-project' },
    { nav_option_name: 'Listado de Proyectos', nav_option_id: 'list-projects-link', link: 'listadoProyectos.html' },
    { nav_option_name: 'Historial de Donaciones', nav_option_id: 'history-donations-link', link: 'historialDonaciones.html' },
    { nav_option_name: 'Configuración de la cuenta', nav_option_id: 'account-settings-link', link: 'main_page_user.html', formId: 'wrapper-data-edit' }
];

// Función para manejar la visibilidad de formularios según el enlace clicado
async function fn_navHeader_handleClick() {
    // Espera a que los elementos estén presentes en el DOM
    await new Promise(resolve => setTimeout(resolve, 0));

    links.forEach(item => {
        const element = document.getElementById(item.nav_option_id);
        if (element) {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                if (item.formId) window.location.href = `${item.link}?form=${item.formId}`;
                else window.location.href = `${item.link}`;
            });
        }
    });
}

// Función para manejar el evento de cierre de sesión
function fn_navHeader_handleLogout() {
    const logoutIcon = document.querySelector('.navHeader_logout-icon');
    logoutIcon.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace
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
    const navLinks = links.map(link => `<a id="${link.nav_option_id}">${link.nav_option_name}</a>`).join('');

    headerBar.innerHTML = `
        <div class="navHeader_menu-toggle" onclick="fn_navHeader_toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="navHeader_menu">
            ${navLinks}
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
document.addEventListener('DOMContentLoaded', async () => {
    fn_navHeader_insertHeaderBar();
    fn_navHeader_loadStylesheet();
    await fn_navHeader_handleClick();
    fn_navHeader_handleLogout();
});
