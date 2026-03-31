import { useCountUp } from '../../hooks';

const HERO_PHOTO_URL = 'https://i.postimg.cc/w3KCVZrc/photo.jpg';

const ABOUT_CONTENT = {
  badge: 'Currently building GenAI & LLM systems at PwC India',
  intro:
    'I am a B.Tech CSE (Data Science) student at Manipal University Jaipur (CGPA: 9.17), currently working as an AI & Cloud Application Development Trainee at PwC India.',
  specialization:
    'I specialize in building LLM-powered systems, RAG pipelines, and scalable AI solutions for real-world applications. My work focuses on combining machine learning, deep learning, and generative AI to create systems that are not just intelligent, but production-ready.',
  stats: [
    { num: '9.17', label: 'CGPA', target: 9.17, decimal: 2 },
    { num: '2', label: 'Papers (Under Review)', target: 2, decimal: 0 },
    { num: '1', label: 'Patent Granted', target: 1, decimal: 0 },
    { num: 'AIC', label: 'Incubation Support', static: true },
  ],
};

const KEYWORD_PATTERN = /(GenAI|LLM|RAG|AI systems|Patent|95%\+|187\+)/g;

function renderKeywordHighlights(text) {
  const highlightedTokens = ['genai', 'llm', 'rag', 'ai systems', 'patent', '95%+', '187+'];

  return text.split(KEYWORD_PATTERN).map((part, index) => {
    if (highlightedTokens.includes(part.toLowerCase())) {
      return (
        <span key={`kw-${index}`} className="text-[var(--accent2)] font-medium">
          {part}
        </span>
      );
    }
    return <span key={`txt-${index}`}>{part}</span>;
  });
}

function StatCard({ stat, index }) {
  const { value, ref } = useCountUp(stat.target || 0, stat.decimal || 0);

  return (
    <div className="reveal" style={{ transitionDelay: `${0.16 + index * 0.05}s` }}>
      <div style={{ animation: `softFloat ${8 + index * 0.8}s ease-in-out infinite`, animationDelay: `${index * 0.6}s` }}>
        <div
          ref={ref}
          className="rounded-[16px] px-[18px] py-[18px] border border-solid border-[rgba(217,102,245,0.14)] bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_26px_rgba(0,0,0,0.24)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:scale-[1.02] hover:border-[rgba(217,102,245,0.34)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_30px_rgba(0,0,0,0.3),0_0_18px_rgba(217,102,245,0.18)]"
        >
          <div className="font-['Instrument_Serif',Georgia,serif] text-[38px] leading-[0.95] mb-[6px] text-[var(--accent)]">
            {stat.static ? stat.num : value}
          </div>
          <div className="text-[11px] font-medium tracking-[0.04em] text-[var(--muted)]">{stat.label}</div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-solid border-[var(--border)] max-w-[1200px] mx-auto py-[120px] px-[52px] max-[960px]:py-[80px] max-[960px]:px-[24px]">
      <div className="pointer-events-none absolute -left-[120px] top-[72px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(217,102,245,0.14),transparent_70%)] blur-[22px]" />
      <div className="pointer-events-none absolute right-[3%] top-[18%] h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(245,102,184,0.1),transparent_72%)] blur-[18px]" />

      <div className="relative z-[2] flex items-center gap-[12px] text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--muted)] mb-[52px] reveal after:content-[''] after:flex-1 after:max-w-[56px] after:h-[1px] after:bg-[var(--border-h)]">
        <span className="text-[var(--accent)]">01 —</span> About
      </div>

      <div className="relative z-[2] grid grid-cols-[minmax(0,1fr)_220px] gap-[34px] items-start max-[960px]:grid-cols-1">
        <div className="max-w-[820px]">
          <div className="inline-flex items-center gap-[9px] rounded-full border border-solid border-[rgba(34,197,94,0.24)] bg-[rgba(34,197,94,0.08)] px-[14px] py-[8px] text-[12px] text-[var(--text)] backdrop-blur-[10px] shadow-[0_0_18px_rgba(34,197,94,0.08)] mb-[20px] reveal">
            <span className="h-[8px] w-[8px] rounded-full bg-[#22c55e] shadow-[0_0_0_4px_rgba(34,197,94,0.18)] animate-[greenPulse_2s_ease-in-out_infinite]" />
            <span className="text-[12px] tracking-[0.02em] text-[var(--muted)]">{ABOUT_CONTENT.badge}</span>
          </div>

          <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(38px,4.7vw,64px)] leading-[1.02] tracking-[-0.03em] text-[var(--text-h)] mb-[18px] reveal" style={{ transitionDelay: '0.04s' }}>
            I build systems that turn <span className="bg-[linear-gradient(90deg,#d966f5,#f58ac8)] bg-clip-text text-transparent">data</span> into{' '}
            <span className="bg-[linear-gradient(90deg,#f58ac8,#d966f5)] bg-clip-text text-transparent">intelligent decisions</span>.
          </h2>

          <p className="text-[15px] leading-[1.75] text-[var(--muted)] mb-[12px] reveal" style={{ transitionDelay: '0.08s' }}>
            {renderKeywordHighlights(ABOUT_CONTENT.intro)}
          </p>

          <p className="text-[15px] leading-[1.75] text-[var(--muted)] mb-[14px] reveal" style={{ transitionDelay: '0.12s' }}>
            {renderKeywordHighlights(ABOUT_CONTENT.specialization)}
          </p>

          </div>

        <div className="reveal max-[960px]:max-w-[220px] max-[960px]:mx-auto" style={{ transitionDelay: '0.12s' }}>
          <div className="group relative w-[220px] h-[220px] max-[960px]:w-[200px] max-[960px]:h-[200px]">
            <div className="absolute -inset-[14px] rounded-full border border-solid border-[rgba(217,102,245,0.22)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[rgba(245,102,184,0.4)] group-hover:shadow-[0_0_30px_rgba(217,102,245,0.28)]" />
            <img
              src={HERO_PHOTO_URL}
              alt="Shreya Shukla"
              className="relative w-full h-full rounded-full object-cover object-top border-[2px] border-solid border-[rgba(217,102,245,0.25)] shadow-[0_0_24px_rgba(217,102,245,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(217,102,245,0.16),transparent_62%)]" />
          </div>
        </div>
      </div>

      <div className="relative z-[2] grid grid-cols-4 gap-[14px] mt-[34px] max-[900px]:grid-cols-2">
        {ABOUT_CONTENT.stats.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>
    </section>
  );
}
