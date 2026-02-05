/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_ADMIN_PASSWORD: string
  readonly VITE_RATEUP_API_KEY: string
  readonly VITE_RATEUP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
