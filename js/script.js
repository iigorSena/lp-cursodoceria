document.addEventListener("DOMContentLoaded", function () {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.fade-element').forEach(element => {
    element.style.opacity = '0'; // começa invisível
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
  });
});

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
      animarContador(spanContador, 600);
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

observer.observe(document.getElementById('quantidade-alunos'));
