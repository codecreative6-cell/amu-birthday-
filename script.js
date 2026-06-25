const IMGS=[
  "ammu di folder/img1.jpg","ammu di folder/img1.png","ammu di folder/img1.webp",
  "ammu di folder/img2.jpg","ammu di folder/img2.webp",
  "ammu di folder/img3.jpg","ammu di folder/img4.jpg","ammu di folder/img5.jpg","ammu di folder/img6.jpg","ammu di folder/img7.jpg",
  "ammu di folder/img8.jpg","ammu di folder/img9.jpg","ammu di folder/img10.jpg","ammu di folder/img11.jpg","ammu di folder/img12.jpg",
  "ammu di folder/img13.jpg","ammu di folder/img14.jpg","ammu di folder/img15.jpg","ammu di folder/img16.jpg","ammu di folder/img17.jpg"
];
const PCAP=["✨","🌸","💛","🎵","🌟","🎤","💖","🎶","🌺","✦","🎼","🌸","💛","✨","🌟","🎵","💖","🌺","✦","🎶"];
const PROT=[-8,-5,-12,4,7,-3,10,-6,3,-9,5,-4,8,-7,11,-2,6,-4,9,-7];
const PWORD=["Radiant","Magical","Timeless","Beloved","Iconic","Stunning","Soulful","Golden","Luminous","Graceful","Rare","Fierce","Cherished","Brilliant","Ethereal","Legendary","Glowing","Enchanting","Celestial","Queen"];

/* SCROLL PROGRESS */
const sp=document.getElementById('sprog');
window.addEventListener('scroll',()=>{sp.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%';},{passive:true});

/* CURSOR */
const cur=document.getElementById('cur'),cring=document.getElementById('cring');
const sc=document.getElementById('sc'),sctx=sc.getContext('2d');
let mx=0,my=0,rx=0,ry=0;
const rsz=()=>{sc.width=innerWidth;sc.height=innerHeight;};rsz();window.addEventListener('resize',rsz);
const sparks=[];
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';
  if(Math.random()<.3) sparks.push({x:mx,y:my,vx:(Math.random()-.5)*3.5,vy:(Math.random()-.5)*3.5,r:Math.random()*2.5+.7,life:1,c:Math.random()<.5?'#c9a84c':'#d4748e'});
},{passive:true});
(function loop(){
  sctx.clearRect(0,0,sc.width,sc.height);
  for(let i=sparks.length-1;i>=0;i--){
    const s=sparks[i];s.x+=s.vx;s.y+=s.vy;s.life-=.042;s.r*=.97;
    if(s.life<=0){sparks.splice(i,1);continue;}
    sctx.save();sctx.globalAlpha=s.life*.8;sctx.fillStyle=s.c;sctx.beginPath();sctx.arc(s.x,s.y,s.r,0,Math.PI*2);sctx.fill();sctx.restore();
  }
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;cring.style.left=rx+'px';cring.style.top=ry+'px';
  requestAnimationFrame(loop);
})();
document.addEventListener('click',e=>{
  '✨🌸♪♫💛🎵⭐🌺'.split('').forEach(em=>{
    const d=document.createElement('div');d.className='pop';d.textContent=em;
    d.style.left=e.clientX+'px';d.style.top=e.clientY+'px';
    const a=Math.random()*Math.PI*2,dist=50+Math.random()*65;
    d.style.setProperty('--dx',Math.cos(a)*dist+'px');d.style.setProperty('--dy',Math.sin(a)*dist-52+'px');
    d.style.animationDuration=(.38+Math.random()*.5)+'s';
    document.body.appendChild(d);setTimeout(()=>d.remove(),900);
  });
},{passive:true});

/* HERO SPOTLIGHT */
const hspot=document.getElementById('hspot');
document.getElementById('hero').addEventListener('mousemove',e=>{
  const r=e.currentTarget.getBoundingClientRect();
  hspot.style.setProperty('--mx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
  hspot.style.setProperty('--my',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
},{passive:true});

/* HERO NEBULA CANVAS */
(()=>{
  const cv=document.getElementById('hcv'),ctx=cv.getContext('2d');
  let W,H,pts=[];
  const setup=()=>{
    W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;
    pts=Array.from({length:Math.floor(W*H/5200)},()=>({
      x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,
      r:Math.random()*1.7+.25,a:Math.random()*.5+.04,hue:Math.random()<.65?42:315
    }));
  };
  (function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+H)%H;
      ctx.save();ctx.globalAlpha=p.a;ctx.fillStyle=`hsl(${p.hue},60%,65%)`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.restore();
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<85){ctx.save();ctx.globalAlpha=(1-d/85)*.045;ctx.strokeStyle='#c9a84c';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();ctx.restore();}
    }
    requestAnimationFrame(draw);
  })();
  new ResizeObserver(setup).observe(cv.parentElement);setup();
})();

