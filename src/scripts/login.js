// Puxando os dados do HTML para o JS
const usuario = document.querySelector('#email'); // usuario é o email da pessoa.
const senha = document.querySelector('#senha');
const botao = document.querySelector('form');

botao.addEventListener('submit', (e) => {
    e.preventDefault(); // impede que a página recarregue

    if (usuario.value && senha.value) {
        const usuarioSalvo = localStorage.getItem('usuarios'); // recuperando o arquivo json do cadastro.
        if (usuarioSalvo) {
            const listaUsuarios = JSON.parse(usuarioSalvo); // voltando os dados para uma lista em js.

            // Verificando se existe um usuário com email e senha correspondentes
            const usuarioEncontrado = listaUsuarios.find(
                (u) => u.email === usuario.value && u.senha === senha.value // Criando um function para verificar o conteúdo da lista.
            );

            if (usuarioEncontrado) {
                alert('Login realizado com sucesso!');
                window.location.href = ''; // redirecionando para a página inicial do site apos o login.
            } else {
                alert('Email ou senha incorretos.');
            }
        } else {
            alert('Nenhum usuário cadastrado.');
        }
    } else {
        alert('Preencha todos os campos.');
    }
});
