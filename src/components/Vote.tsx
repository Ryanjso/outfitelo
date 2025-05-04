import { useQuery } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";
import { createUseMutationHook } from "~/utils";
import { getPairQueryOptions, vote } from "~/utils/match";
import { galaEvent, outfit } from "~/db/schema";

type GalaEvent = typeof galaEvent.$inferSelect;
type Outfit = typeof outfit.$inferSelect;

interface OutfitCardProps {
  outfit: Outfit;
  onVote: () => void;
}

const OutfitCard = ({ outfit, onVote }: OutfitCardProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center ring-1 ring-white hover:ring-amber-500 transition-all duration-300 rounded overflow-hidden pb-4 ">
      <div
        className="h-full w-full"
        dangerouslySetInnerHTML={{
          __html: outfit.imageUrl,
        }}
      />
      <button
        className="bg-white text-black px-4 py-0.5 rounded-sm text-sm font-medium"
        onClick={onVote}
      >
        VOTE
      </button>
    </div>
  );
};

export const Vote = ({ galaEvent }: { galaEvent: GalaEvent }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(getPairQueryOptions(galaEvent.id));
  const useVote = createUseMutationHook(vote);
  const { mutate, isPending: isVoting } = useVote({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getPairQueryOptions(galaEvent.id).queryKey,
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length < 2) {
    // Ensure data has at least two elements
    return <div>No data or not enough data</div>;
  }

  const handleVote = (winnerId: number, loserId: number) => {
    mutate({
      data: {
        winnerOutfitId: winnerId,
        loserOutfitId: loserId,
      },
    });
  };

  return (
    <div className="bg-black h-[100svh] w-full py-8 mx-auto max-w-screen-md">
      <h3 className="text-center text-white text-2xl italic font-light">
        {galaEvent.theme}
      </h3>

      <div className="flex flex-col gap-4 justify-center flex-1 h-full">
        <p className="text-center text-white">
          Select your favorite Met Gala look
        </p>
        {isVoting && <div className="text-center text-white">Voting...</div>}{" "}
        {/* Optional: Add loading indicator */}
        <div className="grid grid-cols-2 gap-2 w-full px-2">
          <OutfitCard
            outfit={data[0]}
            onVote={() => handleVote(data[0].id, data[1].id)}
          />
          <OutfitCard
            outfit={data[1]}
            onVote={() => handleVote(data[1].id, data[0].id)}
          />
        </div>
        <p className="text-center text-white mt-8">Leaderboard</p>
      </div>
    </div>
  );
};
