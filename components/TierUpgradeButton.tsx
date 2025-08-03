'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

const TierColors = {
  free: 'bg-gray-200 text-gray-800',
  silver: 'bg-gray-400 text-white',
  gold: 'bg-yellow-500 text-white',
  platinum: 'bg-purple-600 text-white',
};

const TierNames = {
  free: 'Free',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
};

export default function TierUpgradeButton({ 
  currentTier,
  availableUpgrades,
  upgradeTier
}: { 
  currentTier?: string; 
  availableUpgrades?: string[]; 
  upgradeTier?: string;
}) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  // Safely determine available upgrades
  const upgrades = upgradeTier 
    ? [upgradeTier] 
    : availableUpgrades || [];
  
  // Check if upgrades are available
  const hasUpgrades = upgrades.length > 0;

  const handleUpgrade = async (newTier: string) => {
    if (!user) return;
    
    try {
      setIsUpgrading(true);
      await user.update({
        unsafeMetadata: { 
          tier: newTier 
        }
      });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Tier upgrade failed:', error);
      alert('Upgrade failed. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  // Don't render if no upgrades available (for top-level button)
  if (!upgradeTier && !hasUpgrades) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          upgradeTier 
            ? 'bg-gray-800 text-white hover:bg-gray-900 text-sm'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {upgradeTier ? `Unlock ${upgradeTier}` : 'Upgrade Account'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {upgradeTier ? `Unlock ${upgradeTier} Tier` : 'Upgrade Your Tier'}
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {currentTier && (
              <p className="text-gray-600 mb-6">
                Current tier: 
                <span className={`ml-2 px-3 py-1 rounded-full text-sm ${TierColors[currentTier as keyof typeof TierColors]}`}>
                  {TierNames[currentTier as keyof typeof TierNames]}
                </span>
              </p>
            )}
            
            {hasUpgrades ? (
              <div className="space-y-4">
                {upgrades.map(tier => (
                  <div 
                    key={tier}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className={`mr-3 w-8 h-8 rounded-full flex items-center justify-center ${TierColors[tier as keyof typeof TierColors]}`}>
                        {tier.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <h4 className="font-semibold">{TierNames[tier as keyof typeof TierNames]}</h4>
                        <p className="text-sm text-gray-500">
                          {upgradeTier 
                            ? `Access all ${tier}-level events` 
                            : `Unlocks ${tier}-level events`}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleUpgrade(tier)}
                      disabled={isUpgrading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {isUpgrading ? 'Upgrading...' : upgradeTier ? 'Unlock' : 'Upgrade'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center bg-yellow-50 rounded-lg">
                <p className="text-yellow-700">
                  You&apos;ve reached the highest tier! No upgrades available.
                </p>
              </div>
            )}
            
            <div className="mt-6 text-center text-sm text-gray-500">
              This is a simulation. No real payment required.
            </div>
          </div>
        </div>
      )}
    </>
  );
}