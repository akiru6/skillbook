import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/home.tsx", [
        route("skills/:skillId", "routes/skill-detail.tsx")
    ])
] satisfies RouteConfig;
