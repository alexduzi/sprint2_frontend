document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Notificações carregada!");

    const notificacoesMock = [
        {
            id: 1,
            tipo: 'desafio',
            titulo: 'Nova missão disponível',
            mensagem: 'A missão "Vendas Top" foi adicionada para você!',
            data: 'Hoje, 16 de Setembro',
            hora: '17:05',
            lida: false,
            icone: 'fa-bullseye',
            cor: 'primary',
            link: 'desafios.html'
        },
        {
            id: 2,
            tipo: 'conquista',
            titulo: 'Meta batida!',
            mensagem: 'Parabéns, você bateu sua meta semanal e ganhou 50 Swift Coins.',
            data: 'Hoje, 16 de Setembro',
            hora: '14:30',
            lida: false,
            icone: 'fa-check-circle',
            cor: 'success',
            link: 'relatorios.html'
        },
        {
            id: 3,
            tipo: 'ranking',
            titulo: 'Você subiu no Ranking!',
            mensagem: 'Agora você está no Top 5 do ranking mensal.',
            data: 'Ontem, 15 de Setembro',
            hora: '18:22',
            lida: true,
            icone: 'fa-award',
            cor: 'warning',
            link: 'ranking.html'
        },
        {
            id: 4,
            tipo: 'feedback',
            titulo: 'Feedback recebido',
            mensagem: 'Você recebeu um novo feedback positivo de um cliente.',
            data: 'Sexta-feira, 13 de Setembro',
            hora: '16:45',
            lida: true,
            icone: 'fa-comment-alt',
            cor: 'info',
            link: '#'
        },
        {
            id: 5,
            tipo: 'curso',
            titulo: 'Novo curso disponível',
            mensagem: 'O curso "Técnicas Avançadas de Negociação" está disponível para você.',
            data: 'Quinta-feira, 12 de Setembro',
            hora: '10:15',
            lida: true,
            icone: 'fa-graduation-cap',
            cor: 'info',
            link: 'cursos.html'
        },
        {
            id: 6,
            tipo: 'sistema',
            titulo: 'Atualização do sistema',
            mensagem: 'Novas funcionalidades foram adicionadas ao painel. Confira!',
            data: 'Quarta-feira, 11 de Setembro',
            hora: '09:00',
            lida: true,
            icone: 'fa-bell',
            cor: 'secondary',
            link: '#'
        }
    ];

    // Variável para controlar o filtro atual
    let filtroAtual = 'todas';

    // ==========================================
    // 1. RENDERIZAR NOTIFICAÇÕES
    // ==========================================
    
    function renderizarNotificacoes() {
        const timeline = document.querySelector('.notification-timeline');
        timeline.innerHTML = '';

        // Filtra as notificações
        let notificacoesFiltradas = notificacoesMock;
        
        if (filtroAtual === 'nao-lidas') {
            notificacoesFiltradas = notificacoesMock.filter(n => !n.lida);
        }

        // Agrupa por data
        const notificacoesPorData = agruparPorData(notificacoesFiltradas);

        // Se não houver notificações
        if (notificacoesFiltradas.length === 0) {
            timeline.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Nenhuma notificação encontrada.</p>
                </div>
            `;
            return;
        }

        // Renderiza cada grupo de data
        for (let data in notificacoesPorData) {
            // Adiciona o separador de data
            const separadorData = document.createElement('div');
            separadorData.className = 'timeline-date';
            separadorData.textContent = data;
            timeline.appendChild(separadorData);

            // Adiciona as notificações daquela data
            notificacoesPorData[data].forEach(function(notif) {
                const card = criarCardNotificacao(notif);
                timeline.appendChild(card);
            });
        }
    }

    // Agrupa notificações por data
    function agruparPorData(notificacoes) {
        const grupos = {};
        
        notificacoes.forEach(function(notif) {
            if (!grupos[notif.data]) {
                grupos[notif.data] = [];
            }
            grupos[notif.data].push(notif);
        });
        
        return grupos;
    }

    // Cria o card de uma notificação
    function criarCardNotificacao(notif) {
        const card = document.createElement('div');
        card.className = 'card card-custom notification-card mb-3';
        if (!notif.lida) {
            card.classList.add('unread');
        }

        const temLink = notif.link && notif.link !== '#';
        
        card.innerHTML = `
            <div class="card-body d-flex align-items-start">
                <div class="notification-icon-container bg-${notif.cor}">
                    <i class="fas ${notif.icone} text-white"></i>
                </div>
                <div class="notification-content flex-grow-1">
                    <p class="mb-1"><strong>${notif.titulo}:</strong> ${notif.mensagem}</p>
                    <small class="text-muted">Enviada às ${notif.hora}</small>
                </div>
                <div class="notification-actions ms-2 d-flex flex-column gap-2">
                    ${temLink ? `<a href="${notif.link}" class="btn btn-sm btn-outline-secondary">Ver mais</a>` : ''}
                    ${!notif.lida ? `<button class="btn btn-sm btn-outline-primary btn-marcar-lida" data-id="${notif.id}">
                        <i class="fas fa-check"></i>
                    </button>` : ''}
                    <button class="btn btn-sm btn-outline-danger btn-excluir" data-id="${notif.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    // ==========================================
    // 2. FILTRAR NOTIFICAÇÕES
    // ==========================================
    
    const botoesFiltro = document.querySelectorAll('#filtros-notificacoes .btn');
    
    botoesFiltro.forEach(function(botao, index) {
        botao.addEventListener('click', function() {
            // Remove 'active' de todos
            botoesFiltro.forEach(b => b.classList.remove('active'));
            
            // Adiciona 'active' no clicado
            this.classList.add('active');
            
            // Define o filtro
            filtroAtual = index === 0 ? 'todas' : 'nao-lidas';
            
            // Re-renderiza
            renderizarNotificacoes();
            adicionarEventosCards();
            
            // Feedback
            const total = filtroAtual === 'todas' 
                ? notificacoesMock.length 
                : notificacoesMock.filter(n => !n.lida).length;
            
            mostrarMensagemRapida(`Mostrando ${total} notificação(ões)`);
        });
    });

    // ==========================================
    // 3. MARCAR COMO LIDA
    // ==========================================
    
    function adicionarEventosCards() {
        // Evento para marcar como lida
        const botoesMarcarLida = document.querySelectorAll('.btn-marcar-lida');
        botoesMarcarLida.forEach(function(botao) {
            botao.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                marcarComoLida(id);
            });
        });

        // Evento para excluir
        const botoesExcluir = document.querySelectorAll('.btn-excluir');
        botoesExcluir.forEach(function(botao) {
            botao.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                excluirNotificacao(id);
            });
        });
    }

    function marcarComoLida(id) {
        const notif = notificacoesMock.find(n => n.id === id);
        
        if (notif) {
            notif.lida = true;
            
            // Re-renderiza
            renderizarNotificacoes();
            adicionarEventosCards();
            
            // Atualiza contador no menu (se existir)
            atualizarContadorMenu();
            
            mostrarMensagemRapida('Notificação marcada como lida');
        }
    }

    // ==========================================
    // 4. EXCLUIR NOTIFICAÇÃO
    // ==========================================
    
    function excluirNotificacao(id) {
        if (!confirm('Deseja realmente excluir esta notificação?')) {
            return;
        }

        const index = notificacoesMock.findIndex(n => n.id === id);
        
        if (index !== -1) {
            // Remove do array
            notificacoesMock.splice(index, 1);
            
            // Re-renderiza
            renderizarNotificacoes();
            adicionarEventosCards();
            
            // Atualiza contador no menu
            atualizarContadorMenu();
            
            mostrarMensagemRapida('Notificação excluída');
        }
    }

    // ==========================================
    // 5. MARCAR TODAS COMO LIDAS
    // ==========================================
    
    function marcarTodasComoLidas() {
        // Conta quantas não lidas existem
        const naoLidas = notificacoesMock.filter(n => !n.lida).length;
        
        if (naoLidas === 0) {
            mostrarMensagemRapida('Não há notificações não lidas');
            return;
        }

        // Marca todas como lidas
        notificacoesMock.forEach(function(notif) {
            notif.lida = true;
        });

        // Re-renderiza
        renderizarNotificacoes();
        adicionarEventosCards();
        
        // Atualiza contador no menu
        atualizarContadorMenu();
        
        mostrarMensagem(`${naoLidas} notificação(ões) marcada(s) como lida(s)`, 'sucesso');
    }

    // ==========================================
    // 6. ATUALIZAR CONTADOR NO MENU
    // ==========================================
    
    function atualizarContadorMenu() {
        const contador = document.getElementById('notificationCount');
        
        if (contador) {
            const naoLidas = notificacoesMock.filter(n => !n.lida).length;
            contador.textContent = naoLidas;
            
            // Mostra/esconde o badge
            if (naoLidas > 0) {
                contador.style.display = 'inline-block';
            } else {
                contador.style.display = 'none';
            }
        }
    }

    // ==========================================
    // 7. ADICIONAR NOVA NOTIFICAÇÃO (Simulação)
    // ==========================================
    
    function adicionarNovaNotificacao() {
        const novasNotificacoes = [
            {
                tipo: 'desafio',
                titulo: 'Novo desafio disponível',
                mensagem: 'Um novo desafio foi criado especialmente para você!',
                icone: 'fa-bullseye',
                cor: 'primary',
                link: 'desafios.html'
            },
            {
                tipo: 'venda',
                titulo: 'Nova venda registrada',
                mensagem: 'Parabéns! Você realizou uma nova venda.',
                icone: 'fa-shopping-cart',
                cor: 'success',
                link: 'tickets.html'
            }
        ];

        const random = novasNotificacoes[Math.floor(Math.random() * novasNotificacoes.length)];
        const agora = new Date();
        const horaAtual = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const novaNotif = {
            id: Date.now(),
            tipo: random.tipo,
            titulo: random.titulo,
            mensagem: random.mensagem,
            data: 'Hoje, 16 de Setembro',
            hora: horaAtual,
            lida: false,
            icone: random.icone,
            cor: random.cor,
            link: random.link
        };

        // Adiciona no início do array
        notificacoesMock.unshift(novaNotif);

        // Re-renderiza
        renderizarNotificacoes();
        adicionarEventosCards();
        
        // Atualiza contador
        atualizarContadorMenu();

        mostrarMensagem('Nova notificação recebida!', 'sucesso');
    }

    // ==========================================
    // FUNÇÕES AUXILIARES
    // ==========================================
    
    function mostrarMensagem(texto, tipo) {
        const msgAnterior = document.querySelector('.mensagem-alerta');
        if (msgAnterior) {
            msgAnterior.remove();
        }

        const corMensagem = tipo === 'sucesso' ? 'success' : 'danger';
        const mensagem = document.createElement('div');
        mensagem.className = 'alert alert-' + corMensagem + ' mensagem-alerta';
        mensagem.innerHTML = '<i class="fas fa-' + (tipo === 'sucesso' ? 'check-circle' : 'exclamation-circle') + ' me-2"></i>' + texto;
        
        const container = document.querySelector('.container.main-content');
        container.insertBefore(mensagem, container.firstChild);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(function() {
            mensagem.remove();
        }, 4000);
    }

    function mostrarMensagemRapida(texto) {
        const msgAnterior = document.querySelector('.mensagem-rapida');
        if (msgAnterior) {
            msgAnterior.remove();
        }

        const mensagem = document.createElement('div');
        mensagem.className = 'alert alert-info mensagem-rapida';
        mensagem.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 200px;';
        mensagem.innerHTML = '<i class="fas fa-info-circle me-2"></i>' + texto;
        
        document.body.appendChild(mensagem);
        
        setTimeout(function() {
            mensagem.remove();
        }, 2000);
    }

    // ==========================================
    // EVENTOS ESPECIAIS
    // ==========================================

    // Botão "Marcar todas como lidas" no dropdown do menu (se existir na página)
    const linkMarcarTodas = document.querySelector('.notification-header .text-small');
    if (linkMarcarTodas) {
        linkMarcarTodas.addEventListener('click', function(e) {
            e.preventDefault();
            marcarTodasComoLidas();
        });
    }

    // Adiciona botão secreto para simular nova notificação (para testes)
    const btnSimular = document.createElement('button');
    btnSimular.className = 'btn btn-outline-info btn-sm';
    btnSimular.innerHTML = '<i class="fas fa-plus me-2"></i>Simular Nova Notificação';
    btnSimular.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999;';
    btnSimular.addEventListener('click', adicionarNovaNotificacao);
    document.body.appendChild(btnSimular);

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================
    
    // Renderiza as notificações ao carregar
    renderizarNotificacoes();
    adicionarEventosCards();
    atualizarContadorMenu();
});