import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// Generic factory function to create a mutation hook
export function createUseMutationHook<T extends (params: any) => Promise<any>>(
  fn: T
) {
  return function useCustomMutation(
    options?: UseMutationOptions<
      Awaited<ReturnType<T>>,
      Error,
      Parameters<T>[0]
    >
  ) {
    return useMutation({
      ...options,
      mutationFn: async (params: Parameters<T>[0]) => await fn(params),
    });
  };
}
