import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DESTINATIONS, PROVINCES } from '../data/destinations.js';

const slugify = value => value.toLowerCase().replace(/\s+/g, '-');

function DestinationTile({ destination, onSelect }) {
  const activateWithKeyboard = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(destination);
    }
  };

  return <article onClick={() => onSelect(destination)} onKeyDown={activateWithKeyboard} tabIndex={0} role="button" aria-label={`View ${destination.name}, ${destination.province}`} className="group min-w-0 cursor-pointer">
    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800">
      <img src={`${import.meta.env.BASE_URL}${destination.image}`} alt={`${destination.name}, ${destination.province}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
    </div>
    <p className="mt-3 text-xs uppercase tracking-wider text-forest dark:text-emerald-400 sm:mt-4">{destination.type} · {destination.province}</p>
    {destination.volcanoStatus && <span className="mt-2 inline-flex rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-700 dark:border-stone-600 dark:text-stone-300">{destination.volcanoStatus}</span>}
    <h3 className="mt-1 font-semibold font-serif text-xl">{destination.name}</h3>
    <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{destination.description}</p>
  </article>;
}

export function PeaksPage({ onSelectDestination }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(DESTINATIONS.map(destination => destination.type))];
  const filteredDestinations = DESTINATIONS.filter(destination =>
    (category === 'All' || destination.type === category)
    && [destination.name, destination.province, destination.type, destination.description]
      .join(' ').toLowerCase().includes(search.trim().toLowerCase())
  );

  return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
    <h1 className="font-semibold font-serif text-3xl sm:text-4xl md:text-5xl">Explore Bicol Peaks.</h1>
    <div className="mt-10 flex flex-col gap-5">
      <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search by name, province, or type…" aria-label="Search destinations" className="w-full max-w-md rounded-full border border-stone-300 bg-transparent px-5 py-3 text-sm outline-none focus:border-forest dark:border-stone-700" />
      <div className="flex flex-wrap gap-2" aria-label="Filter by destination type">
        {categories.map(item => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full border px-4 py-1.5 text-sm transition ${category === item ? 'border-forest bg-forest text-white' : 'border-stone-300 hover:border-forest dark:border-stone-700'}`}>{item}</button>)}
      </div>
    </div>
    <p className="sr-only" role="status" aria-live="polite">Showing {filteredDestinations.length} of {DESTINATIONS.length} destinations.</p>
    {filteredDestinations.length
      ? <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">{filteredDestinations.map(destination => <DestinationTile key={destination.id} destination={destination} onSelect={onSelectDestination} />)}</div>
      : <p className="mt-12 text-stone-500">No destinations match your search.</p>}
  </main>;
}

export function ProvincesPage({ onSelectDestination }) {
  return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
    <h1 className="font-semibold font-serif text-3xl sm:text-4xl md:text-5xl">Explore Bicol by Province.</h1>
    <p className="mt-6 max-w-xl text-stone-600 dark:text-stone-400">Destinations grouped by the province they are in.</p>
    <div className="mt-12">
      {PROVINCES.map(province => {
        const destinations = DESTINATIONS.filter(destination => destination.regionCode === province);
        return <section key={province} id={slugify(province)} className="scroll-mt-24 border-t border-stone-200 py-10 sm:py-12 dark:border-stone-800">
          <h2 className="font-semibold font-serif text-2xl">{province}</h2>
          {destinations.length
            ? <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">{destinations.map(destination => <DestinationTile key={destination.id} destination={destination} onSelect={onSelectDestination} />)}</div>
            : <p className="mt-4 text-sm text-stone-500">No destinations listed yet.</p>}
        </section>;
      })}
    </div>
  </main>;
}

const faqs = [
  ['What does this site cover?', 'Mountains, volcanoes, and natural attractions in the Bicol Region.'],
  ['How do I find a destination?', 'Use the search box and category filters on the Peaks page, or browse by province on the Regions page.'],
  ['Can I book trips here?', 'No. Bicol Peaks is an informational guide and does not handle bookings.'],
  ['Should I check conditions before visiting?', 'Yes. Access to mountains and volcanoes can change, so confirm with local authorities before you go.']
];

