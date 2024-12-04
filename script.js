document.addEventListener('DOMContentLoaded', () => {
    const secaoDeComentarios = document.querySelectorAll('.comments-section');

    secaoDeComentarios.forEach(section => {
        const botaoAdicionar = section.querySelector('.add-comment');
        const campoTexto = section.querySelector('textarea');
        const listaDeComentarios = section.querySelector('.comments-list');

        botaoAdicionar.addEventListener('click', () => {
            const textoComentario = campoTexto.value.trim();
            if (textoComentario) {
                const novoComentario = criarComentario(textoComentario, 'https://placehold.co/40x40', 'User');
                listaDeComentarios.appendChild(novoComentario);
                campoTexto.value = ''; 
            } else {
                alert('Por favor, insira um comentário!');
            }
        });
    });

    function criarComentario(texto, foto, nome) {
        const comentario = document.createElement('li');
        comentario.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'rounded', 'mt-2');

        const credenciais = document.createElement('div');
        credenciais.classList.add('d-flex', 'align-items-center');

        const fotoUsuario = document.createElement('img');
        fotoUsuario.classList.add('img-fluid', 'rounded-circle', 'me-2');
        fotoUsuario.src = foto; 
        fotoUsuario.alt = 'Foto do usuário que comentou no post';
        fotoUsuario.width = 40;
    
        credenciais.appendChild(fotoUsuario);

        const nomeUsuario = document.createElement('span');
        nomeUsuario.classList.add('fw-bold', 'me-3');
        nomeUsuario.textContent = nome; 
        credenciais.appendChild(nomeUsuario);

        const textoComentario = document.createElement('span');
        textoComentario.textContent = texto;
        credenciais.appendChild(textoComentario);

        comentario.appendChild(credenciais);

        const botaoExcluir = criarBotaoExcluir();
        comentario.appendChild(botaoExcluir);

        return comentario;
    }

    function criarBotaoExcluir() {
        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('btn', 'btn-danger', 'btn-sm');
        botaoExcluir.innerHTML = '<i class="fas fa-trash-alt"></i>'; 

        botaoExcluir.addEventListener('click', () => {
            const confirmarExclusao = confirm('Você tem certeza que deseja excluir este comentário?');
            if (confirmarExclusao) {
                const comentario = botaoExcluir.parentElement;
                comentario.remove();
            }
        });

        return botaoExcluir;
    }
});