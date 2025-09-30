// ==========================================
// PAGE-GUARD.JS - Proteção simples de páginas
// ==========================================
// Este arquivo protege as páginas internas do sistema
// Adicione em todas as páginas que precisam de login

document.addEventListener('DOMContentLoaded', function() {
    // Pega o usuário que está logado
    const usuario = Auth.getUsuarioLogado();
    
    // Se não tiver ninguém logado, volta para o login
    if (!usuario) {
        window.location.href = 'index.html';
        return;
    }

    console.log(`Usuário logado: ${usuario.nome}`);
    
    // Atualiza o nome no menu do topo
    const elementoNome = document.querySelector('.nav-link.dropdown-toggle');
    if (elementoNome) {
        // Pega só o primeiro nome
        const primeiroNome = usuario.nome.split(' ')[0];
        const img = elementoNome.querySelector('img');
        
        if (img) {
            // Limpa e coloca a imagem + nome
            elementoNome.innerHTML = '';
            elementoNome.appendChild(img);
            elementoNome.appendChild(document.createTextNode(' ' + primeiroNome));
        }
    }
    
    // Faz o botão "Sair" funcionar
    const btnLogout = document.querySelector('.dropdown-item.text-danger');
    if (btnLogout) {
        btnLogout.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o link de funcionar
            
            // Pergunta se tem certeza
            if (confirm('Deseja sair do sistema?')) {
                Auth.logout(); // Faz o logout
            }
        });
    }
});