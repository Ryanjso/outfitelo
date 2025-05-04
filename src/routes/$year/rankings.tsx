import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$year/rankings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$year/rankings"!</div>;
}
