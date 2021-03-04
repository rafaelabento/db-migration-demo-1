# Database migration demo

## Instalando `Node.js`

- Acesse <https://nodejs.org> e baixe a útlima versão LTS do Node.js
- Proceda com o wizard de instalação até o fim mantendo as configurações padrão
- Verifique sua instalação executando no terminal `node -v`

## Instalando `PowerShell` (apenas usuários Windows)

- Acesse <https://github.com/PowerShell/PowerShell/releases/tag/v7.1.2> e baixe a última versão (arquivo `.msi`)
  - Role a página para baixo até a sessão de `Assets`
- Execute o instalador e proceda com o wizard de instalação até o fim mantendo as configurações padrão

## Instalando `git` (apenas usuários Windows)

- Acesse <https://git-scm.com/download/win> e baixe a última versão do instalador
- Proceda com o wizard de instalação até o fim mantendo as configurações padrão

## Criando a aplicação de demonstração

- Clone este repositório executando o comando `git clone https://github.com/pedrolacerda/db-migration-demo.git`
  - Usuários Windows podem executar os comandos via `PowerShell` ou `Git CMD`
- Acesse a pasta `db-migration-demo` executando `cd db-migration-demo`

### Instalando `Loopback 4`

- Execute o comando `npm install -g @loopback/cli`

### Criando um novo projeto (opcional)
- Crie um novo projeto executando o comando `lb4 app`
- Preencha os campos requisitados no terminal. Ex:

```bash
? Project name: (projects) db-migration-demo
? Project description: (projects) A simple Payment API
? Project root directory: (db-migration-demo) 
? Application class name: (DbMigrationDemoApplication)
? Select project build settings: (Press <space> to select, <a> to toggle all, <i> to invert selection) ... Press enter for default selection
? Yarn is available. Do you prefer to use it by default? No
```

Em seguida serão criados diretórios e arquivos padrão para o projeto e também executado `npm install` para configuração das dependências.

- Acesse a pasta do projeto `cd db-migration-demo`
- Execute `npm start`
- Acesse <http://127.0.0.1:3000/>

## Instalando `db-migrate`

- Acesse o diretório `db-migration-demo` dentro do repositório de mesmo nome (`db-migration-demo/db-migration-demo`)
- Instale o framework `db-migrate` executando `npm install -g db-migrate`
- Nós vamos utilizar um banco de dados MySQL, portanto é necessária a instalação do pacote que fará a gestão das conexões por nós `npm install --save db-migrate-mysql`

## Instalando MySQL

