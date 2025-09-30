import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Клиентские переменные (доступны в браузере)
   * Должны начинаться с NEXT_PUBLIC_
   */
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string().min(1),
  },

  /**
   * Серверные переменные (только на сервере, НЕ попадают в клиент)
   */
  server: {
    CLERK_SECRET_KEY: z.string().min(1),
    ARCJET_KEY: z.string().min(1),
  },

  /**
   * Автоматически берём все объявленные переменные из process.env
   */
  experimental__runtimeEnv: process.env as Record<string, string | undefined>,

  /**
   * Пустые строки считаем как undefined → лучше обработка ошибок
   */
  emptyStringAsUndefined: true,

  /**
   * Опционально: отключить валидацию в CI/CD или при разработке
   * Например, в Vercel вы можете задать SKIP_ENV_VALIDATION=1
   */
  // skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});