import { useEffect, useRef } from 'react';

export default function Loader({ onDone }) {
  const barRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => onDone?.(), 300);
      }
      if (barRef.current) barRef.current.style.width = progress + '%';
      if (pctRef.current) pctRef.current.textContent = Math.floor(progress) + '%';
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div 
      id="loader"
      className="fixed inset-0 z-[10000] !bg-[rgba(13,10,20,0.92)] backdrop-blur-[30px] flex flex-col items-center justify-center gap-[24px] 
                 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]
                 [&.done]:opacity-0 [&.done]:pointer-events-none [&.done]:scale-[1.02]"
    >
      <div className="font-['Instrument_Serif',Georgia,serif] text-[clamp(28px,5vw,52px)] italic bg-[linear-gradient(135deg,#d966f5,#f566b8)] bg-clip-text text-transparent tracking-[-0.02em]">
        Shreya Shukla
      </div>
      <div className="w-[200px] h-[2px] bg-[rgba(217,102,245,0.15)] rounded-[2px] overflow-hidden">
        <div 
          className="h-full w-0 bg-[linear-gradient(135deg,#d966f5,#f566b8)] rounded-[2px] transition-[width] duration-75 ease-linear" 
          ref={barRef} 
        />
      </div>
      <div className="font-mono text-[12px] text-[#8a7aa0] tracking-[0.08em]" ref={pctRef}>
        0%
      </div>
    </div>
  );
}
