import React from 'react';

const badgeLabels = {
  'Volcanic classification not confirmed': 'Classification unconfirmed',
  'Potentially active — confirm with PHIVOLCS': 'Potentially active',
  'Associated with Bulusan; no separate volcano status': 'Bulusan-associated feature',
  'Bulusan volcanic dome; no separate alert status': 'Volcanic dome',
  'Bulusan volcanic feature; no separate alert status': 'Volcanic feature'
};

export default function StatusBadge({ status }) {
  return <span
    title={status}
    aria-label={`Volcano status: ${status}`}
    className="mt-2 inline-flex max-w-full rounded-full border border-stone-300 px-3 py-1 text-[11px] font-semibold uppercase leading-snug tracking-wide text-stone-700 dark:border-stone-600 dark:text-stone-300"
  >
    {badgeLabels[status] || status}
  </span>;
}
