import React from 'react';
export default function Footer() {
  return <footer className="border-t border-stone-200 dark:border-stone-800">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-5 sm:py-12 md:grid-cols-2">
      <div><p className="font-semibold font-serif text-2xl">Bicol Peaks</p><p className="mt-3 max-w-sm text-sm text-stone-600 dark:text-stone-400">A destination guide to the mountains, volcanoes, and natural attractions of the Bicol Region, Philippines.</p></div>
      <nav className="flex flex-wrap items-center gap-6 text-sm md:justify-end"><a href="#/">Home</a><a href="#/peaks">Peaks</a><a href="#/provinces">Regions</a><a href="#/about">About</a></nav>
    </div>
    <p className="border-t border-stone-200 py-5 text-center text-xs text-stone-500 dark:border-stone-800">© 2026 Bicol Peaks. All rights reserved.</p>
  </footer>;
}
