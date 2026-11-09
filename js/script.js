// ---------- Tema claro / escuro ----------
const raiz = document.documentElement;
const btnTema = document.getElementById('btn-tema');

btnTema.addEventListener('click', () => {
  const novo = raiz.dataset.theme === 'light' ? 'dark' : 'light';
  raiz.dataset.theme = novo;
  try { localStorage.setItem('tema', novo); } catch (e) {}
});

// ---------- Cabeçalho: fundo ao rolar ----------
const topo = document.getElementById('topo');

function atualizarTopo() {
  topo.classList.toggle('rolado', window.scrollY > 20);
}
window.addEventListener('scroll', atualizarTopo, { passive: true });
atualizarTopo();

// ---------- Menu mobile ----------
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');

function fecharMenu() {
  menuMobile.classList.remove('aberto');
  document.body.classList.remove('menu-aberto');
  menuMobile.setAttribute('aria-hidden', 'true');
  btnMenu.setAttribute('aria-expanded', 'false');
  btnMenu.setAttribute('aria-label', 'Abrir menu');
  document.body.style.overflow = '';
}

btnMenu.addEventListener('click', () => {
  const abrir = !menuMobile.classList.contains('aberto');
  if (!abrir) return fecharMenu();
  menuMobile.classList.add('aberto');
  document.body.classList.add('menu-aberto');
  menuMobile.setAttribute('aria-hidden', 'false');
  btnMenu.setAttribute('aria-expanded', 'true');
  btnMenu.setAttribute('aria-label', 'Fechar menu');
  document.body.style.overflow = 'hidden';
});

menuMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', fecharMenu));

// ---------- Link ativo no menu conforme a seção visível ----------
const secoes = ['inicio', 'projetos', 'stack', 'experiencia', 'contato'].map(id => document.getElementById(id));
const linksMenu = document.querySelectorAll('.menu-link');

