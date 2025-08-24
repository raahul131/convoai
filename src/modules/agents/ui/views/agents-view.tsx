"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/laoding-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title={"Loading Agents"}
      description={"This may take some seconds"}
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title={"Error loading agents"}
      description={"Something went wrong"}
    />
  );
};
