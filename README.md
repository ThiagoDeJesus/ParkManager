## Desafio de vaga Back-end
Desafio desenvolvido pela FCamara onde o objetivo é criar uma API REST para gerenciar empresas com estacionamento de carros e motos.
[Repositório original](https://github.com/fcamarasantos/backend-test-java)

## Cadastro de estabelecimento

Criar um cadastro da empresa com os seguintes campos:
- [x] Nome;
- [x] CNPJ;
- [x] Endereço;
- [x] Telefone;
- [x] Quantidade de vagas para motos;
- [x] Quantidade de vagas para carros.

**Todos** os campos são de preenchimento obrigatório.

## Cadastro de veículos

Criar um cadastro de veículos com os seguintes campos:
- [x] Marca;
- [x] Modelo;
- [x] Cor;
- [x] Placa;
- [x] Tipo.

**Todos** os campos são de preenchimento obrigatório.

## Funcionalidades

   - [x] **Estabelecimento:** CRUD;
   - [x] **Veículos:** CRUD;
   - [x] **Controle de entrada e saída de veículos.**

## Requisitos

   - [x] Modelagem de dados;
   - [x] Retorno em JSON;
   - [x] Retorno em XML;
   - [x] Requisições GET, POST, PUT ou DELETE, conforme a melhor prática;
   - [x] A persistência dos dados pode ser realizada da maneira que preferir;
   - [x] Criar README do projeto descrevendo as tecnologias utilizadas, chamadas dos serviços e configurações necessário para executar a aplicação.
   
## Ganha mais pontos
   - [ ] Desenvolver utilizando TDD;
   - [ ] Criar API de relatório;
   - [ ] Sumário da quantidade de entrada e saída;
   - [ ] Sumário da quantidade de entrada e saída de veículos por hora;
   - [ ] Criar uma solução de autenticação.

## Tecnologias utilizadas

<a href="https://www.typescriptlang.org/">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
<a href="https://nodejs.org/">![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="https://expressjs.com/pt-br/">![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)</a>
<a href="https://www.postgresql.org/">![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)</a>
<a href="https://www.prisma.io/">![Prisma](https://img.shields.io/badge/Prisma-52B0E7?style=for-the-badge&logo=Prisma&logoColor=white)</a>

## Como executar

- Clone o repositório
- Rode `yarn ou npm install` para baixar as dependências
- Rode `docker-compose up` para subir o container do banco de dados
- Aguarde o container estar de pé e então rode  `npx prisma migrate dev` em um novo terminal para criar as tabelas do banco de dados.
- Rode o `yarn dev ou npm run dev` para iniciar a aplicação.

Por fim, a aplicação estará disponível em `http://localhost:4000`

## O que eu aprendi

- Começar a documentação desde o início do projeto.
- Modelar e gerenciar os dados com o Prisma