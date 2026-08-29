/* 7K Global Consulting — shared interactive behaviors
   (page navigation is now real hrefs; this file only handles
   in-page interactivity: mobile drawer, sticky nav, tier
   accordions, scroll reveal, and the construction intake forms) */

/* Mobile drawer */
(function(){
  var hbg = document.getElementById('hbg');
  var md = document.getElementById('md');
  if(!hbg || !md) return;
  hbg.addEventListener('click', function(){
    var open = md.classList.toggle('op');
    hbg.classList.toggle('op', open);
    hbg.setAttribute('aria-expanded', String(open));
  });
  md.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      md.classList.remove('op');
      hbg.classList.remove('op');
      hbg.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* Sticky nav: hide on scroll-down, shadow after threshold */
(function(){
  var nav = document.getElementById('sitenav');
  if(!nav) return;
  var lastY = 0, ticking = false;
  window.addEventListener('scroll', function(){
    if(!ticking){
      requestAnimationFrame(function(){
        var y = window.scrollY;
        if(y > 80){ nav.classList.toggle('up', y > lastY + 4); nav.classList.add('sd'); }
        else { nav.classList.remove('up','sd'); }
        lastY = y; ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
})();

/* Tier accordion (Completion Integrity Program page) */
function tt(id){
  var el = document.getElementById(id);
  if(el) el.classList.toggle('op');
}

/* Contact tab switching (construction intake page) */
function stab(n){
  [1,2,3].forEach(function(i){
    var f = document.getElementById('f'+i);
    var t = document.getElementById('tb'+i);
    if(f) f.style.display = (i===n ? 'block' : 'none');
    if(t) t.classList.toggle('act', i===n);
  });
}

/* Mailto submission for the construction intake forms */
function v(id){ var el = document.getElementById(id); return el ? (el.value || 'Not provided') : 'Not provided'; }
function sf(n){
  var em = 'info@7kglobalconsulting.com', sub, body;
  if(n === 1){
    sub = 'Construction / Owner Advisory Inquiry — 7K Global Consulting';
    body = 'Name: '+v('c1n')+'\nEmail: '+v('c1e')+'\nRole: '+v('c1r')+'\nProject Type: '+v('c1t')+'\nCurrent Stage: '+v('c1s')+'\nTier of Interest: '+v('c1ti')+'\nTimeline: '+v('c1tl')+'\nLocation: '+v('c1lo')+'\n\nMessage:\n'+v('c1m');
  } else if(n === 2){
    sub = 'Developer Advisory Inquiry — 7K Global Consulting';
    body = 'Name: '+v('c2n')+'\nEmail: '+v('c2e')+'\nDevelopment Type: '+v('c2t')+'\nNumber of Units: '+v('c2u')+'\n\nMessage:\n'+v('c2m');
  } else {
    sub = 'Maintenance Setup Inquiry — 7K Global Consulting';
    body = 'Name: '+v('c3n')+'\nEmail: '+v('c3e')+'\nBuilding Type: '+v('c3t')+'\nService Needed: '+v('c3s')+'\n\nMessage:\n'+v('c3m');
  }
  window.location.href = 'mailto:'+em+'?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(body);
  return false;
}

/* Generic mailto submission for simple single forms (main site contact page) */
function mailtoFromForm(formId, toEmail, subject){
  var form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var data = new FormData(form);
    var lines = [];
    data.forEach(function(val, key){
      if(val && String(val).trim() !== '') lines.push(key + ': ' + val);
    });
    var body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:' + encodeURIComponent(toEmail) + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
  });
}

/* Scroll-reveal animation */
(function(){
  var els = document.querySelectorAll('.rv');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('vis'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('vis'); io.unobserve(en.target); }
    });
  }, {threshold: 0.08});
  els.forEach(function(el){ io.observe(el); });
})();
