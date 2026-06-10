import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  layout("layouts/onboarding.tsx", [
    route("user", "components/user.tsx"),
    layout("layouts/archetype-quiz.tsx", [
      route("firstQuestion", "components/quiz-question-1.tsx")
    ]),
  ]),
  route("home", "routes/home.tsx"),
  route("profile", "routes/profile.tsx"),
  route("settings", "routes/settings.tsx"),
] satisfies RouteConfig;
