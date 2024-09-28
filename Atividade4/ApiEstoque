const express = require('express');
const app = express();

let estoque = {};

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    if (estoque[id]) {
        return res.status(400).json({ erro: 'Produto já existe' });
    }
    estoque[id] = { nome, qtd: parseInt(qtd) };
    res.status(200).json({ mensagem: 'Produto adicionado', produto: estoque[id] });
});

app.get('/listar', (req, res) => {
    res.status(200).json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    if (!estoque[id]) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    const produtoRemovido = estoque[id];
    delete estoque[id];
    res.status(200).json({ mensagem: 'Produto removido', produto: produtoRemovido });
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    if (!estoque[id]) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    estoque[id].qtd = parseInt(qtd);
    res.status(200).json({ mensagem: 'Quantidade atualizada com sucesso', produto: estoque[id] });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
