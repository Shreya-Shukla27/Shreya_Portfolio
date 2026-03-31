import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Briefcase, Building2, Crown } from 'lucide-react';
import { EXPERIENCE } from '../../constants/data';
import {
  EXPERIENCE_LIST_BASE_DELAY,
  EXPERIENCE_LIST_STEP,
  getLinearRevealDelay,
} from '../../constants/motion';
import { useCardTilt } from '../../hooks';

const EASE = [0.16, 1, 0.3, 1];
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionHeading = motion.h2;
const MotionParagraph = motion.p;
const MotionLi = motion.li;
const MotionSpan = motion.span;

const COMPANY_ICON_MAP = {
  pwc: Building2,
  anova: Crown,
};

function isImpactToken(token) {
  if (/^\d+\+?$/.test(token)) return true;
  const normalized = token.toLowerCase();
  return normalized === 'enterprise' || normalized === 'enterprise scale';
}

function renderImpactText(text) {
  const parts = text.split(/(\b\d+\+?\b|enterprise scale|enterprise)/gi);
  return parts.map((part, index) => {
    if (!part) return null;
    if (isImpactToken(part)) {
      return (
        <span key={`impact-${index}`} className="text-[var(--accent2)] font-medium">
          {part}
        </span>
      );
    }
    return <span key={`copy-${index}`}>{part}</span>;
  });
}

