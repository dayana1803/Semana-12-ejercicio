// URL del JSON
const url = 'https://nataliasotelo.github.io/act-estrellas/estrellas.json';

// Función para consumir el JSON
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica la estructura del JSON en la consola
    
    const usuarios = data; // Accedemos directamente a la lista de objetos
    
    const contenedor = document.getElementById('lista-usuarios');

    // Iterar sobre los usuarios y mostrarlos en la página
    usuarios.forEach((usuario, index) => {
      // Crear un elemento para cada usuario
      const usuarioDiv = document.createElement('div');
      usuarioDiv.classList.add('usuario'); // Añadimos una clase por si quieres aplicar estilos

      // Añadir nombre
      const nombre = document.createElement('h3');
      nombre.textContent = `Nombre: ${usuario.name}`;
      
      // Añadir compañía con estrellas
      const compania = document.createElement('p');
      compania.textContent = `Compañía: ${usuario.company}`;
      
      // Añadir estrellas
      const estrellas = document.createElement('p');
      function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
          stars += i <= rating ? '<span class="star">★</span>' : '<span class="star empty">★</span>';
        }
        return stars;
      }
      estrellas.textContent = `Estrellas: ${usuario.numberrange}`;
      

      // Cuadro de texto para agregar comentarios
      const comentarioInput = document.createElement('textarea');
      comentarioInput.placeholder = 'Escribe tu comentario...';
      comentarioInput.rows = 2;
      comentarioInput.cols = 30;
      comentarioInput.setAttribute('id', `comentario-${index}`);

      // Botón para enviar el comentario
      const botonComentario = document.createElement('button');
      botonComentario.textContent = 'Enviar comentario';
      botonComentario.addEventListener('click', () => {
        const comentario = comentarioInput.value;
        if (comentario) {
          const comentarioP = document.createElement('p');
          comentarioP.textContent = `Comentario: ${comentario}`;
          usuarioDiv.appendChild(comentarioP);
          comentarioInput.value = ''; // Limpiar el cuadro de texto
        } else {
          alert('Por favor, escribe un comentario antes de enviarlo.');
        }
      });

      // Agregar los elementos creados al contenedor de cada usuario
      usuarioDiv.appendChild(nombre);
      usuarioDiv.appendChild(compania);
      usuarioDiv.appendChild(estrellas);
      usuarioDiv.appendChild(comentarioInput);
      usuarioDiv.appendChild(botonComentario);

      // Agregar el usuario al contenedor general
      contenedor.appendChild(usuarioDiv);
    });
  })
  .catch(error => {
    console.error('Error al obtener el JSON:', error);
  });