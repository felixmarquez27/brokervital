/*
let a = 1;
let b = 2;
let c = 3;
alert();
let desafio = () => {
    for (let i = 0; i < 31; i++) {
        let suma = a + b + c;
        console.log(`(posicion ${i+4})(${a}+${b}+${c})= ${suma}`);
        a = b;
        b = c;
        c = suma;

    }



}
*/


let an_1 = (n) => {

    let parte1 = 1 / Math.sqrt(5);
    let parte2 = Math.pow(((1 + Math.sqrt(5)) / 2), (n));
    let parte3 = Math.pow(((1 - Math.sqrt(5)) / 2), (n));
    let an1 = parte1 * (parte2 - parte3);
    return an1;
}

let an_2 = (n) => {

    let parte1 = 1 / Math.sqrt(5);
    let parte2 = Math.pow(((1 + Math.sqrt(5)) / 2), (n - 2));
    let parte3 = Math.pow(((1 - Math.sqrt(5)) / 2), (n - 2));
    let an2 = parte1 * (parte2 - parte3);
    return an2;
}

let an_3 = (n) => {

    let parte1 = 1 / Math.sqrt(5);
    let parte2 = Math.pow(((1 + Math.sqrt(5)) / 2), (n - 3));
    let parte3 = Math.pow(((1 - Math.sqrt(5)) / 2), (n - 3));
    let an3 = parte1 * (parte2 - parte3);
    return an3;
}


let desafio = (n) => {
    an = an_1(n - 1) + an_1(n - 2) + an_1(n - 3);
    console.log(an);
}