document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar las opciones de los combobox desde la API
    const cargarCombobox = () => {
      fetch('/api/modulos')
        .then(response => response.json())
        .then(data => {
          const moduloSelect = document.getElementById('modulo');
          data.forEach(modulo => {
            const option = document.createElement('option');
            option.value = modulo.modulo_id;
            option.textContent = modulo.nombre;
            moduloSelect.appendChild(option);
          });
        });
  
      fetch('/api/severidades')
        .then(response => response.json())
        .then(data => {
          const severidadSelect = document.getElementById('severidad');
          data.forEach(severidad => {
            const option = document.createElement('option');
            option.value = severidad.severidad_id;
            option.textContent = severidad.descripcion;
            severidadSelect.appendChild(option);
          });
        });
  
      fetch('/api/usuarios')
        .then(response => response.json())
        .then(data => {
          const clienteSelect = document.getElementById('cliente');
          data.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.usuario_id;
            option.textContent = cliente.nombre;
            clienteSelect.appendChild(option);
          });
        });
    };
  
    cargarCombobox();
  
    // Manejar el envío del formulario
    document.getElementById('ticketForm').addEventListener('submit', function (e) {
      e.preventDefault();
  
      const ticketData = {
        usuario_id: document.getElementById('cliente').value,
        modulo_id: document.getElementById('modulo').value,
        severidad_id: document.getElementById('severidad').value,
        descripcion_breve: document.getElementById('descripcionBreve').value,
        descripcion_detallada: document.getElementById('descripcionDetallada').value,
        prioridad_id: 1 // Puedes cambiar esto para incluir la prioridad seleccionada si es necesario
      };
  
      fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById('mensaje').textContent = `Ticket creado con éxito. Número de ticket: ${data.ticketId}`;
        document.getElementById('mensaje').classList.add('alert', 'alert-success');
        document.getElementById('ticketForm').reset();
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensaje').textContent = 'Error al crear el ticket.';
        document.getElementById('mensaje').classList.add('alert', 'alert-danger');
      });
    });
  });
  