InstaStudio backend

Deploy a Render Web Service from this repository with root directory backend, build command npm install, start command npm start, Node runtime, Singapore region.

Required Render environment variables:
- DATABASE_URL: Render Postgres internal connection string.
- JWT_SECRET: random secret, at least 32 bytes.
- MASTER_ENCRYPTION_KEY: exactly 64 hex characters (32 random bytes) for AES-256-GCM encrypted provider keys.
- ADMIN_TOKEN: strong private token for issuing access keys.
- CORS_ORIGINS: https://instastudio-rebuild.onrender.com

Never commit secrets or send them to the browser. Set them in Render Environment.

API: GET /api/health; POST /api/auth/request-key; POST /api/auth/login; POST /api/admin/keys (x-admin-token); authenticated GET /api/auth/me; GET/PUT /api/profile; GET/POST /api/reels; PATCH /api/reels/:id/metrics; GET/PUT/DELETE /api/settings/keys/:provider.

Access-key requests are stored for administrator review; email delivery is not configured. Provider keys are encrypted at rest and never returned. Live Apify/Gemini/Grok execution, payment processing, media storage and Instagram OAuth are separate integration work.
