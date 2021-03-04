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

- Baixe a última versão do [`MySQL Community Server`](https://dev.mysql.com/downloads/mysql/) acessando o link <https://dev.mysql.com/downloads/mysql/> e siga o processo de instalação padrão até o fim.
  - Você deverá criar uma senha para o usuário `root`
- Baixe a ultima versão do [`MySQL Workbench`](https://www.mysql.com/products/workbench/) acessando o link <https://dev.mysql.com/downloads/workbench/> e siga o processo de instalação padrão até o fim
- Verifique se o MySQL está rodando `mysqladmin` em seguida insira sua senha. Você deve receber uma confirmação ```mysqld is alive```
  - Caso o seu MySQL não esteja rodando, execute: `$ sudo service mysql start`

### Criando um schema

- Abra o MySQL Workbench e selecione a instância local, insira a senha que você definiu para o `root`

![image](https://user-images.githubusercontent.com/609076/110030723-d4ec3580-7d14-11eb-8966-3e2b335bf9b4.png)

- Selecione a aba `Schemas` clique com o botão direito no campo `Schemas` e selecione a opção `Create Schema...`

![image](https://user-images.githubusercontent.com/609076/110030963-1977d100-7d15-11eb-9e23-65c2ba67f994.png)

- Em `Schema Name` insira: `db-migration-demo`. Selecione `Apply` e em seguida, no pop-up, selecione `Apply` novamente. Em seguida clique em `Close`. Pronto, nosso Schema foi criado.

### Conectando `node-db-migrate` ao nosso Banco de Dados

- Na pasta `db-migration-demo`, crie um arquivo chamado `database.json` e insira o seguinte conteúdo

```json
{
  "dev": {
    "driver": "mysql",
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "<sua_senha>",
    "database": "db-migration-demo"
  }
}
```

## Criando um novo script de migração

- Podemos criar um novo script de migração executando o seguinte comando:

```bash
db-migrate create user
[INFO] Created migration at /db-migration-demo/db-migration-demo/migrations/20210304212353-user.js
```

Um script de migração representa uma nova versão, ou estado, do nosso banco de dados. Após executar o comando acima, um novo diretório é criado, contendo um novo arquivo `.js`.
