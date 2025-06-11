const form = document.getElementById('inscricaoForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

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
    document.getElementById('resposta').textContent = 'Inscrição realizada com sucesso!';
    form.reset();
  })
  .catch(err => {
    console.error(err);
    document.getElementById('resposta').textContent = 'Erro ao enviar. Tente novamente.';
  });
});
