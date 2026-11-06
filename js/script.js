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

  agradecimento.textContent = texto;
  agradecimento.classList.remove('escondido');
  form.classList.add('escondido');
  agradecimento.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
