# React Data Fetch + useMemo (Vite + TypeScript)

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://react-data-fetch-memo.vercel.app)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/react-data-fetch-memo)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A small React SPA that fetches product data from a public API and demonstrates **memoization of derived data** using `useMemo`.

This project focuses on **render behavior**, **performance awareness**, and **clean separation between data fetching, UI state, and derived state**.

## Live Demo

🔗 https://react-data-fetch-memo.vercel.app

## Deployment

This project is automatically deployed using Vercel with GitHub integration.

- Every push to `main` triggers a production deployment
- Pull requests generate preview deployments
- Build, optimization, and hosting are handled by Vercel

## Features

- 🌐 **Data fetching** from a public REST API (`dummyjson.com`)
- 🔎 **Client-side filtering** by:
  - Search term
  - Category
  - Sort option (title / price / rating)
- 🧠 **Memoized derived data** using `useMemo`
  - Prevents unnecessary recomputation on theme changes
- 🧩 Clear separation of concerns:
  - Data fetching (`useProducts`)
  - UI state (filters)
  - Derived state (filtered & sorted products)
- 🌗 **Light / Dark theme toggle**
  - Implemented as unrelated UI state
  - Demonstrates that memoized derived data is NOT recomputed
- 🎨 Clean, responsive layout using plain CSS Grid
- ⚛️ React **StrictMode-friendly** (expected double renders in dev)

## Why this project exists

In React applications, it’s common to derive data from a base dataset  
(e.g. filtering, sorting, mapping).

This project demonstrates:

- **Why derived data should be memoized**
- **When `useMemo` is useful**
- How to avoid unnecessary recomputation when **unrelated UI state changes**
- How unrelated UI state (such as a theme toggle) does not trigger expensive
  recomputations when derived data is properly memoized.
- The difference between:
  - **Source state** (`products`)
  - **UI state** (search, category, sort)
  - **Derived state** (`visibleProducts`)

## Key Concepts Demonstrated

### `useMemo` for derived data

```ts
const visibleProducts = useMemo(() => {
  let result = products;

  if (searchTerm.trim()) {
    result = result.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  if (category !== "all") {
    result = result.filter((p) => p.category === category);
  }

  return [...result].sort(/* sorting logic */);
}, [products, searchTerm, category, sortBy]);
```

- The computation only runs **when its dependencies change**
- Unrelated state changes do **not** trigger recomputation
- This scales much better as datasets grow

### Memoizing derived lists (categories)

```ts
const categories = useMemo(() => {
  const unique = new Set(products.map((p) => p.category));
  return ["all", ...Array.from(unique)];
}, [products]);
```

- Categories depend **only** on fetched data
- They are computed once per data load
- No recomputation on UI interactions

---

## Project Structure

```
react-data-fetch-memo/
├─ src/
│  ├─ api/
│  │  └─ productsApi.ts
│  ├─ components/
│  │  ├─ Filters.tsx
│  │  ├─ ProductList.tsx
│  │  └─ ProductItem.tsx
│  ├─ hooks/
│  │  └─ useProducts.ts
│  ├─ types/
│  │  └─ product.ts
│  ├─ App.tsx
│  └─ main.tsx
├─ public/
├─ index.html
└─ README.md
```

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:5173
```

### Production build

```bash
npm run build
npm run preview
```

## Notes on React StrictMode

- In development, React StrictMode **intentionally double-invokes renders**
- This is expected and helps surface unsafe side effects
- **Production builds render only once**

This project is StrictMode-safe.

## Next Steps / Possible Extensions

- Extract filter logic into a custom hook
- Add pagination or virtualization for large datasets
- Add unit tests for filtering logic

This project is intentionally small and focused, aiming to demonstrate
render behavior and memoization patterns rather than feature completeness.

## License

This project is licensed under the **MIT License**.
