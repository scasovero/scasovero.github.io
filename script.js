const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.dot')];
let current = 0;
let timer;

function showSlide(index){
  current = index;
  slides.forEach((s,i)=>s.classList.toggle('active',i===index));
  dots.forEach((d,i)=>d.classList.toggle('active',i===index));
}

function startCarousel(){
  clearInterval(timer);
  timer=setInterval(()=>showSlide((current+1)%slides.length),5500);
}

dots.forEach((dot,i)=>{
  dot.addEventListener('click',()=>{
    showSlide(i);
    startCarousel();
  });
});

startCarousel();

const counters = document.querySelectorAll('.counter');
let counted = false;

const observer = new IntersectionObserver(entries=>{
  if(entries.some(e=>e.isIntersecting) && !counted){
    counted=true;

    counters.forEach(el=>{
      const target=Number(el.dataset.target);
      const duration=1300;
      const start=performance.now();

      function tick(now){
        const p=Math.min((now-start)/duration,1);
        const eased=1-Math.pow(1-p,3);

        el.textContent=Math.floor(target*eased);

        if(p<1) requestAnimationFrame(tick);
        else el.textContent=target;
      }

      requestAnimationFrame(tick);
    });
  }
},{threshold:.35});

const numbersSection=document.querySelector('.numbers');

if(numbersSection) observer.observe(numbersSection);

const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');

if(menuToggle){
  menuToggle.addEventListener('click',()=>{
    nav.style.display = nav.style.display==='flex' ? 'none' : 'flex';
    nav.style.position='absolute';
    nav.style.top='75px';
    nav.style.left='0';
    nav.style.right='0';
    nav.style.background='#fff';
    nav.style.padding='15px 25px';
    nav.style.flexDirection='column';
    nav.style.alignItems='flex-start';
    nav.style.gap='0';

    nav.querySelectorAll('a').forEach(a=>{
      a.style.padding='12px 0';
    });
  });
}
