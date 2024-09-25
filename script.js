// URL del JSON
const url = 'https://nataliasotelo.github.io/act-estrellas/estrellas.json';

// Función para consumir el JSON
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura del JSON en la consola

    const usuarios = data;
    const contenedor = document.getElementById('lista-usuarios');
    const usuarioSelect = document.getElementById('usuario-select'); //para sección comentarios
    // Iterar sobre los usuarios y mostrarlos en la página
    usuarios.forEach((usuario, index) => {
      // Crear un elemento en la lista para cada usuario
      const usuarioItem = document.createElement('li');
      usuarioItem.classList.add('list-group-item');

      // Añadir características de cada usuario del JSON
      usuarioItem.innerHTML = `
      <h5>${usuario.name}</h5>
      <p>Compañía: ${usuario.company}</p>
      <p>Estrellas: ${generateStars(usuario.numberrange)}</p>
    `;
      // Función que genera estrellas
      const estrellas = document.createElement('p');
      function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
          stars += i <= rating ? '<span class="star">★</span>' : '<span class="star empty">★</span>';
        }
        return stars;
      }
      estrellas.innerHTML = `Estrellas: ${generateStars(usuario.numberrange)}`;

      //Agrego usuario a lista
      contenedor.appendChild(usuarioItem);

      //Opciones del selector sección comentarios
      const option = document.createElement('option');
      option.value = usuario.name;
      option.textContent = usuario.name;
      usuarioSelect.appendChild(option);
    });
      //Envío de comentario
      document.getElementById('enviar-comentario').addEventListener('click', () => {
        const selectedUser = usuarioSelect.value;
        const comentarioInput = document.getElementById('comentario-input').value;
        
        if (selectedUser && comentarioInput) {
          const comentarioP = document.createElement('p');
          comentarioP.textContent = `${selectedUser}: ${comentarioInput}`;
          document.getElementById('comentarios-generales').appendChild(comentarioP);
          
          // Limpiar el cuadro de texto
          document.getElementById('comentario-input').value = '';
        } else {
          alert('Por favor, selecciona un usuario y escribe un comentario antes de enviarlo.');
        }
      });
    })
    .catch(error => {
      console.error('Error al obtener el JSON:', error);
    });
    