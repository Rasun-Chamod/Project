# Media Recommender Front-End

React + TypeScript single-page app for the movie/game recommendation prototype. The UI consumes the Django REST API for authentication, profile management, analytics, recommendations, and downloads.

## Prerequisites

- Node.js 18 or newer
- Backend API running at `http://127.0.0.1:8000`

## Setup

```powershell
cd Front-End\client
npm install
```

Create a `.env` file (see `.env` in this folder) and point it to your backend:

```
VITE_API_URL=http://127.0.0.1:8000
```

## Development

```powershell
# from Front-End\client
npm run dev
```

Vite serves the app at `http://localhost:5173`. Ensure the Django server is running so API calls succeed.

## Production Build

```powershell
npm run build
```

Static assets are written to `dist/`. Preview the build with:

```powershell
npm run preview
```

## Structure

- `src/api/client.ts` – Axios instance with JWT interceptors
- `src/store/auth.ts` – Zustand auth store for tokens/user
- `src/routes/AppRoutes.tsx` – Router configuration (public vs protected)
- `src/layouts/DashboardLayout.tsx` – Authenticated shell/navigation
- `src/features/*` – Feature-specific screens (auth, profile, recommendations, analytics, downloads)
- `src/styles/global.css` – Global styles and layout primitives

React Query powers server-state caching, React Hook Form handles forms, and Chart.js renders analytics visuals.
