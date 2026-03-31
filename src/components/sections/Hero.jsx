import { useTyping, useMagneticButtons } from '../../hooks';

const HERO_NAME = 'Shreya Shukla';
const HERO_ROLE = 'AI/ML Engineer & Data Scientist at Manipal University Jaipur.';
const HERO_SUBTEXT = 'I build intelligent systems: from medical-grade deep learning to production GenAI pipelines.';
const RESUME_URL = 'https://drive.google.com/file/d/1SQwoD2hpzPt28w3xHnuvkA-am5L68woB/view?usp=drive_link';
const HERO_PHOTO_URL = 'https://i.postimg.cc/w3KCVZrc/photo.jpg';

const TYPING_PHRASES = [
  'AI/ML Engineer',
  'Data Scientist',
  'Gen AI Builder',
  'Full-Stack Developer',
  'Research Author',
];

export default function Hero() {
  const typedText = useTyping(TYPING_PHRASES);
  useMagneticButtons();

  return (
    <div 
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-[130px] px-[52px] pb-[80px] max-w-none relative overflow-hidden max-[960px]:pt-[120px] max-[960px]:px-[24px] max-[960px]:pb-[70px]
                 before:content-[''] before:absolute before:inset-0 before:z-0 
                 before:bg-[radial-gradient(ellipse_700px_500px_at_72%_30%,rgba(217,102,245,0.1)_0%,transparent_65%),radial-gradient(ellipse_500px_400px_at_12%_75%,rgba(245,102,184,0.07)_0%,transparent_60%),radial-gradient(ellipse_350px_250px_at_88%_85%,rgba(160,102,245,0.07)_0%,transparent_55%)] 
                 before:pointer-events-none"
    >
      {/* Floating orbs */}
      <div className="absolute rounded-full pointer-events-none z-0 w-[400px] h-[400px] right-[6%] top-[8%] bg-[radial-gradient(circle,rgba(217,102,245,0.07)_0%,transparent_70%)] animate-[floatOrb_9s_ease-in-out_infinite]" />
      <div className="absolute rounded-full pointer-events-none z-0 w-[240px] h-[240px] right-[30%] top-[55%] bg-[radial-gradient(circle,rgba(245,102,184,0.06)_0%,transparent_70%)] animate-[floatOrb_9s_ease-in-out_infinite_-4s]" />
      <div className="absolute rounded-full pointer-events-none z-0 w-[160px] h-[160px] left-[8%] top-[35%] bg-[radial-gradient(circle,rgba(160,102,245,0.05)_0%,transparent_70%)] animate-[floatOrb_9s_ease-in-out_infinite_-2s]" />

               
        <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between gap-[48px] relative z-10 max-[960px]:flex-col-reverse max-[960px]:gap-[32px]">
        <div className="flex-1 min-w-0">
          {/* Typing indicator */}
          <div className="typing-wrap reveal">
            <span className="typing-prefix">I am a</span>
            <span className="typing-text">{typedText}</span>
          </div>
          

          {/* Main headline */}
          <h1 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(52px,8.5vw,112px)] font-normal leading-[0.98] tracking-[-0.03em] mb-[32px] text-[var(--text-h)] reveal reveal-delay-1 max-[960px]:leading-[1.02] select-none">
            <span className="block"><span className="text-[var(--accent2)]">Building</span> intelligent</span>
            <span className="block">systems for</span>
            <span className="block">real-world <em className="italic text-[var(--accent2)]">impact.</em></span>
          </h1>

          {/* Sub */}
          <p className="text-[17px] text-[var(--muted)] leading-[1.65] max-w-[500px] mb-[40px] font-light reveal reveal-delay-2">
            <strong className="text-[var(--text)] font-medium">{HERO_NAME}</strong> — {HERO_ROLE}
            {' '}
            {HERO_SUBTEXT}
          </p>

          {/* CTA buttons */}
          <div className="flex gap-[14px] items-center flex-wrap reveal reveal-delay-3">
            <a href="#projects" className="mag-btn btn-primary" data-mag>
              <span className="mag-btn-inner">View my work</span>
            </a>
            <a href="#contact" className="mag-btn btn-outline" data-mag>
              <span className="mag-btn-inner">Let's connect</span>
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="mag-btn btn-resume" data-mag>
              <span className="mag-btn-inner">View Resume</span>
            </a>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center gap-[10px] mt-[52px] text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--muted)] reveal reveal-delay-3">
            <div className="w-[40px] h-[1px] bg-[rgba(217,102,245,0.4)] overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:bg-[var(--accent)] after:-translate-x-full after:animate-[scrollAnim_2s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
            Scroll to explore
          </div>
        </div>

        {/* Photo */}
        <div className="relative w-[320px] h-[400px] shrink-0 max-[960px]:w-[200px] max-[960px]:h-[200px] max-[960px]:mx-auto reveal reveal-delay-2">
          <div className="absolute -inset-[22px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border border-solid border-[rgba(245,102,184,0.12)] animate-[ringPulse_4s_ease-in-out_infinite_1.2s]" />
          <div className="absolute -inset-[11px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border-[1.5px] border-solid border-[rgba(217,102,245,0.28)] animate-[ringPulse_4s_ease-in-out_infinite]" />
          <img src={HERO_PHOTO_URL} alt="Shreya Shukla" className="w-full h-full object-cover object-top rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border-[2px] border-solid border-[rgba(217,102,245,0.2)] saturate-[1.05] contrast-[1.02] block" />
          <div className="absolute inset-0 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(ellipse_at_60%_35%,rgba(217,102,245,0.18)_0%,transparent_65%)] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
