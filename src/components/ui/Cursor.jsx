import { useBackground, useCursor, useNeko, useScrollProgress } from '../../hooks';

const TRAIL_DOTS = Array.from({ length: 14 });

export default function Cursor() {
  useCursor();
  useNeko();
  useScrollProgress();
  useBackground();

  return (
    <>
      <div id="scroll-progress" />
      <canvas id="bg-canvas" />
      <div id="cursor-spotlight" />
      <div id="cursor-trail" aria-hidden="true">
        {TRAIL_DOTS.map((_, index) => (
          <span key={index} className="cursor-trail-dot" style={{ '--trail-i': index }} />
        ))}
      </div>
      <div id="cursor">
        <div id="c-ring" />
        <div id="c-dot" />
      </div>
    </>
  );
}