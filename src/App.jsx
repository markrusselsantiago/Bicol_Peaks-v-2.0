import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import HeroCarousel from './components/HeroCarousel.jsx';
import DestinationCard from './components/DestinationCard.jsx';
import Footer from './components/Footer.jsx';
import { AboutPage, PeaksPage, ProvincesPage, DestinationDialog } from './components/Pages.jsx';
import { PROVINCES, DESTINATIONS } from './data/destinations.js';

const getRoute = () => window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState(getRoute);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const previousRoute = useRef(route);
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute());
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  useEffect(() => {
    if (previousRoute.current !== route) {
      setMenuOpen(false);
      setSelectedDestination(null);
      previousRoute.current = route;
    }

    if (route.startsWith('provinces/')) {
      const province = route.slice('provinces/'.length);
      window.setTimeout(() => document.getElementById(province)?.scrollIntoView(), 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [route]);

  useEffect(() => {
    const closeOnEscape = event => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const featured = [1, 7, 6].map(id => DESTINATIONS.find(item => item.id === id)).filter(Boolean);
  const activePage = route.split('/')[0] || 'home';
  const closeDestinationDialog = useCallback(() => setSelectedDestination(null), []);

  return <>
    <Header page={activePage} dark={dark} onToggleTheme={() => setDark(value => !value)} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(value => !value)} onCloseMenu={() => setMenuOpen(false)} />
    {activePage === 'peaks' ? <PeaksPage onSelectDestination={setSelectedDestination} /> :
      activePage === 'provinces' ? <ProvincesPage onSelectDestination={setSelectedDestination} /> :
      activePage === 'about' ? <AboutPage /> :
      <main className="mx-auto max-w-6xl px-4 sm:px-5">
      <section className="grid items-center gap-8 pt-10 sm:gap-12 sm:pt-16 md:pt-24 lg:grid-cols-2">
        <div>
          <h1 className="max-w-3xl font-semibold font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">Discover the Peaks of Bicol.</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:mt-6 sm:text-lg">Explore Bicol's remarkable volcanoes, mountains, and natural landscapes.</p>
          <a href="#/peaks" className="mt-7 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:mt-8 sm:px-7">Explore Peaks</a>
        </div>
        <HeroCarousel />
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <h2 className="font-semibold font-serif text-2xl md:text-3xl">Featured Destinations</h2>
        <div className="mt-7 grid gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(destination => <DestinationCard key={destination.id} destination={destination} />)}
        </div>
      </section>

      <section className="border-t border-stone-200 py-14 dark:border-stone-800 sm:py-16 lg:py-20">
        <h2 className="font-semibold font-serif text-2xl md:text-3xl">Explore by Province</h2>
        <div className="mt-7 grid gap-x-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {PROVINCES.map(province => <a key={province} href={`#/provinces/${province.toLowerCase().replace(/\s+/g,'-')}`} className="block border-b border-stone-200 py-3.5 font-semibold font-serif text-lg transition hover:text-forest sm:py-4 dark:border-stone-800 dark:hover:text-emerald-400">{province} →</a>)}
        </div>
      </section>
      </main>}
    <Footer />
    {selectedDestination && <DestinationDialog destination={selectedDestination} onClose={closeDestinationDialog} />}
  </>;
}