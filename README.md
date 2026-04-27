# Session 04: Enterprise Architecture & Security

## 🎯 Topics Covered
* **Navigation Guards:** Protecting routes using `router.beforeEach` and `meta` fields.
* **Architecture:** Consolidating API utilities in `src/api` and utilizing a centralized `httpWrapper`.
* **Form Validation:** Introducing **Zod** for schema-based validation in the login form.
* **Deployment Ready:** Configuring `vercel.json` for history mode routing.

## 🛠️ Key Concepts

### 1. Schema-Based Validation (Zod)
We moved away from manual `if` checks to a formal schema using Zod. This allows us to define clear rules for our data and reuse them across the app.

### 2. Centralized API Handling
Instead of manually adding headers to every `fetch` call, we created a utility that:
1.  Reads the token from `localStorage`.
2.  Adds the `Authorization` header (unless overridden or skipped).
3.  Automatically handles `401 Unauthorized` errors and redirects to Login.
4.  Provides a single point of failure and logging for all network requests (TMDB, Local DB, Auth).

### 3. Store-First Logic
We refactored the Favorites logic. Instead of each "Heart" icon fetching its own status, the `movieStore` now holds the source of truth for all favorite movies.

## 🚀 Deployment (Vercel)
To deploy a Vue/Vite SPA, we must tell Vercel to redirect all traffic to `index.html` so the Vue Router can handle the sub-paths. This is done via the `vercel.json` file.

---

## 🎓 Tutor Hints
> **Pro-Tip for this Session:** 
> Discuss the **"Single Source of Truth"** principle. Why is it dangerous to have the same data (like a favorite status) stored in two different places? Explain how Pinia solves the "Out of Sync" UI bug.

### 🏢 Industry Bridge
> **Discussion Topic:** 
> **Technical Debt:** Explain that "Hardcoded" code isn't always "Bad" code—it's often just "Phase 1" code. Refactoring is a natural part of the software lifecycle as a project grows from a prototype to a product.
