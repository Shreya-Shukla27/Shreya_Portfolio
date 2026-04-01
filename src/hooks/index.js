import { useEffect, useRef, useState } from 'react';
import { neko } from 'onekojs';

// ─── useNavScroll ───
export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = null;
    const update = () => setScrolled(window.scrollY > 30);
    const handler = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        update();
      });
    };
    update();
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handler);
    };
  }, []);
  return scrolled;
}

// ─── useActiveSection ───
export function useActiveSection(links = [], defaultHref = '#about') {
  const [activeHref, setActiveHref] = useState(defaultHref);

  useEffect(() => {
    const sectionRefs = links
      .map((link) => ({ href: link.href, el: document.querySelector(link.href) }))
      .filter((item) => Boolean(item.el));

    if (!sectionRefs.length) return;

    let frame = null;

    const updateActive = () => {
      const focusLine = window.innerHeight * 0.36;
      let currentHref = sectionRefs[0].href;

      for (let i = 0; i < sectionRefs.length; i++) {
        const section = sectionRefs[i];
        const rect = section.el.getBoundingClientRect();

        if (rect.top <= focusLine) {
          currentHref = section.href;
        }

        if (rect.top <= focusLine && rect.bottom >= focusLine) {
          currentHref = section.href;
          break;
        }
      }

      setActiveHref((prev) => (prev === currentHref ? prev : currentHref));
    };

    const onScrollOrResize = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [links, defaultHref]);

  return activeHref;
}

// ─── useScrollProgress ───
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    let frame = null;

    const update = () => {
      const total = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const pct = (window.scrollY / total) * 100;
      bar.style.width = `${Math.min(Math.max(pct, 0), 100)}%`;
    };

    const handler = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        update();
      });
    };

    update();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);
}

