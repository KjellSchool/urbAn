import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layouts/onboarding.tsx", [
    index("components/user.tsx"),
    layout("layouts/archetype-quiz.tsx", [
      route("firstQuestion", "components/quiz-question-1.tsx")
    ]),
  ]),
  route("home", "routes/home.tsx"),
  route("profile", "routes/profile.tsx"),
  route("settings", "routes/settings.tsx"),
] satisfies RouteConfig;
