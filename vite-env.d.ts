/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string; // Aquí defines tus variables de entorno que usas en tu proyecto
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}  