import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SubVime — Break complex tasks into simple subsets" },
    ],
  }),
  component: Landing,
});
