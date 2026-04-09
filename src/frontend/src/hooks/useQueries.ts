import { useMutation, useQuery } from "@tanstack/react-query";
import type { PersonalityType } from "../data/companions";

// Stub actor hook — backend bindings not yet generated
function useActor() {
  return { actor: null as null, isFetching: false };
}

export function useGetProfile(username: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      if (!actor || !username) return null;
      return null;
    },
    enabled: !!actor && !isFetching && !!username,
  });
}

export function useGetHistory() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateCompanion() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (_args: {
      name: string;
      personality: PersonalityType;
    }) => {
      if (!actor) return;
    },
  });
}

export function useAddMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (_args: { role: string; text: string }) => {
      if (!actor) return;
    },
  });
}

export function useUpdateXP() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (_args: { xp: number }) => {
      if (!actor) return;
    },
  });
}

export function useAwardBadge() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (_badgeId: string) => {
      if (!actor) return;
    },
  });
}
