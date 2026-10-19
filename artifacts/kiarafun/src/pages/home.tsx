import { useEffect } from 'react';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Sequence } from '@/components/sequence';
import { Launchpad } from '@/components/launchpad';
import { Why } from '@/components/why';
import { Faq } from '@/components/faq';
import { Closing } from '@/components/closing';
import { Footer } from '@/components/footer';
import { ScrollTrigger, startSmoothScroll } from '@/lib/motion';

export default function Home() {
  useEffect(() => {
    const stop = startSmoothScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    const imgs = Array.from(document.images).filter((i) => !i.complete);
    imgs.forEach((i) => i.addEventListener('load', refresh));
    return () => {
      window.removeEventListener('load', refresh);
      imgs.forEach((i) => i.removeEventListener('load', refresh));
      stop();
    };
  }, []);

  return (
    <>
      <a href="#launch-model" onClick={(e) => { e.preventDefault(); document.getElementById('launch-model')?.scrollIntoView(); }} className="sr-only z-[60] rounded-full bg-k-navy px-4 py-2 text-k-cloud focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Sequence />
        <Launchpad />
        <Why />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
