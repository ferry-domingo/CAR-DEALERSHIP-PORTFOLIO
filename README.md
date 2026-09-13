# Rafael Galvez — BYD Sales Consultant

A production-minded MERN portfolio/demo project for a personal automotive sales consultant website concept based in Baliwag, Bulacan, Philippines.

> **Important:** This is a portfolio/demo concept and **not an official BYD corporate website**. Seeded vehicle details, pricing, deliveries, testimonials, profile imagery, and contact details are demonstration content unless replaced with verified and authorized information.

## Goals

- Premium automotive presentation
- Personal consultant trust-building
- BYD vehicle discovery
- Quote / test-drive / financing inquiries
- Customer delivery showcase
- Clearly labeled demo testimonials
- Protected admin content management

The intended customer journey is: **Discover → Trust → Inquire → Connect**.

## Tech stack

### Frontend
- React 18 + Vite
- JavaScript / JSX (no TypeScript)
- Tailwind CSS
- React Router
- Axios
- Zustand
- Lucide React

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- REST API
- JWT admin authentication
- bcrypt password hashing
- express-validator
- Helmet
- CORS
- express-rate-limit
- express-mongo-sanitize
- Morgan

## Folder structure

```text
byd-rafael-galvez/
├── client/
│   ├── public/images/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── store/
│       └── utils/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── uploads/
│   └── utils/
├── .env.example
├── package.json
└── README.md
```

## Public routes

- `/`
- `/about`
- `/vehicles`
- `/vehicles/:slug`
- `/deliveries`
- `/testimonials`
- `/contact`

The homepage follows the required order exactly:

1. Hero
2. About Rafael
3. Request a Quote
4. Customer Deliveries
5. Testimonials
6. Why Choose BYD
7. Featured BYD Vehicles
8. Contact

## Admin routes

- `/admin/login`
- `/admin/dashboard`
- `/admin/vehicles`
- `/admin/deliveries`
- `/admin/testimonials`
- `/admin/inquiries`

Admin routes are protected on both the frontend and backend. The backend verifies a JWT and loads the admin user before allowing protected actions.

## Features

### Public website
- Premium responsive automotive design
- Sticky desktop navigation
- Mobile hamburger menu
- Mobile inquiry CTA
- Responsive demo vehicle artwork
- Data-driven vehicle filters
- Vehicle details with gallery, highlights, specs, pricing, inquiry and test-drive CTA
- Inquiry form with client-side and server-side validation
- MongoDB inquiry storage
- Customer delivery gallery
- Approved testimonial listing
- Explicit demo labels on seeded social-proof content
- Loading, empty, success and error states
- Image fallback handling
- Accessible labels, focus states and semantic structure
- Lazy-loaded route pages

### Admin dashboard
- Dashboard counts
- Recent inquiries
- Vehicle CRUD
- Delivery CRUD
- Testimonial CRUD
- Testimonial approval / visibility logic
- Inquiry search
- Inquiry status filtering
- Inquiry type filtering
- Inquiry status updates (`New → Contacted → Closed`)
- Delete confirmation dialogs

## Environment setup

Copy the example file:

```bash
cp .env.example server/.env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example server/.env
```

Update the values in `server/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/byd-rafael-galvez
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
```

For a different API base URL, create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB setup

Use either:

1. Local MongoDB running on `mongodb://127.0.0.1:27017`, or
2. MongoDB Atlas and place the connection string in `MONGO_URI`.

The database is created automatically after the first connection and seed.

## Installation

From the project root:

```bash
npm install
npm run install:all
```

Or install individually:

```bash
cd server && npm install
cd ../client && npm install
```

## Seed demo data

After configuring `server/.env` and starting MongoDB:

```bash
npm run seed
```

This will create:
- Demo vehicles
- Demo deliveries
- Demo testimonials
- Admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD`

Seeded testimonials and deliveries are explicitly stored with `is_demo: true`.

### Default local admin credentials

If you do not change the environment values:

```text
Email: admin@example.com
Password: ChangeMe123!
```

**Change these before deployment.**

## Run development servers

After installing the root `concurrently` dependency:

```bash
npm run dev
```

Or run separately:

```bash
npm run dev:server
npm run dev:client
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

