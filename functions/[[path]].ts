import { createRequestHandler } from "react-router";

// @ts-ignore - server build is generated at build time
import * as build from "../build/server/index.js";

const handler = createRequestHandler(build, "production");

export const onRequest: PagesFunction = async (context) => {
  return handler(context.request, {
    cloudflare: { env: context.env, ctx: context },
  });
};
