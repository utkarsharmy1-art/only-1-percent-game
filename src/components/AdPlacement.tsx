import React from 'react';

type AdSlotFormat = 'leaderboard' | 'rectangle' | 'banner';

interface AdPlacementProps {
  slotId?: string;
  format?: AdSlotFormat;
  className?: string;
}

/**
 * AdPlacement component prepared for future Google AdSense integration.
 * Complies with Google AdSense Policies:
 * - Distinctly labeled "ADVERTISEMENT"
 * - Kept strictly separate from game controls, buttons, and interactive areas
 * - Zero deceptive designs, zero fake ads, zero incentivized clicks
 * - No placeholder publisher IDs until account approval is completed
 */
export const AdPlacement: React.FC<AdPlacementProps> = ({
  format = 'leaderboard',
  className = '',
}) => {
  // Dimension styles per standard IAB formats
  const formatStyles: Record<AdSlotFormat, string> = {
    leaderboard: 'w-full max-w-[728px] min-h-[90px]',
    rectangle: 'w-full max-w-[336px] min-h-[280px]',
    banner: 'w-full max-w-[468px] min-h-[60px]',
  };

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center select-none ${className}`}
      role="complementary"
      aria-label="Advertisement area"
    >
      {/* Required Policy Label: subtle, standard neutral text */}
      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1">
        Advertisement
      </span>

      {/* Container reserved for AdSense code once active */}
      <div
        className={`${formatStyles[format]} rounded-xl border border-dashed border-slate-800/80 bg-dark-900/40 flex flex-col items-center justify-center p-3 text-center transition-colors`}
      >
        {/*
          When Google AdSense is approved, insert the responsive script tag here:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot={slotId || "XXXXXXXXXX"}
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        */}
        <div className="flex flex-col items-center text-slate-600 text-xs font-mono">
          <span className="text-[11px] text-slate-500">Ad Placement Area</span>
          <span className="text-[10px] text-slate-600 mt-0.5">Reserved for verified advertiser content</span>
        </div>
      </div>
    </div>
  );
};
