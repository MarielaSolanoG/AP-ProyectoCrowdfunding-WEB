function toggleMenu() {
    document.body.classList.toggle("menu-open");
}

document.addEventListener('DOMContentLoaded', () => {
    const accountSettingsLink = document.getElementById('account-settings-link');
    const wrapper = document.querySelector('.wrapper');

    accountSettingsLink.addEventListener('click', (event) => {
        event.preventDefault();  // Evita el salto de la página
        wrapper.classList.toggle('hidden');  // Muestra/oculta el contenedor
    });
});