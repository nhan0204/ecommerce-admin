import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMoundted] = useState(false);
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : '';

  useEffect(() => {
    setMoundted(true);
  }, []);

  if (!mounted) {
    return '';
  }

  return origin;
}