// ─── useBackground ─── floating orbs + aurora waves
export function useBackground() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const lowPowerMode = prefersReducedMotion || !hasFinePointer || window.innerWidth < 900;

    // ── Resize ──────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    if (lowPowerMode) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return () => {
        window.removeEventListener('resize', resize);
      };
    }

    // ── Orbs ─────────────────────────────────────────────
    const ORB_COUNT = 6;
    const orbs = Array.from({ length: ORB_COUNT }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 220 + 120,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      color: i % 3 === 0
        ? 'rgba(217,102,245,'   // purple
        : i % 3 === 1
          ? 'rgba(160,102,245,' // violet
          : 'rgba(245,102,184,',// pink
      alpha: Math.random() * 0.07 + 0.04,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.004 + 0.002,
    }));

    // ── Aurora waves ─────────────────────────────────────
    const WAVE_COUNT = 3;
    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => ({
      amplitude: Math.random() * 60 + 40,
      frequency: Math.random() * 0.003 + 0.001,
      speed: Math.random() * 0.0006 + 0.0003,
      yBase: 0.25 + i * 0.25,        // 25%, 50%, 75% of screen height
      phase: Math.random() * Math.PI * 2,
      color: i === 0
        ? 'rgba(217,102,245,'
        : i === 1
          ? 'rgba(160,66,245,'
          : 'rgba(245,102,184,',
      alpha: 0.028 + i * 0.008,
      thickness: 90 + i * 30,
    }));

    let raf;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Draw aurora waves ───────────────────────────
      waves.forEach(w => {
        w.phase += w.speed;
        const yBase = w.yBase * canvas.height;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = yBase
            + Math.sin(x * w.frequency + w.phase) * w.amplitude
            + Math.sin(x * w.frequency * 0.5 + w.phase * 1.3) * (w.amplitude * 0.4);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        // Glowing stroke
        ctx.strokeStyle = w.color + (w.alpha * 1.8) + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Soft glow band below the line
        const grad = ctx.createLinearGradient(0, yBase - w.thickness, 0, yBase + w.thickness);
        grad.addColorStop(0, w.color + '0)');
        grad.addColorStop(0.5, w.color + w.alpha + ')');
        grad.addColorStop(1, w.color + '0)');

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = yBase
            + Math.sin(x * w.frequency + w.phase) * w.amplitude
            + Math.sin(x * w.frequency * 0.5 + w.phase * 1.3) * (w.amplitude * 0.4);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, yBase + w.thickness);
        ctx.lineTo(0, yBase + w.thickness);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // ── Draw orbs ───────────────────────────────────
      orbs.forEach(orb => {
        orb.phase += orb.speed;
        orb.x += orb.dx + Math.sin(orb.phase) * 0.3;
        orb.y += orb.dy + Math.cos(orb.phase * 0.7) * 0.3;

        // Wrap around edges
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;

        // Breathe alpha
        const breathe = orb.alpha + Math.sin(orb.phase * 2) * (orb.alpha * 0.4);

        const grad = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.r
        );
        grad.addColorStop(0, orb.color + (breathe * 1.6) + ')');
        grad.addColorStop(0.5, orb.color + breathe + ')');
        grad.addColorStop(1, orb.color + '0)');

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
}

export function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('c-dot');
    const ring = document.getElementById('c-ring');
    const spotlight = document.getElementById('cursor-spotlight');
    const trail = document.getElementById('cursor-trail');
    const trailDots = trail ? Array.from(trail.querySelectorAll('.cursor-trail-dot')) : [];
    if (!dot || !ring) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) {
      document.body.style.cursor = 'auto';
      dot.style.display = 'none';
      ring.style.display = 'none';
      if (spotlight) spotlight.style.display = 'none';
      if (trail) trail.style.display = 'none';
      return () => {
        document.body.style.cursor = '';
        dot.style.display = '';
        ring.style.display = '';
        if (spotlight) spotlight.style.display = '';
        if (trail) trail.style.display = '';
      };
    }

    document.body.style.cursor = 'none';
    dot.style.display = '';
    ring.style.display = '';
    if (spotlight) spotlight.style.display = '';
    if (trail) trail.style.display = '';

    let mx = window.innerWidth * 0.5;
    let my = window.innerHeight * 0.5;
    let dotX = mx;
    let dotY = my;
    let ringX = mx;
    let ringY = my;
    let spotX = mx;
    let spotY = my;
    let isHovering = false;
    let raf;
    const trailPoints = trailDots.map(() => ({ x: mx, y: my }));
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-mag], [tabindex]:not([tabindex="-1"])';

    const setHoverStyles = (hovering) => {
      if (hovering) {
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.borderColor = 'rgba(217, 102, 245, 0.85)';
        ring.style.background = 'rgba(217, 102, 245, 0.1)';
        dot.style.width = '5px';
        dot.style.height = '5px';
      } else {
        ring.style.width = '34px';
        ring.style.height = '34px';
        ring.style.borderColor = 'rgba(217, 102, 245, 0.45)';
        ring.style.background = 'transparent';
        dot.style.width = '7px';
        dot.style.height = '7px';
      }

      if (spotlight) {
        spotlight.classList.toggle('interactive', hovering);
      }
    };

    setHoverStyles(false);

    const animate = () => {
      dotX += (mx - dotX) * 0.42;
      dotY += (my - dotY) * 0.42;
      ringX += (mx - ringX) * 0.16;
      ringY += (my - ringY) * 0.16;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      if (spotlight) {
        spotX += (mx - spotX) * 0.11;
        spotY += (my - spotY) * 0.11;
        spotlight.style.left = `${spotX}px`;
        spotlight.style.top = `${spotY}px`;
      }

      if (trailDots.length) {
        let leadX = dotX;
        let leadY = dotY;

        trailDots.forEach((trailDot, index) => {
          const trailPoint = trailPoints[index];
          const easing = Math.max(0.08, 0.28 - index * 0.015);

          trailPoint.x += (leadX - trailPoint.x) * easing;
          trailPoint.y += (leadY - trailPoint.y) * easing;

          trailDot.style.left = `${trailPoint.x}px`;
          trailDot.style.top = `${trailPoint.y}px`;

          leadX = trailPoint.x;
          leadY = trailPoint.y;
        });
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      if (!(e.target instanceof Element)) return;
      const hovering = Boolean(e.target.closest(interactiveSelector));
      if (hovering !== isHovering) {
        isHovering = hovering;
        setHoverStyles(hovering);
      }
    };

    const onClick = (e) => {
      spawnBurst(e.clientX, e.clientY);
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      if (spotlight) spotlight.style.opacity = '0';
      if (trail) trail.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      if (spotlight) spotlight.style.opacity = '';
      if (trail) trail.style.opacity = '';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.style.cursor = '';
      dot.style.display = '';
      ring.style.display = '';
      dot.style.opacity = '';
      ring.style.opacity = '';
      dot.style.left = '';
      dot.style.top = '';
      ring.style.left = '';
      ring.style.top = '';
      dot.style.width = '';
      dot.style.height = '';
      ring.style.width = '';
      ring.style.height = '';
      ring.style.borderColor = '';
      ring.style.background = '';
      if (spotlight) {
        spotlight.classList.remove('interactive');
        spotlight.style.display = '';
        spotlight.style.left = '';
        spotlight.style.top = '';
        spotlight.style.opacity = '';
      }
      if (trail) {
        trail.style.display = '';
        trail.style.opacity = '';
      }
      trailDots.forEach((trailDot) => {
        trailDot.style.left = '';
        trailDot.style.top = '';
      });
    };
  }, []);

}

