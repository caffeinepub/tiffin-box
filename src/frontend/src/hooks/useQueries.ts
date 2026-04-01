import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderDTO } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<OrderDTO[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useDeleteOrder() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteOrder(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useMarkDelivered() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.markOrderAsDelivered(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}
