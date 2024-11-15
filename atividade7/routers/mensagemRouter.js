const express = require('express');
const path = require('path');
const Mensagem = require('../models/mensagem');
const Usuario = require('../models/usuario');
const router = express.Router();

// Middleware de autenticação
function autenticar(req, res, next) {
    if (req.session.autenticado) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Rota para obter o mural de mensagens
router.get('/mural', autenticar, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/mural.html'));
});

// Rota para obter todas as mensagens (API)
router.get('/api/mensagens', autenticar, async (req, res) => {
    try {
        const mensagens = await Mensagem.findAll({ include: Usuario });
        res.json(mensagens);
    } catch (error) {
        console.error("Erro ao carregar o mural:", error);
        res.status(500).json({ error: "Erro ao carregar o mural." });
    }
});

// Rota para exibir a página de cadastro de nova mensagem
router.get('/mensagem/cadastro', autenticar, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cadastro_mensagem.html'));
});

// Rota para processar o envio de uma nova mensagem
router.post('/mensagem', autenticar, async (req, res) => {
    const { titulo, conteudo } = req.body;
    try {
        await Mensagem.create({ titulo, conteudo, usuarioId: req.session.usuario.id });
        res.redirect('/mural');
    } catch (error) {
        console.error("Erro ao criar a mensagem:", error);
        res.status(500).send("Erro ao criar a mensagem.");
    }
});

// Rota para obter os detalhes de uma mensagem (API)
router.get('/api/mensagem/:id', autenticar, async (req, res) => {
    try {
        const mensagem = await Mensagem.findByPk(req.params.id, { include: Usuario });
        if (mensagem) {
            res.json(mensagem); // Retorna os detalhes da mensagem
        } else {
            res.status(404).json({ error: "Mensagem não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao carregar os detalhes da mensagem:", error);
        res.status(500).json({ error: "Erro ao carregar os detalhes da mensagem" });
    }
});


// Rota para deletar uma mensagem
router.delete('/api/mensagem/:id', autenticar, async (req, res) => {
    try {
        const mensagem = await Mensagem.findByPk(req.params.id);
        if (mensagem) {
            await mensagem.destroy();
            res.json({ success: "Mensagem deletada com sucesso" });
        } else {
            res.status(404).json({ error: "Mensagem não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao deletar a mensagem:", error);
        res.status(500).json({ error: "Erro ao deletar a mensagem" });
    }
});

// Rota para editar uma mensagem
router.put('/api/mensagem/:id', autenticar, async (req, res) => {
    const { titulo, conteudo } = req.body;
    try {
        const mensagem = await Mensagem.findByPk(req.params.id);
        if (mensagem) {
            mensagem.titulo = titulo;
            mensagem.conteudo = conteudo;
            await mensagem.save();
            res.json({ success: "Mensagem atualizada com sucesso" });
        } else {
            res.status(404).json({ error: "Mensagem não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao editar a mensagem:", error);
        res.status(500).json({ error: "Erro ao editar a mensagem" });
    }
});
router.get('/mensagem/:id', autenticar, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/detalhes.html'));
});

module.exports = router;
