import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  productionBrowserSourceMaps: false,
};

export default withSentryConfig(
  withSentryConfig(nextConfig, {
    org: "ahmed-ec",
    project: "javascript-nextjs",
    silent: !process.env.CI,
    disableLogger: true,
    authToken: process.env.SENTRY_AUTH_TOKEN, // 👈 هنا أضفت التوكن
  }),
  {
    org: "ahmed-ec",
    project: "javascript-nextjs",
    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    disableLogger: true,
    automaticVercelMonitors: true,
    authToken: process.env.SENTRY_AUTH_TOKEN, // 👈 وهنا كمان
  }
);
