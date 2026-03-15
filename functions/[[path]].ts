import { createRequestHandler } from "react-router";

// @ts-ignore - server build is generated at build time
import * as build from "../build/server/index.js";

const handler = createRequestHandler(build, "production");

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Serve static assets from the build/client directory
  if (url.pathname.startsWith("/assets/") || url.pathname === "/favicon.ico") {
    return context.next();
  }

  return handler(context.request, {
    cloudflare: { env: context.env, ctx: context },
  });
};
