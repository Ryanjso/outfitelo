import { createFileRoute } from "@tanstack/react-router";
import { getRankings } from "~/utils/ranking";

export const Route = createFileRoute("/rankings")({
  component: RouteComponent,
  loader: async () => {
    const rankings = await getRankings();
    return rankings;
  },
  // ssr: false,
});

function RouteComponent() {
  const rankings = Route.useLoaderData();

  return (
    <div>
      Hello "/rankings"!
      <ol>
        {rankings.map((outfit) => (
          <li key={outfit.id}>
            {outfit.outfit.wearerName} {outfit.rating}
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: outfit.outfit.imageUrl,
                }}
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
