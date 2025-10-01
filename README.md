# Swift - Sistema de Gamificação para Vendedores

Sistema web de gamificação desenvolvido para motivar e engajar equipes de vendas através de desafios, rankings e recompensas.

## 📋 Sobre o Projeto

O Swift é uma plataforma de gestão e gamificação voltada para colaboradores da área comercial. O sistema oferece:

- **Dashboard personalizado** com metas e objetivos
- **Sistema de desafios** com recompensas em Swift Coins
- **Ranking competitivo** entre colaboradores
- **Relatórios de desempenho** com gráficos interativos
- **Gestão de clientes** com integração ao ViaCEP
- **Cursos e treinamentos** para desenvolvimento profissional
- **Sistema de notificações** em tempo real

## 🚀 Como Executar o Projeto

### 1. Baixando o Projeto

Clone o repositório ou faça o download do código:

```bash
git clone <url-do-repositorio>
cd sprint2_frontend
```

### 2. Executando Localmente

O projeto é totalmente frontend e não requer instalação de dependências. Você precisa apenas de um servidor local para servir os arquivos HTML.

#### Opção A: Usando Live Server (VS Code)

1. Instale a extensão **Live Server** no VS Code
2. Abra a pasta raiz do projeto (`sprint2_frontend`) no VS Code
3. Clique com o botão direito no arquivo `src/pages/index.html`
4. Selecione **"Open with Live Server"**
5. O navegador abrirá automaticamente em `http://127.0.0.1:5500/src/pages/index.html`

#### Opção B: Usando Python

No terminal, navegue até a pasta raiz do projeto e execute:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000/src/pages/index.html`

#### Opção C: Usando Node.js

Instale o `http-server` globalmente:

```bash
npm install -g http-server
http-server
```

Acesse: `http://localhost:8080/src/pages/index.html`

#### Opção D: Usando a extensão Preview do VS Code

1. Instale a extensão **"Preview on Web Server"** no VS Code
2. Abra o arquivo `src/pages/index.html`
3. Pressione `Ctrl+Shift+P` e digite "Preview"
4. Selecione **"Preview on Side Panel"**

⚠️ **Importante**: Sempre inicie o servidor a partir da **pasta raiz do projeto** (`sprint2_frontend`) para que os caminhos relativos funcionem corretamente.

## 🔐 Como Fazer Login

### Usuários Pré-cadastrados

O sistema já possui dois usuários para teste:

| Email | Senha | Nome |
|-------|-------|------|
| `joao@swift.com` | `123456` | João Silva |
| `maria@swift.com` | `123456` | Maria Souza |

### Como Funciona o Login

1. Acesse a página inicial em `/src/pages/index.html`
2. Digite um dos emails e senhas acima
3. Clique em **"Entrar"**
4. Você será redirecionado para o **Dashboard (Home)**

### Criando uma Nova Conta

1. Na tela de login, clique em **"Registrar-se"**
2. Preencha email, nome completo e senha (mínimo 6 caracteres)
3. Clique em **"Criar Conta"**
4. Você será redirecionado para a tela de login
5. Faça login com as credenciais criadas

**Nota**: Os dados são armazenados no `localStorage` do navegador, ou seja, são locais e não persistem entre diferentes dispositivos.

## 📱 Navegação do Sistema

### Após o Login

Ao fazer login com sucesso, você é redirecionado para o **Dashboard (Home)** localizado em `/src/pages/home.html`.

### Estrutura de Páginas

#### 🏠 **Home (Dashboard)**
- **Arquivo**: `src/pages/home.html`
- **Descrição**: Painel principal com visão geral do desempenho
- **Conteúdo**:
  - Swift Coins acumulados na semana
  - Progresso da meta mensal de vendas
  - Missões do dia (pendentes e concluídas)
  - Top 3 colaboradores no ranking

#### 🎯 **Desafios**
- **Arquivo**: `src/pages/desafios.html`
- **Descrição**: Mural de missões e desafios gamificados
- **Abas**:
  - **Disponíveis**: Desafios que podem ser aceitos
  - **Em Andamento**: Desafios aceitos com barra de progresso
  - **Concluídos**: Histórico de desafios completados com datas
- **Funcionalidades**:
  - Aceitar desafios
  - Simular progresso (para testes)
  - Ver recompensas em Swift Coins

