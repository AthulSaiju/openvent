// app/events/page.tsx
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function EventsPage() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  // fetch tier from Clerk user metadata client-side or server-side as needed
  // then render your tier-filtered events…
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <h1>EVENTS</h1>
    </section>
  );
}
