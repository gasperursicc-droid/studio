// mobilni meni
var h=document.querySelector('.hamburger'),n=document.querySelector('.nav');
if(h){h.addEventListener('click',function(){var o=n.classList.toggle('open');h.setAttribute('aria-expanded',o);});}

// kontaktni obrazec -> FormSubmit posreduje sporocilo na e-naslov studia
var f=document.querySelector('.contact-form');
if(f){f.addEventListener('submit',function(e){
  e.preventDefault();
  var s=f.querySelector('.form-status'),b=f.querySelector('button');
  s.className='form-status';s.textContent='Pošiljam ...';b.disabled=true;
  fetch(f.dataset.ajax,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(f)})
    .then(function(r){return r.json().then(function(d){if(!r.ok||String(d.success)==='false')throw new Error();});})
    .then(function(){f.reset();s.className='form-status ok';s.textContent='Sporočilo poslano!';})
    .catch(function(){s.className='form-status err';s.textContent='Pošiljanje ni uspelo. Pišite nam na info@studionua.si.';})
    .then(function(){b.disabled=false;});
});}
