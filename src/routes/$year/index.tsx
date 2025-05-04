import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$year/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$year/"!</div>;
}
