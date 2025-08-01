import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import Section from "@/components/Section";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export const runtime = "edge";

type Tier = 'free' | 'silver' | 'gold' | 'platinum';

type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: Tier;
};

const tierRanks: Record<Tier, number> = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
};

export default async function EventsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userTier = (user.publicMetadata?.tier as Tier) ?? 'free'; // fallback to free

  const supabase = createSupabaseClient();
 
const { data, error }: PostgrestSingleResponse<Event[]> = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error || !data) {
    console.error("Supabase error:", error);
    return (
      <section className="p-8">
        <p className="text-red-600">Failed to load events.</p>
      </section>
    );
  }

  const userRank = tierRanks[userTier];

  // Filter and group events by tier
  const allTiers: Tier[] = ['free', 'silver', 'gold', 'platinum'];

  const grouped = allTiers.map((tier) => {
    const rank = tierRanks[tier];
    const visible = rank <= userRank;
    const events = data.filter((e) => e.tier === tier);
    return { tier, events, visible };
  });

  return (
    <main className="p-8 space-y-12">
      {grouped.map(({ tier, events, visible }) => (
        <Section
          key={tier}
          tier={tier}
          events={visible ? events : []}
          locked={!visible}
        />
      ))}
    </main>
  );
}
