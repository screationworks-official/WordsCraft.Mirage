// script.js — smooth scroll, fade-in on scroll, star layer + shooting star
document.addEventListener('DOMContentLoaded', () => {
  // set year
  const year = new Date().getFullYear();
  const yearSpan = document.getElementById('year');
  if(yearSpan) yearSpan.textContent = year;

  // mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.querySelector('.main-nav');
  if(menuToggle) menuToggle.addEventListener('click', ()=> {
    mainNav.classList.toggle('open');
  });

  // smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // fade in elements on scroll
  const faders = document.querySelectorAll('[data-fade]');
  const appearOptions = { threshold: 0.12 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(f => appearOnScroll.observe(f));

  // star layer — generate subtle particles
  const starLayer = document.getElementById('star-layer');
  if(starLayer){
    const w = window.innerWidth;
    const h = window.innerHeight;
    const stars = 60;
    let html = '';
    for(let i=0;i<stars;i++){
      const size = Math.random()*2 + 0.6;
      const left = Math.random()*100;
      const top = Math.random()*100;
      const delay = Math.random()*6;
      html += `<div class="star" style="position:fixed;left:${left}%;top:${top}%;width:${size}px;height:${size}px;background:radial-gradient(circle,#fff,#e5c1ff);opacity:${0.06+Math.random()*0.14};filter:blur(${Math.random()*1.2}px);animation:twinkle ${3+Math.random()*5}s ${delay}s infinite;"></div>`;
    }
    starLayer.innerHTML = html;
  }

  // shooting star occasional
  function makeShootingStar(){
    const star = document.createElement('div');
    star.className = 'shooting-star';
    document.body.appendChild(star);
    const startLeft = Math.random()*80 + 10;
    star.style.left = startLeft + '%';
    star.style.top = '-5%';
    star.style.opacity = 1;
    star.style.transform = `translate(${window.innerWidth*0.6}px, ${window.innerHeight*0.6}px) rotate(35deg)`;
    // animate via CSS transitions
    star.animate([
      { transform: `translate(-200px, -200px) rotate(45deg)`, opacity: 1 },
      { transform: `translate(${window.innerWidth}px, ${window.innerHeight}px) rotate(45deg)`, opacity: 0 }
    ], { duration: 1600, easing: 'cubic-bezier(.2,.9,.3,1)'});
    setTimeout(()=> star.remove(), 1700);
  }
  setInterval(()=> {
    if(Math.random() > 0.86) makeShootingStar();
  }, 2000);
});
