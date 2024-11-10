// JavaScript equivalent code to interact with the APIs using Axios or Fetch

const baseUrl = "https://backendproyap-production.up.railway.app";

// Helper function to handle API requests
async function apiRequest(url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : null
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        return null;
    }
}

// Get RolUsuarios
async function getRolUsuarios() {
    const url = `${baseUrl}/getRolUsuarios`;
    return await apiRequest(url);
}

// Get Usuarios
async function getUsuarios() {
    const url = `${baseUrl}/getUsuarios`;
    return await apiRequest(url);
}

// Get Usuario by ID
async function getUsuarioById(id) {
    const url = `${baseUrl}/getUsuario/${id}`;
    const response = await apiRequest(url);
    return response && response.length > 0 ? response[0] : null; // Assuming API returns an array
}

// Login
async function login(correoElectronico, contrasena) {
    const url = `${baseUrl}/login`;
    const loginData = {
        correo_electronico: correoElectronico,
        contrasena: contrasena
    };
    return await apiRequest(url, 'POST', loginData);
}

// Get Categorias
async function getCategorias() {
    const url = `${baseUrl}/getCategorias`;
    return await apiRequest(url);
}

// Get Proyectos by User ID
async function getProyectos(idUsuario) {
    const url = `${baseUrl}/getProyectos/${idUsuario}`;
    return await apiRequest(url);
}

// Get All Donaciones
async function getDonaciones() {
    const url = `${baseUrl}/getDonaciones`;
    return await apiRequest(url);
}

// Get Estadisticas
async function getEstadisticas() {
    const url = `${baseUrl}/getEstadisticas`;
    return await apiRequest(url);
}

// Validate if User has Sufficient Funds
async function validarFondosSuficientes(idUsuario, monto) {
    const url = `${baseUrl}/validarFondosSuficientesUsuario/${idUsuario}/${monto}`;
    const response = await apiRequest(url);
    return response ? response.result : null;
}

// Insert User
async function insertUsuario(data) {
    const url = `${baseUrl}/insertUsuario`;
    return await apiRequest(url, 'POST', data);
}

// Insert Project
async function insertProyecto(data) {
    const url = `${baseUrl}/insertProyecto`;
    return await apiRequest(url, 'POST', data);
}

// Insert Donation
async function insertDonacion(idUsuario, idProyecto, montoDonado) {
    const url = `${baseUrl}/insertDonacion`;
    const data = {
        id_usuario: idUsuario,
        id_proyecto: idProyecto,
        monto_donado: montoDonado
    };
    return await apiRequest(url, 'POST', data);
}

// Update Project
async function updateProyecto(idProyecto, nombreProyecto, descripcion, objetivoFinanciacion, fechaLimite, categoriaId) {
    const url = `${baseUrl}/updateProyecto`;
    const data = {
        id_proyecto: idProyecto,
        nombre_proyecto: nombreProyecto,
        descripcion: descripcion,
        objetivo_financiacion: objetivoFinanciacion,
        fecha_limite: fechaLimite,
        categoria_id: categoriaId
    };
    return await apiRequest(url, 'PUT', data);
}

// Activate User Account
async function activarCuentaUsuario(idUsuario) {
    const url = `${baseUrl}/activarCuentaUsuario`;
    const data = {
        id_usuario: idUsuario
    };
    return await apiRequest(url, 'PUT', data);
}

// Deactivate User Account
async function desactivarCuentaUsuario(idUsuario) {
    const url = `${baseUrl}/desactivarCuentaUsuario`;
    const data = {
        id_usuario: idUsuario
    };
    return await apiRequest(url, 'PUT', data);
}

// Example usage
(async () => {
    const usuarios = await getUsuarios();
    console.log('Usuarios:', usuarios);
})();
