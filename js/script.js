
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
