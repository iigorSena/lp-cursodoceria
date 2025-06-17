
// Contador de alunos
function animarContador(elemento, final, duracao = 2000) {
  let start = 0;
  const stepTime = Math.abs(Math.floor(duracao / final));
  const contador = setInterval(() => {
    start++;
    elemento.textContent = start;
    if (start === final) clearInterval(contador);
  }, stepTime);
}

const contadorObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const spanContador = document.getElementById('contador');
      animarContador(spanContador, 650);
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

contadorObserver.observe(document.getElementById('quantidade-alunos'));


// Controle de form
const form = document.getElementById('inscricaoForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString('pt-BR'); // ou use ISO se preferir

  const dados = {
    inscricao: {
      nome: form.querySelector('[name="nome"]').value,
      email: form.querySelector('[name="email"]').value,
      dataInscricao: dataFormatada // ⚠️ tem que bater com o nome da coluna
    }
  };

  fetch('https://api.sheety.co/686e96cab121db1f167d70a4ae2e4745/inscricoesCurso/inscricao', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.getElementById('resposta').textContent = 'Inscrição enviada com sucesso!';
    form.reset();
  })
  .catch(err => {
    console.error(err);
    document.getElementById('resposta').textContent = 'Erro ao enviar. Tente novamente.';
  });
});
