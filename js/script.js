
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


// Controle do form de inscrição ============================================================
const form = document.getElementById('inscricaoForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const respostaEl = document.getElementById('resposta');

  // Função para atualizar a mensagem com imagem
  function atualizarMensagem(texto, caminhoImagem) {
    respostaEl.innerHTML = `<img src="${caminhoImagem}" alt="emoji" style="width: 20px; vertical-align: middle; margin-right: 8px;"> ${texto}`;
  }

  atualizarMensagem('Inscrevendo...', 'img/lapis.png');

  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString('pt-BR');

  const dados = {
    inscricao: {
      nome: form.querySelector('[name="nome"]').value,
      email: form.querySelector('[name="email"]').value,
      dataInscricao: dataFormatada
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
    atualizarMensagem('Inscrição realizada com sucesso!', 'img/emoji-feliz.png');
    form.reset();
  })
  .catch(err => {
    console.error(err);
    atualizarMensagem('Erro ao enviar. Tente novamente.', 'img/emoji-triste.png');
  });
});
