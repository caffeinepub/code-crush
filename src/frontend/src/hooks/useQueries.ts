import { useMutation, useQuery } from "@tanstack/react-query";
import { Personality } from "../backend";
import type { PersonalityType } from "../data/companions";
import { useActor } from "./useActor";

const toBackendPersonality = (p: PersonalityType): Personality => {
  const map: Partial<Record<PersonalityType, Personality>> = {
    encouraging: Personality.encouraging,
    witty: Personality.witty,
    calm: Personality.calm,
    playful: Personality.playful,
  };
  return map[p] ?? Personality.encouraging;
};

export function useGetProfile(username: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      if (!actor || !username) return null;
      return actor.getOrCreateProfile(username);
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
      return actor.getHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateCompanion() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      personality,
    }: { name: string; personality: PersonalityType }) => {
      if (!actor) return;
      await actor.updateCompanion(name, toBackendPersonality(personality));
    },
  });
}

export function useAddMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ role, text }: { role: string; text: string }) => {
      if (!actor) return;
      await actor.addMessage(role, text);
    },
  });
}

export function useUpdateXP() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (_args: { xp: number }) => {
      if (!actor) return;
      await actor.getAllStats();
    },
  });
}

export function useAwardBadge() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (badgeId: string) => {
      if (!actor) return;
      await actor.awardBadge(badgeId);
    },
  });
}
