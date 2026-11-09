import React, { useEffect, useState } from 'react';

const slides = [
  {src:'images/mayon-volcano.jpg',alt:'Mayon Volcano, Albay'},
  {src:'images/mount-isarog.jpg',alt:'Mount Isarog, Camarines Sur'},
  {src:'images/bulusan-volcano.jpg',alt:'Mount Bulusan, Sorsogon'},
  {src:'images/mount-malinao.webp',alt:'Mount Malinao, Albay'}
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  const move = direction => setActive(current => (current + direction + slides.length) % slides.length);
  return <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-300 dark:bg-stone-800 sm:aspect-[16/9] lg:aspect-[4/3]">
    {slides.map((slide,index)=><img key={slide.src} src={`${import.meta.env.BASE_URL}${slide.src}`} alt={slide.alt} onError={e=>{e.currentTarget.style.display='none';}} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index===active?'opacity-100':'opacity-0'}`} />)}
    <p className="absolute bottom-4 left-4 rounded bg-black/50 px-3 py-1 text-xs text-white">{slides[active].alt}</p>
    <div className="absolute bottom-4 right-4 flex gap-2">
      <button onClick={()=>move(-1)} aria-label="Previous slide" className="rounded-full bg-white/90 px-3 py-1 text-sm text-ink">←</button>
      <button onClick={()=>move(1)} aria-label="Next slide" className="rounded-full bg-white/90 px-3 py-1 text-sm text-ink">→</button>
    </div>
  </div>;
}
