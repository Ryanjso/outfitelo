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

  //       <Script src="https://embed-cdn.gettyimages.com/widgets.js" strategy="lazyOnload" />

  scripts(ctx) {
    return [
      {
        src: "https://embed-cdn.gettyimages.com/widgets.js",
        strategy: "lazyOnload",
      },
    ];
  },
});

function RouteComponent() {
  const { event } = Route.useLoaderData();
  return <Vote galaEvent={event} />;
}
