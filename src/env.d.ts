declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      HOST?: string;
      MAILER_EMAIL?: string;
      MAILER_SECRET_KEY?: string;
    }
  }
}

export {};