export function useNeko() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    let onekoElement = document.getElementById('oneko');

    if (!onekoElement) {
      neko({
        speed: 4.3,
        width: 40,
        height: 40,
        x: window.innerWidth * 0.48,
        y: window.innerHeight * 0.42,
      });
      onekoElement = document.getElementById('oneko');
    }

    if (!onekoElement) return;

    onekoElement.style.pointerEvents = 'none';
    onekoElement.style.opacity = '1';

    const onLeave = () => {
      onekoElement.style.opacity = '0.45';
    };

    const onEnter = () => {
      onekoElement.style.opacity = '1';
    };

    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);

      if (onekoElement) {
        onekoElement.style.pointerEvents = 'none';
        onekoElement.style.opacity = '';
      }
    };
  }, []);
}

// ─── helper functions ───
function spawnBurst(x, y) {
  const el = document.createElement('div');
  el.className = 'click-burst';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

// ─── useReveal ───
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── useTyping ───
export function useTyping(phrases, speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const ref = useRef({ phraseIdx: 0, charIdx: 0, deleting: false, timer: null });

  useEffect(() => {
    if (!phrases?.length) return;
    const r = ref.current;

    const tick = () => {
      const phrase = phrases[r.phraseIdx];
      if (!r.deleting) {
        setText(phrase.slice(0, r.charIdx + 1));
        r.charIdx++;
        if (r.charIdx === phrase.length) {
          r.deleting = true;
          r.timer = setTimeout(tick, pause);
          return;
        }
      } else {
        setText(phrase.slice(0, r.charIdx - 1));
        r.charIdx--;
        if (r.charIdx === 0) {
          r.deleting = false;
          r.phraseIdx = (r.phraseIdx + 1) % phrases.length;
        }
      }
      r.timer = setTimeout(tick, r.deleting ? speed / 2 : speed);
    };

    r.timer = setTimeout(tick, speed);
    return () => clearTimeout(r.timer);
  }, [phrases, speed, pause]);

  return text;
}

// ─── useCountUp ───
export function useCountUp(target, decimal = 0, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current || hasRun.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun.current) return;
      hasRun.current = true;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setValue(parseFloat((ease * target).toFixed(decimal)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.disconnect();
    }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimal, duration]);

  return { value, ref };
}

// ─── useCardTilt ───
export function useCardTilt(options = {}) {
  const {
    maxTilt = 7,
    perspective = 900,
    translateZ = 5,
  } = options;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      el.style.transform = '';
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
      return;
    }

    let raf = null;
    let rotX = 0;
    let rotY = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      rotX += (targetX - rotX) * 0.18;
      rotY += (targetY - rotY) * 0.18;
      el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${translateZ}px)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      targetX = ((y - cy) / cy) * -maxTilt;
      targetY = ((x - cx) / cx) * maxTilt;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
    };

    raf = requestAnimationFrame(render);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
    };
  }, [maxTilt, perspective, translateZ]);

  return ref;
}

// ─── useMagneticButtons ───
export function useMagneticButtons() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !hasFinePointer) return;

    const btns = document.querySelectorAll('[data-mag]');
    const handlers = [];
    btns.forEach(btn => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      };
      const onLeave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      handlers.push({ btn, onMove, onLeave });
    });
    return () => {
      handlers.forEach(({ btn, onMove, onLeave }) => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
        btn.style.transform = '';
      });
    };
  }, []);
}