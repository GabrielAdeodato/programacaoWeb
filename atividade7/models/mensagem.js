const Sequelize = require('sequelize');
const db = require('../db');
const Usuario = require('./usuario');

const Mensagem = db.define('mensagem', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: Sequelize.STRING, allowNull: false },
    conteudo: { type: Sequelize.TEXT, allowNull: false }
});

Mensagem.belongsTo(Usuario);

module.exports = Mensagem;
