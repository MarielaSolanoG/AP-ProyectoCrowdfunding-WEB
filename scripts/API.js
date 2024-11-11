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

        // Verificar si la respuesta es JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            // Si no es JSON, devolver el texto plano
            return await response.text();
        }
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
async function getProyectosById(idUsuario) {
    const url = `${baseUrl}/getProyectos/${idUsuario}`;
    return await apiRequest(url);
}

// Function to get all projects
async function getProyectos() {
    const url = `${baseUrl}/getProyectos`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        //console.log("getProyectos successful:", data);
        return data; // Return the data or handle it as needed
    } catch (error) {
        console.error("getProyectos failed:", error.message);
        return null; // Return null in case of an error
    }
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

// Update Usuario
async function updateDatosUsuario(data) {
    const url = `${baseUrl}/updateDatosUsuario`;
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
    //console.log('Usuarios:', usuarios);
})();
