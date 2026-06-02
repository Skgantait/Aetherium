import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: CatchAllRoute,
});

function CatchAllRoute() {
  return null; // Rendered by root's notFoundComponent
}
