// useBreakpoint.js
import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [bp, setBp] = useState("lg");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile");
      else if (w < 1200) setBp("tablet");
      else if (w < 1500) setBp("laptop");
      else setBp("desktop");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}
