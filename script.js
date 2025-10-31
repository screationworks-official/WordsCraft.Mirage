document.addEventListener("DOMContentLoaded", () => {
  // Dynamic year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Fade in animation
  const faders = document.querySelectorAll("[data-fade]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  });
  faders.forEach((el) => observer.observe(el));

  // Starfield
  const layer = document.getElementById("star-layer");
  if (layer) {
    for (let i = 0; i < 80; i++) {
      const s = document.createElement("div");
      s.className = "star";
      s.style.width = s.style.height = Math.random() * 2 + "px";
      s.style.top = Math.random() * 100 + "%";
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 5 + "s";
      layer.appendChild(s);
    }
  }

  // Music autoplay
  const music = document.getElementById("bg-music");
  if (music) {
    const playMusic = () => {
      music.muted = false;
      music.play().catch(() => {});
    };
    document.body.addEventListener("click", playMusic, { once: true });
  }
});
