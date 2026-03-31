import { useState } from 'react';
import { TECH_STACK } from '../../constants/data';
import {
  SKILLS_CATEGORY_BASE_DELAY_MAP,
  SKILLS_CATEGORY_FALLBACK_BASE_DELAY,
  SKILLS_CATEGORY_INDEX_STEP,
  getCategoryRevealDelay,
} from '../../constants/motion';
import {
  SiC,
  SiCnn,
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiHuggingface,
  SiJupyter,
  SiKeras,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiOllama,
  SiOpencv,
  SiOpenjdk,
  SiPandas,
  SiPostgresql,
  SiPytorch,
  SiPython,
  SiReact,
  SiRender,
  SiScikitlearn,
  SiScipy,
  SiTailwindcss,
  SiTensorflow,
  SiUbuntu,
  SiVercel,
} from 'react-icons/si';
import {
  FaAws,
  FaBrain,
  FaChartLine,
  FaChartSimple,
  FaCodeBranch,
  FaDatabase,
  FaDiagramProject,
  FaFileExcel,
  FaLayerGroup,
  FaSitemap,
  FaWaveSquare,
} from 'react-icons/fa6';
import { VscVscode } from 'react-icons/vsc';

const SKILL_ICONS = {
  Python: SiPython,
  C: SiC,
  'C++': SiCplusplus,
  Java: SiOpenjdk,
  'SQL (MySQL)': SiMysql,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  Keras: SiKeras,
  'Scikit-learn': SiScikitlearn,
  'Hugging Face': SiHuggingface,
  CNNs: SiCnn,
  'Vision Transformers': FaBrain,
  LangChain: SiLangchain,
  LlamaIndex: SiOllama,
  'RAG Pipelines': FaDiagramProject,
  LoRA: FaLayerGroup,
  QLoRA: FaCodeBranch,
  FAISS: FaDatabase,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  SciPy: SiScipy,
  Matplotlib: FaChartLine,
  Seaborn: FaWaveSquare,
  OpenCV: SiOpencv,
  'React.js': SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'Tailwind CSS': SiTailwindcss,
  FastAPI: SiFastapi,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Git: SiGit,
  GitHub: SiGithub,
  'Linux (Ubuntu)': SiUbuntu,
  Jupyter: SiJupyter,
  'VS Code': VscVscode,
  'Power BI': FaChartSimple,
  Excel: FaFileExcel,
  AWS: FaAws,
  Vercel: SiVercel,
  Render: SiRender,
};

const ICON_CLASS_OVERRIDES = {
  C: 'text-[21px] max-[600px]:text-[19px]',
  'C++': 'text-[19px] max-[600px]:text-[17px]',
  Java: 'text-[21px] max-[600px]:text-[19px]',
  'SQL (MySQL)': 'text-[20px] max-[600px]:text-[18px]',
  CNNs: 'text-[19px] max-[600px]:text-[17px]',
  'Vision Transformers': 'text-[20px] max-[600px]:text-[18px]',
  'RAG Pipelines': 'text-[20px] max-[600px]:text-[18px]',
  LoRA: 'text-[20px] max-[600px]:text-[18px]',
  QLoRA: 'text-[20px] max-[600px]:text-[18px]',
  FAISS: 'text-[20px] max-[600px]:text-[18px]',
  Matplotlib: 'text-[20px] max-[600px]:text-[18px]',
  Seaborn: 'text-[20px] max-[600px]:text-[18px]',
  'Power BI': 'text-[20px] max-[600px]:text-[18px]',
  Excel: 'text-[20px] max-[600px]:text-[18px]',
  AWS: 'text-[20px] max-[600px]:text-[18px]',
};

const CATEGORY_ICON_MOTION = {
  'Programming Languages': { scale: '1.045', lift: '-0.6px', tilt: '-0.4deg', duration: '200ms' },
  'AI/ML': { scale: '1.075', lift: '-1.1px', tilt: '-1.1deg', duration: '245ms' },
  'GenAI/LLM': { scale: '1.09', lift: '-1.3px', tilt: '1.6deg', duration: '270ms' },
  'Data Science': { scale: '1.07', lift: '-0.95px', tilt: '1.1deg', duration: '245ms' },
  Web: { scale: '1.08', lift: '-1.1px', tilt: '-1.2deg', duration: '255ms' },
  Backend: { scale: '1.058', lift: '-0.75px', tilt: '0.5deg', duration: '225ms' },
  Database: { scale: '1.032', lift: '-0.35px', tilt: '0deg', duration: '190ms' },
  'DevOps & Tools': { scale: '1.052', lift: '-0.7px', tilt: '-0.65deg', duration: '215ms' },
  Cloud: { scale: '1.064', lift: '-0.85px', tilt: '0.7deg', duration: '230ms' },
};

