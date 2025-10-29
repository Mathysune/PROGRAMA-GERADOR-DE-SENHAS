document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.checkbox');
  const campoSenha = document.getElementById('campoSenha');
  const tamanhoSenhaInput = document.getElementById('tamanhoSenha');
  const gerarBtn = document.getElementById('gerarBtn');
  const forcaBar = document.querySelector('.forca');
  const parametroTextos = document.querySelector('.parametro-senha-textos');

  const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const simbolos = '!@%*?';

  // abas (tabs) — função para mostrar uma aba e trocar estado dos botões
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  function showTab(name) {
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    tabPanes.forEach(p => p.classList.toggle('active', p.id === name));
  }
  tabBtns.forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));

  function classificaSenha(tamanho) {
    if (!forcaBar) return;
    forcaBar.classList.remove('fraca','media','forte');
    if (tamanho >= 12) {
      forcaBar.classList.add('forte');
      parametroTextos.textContent = 'Forte';
    } else if (tamanho >= 6) {
      forcaBar.classList.add('media');
      parametroTextos.textContent = 'Média';
    } else {
      forcaBar.classList.add('fraca');
      parametroTextos.textContent = 'Fraca';
    }
  }

  function geraSenha() {
    // somente gera senha a partir das opções selecionadas (sem nomes/datas)
    const includeUpper = checkboxes[0] && checkboxes[0].checked;
    const includeLower = checkboxes[1] && checkboxes[1].checked;
    const includeNumbers = checkboxes[2] && checkboxes[2].checked;
    const includeSymbols = checkboxes[3] && checkboxes[3].checked;

    const tamanho = Math.max(4, Math.min(40, parseInt(tamanhoSenhaInput.value, 10) || 8));

    let pool = '';
    if (includeUpper) pool += letrasMaiusculas;
    if (includeLower) pool += letrasMinusculas;
    if (includeNumbers) pool += numeros;
    if (includeSymbols) pool += simbolos;

    if (!pool.length) {
      alert('Por favor selecione ao menos um tipo de caractere.');
      return;
    }

    let senha = '';
    for (let i = 0; i < tamanho; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      senha += pool.charAt(idx);
    }

    campoSenha.value = senha;
    classificaSenha(tamanho);
    // ir automaticamente para a aba de resultado
    showTab('resultado');
  }

  // removed creative generation functions (names/dates) per user's request

  function transformaNomeCriativo(nome, { includeUpper, includeLower, includeNumbers, includeSymbols }) {
    // remove espaços duplicados e acentos simples
    let s = nome.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    s = s.replace(/\s+/g, '');
    // aplica leet substitutions em parte (mas só usa símbolos/números se permitidos)
    const map = { a: '@', A: '@', e: '3', E: '3', i: '1', I: '1', o: '0', O: '0', s: '$', S: '$' };
    let out = '';
    for (let ch of s) {
      // se o mapeamento resulta em símbolo/numero e não permitido, evita a substituição
      const mapped = map[ch];
      if (mapped && (/[0-9@\$]/.test(mapped))) {
        if (mapped === '3' || mapped === '1' || mapped === '0') {
          if (includeNumbers && Math.random() < 0.35) { out += mapped; continue; }
        } else {
          if (includeSymbols && Math.random() < 0.35) { out += mapped; continue; }
        }
      }
      // caso contrário, adiciona letra respeitando preferências de caixa
      if (includeUpper && !includeLower) out += ch.toUpperCase();
      else if (includeLower && !includeUpper) out += ch.toLowerCase();
      else out += (Math.random() < 0.5 ? ch.toLowerCase() : ch.toUpperCase());
    }
    // opcionalmente adicionar símbolo/numero ao final se permitido
    let suffix = '';
    if (includeSymbols) {
      suffix += simbolos.charAt(Math.floor(Math.random() * simbolos.length));
    }
    if (includeNumbers) {
      suffix += String(Math.floor(Math.random() * 90) + 10);
    }
    return out + suffix;
  }

  function transformaDataCriativa(data, { includeUpper, includeLower, includeNumbers, includeSymbols }) {
    // tenta extrair ano, mes, dia
    const parts = data.includes('/') ? data.split('/') : data.includes('-') ? data.split('-') : [data];
    // normalizar para ano-mes-dia se possível
    let year = '';
    let day = '';
    let month = '';
    if (parts.length === 3) {
      if (parts[0].length === 4) { // yyyy-mm-dd
        year = parts[0]; month = parts[1]; day = parts[2];
      } else { // dd/mm/yyyy
        day = parts[0]; month = parts[1]; year = parts[2];
      }
    } else if (parts[0].length === 4) year = parts[0];
    if (!year) year = String(new Date().getFullYear());

    // se apenas números permitidos, usamos ano+mes+dia compactos
    if (includeNumbers && !includeUpper && !includeLower && !includeSymbols) {
      const digits = (year || '') + (month || '') + (day || '');
      return digits.replace(/[^0-9]/g, '').slice(0, 10);
    }

    // caso contrário, constrói uma string que respeite flags
    let out = '';
    if (includeNumbers) out += (year || '').slice(0,4);
    if (includeSymbols) out += simbolos.charAt(Math.floor(Math.random() * simbolos.length));
    if (includeLower || includeUpper) {
      const letter = letrasMinusculas.charAt(Math.floor(Math.random() * letrasMinusculas.length));
      out += (includeUpper && !includeLower) ? letter.toUpperCase() : (includeLower && !includeUpper) ? letter.toLowerCase() : (Math.random() < 0.5 ? letter.toUpperCase() : letter.toLowerCase());
    }
    return out;
  }

  gerarBtn.addEventListener('click', geraSenha);
  tamanhoSenhaInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') geraSenha(); });

  // remoção do comportamento de copiar ao clicar no campo de resultado
  // agora a cópia é feita apenas pelo botão '#copyBtn'

  // botão de cópia (na instrução abaixo da senha)
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      if (!campoSenha.value) return;
      try {
        await navigator.clipboard.writeText(campoSenha.value);
        const prevText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        copyBtn.classList.add('copied');
        setTimeout(() => { copyBtn.textContent = prevText; copyBtn.classList.remove('copied'); }, 900);
      } catch (err) {
        alert('Não foi possível copiar automaticamente. Copie a senha manualmente a partir do campo acima.');
      }
    });
  }
});
