import { useEffect } from 'react';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Story } from '@/components/story';
import { Features } from '@/components/features';
import { Journey } from '@/components/journey';
import { MeetKiara } from '@/components/meet-kiara';
import { Faq } from '@/components/faq';
import { FinalCta } from '@/components/final-cta';
import { Footer } from '@/components/footer';
import { gsap, ScrollTrigger, startSmoothScroll } from '@/lib/motion';

export default function Home() {
  useEffect(() => {
    const stop = startSmoothScroll();
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('.page-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    const imgs = Array.from(document.images).filter((i) => !i.complete);
    imgs.forEach((i) => i.addEventListener('load', refresh));
    return () => {
      window.removeEventListener('load', refresh);
      imgs.forEach((i) => i.removeEventListener('load', refresh));
      mm.revert();
      stop();
    };
  }, []);

  return (
    <>
      <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView(); }} className="sr-only z-[60] rounded-full bg-k-navy px-4 py-2 text-k-cloud focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <div aria-hidden="true" className="page-progress fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-k-ribbon" style={{ transform: 'scaleX(0)' }} />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Features />
        <Journey />
        <MeetKiara />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