const CATEGORY_CARD_MOTION = {
  'Programming Languages': { lift: '-1.3px', tilt: '-0.2deg', duration: '340ms', borderAlpha: '0.36', glowAlpha: '0.12' },
  'AI/ML': { lift: '-2.4px', tilt: '-0.35deg', duration: '430ms', borderAlpha: '0.46', glowAlpha: '0.19' },
  'GenAI/LLM': { lift: '-2.7px', tilt: '0.5deg', duration: '460ms', borderAlpha: '0.5', glowAlpha: '0.22' },
  'Data Science': { lift: '-2.1px', tilt: '0.25deg', duration: '410ms', borderAlpha: '0.44', glowAlpha: '0.18' },
  Web: { lift: '-2.2px', tilt: '-0.45deg', duration: '420ms', borderAlpha: '0.45', glowAlpha: '0.18' },
  Backend: { lift: '-1.6px', tilt: '0.15deg', duration: '370ms', borderAlpha: '0.39', glowAlpha: '0.14' },
  Database: { lift: '-1px', tilt: '0deg', duration: '320ms', borderAlpha: '0.33', glowAlpha: '0.1' },
  'DevOps & Tools': { lift: '-1.5px', tilt: '-0.2deg', duration: '355ms', borderAlpha: '0.37', glowAlpha: '0.13' },
  Cloud: { lift: '-1.75px', tilt: '0.2deg', duration: '380ms', borderAlpha: '0.4', glowAlpha: '0.15' },
};

const CATEGORY_COLORS = {
  'Programming Languages': { color: '#dd6ef6', rgb: '221, 110, 246' },
  'AI/ML': { color: '#f26db8', rgb: '242, 109, 184' },
  'GenAI/LLM': { color: '#b27af7', rgb: '178, 122, 247' },
  'Data Science': { color: '#f59ac4', rgb: '245, 154, 196' },
  Web: { color: '#ff7ab6', rgb: '255, 122, 182' },
  Backend: { color: '#8de0c3', rgb: '141, 224, 195' },
  Database: { color: '#f5b873', rgb: '245, 184, 115' },
  'DevOps & Tools': { color: '#f48d9f', rgb: '244, 141, 159' },
  Cloud: { color: '#9ae6cf', rgb: '154, 230, 207' },
};

// Hybrid layout: one featured wide card, others compact and scannable.
const CARD_SPANS = {
  'AI/ML': 'col-span-2',
  'DevOps & Tools': 'col-span-2',
};

const CARD_NOISE_STYLE = {
  backgroundImage:
    'radial-gradient(rgba(255,255,255,0.3) 0.8px, transparent 1px), radial-gradient(rgba(255,255,255,0.16) 0.8px, transparent 1px)',
  backgroundSize: '34px 34px, 54px 54px',
  backgroundPosition: '0 0, 16px 18px',
};

const SECTION_NOISE_STYLE = {
  backgroundImage:
    'radial-gradient(rgba(242,109,184,0.2) 0.9px, transparent 1.1px), radial-gradient(rgba(255,255,255,0.14) 0.8px, transparent 1px)',
  backgroundSize: '40px 40px, 72px 72px',
  backgroundPosition: '0 0, 22px 16px',
};

