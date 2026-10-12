'use strict';
// Configure somente um número autorizado, com código do país e DDD, sem símbolos.
const WHATSAPP_NUMBER = '';
const destinations = [
 {id:'noronha',name:'Fernando de Noronha',location:'Pernambuco, Brasil',category:'praias',duration:'5 dias · 4 noites',price:4890,image:'photo-1629992684161-71cd9d01b9ab',alt:'Mar azul e formações rochosas de Fernando de Noronha',description:'Um refúgio brasileiro de águas cristalinas, natureza preservada e dias no seu próprio ritmo.',details:'Imagine explorar praias entre falésias, contemplar o pôr do sol e descobrir a vida marinha. Este roteiro ilustrativo combina tempo livre e contato com a natureza; atividades e disponibilidade não estão incluídas como oferta.'},
 {id:'santorini',name:'Santorini',location:'Ilhas Cíclades, Grécia',category:'romance',duration:'7 dias · 6 noites',price:8490,image:'photo-1613395877344-13d4a8e0d49e',alt:'Construções brancas sobre o mar em Santorini',description:'Casas brancas, o azul do Egeu e um pôr do sol que merece ser vivido a dois.',details:'Caminhos de pedra, pequenas vilas e vistas para a caldeira inspiram uma viagem sem pressa. Um exemplo de roteiro para apreciar a arquitetura local, os sabores gregos e momentos especiais a dois.'},
 {id:'alpes',name:'Alpes Suíços',location:'Interlaken, Suíça',category:'aventura',duration:'8 dias · 7 noites',price:9790,image:'photo-1531366936337-7c912a4589a7',alt:'Paisagem montanhosa dos Alpes Suíços',description:'Entre picos, lagos e trilhas, descubra uma nova dimensão do extraordinário.',details:'Uma inspiração de roteiro com paisagens alpinas, passeios por vilarejos e trilhas adaptadas ao seu ritmo. Atividades dependem da estação e das condições locais; este exemplo não confirma serviços.'},
 {id:'italia',name:'Costa Italiana',location:'Cinque Terre, Itália',category:'cultura',duration:'7 dias · 6 noites',price:7890,image:'photo-1498307833015-e7b400441eb8',alt:'Vila colorida na costa de Cinque Terre, Itália',description:'Vilas coloridas, sabores autênticos e o Mediterrâneo como companhia.',details:'Cinco vilas, caminhos à beira-mar e uma cultura que se revela à mesa. Este roteiro demonstrativo inspira passeios a pé, descobertas gastronômicas e tempo para apreciar a costa italiana.'},
 {id:'maldivas',name:'Maldivas',location:'Atóis das Maldivas',category:'praias',duration:'6 dias · 5 noites',price:12490,image:'photo-1514282401047-d79a71a590e8',alt:'Ilha tropical cercada pelo oceano nas Maldivas',description:'Um horizonte de infinitos azuis. A arte de desacelerar em seu cenário mais bonito.',details:'Dias leves entre areia branca e águas transparentes. Uma proposta fictícia para quem busca descanso, contato com o oceano e espaço para respirar. Hospedagem e experiências seriam definidas em uma cotação real.'},
 {id:'paris',name:'Paris',location:'Île-de-France, França',category:'cultura',duration:'6 dias · 5 noites',price:6990,image:'photo-1502602898657-3e91760cbb34',alt:'Torre Eiffel vista das ruas de Paris',description:'Arte, cafés e ruas que convidam a se perder. Paris sempre tem uma nova história.',details:'Uma coleção de ideias entre museus, bairros históricos e cafés parisienses. Este roteiro ilustrativo deixa espaço para interesses pessoais e descobertas espontâneas, sem ingressos ou reservas incluídos.'}
];
const $ = selector => document.querySelector(selector);
const categories = {praias:'Praias & descanso',aventura:'Aventura',cultura:'Cultura',romance:'Romance'};
const money = value => value.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const imageURL = (id,width=800) => `https://images.unsplash.com/${id}?w=${width}&auto=format&fit=crop&q=80`;
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
let favorites = new Set();
try { const saved=JSON.parse(localStorage.getItem('aura-favorites') || '[]'); if(Array.isArray(saved)) favorites=new Set(saved.filter(id=>destinations.some(d=>d.id===id))); } catch { /* Storage may be unavailable; favorites still work in memory. */ }
let activeFilter='all', favoritesOnly=false, toastTimer;
function toast(message){ $('#toast').textContent=message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2800); }
function updateFavoriteCount(){ $('#favorite-count').textContent=favorites.size; $('#favorites-view').setAttribute('aria-label',`${favoritesOnly?'Mostrar todos os destinos':'Mostrar destinos favoritos'} (${favorites.size})`); $('#favorites-view').setAttribute('aria-pressed',String(favoritesOnly)); }
function fallbackImages(root=document){root.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{img.classList.add('image-failed');img.src='assets/favicon.svg';},{once:true});});}
function renderDestinations(){
 const query=normalize($('#destination-search').value);
 const filtered=destinations.filter(d=>(activeFilter==='all'||d.category===activeFilter)&&(!favoritesOnly||favorites.has(d.id))&&normalize(`${d.name} ${d.location} ${d.description} ${categories[d.category]}`).includes(query));
 $('#destination-grid').innerHTML=filtered.map(d=>`<article class="destination-card"><div class="card-image"><img src="${imageURL(d.image)}" alt="${d.alt}" loading="lazy" width="800" height="600"><span class="card-category">${categories[d.category]}</span><button class="favorite-button" data-favorite="${d.id}" aria-label="${favorites.has(d.id)?'Remover':'Adicionar'} ${d.name} ${favorites.has(d.id)?'dos':'aos'} favoritos" aria-pressed="${favorites.has(d.id)}">${icon('heart')}</button></div><div class="card-content"><p class="card-location">${icon('pin')}${d.location}</p><h3>${d.name}</h3><p class="card-description">${d.description}</p><div class="card-duration">${d.duration} · Roteiro ilustrativo</div><div class="card-bottom"><div class="card-price"><small>A PARTIR DE · VALOR FICTÍCIO</small><strong>${money(d.price)}</strong></div><button class="details-button" data-details="${d.id}">Ver detalhes ${icon('arrow')}</button></div></div></article>`).join('');
 $('#empty-results').hidden=filtered.length>0;
 $('#result-count').textContent=`${filtered.length} ${filtered.length===1?'destino':'destinos'}${favoritesOnly?' favoritos':''}`;
 document.querySelectorAll('[data-filter]').forEach(button=>{const selected=button.dataset.filter===activeFilter;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});
 updateFavoriteCount();fallbackImages($('#destination-grid'));
}
function setFilter(filter){activeFilter=filter;$('#travel-style').value=filter;renderDestinations();}
$('#search-form').addEventListener('submit',event=>{event.preventDefault();setFilter($('#travel-style').value);});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.filter)));
$('#reset-filters').addEventListener('click',()=>{favoritesOnly=false;$('#destination-search').value='';setFilter('all');});
function showFavorites(){favoritesOnly=!favoritesOnly;$('#destination-search').value='';setFilter('all');closeMenu();$('#destinos').scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth'});}
$('#favorites-view').addEventListener('click',showFavorites);
$('#footer-favorites').addEventListener('click',()=>{favoritesOnly=false;showFavorites();});
document.querySelectorAll('[data-experience]').forEach(link=>link.addEventListener('click',()=>{favoritesOnly=false;$('#destination-search').value='';setFilter(link.dataset.experience);}));
let modalTrigger;
const modal=$('#destination-modal');
$('#destination-grid').addEventListener('click',event=>{
 const favoriteButton=event.target.closest('[data-favorite]');
 if(favoriteButton){const id=favoriteButton.dataset.favorite;favorites.has(id)?favorites.delete(id):favorites.add(id);let persisted=true;try{localStorage.setItem('aura-favorites',JSON.stringify([...favorites]));}catch{persisted=false;}
 // Update in place to retain keyboard focus, except when removing from the favorites view.
 if(favoritesOnly&&!favorites.has(id)){renderDestinations();$('#favorites-view').focus();}else{favoriteButton.setAttribute('aria-pressed',String(favorites.has(id)));favoriteButton.setAttribute('aria-label',`${favorites.has(id)?'Remover':'Adicionar'} ${destinations.find(d=>d.id===id).name} ${favorites.has(id)?'dos':'aos'} favoritos`);updateFavoriteCount();}
 toast(`${favorites.has(id)?'Destino adicionado aos':'Destino removido dos'} favoritos.${persisted?'':' Armazenamento indisponível neste navegador.'}`);return;}
 const detailsButton=event.target.closest('[data-details]');if(!detailsButton)return;
 const d=destinations.find(d=>d.id===detailsButton.dataset.details);modalTrigger=detailsButton;
 $('#modal-content').innerHTML=`<img class="modal-image" src="${imageURL(d.image,1200)}" alt="${d.alt}"><div class="modal-body"><p class="eyebrow">${categories[d.category]}</p><h2 id="modal-title">${d.name}</h2><p>${d.details}</p><div class="modal-meta"><div>Localização<strong>${d.location}</strong></div><div>Duração<strong>${d.duration}</strong></div><div>Valor ilustrativo<strong>${money(d.price)}</strong></div></div><button class="button turquoise" id="request-quote">Solicitar orçamento ${icon('arrow')}</button><p class="demo-note">Exemplo fictício. Sem oferta comercial ou reserva.</p></div>`;
 fallbackImages(modal);modal.showModal();document.body.classList.add('locked');$('#modal-close').focus();
 $('#request-quote').addEventListener('click',()=>{modal.close();$('#quote-destination').value=d.name;$('#contato').scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth'});$('#name').focus({preventScroll:true});});
});
$('#modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{const rect=modal.getBoundingClientRect();if(event.target===modal&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))modal.close();});
modal.addEventListener('close',()=>{document.body.classList.remove('locked');modalTrigger?.focus({preventScroll:true});});
const menuToggle=$('#menu-toggle'),navigation=$('#navigation');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');navigation.classList.remove('open');document.body.classList.remove('locked');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('open',open);document.body.classList.toggle('locked',open);$('#header').classList.toggle('solid',open||window.scrollY>40);if(open)navigation.querySelector('a').focus();});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(menuToggle.getAttribute('aria-expanded')!=='true')return;if(event.key==='Escape'){closeMenu();menuToggle.focus();}if(event.key==='Tab'){const nodes=[...navigation.querySelectorAll('a'),$('#favorites-view'),menuToggle];const first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
window.matchMedia('(min-width:1000px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
let previousScroll=window.scrollY,scrollQueued=false;
window.addEventListener('scroll',()=>{if(scrollQueued)return;scrollQueued=true;requestAnimationFrame(()=>{const y=window.scrollY,menuOpen=menuToggle.getAttribute('aria-expanded')==='true';$('#header').classList.toggle('solid',y>40||menuOpen);$('#header').classList.toggle('away',y>200&&y>previousScroll+2&&!menuOpen&&!$('#header').contains(document.activeElement));previousScroll=y;scrollQueued=false;});},{passive:true});
$('#header').addEventListener('focusin',()=>$('#header').classList.remove('away'));
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let slideIndex=0,slideTimer;
const slides=[...document.querySelectorAll('.hero-slide')],locations=['Santorini, Grécia','Atóis das Maldivas','Paris, França'];
function showSlide(index){slideIndex=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.classList.toggle('active',i===slideIndex));$('#slide-index').textContent=String(slideIndex+1).padStart(2,'0');$('#slide-location').textContent=locations[slideIndex];}
function restartAutoplay(){clearInterval(slideTimer);if(!reducedMotion.matches&&!document.hidden)slideTimer=setInterval(()=>showSlide(slideIndex+1),5000);}
$('#slide-prev').addEventListener('click',()=>{showSlide(slideIndex-1);restartAutoplay();});$('#slide-next').addEventListener('click',()=>{showSlide(slideIndex+1);restartAutoplay();});
document.addEventListener('visibilitychange',restartAutoplay);reducedMotion.addEventListener('change',restartAutoplay);restartAutoplay();
if('IntersectionObserver' in window&&!reducedMotion.matches){document.documentElement.classList.add('motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('shown');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
function localToday(){const now=new Date();return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;}
$('#date').min=localToday();
destinations.forEach(d=>$('#quote-destination').add(new Option(d.name,d.name)));
$('#quote-form').addEventListener('submit',event=>{event.preventDefault();$('#date').min=localToday();const name=$('#name'),date=$('#date'),travelers=$('#travelers');name.setCustomValidity(name.value.trim().length<2?'Informe um nome com pelo menos dois caracteres.':'');date.setCustomValidity(date.value<localToday()?'Escolha hoje ou uma data futura.':'');travelers.setCustomValidity(!Number.isInteger(Number(travelers.value))||Number(travelers.value)<1||Number(travelers.value)>50?'Informe entre 1 e 50 viajantes.':'');if(!event.target.reportValidity())return;
 const formattedDate=new Date(`${date.value}T12:00:00`).toLocaleDateString('pt-BR');const message=`Olá, AURA Travel! Gostaria de planejar uma viagem.\n\nNome: ${name.value.trim()}\nDestino: ${$('#quote-destination').value}\nData prevista: ${formattedDate}\nViajantes: ${travelers.value}\nObservações: ${$('#notes').value.trim()||'Nenhuma observação.'}\n\nSolicitação demonstrativa, sem confirmação de reserva.`;
 $('#quote-message').value=message;$('#quote-result').hidden=false;$('#copy-status').textContent='';
 const whatsapp=$('#whatsapp-link');if(/^[1-9]\d{9,14}$/.test(WHATSAPP_NUMBER)){whatsapp.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;whatsapp.hidden=false;}else{whatsapp.hidden=true;whatsapp.removeAttribute('href');}
 $('#quote-message').focus();toast('Mensagem preparada. Nenhum dado foi enviado.');
});
['name','date','travelers'].forEach(id=>$('#'+id).addEventListener('input',event=>event.target.setCustomValidity('')));
$('#quote-form').addEventListener('input',event=>{if(event.target.id!=='quote-message')$('#quote-result').hidden=true;});
$('#copy-message').addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText($('#quote-message').value);$('#copy-status').textContent='Mensagem copiada. Você pode colá-la no canal de sua preferência.';toast('Mensagem copiada!');}catch{$('#quote-message').focus();$('#quote-message').select();$('#copy-status').textContent='Não foi possível copiar automaticamente. O texto está selecionado: use a opção Copiar do seu dispositivo.';}});
$('#year').textContent=new Date().getFullYear();fallbackImages();renderDestinations();
