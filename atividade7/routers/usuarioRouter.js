const express = require('express');
const path = require('path');
const Usuario = require('../models/usuario');
const router = express.Router();

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cadastro_usuario.html'));
});

router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        await Usuario.create({ nome, email, senha });
        res.redirect('/login');
    } catch (err) {
        res.redirect('/cadastro?erro=1');
    }
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email, senha } });
        if (usuario) {
            req.session.usuario = usuario;
            req.session.autenticado = true;
            res.redirect('/mural');
        } else {
            res.redirect('/login?erro=1');
        }
    } catch (err) {
        console.error("Erro durante o login:", err);
        res.status(500).send("Ocorreu um erro no servidor.");
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao encerrar a sessão:", err);
            return res.status(500).send("Erro ao encerrar a sessão.");
        }
        res.redirect('/login');
    });
});

module.exports = router;
