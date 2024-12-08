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
        comentario.classList.add('col-12', 'col-md-8', 'mx-auto', 'mt-2', 'border', 'border-1', 'p-2', 'rounded');

        const credenciais = criarCredenciais(foto, nome);
        comentario.appendChild(credenciais);
        
        const textoComentario = document.createElement('span');
        textoComentario.classList.add('text-break', 'overflow-hidden');
        textoComentario.textContent = texto;
        textoComentario.style.paddingBlock = '.35rem'; 
        credenciais.appendChild(textoComentario);

        const interagir = criarInteracoes();
        comentario.appendChild(interagir);
        
        return comentario;
    }

    function criarCredenciais(foto, nome) {
        const credenciais = document.createElement('div');
        credenciais.classList.add('d-flex', 'flex-column', 'align-items-start');
        
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
        
        return credenciais;
    }

    function criarInteracoes() {
        const interagir = document.createElement('div');
        interagir.classList.add('d-flex', 'align-items-center', 'gap-2', 'interagir');
        
        const curtir = criarBtnInteragir('like');
        const deslike = criarBtnInteragir('deslike');
        const botaoExcluir = criarBtnExcluir();
        
        interagir.appendChild(curtir);
        interagir.appendChild(deslike);
        interagir.appendChild(botaoExcluir);
        
        return interagir;
    }

    function criarBtnInteragir(tipo) {
        const btnInteragir = document.createElement('button');

        if (tipo === 'like') {
            btnInteragir.classList.add('btn', 'btn-outline-secondary', 'btn-sm', 'btn-like');
            btnInteragir.innerHTML = `<i class='fas fa-thumbs-up'></i> <span class="count">0</span>`;
        } else if (tipo === 'deslike') {
            btnInteragir.classList.add('btn', 'btn-outline-secondary', 'btn-sm', 'btn-deslike');
            btnInteragir.innerHTML = `<i class='fas fa-thumbs-down'></i> <span class="count">0</span>`;
        }

        btnInteragir.addEventListener('click', (clicado) => {
            const btnClicado = clicado.target.closest('button');
            const divClicado = btnInteragir.closest('.interagir');
            const btnLike = divClicado.querySelector('.btn-like');
            const btnDeslike = divClicado.querySelector('.btn-deslike');

            if (btnClicado.classList.contains('btn-like') && validarLogin()) {
                const count = btnLike.querySelector('.count');
                const valorAtual = parseInt(count.textContent, 10);
                count.textContent = valorAtual + 1;
            
                btnDeslike.disabled = false;
                btnDeslike.querySelector('.count').textContent = 0;

                btnLike.disabled = true;

            } else if (btnClicado.classList.contains('btn-deslike') && validarLogin()) {
                const count = btnDeslike.querySelector('.count');
                const valorAtual = parseInt(count.textContent, 10);
                count.textContent = valorAtual + 1;

                btnLike.disabled = false;
                btnLike.querySelector('.count').textContent = 0;

                btnDeslike.disabled = true;
            }
        })

        return btnInteragir;
    }

    function criarBtnExcluir() {
        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('btn', 'btn-danger', 'btn-sm');
        botaoExcluir.innerHTML = '<i class="fas fa-trash-alt"></i>'; 

        botaoExcluir.addEventListener('click', () => {
            const confirmarExclusao = confirm('Você tem certeza que deseja excluir este comentário?');
            if (confirmarExclusao) {
                const comentario = botaoExcluir.parentElement.parentElement;
                comentario.remove();
            }
        });

        return botaoExcluir;
    }

    function validarLogin() {
        // Reservado para validação de login
        return confirm('"TESTE" Você está logado? "TESTE"');
    }

});