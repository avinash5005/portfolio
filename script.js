/* EDIT YOUR DETAILS HERE */
var C={name:'Bruce',role:'Solo web developer',email:'you@example.com'};
var pages=[['index','Home'],['about','About'],['skills','Skills'],['services','Services'],['work','Work'],['process','Process'],['experience','Experience'],['reviews','Reviews'],['contact','Contact']];
var cur=(location.pathname.split('/').pop()||'index.html').replace('.html','')||'index';
var $=function(s){return document.querySelector(s)},$$=function(s){return document.querySelectorAll(s)};
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
document.body.insertAdjacentHTML('afterbegin','<div class="curtain"></div><div class="bar" id="bar"></div>'+(fine&&!rm?'<div class="cur" id="cur"></div>':'')+'<nav><a class="brand" href="index.html">'+C.name+'</a><div class="links">'+pages.map(function(p){return '<a href="'+p[0]+'.html"'+(p[0]===cur?' aria-current="page"':'')+'>'+p[1]+'</a>'}).join('')+'</div></nav>');
document.body.insertAdjacentHTML('beforeend','<footer><span>© '+new Date().getFullYear()+' '+C.name+'. Designed and coded by hand.</span><span>'+pages.slice(0,5).map(function(p){return '<a href="'+p[0]+'.html">'+p[1]+'</a>'}).join('')+'<a href="mailto:'+C.email+'">'+C.email+'</a></span></footer>');
$$('[data-name]').forEach(function(e){e.textContent=C.name});$$('[data-role]').forEach(function(e){e.textContent=C.role});$$('.ph').forEach(function(e){e.textContent=C.name.charAt(0)});$$('[data-mail]').forEach(function(e){e.textContent=C.email;e.href='mailto:'+C.email});
var a=$('nav .links a[aria-current]');if(a)a.scrollIntoView({inline:'center',block:'nearest'});
/* split headlines into masked words */
$$('[data-split]').forEach(function(el){var i=0;el.innerHTML=el.textContent.trim().split(/\s+/).map(function(w){return '<span class="w"><i style="--i:'+(i++)+'">'+w+'</i></span>'}).join(' ')});
/* reveal on enter */
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;var el=x.target;el.classList.add('in');io.unobserve(el);
if(el.dataset.n){var n=+el.dataset.n,t0=performance.now();(function s(t){var p=Math.min(1,(t-t0)/1600);el.textContent=Math.round(n*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(s)})(t0)}})},{threshold:.18});
setTimeout(function(){$$('[data-split],.fx,.rv,[data-n]').forEach(function(e){io.observe(e)})},rm?0:350);
/* page transition curtain */
document.addEventListener('click',function(e){var l=e.target.closest('a[href$=".html"]');if(!l||rm||e.metaKey||e.ctrlKey||l.target)return;e.preventDefault();document.body.classList.add('leave');setTimeout(function(){location.href=l.href},620)});
addEventListener('pageshow',function(){document.body.classList.remove('leave')});
/* inertia scroll */
var tgt=scrollY,pos=scrollY,mine=false;
function mx(){return document.documentElement.scrollHeight-innerHeight}
if(fine&&!rm){addEventListener('wheel',function(e){if(e.ctrlKey)return;e.preventDefault();tgt=clamp(tgt+e.deltaY,0,mx())},{passive:false});
addEventListener('scroll',function(){if(!mine){tgt=pos=scrollY}mine=false})}
/* main scroll loop */
var st=$('#stack'),hs=$('.hs'),tr=$('.track'),mq=$$('.mq div'),px=0,py=0,cx=0,cy=0,mxp=0,myp=0,rx=0,ry=0;
if(fine&&!rm){addEventListener('pointermove',function(e){px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5;mxp=e.clientX;myp=e.clientY})}
function loop(){var vh=innerHeight;
if(fine&&!rm&&Math.abs(tgt-pos)>.05){pos+=(tgt-pos)*.085;mine=true;scrollTo(0,pos)}
var y=scrollY;$('#bar').style.setProperty('--sp',mx()>0?y/mx():0);
if(!rm){
$$('.r').forEach(function(e){var r=e.getBoundingClientRect();e.style.setProperty('--t',clamp((r.top+r.height/2-vh*.66)/(vh*.5),0,1).toFixed(3))});
$$('.rv').forEach(function(e){var r=e.getBoundingClientRect();e.style.setProperty('--py',clamp((r.top+r.height/2-vh/2)/vh,-1,1).toFixed(3))});
mq.forEach(function(m,i){m.style.setProperty('--mx',(y*.45*(i%2?-1:1)).toFixed(1))});
if(hs&&tr){var r=hs.getBoundingClientRect(),p=clamp(-r.top/(r.height-vh),0,1);tr.style.setProperty('--x',(-p*(tr.scrollWidth-innerWidth)).toFixed(1))}
if(st){cx+=(px-cx)*.07;cy+=(py-cy)*.07;st.style.setProperty('--ry',(-14+cx*34)+'deg');st.style.setProperty('--rx',(6-cy*24+Math.min(y,600)*.01)+'deg')}
var c=$('#cur');if(c){rx+=(mxp-rx)*.18;ry+=(myp-ry)*.18;c.style.transform='translate('+rx+'px,'+ry+'px)'}}
requestAnimationFrame(loop)}
loop();
/* hover: card tilt, magnetic buttons, cursor grow */
if(fine&&!rm){document.addEventListener('pointermove',function(e){
$$('.tilt').forEach(function(el){var r=el.getBoundingClientRect(),o=e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top&&e.clientY<r.bottom;el.style.setProperty('--ty',o?((e.clientX-r.left)/r.width-.5)*14+'deg':'0deg');el.style.setProperty('--tx',o?-((e.clientY-r.top)/r.height-.5)*14+'deg':'0deg')});
$$('.btn').forEach(function(b){var r=b.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy);b.style.translate=d<90?dx*.3+'px '+dy*.3+'px':'0 0'});
var c=$('#cur');if(c)c.classList.toggle('big',!!e.target.closest('a,button,summary,.card,.pj,input,textarea'))})}
var f=$('#form');if(f)f.onsubmit=function(e){e.preventDefault();location.href='mailto:'+C.email+'?subject='+encodeURIComponent('Project enquiry from '+f.n.value)+'&body='+encodeURIComponent(f.m.value+'\n\n'+f.n.value+' ('+f.e.value+')')};
/* spotlight on cards */
document.addEventListener('pointermove',function(e){$$('.card,.pj').forEach(function(el){var r=el.getBoundingClientRect();el.style.setProperty('--gx',(e.clientX-r.left)+'px');el.style.setProperty('--gy',(e.clientY-r.top)+'px')})});
/* real 3D scene (three.js), scroll + mouse driven */
function scene(){var T=window.THREE;if(!T||rm)return;var r=new T.WebGLRenderer({alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(innerWidth,innerHeight);var cv=r.domElement;cv.style.cssText='position:fixed;inset:0;z-index:-1;pointer-events:none';document.body.prepend(cv);
var s=new T.Scene(),cam=new T.PerspectiveCamera(55,innerWidth/innerHeight,.1,100);cam.position.z=9;var g=new T.Group();s.add(g);
var M=function(c,o){return new T.MeshBasicMaterial({color:c,wireframe:true,transparent:true,opacity:o})};
var ico=new T.Mesh(new T.IcosahedronGeometry(2.4,1),M(0xc9a96a,.38)),core=new T.Mesh(new T.IcosahedronGeometry(1.3,0),M(0xe8cf9a,.5));g.add(ico,core);
var rings=[0,1,2].map(function(i){var m=new T.Mesh(new T.TorusGeometry(3.3+i*.7,.014,8,160),new T.MeshBasicMaterial({color:i?0xb08a4e:0xd8b878,transparent:true,opacity:.4}));m.rotation.set(1+i,i*.8,0);g.add(m);return m});
var N=innerWidth<700?600:1800,P=new Float32Array(N*3);for(var i=0;i<N;i++){var d=6+Math.random()*16,a=Math.random()*6.283,b=Math.acos(2*Math.random()-1);P[i*3]=d*Math.sin(b)*Math.cos(a);P[i*3+1]=d*Math.sin(b)*Math.sin(a);P[i*3+2]=d*Math.cos(b)}
var pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(P,3));var pm=new T.PointsMaterial({size:.035,color:0xe8d5a8,transparent:true,opacity:.7,blending:T.AdditiveBlending,depthWrite:false}),pts=new T.Points(pg,pm);s.add(pts);
addEventListener('resize',function(){r.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()});
(function A(){var t=performance.now()/1000,p=mx()>0?scrollY/mx():0,wide=innerWidth>860;
g.rotation.y=t*.15+p*6;g.rotation.x=t*.08+py*.6;ico.rotation.z=t*.1;core.rotation.y=-t*.4;core.scale.setScalar(1+Math.sin(t*2)*.08);
rings.forEach(function(m,i){m.rotation.x+=.003*(i+1);m.rotation.y+=.002*(3-i)});
g.position.x=Math.cos(p*Math.PI*2.4)*(wide?3:0);g.position.y=Math.sin(p*Math.PI*3)*.8;
cam.position.z=9-p*3.5;cam.position.x+=(px*2-cam.position.x)*.05;cam.position.y+=(-py*1.5-cam.position.y)*.05;cam.lookAt(0,0,0);pts.rotation.y=t*.02+p*1.5;
var h=.115-p*.06;ico.material.color.setHSL(h,.5,.62);core.material.color.setHSL(h+.02,.55,.72);pm.color.setHSL(h,.45,.8);document.documentElement.style.setProperty('--hue',Math.round(h*360));
r.render(s,cam);requestAnimationFrame(A)})()}
if(!rm){var sc=document.createElement('script');sc.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';sc.onload=scene;document.head.appendChild(sc)}
