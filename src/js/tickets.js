document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Acompanhamento de Vendas (versão interativa) carregada!");

    // --- BANCO DE DADOS DE EXEMPLO ---
    const salesData = {
        hoje: {
            kpis: {
                label: "(Hoje)",
                ticketMedio: "R$ 254,80",
                vendasRealizadas: "12",
                totalVendido: "R$ 3.057,60",
                itensPorVenda: "3.1"
            },
            vendas: [
                { id: "#SW1088", cliente: "Maria Joaquina", data: "Hoje, 18:45", itens: 5, valor: "R$ 450,00" },
                { id: "#SW1087", cliente: "Tech Solutions Ltda", data: "Hoje, 17:12", itens: 2, valor: "R$ 189,90" },
                { id: "#SW1086", cliente: "Carlos Martins", data: "Hoje, 14:30", itens: 3, valor: "R$ 215,50" },
                { id: "#SW1085", cliente: "Ana Costa", data: "Hoje, 11:02", itens: 4, valor: "R$ 310,20" }
            ]
        },
        semana: {
            kpis: {
                label: "(Esta Semana)",
                ticketMedio: "R$ 289,30",
                vendasRealizadas: "58",
                totalVendido: "R$ 16.779,40",
                itensPorVenda: "3.5"
            },
            vendas: [
                { id: "#SW1088", cliente: "Maria Joaquina", data: "16/09/2025", itens: 5, valor: "R$ 450,00" },
                { id: "#SW1075", cliente: "Pedro Lima", data: "15/09/2025", itens: 8, valor: "R$ 780,00" },
                { id: "#SW1060", cliente: "Loja do Zé", data: "14/09/2025", itens: 2, valor: "R$ 95,40" },
                { id: "#SW1051", cliente: "Ana Costa", data: "13/09/2025", itens: 4, valor: "R$ 310,20" },
                { id: "#SW1045", cliente: "Tech Solutions Ltda", data: "12/09/2025", itens: 6, valor: "R$ 620,00" }
            ]
        },
        mes: {
            kpis: {
                label: "(Este Mês)",
                ticketMedio: "R$ 315,75",
                vendasRealizadas: "210",
                totalVendido: "R$ 66.307,50",
                itensPorVenda: "3.8"
            },
            vendas: [
                { id: "#SW1088", cliente: "Maria Joaquina", data: "16/09/2025", itens: 5, valor: "R$ 450,00" },
                { id: "#SW1002", cliente: "Mercado Central", data: "05/09/2025", itens: 15, valor: "R$ 2.150,00" },
                { id: "#SW0980", cliente: "Carlos Martins", data: "02/09/2025", itens: 3, valor: "R$ 215,50" }
            ]
        }
    };

    const kpiTicketMedioLabel = document.getElementById('kpi-ticket-medio-label');
    const kpiTicketMedioValor = document.getElementById('kpi-ticket-medio-valor');
    const kpiVendasLabel = document.getElementById('kpi-vendas-label');
    const kpiVendasValor = document.getElementById('kpi-vendas-valor');
    const kpiTotalLabel = document.getElementById('kpi-total-label');
    const kpiTotalValor = document.getElementById('kpi-total-valor');
    const kpiItensValor = document.getElementById('kpi-itens-valor');
    const tableBody = document.getElementById('vendas-table-body');

    function updateDashboard(periodo) {
        const data = salesData[periodo];

        kpiTicketMedioLabel.textContent = `Ticket Médio ${data.kpis.label}`;
        kpiVendasLabel.textContent = `Vendas Realizadas ${data.kpis.label}`;
        kpiTotalLabel.textContent = `Total Vendido ${data.kpis.label}`;
        
        kpiTicketMedioValor.textContent = data.kpis.ticketMedio;
        kpiVendasValor.textContent = data.kpis.vendasRealizadas;
        kpiTotalValor.textContent = data.kpis.totalVendido;
        kpiItensValor.textContent = data.kpis.itensPorVenda;

        tableBody.innerHTML = '';
        if (data.vendas.length > 0) {
            data.vendas.forEach(venda => {
                const row = `
                    <tr>
                        <td>${venda.id}</td>
                        <td>${venda.cliente}</td>
                        <td>${venda.data}</td>
                        <td class="text-center">${venda.itens}</td>
                        <td class="text-end fw-bold">${venda.valor}</td>
                        <td class="text-center">
                            <a href="#" class="btn btn-sm btn-outline-secondary">Ver Detalhes</a>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Nenhuma venda encontrada para este período.</td></tr>';
        }
    }

    const filterButtons = document.querySelectorAll('#filtros-tickets .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const periodoSelecionado = this.dataset.periodo;
            updateDashboard(periodoSelecionado);
        });
    });

    updateDashboard('hoje');
});