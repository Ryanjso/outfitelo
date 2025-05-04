import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$year/layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$year/layout"!</div>;
}
