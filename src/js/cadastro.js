// ==========================================
// CADASTRO.JS - Gerencia a tela de cadastro
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Cadastro carregada!");

    // Se já estiver logado, redireciona para home
    if (Auth.getUsuarioLogado()) {
        window.location.href = 'home.html';
        return;
    }

    // Pega os elementos do formulário
    const emailInput = document.querySelector('#email_usuario');
    const nomeInput = document.querySelector('#nome_usuario');
    const senhaInput = document.querySelector('#senha_usuario');
    const formulario = document.querySelector('form');

    // Quando o usuário clicar em "Criar Conta"
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o formulário de recarregar a página

        // Pega os valores digitados
        const email = emailInput.value.trim();
        const nome = nomeInput.value.trim();
        const senha = senhaInput.value;

        // Tenta fazer cadastro
        const resultado = Auth.cadastrar(email, nome, senha);

        if (resultado.sucesso) {
            // Cadastro deu certo!
            mostrarMensagem(resultado.mensagem, 'sucesso');
            
            // Limpa os campos
            emailInput.value = '';
            nomeInput.value = '';
            senhaInput.value = '';
            
            // Espera 1.5 segundos e vai para o login
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            // Cadastro deu errado
            mostrarMensagem(resultado.mensagem, 'erro');
        }
    });
});

// Função que mostra mensagens bonitas na tela
function mostrarMensagem(texto, tipo) {
    // Remove mensagem anterior se tiver
    const msgAnterior = document.querySelector('.mensagem-alerta');
    if (msgAnterior) {
        msgAnterior.remove();
    }

    // Cria a mensagem (verde se sucesso, vermelha se erro)
    const corMensagem = tipo === 'sucesso' ? 'success' : 'danger';
    const mensagem = document.createElement('div');
    mensagem.className = 'alert alert-' + corMensagem + ' mensagem-alerta';
    mensagem.textContent = texto;

    // Coloca a mensagem acima do formulário
    const formulario = document.querySelector('form');
    formulario.parentElement.insertBefore(mensagem, formulario);

    // Remove a mensagem depois de 5 segundos
    setTimeout(function() {
        mensagem.remove();
    }, 5000);
}