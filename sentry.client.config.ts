import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c9cf11c6677be5ebf2fe15645dcd7f04@o4509643705483264.ingest.us.sentry.io/4509643715969024",
  sendDefaultPii: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
