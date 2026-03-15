import { createRequestHandler } from "@react-router/cloudflare";

// @ts-ignore - server build is generated at build time
import * as build from "../build/server/index.js";

const handler = createRequestHandler(build);

export const onRequest: PagesFunction = async (context) => {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // If the request is for a static asset, pass it through to the static assets server
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/robots.txt"
  ) {
    return next();
  }

  return handler(request, {
    cloudflare: { env, ctx: context },
  });
};
