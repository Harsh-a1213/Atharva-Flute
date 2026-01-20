/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  // Add other env vars if you have them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
