# Session 02: Project Initialization & Styling

## 🎯 Topics Covered
* **Manual Setup:** Folosirea `npm create vite@latest` cu TypeScript.
* **Tailwind CSS:** Instalare, configurare și utilizarea claselor utilitare.
* **Architecture:** Structura unui component Vue (Script, Template, Style).
* **Security:** Introducere în `.env` și importanța `.gitignore`.

## 🛠️ Setup Commands
```bash
# Vite with TS
npm create vite@latest my-movie-app -- --template vue-ts
cd my-movie-app
npm install

# Tailwind configuration
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 💡 Specific Nuxt Configurations (Preview)
Deși începem cu Vite, pregătim terenul pentru Nuxt mai târziu. 
- `/components` pentru componente reutilizabile (PascalCase).
- `/pages` pentru rute (unde vom mapa fișierele manual).

## 🎓 Tutor Hints
> **Pro-Tip for this Session:** 
> Discută despre **Mobile-first** ca filozofie de design. De ce e mai ușor să adaugi complexitate pe ecrane mari decât să o elimini pe cele mici? Arată-le cum funcționează prefixele `md:` sau `lg:` în Tailwind.

### 🏢 Industry Bridge (Real-World Context)
> **Discussion Topic:** 
> **Product vs Outsourcing:** Diferența între companiile de produs și agenții. Unde este mai riguros codul și unde este viteză mai mare?
