document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Configurações carregada!");

    // --- DADOS MOCKADOS DO USUÁRIO ---
    const dadosUsuarioMock = {
        nome: 'João da Silva',
        email: 'joao@swift.com',
        telefone: '(11) 99999-8888'
    };

    // ==========================================
    // 1. CARREGAR DADOS DO PERFIL
    // ==========================================
    function carregarDadosPerfil() {
        // Pega o usuário logado
        const usuarioLogado = Auth.getUsuarioLogado();
        
        if (usuarioLogado) {
            // Preenche os campos com os dados mockados
            document.getElementById('nomeCompleto').value = usuarioLogado.nome;
            document.getElementById('email').value = usuarioLogado.email;
            document.getElementById('telefone').value = dadosUsuarioMock.telefone;
        }
    }

    // ==========================================
    // 2. CARREGAR PREFERÊNCIAS DE NOTIFICAÇÃO
    // ==========================================
    function carregarPreferenciasNotificacao() {
        // Busca as preferências salvas no localStorage
        const preferencias = localStorage.getItem('preferenciasNotificacao');
        
        if (preferencias) {
            // Se existir, converte de texto para objeto
            const prefs = JSON.parse(preferencias);
            
            // Marca os checkboxes de acordo com as preferências salvas
            document.getElementById('notifEmail').checked = prefs.email;
            document.getElementById('notifNovosDesafios').checked = prefs.novosDesafios;
            document.getElementById('notifRanking').checked = prefs.ranking;
        } else {
            // Se não existir, define valores padrão
            document.getElementById('notifEmail').checked = true;
            document.getElementById('notifNovosDesafios').checked = true;
            document.getElementById('notifRanking').checked = false;
        }
    }

    // ==========================================
    // 3. SALVAR ALTERAÇÕES DO PERFIL
    // ==========================================
    const btnSalvarPerfil = document.querySelector('.card-custom:first-child .btn-swift-primary');
    
    if (btnSalvarPerfil) {
        btnSalvarPerfil.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pega os valores dos campos
            const novoNome = document.getElementById('nomeCompleto').value.trim();
            const novoTelefone = document.getElementById('telefone').value.trim();
            
            // Validação simples
            if (!novoNome) {
                mostrarMensagem('Por favor, preencha o nome completo.', 'erro');
                return;
            }
            
            // Desabilita o botão durante o "envio"
            btnSalvarPerfil.disabled = true;
            btnSalvarPerfil.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Salvando...';
            
            // Simula envio para API (setTimeout = fake delay)
            setTimeout(function() {
                // Atualiza o nome do usuário no localStorage
                const usuarioLogado = Auth.getUsuarioLogado();
                usuarioLogado.nome = novoNome;
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                
                // Atualiza o nome no menu
                atualizarNomeNoMenu(novoNome);
                
                // Reabilita o botão
                btnSalvarPerfil.disabled = false;
                btnSalvarPerfil.innerHTML = 'Salvar Alterações do Perfil';
                
                // Mostra mensagem de sucesso
                mostrarMensagem('Perfil atualizado com sucesso!', 'sucesso');
            }, 1500); // 1.5 segundos de delay
        });
    }

    // ==========================================
    // 4. ALTERAR SENHA
    // ==========================================
    const btnAlterarSenha = document.querySelector('.card-custom:nth-child(2) .btn-swift-primary');
    
    if (btnAlterarSenha) {
        btnAlterarSenha.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pega os valores dos campos
            const senhaAtual = document.getElementById('senhaAtual').value;
            const novaSenha = document.getElementById('novaSenha').value;
            const confirmarSenha = document.getElementById('confirmarNovaSenha').value;
            
            // Validações
            if (!senhaAtual || !novaSenha || !confirmarSenha) {
                mostrarMensagem('Preencha todos os campos de senha.', 'erro');
                return;
            }
            
            if (novaSenha.length < 6) {
                mostrarMensagem('A nova senha deve ter no mínimo 6 caracteres.', 'erro');
                return;
            }
            
            if (novaSenha !== confirmarSenha) {
                mostrarMensagem('A nova senha e a confirmação não coincidem.', 'erro');
                return;
            }
            
            // Desabilita o botão durante o "envio"
            btnAlterarSenha.disabled = true;
            btnAlterarSenha.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Alterando...';
            
            // Simula envio para API
            setTimeout(function() {
                // Limpa os campos
                document.getElementById('senhaAtual').value = '';
                document.getElementById('novaSenha').value = '';
                document.getElementById('confirmarNovaSenha').value = '';
                
                // Reabilita o botão
                btnAlterarSenha.disabled = false;
                btnAlterarSenha.innerHTML = 'Atualizar Senha';
                
                // Mostra mensagem de sucesso
                mostrarMensagem('Senha alterada com sucesso!', 'sucesso');
            }, 1500);
        });
    }

    // ==========================================
    // 5. SALVAR PREFERÊNCIAS DE NOTIFICAÇÃO
    // ==========================================
    const checkboxesNotificacao = document.querySelectorAll('.form-check-input');
    
    checkboxesNotificacao.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Pega os valores atuais dos checkboxes
            const preferencias = {
                email: document.getElementById('notifEmail').checked,
                novosDesafios: document.getElementById('notifNovosDesafios').checked,
                ranking: document.getElementById('notifRanking').checked
            };
            
            // Salva no localStorage
            localStorage.setItem('preferenciasNotificacao', JSON.stringify(preferencias));
            
            // Mostra feedback rápido
            mostrarMensagemRapida('Preferência salva!');
        });
    });

    // ==========================================
    // FUNÇÕES AUXILIARES
    // ==========================================
    
    // Atualiza o nome do usuário no menu superior
    function atualizarNomeNoMenu(nomeCompleto) {
        const elementoNome = document.querySelector('.nav-link.dropdown-toggle');
        
        if (elementoNome) {
            const primeiroNome = nomeCompleto.split(' ')[0];
            const img = elementoNome.querySelector('img');
            
            if (img) {
                elementoNome.innerHTML = '';
                elementoNome.appendChild(img);
                elementoNome.appendChild(document.createTextNode(' ' + primeiroNome));
            }
        }
    }

    // Mostra mensagem de sucesso ou erro
    function mostrarMensagem(texto, tipo) {
        // Remove mensagem anterior se existir
        const msgAnterior = document.querySelector('.mensagem-alerta');
        if (msgAnterior) {
            msgAnterior.remove();
        }

        // Define a cor da mensagem
        const corMensagem = tipo === 'sucesso' ? 'success' : 'danger';
        
        // Cria o elemento da mensagem
        const mensagem = document.createElement('div');
        mensagem.className = 'alert alert-' + corMensagem + ' mensagem-alerta';
        mensagem.innerHTML = '<i class="fas fa-' + (tipo === 'sucesso' ? 'check-circle' : 'exclamation-circle') + ' me-2"></i>' + texto;
        
        // Coloca a mensagem no topo da página
        const container = document.querySelector('.container.main-content');
        container.insertBefore(mensagem, container.firstChild);
        
        // Rola para o topo para ver a mensagem
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Remove a mensagem depois de 5 segundos
        setTimeout(function() {
            mensagem.remove();
        }, 5000);
    }

    // Mostra mensagem rápida (para notificações)
    function mostrarMensagemRapida(texto) {
        // Remove mensagem anterior se existir
        const msgAnterior = document.querySelector('.mensagem-rapida');
        if (msgAnterior) {
            msgAnterior.remove();
        }

        // Cria a mensagem pequena
        const mensagem = document.createElement('div');
        mensagem.className = 'alert alert-success mensagem-rapida';
        mensagem.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 200px;';
        mensagem.innerHTML = '<i class="fas fa-check-circle me-2"></i>' + texto;
        
        // Adiciona ao body
        document.body.appendChild(mensagem);
        
        // Remove depois de 2 segundos
        setTimeout(function() {
            mensagem.remove();
        }, 2000);
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================
    
    // Carrega os dados quando a página abre
    carregarDadosPerfil();
    carregarPreferenciasNotificacao();
});