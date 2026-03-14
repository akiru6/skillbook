import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  future: {
    // Required for Cloudflare Vite plugin compatibility
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
