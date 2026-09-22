# ⚡ BUILDFORGE STUDIO
> **An online development studio for modern businesses.**  
> *"We build digital systems that solve real business problems."*

LIVE DEMO :  https://buildforgestudio.vercel.app/

BuildForge Studio is a full-stack web application and content management system engineered for delivering rapid development tasks ($25+ bug fixes & integrations), custom web applications, SaaS MVPs, and business internal software.

---

## 🏛️ System Architecture

```
                               ┌─────────────────────────────┐
                               │   Vercel Cloud (frontend)   │
                               │   React 18 + Vite (SPA)     │
                               └──────────────┬──────────────┘
                                              │  HTTPS / JSON
                                              ▼
                               ┌─────────────────────────────┐
                               │   Central API Client        │
                               │   (apiClient.js / Axios)    │
                               └──────────────┬──────────────┘
                                              │  REST API Calls
                                              ▼
┌───────────────────────────┐  ┌─────────────────────────────┐
│  Cloudinary Media Storage │◄─┤   Render Cloud (backend)    │
│  (Assets, Portfolio CDN)  │  │   Node.js + Express (ESM)   │
└───────────────────────────┘  └──────────────┬──────────────┘
                                              │  Mongoose ODM
                                              ▼
                               ┌─────────────────────────────┐
                               │     MongoDB Atlas DB        │
                               │ (Enquiries, Tasks, CMS Data)│
                               └─────────────────────────────┘
```

---

## 📁 Repository Structure

```
buildforge-studio/
├── frontend/                 # React 18 + Vite Single Page Application
│   ├── public/               # Favicons and static assets
│   ├── src/
│   │   ├── api/              # Centralized API service layer
│   │   ├── components/       # Component-scoped modules with paired CSS
│   │   │   ├── common/       # Buttons, Modals, Badges, Loaders, Toasts
│   │   │   ├── layout/       # Responsive Navbar, Footer, Admin Sidebar & Mobile Nav
│   │   │   ├── home/         # Hero, VFX Canvas, WhatWeDo, Featured, Services, Teasers
│   │   │   ├── projects/     # Project cards, gallery, live demo links
│   │   │   ├── services/     # Service cards and feature matrices
│   │   │   ├── tasks/        # Quick task category cards
│   │   │   ├── process/      # Interactive 4-step delivery timeline
│   │   │   ├── enquiry/      # Global 2-step floating enquiry widget
│   │   │   └── admin/        # Stat cards, data tables, search/filter bars, CRUD modals
│   │   ├── context/          # AuthContext, SiteContext, ToastContext
│   │   ├── hooks/            # useAuth, useSite, useToast, useScrollReveal
│   │   ├── pages/
│   │   │   ├── public/       # Home, Work, ProjectDetail, Services, QuickTasks, Process, About, Contact
│   │   │   └── admin/        # Login, Overview Dashboard, Enquiries, Tasks, Projects, Services, Settings
│   │   ├── routes/           # React Router v6 routing & ProtectedRoute
│   │   ├── utils/            # Formatters, validators, slug generators
│   │   ├── App.jsx           # App wrapper
│   │   ├── index.css         # Global design tokens & reset
│   │   └── main.jsx          # Vite React mounting
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json           # SPA rewrites configuration
│   └── vite.config.js
│
├── backend/                  # Node.js + Express.js ES Module REST API
│   ├── src/
│   │   ├── config/           # MongoDB connection & Cloudinary initialization
│   │   ├── controllers/      # Auth, Enquiries, Tasks, Projects, Services, Settings, Uploads
│   │   ├── middleware/       # JWT Auth verification, Input validation, Multer, Error handlers
│   │   ├── models/           # Mongoose schemas (Admin, Enquiry, Task, Project, Service, Setting)
│   │   ├── routes/           # REST endpoints
│   │   ├── services/         # Cloudinary CDN service & Database auto-seeding
│   │   ├── utils/            # JWT helpers, Logger, Default seed data
│   │   ├── app.js            # Express app configuration, CORS, Helmet, Rate Limiter
│   │   ├── server.js         # HTTP server entrypoint
│   │   └── seed.js           # Standalone CLI seeding script
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── .env.example
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection URI
- **Cloudinary**: Free account for media storage

### 2. backend Setup
```bash
cd backend

