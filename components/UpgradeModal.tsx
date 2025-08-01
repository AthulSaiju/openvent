'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const tiers = ['free', 'silver', 'gold', 'platinum'] as const;

export default function UpgradeModal() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const currentTier = user?.publicMetadata?.tier ?? 'free';

  const handleUpgrade = async (newTier: string) => {
  if (!user) return;

  await user.updateMetadata({
    publicMetadata: {
      tier: newTier,
    },
  });

  setOpen(false);
  router.refresh(); // reloads the server-rendered events page
};


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upgrade Plan
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Choose your plan</h2>
            <div className="space-y-3">
              {tiers.map((tier) => (
                <div
                  key={tier}
                  className={`p-4 border rounded flex justify-between items-center ${
                    tier === currentTier ? 'bg-gray-100' : ''
                  }`}
                >
                  <span className="capitalize font-medium">{tier}</span>
                  {tier === currentTier ? (
                    <span className="text-sm text-green-600 font-semibold">Current</span>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(tier)}
                      className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-sm text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
