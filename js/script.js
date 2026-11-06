// Botão "Fale comigo": rola até o formulário e dá foco no primeiro campo
const btnContato = document.getElementById('btn-contato');
const form = document.getElementById('form-contato');
const agradecimento = document.getElementById('agradecimento');

btnContato.addEventListener('click', () => {
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  form.classList.add('destacar');
  setTimeout(() => {
    document.getElementById('nome').focus();
    form.classList.remove('destacar');
  }, 700);
});

// Busca de endereço na ViaCEP
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
  cepStatus.className = 'ajuda' + (tipo ? ' ' + tipo : '');
}

// deixa só números e coloca o traço: 92310000 -> 92310-000
campoCep.addEventListener('input', () => {
  let valor = campoCep.value.replace(/\D/g, '').slice(0, 8);
  if (valor.length > 5) {
    valor = valor.slice(0, 5) + '-' + valor.slice(5);
  }
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
    if (!resposta.ok) {
      throw new Error('Resposta ' + resposta.status);
    }
    const dados = await resposta.json();

    if (dados.erro) {
      limparEndereco();
      mostrarStatusCep('CEP não encontrado', 'erro');
      return;
    }

    campoCidade.value = dados.localidade;
    campoUf.value = dados.uf;
    mostrarStatusCep(dados.logradouro ? dados.logradouro + ', ' + dados.bairro : 'Endereço encontrado', 'ok');
  } catch (e) {
    limparEndereco();
    mostrarStatusCep('Não consegui consultar o CEP agora', 'erro');
  }
});

// Envio do formulário: valida os campos obrigatórios e mostra o agradecimento
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

  if (form.querySelector('.invalido')) {
    form.querySelector('.invalido input, .invalido textarea').focus();
    return;
  }

  const primeiroNome = nome.value.trim().split(' ')[0];
  let texto = `Valeu, ${primeiroNome}! Recebi sua mensagem e respondo em breve no e-mail ${email.value.trim()}.`;
  if (campoCidade.value) {
    texto += ` Abraço pra ${campoCidade.value}/${campoUf.value}!`;
  }

  agradecimento.textContent = texto;
  agradecimento.classList.remove('escondido');
  form.classList.add('escondido');
  agradecimento.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
