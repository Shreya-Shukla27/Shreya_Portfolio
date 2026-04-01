import { useEffect, useState } from 'react';
import { useActiveSection, useNavScroll } from '../../hooks';
import { NAV_LINKS } from '../../constants/data';

const RESUME_URL = 'https://drive.google.com/file/d/1SQwoD2hpzPt28w3xHnuvkA-am5L68woB/view?usp=drive_link';

export default function Navbar() {
  const scrolled = useNavScroll();
  const activeHref = useActiveSection(NAV_LINKS, NAV_LINKS[0]?.href || '#about');
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav 
        id="navbar" 
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-300 border-b !border-[rgba(217,102,245,0.08)] !bg-[rgba(13,10,20,0.5)] backdrop-blur-[20px] saturate-[180%] max-[960px]:!flex ${
          scrolled 
            ? '!bg-[rgba(13,10,20,0.9)] backdrop-blur-[24px] !border-[var(--border)] py-[14px] px-[52px] max-[960px]:py-[12px] max-[960px]:px-[24px]' 
            : 'py-[22px] px-[52px] max-[960px]:py-[16px] max-[960px]:px-[24px]'
        }`}
      >
        <a href="#hero" className="group inline-flex flex-col items-start no-underline leading-none">
          <span className="font-['Instrument_Serif',Georgia,serif] text-[22px] italic text-[var(--text)] tracking-[-0.02em] transition-colors duration-200 group-hover:text-white">
            Shreya<span className="text-[var(--accent)]">.</span>
          </span>
          <span className="mt-[3px] text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--accent)] max-[960px]:hidden">
            Ideas / Impact
          </span>
        </a>

        <ul className="flex gap-[36px] list-none max-[960px]:hidden">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a 
                href={l.href}
                className={`text-[12px] font-medium tracking-[0.08em] uppercase no-underline transition-colors duration-200 relative
                  after:content-[''] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1.5px] after:bg-[var(--grad)] after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeHref === l.href
                    ? 'text-[var(--text)] after:w-full'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:after:w-full'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-[12px] items-center max-[960px]:hidden">
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="mag-btn relative inline-flex items-center gap-[8px] border-[1.5px] border-[rgba(217,102,245,0.35)] outline-none cursor-none no-underline transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] text-[12px] font-semibold tracking-[0.06em] uppercase text-[var(--accent)] py-[8px] px-[20px] rounded-full hover:bg-[rgba(217,102,245,0.1)] hover:border-[var(--accent)] hover:-translate-y-[1px]" data-mag>
            <span className="mag-btn-inner relative pointer-events-none">View Resume</span>
          </a>
          
        </div>

        <button
          className={`hidden max-[960px]:flex flex-col gap-[5px] cursor-none p-[4px] bg-transparent border-none z-[200] ${menuOpen ? '*:transition-all *:duration-300 *:ease-[cubic-bezier(0.16,1,0.3,1)]' : ''}`}
          id="hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobileNav"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`block w-[22px] h-[2px] bg-[var(--text)] rounded-[2px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-[var(--text)] rounded-[2px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-[var(--text)] rounded-[2px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile nav */}
      <div 
        className={`fixed inset-0 z-[150] bg-[rgba(13,10,20,0.97)] backdrop-blur-[24px] flex-col items-center justify-center gap-[28px] transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'opacity-100 pointer-events-auto flex' : 'opacity-0 pointer-events-none hidden max-[960px]:flex'}`} 
        id="mobileNav"
      >
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={closeMenu}
            className={`font-['Instrument_Serif',Georgia,serif] text-[34px] font-normal no-underline italic transition-colors duration-200 tracking-[-0.02em] ${
              activeHref === l.href ? 'text-[var(--accent)]' : 'text-[var(--text)] hover:text-[var(--accent)]'
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
