const express = require('express');
const calculadora = require('./util/calculadora');

const app = express();

app.get('/somar/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const c = calculadora.somar(Number(a), Number(b));
    res.send(`${a} + ${b} = ${c}`);
});

app.get('/subtrair/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const c = calculadora.subtrair(Number(a), Number(b));
    res.send(`${a} - ${b} = ${c}`);
});

app.get('/multiplicar/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const c = calculadora.multiplicar(Number(a), Number(b));
    res.send(`${a} * ${b} = ${c}`);
});

app.get('/dividir/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const c = calculadora.dividir(Number(a), Number(b));
    res.send(`${a} / ${b} = ${c}`);
});

const PORT = 8080;
app.listen(PORT, () =>{
    console.log(`app executando na porta: ${PORT}`);
});
