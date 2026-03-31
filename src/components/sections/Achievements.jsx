import { motion, useReducedMotion } from 'framer-motion';
import { FileBadge2, Medal, Microscope, Trophy } from 'lucide-react';
import { ACHIEVEMENTS } from '../../constants/data';
import {
  ACHIEVEMENTS_GRID_BASE_DELAY,
  ACHIEVEMENTS_GRID_ROW_STEP,
  getLinearRevealDelay,
} from '../../constants/motion';
import { useCardTilt } from '../../hooks';

const EASE = [0.16, 1, 0.3, 1];
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionHeading = motion.h2;
const MotionParagraph = motion.p;
const MotionSpan = motion.span;

const ICON_MAP = {
  trophy: Trophy,
  patent: FileBadge2,
  medal: Medal,
  research: Microscope,
};

function AchievementCard({ achievement, index }) {
  const reduceMotion = useReducedMotion();
  const tiltRef = useCardTilt({ maxTilt: 6.5, perspective: 960, translateZ: 4 });
  const Icon = ICON_MAP[achievement.icon] ?? Trophy;
  const revealDelay = getLinearRevealDelay(index, ACHIEVEMENTS_GRID_BASE_DELAY, ACHIEVEMENTS_GRID_ROW_STEP);
  const shouldFloat = index === 0 || index === 2;
  const cardHoverAnimation = reduceMotion ? { y: -4 } : { y: -7 };
  const enterFromX = reduceMotion ? 0 : index % 2 === 0 ? -28 : 28;
  const cardNumber = String(index + 1).padStart(2, '0');

  return (
    <MotionArticle
      initial={{ opacity: 0, x: enterFromX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      whileHover={cardHoverAnimation}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, delay: revealDelay, ease: EASE }}
      className="group relative"
    >
      <span className="absolute left-[-30px] top-[26px] h-[12px] w-[12px] rounded-full border border-solid border-[rgba(245,102,184,0.48)] bg-[rgba(245,102,184,0.88)] shadow-[0_0_0_4px_rgba(245,102,184,0.12),0_0_16px_rgba(245,102,184,0.44)]" />

      <div
        ref={tiltRef}
        style={{ '--mx': '50%', '--my': '50%' }}
        className="relative h-full overflow-hidden rounded-[24px] border border-solid border-[rgba(255,255,255,0.08)] bg-[linear-gradient(152deg,rgba(18,11,30,0.9),rgba(12,8,22,0.86))] px-[22px] pb-[20px] pt-[18px] backdrop-blur-[14px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_30px_rgba(0,0,0,0.34)] max-[960px]:px-[18px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(to_right,rgba(217,102,245,0),rgba(245,102,184,0.7),rgba(217,102,245,0))]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(245,102,184,0.18), transparent 44%), radial-gradient(240px circle at 12% 8%, rgba(217,102,245,0.14), transparent 58%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-solid border-transparent transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[rgba(245,102,184,0.34)]" />
        <span className="pointer-events-none absolute right-[12px] top-[10px] font-['JetBrains_Mono',monospace] text-[28px] leading-none text-[rgba(217,102,245,0.13)]">
          {cardNumber}
        </span>

        <div className="relative z-[2] flex items-start gap-[14px]">
          <MotionDiv
            animate={shouldFloat && !reduceMotion ? { y: [0, -4, 0] } : undefined}
            transition={shouldFloat && !reduceMotion ? { duration: 4.8 + index, repeat: Infinity, ease: 'easeInOut' } : undefined}
            className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] border border-solid border-[rgba(245,102,184,0.25)] bg-[rgba(245,102,184,0.08)] text-[var(--accent2)] shadow-[0_8px_20px_rgba(217,102,245,0.18)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[rgba(245,102,184,0.48)] group-hover:shadow-[0_0_0_3px_rgba(245,102,184,0.1),0_12px_24px_rgba(217,102,245,0.24)]"
          >
            <Icon size={21} strokeWidth={1.9} />
          </MotionDiv>

          <div className="min-w-0 flex-1">
            <div className="mb-[8px] flex flex-wrap items-center gap-[8px]">
              <span className="inline-flex items-center rounded-full border border-solid border-[rgba(217,102,245,0.2)] bg-[rgba(217,102,245,0.08)] px-[9px] py-[4px] text-[10px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
                {achievement.domain}
              </span>
              <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[var(--muted)]">{achievement.year}</span>
            </div>

            <h3 className="mb-[8px] text-[26px] leading-[1.02] tracking-[-0.02em] font-['Instrument_Serif',Georgia,serif] text-[var(--text-h)] max-[620px]:text-[24px]">
              {achievement.title}
            </h3>

            <p className="mb-[13px] text-[13.5px] leading-[1.6] text-[var(--muted)]">
              {achievement.description}
            </p>

            <div className="mb-[12px] flex flex-wrap gap-[8px]">
              {achievement.highlights.map((highlight) => (
                <span
                  key={`${achievement.id}-${highlight.label}`}
                  className="inline-flex items-center rounded-[10px] border border-solid border-[rgba(217,102,245,0.16)] bg-[rgba(255,255,255,0.02)] px-[9px] py-[6px] text-[10px] font-semibold tracking-[0.07em] uppercase text-[var(--muted)]"
                >
                  <span className="mr-[6px] text-[var(--accent2)]">{highlight.value}</span>
                  {highlight.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-[8px]">
              {achievement.tags.map((tag) => (
                <MotionSpan
                  key={`${achievement.id}-${tag}`}
                  whileHover={reduceMotion ? { y: -1 } : { y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center rounded-full border border-solid border-[rgba(245,102,184,0.22)] bg-[rgba(245,102,184,0.08)] px-[10px] py-[5px] text-[10px] font-semibold tracking-[0.08em] uppercase text-[var(--accent2)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(245,102,184,0.5)] hover:bg-[rgba(245,102,184,0.16)] hover:shadow-[0_0_0_2px_rgba(245,102,184,0.08),0_8px_16px_rgba(245,102,184,0.18)]"
                >
                  {tag}
                </MotionSpan>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionArticle>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden border-t border-solid border-[var(--border)] max-w-[1200px] mx-auto px-[52px] py-[120px] max-[960px]:px-[24px] max-[960px]:py-[80px]"
    >
      <MotionDiv
        className="pointer-events-none absolute -top-[120px] right-[-80px] h-[300px] w-[300px] rounded-full blur-[76px]"
        style={{ background: 'radial-gradient(circle, rgba(245,102,184,0.2), rgba(245,102,184,0))' }}
        animate={{ x: [0, 22, 0], y: [0, -10, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="pointer-events-none absolute -bottom-[140px] -left-[120px] h-[330px] w-[330px] rounded-full blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(217,102,245,0.18), rgba(217,102,245,0))' }}
        animate={{ x: [0, -20, 0], y: [0, 14, 0], opacity: [0.12, 0.26, 0.12] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <MotionDiv
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="section-label"
      >
        <span className="section-num">05 -</span> Awards
      </MotionDiv>

      <MotionHeading
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.66, delay: 0.03, ease: EASE }}
        className="font-['Instrument_Serif',Georgia,serif] text-[clamp(40px,5vw,66px)] tracking-[-0.028em] leading-[0.98] mb-[14px] text-[var(--text-h)]"
      >
        Recognition &amp; <em className="italic text-[var(--accent2)]">milestones</em>
      </MotionHeading>

      <MotionParagraph
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
        className="mb-[34px] max-w-[720px] text-[15px] leading-[1.7] text-[var(--muted)]"
      >
        Awards, recognition, and research milestones across startup incubation, patents, and peer-reviewed medical AI publications.
      </MotionParagraph>

      <div className="relative z-[2] max-w-[920px] pl-[34px] max-[960px]:pl-[24px]">
          <div className="pointer-events-none absolute left-[8px] top-[6px] h-[calc(100%-12px)] w-px bg-[linear-gradient(to_bottom,rgba(245,102,184,0.65),rgba(217,102,245,0.08))] max-[960px]:left-[6px]" />
          <div className="space-y-[16px]">
            {ACHIEVEMENTS.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
      </div>
    </section>
  );
}