# Copy environment configuration
cp .env.example .env

# Edit .env with your MongoDB URI, JWT Secret, and Cloudinary keys:
# PORT=5000
# MONGODB_URI=mongodb+srv://...
# JWT_SECRET=your_super_secret_jwt_key
# CLOUDINARY_CLOUD_NAME=...
# CLOUDINARY_API_KEY=...
# CLOUDINARY_API_SECRET=...

# Install dependencies
npm install

# (Optional) Run initial seed data manually
npm run seed

# Start development server
npm run dev
# Server running at: http://localhost:5000
# Health check: http://localhost:5000/health
```

### 3. frontend Setup
```bash
cd ../frontend

# Copy environment configuration
cp .env.example .env

# Verify backend URL in .env:
# VITE_API_BASE_URL=http://localhost:5000/api

# Install dependencies
npm install

# Start Vite development server
npm run dev
# frontend running at: http://localhost:5173
```

---

## 🔐 Administrative Access

The private administrative management dashboard is located at:
```
http://localhost:5173/Adminlogidashboard
```

### Default Credentials (from Seed)
- **Email:** `admin@buildforgestudio.com`
- **Password:** `BuildForge@2026!Secure`

*(You can customize these in `backend/.env` before initial startup or modify password in database).*

---

## 🌐 Production Deployment Guide

### A. Deploy backend to Render
1. Create a **Web Service** on [Render](https://render.com).
2. Connect your Git repository and set the **Root Directory** to `backend`.
3. Set **Runtime** to `Node`.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `npm start`.
6. Add the following **Environment Variables** in Render:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (or leave default Render port)
   - `MONGODB_URI` = `mongodb+srv://...`
   - `JWT_SECRET` = `[Random 64-char string]`
   - `JWT_EXPIRES_IN` = `7d`
   - `ADMIN_EMAIL` = `admin@buildforgestudio.com`
   - `ADMIN_PASSWORD` = `[Secure Password]`
   - `CLOUDINARY_CLOUD_NAME` = `[Your Cloudinary Cloud Name]`
   - `CLOUDINARY_API_KEY` = `[Your Cloudinary API Key]`
   - `CLOUDINARY_API_SECRET` = `[Your Cloudinary API Secret]`
   - `CLIENT_URL` = `https://your-frontend.vercel.app`
   - `FRONTEND_URL` = `https://your-frontend.vercel.app`

### B. Deploy frontend to Vercel
1. Import your repository into [Vercel](https://vercel.com).
2. Set the **Root Directory** to `frontend`.
3. Set **Framework Preset** to `Vite`.
4. Add the following **Environment Variable** in Vercel:
   - `VITE_API_BASE_URL` = `https://your-backend.onrender.com/api`
5. Deploy. The included `vercel.json` ensures all SPA routes (`/work`, `/services`, `/Adminlogidashboard`) work without 404 errors on direct navigation or page refresh.

---

## 🛡️ Security & Quality Standards
- **Strict Separation of Concerns**: Zero MongoDB queries in frontend. All interactions flow through controller-validated REST endpoints.
- **Secure Authentication**: JWT session handling with secure HTTP-only cookies and Bearer fallback for cross-domain proxying.
- **Image Pipeline**: Cloudinary CDN image uploads with automated deletion cleanup on project updates.
- **Component CSS Isolation**: Every page and component is accompanied by its own paired `.css` stylesheet.
- **Responsive Architecture**: Tested across breakpoints (320px, 390px, 768px, 1024px, 1440px+).

---

## 📄 License
MIT © 2026 BuildForge Studio. All rights reserved.
