import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createUseMutationHook } from "~/utils";
import { getPairQueryOptions, vote } from "~/utils/match";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const MET_GALA_2025_ID = 1;

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(getPairQueryOptions(MET_GALA_2025_ID));
  const useVote = createUseMutationHook(vote);
  const { mutate, isPending: isVoting } = useVote({
    onSuccess: () => {
      queryClient.invalidateQueries(getPairQueryOptions(MET_GALA_2025_ID));
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      Hello "/"!
      <div>
        <h1>Pick one</h1>
        <button
          onClick={() =>
            mutate({
              data: {
                winnerOutfitId: data[0].id,
                loserOutfitId: data[1].id,
              },
            })
          }
        >
          {data[0].wearerName}
        </button>
        <button
          onClick={() =>
            mutate({
              data: {
                winnerOutfitId: data[1].id,
                loserOutfitId: data[0].id,
              },
            })
          }
        >
          {data[1].wearerName}
        </button>
      </div>
    </div>
  );
}
