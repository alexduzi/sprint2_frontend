// USUÁRIOS JÁ CADASTRADOS (para testar o sistema)
// Em um sistema real, esses dados viriam de um banco de dados
const USUARIOS_PADRAO = [
    { email: 'joao@swift.com', nome: 'João Silva', senha: '123456' },
    { email: 'maria@swift.com', nome: 'Maria Souza', senha: '123456' }
];

// FUNÇÃO: Coloca os usuários padrão no localStorage (se ainda não tiver)
function inicializarUsuarios() {
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(USUARIOS_PADRAO));
        console.log('Usuários padrão criados no sistema');
    }
}

// FUNÇÃO: Faz o login do usuário
function login(email, senha) {
    // Pega a lista de usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Procura se existe um usuário com esse email e senha
    const usuario = usuarios.find(function(u) {
        return u.email === email && u.senha === senha;
    });

    // Se encontrou o usuário
    if (usuario) {
        // Salva os dados do usuário logado (SEM a senha, por segurança)
        const usuarioLogado = {
            email: usuario.email,
            nome: usuario.nome
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        
        return { sucesso: true, mensagem: 'Login realizado com sucesso!' };
    } 
    // Se não encontrou
    else {
        return { sucesso: false, mensagem: 'Email ou senha incorretos.' };
    }
}

// FUNÇÃO: Cadastra um novo usuário
function cadastrar(email, nome, senha) {
    // Verifica se todos os campos foram preenchidos
    if (!email || !nome || !senha) {
        return { sucesso: false, mensagem: 'Preencha todos os campos.' };
    }

    // Verifica se a senha tem pelo menos 6 caracteres
    if (senha.length < 6) {
        return { sucesso: false, mensagem: 'A senha deve ter no mínimo 6 caracteres.' };
    }

    // Pega a lista de usuários
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verifica se o email já está cadastrado
    const emailExiste = usuarios.some(function(u) {
        return u.email === email;
    });
    
    if (emailExiste) {
        return { sucesso: false, mensagem: 'Este email já está cadastrado.' };
    }

    // Adiciona o novo usuário na lista
    usuarios.push({ email: email, nome: nome, senha: senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    return { sucesso: true, mensagem: 'Cadastro realizado com sucesso!' };
}

// FUNÇÃO: Faz o logout (sair do sistema)
function logout() {
    // Remove o usuário logado do localStorage
    localStorage.removeItem('usuarioLogado');
    
    // Volta para a tela de login
    window.location.href = 'index.html';
}

// FUNÇÃO: Retorna os dados do usuário que está logado
function getUsuarioLogado() {
    const dados = localStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : null;
}

// Quando o script carregar, inicializa os usuários padrão
inicializarUsuarios();

// Deixa as funções disponíveis para usar em outros arquivos
// Exemplo de uso: Auth.login('email', 'senha')
window.Auth = {
    login: login,
    cadastrar: cadastrar,
    logout: logout,
    getUsuarioLogado: getUsuarioLogado
};