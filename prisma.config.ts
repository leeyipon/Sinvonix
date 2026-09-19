import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js reads .env.local itself at runtime; the Prisma CLI doesn't, so load
// it here for `prisma migrate`/`generate` to see the same DATABASE_URL.
config({ path: ".env.local" });
config();

// Prisma 7 reads the migration/introspection connection URL from here (not the
// schema). Migrations should run over a *direct* connection, so prefer
// DIRECT_URL and fall back to the (possibly pooled) DATABASE_URL. The app's
// runtime connection is configured separately via the driver adapter in
// src/lib/db.ts.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
