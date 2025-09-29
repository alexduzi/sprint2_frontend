// Puxando os dados do HTML para o JS
const email_usuario = document.querySelector('#email_usuario');
const nome_usuario = document.querySelector('#nome_usuario');
const senha_usuario = document.querySelector('#senha_usuario');
const botao_cadastro = document.querySelector('form');

let dados_usuario = []; // Simulando um banco de dados usando uma lista.


botao_cadastro.addEventListener('submit', (y) => {
    y.preventDefault();

    const email = email_usuario.value;
    const nome = nome_usuario.value;
    const senha = senha_usuario.value;

    if (email && nome && senha.length >= 6) {
        dados_usuario.push({ email, nome, senha });

        // salva os dados da lista no navegador do usuário.
        localStorage.setItem('usuarios', JSON.stringify(dados_usuario));

        alert('Cadastro Concluído!');

        window.location.href = 'login.html'; // redirecionando o usuário para o login.

        // Limpar os campos após a criação da conta
        email_usuario.value = '';
        nome_usuario.value = '';
        senha_usuario.value = '';
        
        console.log(dados_usuario); // Para ver os dados do usuário no console 
    } else {
        alert('Preencha todos os campos e a senha deve ter no mínimo 6 caracteres.');
    }
});