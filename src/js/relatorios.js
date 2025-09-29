document.addEventListener('DOMContentLoaded', function () {
    console.log("Página de Relatórios (versão interativa) carregada!");

    const corLaranjaSwift = '#F2522E';

    // --- BANCO DE DADOS DE EXEMPLO ---
    const reportData = {
        mes: {
            kpis: {
                vendas: 'R$ 12.850,00',
                meta: '85%',
                coins: '250',
                clientes: '7'
            },
            vendasChart: {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                data: [2500, 4000, 3500, 2850]
            },
            categoriasChart: {
                labels: ['Eletrônicos', 'Serviços', 'Acessórios'],
                data: [5500, 4200, 3150]
            }
        },
        trimestre: {
            kpis: {
                vendas: 'R$ 33.250,00',
                meta: '92%',
                coins: '780',
                clientes: '21'
            },
            vendasChart: {
                labels: ['Junho', 'Julho', 'Agosto'],
                data: [11500, 12800, 8950]
            },
            categoriasChart: {
                labels: ['Eletrônicos', 'Serviços', 'Acessórios'],
                data: [14000, 10500, 8750]
            }
        },
        ano: {
            kpis: {
                vendas: 'R$ 115.600,00',
                meta: '105%',
                coins: '3.120',
                clientes: '85'
            },
            vendasChart: {
                labels: ['Jan-Fev', 'Mar-Abr', 'Mai-Jun', 'Jul-Ago', 'Set-Out', 'Nov-Dez'],
                data: [15000, 22000, 18000, 25000, 19000, 16600]
            },
            categoriasChart: {
                labels: ['Eletrônicos', 'Serviços', 'Acessórios'],
                data: [52000, 38000, 25600]
            }
        }
    };

    // --- ELEMENTOS DO DOM ---
    const kpiVendas = document.getElementById('kpi-vendas');
    const kpiMeta = document.getElementById('kpi-meta');
    const kpiCoins = document.getElementById('kpi-coins');
    const kpiClientes = document.getElementById('kpi-clientes');

    // --- INICIALIZAÇÃO DOS GRÁFICOS ---
    const ctxVendas = document.getElementById('vendasChart').getContext('2d');
    const vendasChart = new Chart(ctxVendas, {
        type: 'line',
        data: { labels: [], datasets: [{ data: [], fill: true, backgroundColor: 'rgba(242, 82, 46, 0.1)', borderColor: corLaranjaSwift, tension: 0.3 }] },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    const ctxCategorias = document.getElementById('categoriasChart').getContext('2d');
    const categoriasChart = new Chart(ctxCategorias, {
        type: 'doughnut',
        data: { labels: [], datasets: [{ data: [], backgroundColor: [corLaranjaSwift, '#20272B', '#6c757d'], hoverOffset: 4 }] },
        options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });

    // --- FUNÇÃO PARA ATUALIZAR TUDO ---
    function updateDashboard(periodo) {
        const data = reportData[periodo];

        kpiVendas.textContent = data.kpis.vendas;
        kpiMeta.textContent = data.kpis.meta;
        kpiCoins.innerHTML = `${data.kpis.coins} <i class="fas fa-coins text-warning"></i>`;
        kpiClientes.textContent = data.kpis.clientes;

        vendasChart.data.labels = data.vendasChart.labels;
        vendasChart.data.datasets[0].data = data.vendasChart.data;
        vendasChart.update();

        categoriasChart.data.labels = data.categoriasChart.labels;
        categoriasChart.data.datasets[0].data = data.categoriasChart.data;
        categoriasChart.update();
    }

    // --- CONTROLE DOS FILTROS ---
    const filterButtons = document.querySelectorAll('#filtros-relatorios .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const periodoSelecionado = this.dataset.periodo;
            updateDashboard(periodoSelecionado);
        });
    });

    // Carga inicial
    updateDashboard('mes');
});