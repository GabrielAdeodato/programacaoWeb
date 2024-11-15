const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');


const usuarioRouter = require('./routers/usuarioRouter');
const mensagemRouter = require('./routers/mensagemRouter');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(session({ secret: 'segredo', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', usuarioRouter);
app.use('/', mensagemRouter);

db.sync().then(() => console.log('Banco de dados sincronizado.'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000.'));
