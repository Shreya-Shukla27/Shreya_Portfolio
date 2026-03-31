import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROJECTS } from "../../constants/data";
import {
  PROJECTS_GRID_BASE_DELAY,
  PROJECTS_GRID_COLUMN_STEP,
  PROJECTS_GRID_COLUMNS,
  PROJECTS_GRID_ROW_STEP,
  getGridRevealDelay,
} from "../../constants/motion";

const EASE = [0.16, 1, 0.3, 1];
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionHeading = motion.h2;
const MotionParagraph = motion.p;

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty("--mx", `${x}px`);
  e.currentTarget.style.setProperty("--my", `${y}px`);
}

function handleCardMouseLeave(e) {
  e.currentTarget.style.setProperty("--mx", "50%");
  e.currentTarget.style.setProperty("--my", "50%");
}

function ActionButtons({ links }) {
  return (
    <div className="flex flex-wrap gap-[10px] mt-auto">
      {links.map((link, index) => {
        const isPrimary = link.type === "primary";
        const isExternal = link.href.startsWith("http");
        return (
          <a
            key={index}
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className={`inline-flex items-center justify-center rounded-full px-[16px] py-[10px] text-[11px] font-bold tracking-[0.08em] uppercase no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-none ${
              isPrimary
                ? "text-[#120c1f] bg-[var(--grad)] border border-solid border-[rgba(245,102,184,0.25)] shadow-[0_6px_16px_rgba(245,102,184,0.22)] hover:brightness-105 hover:-translate-y-[1px]"
                : "text-[var(--text)] border border-solid border-[rgba(217,102,245,0.3)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(217,102,245,0.55)] hover:bg-[rgba(217,102,245,0.1)] hover:-translate-y-[1px]"
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

function TechTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-[8px] mb-[18px]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] font-semibold tracking-[0.09em] uppercase px-[10px] py-[5px] rounded-full border border-solid border-[rgba(217,102,245,0.18)] bg-[rgba(217,102,245,0.08)] text-[var(--muted)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function CompactProjectCard({ project, index }) {
  const revealDelay = getGridRevealDelay(
    index,
    PROJECTS_GRID_COLUMNS,
    PROJECTS_GRID_BASE_DELAY,
    PROJECTS_GRID_ROW_STEP,
    PROJECTS_GRID_COLUMN_STEP
  );

  return (
    <MotionArticle
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      initial={{ opacity: 0, y: 24, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.62, delay: revealDelay, ease: EASE }}
      className="group relative rounded-[24px] p-[1px] bg-[linear-gradient(135deg,rgba(217,102,245,0.36),rgba(245,102,184,0.18),rgba(160,102,245,0.3))]"
    >
      <div className="relative h-full overflow-hidden rounded-[23px] border border-solid border-[rgba(255,255,255,0.08)] bg-[linear-gradient(145deg,rgba(28,16,42,0.82),rgba(12,8,22,0.9))] backdrop-blur-[14px] p-[24px] max-[960px]:p-[20px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_34px_rgba(0,0,0,0.35)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(245,102,184,0.2), transparent 45%), radial-gradient(300px circle at 14% 8%, rgba(217,102,245,0.13), transparent 58%)",
          }}
        />

        <div className="relative flex items-center justify-between mb-[12px]">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[var(--muted)]">{project.year}</span>
          <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[var(--accent)]">Project</span>
        </div>

        <h3 className="relative font-['Instrument_Serif',Georgia,serif] text-[33px] max-[1200px]:text-[30px] leading-[1] tracking-[-0.02em] text-[var(--text-h)] mb-[10px]">
          {project.title}
        </h3>

        <p className="relative text-[14px] leading-[1.62] text-[var(--muted)] mb-[14px]">
          {project.desc}
        </p>

        <div className="relative grid grid-cols-3 max-[700px]:grid-cols-2 gap-[8px] mb-[14px]">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[12px] border border-solid border-[rgba(217,102,245,0.16)] bg-[rgba(255,255,255,0.02)] px-[9px] py-[10px]"
            >
              <div className="text-[17px] font-semibold text-[var(--accent2)] leading-[1.08]">{metric.val}</div>
              <div className="text-[9px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)] mt-[5px]">{metric.label}</div>
            </div>
          ))}
        </div>

        <TechTags tags={project.tags} />
        <ActionButtons links={project.links} />
      </div>
    </MotionArticle>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [36, -30]);
  const accentDrift = useTransform(scrollYProgress, [0, 1], [-20, 24]);
  const accentReverseDrift = useTransform(scrollYProgress, [0, 1], [18, -14]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="border-t border-solid border-[var(--border)] max-w-[1200px] mx-auto py-[120px] px-[52px] relative overflow-hidden max-[960px]:py-[80px] max-[960px]:px-[24px]"
    >
      <MotionDiv
        className="pointer-events-none absolute -top-[80px] right-[6%] w-[340px] h-[340px] rounded-full blur-[70px]"
        style={{
          y: accentDrift,
          background: "radial-gradient(circle, rgba(245,102,184,0.28), rgba(245,102,184,0))",
        }}
        animate={{ x: [0, 26, 0], opacity: [0.22, 0.38, 0.22] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <MotionDiv
        className="pointer-events-none absolute -bottom-[120px] -left-[110px] w-[360px] h-[360px] rounded-full blur-[72px]"
        style={{
          y: accentReverseDrift,
          background: "radial-gradient(circle, rgba(217,102,245,0.22), rgba(217,102,245,0))",
        }}
        animate={{ x: [0, -24, 0], opacity: [0.2, 0.34, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <MotionDiv
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="section-label"
      >
        <span className="section-num">03 -</span> Projects
      </MotionDiv>

      <MotionHeading
        style={{ y: headingY }}
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-['Instrument_Serif',Georgia,serif] text-[clamp(40px,5.4vw,72px)] leading-[0.96] tracking-[-0.03em] mb-[22px] text-[var(--text-h)]"
      >
        Things I've <em className="italic text-[var(--accent2)]">built</em>
      </MotionHeading>

      <MotionParagraph
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.62, delay: 0.05, ease: EASE }}
        className="text-[15px] leading-[1.72] text-[var(--muted)] max-w-[720px] mb-[34px]"
      >
        Production-focused machine learning, computer vision, analytics, and full-stack AI systems with measurable impact.
      </MotionParagraph>

      <div className="relative z-[2] grid grid-cols-2 max-[960px]:grid-cols-1 gap-[20px]">
        {PROJECTS.grid.map((project, index) => (
          <CompactProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}