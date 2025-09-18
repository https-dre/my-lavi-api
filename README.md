# Laví API

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

![Maintainer](https://img.shields.io/badge/maintainer-https--dre-blue)

## Sobre o Projeto

A **Laví API** é o backend responsável por gerenciar os workflows e as regras de negócio do aplicativo "Laví". Construída com foco em performance e escalabilidade, utilizando um stack moderno com Elysia, Bun e TypeScript.

### Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas:

  * [Bun](https://bun.sh/) (v1.2 ou superior)
  * [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)

## Instalação

1.  **Clone o repositório:**

    ```sh
    git clone https://github.com/laundry-lavi/lavi-api.git
    cd lavi-api
    ```

### Executando a Aplicação

1.  **Inicie o banco de dados com Docker:**
    Este comando irá iniciar um container com o PostgreSQL em background.

    ```sh
    docker-compose up database -d
    ```

2.  **Execute as migrações do banco de dados**

    ```sh
    bunx drizzle-kit migrate
    ```

3.  **Inicie a API usando docker:**

    ```sh
    docker-compose up api -d
    ```

A API estará disponível em `http://localhost:{PORT}`, onde `{PORT}` é a porta que você definiu no seu arquivo `.env`.

-----

### Variáveis de Ambiente (.env)

Estas são as variáveis necessárias para o funcionamento da aplicação. Elas devem ser definidas em um arquivo `.env` na raiz do projeto.

```properties
# Configurações da Aplicação
PORT=3333

# Banco de Dados (API e Docker)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=dbname

# Chaves de Segurança
ENCRYPT_CORE_KEY=sua-chave-secreta-para-criptografia
BLIND_KEY=sua-chave-secreta-para-hmac
JWT_KEY=sua-chave-secreta-para-jwt

# Configurações da AWS S3
BUCKET_NAME=nome-do-seu-bucket
AWS_ACCESS_KEY_ID=seu-access-key-id
AWS_SECRET_ACCESS_KEY=seu-secret-access-key
AWS_REGION=us-east-1
```

## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um **Fork** do projeto.
2.  Crie uma nova Branch (`git checkout -b feature/sua-feature`).
3.  Faça o **Commit** das suas alterações (`git commit -m '...'`).
4.  Faça o **Push** da Branch (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

## Sobre o Projeto

EQUIPE: André de Oliveira, Arthur Rolemberg, Beatriz Bezerra,
Eduardo Rossi e Gabriel Durbano.

DESENVOLVEDORES:

- André Dias [@https-dre](https://github.com/https-dre)
- Arthur Rolemberg [@Massivo5040](https://github.com/Massivo5040)

ORIENTADORA: Nathane De Castro.

## Contato

André Dias - [diaso.andre@outlook.com](mailto:diaso.andre@outlook.com)