/* NAME STAGGER */
const hn=document.getElementById('hname');
[{t:'Ammu',c:'gld'},{t:'\u00A0',c:'wht'},{t:'Di',c:'wht'}].forEach(({t,c})=>[...t].forEach(ch=>{
  const s=document.createElement('span');s.className='hc '+c;s.textContent=ch;hn.appendChild(s);
}));
setTimeout(()=>hn.querySelectorAll('.hc').forEach((el,i)=>setTimeout(()=>el.classList.add('on'),1000+i*100)),60);

/* EQ BARS */
const eqr=document.getElementById('eqrow');
[26,42,18,38,28,52,20,44,14,46,30,40,16,48,34,44,22,36,26,44].forEach((h,i)=>{
  const b=document.createElement('div');b.className='eqb';
  b.style.setProperty('--eh',h+'px');b.style.setProperty('--es',(.32+Math.random()*.55)+'s');
  b.style.animationDelay=(i*.055)+'s';eqr.appendChild(b);
});

/* WAVE CANVAS */
(()=>{
  const cv=document.getElementById('wcv'),ctx=cv.getContext('2d');let W,H,t=0;
  const sz=()=>{W=cv.width=cv.offsetWidth*devicePixelRatio;H=cv.height=80*devicePixelRatio;cv.style.height='80px';};
  window.addEventListener('resize',sz);sz();
  const layers=[{a:.38,f:.016,sp:.034,c:'rgba(201,168,76,'},{a:.27,f:.025,sp:.053,c:'rgba(212,116,142,'},{a:.17,f:.011,sp:.027,c:'rgba(130,100,200,'}];
  (function draw(){
    ctx.clearRect(0,0,W,H);
    layers.forEach(l=>{
      ctx.beginPath();
      for(let x=0;x<=W;x+=2){const y=H/2+Math.sin(x*l.f+t*l.sp)*H*l.a+Math.sin(x*l.f*.6+t*l.sp*.7)*H*l.a*.34;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
      ctx.strokeStyle=l.c+'.68)';ctx.lineWidth=1.6;ctx.stroke();
    });
    t++;requestAnimationFrame(draw);
  })();
})();

/* TICKER */
const tk=document.getElementById('ticker');
['✦ Amu','♪ Singer ♪','✦ Born to Shine','♬ Happy Birthday','✦ The Stage is Yours','🎤 Your Voice Our Joy','♩ Melodies & Memories','✦ Forever Our Star','🌸 With Love','♫ Keep Singing'].flatMap(p=>[p,p,p]).forEach(t=>{
  const s=document.createElement('span');s.className='titem';
  s.innerHTML=t.replace(/Amu/g,'<b>Amu</b>');tk.appendChild(s);
});

/* SYMPHONY FLOATING NOTES */
(()=>{
  const container=document.getElementById('snotesfloat');
  const noteSymbols=['♩','♪','♫','♬','♭','𝄞','𝄢','🎵','🎶'];
  const count=22;
  for(let i=0;i<count;i++){
    const el=document.createElement('div');
    el.className='snote';
    el.textContent=noteSymbols[i%noteSymbols.length];
    const sz=14+Math.random()*18;
    const dur=10+Math.random()*16;
    const delay=-(Math.random()*dur);
    const op=(0.1+Math.random()*0.15).toFixed(2);
    const rot=(-40+Math.random()*80).toFixed(0);
    el.style.setProperty('--nsz',sz+'px');
    el.style.setProperty('--nd',dur+'s');
    el.style.setProperty('--ndd',delay+'s');
    el.style.setProperty('--nop',op);
    el.style.setProperty('--nrt',rot+'deg');
    el.style.left=(3+Math.random()*94)+'%';
    el.style.bottom=(Math.random()*60)+'%';
    if(i%3===1) el.style.color='rgba(212,116,142,0.9)';
    if(i%5===0) el.style.color='rgba(160,140,220,0.9)';
    container.appendChild(el);
  }
})();

/* POLAROID WALL */
(()=>{
  const pg=document.getElementById('polargrid');
  const sec=pg.closest('.polarsec');

  // Bokeh particles
  const bcols=['rgba(201,168,76,.22)','rgba(212,116,142,.18)','rgba(122,96,192,.13)','rgba(201,168,76,.14)','rgba(212,116,142,.14)'];
  const bsz=[44,58,72,88,52,40,78,62,48,68,55,80];
  for(let i=0;i<18;i++){
    const b=document.createElement('div');b.className='pbokeh';
    const s=bsz[i%bsz.length];
    b.style.cssText=`width:${s}px;height:${s}px;left:${(3+Math.random()*94).toFixed(1)}%;top:${(4+Math.random()*90).toFixed(1)}%;`;
    b.style.setProperty('--bc',bcols[i%bcols.length]);
    b.style.setProperty('--bblur',(7+Math.random()*16).toFixed(0)+'px');
    b.style.setProperty('--bfs',(5+Math.random()*7).toFixed(1)+'s');
    b.style.setProperty('--bd',(Math.random()*-7).toFixed(1)+'s');
    b.style.setProperty('--bdy',(-14-Math.random()*28).toFixed(0)+'px');
    b.style.setProperty('--bdx',(-14+Math.random()*28).toFixed(0)+'px');
    sec.appendChild(b);
  }

  // Clothesline strings
  [32,64].forEach(pct=>{
    const s=document.createElement('div');s.className='pstring';
    s.style.top=pct+'%';sec.appendChild(s);
  });

  // Scan line — film sweep across section
  const scanEl=document.createElement('div');scanEl.className='pol-scanline';
  scanEl.style.animationDelay=(1+Math.random()*4).toFixed(1)+'s';
  sec.appendChild(scanEl);

  // Build polaroid cards
  const cards=[];
  IMGS.forEach((src,i)=>{
    const p=document.createElement('div');p.className='polaroid';
    p.style.setProperty('--pr',PROT[i%PROT.length]+'deg');
    p.style.setProperty('--pfx',(Math.random()*6-3).toFixed(1)+'px');
    p.style.setProperty('--pfy',(-4-Math.random()*7).toFixed(1)+'px');
    p.style.setProperty('--pfs',(3.4+Math.random()*2.8).toFixed(1)+'s');
    p.innerHTML=`<div class="pol-img-wrap"><img src="${src}" alt="Amu" loading="lazy"/><div class="pol-overlay"><span class="pol-emoji">${PCAP[i]}</span><span class="pol-word">${PWORD[i]}</span></div></div><div class="pollabel">${PWORD[i]}</div>`;
    p.addEventListener('click',()=>openLB(i));
    pg.appendChild(p);cards.push(p);
  });

  // Staggered entrance via IntersectionObserver
  const obs=new IntersectionObserver((entries)=>{
    if(!entries[0].isIntersecting)return;
    obs.disconnect();
    cards.forEach((c,i)=>{
      const delay=i*88;
      c.style.setProperty('--pd',delay+'ms');
      c.classList.add('p-entering');
      setTimeout(()=>{
        c.classList.remove('p-entering');
        c.classList.add('p-settled');
        // stagger the bob start so cards don't all float in sync
        c.style.setProperty('--animation-delay',(i*0.22).toFixed(2)+'s');
        c.style.animationDelay=(i*0.22).toFixed(2)+'s';
        // Photo flash + word stamp + emoji appear after card lands
        const img=c.querySelector('.pol-img-wrap img');
        const pw=c.querySelector('.pol-word');
        const pe=c.querySelector('.pol-emoji');
        if(img) img.style.animation='photoPulse .72s ease-out forwards';
        if(pe) pe.style.animation='emojiAppear .48s cubic-bezier(.34,1.56,.64,1) 50ms both';
        if(pw) pw.style.animation='wordStamp .58s cubic-bezier(.2,.8,.2,1) 110ms both';
        setTimeout(()=>{
          if(img) img.style.animation='';
          if(pw) pw.style.animation='';
          if(pe) pe.style.animation='';
        },820);
      },delay+740);
    });
  },{threshold:.06});
  obs.observe(pg);
})();

/* SOUND CANVAS */
(()=>{
  const cv=document.getElementById('scv'),ctx=cv.getContext('2d');let W,H,t=0;
  const sz=()=>{W=cv.width=cv.offsetWidth*devicePixelRatio;H=cv.height=100*devicePixelRatio;cv.style.height='100px';};
  window.addEventListener('resize',sz);sz();const N=54;
  (function draw(){
    ctx.clearRect(0,0,W,H);const bw=W/N;
    for(let i=0;i<N;i++){
      const h=(Math.sin(i*.2+t*.07)+1.1)*.48*H*(Math.sin(i*.08+t*.05)*.3+.72);
      const x=i*bw+bw*.2,bww=bw*.62,by=H/2-h/2,r=Math.min(4,h/2);
      const grd=ctx.createLinearGradient(x,by,x,by+h);
      grd.addColorStop(0,'rgba(201,168,76,.95)');grd.addColorStop(.45,'rgba(212,116,142,.8)');grd.addColorStop(1,'rgba(201,168,76,.95)');
      ctx.fillStyle=grd;ctx.beginPath();
      ctx.moveTo(x+r,by);ctx.lineTo(x+bww-r,by);ctx.quadraticCurveTo(x+bww,by,x+bww,by+r);
      ctx.lineTo(x+bww,by+h-r);ctx.quadraticCurveTo(x+bww,by+h,x+bww-r,by+h);
      ctx.lineTo(x+r,by+h);ctx.quadraticCurveTo(x,by+h,x,by+h-r);
      ctx.lineTo(x,by+r);ctx.quadraticCurveTo(x,by,x+r,by);
      ctx.closePath();ctx.fill();
    }
    t++;requestAnimationFrame(draw);
  })();
})();

/* LIGHTBOX */
let lbI=0;
const lb=document.getElementById('lb'),lbimg=document.getElementById('lbimg'),lbcnt=document.getElementById('lbcnt');
lbimg.style.transition='opacity .2s';
function openLB(i){lbI=i;lbimg.src=IMGS[i];lbcnt.textContent=`${i+1} / ${IMGS.length}`;lb.classList.add('on');}
function moveLB(d){lbI=(lbI+d+IMGS.length)%IMGS.length;lbimg.style.opacity=0;setTimeout(()=>{lbimg.src=IMGS[lbI];lbcnt.textContent=`${lbI+1} / ${IMGS.length}`;lbimg.style.opacity=1;},180);}
document.getElementById('lbx').onclick=()=>lb.classList.remove('on');
document.getElementById('lbprev').onclick=e=>{e.stopPropagation();moveLB(-1);};
document.getElementById('lbnext').onclick=e=>{e.stopPropagation();moveLB(1);};
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('on');});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')moveLB(-1);if(e.key==='ArrowRight')moveLB(1);});
let ts=0;
lb.addEventListener('touchstart',e=>{ts=e.touches[0].clientX;},{passive:true});
lb.addEventListener('touchend',e=>{const d=ts-e.changedTouches[0].clientX;if(Math.abs(d)>50)moveLB(d>0?1:-1);},{passive:true});

