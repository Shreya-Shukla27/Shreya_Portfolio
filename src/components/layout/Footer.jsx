import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUp, FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const MotionA = motion.a;
const MotionButton = motion.button;
const MotionFooter = motion.footer;

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Shreya-Shukla27',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shreya-shukla27/',
    icon: FaLinkedinIn,
  },
  {
    label: 'Email',
    href: 'mailto:shreyashukla11c@gmail.com',
    icon: FaEnvelope,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 360);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionFooter
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden border-0 text-left"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,20,0.42),rgba(8,6,15,0.86))]" />
      <div className="pointer-events-none absolute -left-[12%] bottom-[-160px] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(217,102,245,0.2),transparent_68%)] blur-[30px]" />
      <div className="pointer-events-none absolute -right-[10%] top-[-140px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(245,102,184,0.18),transparent_70%)] blur-[34px]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60 bg-[linear-gradient(to_right,transparent,var(--accent),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[18px] w-[min(900px,82%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(217,102,245,0.24),transparent_72%)] blur-[8px]" />

      <div className="relative w-full px-[52px] pb-[26px] pt-[14px] max-[960px]:px-[24px] max-[960px]:pb-[20px]">
        <div className="relative mx-auto max-w-[1200px] rounded-[18px] border border-solid border-[rgba(217,102,245,0.16)] bg-[linear-gradient(145deg,rgba(20,12,32,0.62),rgba(10,8,20,0.52))] backdrop-blur-[16px] px-[18px] py-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_24px_rgba(0,0,0,0.28)] max-[960px]:px-[14px] max-[960px]:py-[12px]">
          <div className="flex items-center justify-between gap-[14px] max-[960px]:flex-col max-[960px]:items-start max-[960px]:gap-[12px]">
            <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.05em] text-[var(--muted)]">
              © {year} Shreya Shukla - Built with <span className="text-[var(--accent2)]">love</span>
            </span>

            <div className="flex items-center gap-[10px]">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                const external = social.href.startsWith('http');
                return (
                  <MotionA
                    key={social.label}
                    href={social.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-none w-[38px] h-[38px] rounded-full border border-solid border-[rgba(217,102,245,0.24)] bg-[rgba(255,255,255,0.03)] text-[var(--muted)] inline-flex items-center justify-center no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[var(--accent)] hover:border-[rgba(217,102,245,0.58)] hover:shadow-[0_0_0_3px_rgba(217,102,245,0.16),0_0_12px_rgba(217,102,245,0.6)]"
                  >
                    <Icon size={15} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  </MotionA>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <MotionButton
            type="button"
            aria-label="Scroll to top"
            onClick={handleScrollTop}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: [1, 1.04, 1] }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{
              opacity: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 2.2, ease: 'easeInOut', repeat: Infinity },
            }}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="fixed bottom-[22px] right-[22px] z-[70] cursor-none w-[46px] h-[46px] rounded-full border border-solid border-[rgba(217,102,245,0.34)] bg-[linear-gradient(145deg,rgba(26,15,41,0.86),rgba(16,10,28,0.82))] backdrop-blur-[14px] text-[var(--accent2)] inline-flex items-center justify-center shadow-[0_10px_28px_rgba(0,0,0,0.35),0_0_0_2px_rgba(217,102,245,0.08)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(245,102,184,0.58)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.38),0_0_24px_rgba(245,102,184,0.42)]"
          >
            <FaArrowUp size={14} />
          </MotionButton>
        )}
      </AnimatePresence>
    </MotionFooter>
  );
}
