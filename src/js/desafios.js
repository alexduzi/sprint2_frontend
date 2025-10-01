document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Desafios carregada!");

    const desafiosMock = {
        disponiveis: [
            {
                id: 1,
                titulo: 'Mestre das Vendas Rápidas',
                descricao: 'Feche 5 vendas de qualquer produto em menos de 24 horas.',
                recompensa: 50,
                icone: 'fa-bolt'
            },
            {
                id: 2,
                titulo: 'Explorador de Produtos',
                descricao: 'Venda pelo menos um item de 3 categorias diferentes essa semana.',
                recompensa: 75,
                icone: 'fa-compass'
            },
            {
                id: 3,
                titulo: 'Cliente Fidelizado',
                descricao: 'Faça 3 vendas para o mesmo cliente em uma semana.',
                recompensa: 60,
                icone: 'fa-handshake'
            }
        ],
        emAndamento: [
            {
                id: 4,
                titulo: 'Maratona de Ligações',
                descricao: 'Ligue para 10 clientes da sua lista de inativos.',
                recompensa: 30,
                progresso: 4,
                total: 10,
                icone: 'fa-phone'
            }
        ],
        concluidos: [
            {
                id: 5,
                titulo: 'Feedback Premiado',
                descricao: 'Consiga 3 feedbacks positivos de clientes este mês.',
                recompensa: 40,
                dataConclusao: '10/09/2025',
                icone: 'fa-star'
            },
            {
                id: 6,
                titulo: 'Primeira Venda',
                descricao: 'Realize sua primeira venda no sistema.',
                recompensa: 20,
                dataConclusao: '05/09/2025',
                icone: 'fa-rocket'
            }
        ]
    };

    // ==========================================
    // 1. RENDERIZAR DESAFIOS NA TELA
    // ==========================================
    
    function renderizarDesafios() {
        renderizarDisponiveis();
        renderizarEmAndamento();
        renderizarConcluidos();
    }

    // Renderiza desafios disponíveis
    function renderizarDisponiveis() {
        const container = document.querySelector('#disponiveis .row');
        container.innerHTML = '';

        if (desafiosMock.disponiveis.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-muted text-center">Nenhum desafio disponível no momento.</p></div>';
            return;
        }

        desafiosMock.disponiveis.forEach(function(desafio) {
            const card = `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card card-custom h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="mb-3">
                                <i class="fas ${desafio.icone} fa-2x text-swift-orange"></i>
                            </div>
                            <h5 class="card-title">${desafio.titulo}</h5>
                            <p class="card-text text-muted">${desafio.descricao}</p>
                            <div class="mt-auto">
                                <div class="recompensa mb-3">
                                    <strong>Recompensa:</strong> <span class="text-swift-orange fw-bold">+${desafio.recompensa} Swift Coins</span>
                                </div>
                                <button class="btn btn-swift-primary w-100 btn-aceitar" data-id="${desafio.id}">
                                    <i class="fas fa-plus-circle me-2"></i>Aceitar Desafio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        // Adiciona evento aos botões de aceitar
        adicionarEventosAceitar();
    }

    // Renderiza desafios em andamento
    function renderizarEmAndamento() {
        const container = document.querySelector('#andamento .row');
        container.innerHTML = '';

        if (desafiosMock.emAndamento.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-muted text-center">Você não tem desafios em andamento.</p></div>';
            return;
        }

        desafiosMock.emAndamento.forEach(function(desafio) {
            const porcentagem = Math.round((desafio.progresso / desafio.total) * 100);
            
            const card = `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card card-custom h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="mb-3">
                                <i class="fas ${desafio.icone} fa-2x text-primary"></i>
                            </div>
                            <h5 class="card-title">${desafio.titulo}</h5>
                            <p class="card-text text-muted">${desafio.descricao}</p>
                            <div class="mt-auto">
                                <div class="progress my-3" style="height: 20px;">
                                    <div class="progress-bar progress-bar-swift" role="progressbar" style="width: ${porcentagem}%;" aria-valuenow="${porcentagem}" aria-valuemin="0" aria-valuemax="100">${desafio.progresso}/${desafio.total}</div>
                                </div>
                                <div class="recompensa mb-3">
                                    <strong>Recompensa:</strong> <span class="text-swift-orange fw-bold">+${desafio.recompensa} Swift Coins</span>
                                </div>
                                <button class="btn btn-outline-secondary w-100 btn-simular-progresso" data-id="${desafio.id}">
                                    <i class="fas fa-arrow-up me-2"></i>Simular Progresso
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        // Adiciona eventos aos botões de simular progresso
        adicionarEventosProgresso();
    }

    // Renderiza desafios concluídos
    function renderizarConcluidos() {
        const container = document.querySelector('#concluidos .row');
        container.innerHTML = '';

        if (desafiosMock.concluidos.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-muted text-center">Você ainda não concluiu nenhum desafio.</p></div>';
            return;
        }

        desafiosMock.concluidos.forEach(function(desafio) {
            const card = `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card card-custom h-100 desafio-concluido">
                        <div class="card-body d-flex flex-column">
                            <div class="mb-3">
                                <i class="fas ${desafio.icone} fa-2x text-success"></i>
                            </div>
                            <h5 class="card-title">
                                <i class="fas fa-check-circle text-success me-2"></i>${desafio.titulo}
                            </h5>
                            <p class="card-text text-muted">${desafio.descricao}</p>
                            <div class="mt-auto">
                                <div class="recompensa text-muted mb-2">
                                    <strong>Recompensa:</strong> +${desafio.recompensa} Swift Coins
                                </div>
                                <small class="text-muted">
                                    <i class="fas fa-calendar-check me-1"></i>Concluído em ${desafio.dataConclusao}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }

    // ==========================================
    // 2. ACEITAR DESAFIO
    // ==========================================
    
    function adicionarEventosAceitar() {
        const botoesAceitar = document.querySelectorAll('.btn-aceitar');
        
        botoesAceitar.forEach(function(botao) {
            botao.addEventListener('click', function() {
                const desafioId = parseInt(this.getAttribute('data-id'));
                aceitarDesafio(desafioId, this);
            });
        });
    }

    function aceitarDesafio(id, botao) {
        // Desabilita o botão
        botao.disabled = true;
        botao.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Aceitando...';

        // Simula requisição para API
        setTimeout(function() {
            // Encontra o desafio
            const index = desafiosMock.disponiveis.findIndex(d => d.id === id);
            
            if (index !== -1) {
                const desafio = desafiosMock.disponiveis[index];
                
                // Move para "Em Andamento"
                desafiosMock.disponiveis.splice(index, 1);
                desafiosMock.emAndamento.push({
                    ...desafio,
                    progresso: 0,
                    total: 10
                });

                // Atualiza a tela
                renderizarDesafios();

                // Mostra mensagem de sucesso
                mostrarMensagem(`Desafio "${desafio.titulo}" aceito! Boa sorte!`, 'sucesso');
                
                // Muda para a aba "Em Andamento"
                const tabAndamento = document.getElementById('andamento-tab');
                tabAndamento.click();
            }
        }, 1000);
    }

    // ==========================================
    // 3. SIMULAR PROGRESSO (Para testes)
    // ==========================================
    
    function adicionarEventosProgresso() {
        const botoesProgresso = document.querySelectorAll('.btn-simular-progresso');
        
        botoesProgresso.forEach(function(botao) {
            botao.addEventListener('click', function() {
                const desafioId = parseInt(this.getAttribute('data-id'));
                simularProgresso(desafioId, this);
            });
        });
    }

    function simularProgresso(id, botao) {
        // Desabilita o botão
        botao.disabled = true;
        botao.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Atualizando...';

        // Simula atualização
        setTimeout(function() {
            const desafio = desafiosMock.emAndamento.find(d => d.id === id);
            
            if (desafio) {
                // Aumenta o progresso
                desafio.progresso += 2;
                
                // Se completou o desafio
                if (desafio.progresso >= desafio.total) {
                    // Move para concluídos
                    const index = desafiosMock.emAndamento.findIndex(d => d.id === id);
                    desafiosMock.emAndamento.splice(index, 1);
                    
                    const hoje = new Date();
                    const dataFormatada = hoje.toLocaleDateString('pt-BR');
                    
                    desafiosMock.concluidos.unshift({
                        id: desafio.id,
                        titulo: desafio.titulo,
                        descricao: desafio.descricao,
                        recompensa: desafio.recompensa,
                        dataConclusao: dataFormatada,
                        icone: desafio.icone
                    });

                    // Atualiza a tela
                    renderizarDesafios();

                    // Mostra mensagem especial
                    mostrarMensagem(`🎉 Parabéns! Você concluiu o desafio "${desafio.titulo}" e ganhou ${desafio.recompensa} Swift Coins!`, 'sucesso');
                    
                    // Muda para a aba "Concluídos"
                    const tabConcluidos = document.getElementById('concluidos-tab');
                    tabConcluidos.click();
                } else {
                    // Apenas atualiza a tela
                    renderizarDesafios();
                    mostrarMensagemRapida('Progresso atualizado!');
                }
            }
        }, 800);
    }

    // ==========================================
    // 4. VER HISTÓRICO
    // ==========================================
    
    const btnHistorico = document.querySelector('.btn-outline-secondary');
    if (btnHistorico) {
        btnHistorico.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Muda para a aba de concluídos
            const tabConcluidos = document.getElementById('concluidos-tab');
            tabConcluidos.click();
            
            // Rola suavemente para baixo
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
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
        }, 5000);
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
    // INICIALIZAÇÃO
    // ==========================================
    
    // Renderiza todos os desafios ao carregar a página
    renderizarDesafios();
});