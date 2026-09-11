import { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  text: string;
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseAtEndMs?: number;
  pauseAtStartMs?: number;
  loop?: boolean;
  className?: string;
};

const Typewriter = ({
  text,
  typingSpeedMs = 70,
  deletingSpeedMs = 45,
  pauseAtEndMs = 1400,
  pauseAtStartMs = 400,
  loop = true,
  className,
}: TypewriterProps) => {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const atStart = displayed.length === 0;
    const atEnd = displayed.length === text.length;

    if (atEnd && !isDeleting) {
      if (loop) {
        setIsPaused(true);
        timeoutRef.current = window.setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseAtEndMs);
      }
      return;
    }

    if (atStart && isDeleting) {
      setIsPaused(true);
      timeoutRef.current = window.setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(false);
      }, pauseAtStartMs);
      return;
    }

    const tick = () => {
      if (isDeleting) {
        setDisplayed(prev => prev.slice(0, -1));
      } else {
        setDisplayed(prev => text.slice(0, prev.length + 1));
      }
    };

    const delay = isDeleting ? deletingSpeedMs : typingSpeedMs;
    timeoutRef.current = window.setTimeout(tick, delay);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, isPaused, text, typingSpeedMs, deletingSpeedMs, pauseAtEndMs, pauseAtStartMs, loop]);

  useEffect(() => {
    // kick off typing from empty state
    if (displayed.length === 0 && !isDeleting && !isPaused) {
      const id = window.setTimeout(() => setDisplayed(text.slice(0, 1)), typingSpeedMs);
      return () => window.clearTimeout(id);
    }
  }, [displayed.length, isDeleting, isPaused, text, typingSpeedMs]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="inline-block w-[2px] h-[1.1em] align-[-0.15em] bg-current mr-1 animate-cursor-blink"
        aria-hidden="true"
      />
    </span>
  );
};

export default Typewriter;


