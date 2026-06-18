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
      route("question-1", "components/newUser.tsx"),
      route("question-2", "components/quiz-question-1.tsx"),
      route("question-3", "components/quiz-question-2.tsx"),
      route("question-4", "components/quiz-question-3.tsx"),
      route("question-5", "components/quiz-question-4.tsx"),
      route("question-6", "components/quiz-question-5.tsx"),
      route("question-7", "components/quiz-question-6.tsx"),
      route("question-8", "components/quiz-question-7.tsx"),
      route("result", "components/archetypeResult.tsx"),
    ]),
  ]),
  route("home", "routes/home.tsx"),
  route("profile", "routes/profile.tsx"),
  route("settings", "routes/settings.tsx"),
  route("editprofile", "routes/editprofile.tsx"),
] satisfies RouteConfig;
