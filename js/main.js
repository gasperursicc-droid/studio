// mobilni meni
var h=document.querySelector('.hamburger'),n=document.querySelector('.nav');
if(h){h.addEventListener('click',function(){var o=n.classList.toggle('open');h.setAttribute('aria-expanded',o);});}

// kontaktni obrazec -> FormSubmit posreduje sporocilo na e-naslov studia
var f=document.querySelector('.contact-form');
if(f){f.addEventListener('submit',function(e){
  e.preventDefault();
  var s=f.querySelector('.form-status'),b=f.querySelector('button');
  function stanje(razred,besedilo){s.className='form-status'+(razred?' '+razred:'');s.textContent=besedilo;}
  stanje('',T('st.sending'));b.disabled=true;

  // imena polj brez sumnikov, da jih storitev zanesljivo sprejme
  var podatki=new FormData();
  new FormData(f).forEach(function(v,k){podatki.append(k==='Sporočilo'?'Sporocilo':k,v);});

  fetch(f.dataset.ajax,{method:'POST',headers:{'Accept':'application/json'},body:podatki})
    .then(function(r){return r.json().catch(function(){return {};}).then(function(d){return {ok:r.ok,d:d};});})
    .then(function(o){
      var msg=String(o.d.message||'');
      if(o.ok&&String(o.d.success)!=='false'){f.reset();stanje('ok',T('st.ok'));return;}
      if(/activat/i.test(msg)){
        stanje('err',T('st.inactive'));
        return;
      }
      console.warn('FormSubmit:',o.d);
      stanje('err',T('st.fail')+(msg?' ('+msg+')':''));
    })
    .catch(function(err){
      console.warn('FormSubmit:',err);
      stanje('err',T('st.fail'));
    })
    .then(function(){b.disabled=false;});
});}

// vhodna animacija: odstrani prekrivni sloj, ko se izteče
var intro=document.querySelector('.intro');
if(intro){setTimeout(function(){intro.remove();},2800);}

// uvodna slika: vsakih 8 sekund počasen prehod; puščici za ročno premikanje naprej in nazaj
(function(){
  var hero=document.querySelector('.hero'); if(!hero)return;
  var s=hero.querySelectorAll('.slide'),t=hero.querySelector('.hero-t'),n=hero.querySelector('.hero-n'),cats=hero.querySelectorAll('.hero-tag a');
  if(s.length<2||!t)return;
  var i=0,timer,CAS=8000;
  function dve(x){return (x<10?'0':'')+x;}
  function pojdi(k){
    s[i].classList.remove('on');i=(k+s.length)%s.length;s[i].classList.add('on');
    var c=+s[i].dataset.cat;cats.forEach(function(a,j){a.classList.toggle('on',j===c);});
    n.textContent=dve(i+1)+' / '+dve(s.length);
    t.classList.add('out');
    var zdaj=i;setTimeout(function(){if(zdaj!==i)return;t.dataset.i18n=s[i].dataset.cap;t.textContent=T(s[i].dataset.cap);t.classList.remove('out');},500);
  }
  function zacni(){clearInterval(timer);timer=setInterval(function(){pojdi(i+1);},CAS);}
  hero.querySelector('.hero-prev').addEventListener('click',function(){pojdi(i-1);zacni();});
  hero.querySelector('.hero-next').addEventListener('click',function(){pojdi(i+1);zacni();});
  // poteg s prstom na telefonu
  var x0=null;
  hero.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  hero.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50){pojdi(dx<0?i+1:i-1);zacni();}},{passive:true});
  zacni();
})();
