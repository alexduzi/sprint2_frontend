document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Ranking (versão interativa) carregada!");

    // --- BANCO DE DADOS DE EXEMPLO ---
    const rankingData = {
        semanal: {
            vendasLabel: "Vendas na Semana",
            ranking: [
                { posicao: 1, nome: "Maria Souza", avatar: "M", vendas: 15, pontos: 350 },
                { posicao: 2, nome: "João Silva", avatar: "J", vendas: 12, pontos: 310 },
                { posicao: 3, nome: "VOCÊ", avatar: "VC", vendas: 10, pontos: 280 },
                { posicao: 4, nome: "Pedro Lima", avatar: "P", vendas: 9, pontos: 250 },
            ]
        },
        mensal: {
            vendasLabel: "Vendas no Mês",
            ranking: [
                { posicao: 1, nome: "João Silva", avatar: "J", vendas: 45, pontos: 1500 },
                { posicao: 2, nome: "Maria Souza", avatar: "M", vendas: 42, pontos: 1300 },
                { posicao: 3, nome: "Pedro Lima", avatar: "P", vendas: 38, pontos: 1100 },
                { posicao: 4, nome: "VOCÊ", avatar: "VC", vendas: 35, pontos: 1050 },
                { posicao: 5, nome: "Ana Costa", avatar: "A", vendas: 32, pontos: 980 },
            ]
        },
        geral: {
            vendasLabel: "Vendas Totais",
            ranking: [
                { posicao: 1, nome: "João Silva", avatar: "J", vendas: 520, pontos: 18500 },
                { posicao: 2, nome: "Maria Souza", avatar: "M", vendas: 490, pontos: 17900 },
                { posicao: 3, nome: "Ana Costa", avatar: "A", vendas: 450, pontos: 16000 },
                { posicao: 4, nome: "Pedro Lima", avatar: "P", vendas: 430, pontos: 15800 },
                { posicao: 5, nome: "VOCÊ", avatar: "VC", vendas: 410, pontos: 15500 },
            ]
        }
    };

    const tableBody = document.getElementById('ranking-table-body');
    const vendasHeader = document.querySelector('thead th:nth-child(3)'); // Seleciona o 3º <th> no cabeçalho

    function updateRanking(periodo) {
        const data = rankingData[periodo];

        // Atualiza o texto do cabeçalho da tabela
        vendasHeader.textContent = data.vendasLabel;
        
        // Limpa a tabela e preenche com os novos dados
        tableBody.innerHTML = '';
        if (data.ranking.length > 0) {
            data.ranking.forEach(colaborador => {
                let rowClass = '';
                let posicaoHtml = `${colaborador.posicao}º`;

                if (colaborador.posicao === 1) {
                    rowClass = 'table-warning'; // Classe de destaque do Bootstrap
                    posicaoHtml += ' <i class="fas fa-crown text-warning"></i>';
                }
                if (colaborador.nome === 'VOCÊ') {
                    rowClass = 'ranking-voce'; // Nossa classe personalizada
                }

                const avatarUrl = `https://via.placeholder.com/40/${colaborador.nome === 'VOCÊ' ? '20272B' : '6c757d'}/FFFFFF?text=${colaborador.avatar}`;

                const row = `
                    <tr class="${rowClass}">
                        <td class="text-center fw-bold">${posicaoHtml}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="${avatarUrl}" class="rounded-circle me-2" alt="Avatar">
                                <span>${colaborador.nome}</span>
                            </div>
                        </td>
                        <td class="text-center">${colaborador.vendas}</td>
                        <td class="text-end fw-bold">${colaborador.pontos} Pontos</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Nenhum dado encontrado para este período.</td></tr>';
        }
    }

    const filterButtons = document.querySelectorAll('#filtros-ranking .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const periodoSelecionado = this.dataset.periodo;
            updateRanking(periodoSelecionado);
        });
    });

    // Carga inicial com o ranking semanal
    updateRanking('semanal');
});