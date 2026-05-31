# STAVBY-VYDRA s.r.o. — webová prezentace

Statická vícejazyčná stránka (CS / EN / DE) s integrovanou mini hrou.

## Nasazení

Rozbalte ZIP a nahrajte celý obsah složky na váš webhosting (FTP).
Žádná instalace, žádný build — funguje hned jako statické stránky.

## Struktura

- `index.html` — stránka
- `styles.css` — design system
- `script.js` — i18n, formulář, mini hra
- `assets/` — obrázky

## Lokální spuštění

Otevřete `index.html` v prohlížeči, nebo:
```
python3 -m http.server 8000
```
a otevřete http://localhost:8000

## Úpravy

- **Kontakty / texty:** přímo v `index.html` (české výchozí texty)
- **Překlady:** v `script.js` v objektu `I18N`
- **Barvy / typografie:** v `styles.css` v sekci `:root`
