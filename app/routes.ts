import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/home.tsx", [
        route("skills/:skillId", "routes/skill-detail.tsx")
    ]),
    route("/google8fa30a8b1f5d7d94.html", "routes/google8fa30a8b1f5d7d94[.]html.ts")
] satisfies RouteConfig;
