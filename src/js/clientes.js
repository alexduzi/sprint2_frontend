document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Clientes carregada!");

    const cepInput = document.getElementById('clienteCep');
    
    if (cepInput) {
        cepInput.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById('clienteRua').value = data.logradouro;
                            document.getElementById('clienteBairro').value = data.bairro;
                            document.getElementById('clienteCidade').value = data.localidade;
                            document.getElementById('clienteEstado').value = data.uf;
                            document.getElementById('clienteNumero').focus(); // Foca no campo de número
                        } else {
                            alert('CEP não encontrado. Por favor, digite os outros campos manualmente.');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao buscar CEP:', error);
                        alert('Não foi possível buscar o CEP. Verifique sua conexão e tente novamente.');
                    });
            }
        });
    }

    // No futuro, aqui entrará a lógica para:
    // 1. Validação completa do formulário antes de salvar (CPF/CNPJ, e-mail, etc).
    // 2. Adicionar máscaras aos campos de CPF/CNPJ, Telefone e CEP para facilitar a digitação.
    // 3. Lógica para a pesquisa na tabela de clientes funcionar em tempo real.
    // 4. Funções para os botões de editar e excluir clientes.
});