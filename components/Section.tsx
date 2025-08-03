// components/Section.tsx
'use client';

import React from 'react';
import TierUpgradeButton from './TierUpgradeButton'; // Import the new button

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: string;
};

interface SectionProps {
  tier: string;
  events: Event[];
  locked?: boolean;
}

export default function Section({ tier, events = [], locked = false }: SectionProps) {
  return (
    <section className="mb-12 bg-red-500">
      <div className="flex items-center justify-between mb-4 bg-blue-500">
        <h2 className="text-2xl font-bold">{tier.toUpperCase()}</h2>
        
        {/* Add upgrade button in locked sections */}
        {locked && <TierUpgradeButton upgradeTier={tier} />}
      </div>

      {locked ? (
        <div className="p-6 bg-gray-100 text-center rounded-md text-gray-600 border border-dashed">
          🔒 Upgrade to <strong>{tier}</strong> to access these events.
        </div>
      ) : events.length === 0 ? (
        <p className="text-gray-500 italic">No events in this tier.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e) => (
            <article
              key={e.id}
              className="bg-white border rounded-lg overflow-hidden shadow p-4"
            >
              <img
                src={e.image_url}
                alt={e.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{e.title}</h3>
              <time className="block text-sm text-gray-500 mb-2">
                {new Date(e.event_date).toLocaleDateString()}
              </time>
              <p className="text-gray-700">{e.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}