#### 🏆 **Ranking**
- **Arquivo**: `src/pages/ranking.html`
- **Descrição**: Classificação dos colaboradores
- **Filtros**:
  - **Semanal**: Ranking da semana atual
  - **Mensal**: Ranking do mês atual
  - **Geral**: Ranking de todos os tempos
- **Destaques**:
  - 1º lugar marcado com coroa dourada
  - Posição do usuário logado destacada em laranja

#### 📊 **Relatórios**
- **Arquivo**: `src/pages/relatorios.html`
- **Descrição**: Análise de desempenho com gráficos
- **KPIs**:
  - Vendas realizadas
  - Progresso da meta
  - Swift Coins ganhos
  - Novos clientes
- **Gráficos** (Chart.js):
  - Evolução de vendas (linha)
  - Vendas por categoria (rosca)
- **Filtros**: Este mês, Últimos 3 meses, Este ano

#### 🧾 **Tickets (Vendas)**
- **Arquivo**: `src/pages/tickets.html`
- **Descrição**: Acompanhamento detalhado de vendas
- **KPIs**:
  - Ticket médio
  - Vendas realizadas
  - Total vendido
  - Itens por venda
- **Tabela**: Lista de vendas com ID, cliente, data, itens e valor
- **Filtros**: Hoje, Esta semana, Este mês

#### 📚 **Cursos**
- **Arquivo**: `src/pages/cursos.html`
- **Descrição**: Plataforma de treinamentos
- **Conteúdo**:
  - Curso em destaque no topo
  - Grid de cursos disponíveis
  - Cursos em andamento com barra de progresso
  - Cursos concluídos com certificado
- **Barra de busca** para filtrar cursos

#### 👥 **Cadastro de Clientes**
- **Arquivo**: `src/pages/clientes.html`
- **Descrição**: Gestão de clientes
- **Funcionalidades**:
  - Formulário de cadastro completo
  - Integração automática com **ViaCEP** (preenche endereço pelo CEP)
  - Tabela de clientes cadastrados
  - Busca por nome, CPF/CNPJ ou cidade
  - Botões para editar e excluir (em desenvolvimento)

#### ⚙️ **Configurações**
- **Arquivo**: `src/pages/configuracoes.html`
- **Descrição**: Gerenciamento da conta
- **Seções**:
  - **Informações do Perfil**: Editar nome e telefone
  - **Alterar Senha**: Trocar senha da conta
  - **Preferências de Notificação**: Ativar/desativar notificações
- **Nota**: Alterações são salvas no `localStorage`

#### 🔔 **Notificações**
- **Arquivo**: `src/pages/notificacoes.html`
- **Descrição**: Central de notificações
- **Funcionalidades**:
  - Timeline com notificações agrupadas por data
  - Filtros: Todas / Não lidas
  - Marcar como lida
  - Excluir notificação
  - Marcar todas como lidas
  - Notificações não lidas destacadas com borda laranja
- **Botão extra**: Simular nova notificação (para testes)

#### 🔐 **Login e Cadastro**
- **Arquivos**: `src/pages/index.html` (login) e `src/pages/cadastro.html`
- **Descrição**: Autenticação de usuários
- **Validações**:
  - Campos obrigatórios
  - Senha mínima de 6 caracteres
  - Email único no cadastro

### Menu de Navegação

Todas as páginas (exceto login/cadastro) possuem um menu superior com:

- Logo da Swift
- Links de navegação para todas as páginas
- **Sino de notificações** com badge de contador
- **Menu de perfil** com avatar e nome do usuário
  - Acesso às configurações
  - Botão de sair (logout)

## 📂 Estrutura do Projeto

