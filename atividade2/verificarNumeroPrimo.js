function verificarNumeroPrimo(num) {
let primo = true;

if (num <= 1) {
    primo = false;
    return console.log(primo);
}
if (num % 2 == 0 && num != 2 && num) {
    primo = false;
    return console.log(primo);
}

for (let i = 3; i < num; i += 2) {
    if (num % i == 0) {
        primo = false;
        return console.log(primo);
    }
}
return console.log(primo);;
}

verificarNumeroPrimo(0);
verificarNumeroPrimo(1);
verificarNumeroPrimo(2);
verificarNumeroPrimo(3);
verificarNumeroPrimo(7);
verificarNumeroPrimo(83);
verificarNumeroPrimo(100);
verificarNumeroPrimo(991);
verificarNumeroPrimo(104729);
verificarNumeroPrimo(14348907);
