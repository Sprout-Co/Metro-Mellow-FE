import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const portalRoot = useRef<HTMLElement | null>(null);
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create portal root if it doesn't exist
    if (!portalRoot.current) {
      const existingRoot = document.getElementById("portal-root");
      if (existingRoot) {
        portalRoot.current = existingRoot;
      } else {
        const div = document.createElement("div");
        div.id = "portal-root";
        div.style.position = "relative";
        div.style.zIndex = "9999";
        document.body.appendChild(div);
        portalRoot.current = div;
      }
    }

    // Create portal element
    el.current = document.createElement("div");
    el.current.style.position = "relative";
    el.current.style.zIndex = "9999";
    portalRoot.current.appendChild(el.current);
    setMounted(true);

    // Cleanup
    return () => {
      if (el.current && portalRoot.current) {
        portalRoot.current.removeChild(el.current);
        el.current = null;
      }
      setMounted(false);
    };
  }, []);

  if (!mounted || !el.current) return null;

  return createPortal(children, el.current);
};

export default Portal;
