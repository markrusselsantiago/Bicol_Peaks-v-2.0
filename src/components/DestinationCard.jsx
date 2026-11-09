import React from 'react';
import StatusBadge from './StatusBadge.jsx';

export default function DestinationCard({ destination }) {
  return <a href="#/peaks" aria-label={`Explore ${destination.name} on the Peaks page`} className="group block min-w-0">
    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800">
      <img src={`${import.meta.env.BASE_URL}${destination.image}`} alt={`${destination.name}, ${destination.province}`} loading="lazy" onError={e=>{e.currentTarget.style.display='none';}} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
    </div>
    <p className="mt-3 text-xs uppercase tracking-wider text-forest dark:text-emerald-400 sm:mt-4">{destination.type} · {destination.province}</p>
    {destination.volcanoStatus && <StatusBadge status={destination.volcanoStatus} />}
    <h3 className="mt-1 font-semibold font-serif text-xl">{destination.name}</h3>
    <p className="mt-2 text-justify text-sm leading-relaxed text-stone-600 dark:text-stone-400">{destination.description}</p>
  </a>;
}
