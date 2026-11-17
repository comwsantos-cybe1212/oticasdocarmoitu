(function () {
  var d = document, html = d.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // menu (celular)
  var header = d.querySelector('header'), btn = d.querySelector('.menu-btn');
  if (header && btn) {
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('nav a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    });
  }

  // slides do banner principal
  var slides = d.querySelectorAll('#inicio .slide'), pontos = d.querySelectorAll('#inicio .ponto'), atual = 0, timer;
  function mostrar(i) {
    atual = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.setAttribute('data-on', n === atual ? 'true' : 'false'); });
    pontos.forEach(function (p, n) { p.setAttribute('data-on', n === atual ? 'true' : 'false'); });
  }
  function rodar() { clearInterval(timer); if (slides.length > 1) timer = setInterval(function () { mostrar(atual + 1); }, 6000); }
  if (slides.length) {
    mostrar(0); rodar();
    d.querySelectorAll('[data-slide]').forEach(function (b) {
      b.addEventListener('click', function () { mostrar(atual + (b.getAttribute('data-slide') === 'prev' ? -1 : 1)); rodar(); });
    });
    var x0 = null, hero = d.getElementById('inicio');
    hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { mostrar(atual + (dx < 0 ? 1 : -1)); rodar(); }
    }, { passive: true });
  }

  // janela "Fale conosco"
  var modal = d.getElementById('fale');
  if (modal) {
    var fechar = function () { modal.hidden = true; };
    d.querySelectorAll('[data-fale]').forEach(function (b) { b.addEventListener('click', function () { modal.hidden = false; }); });
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.hasAttribute('data-fechar')) fechar(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
  }

  // vídeos: tocam sem som quando aparecem na tela
  var videos = d.querySelectorAll('video');
  videos.forEach(function (v) { v.muted = true; v.defaultMuted = true; v.setAttribute('muted', ''); v.playsInline = true; });
  function tocar(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) tocar(e.target); else e.target.pause(); });
    }, { rootMargin: '200px 0px' });
    videos.forEach(function (v) { vo.observe(v); });

    // animações ao rolar
    if (!reduce) {
      html.classList.add('js');
      var alvo = 'section img:not(.slide), section video, section h2, section h3, .grife-item';
      var sobe = '#meta div[style*="flex: 1 1 240px"], #promocoes div[style*="flex: 1 1 230px"], #diferenciais div[style*="flex: 1 1 280px"]';
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      d.querySelectorAll(alvo).forEach(function (el) {
        if (el.closest('.roleta') || el.closest('#inicio') || el.closest('.modal')) return;
        el.classList.add('reveal'); io.observe(el);
      });
      d.querySelectorAll(sobe).forEach(function (el) {
        var i = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.classList.add('reveal', 'sobe'); el.style.setProperty('--d', (i % 4) * 110 + 'ms'); io.observe(el);
      });
    }
  } else { videos.forEach(tocar); }
})();