Health check: `http://localhost:5000/api/health`

## Build frontend

```bash
npm run build
```

Vite outputs the production frontend to `client/dist`.

## REST API overview

### Public

```text
GET  /api/vehicles
GET  /api/vehicles/:slug
GET  /api/deliveries
GET  /api/testimonials
POST /api/inquiries
```

### Admin auth

```text
POST /api/admin/login
```

### Protected admin

```text
GET    /api/admin/dashboard
GET    /api/admin/vehicles
POST   /api/admin/vehicles
PUT    /api/admin/vehicles/:id
DELETE /api/admin/vehicles/:id

GET    /api/admin/deliveries
POST   /api/admin/deliveries
PUT    /api/admin/deliveries/:id
DELETE /api/admin/deliveries/:id

GET    /api/admin/testimonials
POST   /api/admin/testimonials
PUT    /api/admin/testimonials/:id
DELETE /api/admin/testimonials/:id

GET /api/admin/inquiries
PUT /api/admin/inquiries/:id/status
```

## Security notes

Implemented safeguards include:
- bcrypt password hashing
- JWT-protected admin APIs
- Express validation
- MongoDB operator sanitization
- Helmet security headers
- CORS allow-list via `CLIENT_URL`
- Rate limiting on the public inquiry endpoint
- Environment-based secrets
- Generic API error handling

For production, also configure HTTPS, secure hosting, database network controls, backups, monitoring, log retention, a stronger auth/session policy, and a private/admin-specific deployment strategy as appropriate.

## Image architecture

Vehicle, delivery and testimonial image references are stored as URLs/paths in MongoDB rather than hard-coded into presentation components. The included SVG files are original demo artwork/placeholders inside `client/public/images/`.

Before real deployment, replace them with properly licensed/authorized vehicle and customer photography.

## Deployment notes

### Vercel frontend

The repository includes a root `vercel.json` that installs and builds the Vite client and rewrites React Router URLs to `index.html`.

1. Import the repository in Vercel and leave the Root Directory at the repository root.
2. Add `VITE_API_URL` in Vercel for Production, Preview, and Development. Its value must be the public backend URL including `/api`, for example `https://api.example.com/api`.
3. Deploy. Vercel will use the committed install, build, and output settings automatically.

### Backend and database

Deploy `server/` to a persistent Node.js host such as Render, Railway, Fly.io, or a VPS, and use MongoDB Atlas in production. Configure these backend environment variables:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=<long-random-secret>
CLIENT_URL=https://your-project.vercel.app
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=<strong-initial-password>
```

If both the Vercel production domain and a custom domain must access the API, put both origins in `CLIENT_URL`, separated by commas.

The current image uploader writes to `server/uploads`. Do not deploy the backend to Vercel Functions: their filesystem is ephemeral, so uploaded profile, vehicle, delivery, and testimonial photos would be lost. Use a backend host with a persistent disk mounted for `server/uploads`, or migrate uploads to object storage before using a serverless backend.

No paid Render Shell is required to create the admin. On startup, the backend creates the initial admin automatically from `ADMIN_EMAIL` and `ADMIN_PASSWORD` when that email does not exist yet. Use a password containing at least 12 characters, then sign in with those values. Changing the environment password later does not overwrite an existing account.

The optional `npm run seed` command is only for loading demonstration vehicles, deliveries, and testimonials; it is not required for the deployed site or admin login. After deployment, verify `/api/health`, admin login, image upload, and a direct visit to a nested frontend route such as `/vehicles`.

## Production content checklist

Before publishing this as a real consultant website:
- Replace profile placeholder with an authorized Rafael photo
- Replace placeholder contact details
- Verify the correct consultant location and public contact channels
- Verify all vehicle names currently offered in the local market
- Verify prices, specifications and variants
- Replace demo delivery entries only with authorized customer content
- Replace demo testimonials only with genuine, authorized reviews
- Update privacy / consent text for lead collection
- Confirm brand/trademark usage requirements
- Add a production email/CRM notification workflow if desired

## Portfolio/demo disclaimer

This project was intentionally structured so demo content is visibly separate from verified business information. It does not process payments, does not claim official BYD corporate affiliation, and does not present fictional testimonials as genuine reviews.
