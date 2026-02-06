/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_ADMIN_PASSWORD: string
  readonly VITE_RATEUP_API_KEY: string
  readonly VITE_RATEUP_URL: string
  readonly VITE_RATEUP_ORG_ID: string
  readonly VITE_RATEUP_TEMPLATE_ID: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_WHATSAPP_MESSAGE: string
  readonly VITE_GA_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
