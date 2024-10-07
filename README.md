Para instalar as dependencias do projeto só utilizar o comando "npm install"
Para rodar o projeto em modo de desenvolvedor basta dar o comando "npm run dev"
Para dar build usar o comando "npm run build"
Para rodar após as build utilizar "npm run start"

Foi utilizado o sqlite como banco de dados para criar usuarios e documentos, basta usar o comando "npx prisma studio" para acessar as tabelas e colunas do banco de dados

a api consta com 10 rotas, sendo elas

"/users" para acessar todos usuarios
"/user/:id" para obter apenas um usuario
"/user/signup" para fazer o cadastro e receber um token jwt
"/user/signin" para fazer o login e receber um token jwt
"/user/:id" com metodo put para editar um usuario
"/user/:id" com metodo delete para remover um usuario

"/user/:user_id/doc/:id" para acessar um documento de um usuario especifico
"/user/:user_id/doc" para criar um documento novo para um usuario
"/user/:user_id/doc/:id" com metodo put para editar um documento existente
"/user/:user_id/doc/:id" com metodo delete para remover um documento
