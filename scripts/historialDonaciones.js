/**
 * Gets all donations for logged user
 * @returns {Promise<void>}
 */
async function fetchDonations() {
    try {
        const usuarios = await getUsuarios();
        let listUsuarios = [];
        let usuario = null;

        if (usuarios && Array.isArray(usuarios)) {
            listUsuarios = usuarios.map(usuario => ({
                id: usuario.id,
                correo_electronico: usuario.correo_electronico
            }));
        }

        const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');

        if (loggedInUserEmail) {
            usuario = listUsuarios.find(userTemp => userTemp.correo_electronico === loggedInUserEmail);
        } else {
            usuario = listUsuarios.find(userTemp => userTemp.correo_electronico === "wayne.b@estudiantec.cr");
        }

        if (!usuario) {
            console.error('User not found');
            return;
        }

        const donations = await getDonaciones();
        const tableBody = document.getElementById('donations-body');

        if (donations && Array.isArray(donations)) {
            donations
                .filter(donation => donation.id_usuario === usuario.id)
                .forEach(donation => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${donation.nombre_proyecto}</td>
                        <td>$${Number(donation.monto_donado).toFixed(2)}</td>
                        <td>${new Date(donation.fecha_donacion).toLocaleDateString('es-ES')}</td>
                    `;
                    tableBody.appendChild(row);
                });
        }

        // Initialize DataTable
        $('#donations-table').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
            }
        });
    } catch (error) {
        console.error('Error fetching donations:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchDonations);