function RoleBadge({ badge }) {
  const isCurrent = badge === 'CURRENT';
  return (
    <MotionSpan
      whileHover={{ y: -1, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center rounded-full border border-solid px-[9px] py-[4px] text-[9px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isCurrent
          ? 'border-[rgba(245,102,184,0.42)] bg-[rgba(245,102,184,0.14)] text-[var(--accent2)] shadow-[0_0_0_2px_rgba(245,102,184,0.08),0_8px_16px_rgba(245,102,184,0.2)]'
          : 'border-[rgba(217,102,245,0.28)] bg-[rgba(217,102,245,0.08)] text-[var(--accent)] hover:border-[rgba(217,102,245,0.5)] hover:bg-[rgba(217,102,245,0.14)]'
      }`}
    >
      {badge}
    </MotionSpan>
  );
}

function TimelineNode({ isCurrent }) {
  return (
    <span className="absolute left-[-25px] top-[28px] h-[12px] w-[12px] rounded-full border border-solid border-[rgba(245,102,184,0.54)] bg-[rgba(245,102,184,0.88)] shadow-[0_0_0_4px_rgba(245,102,184,0.14),0_0_16px_rgba(245,102,184,0.44)] max-[960px]:left-[-21px]">
      {isCurrent && (
        <MotionSpan
          aria-hidden="true"
          animate={{ scale: [1, 1.5, 1], opacity: [0.52, 0, 0.52] }}
          transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
          className="absolute inset-[-5px] rounded-full border border-solid border-[rgba(245,102,184,0.5)]"
        />
      )}
    </span>
  );
}

function ExperienceEntry({ exp, index }) {
  const reduceMotion = useReducedMotion();
  const tiltRef = useCardTilt({ maxTilt: 5.5, perspective: 980, translateZ: 4 });
  const Icon = COMPANY_ICON_MAP[exp.companyClass] ?? Briefcase;
  const revealDelay = getLinearRevealDelay(index, EXPERIENCE_LIST_BASE_DELAY, EXPERIENCE_LIST_STEP);
  const cardHoverAnimation = reduceMotion ? { y: -4 } : { y: -7, scale: 1.015 };
  const cardEnterX = reduceMotion ? 0 : index % 2 === 0 ? -16 : 16;

  return (
    <MotionArticle
      initial={{ opacity: 0, x: cardEnterX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.62, delay: revealDelay, ease: EASE }}
      className="relative"
    >
      <TimelineNode isCurrent={Boolean(exp.current)} />

      <div className="grid grid-cols-[210px_1fr] gap-[20px] max-[960px]:grid-cols-1 max-[960px]:gap-[10px]">
        <div className="pt-[10px] max-[960px]:pt-0">
          <div className="mb-[6px] font-['JetBrains_Mono',monospace] text-[12px] text-[var(--muted)]">{exp.period}</div>
          <div
            className={`text-[13px] font-bold tracking-[0.08em] uppercase ${
              exp.companyClass === 'pwc'
                ? 'text-[var(--accent)]'
                : exp.companyClass === 'anova'
                ? 'text-[var(--accent2)]'
                : 'text-[var(--text)]'
            }`}
          >
            {exp.company}
          </div>
        </div>

        <MotionDiv
          whileHover={cardHoverAnimation}
          className="group relative rounded-[24px] p-[1px] bg-[linear-gradient(138deg,rgba(217,102,245,0.3),rgba(245,102,184,0.16),rgba(160,102,245,0.26))]"
        >
          <div
            ref={tiltRef}
            style={{ '--mx': '50%', '--my': '50%' }}
            className="relative overflow-hidden rounded-[23px] border border-solid border-[rgba(255,255,255,0.08)] bg-[linear-gradient(152deg,rgba(17,11,29,0.9),rgba(10,7,19,0.86))] px-[22px] pb-[20px] pt-[18px] backdrop-blur-[14px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_32px_rgba(0,0,0,0.34)] max-[960px]:px-[18px]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(to_right,rgba(217,102,245,0),rgba(245,102,184,0.68),rgba(217,102,245,0))]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(245,102,184,0.18), transparent 42%), radial-gradient(240px circle at 12% 10%, rgba(217,102,245,0.13), transparent 58%)',
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[23px] border border-solid border-transparent transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[rgba(245,102,184,0.34)]" />

            <div className="relative z-[2] mb-[10px] flex items-start justify-between gap-[12px]">
              <div className="flex items-start gap-[12px]">
                <MotionDiv
                  animate={!reduceMotion ? { y: [0, -2, 0] } : undefined}
                  transition={!reduceMotion ? { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' } : undefined}
                  className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] border border-solid border-[rgba(245,102,184,0.24)] bg-[rgba(245,102,184,0.08)] text-[var(--accent2)] shadow-[0_8px_18px_rgba(245,102,184,0.16)]"
                >
                  <Icon size={18} strokeWidth={2} />
                </MotionDiv>

                <div>
                  <h3 className="font-['Instrument_Serif',Georgia,serif] text-[30px] leading-[1.02] tracking-[-0.02em] text-[var(--text-h)] max-[960px]:text-[26px]">
                    {exp.role}
                  </h3>
                  <div className="mt-[8px] flex flex-wrap gap-[7px]">
                    {(exp.badges ?? []).map((badge) => (
                      <RoleBadge key={`${exp.company}-${badge}`} badge={badge} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ul className="relative z-[2] space-y-[8px]">
              {exp.bullets.map((bullet, bulletIndex) => (
                <MotionLi
                  key={`${exp.company}-bullet-${bulletIndex}`}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{
                    duration: 0.46,
                    delay: revealDelay + 0.08 + bulletIndex * 0.045,
                    ease: EASE,
                  }}
                  className="flex items-start gap-[8px] text-[14px] leading-[1.62] text-[var(--muted)]"
                >
                  <ArrowRight size={12} className="mt-[5px] shrink-0 text-[var(--accent)]" />
                  <span>{renderImpactText(bullet)}</span>
                </MotionLi>
              ))}
            </ul>

            <div className="relative z-[2] mt-[14px] flex flex-wrap gap-[8px]">
              {exp.tech.map((tech) => (
                <MotionSpan
                  key={`${exp.company}-${tech}`}
                  whileHover={{ y: -1, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center rounded-full border border-solid border-[rgba(217,102,245,0.22)] bg-[rgba(217,102,245,0.08)] px-[10px] py-[5px] text-[10px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(217,102,245,0.5)] hover:bg-[rgba(217,102,245,0.14)] hover:shadow-[0_0_0_2px_rgba(217,102,245,0.08),0_8px_16px_rgba(217,102,245,0.2)]"
                >
                  {tech}
                </MotionSpan>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionArticle>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-solid border-[var(--border)] max-w-[1200px] mx-auto px-[52px] py-[120px] max-[960px]:px-[24px] max-[960px]:py-[80px]"
    >
      <MotionDiv
        className="pointer-events-none absolute -top-[90px] right-[8%] h-[300px] w-[300px] rounded-full blur-[72px]"
        style={{ background: 'radial-gradient(circle, rgba(245,102,184,0.2), rgba(245,102,184,0))' }}
        animate={{ x: [0, 20, 0], y: [0, -12, 0], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="pointer-events-none absolute -bottom-[120px] -left-[90px] h-[320px] w-[320px] rounded-full blur-[76px]"
        style={{ background: 'radial-gradient(circle, rgba(217,102,245,0.18), rgba(217,102,245,0))' }}
        animate={{ x: [0, -18, 0], y: [0, 12, 0], opacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <MotionDiv
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="section-label"
      >
        <span className="section-num">04 -</span> Experience
      </MotionDiv>

      <MotionHeading
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.66, delay: 0.03, ease: EASE }}
        className="font-['Instrument_Serif',Georgia,serif] text-[clamp(40px,5vw,66px)] tracking-[-0.028em] leading-[0.98] mb-[14px] text-[var(--text-h)]"
      >
        Where I've <em className="italic text-[var(--accent3)]">worked</em>
      </MotionHeading>

      <MotionParagraph
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
        className="mb-[34px] max-w-[760px] text-[15px] leading-[1.7] text-[var(--muted)]"
      >
        Timeline of product, AI, and leadership roles focused on enterprise-scale systems, high-impact community initiatives, and measurable outcomes.
      </MotionParagraph>

      <div className="relative z-[2] pl-[34px] max-[960px]:pl-[24px]">
        <div className="pointer-events-none absolute left-[8px] top-[8px] h-[calc(100%-16px)] w-px bg-[linear-gradient(to_bottom,rgba(245,102,184,0.68),rgba(217,102,245,0.08))] max-[960px]:left-[6px]" />
        <div className="space-y-[16px]">
          {EXPERIENCE.map((exp, index) => (
            <ExperienceEntry key={`${exp.company}-${index}`} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