function BentoCard({ category, techs, revealDelay = 0, isActive = false, onSelect = () => {} }) {
  const catColor = CATEGORY_COLORS[category] || { color: 'var(--accent)', rgb: '217, 102, 245' };
  const spanClass = CARD_SPANS[category] || 'col-span-1';
  const iconMotion = CATEGORY_ICON_MOTION[category] || { scale: '1.06', lift: '-1px', tilt: '0deg', duration: '220ms' };
  const cardMotion = CATEGORY_CARD_MOTION[category] || { lift: '-1.8px', tilt: '0deg', duration: '380ms', borderAlpha: '0.4', glowAlpha: '0.15' };
  const activeBackground = `linear-gradient(145deg, rgba(${catColor.rgb},0.22), rgba(24,14,35,0.92) 56%, rgba(${catColor.rgb},0.09))`;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`${spanClass} group/skill relative overflow-hidden rounded-[22px] p-[16px] transition-[transform,border-color,box-shadow] [transition-duration:var(--card-duration)] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none cursor-default reveal
        border border-solid border-[rgba(255,255,255,0.16)]
        bg-[linear-gradient(145deg,rgba(26,14,36,0.82),rgba(16,9,24,0.88))]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_36px_rgba(0,0,0,0.35)]
        hover:[transform:translateY(var(--card-lift))_rotate(var(--card-tilt))] motion-reduce:hover:[transform:none]
        hover:border-[rgba(var(--skill-rgb),var(--card-border-alpha))]
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_18px_36px_rgba(0,0,0,0.44),0_0_30px_rgba(var(--skill-rgb),var(--card-glow-alpha))]
        max-[768px]:col-span-1`}
      style={{
        '--skill-color': catColor.color,
        '--skill-rgb': catColor.rgb,
        '--card-lift': cardMotion.lift,
        '--card-tilt': cardMotion.tilt,
        '--card-duration': cardMotion.duration,
        '--card-border-alpha': cardMotion.borderAlpha,
        '--card-glow-alpha': cardMotion.glowAlpha,
        transitionDelay: `${revealDelay}s`,
        background: isActive ? activeBackground : 'linear-gradient(145deg,rgba(26,14,36,0.82),rgba(16,9,24,0.88))',
        borderColor: isActive ? `rgba(${catColor.rgb},0.52)` : undefined,
        boxShadow: isActive
          ? `inset 0 1px 0 rgba(255,255,255,0.12),0 20px 38px rgba(0,0,0,0.44),0 0 28px rgba(${catColor.rgb},0.22)`
          : undefined,
      }}
    >
      <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_4%,rgba(var(--skill-rgb),0.22),transparent_42%),radial-gradient(circle_at_78%_112%,rgba(221,110,246,0.14),transparent_45%)] ${isActive ? 'opacity-[0.72]' : 'opacity-[0.55]'}`} />
      <div className="absolute inset-0 opacity-[0.22] pointer-events-none" style={CARD_NOISE_STYLE} />
      <div className="absolute inset-0 opacity-0 scale-[1.02] transition-[opacity,transform] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none group-hover/skill:opacity-100 group-hover/skill:scale-100 bg-[radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.12),transparent_36%)]" />

      {/* Category label + count */}
      <div className="relative flex items-center justify-between mb-[12px]">
        <div className="flex items-center gap-[9px]">
          <div className={`w-[10px] h-[10px] rounded-full transition-[transform,box-shadow] duration-[340ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/skill:scale-[1.08] group-hover/skill:shadow-[0_0_14px_var(--skill-color)] ${isActive ? 'shadow-[0_0_10px_var(--skill-color)]' : ''}`} style={{ background: catColor.color }} />
          <span className="text-[18px] max-[960px]:text-[16px] max-[600px]:text-[15px] font-semibold tracking-[0.02em] text-[var(--text)] leading-[1.2] transition-[letter-spacing] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/skill:tracking-[0.024em]">
            {category}
          </span>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)] opacity-75 transition-opacity duration-[300ms] group-hover/skill:opacity-95">{techs.length} tools</span>
      </div>

      {/* Tech items grid */}
      <div className="relative grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] max-[600px]:grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-[9px]">
        {techs.map((tech, i) => {
          const Icon = SKILL_ICONS[tech.name] || FaSitemap;
          const iconClass = ICON_CLASS_OVERRIDES[tech.name] || 'text-[22px] max-[600px]:text-[20px]';
          return (
            <div
              key={i}
              className="group/item flex flex-col items-center gap-[7px] py-[9px] px-[8px] rounded-[13px] border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(8,14,34,0.58)] transition-[transform,border-color,background-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none
                hover:bg-[rgba(var(--skill-rgb),0.085)] hover:border-[rgba(var(--skill-rgb),0.26)] hover:-translate-y-[1px] motion-reduce:hover:translate-y-0 hover:shadow-[0_8px_18px_rgba(0,0,0,0.26),0_0_14px_rgba(var(--skill-rgb),0.12)]"
            >
              <div
                className="w-[48px] h-[48px] max-[960px]:w-[44px] max-[960px]:h-[44px] max-[600px]:w-[40px] max-[600px]:h-[40px] flex items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.05)] border border-solid border-[rgba(255,255,255,0.12)] transition-[transform,background-color,border-color] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-[1.04] group-hover/item:bg-[rgba(var(--skill-rgb),0.12)] group-hover/item:border-[rgba(var(--skill-rgb),0.26)]"
                style={{
                  color: catColor.color,
                  '--icon-scale': iconMotion.scale,
                  '--icon-lift': iconMotion.lift,
                  '--icon-tilt': iconMotion.tilt,
                  '--icon-duration': iconMotion.duration,
                }}
              >
                <Icon
                  className={`${iconClass} transition-transform [transition-duration:var(--icon-duration)] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:[transform:translateY(var(--icon-lift))_scale(var(--icon-scale))_rotate(var(--icon-tilt))]`}
                />
              </div>
              <span className="text-[12px] max-[960px]:text-[11px] max-[600px]:text-[10px] font-medium text-[var(--text)] text-center break-words leading-[1.22] min-h-[28px] max-[600px]:min-h-[24px] flex items-center justify-center transition-colors duration-[220ms] group-hover/item:text-[rgba(242,238,255,0.94)]">{tech.name}</span>
            </div>
          );
        })}
      </div>

      <div className="absolute -top-[50px] -right-[50px] w-[130px] h-[130px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: `radial-gradient(circle, ${catColor.color}, transparent 72%)` }} />
    </article>
  );
}

export default function TechStack() {
  // Group items by category
  const CATEGORY_MERGE_MAP = {
    'GenAI/LLM': 'AI/ML',
    Backend: 'Web',
  };

  const grouped = {};
  TECH_STACK.forEach(t => {
    const category = CATEGORY_MERGE_MAP[t.category] || t.category;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(t);
  });

  const CATEGORY_ORDER = ['Programming Languages', 'AI/ML', 'Data Science', 'Web', 'Database', 'DevOps & Tools', 'Cloud'];
  const orderedCategories = CATEGORY_ORDER.filter(c => grouped[c]);
  const [activeCategory, setActiveCategory] = useState('Programming Languages');

  return (
    <section id="skills" className="border-t border-solid border-[var(--border)] relative overflow-hidden max-w-[1200px] mx-auto py-[120px] px-[52px] max-[960px]:py-[80px] max-[960px]:px-[24px]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.55] bg-[radial-gradient(circle_at_12%_20%,rgba(255,122,182,0.14),transparent_38%),radial-gradient(circle_at_88%_78%,rgba(217,102,245,0.13),transparent_42%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.13]" style={SECTION_NOISE_STYLE} />

      {/* Section label */}
      <div className="relative z-[2] flex items-center gap-[12px] text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--muted)] mb-[52px] reveal after:content-[''] after:flex-1 after:max-w-[56px] after:h-[1px] after:bg-[var(--border-h)]">
        <span className="text-[var(--accent)]">02 —</span> Skills
      </div>

      {/* Heading */}
      <div className="relative z-[2] flex items-end justify-between mb-[34px] gap-[24px] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[16px]">
        <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(36px,4.5vw,58px)] font-normal tracking-[-0.025em] leading-[1.05] reveal">
          <span className="text-[rgba(243,234,255,0.96)]">Stack I Use to</span>{' '}
          <em className="italic text-[rgba(238,138,212,0.94)]">ship</em>
        </h2>
        <p className="text-[14px] text-[var(--muted)] font-light max-w-[340px] leading-[1.7] reveal reveal-delay-1">
          A scannable map of the core tools I use for model building, APIs, and product delivery.
        </p>
      </div>

      {/* Skill grid */}
      <div className="relative z-[2] grid grid-cols-3 gap-[14px] max-[960px]:grid-cols-2 max-[600px]:grid-cols-1">
        {orderedCategories.map((cat, idx) => {
          const revealDelay = getCategoryRevealDelay(
            cat,
            idx,
            SKILLS_CATEGORY_BASE_DELAY_MAP,
            SKILLS_CATEGORY_INDEX_STEP,
            SKILLS_CATEGORY_FALLBACK_BASE_DELAY
          );
          return (
            <BentoCard
              key={cat}
              category={cat}
              techs={grouped[cat]}
              revealDelay={revealDelay}
              isActive={activeCategory === cat}
              onSelect={() => setActiveCategory(cat)}
            />
          );
        })}
      </div>

      {/* Decorative glows */}
      <div className="absolute rounded-full pointer-events-none border border-solid border-[rgba(217,102,245,0.04)] animate-[floatOrb_12s_ease-in-out_infinite] w-[500px] h-[500px] -right-[200px] -top-[150px]" />
      <div className="absolute rounded-full pointer-events-none border border-solid border-[rgba(242,109,184,0.1)] animate-[floatOrb_14s_ease-in-out_infinite_-6s] w-[350px] h-[350px] -left-[120px] -bottom-[80px]" />
    </section>
  );
}
