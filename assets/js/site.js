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

/* ============================================================
   Web3Forms submission (replaces the old mailto: approach)
   ============================================================ */
var WEB3FORMS_KEY = '49f318f6-4e76-4075-9f6e-0cbbbe866f00';
function v(id){ var el = document.getElementById(id); return el ? (el.value || 'Not provided') : 'Not provided'; }

function showFormStatus(statusId, ok, isAr){
  var el = document.getElementById(statusId);
  if(!el) return;
  el.style.display = 'block';
  el.className = 'fstatus ' + (ok ? 'ok' : 'err');
  if(ok){
    el.textContent = isAr ? 'شكراً لك — تم إرسال رسالتك. سنتواصل معك قريباً.' : "Thanks \u2014 your message has been sent. We'll follow up directly.";
  } else {
    el.textContent = isAr ? 'حدث خطأ أثناء الإرسال. يرجى مراسلتنا مباشرة على info@7kglobalconsulting.com' : 'Something went wrong sending this \u2014 please email us directly at info@7kglobalconsulting.com.';
  }
}

async function postToWeb3Forms(payload, statusId, btn){
  var isAr = document.documentElement.lang === 'ar';
  var origText = btn ? btn.textContent : null;
  if(btn){ btn.disabled = true; btn.textContent = isAr ? 'جارٍ الإرسال...' : 'Sending...'; }
  payload.access_key = WEB3FORMS_KEY;
  try{
    var res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify(payload)
    });
    var result = await res.json();
    if(result.success){
      showFormStatus(statusId, true, isAr);
      if(btn){ btn.textContent = isAr ? 'تم الإرسال' : 'Sent'; }
      return true;
    }
    throw new Error(result.message || 'failed');
  } catch(err){
    showFormStatus(statusId, false, isAr);
    if(btn){ btn.disabled = false; btn.textContent = origText; }
    return false;
  }
}

/* Construction intake page: tabs 1 (Owner/Construction), 2 (Developer), 3 (Maintenance) */
function sf(n){
  var payload = {};
  var btn;
  if(n === 1){
    payload = {subject:'Construction / Owner Advisory Inquiry \u2014 7K Global Consulting', Name:v('c1n'), Email:v('c1e'), Role:v('c1r'), 'Project Type':v('c1t'), 'Current Stage':v('c1s'), 'Tier of Interest':v('c1ti'), Timeline:v('c1tl'), Location:v('c1lo'), Message:v('c1m')};
    btn = document.querySelector('#f1 button, [onclick="sf(1)"]');
  } else if(n === 2){
    payload = {subject:'Developer Advisory Inquiry \u2014 7K Global Consulting', Name:v('c2n'), Email:v('c2e'), 'Development Type':v('c2t'), 'Number of Units':v('c2u'), Message:v('c2m')};
    btn = document.querySelector('#f2 button, [onclick="sf(2)"]');
  } else {
    payload = {subject:'Maintenance Setup Inquiry \u2014 7K Global Consulting', Name:v('c3n'), Email:v('c3e'), 'Building Type':v('c3t'), 'Service Needed':v('c3s'), Message:v('c3m')};
    btn = document.querySelector('#f3 button, [onclick="sf(3)"]');
  }
  postToWeb3Forms(payload, 'fstatus'+n, btn);
  return false;
}

/* Generic form submission for simple single forms (main site contact page) */
function submitFormViaWeb3Forms(formId, subject, statusId){
  var form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var data = new FormData(form);
    var payload = {subject: subject};
    data.forEach(function(val, key){ payload[key] = val; });
    var btn = form.querySelector('button[type="submit"]');
    postToWeb3Forms(payload, statusId, btn);
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