/* CONFETTI */
(()=>{
  const cv=document.getElementById('cfc'),ctx=cv.getContext('2d');
  const r=()=>{cv.width=innerWidth;cv.height=innerHeight;};r();window.addEventListener('resize',r);
  const pieces=[],cols=['#c9a84c','#e8c97a','#d4748e','#e8a0b0','#a090d0','#88bbcc','#88c480','#fff8f0'];
  const spawn=()=>{for(let i=0;i<200;i++) pieces.push({x:Math.random()*cv.width,y:-15,vx:(Math.random()-.5)*6,vy:2.5+Math.random()*4,rot:Math.random()*360,rv:(Math.random()-.5)*11,w:5+Math.random()*9,h:3+Math.random()*5,color:cols[Math.floor(Math.random()*cols.length)],life:1,decay:.005+Math.random()*.004});};
  setTimeout(spawn,500);setTimeout(spawn,1500);setTimeout(spawn,2800);
  (function draw(){
    ctx.clearRect(0,0,cv.width,cv.height);
    for(let i=pieces.length-1;i>=0;i--){
      const p=pieces[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.rot+=p.rv;p.life-=p.decay;
      if(p.life<=0||p.y>cv.height+20){pieces.splice(i,1);continue;}
      ctx.save();ctx.globalAlpha=p.life;ctx.fillStyle=p.color;ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();
    }
    if(pieces.length)requestAnimationFrame(draw);
  })();
})();

/* SPARK CARDS — TILT + GLOW + SHIMMER */
document.querySelectorAll('.sparkcard').forEach(card=>{
  const gl=document.createElement('div');gl.className='card-glow';
  const sh=document.createElement('div');sh.className='card-shimmer';
  card.prepend(sh);card.prepend(gl);
  let raf=null;
  card.addEventListener('mousemove',e=>{
    if(raf)cancelAnimationFrame(raf);
    raf=requestAnimationFrame(()=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      const rx=((y-.5)*-13).toFixed(2),ry=((x-.5)*13).toFixed(2);
      card.style.transform=`perspective(720px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
      gl.style.setProperty('--gx',(x*100).toFixed(1)+'%');
      gl.style.setProperty('--gy',(y*100).toFixed(1)+'%');
    });
  },{passive:true});
  card.addEventListener('mouseleave',()=>{
    if(raf)cancelAnimationFrame(raf);
    card.style.transform='';
  });
});

/* SCROLL REVEAL */
const io=new IntersectionObserver(ens=>{ens.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);}});},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
