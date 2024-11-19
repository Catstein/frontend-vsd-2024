import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_PROJECT_URL: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PROJECT_URL: process.env.NEXT_PUBLIC_PROJECT_URL,
  },
});
