const checkbox = document.querySelectorAll('.checkbox');
const campoSenha = document.getElementById('campoSenha');
const tamanhoSenhaInput = document.getElementById('tamanhoSenha');
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
for (let i = 0; i < checkbox.length; i++) {
checkbox[i].onclick = geraSenha;
}
function geraSenha() {
let alfabeto = '';
if (checkbox[0].checked) alfabeto += letrasMaiusculas;
if (checkbox[1].checked) alfabeto += letrasMinusculas;
if (checkbox[2].checked) alfabeto += numeros;
if (checkbox[3].checked) alfabeto += simbolos;
let senha = '';
let tamanhoSenha = parseInt(tamanhoSenhaInput.value);
for (let i = 0; i < tamanhoSenha; i++) {
let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
senha += alfabeto[numeroAleatorio];
}
campoSenha.value = senha;
}