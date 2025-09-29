// ==========================================
// HOME.JS - Gerencia a página principal (Dashboard)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("Página Home (Dashboard) carregada!");

    // ==========================================
    // 1. VERIFICAÇÃO DE AUTENTICAÇÃO
    // ==========================================
    
    // Verifica se o usuário está logado
    const usuario = Auth.getUsuarioLogado();
    
    // Se não estiver logado, volta para o login
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }

    console.log(`Bem-vindo, ${usuario.nome}!`);
    
    // Atualiza o nome do usuário no menu do topo
    atualizarNomeUsuario(usuario.nome);
    
    // Configura o botão de sair (logout)
    configurarLogout();
    
    // Atualizar o número de notificações no sino
    const notificationCountElement = document.getElementById('notificationCount');
    if (notificationCountElement) {
        let currentNotifications = 3; // Este número viria de uma API
        notificationCountElement.textContent = currentNotifications;
        if (currentNotifications > 0) {
            notificationCountElement.style.display = 'inline-block';
        } else {
            notificationCountElement.style.display = 'none';
        }
    }

    // Atualizar a barra de progresso de metas
    const metaVendasProgress = document.getElementById('metaVendasProgress');
    if (metaVendasProgress) {
        const progressoAtual = '85%'; // Este valor viria de uma API
        metaVendasProgress.style.width = progressoAtual;
        metaVendasProgress.textContent = progressoAtual;
        metaVendasProgress.setAttribute('aria-valuenow', progressoAtual.replace('%', ''));
    }

    // Atualizar os pontos da semana
    const pontosElement = document.getElementById('pontosSemana');
    if (pontosElement) {
        const pontosAtuais = 125; // Este valor viria de uma API
        pontosElement.textContent = `${pontosAtuais} Swift Coins`;
    }
});

// ==========================================
// FUNÇÕES DE AUTENTICAÇÃO
// ==========================================

// FUNÇÃO: Coloca o nome do usuário no menu
function atualizarNomeUsuario(nomeCompleto) {
    const elementoNome = document.querySelector('.nav-link.dropdown-toggle');
    
    if (elementoNome) {
        // Pega só o primeiro nome (ex: "João Silva" vira "João")
        const primeiroNome = nomeCompleto.split(' ')[0];
        
        // Pega a imagem do avatar
        const img = elementoNome.querySelector('img');
        
        if (img) {
            // Limpa o conteúdo e coloca a imagem + nome
            elementoNome.innerHTML = '';
            elementoNome.appendChild(img);
            elementoNome.appendChild(document.createTextNode(' ' + primeiroNome));
        }
    }
}

// FUNÇÃO: Faz o botão "Sair" funcionar
function configurarLogout() {
    const btnLogout = document.querySelector('.dropdown-item.text-danger');
    
    if (btnLogout) {
        btnLogout.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o link de funcionar normalmente
            
            // Pergunta se tem certeza
            if (confirm('Deseja sair do sistema?')) {
                Auth.logout(); // Chama a função de logout
            }
        });
    }
}