document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Login carregada!");

    // Se já estiver logado, redireciona para home
    if (Auth.getUsuarioLogado()) {
        window.location.href = 'home.html';
        return;
    }

    // Pega os elementos do formulário
    const emailInput = document.querySelector('#email');
    const senhaInput = document.querySelector('#senha');
    const formulario = document.querySelector('form');

    // Quando o usuário clicar em "Entrar"
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o formulário de recarregar a página

        // Pega os valores digitados
        const email = emailInput.value.trim();
        const senha = senhaInput.value;

        // Verifica se preencheu tudo
        if (!email || !senha) {
            mostrarMensagem('Preencha todos os campos.', 'erro');
            return;
        }

        // Tenta fazer login
        const resultado = Auth.login(email, senha);

        if (resultado.sucesso) {
            // Login deu certo!
            mostrarMensagem(resultado.mensagem, 'sucesso');
            
            // Espera 1 segundo e vai para a home
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            // Login deu errado
            mostrarMensagem(resultado.mensagem, 'erro');
            senhaInput.value = ''; // Limpa a senha
        }
    });

    console.log("Teste com: joao@swift.com / 123456");
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