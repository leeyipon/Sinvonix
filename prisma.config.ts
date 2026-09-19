import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js reads .env.local itself at runtime; the Prisma CLI doesn't, so load
// it here for `prisma migrate`/`generate` to see the same DATABASE_URL.
config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  },
});
