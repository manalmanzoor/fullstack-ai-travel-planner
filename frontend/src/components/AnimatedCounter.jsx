import { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";

function AnimatedCounter({ end, suffix = "", duration = 1400 }) {
  const [ref, visible] = useReveal(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(end);
    };

    requestAnimationFrame(step);
  }, [visible, end, duration]);

  return (
    <span ref={ref} className="font-display text-4xl text-secondary">
      {value}{suffix}
    </span>
  );
}

export default AnimatedCounter;