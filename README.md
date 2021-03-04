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

- Crie uma pasta chamada `db-migration-demo`
  - Você pode executar o comando `mkdir db-migration-demo`)
- Abra o seu terminal a partir desta pasta
  - Caso você tenha criado a partir do terminal, acesse a pasta via `cd db-migration-demo`

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

![image](https://user-images.githubusercontent.com/609076/110032821-5e9d0280-7d17-11eb-9be9-47b1f440065b.png)

### Criando uma nova tabela de Usuários

Vamos criar uma nova tabela usando nosso script de migração. Altere o arquivo de migração para que as funções `up` e `down` tenham o seguinte conteúdo:

```javascript
exports.up = function(db, callback) {
  db.createTable('user', {
    id: {
      type: 'int',
      primaryKey: true
    },
    full_name: {
      type: 'string',
      length: 40
    },
    dob: {
      type: 'date'
    },
    email: {
      type: 'string',
      length: 50
    },
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  db.dropTable('user', callback);
};
```

Este script deve criar uma nova tabela quando nós movemos a versão do banco de dados para a frente (`up`) e deletar a tabela quando revertermos (`down`).

- Execute `db-migrate up` para testar o script.
  - Caso o script lance um erro de conexão, execute as seguintes queries
    - `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'` - substituia `password` pela sua senha do BD
    - `flush privileges;`

Você receberá a seguinte confirmação:

```bash
db-migrate up
[INFO] Processed migration 20210304212353-user
[INFO] Done
```

Caso você execute novamente `db-migrate up` verá que a migração não será executada, retornando o status:

```bash
[INFO] No migrations to run
[INFO] Done
```

Isto porque o `db-migrate` framework monitora quais scripts foram executados em uma tabela separada chamada `migrations`.

Caso você execute `db-migrate down` verá que a tabela `user` foi apagada e a tabela `migrations` não contém nenhuma linha.

### Alterando o esquema de dados

Imagine que, por algum motivo, a equipe identificou a necessidade de quebrar a coluna `full_name` em `firstname` e `lastname`.

Para evitar execução manual de scripts para modificação da tabela, nós vamos criar uma nova migration. Desse modo acompanhamos e versionamos todas as modificações.

```bash
db-migrate create update-user
[INFO] Created migration at /db-migration-demo/db-migration-demo/migrations/20210304222839-update-user.js
```

Nós queremos aplicar as seguintes modificações:

1. Adicionar uma nova coluna chamada `firstname`
2. Adicionar uma nova coluna chamada `lastname`
3. Mover os dados da coluna `full_name` para as colunas `firstname` e `lastname` separadamente (não faz parte do exercício mas iremos discutir)
4. Remover a antiga coluna chamada `full_name`

Altere o novo arquivo de migração para que as funções `up` e `down` seja as seguintes:

```javascript
exports.up = function (db, callback) {
  db.addColumn('user', 'firstname', {
    type: 'string',
    length: 50
  }, function(err) {
    if (err) return callback(err);
    
    db.addColumn('user', 'lastname', {
      type: 'string',
      length: 50
    }, function(err) {
      if (err) return callback(err);
      db.removeColumn('user', 'full_name', callback);
    });
  });
};
exports.down = function (db, callback) {
  db.addColumn('user', 'full_name', {
    type: 'string',
    length: 50
  }, function(err) {
    if (err) return callback(err);
    
    db.removeColumn('user', 'lastname', function(err) {
      if (err) return callback(err);
      db.removeColumn('user', 'firstname', callback)
    });
  });
};
```

Execute `db-migrate up` para validar as migrações

```bash

```
