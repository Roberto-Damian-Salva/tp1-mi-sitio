const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const lista = document.getElementById('todo-list');
const contador = document.getElementById('pendientes-count');

// Función para actualizar el contador dinámicamente (Punto 3d)
function actualizarContador() {
    const pendientes = document.querySelectorAll('li:not(.completada)').length;
    contador.innerText = pendientes;
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const texto = input.value.trim();

    if (texto === "") return;

    // 1. Creamos la tarea
    const li = document.createElement('li');
    li.innerHTML = `<span class="texto-tarea">${texto}</span> <button class="btn-delete">x</button>`;

    // 2. LA AGREGAMOS AL HTML (Esto es fundamental)
    lista.appendChild(li);

    // 3. RECIÉN ACÁ CONTAMOS
    // Si lo hacés antes de la línea de arriba, te va a dar 0 siempre.
    actualizarContador();

    input.value = '';


    // Validación (Punto 3e)
    if (texto === "") {
        alert("No podés dejar la tarea vacía, capo.");
        return;
    }

    // Crear el elemento (Punto 3a)
    const li = document.createElement('li');
    li.classList.add('tarea-item'); // Para el diseño profesional
    
    li.innerHTML = `
        <span class="texto-tarea">${texto}</span>
        <button class="btn-delete">Eliminar</button>
    `;

    // Evento para tachar (Punto 3b)
    li.querySelector('.texto-tarea').addEventListener('click', function() {
        this.parentElement.classList.toggle('completada');
        actualizarContador();
    });

    // Evento para borrar (Punto 3c)
    li.querySelector('.btn-delete').addEventListener('click', () => {
        li.remove();
        actualizarContador();
    });

    lista.appendChild(li);
    input.value = ''; // Limpiamos el campo
    actualizarContador();
});