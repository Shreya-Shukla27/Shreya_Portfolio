import { useReveal } from '../hooks';
import Cursor from '../components/ui/Cursor';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import TechStack from '../components/sections/TechStack';
import Experience from '../components/sections/Experience';
import Achievements from '../components/sections/Achievements';
import Publications from '../components/sections/Publications';
import Contact from '../components/sections/Contact';
import { TICKER_ITEMS } from '../constants/data';

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // double for seamless loop
  return (
    <div className="overflow-hidden border-y border-solid border-[var(--border)] py-[13px] px-0 bg-[var(--bg2)]">
      <div className="flex w-max animate-[ticker_24s_linear_infinite] hover:[animation-play-state:paused]">
        <div className="whitespace-nowrap px-[40px] text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--muted)] flex items-center gap-[40px]">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-[40px]">{item}<span className="w-[4px] h-[4px] bg-[var(--accent)] rounded-full shrink-0" /></span>
          ))}
        </div>
        <div className="whitespace-nowrap px-[40px] text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--muted)] flex items-center gap-[40px]" aria-hidden>
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-[40px]">{item}<span className="w-[4px] h-[4px] bg-[var(--accent)] rounded-full shrink-0" /></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useReveal();

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Achievements />
      <Publications />
      <Contact />
      <Footer />
    </>
  );
}