```
sprint2_frontend/
│
├── src/
│   ├── assets/
│   │   ├── font/               # Fontes customizadas
│   │   └── image/              # Imagens e logos
│   │
│   ├── css/
│   │   ├── menu-fix.css        # Estilos do menu e notificações
│   │   └── style.css           # Estilos gerais e páginas
│   │
│   ├── js/
│   │   ├── auth.js             # Sistema de autenticação
│   │   ├── cadastro.js         # Lógica da página de cadastro
│   │   ├── clientes.js         # Lógica de gestão de clientes
│   │   ├── configuracoes.js    # Lógica das configurações
│   │   ├── cursos.js           # Lógica da página de cursos
│   │   ├── desafios.js         # Sistema de desafios interativo
│   │   ├── home.js             # Lógica do dashboard
│   │   ├── login.js            # Lógica da página de login
│   │   ├── notificacoes.js     # Sistema de notificações
│   │   ├── page-guard.js       # Proteção de páginas (requer login)
│   │   ├── ranking.js          # Sistema de ranking dinâmico
│   │   ├── relatorios.js       # Gráficos e KPIs
│   │   └── tickets.js          # Acompanhamento de vendas
│   │
│   ├── pages/
│   │   ├── cadastro.html       # Página de registro
│   │   ├── clientes.html       # Gestão de clientes
│   │   ├── configuracoes.html  # Configurações da conta
│   │   ├── cursos.html         # Cursos e treinamentos
│   │   ├── desafios.html       # Mural de desafios
│   │   ├── home.html           # Dashboard principal
│   │   ├── index.html          # Página de login
│   │   ├── notificacoes.html   # Central de notificações
│   │   ├── ranking.html        # Ranking de colaboradores
│   │   ├── relatorios.html     # Relatórios de desempenho
│   │   └── tickets.html        # Acompanhamento de vendas
│   │
│   └── styles/
│       ├── cadastro.css        # Estilos específicos do cadastro
│       ├── login.css           # Estilos específicos do login
│       └── style.css           # Variáveis CSS globais
│
└── README.md                   # Este arquivo
```

### Principais Módulos JavaScript

- **auth.js**: Gerencia login, logout, cadastro e verificação de usuário logado
- **page-guard.js**: Protege páginas internas, redirecionando para login se necessário
- **Arquivos de página**: Cada página tem seu próprio JavaScript com lógica específica

## 🧹 Limpando Cache e LocalStorage

### Por que Limpar?

O sistema armazena dados no `localStorage` do navegador:
- Usuários cadastrados
- Usuário logado atualmente
- Preferências de notificação

Se você precisar resetar o sistema ou resolver problemas:

### Como Limpar no Google Chrome

1. Abra o site do Swift
2. Pressione `F12` para abrir o DevTools
3. Vá na aba **"Application"** (ou "Aplicativo")
4. No menu lateral esquerdo, expanda **"Local Storage"**
5. Clique no domínio do site (ex: `http://127.0.0.1:5500`)
6. Clique no botão **"Clear All"** (ícone de 🚫)
7. Recarregue a página com `F5`

### Como Limpar no Firefox

1. Abra o site do Swift
2. Pressione `F12` para abrir as Ferramentas do Desenvolvedor
3. Vá na aba **"Armazenamento"**
4. Expanda **"Armazenamento Local"**
5. Clique com o botão direito no domínio
6. Selecione **"Excluir tudo"**
7. Recarregue a página com `F5`

### Limpando pelo Console

Você também pode executar este comando no Console do navegador:

```javascript
localStorage.clear();
location.reload();
```

### O que Acontece Após Limpar?

- Todos os usuários cadastrados serão apagados
- Você será deslogado automaticamente
- Os **dois usuários padrão** serão recriados automaticamente:
  - `joao@swift.com` / `123456`
  - `maria@swift.com` / `123456`

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas
- **CSS3**: Estilização e responsividade
- **JavaScript (Vanilla)**: Toda a lógica sem frameworks
- **Bootstrap 5.3.3**: Framework CSS para componentes
- **Font Awesome 6**: Ícones
- **Chart.js**: Gráficos interativos
- **ViaCEP API**: Busca automática de endereços

## 📝 Observações Importantes

- Os dados são armazenados localmente no navegador (não há backend)
- Os dados mockados (desafios, ranking, etc.) são apenas para demonstração
- As senhas são armazenadas sem criptografia (apenas para fins educacionais)
- Em produção, seria necessário implementar um backend real com banco de dados

## 🎨 Características de Design

- **Cor principal**: Laranja Swift (#F2522E)
- **Tipografia**: Segoe UI / Roboto
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Acessibilidade**: Uso de cores de alto contraste e ícones descritivos

## 🐛 Solução de Problemas

### Problema: Página não carrega CSS/JS

**Solução**: Certifique-se de estar executando o servidor a partir da pasta raiz do projeto (`sprint2_frontend`).

### Problema: Não consigo fazer login

**Solução**: 
1. Limpe o localStorage (veja seção acima)
2. Use um dos usuários padrão: `joao@swift.com` / `123456`

### Problema: Imagens não aparecem

**Solução**: Verifique se está usando um servidor local (Live Server, Python, etc.) e não apenas abrindo o arquivo HTML diretamente.
