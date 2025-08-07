

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
function classificaSenha(tamanhoSenha) {
  forcaSenha.classList.remove('fraca', 'media', 'forte');

  if (tamanhoSenha > 11) {
    forcaSenha.classList.add('forte');
  } else if (tamanhoSenha > 5 && tamanhoSenha < 12) {
    forcaSenha.classList.add('media');
  } else if (tamanhoSenha <= 5) {
    forcaSenha.classList.add('fraca');
  }
}
const forcaSenha = document.querySelector('.forca');
function geraSenha() {
if (tamanhoSenha > 11) {
    forcaSenha.classList.add('forte');
  } else if (tamanhoSenha > 5 && tamanhoSenha < 12) {
    forcaSenha.classList.add('media');
  } else if (tamanhoSenha <= 5) {
    forcaSenha.classList.add('fraca');
  }
}
{
  let caracteres = '';
  if (checkbox[0].checked) caracteres += letrasMaiusculas;
  if (checkbox[1].checked) caracteres += letrasMinusculas;
  if (checkbox[2].checked) caracteres += numeros;
  if (checkbox[3].checked) caracteres += simbolos;
  const tamanhoSenha = parseInt(tamanhoSenhaInput.value);
  let senha = '';
  for (let i = 0; i < tamanhoSenha; i++) {
    const index = Math.floor(Math.random() * caracteres.length);
    senha += caracteres.charAt(index);
  }
  campoSenha.value = senha;
  classificaSenha(tamanhoSenha); // chama a função de classificação
}
