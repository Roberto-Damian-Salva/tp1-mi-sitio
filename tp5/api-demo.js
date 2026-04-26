// 1. Listas de datos locales (Agregalas al principio del archivo)
const nombresArg = ["Juan Pérez", "Mariana González", "Lucas Rodríguez", "Sofía Martínez", "Facundo López", "Lucía Díaz", "Mateo Romero", "Valentina Torres", "Bautista Gómez", "Catalina Ruiz"];
const ciudadesArg = ["Salta", "Córdoba", "Rosario", "Mendoza", "Buenos Aires", "Tucumán", "Resistencia", "Posadas", "Cafayate", "Cachi"];

// 2. Referencias al DOM
const userList = document.getElementById('user-list');
const buscador = document.getElementById('buscador');
const statusContainer = document.getElementById('status-container');
let todosLosUsuarios = [];

// 3. Función de mensajes de estado
function mostrarEstado(mensaje, tipo = '') {
    userList.innerHTML = ''; 
    statusContainer.innerHTML = `<div class="status-msg ${tipo}">${mensaje}</div>`;
}

// 4. ESTA ES LA FUNCIÓN QUE REEMPLAZÁS (Punto 4 + Tu toque personal)
async function cargarDatos() {
    mostrarEstado('Buscando datos...', 'loading');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Error de red');

        const datosOriginales = await response.json();

        // Transformamos los datos a "Modo Argentina" usando .map()
        todosLosUsuarios = datosOriginales.map((user, index) => {
            const nombreLocal = nombresArg[index % nombresArg.length];
            return {
                ...user,
                name: nombreLocal,
                address: {
                    ...user.address,
                    city: ciudadesArg[index % ciudadesArg.length]
                },
                email: `${nombreLocal.replace(' ', '.').toLowerCase()}@gmail.com.ar`
            };
        });
        
        renderizarTarjetas(todosLosUsuarios);
        statusContainer.innerHTML = ''; 

    } catch (error) {
        mostrarEstado('Error: No se pudo conectar con el servidor.', 'error');
    }
}

// 5. Función para mostrar las tarjetas (Punto 4e)
function renderizarTarjetas(usuarios) {
    if (usuarios.length === 0) {
        mostrarEstado('No se encontraron resultados para tu búsqueda.', 'empty');
        return;
    }

    statusContainer.innerHTML = '';
    userList.innerHTML = usuarios.map(user => `
        <div class="card">
            <h3>${user.name}</h3>
            <p><strong>📧 Email:</strong> ${user.email}</p>
            <p><strong>📍 Ciudad:</strong> ${user.address.city}</p>
            <p><strong>🏢 Empresa:</strong> ${user.company.name}</p>
        </div>
    `).join('');
}

// 6. Buscador Dinámico (Punto 5)
buscador.addEventListener('input', (e) => {
    const valor = e.target.value.trim().toLowerCase();

    if (valor.length > 0 && valor.length < 3) {
        mostrarEstado('Escribe al menos 3 caracteres...', 'empty');
        return;
    }

    if (valor.length === 0) {
        renderizarTarjetas(todosLosUsuarios);
        return;
    }

    const filtrados = todosLosUsuarios.filter(user => 
        user.name.toLowerCase().includes(valor)
    );

    renderizarTarjetas(filtrados);
});

// 7. Arrancamos la app
cargarDatos();