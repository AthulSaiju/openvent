'use client';

import React from 'react';
import TierUpgradeButton from './TierUpgradeButton';

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  country?: string;
  price?: number;
  tier: string;
};

interface SectionProps {
  tier: string;
  events: Event[];
  locked?: boolean;
}

export default function Section({ tier, events = [], locked = false }: SectionProps) {
  return (
    <section className="mb-12 lg:px-[10%]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{tier.toUpperCase()}</h2>
        {locked && <TierUpgradeButton upgradeTier={tier} />}
      </div>

      {locked ? (
        <div className="p-6 bg-gray-100 text-center rounded-lg text-gray-600 border border-dashed">
          🔒 Upgrade to <strong>{tier}</strong> to access these events.
        </div>
      ) : events.length === 0 ? (
        <p className="text-gray-500 italic">No events in this tier.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((e) => {
            const date = new Date(e.event_date);
            const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const day = date.getDate();

            return (
              <article
                key={e.id}
                className="bg-[#ffffff] rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="h-48 w-full relative">
                  <img
                    src={e.image_url}
                    alt={e.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center px-4 py-6 border-r border-gray-200">
                    <span className="text-sm text-gray-500">{month}</span>
                    <span className="text-3xl font-bold leading-none">{day}</span>
                  </div>

                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      
                      

                    
                      <h3 className="text-lg font-semibold mb-1">{e.title}</h3>

                      
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {e.description}
                      </p>
                    </div>

                    
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
