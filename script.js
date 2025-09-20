
// wait for DOM and GSAP to be ready
function whenReady(fn){
  if(typeof gsap !== 'undefined') return fn();
  document.addEventListener('DOMContentLoaded', function(){ 
    // small delay to ensure GSAP (deferred) loaded
    setTimeout(()=>{ if(typeof gsap !== 'undefined') fn(); else setTimeout(fn,200); }, 60);
  });
}

whenReady(function(){
  // typing loop
  const typedEl = document.getElementById('typed');
  const nameStr = 'Mahmoud Selmi';
  let ti = 0, deleting = false;
  function typeLoop(){
    if(!deleting){
      ti++;
      typedEl.textContent = nameStr.slice(0,ti);
      if(ti === nameStr.length){ setTimeout(()=>deleting = true, 900); }
    } else {
      ti--;
      typedEl.textContent = nameStr.slice(0,ti);
      if(ti === 0){ deleting = false; }
    }
    setTimeout(typeLoop, 90);
  }
  typeLoop();

  // projects array
  const projects = [
    {name:'Doctify_App', desc:'Doctor booking & appointments (Flutter, Firebase).', repo:'https://github.com/Ma7moudSelmy/Doctify-_App'},
    {name:'NTI-final-project', desc:'Final academic project — mobile solution.', repo:'https://github.com/Ma7moudSelmy/NTI-final-project'},
    {name:'Store_App', desc:'Store / inventory app built with Flutter.', repo:'https://github.com/Ma7moudSelmy/Store_App'},
    {name:'Chat_App', desc:'Real-time chat app (Firebase).', repo:'https://github.com/Ma7moudSelmy/Chat_App'},
    {name:'Weather_App', desc:'Weather app using external APIs.', repo:'https://github.com/Ma7moudSelmy/Weather_App'},
    {name:'Ecommerce-Fruit-Shop', desc:'E-commerce fruit shop demo.', repo:'https://github.com/Ma7moudSelmy/Ecommerce-Fruit-Shop'}
  ];

  const grid = document.getElementById('projectsGrid');
  projects.forEach((p,i)=>{
    const el = document.createElement('div'); el.className='proj';
    el.innerHTML = `<div><div class="title">${p.name}</div><div class="desc">${p.desc}</div></div><div class="footer"><a class="btn outline" href="${p.repo}" target="_blank">View on GitHub</a><div class="muted">${new Date().getFullYear()}</div></div>`;
    grid.appendChild(el);
  });

  // setup GSAP ScrollTrigger animations for projects
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.utils.toArray('.proj').forEach((card,i)=>{
    gsap.fromTo(card, {y:24, opacity:0}, {y:0, opacity:1, duration:0.7, ease:'power3.out', delay: i*0.06,
      scrollTrigger:{trigger:card, start:'top 85%'}});
    // subtle float loop for liveliness
    gsap.to(card, {y:'+=6', repeat:-1, yoyo:true, ease:'sine.inOut', duration:4, delay:1 + i*0.08});
  });

  // avatar floating + stronger hover + click
  const avatar = document.getElementById('avatarImg');
  gsap.to(avatar, {y:-8, repeat:-1, yoyo:true, ease:'sine.inOut', duration:3});
  avatar.addEventListener('mouseenter', ()=>{ gsap.to(avatar, {scale:1.12, rotation:6, duration:0.45, ease:'power3.out'}); });
  avatar.addEventListener('mouseleave', ()=>{ gsap.to(avatar, {scale:1, rotation:0, duration:0.6, ease:'power3.out'}); });
  avatar.addEventListener('click', ()=>{
    gsap.to(avatar, {scale:1.22, rotation:12, duration:0.25, y:-12, ease:'back.out(1.7)'});
    setTimeout(()=> gsap.to(avatar, {scale:1, rotation:0, y:0, duration:0.6, ease:'elastic.out(1,0.6)'}), 350);
  });

  // nav links: click animation + smooth scroll + target pop
  document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      // button feedback (scale + quick glow)
      gsap.fromTo(link, {scale:1}, {scale:0.92, duration:0.08, yoyo:true, repeat:1, ease:'power1.out'});
      // scroll to target with offset for header
      gsap.to(window, {duration:0.8, scrollTo: {y: target, offsetY: 90}, ease:'power2.inOut'});
      // pop the target section slightly when reached
      gsap.fromTo(target, {y:18, opacity:0}, {y:0, opacity:1, duration:0.6, ease:'power3.out', delay:0.05});
    });
  });

  // Book meeting button animation + mailto
  const bookBtn = document.getElementById('bookBtn');
  bookBtn.addEventListener('click', ()=>{
    gsap.fromTo(bookBtn, {scale:1}, {scale:0.94, duration:0.08, yoyo:true, repeat:1});
    window.location.href = 'mailto:ma7moud.m.selmy1@gmail.com?subject=Meeting%20Request&body=Hi%20Mahmoud,%0A%0AI%20would%20like%20to%20book%20a%20meeting.%0A%0AThanks,';
  });

  // contact / meeting CTA triggers bookBtn click for consistent animation
  document.getElementById('contactBtn').addEventListener('click', ()=> bookBtn.click());

  // ripple effect for all .btn
  document.querySelectorAll('.btn').forEach(b=>{
    b.classList.add('ripple');
    b.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const span = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - rect.left - size/2) + 'px';
      span.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(span);
      setTimeout(()=> span.remove(), 600);
    });
  });

  // form behavior: mailto fallback
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  document.getElementById('mailtoBtn').addEventListener('click', ()=>{
    const name = form.user_name.value || '';
    const email = form.user_email.value || '';
    const msg = form.message.value || '';
    const body = `Hi Mahmoud,%0A%0AFrom: ${name} (${email})%0A%0A${encodeURIComponent(msg)}`;
    window.location.href = `mailto:ma7moud.m.selmy1@gmail.com?subject=Contact%20from%20Portfolio&body=${body}`;
  });
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formMsg.textContent = 'EmailJS not configured — opening mail client...';
    setTimeout(()=> document.getElementById('mailtoBtn').click(), 500);
  });

  // small page parallax (subtle)
  document.addEventListener('mousemove', (e)=>{
    const x = (e.clientX - window.innerWidth/2)/60;
    const y = (e.clientY - window.innerHeight/2)/140;
    if(avatar) avatar.style.transform = `translate(${x}px, ${y}px)`;
  });
}); // end whenReady