export function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const submitContactForm = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const nextErrors = {
      name: values.get('name').trim() ? '' : 'Please enter your name.',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.get('email').trim()) ? '' : 'Please enter a valid email address.',
      message: values.get('message').trim().length >= 10 ? '' : 'Message must be at least 10 characters.'
    };
    setErrors(nextErrors);
    const valid = Object.values(nextErrors).every(error => !error);
    setSubmitted(valid);
    if (valid) form.reset();
  };

  return <main className="mx-auto max-w-3xl px-4 py-12 sm:px-5 sm:py-16">
    <h1 className="font-semibold font-serif text-3xl sm:text-4xl md:text-5xl">About Bicol Peaks.</h1>
    <p className="mt-8 text-lg text-stone-600 dark:text-stone-400">Bicol Peaks is a destination guide created to help visitors discover mountains, volcanoes, and natural attractions across the Bicol Region.</p>

    <section className="mt-16">
      <h2 className="font-semibold font-serif text-xl sm:text-2xl">Frequently Asked Questions</h2>
      <div className="mt-6 divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
        {faqs.map(([question, answer], index) => <div key={question}>
          <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between py-5 text-left font-medium">{question}<span>{openFaq === index ? '−' : '+'}</span></button>
          {openFaq === index && <p className="pb-5 text-sm text-stone-600 dark:text-stone-400">{answer}</p>}
        </div>)}
      </div>
    </section>

    <section className="mt-16">
      <h2 className="font-semibold font-serif text-xl sm:text-2xl">Contact Us</h2>
      <form noValidate onSubmit={submitContactForm} className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium" htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" onChange={() => setSubmitted(false)} className="mt-1 w-full rounded-md border border-stone-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-forest dark:border-stone-700" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" onChange={() => setSubmitted(false)} className="mt-1 w-full rounded-md border border-stone-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-forest dark:border-stone-700" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="4" onChange={() => setSubmitted(false)} className="mt-1 w-full rounded-md border border-stone-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-forest dark:border-stone-700" />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
        </div>
        <button type="submit" className="rounded-full bg-forest px-7 py-3 text-sm font-medium text-white hover:opacity-90">Send message</button>
        {submitted && <p role="status" className="text-sm text-forest dark:text-emerald-400">Thank you. Your message was validated successfully.</p>}
      </form>
    </section>
  </main>;
}

export function DestinationDialog({ destination, onClose }) {
  const closeButton = useRef(null);

  useLayoutEffect(() => {
    const previousFocus = document.activeElement;
    const scrollPosition = window.scrollY;
    closeButton.current?.focus({ preventScroll: true });
    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
      window.scrollTo(0, scrollPosition);
    };
  }, [onClose]);

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5" role="dialog" aria-modal="true" aria-labelledby="destination-dialog-title" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="max-h-full w-full max-w-lg overflow-auto rounded-lg bg-paper dark:bg-[#1e2120]">
      <img src={`${import.meta.env.BASE_URL}${destination.image}`} alt={`${destination.name}, ${destination.province}`} className="aspect-[4/3] w-full bg-stone-200 object-cover dark:bg-stone-800" />
      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-forest dark:text-emerald-400">{destination.type}</p>
        <h2 id="destination-dialog-title" className="mt-1 font-semibold font-serif text-2xl">{destination.name}</h2>
        <Detail label="Province" value={destination.province} />
        <Detail label="Specific Location" value={destination.location || 'Location details not verified.'} />
        <Detail label="Volcano Classification" value={destination.volcanoStatus || 'Not classified as a volcano'} />
        <Detail label="Overview" value={destination.description} />
        <Detail label="Geological Origin and History" value={destination.originHistory || 'A detailed historical and geological account was not confirmed.'} />
        <Detail label="Origin of the Name" value={destination.nameOrigin || 'The origin of this name was not confirmed in reliable published sources.'} />
        {destination.elevation && <Detail label="Elevation" value={destination.elevation} />}
        <button ref={closeButton} type="button" onClick={onClose} className="mt-6 rounded-full border border-stone-300 px-5 py-2 text-sm dark:border-stone-700">Close</button>
      </div>
    </div>
  </div>;
}

function Detail({ label, value }) {
  return <div className="mt-4">
    <p className="text-xs font-medium uppercase tracking-wider text-stone-500">{label}</p>
    <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{value}</p>
  </div>;
}
