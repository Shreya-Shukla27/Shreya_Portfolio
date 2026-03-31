import { motion, useReducedMotion } from 'framer-motion';
import { PUBLICATIONS } from '../../constants/data';
import {
  PUBLICATIONS_LIST_BASE_DELAY,
  PUBLICATIONS_LIST_STEP,
  getLinearRevealDelay,
} from '../../constants/motion';

const EASE = [0.16, 1, 0.3, 1];
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionHeading = motion.h2;
const MotionParagraph = motion.p;
const MotionLi = motion.li;

function getStatusClasses(status) {
  if (status === 'Published') {
    return 'border-[rgba(34,197,94,0.24)] bg-[rgba(34,197,94,0.08)] text-[#33d17a]';
  }
  if (status === 'Under Review') {
    return 'border-[rgba(234,179,8,0.28)] bg-[rgba(234,179,8,0.1)] text-[#eab308]';
  }
  return 'border-[rgba(217,102,245,0.28)] bg-[rgba(217,102,245,0.1)] text-[var(--accent)]';
}

function PublicationItem({ publication, index }) {
  const reduceMotion = useReducedMotion();
  const isPatent = publication.type === 'patent';
  const revealDelay = getLinearRevealDelay(index, PUBLICATIONS_LIST_BASE_DELAY, PUBLICATIONS_LIST_STEP);

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.26 }}
      whileHover={reduceMotion ? { x: 2 } : { x: 4 }}
      transition={{ duration: 0.58, delay: revealDelay, ease: EASE }}
      className="group relative grid grid-cols-[96px_1fr] gap-[24px] border-t border-solid border-[var(--border)] py-[24px] max-[780px]:grid-cols-[64px_1fr] max-[780px]:gap-[18px] max-[780px]:py-[20px]"
    >
      <span className="pt-[6px] font-['JetBrains_Mono',monospace] text-[12px] tracking-[0.06em] text-[var(--muted)]">
        {publication.year}
      </span>

      <div className="relative pl-[22px] max-[780px]:pl-[18px]">
        <span
          className={`absolute left-0 top-[9px] h-[9px] w-[9px] rounded-full border border-solid ${
            isPatent
              ? 'border-[rgba(217,102,245,0.72)] bg-[rgba(217,102,245,0.92)] shadow-[0_0_0_2px_rgba(217,102,245,0.14)]'
              : 'border-[rgba(200,160,255,0.35)] bg-[rgba(200,160,255,0.62)]'
          }`}
        />

        <div className={`py-[2px] ${isPatent ? 'border-l border-solid border-[rgba(217,102,245,0.26)] pl-[12px] -ml-[2px]' : ''}`}>
          <h3
            className="max-w-[800px] break-words font-['Inter',system-ui,-apple-system,'Segoe_UI',sans-serif] text-[20px] md:text-[24px] font-semibold leading-snug tracking-tight text-[var(--text)] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[var(--accent)]"
          >
            {publication.title}
          </h3>

          <div className="mt-[8px] flex flex-wrap items-center gap-[8px]">
            <span
              className={`inline-flex items-center rounded-full border border-solid px-[9px] py-[4px] text-sm font-medium ${getStatusClasses(publication.status)}`}
            >
              {publication.statusLabel ?? publication.status}
            </span>
            <span className="text-sm text-[var(--muted)]">{publication.venue}</span>
          </div>

          <p className="mt-[8px] text-sm leading-[1.62] text-[var(--muted)]">{publication.details}</p>

          {publication.issued && (
            <p className="mt-[4px] text-sm text-[var(--muted)]">{publication.issued}</p>
          )}

          {Array.isArray(publication.highlights) && publication.highlights.length > 0 && (
            <ul className="mt-[10px] space-y-[4px]">
              {publication.highlights.map((highlight, itemIndex) => (
                <MotionLi
                  key={`${publication.id}-highlight-${itemIndex}`}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.9 }}
                  transition={{ duration: 0.4, delay: revealDelay + 0.08 + itemIndex * 0.045, ease: EASE }}
                  className="list-none text-sm leading-[1.56] text-[var(--muted)] before:mr-[8px] before:text-[var(--accent)] before:content-['•']"
                >
                  {highlight}
                </MotionLi>
              ))}
            </ul>
          )}

        </div>
      </div>
    </MotionArticle>
  );
}

export default function Publications() {
  return (
    <section
      id="publications"
      className="relative overflow-hidden border-t border-solid border-[var(--border)] max-w-[1200px] mx-auto px-[52px] py-[120px] max-[960px]:px-[24px] max-[960px]:py-[80px]"
    >
      <div className="pointer-events-none absolute right-[14%] top-[12%] h-[180px] w-[180px] rounded-full bg-[radial-gradient(circle,rgba(217,102,245,0.06),transparent_72%)]" />

      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="section-label"
      >
        <span className="section-num">06 -</span> Research
      </MotionDiv>

      <MotionHeading
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.62, delay: 0.02, ease: EASE }}
        className="mb-[14px] font-['Instrument_Serif',Georgia,serif] text-[clamp(40px,4.9vw,64px)] leading-[0.97] tracking-[-0.028em] text-[var(--text-h)]"
      >
        <span className="bg-[linear-gradient(95deg,#f3e9ff,#d9b7ff)] bg-clip-text text-transparent">Research</span>{' '}
        <span className="bg-[linear-gradient(95deg,#f58ac8,#d966f5)] bg-clip-text text-transparent">publications</span>
      </MotionHeading>

      <MotionParagraph
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.56, delay: 0.05, ease: EASE }}
        className="mb-[34px] max-w-[760px] text-[14px] leading-[1.7] text-[var(--muted)]"
      >
        A curated list of ongoing and published work focused on sustainable compute infrastructure and AI-driven healthcare diagnostics.
      </MotionParagraph>

      <div className="relative z-[2] max-w-[1060px]">
        <div className="pointer-events-none absolute left-[123px] top-[8px] h-[calc(100%-16px)] w-px bg-[rgba(200,160,255,0.18)] max-[780px]:left-[85px]" />

        <div className="border-b border-solid border-[var(--border)]">
          {PUBLICATIONS.map((publication, index) => (
            <PublicationItem key={publication.id} publication={publication} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
