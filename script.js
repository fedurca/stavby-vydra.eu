/* ============ i18n ============ */
const I18N = {
  cs: {
    "nav.services":"Služby","nav.about":"O nás","nav.references":"Reference","nav.contact":"Kontakt",
    "hero.eyebrow":"Demoliční práce · Bourání · Recyklace",
    "hero.title":"BOURÁME RYCHLE,<br>BEZPEČNĚ A ČISTĚ",
    "hero.subtitle":"STAVBY-VYDRA s.r.o. — profesionální demoliční firma s vlastní těžkou technikou. Realizujeme demolice průmyslových objektů, rodinných domů i selektivní bourání po celé ČR.",
    "hero.ctaPrimary":"Poptat demolici →","hero.ctaSecondary":"Naše služby",
    "hero.stat1":"let zkušeností","hero.stat2":"realizací","hero.stat3":"h pohotovost",
    "services.eyebrow":"Co děláme","services.title":"Kompletní demoliční servis",
    "services.intro":"Od přípravy projektu, přes samotnou demolici, až po odvoz a recyklaci suti — vše pod jednou střechou.",
    "services.s1.title":"Demolice objektů","services.s1.desc":"Bourání rodinných domů, hal, průmyslových objektů a komínů. Strojní i selektivní demolice s důrazem na bezpečnost.",
    "services.s2.title":"Zemní práce","services.s2.desc":"Výkopové práce, hloubení základů, terénní úpravy a příprava staveniště s vlastními bagry a nakladači.",
    "services.s3.title":"Recyklace suti","services.s3.desc":"Drcení betonu a cihel, třídění a odvoz odpadu. Ekologická likvidace stavebního materiálu s certifikací.",
    "about.eyebrow":"O firmě","about.title":"STAVBY-VYDRA s.r.o.",
    "about.lead":"Rodinná stavební a demoliční firma se sídlem v Evani. Pracujeme po celé České republice a stavíme na poctivém řemesle a moderní technice.",
    "about.p1":"Specializujeme se na komplexní demoliční práce — od malých bouracích zakázek po velké průmyslové demolice. Disponujeme vlastním parkem těžké techniky včetně pásových bagrů s hydraulickými kladivy a nůžkami.",
    "about.p2":"Každou zakázku řešíme individuálně. Vyhotovíme bourací postup, zajistíme všechna povolení a kompletní logistiku včetně odvozu a likvidace materiálu.",
    "about.ico":"IČO","about.seat":"Sídlo","about.seatValue":"Evaň, Česká republika","about.field":"Obor","about.fieldValue":"Demoliční práce",
    "ft.1":"BOZP & certifikace","ft.2":"Vlastní technika","ft.3":"Ekologická likvidace","ft.4":"Termíny dle dohody",
    "refs.eyebrow":"Reference","refs.title":"Vybrané realizace",
    "refs.r1.title":"Demolice průmyslové haly","refs.r1.loc":"Litoměřice","refs.r1.desc":"Kompletní demolice ocelové haly 2 400 m² včetně odvozu a recyklace materiálu.",
    "refs.r2.title":"Bourání rodinného domu","refs.r2.loc":"Roudnice nad Labem","refs.r2.desc":"Selektivní demolice zděného RD, příprava pozemku pro novostavbu.",
    "refs.r3.title":"Demolice komínu","refs.r3.loc":"Ústí nad Labem","refs.r3.desc":"Strojní bourání cihlového komínu výšky 38 m s minimálním omezením provozu.",
    "contact.eyebrow":"Spojte se s námi","contact.title":"Pošlete nám poptávku",
    "contact.lead":"Odpovídáme do 24 hodin. Ocenění zakázky a konzultace zdarma.",
    "contact.phone":"Telefon","contact.email":"E-mail","contact.address":"Adresa","contact.hours":"Provoz","contact.hoursValue":"Po–Pá 7:00 – 17:00",
    "contact.form.name":"Jméno a příjmení","contact.form.phone":"Telefon","contact.form.email":"E-mail","contact.form.message":"Popis zakázky",
    "contact.form.submit":"Odeslat poptávku →","contact.form.success":"Děkujeme, ozveme se vám co nejdříve.",
    "footer.tag":"Demoliční a stavební firma","footer.rights":"Všechna práva vyhrazena.",
  },
  en: { /* ... ponechte vaši anglickou lokalizaci ... */ },
  de: { /* ... ponechte vaši německou lokalizaci ... */ }
};

/* ============ Jazyk ============ */
let currentLang = "cs";
function applyLang(lang){
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    const v = I18N[lang]?.[k];
    if(v) el.innerHTML = v;
  });
  document.querySelectorAll("#langSwitch button").forEach(b=>{
    b.classList.toggle("active", b.dataset.lang === lang);
  });
  try{ localStorage.setItem("lang", lang); }catch(e){}
}

document.getElementById("langSwitch").addEventListener("click", e=>{
  const b = e.target.closest("button[data-lang]");
  if(b) applyLang(b.dataset.lang);
});

try{
  const saved = localStorage.getItem("lang");
  if(saved && I18N[saved]) applyLang(saved);
  else{
    const nav = (navigator.language || "cs").slice(0,2);
    if(I18N[nav]) applyLang(nav);
  }
}catch(e){}

/* ============ Header / mobile nav ============ */
const header = document.getElementById("header");
const onScroll = ()=> header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll); onScroll();

const mobileNav = document.getElementById("mobileNav");
document.getElementById("menuToggle").addEventListener("click", ()=> mobileNav.classList.toggle("open"));
mobileNav.querySelectorAll("a").forEach(a=> a.addEventListener("click", ()=> mobileNav.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();

/* ============ Kontakt (API worker) ============ */
const contactForm = document.getElementById("contactForm");
if(contactForm) {
  contactForm.addEventListener("submit", async e => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById("formSuccess");
    const errorMsg = document.getElementById("formError");

    successMsg.classList.add("hidden");
    if(errorMsg) errorMsg.classList.add("hidden");
    submitBtn.disabled = true;

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("https://form.stavby-vydra.eu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        successMsg.classList.remove("hidden");
        form.reset();
        setTimeout(() => successMsg.classList.add("hidden"), 6000);
      } else {
        throw new Error("API error");
      }
    } catch (err) {
      if(errorMsg) errorMsg.classList.remove("hidden");
    } finally {
      submitBtn.disabled = false;
    }
  });
}
