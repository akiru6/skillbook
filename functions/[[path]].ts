import { createRequestHandler } from "@react-router/cloudflare";
// @ts-ignore - build 文件夹在构建时才会生成
import * as build from "../build/server/index.js";

const handleRequest = createRequestHandler(build);

export const onRequest: PagesFunction = (context) => {
  return handleRequest(context.request, context.env, context);
};
