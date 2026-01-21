# Back-end Parko 🚗

## Sobre o projeto
Esta aplicação é responsável pelo back-end da plataforma **Parko**, realizando o processamento de dados e a comunicação direta com o banco de dados **MySQL** em produção.

O projeto foi desenvolvido utilizando **Node.js** e **Express**, seguindo uma arquitetura voltada para APIs REST.

O deploy do servidor é realizado na plataforma **Railway**, onde as credenciais e dados sensíveis ficam armazenados nas variáveis de ambiente com praticidade

> Este repositório contém apenas o código back-end. Dados sensíveis e credenciais não estão versionados.

---

## Tecnologias utilizadas
- Node.js
- Express
- MySQL
- Nodemailer
- JWT
- Axios
- Cors
- Bcrypt
- Mercadopago

---

## Pré-requisitos
Antes de começar, você vai precisar ter instalado:
- Node.js (versão recomendada: >= 18)
- MySQL
- npm ou yarn

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse a pasta do projeto
cd backend-parko

# Instale as dependências
npm install

## Banco de dados

Por razões de segurança, este projeto **não inclui o banco de dados de produção**.

Para executar localmente:
- Crie um banco MySQL local
- Configure as variáveis de ambiente
- Opcionalmente utilize dados fictícios para testes

Para executar a aplicação localmente, siga os passos abaixo:

### 1- Crie um banco de dados MySQL
mysql -u root -p -e "CREATE DATABASE parko_db;"

### 2- Crie a estrutura das tabelas
mysql -u root -p parko_db < database/schema.sql

### 3- Criar dados fictícios
mysql -u root -p parko_db < database/seed.sql

# Rodar no ambiente de desenvolvimento
npm run dev
