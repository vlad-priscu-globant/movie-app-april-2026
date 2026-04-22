# Session 01

## 🎯 Topics Covered
* Introducere în ecosistemul Vue/Nuxt. Setup proiect cu Vite. Structura de bază și Virtual DOM. Setup Git.

## 🛠️ Setup Project Commands

Pentru a începe un proiect nou folosind Vite, TypeScript și Vue, rulați următoarele comenzi:

```bash
# Inițializarea proiectului cu Vite
npm create vite@latest my-movie-app -- --template vue-ts

# Navigarea în directorul proiectului
cd my-movie-app

# Instalarea dependențelor
npm install

# Rularea serverului de dezvoltare
npm run dev
```

### 💡 Specific Nuxt Configurations (Preview)
Deși începem cu Vite, pregătim terenul pentru Nuxt mai târziu. Asigurați-vă că structura folderelor respectă convențiile:
- `/components` pentru componente reutilizabile.
- `/pages` pentru rute (unde vom mapa fișierele manual în primele sesiuni).

#### 📄 The `.env` File (Environment Variables)
Introduceți devreme conceptul de fișiere `.env`. Arătați-le studenților cum să creeze un fișier `.env` în rădăcina proiectului pentru a stoca secrete (ex: API Keys).
- **Atenție:** Asigurați-vă că `.env` este adăugat în `.gitignore`!

### 🆚 SPA (Vue) vs SSR (Nuxt) - Starting Point Comparison
Pentru a stabili un context clar încă din prima zi, arătați-le diferența dintre cum se randează Vue și Nuxt în browser.

**Vue (SPA) - Ce primește browserul inițial:**
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Vue App</title>
  </head>
  <body>
    <!-- Un div gol. JavaScript-ul trebuie descărcat și executat pentru a desena aplicația. -->
    <div id="app"></div> 
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**Nuxt (SSR) - Ce primește browserul inițial:**
```html
<!-- index.html randat pe server -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Nuxt Movie App</title>
  </head>
  <body>
    <!-- Aplicația este deja construită. SEO excelent, se încarcă instant! -->
    <div id="__nuxt">
       <nav>Logo Movie App</nav>
       <h1>Popular Movies</h1>
       <!-- Filmele sunt vizibile chiar dacă JS-ul încă se descarcă -->
    </div> 
  </body>
</html>
```

## 🚀 Instructions
This folder represents the physical codebase state up to this session. 
If you cloned this folder separately, remember to run `npm install` to install the dependencies before starting the development server.

> **Note**: As per the student tracking protocol, the live class may differ slightly in scope from the codebase state represented here.

## 🎓 Tutor Hints
> **Pro-Tip for this Session:** 
> Introduce conceptul de **Virtual DOM**. De ce nu modificăm direct DOM-ul? Compară cu un set de instrucțiuni de construcție (Vue) vs. a muta fizic cărămizile singur (Direct DOM).

### 🏢 Industry Bridge (Real-World Context)
> **Discussion Topic:** 
> **Onboarding & Induction:** Cum arată primele săptămâni ca Junior la primul job? Setarea mediului de lucru, accesul la repository-uri și importanța de a citi documentația proiectului (un README bun).
