import React from 'react';

export default function Header({ page: activePage, dark, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu }) {
  const links = [['Home','#/','home'],['Peaks','#/peaks','peaks'],['Provinces','#/provinces','provinces'],['About','#/about','about']];
  return <header className="sticky top-0 z-40 border-b border-stone-200 bg-paper dark:border-stone-800 dark:bg-[#161817]">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-5">
      <a href="#/" className="whitespace-nowrap font-semibold font-serif text-xl sm:text-2xl">Bicol Peaks</a>
      <nav className="hidden items-center gap-7 text-base font-medium lg:flex">
        {links.map(([label, url, targetPage]) => <a key={label} href={url} aria-current={targetPage === activePage ? 'page' : undefined} className={targetPage === activePage ? 'text-forest dark:text-emerald-300' : ''}>{label}</a>)}
      </nav>
      <div className="flex items-center gap-3">
        <button onClick={onToggleTheme} aria-label="Toggle light/dark theme" className="whitespace-nowrap rounded-full border border-stone-300 px-2 py-1 text-sm sm:px-3 dark:border-stone-700">◐ {dark?'Light':'Theme'}</button>
        <button onClick={onToggleMenu} type="button" aria-label={menuOpen?'Close navigation menu':'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobileNav" className="rounded-md border border-stone-300 p-2 lg:hidden dark:border-stone-700">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    {menuOpen && <nav id="mobileNav" className="absolute right-4 top-full z-50 flex w-56 flex-col gap-1 rounded-lg border border-stone-200 bg-paper p-3 text-base font-medium shadow-lg dark:border-stone-700 dark:bg-[#1e2120] sm:right-5 lg:hidden">
      {links.map(([label, url, targetPage]) => <a key={label} onClick={onCloseMenu} href={url} aria-current={targetPage === activePage ? 'page' : undefined} className="rounded px-2 py-2 hover:bg-stone-100 dark:hover:bg-stone-800">{label}</a>)}
    </nav>}
  </header>;
}
