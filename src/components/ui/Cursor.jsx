import { useCursor, useScrollProgress, useBackground } from '../../hooks';

export default function Cursor() {
  useCursor();
  useScrollProgress();
  useBackground();

  return (
    <>
      <div id="scroll-progress" />
      <canvas id="bg-canvas" />
      <div id="cursor">
        <div id="c-ring" />
        <div id="c-dot" />
      </div>
    </>
  );
}