import { useQuery } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";
import { createUseMutationHook } from "~/utils";
import { getPairQueryOptions, vote } from "~/utils/match";
import { galaEvent } from "~/db/schema";

type GalaEvent = typeof galaEvent.$inferSelect;

export const Vote = ({ galaEvent }: { galaEvent: GalaEvent }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(getPairQueryOptions(galaEvent.id));
  const useVote = createUseMutationHook(vote);
  const { mutate, isPending: isVoting } = useVote({
    onSuccess: () => {
      queryClient.invalidateQueries(getPairQueryOptions(galaEvent.id));
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="bg-black h-[100svh] w-full py-8">
      <h3 className="text-center text-white text-2xl italic font-light">
        {galaEvent.theme}
      </h3>
      <p className="text-center text-white text-lg">
        Select your favorite Met Gala look
      </p>

      <div className="grid grid-cols-2 gap-4 h-64 w-full bg-blue-300">
        <div className="h-full w-full bg-green-300">
          <div
            className="h-full w-full"
            dangerouslySetInnerHTML={{
              __html: data[0].imageUrl,
            }}
          />
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: data[1].imageUrl,
            }}
          />
        </div>
      </div>
    </div>
  );
};