const obsSecoes = new IntersectionObserver((entradas) => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return;
    linksMenu.forEach(l => l.classList.toggle('ativo', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
secoes.forEach(s => obsSecoes.observe(s));

// ---------- Animação de entrada ----------
const obsRevelar = new IntersectionObserver((entradas) => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visivel');
      obsRevelar.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.revelar').forEach((el, i) => {
  // pequeno atraso em cascata para elementos irmãos
  el.style.transitionDelay = (i % 6) * 60 + 'ms';
  obsRevelar.observe(el);
});

// ---------- Marquee de tecnologias ----------
const tecnologias = [
  ['Python', true], ['FastAPI', true], ['PostgreSQL', true], ['JavaScript', false], ['TypeScript', false],
  ['HTML', false], ['CSS', false], ['Java', true], ['SQL', false], ['Redis', false], ['Celery', false],
  ['Django', false], ['Streamlit', false], ['Gemini', true], ['Pinecone', false], ['OpenCV', false], ['Docker', false], ['Git', false], ['Linux', false]
];

function montarMarquee(id, lista) {
  const trilha = document.getElementById(id);
  // duplica a lista para a animação de -50% emendar sem salto
  const dupla = lista.concat(lista);
  trilha.innerHTML = dupla.map(([nome, destaque]) =>
    `<span class="chip${destaque ? ' destaque' : ''}">${nome}</span>`
  ).join('');
}
montarMarquee('marquee-1', tecnologias);
montarMarquee('marquee-2', tecnologias.slice().reverse());

// ---------- Stack por grupo ----------
const icones = {
  codigo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
  servidor: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></svg>',
  banco: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0"/></svg>',
  tela: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  caixa: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>',
  ramo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9M6 9v6"/></svg>',
  raio: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
  terminal: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 17 6-6-6-6M12 19h8"/></svg>',
  livro: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>'
};

const grupos = [
  { titulo: 'Back-end', itens: [['Python', 'codigo'], ['Django REST', 'servidor'], ['FastAPI', 'raio'], ['Streamlit', 'tela'], ['Java', 'codigo']] },
  { titulo: 'IA aplicada', itens: [['Gemini', 'raio'], ['RAG', 'livro'], ['Embeddings', 'codigo'], ['Pinecone', 'banco']] },
  { titulo: 'Front-end', itens: [['HTML', 'tela'], ['CSS', 'tela'], ['JavaScript', 'codigo'], ['TypeScript', 'codigo']] },
  { titulo: 'Dados', itens: [['PostgreSQL', 'banco'], ['MySQL', 'banco'], ['SQL', 'banco']] },
  { titulo: 'Infra & ferramentas', itens: [['Docker', 'caixa'], ['Git', 'ramo'], ['Linux', 'terminal'], ['OpenCV', 'tela'], ['JWT', 'codigo']] },
  { titulo: 'Estudando', itens: [['Orientação a objetos', 'livro'], ['Modelagem de dados', 'livro'], ['React', 'tela']] }
];

document.getElementById('stack-grupos').innerHTML = grupos.map(g => `
  <div class="stack-grupo revelar">
    <p class="stack-grupo-titulo mono">${g.titulo}</p>
    <div class="stack-itens">
      ${g.itens.map(([nome, ic]) => `<div class="stack-item">${icones[ic]}<span>${nome}</span></div>`).join('')}
    </div>
  </div>
`).join('');
document.querySelectorAll('.stack-grupo').forEach(el => obsRevelar.observe(el));

// ---------- Botão "Fale comigo": rola até o formulário ----------
const form = document.getElementById('form-contato');
const agradecimento = document.getElementById('agradecimento');

document.getElementById('btn-contato').addEventListener('click', () => {
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => document.getElementById('nome').focus({ preventScroll: true }), 700);
});

// ---------- ViaCEP ----------
const campoCep = document.getElementById('cep');
const campoCidade = document.getElementById('cidade');
const campoUf = document.getElementById('uf');
const cepStatus = document.getElementById('cep-status');

function limparEndereco() {
  campoCidade.value = '';
  campoUf.value = '';
}

function mostrarStatusCep(texto, tipo) {
  cepStatus.textContent = texto;
  cepStatus.className = 'ajuda mono' + (tipo ? ' ' + tipo : '');
}

// deixa só números e coloca o traço: 92010000 -> 92010-000
campoCep.addEventListener('input', () => {
  let valor = campoCep.value.replace(/\D/g, '').slice(0, 8);
  if (valor.length > 5) valor = valor.slice(0, 5) + '-' + valor.slice(5);
  campoCep.value = valor;
});

campoCep.addEventListener('blur', async () => {
  const cep = campoCep.value.replace(/\D/g, '');

  if (cep.length === 0) {
    limparEndereco();
    mostrarStatusCep('');
    return;
  }
  if (cep.length !== 8) {
    limparEndereco();
    mostrarStatusCep('CEP precisa ter 8 números', 'erro');
    return;
  }

  mostrarStatusCep('Buscando...');
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!resposta.ok) throw new Error('Resposta ' + resposta.status);
    const dados = await resposta.json();

    if (dados.erro) {
      limparEndereco();
      mostrarStatusCep('CEP não encontrado', 'erro');
      return;
    }
    campoCidade.value = dados.localidade;
    campoUf.value = dados.uf;
    mostrarStatusCep(dados.logradouro ? `${dados.logradouro}, ${dados.bairro}` : 'Endereço encontrado', 'ok');
  } catch (e) {
    limparEndereco();
    mostrarStatusCep('Não consegui consultar o CEP agora', 'erro');
  }
});

// ---------- Envio do formulário ----------
function marcarInvalido(input, invalido) {
  input.closest('.campo').classList.toggle('invalido', invalido);
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

  marcarInvalido(nome, nome.value.trim() === '');
  marcarInvalido(email, !emailValido);
  marcarInvalido(mensagem, mensagem.value.trim() === '');

  const primeiroInvalido = form.querySelector('.invalido input, .invalido textarea');
  if (primeiroInvalido) {
    primeiroInvalido.focus();
    return;
  }

  const primeiroNome = nome.value.trim().split(' ')[0];
  let texto = `Recebi sua mensagem e respondo em breve no e-mail ${email.value.trim()}.`;
  if (campoCidade.value) texto += ` Abraço pra ${campoCidade.value}/${campoUf.value}!`;

  agradecimento.innerHTML = `<h3>Valeu, ${primeiroNome}!</h3><p>${texto}</p>`;
  agradecimento.classList.remove('escondido');
  form.classList.add('escondido');
  agradecimento.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
