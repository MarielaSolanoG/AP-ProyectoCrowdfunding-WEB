// Base URL del backend
const baseUrl = "https://backendproyap-production.up.railway.app";

// Obtener elementos del DOM
const tableBody = document.getElementById('users-tbody');
const errorMessage = document.getElementById('error-message');
const returnBtn = document.getElementById('return_btn');
const searchInput = document.getElementById('search-input');

let usuarios = []; // Lista de usuarios

// Función para obtener la lista de usuarios desde la API
async function getUsuarios() {
    try {
        const response = await fetch(`${baseUrl}/getUsuarios`);
        if (!response.ok) throw new Error('Error al obtener usuarios');
        const usuariosData = await response.json();
        // Filtrar para excluir al usuario con id = 1 (administrador)
        return usuariosData.filter(usuario => usuario.id !== 1);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}

// Función para activar o desactivar la cuenta del usuario utilizando los endpoints PUT
async function cambiarEstadoUsuario(usuario) {
    const endpoint = usuario.estado === 1 
        ? `${baseUrl}/desactivarCuentaUsuario` 
        : `${baseUrl}/activarCuentaUsuario`;

    const nuevoEstado = usuario.estado === 1 ? 0 : 1;

    try {
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: usuario.id })
        });

        if (response.ok) {
            usuario.estado = nuevoEstado;
            actualizarTabla();
        } else {
            const errorText = await response.text();
            console.error('Error al cambiar el estado del usuario:', errorText);
            alert('Error al cambiar el estado del usuario.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al cambiar el estado del usuario.');
    }
}

// Función para actualizar la tabla de usuarios
function actualizarTabla(filteredUsers = usuarios) {
    tableBody.innerHTML = '';

    filteredUsers.forEach((usuario) => {
        const row = document.createElement('tr');

        // Crear columnas para nombre, correo y estado
        row.innerHTML = `
            <td>${usuario.nombre_completo}</td>
            <td>${usuario.correo_electronico}</td>
            <td>${usuario.estado === 1 ? 'Activo' : 'Desactivado'}</td>
        `;

        // Columna de acción (botón para cambiar estado)
        const actionCell = document.createElement('td');
        const actionButton = document.createElement('button');
        
        // Ajustar el botón según el estado del usuario
        if (usuario.estado === 1) { // Usuario activo
            actionButton.textContent = 'Desactivar';
            actionButton.classList.add('deactivate-button');
        } else { // Usuario desactivado
            actionButton.textContent = 'Activar';
            actionButton.classList.add('activate-button');
        }
        
        actionButton.addEventListener('click', () => cambiarEstadoUsuario(usuario));
        actionCell.appendChild(actionButton);
        row.appendChild(actionCell);

        // Columna de mentor
        const mentorCell = document.createElement('td');
        const mentorButton = document.createElement('button');
        mentorButton.textContent = 'Cambiar Mentor';
        mentorButton.classList.add('mentor-button');
        mentorButton.addEventListener('click', () => {
            // agregar la cuestión
        });
        mentorCell.appendChild(mentorButton);
        row.appendChild(mentorCell);

        tableBody.appendChild(row);
    });
}

// Función para manejar la búsqueda en tiempo real
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = usuarios.filter(user =>
        user.nombre_completo.toLowerCase().includes(searchTerm)
    );
    actualizarTabla(filteredUsers);
});

// Inicializar la carga de usuarios al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    usuarios = await getUsuarios();

    if (usuarios.length === 0) {
        errorMessage.textContent = 'No se encontraron usuarios';
        errorMessage.classList.remove('hidden');
    } else {
        actualizarTabla();
    }

    // Botón de "Regresar"
    returnBtn.addEventListener('click', () => {
        window.location.href = "main_page_adm.html";
    });
});
