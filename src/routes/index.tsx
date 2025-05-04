import { createFileRoute } from "@tanstack/react-router";
import { Vote } from "~/components/Vote";
import { getEventByYear } from "~/utils/event";
import { MAIN_YEAR } from "~/utils/constants";
export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const event = await getEventByYear({ data: MAIN_YEAR });
    return { event };
  },
});

function RouteComponent() {
  const { event } = Route.useLoaderData();
  return (
    <div>
      <Vote galaEvent={event} />
    </div>
  );
}
