import { useEffect, useRef } from "react";

interface UseErrorScrollReturn {
  errorContainerRef: React.RefObject<HTMLDivElement>;
}

export const useErrorScroll = (
  ...errors: Array<string | null | undefined>
): UseErrorScrollReturn => {
  const errorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasError = errors.some((error) => error);

    if (hasError && errorContainerRef.current) {
      setTimeout(() => {
        errorContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, errors);

  return {
    errorContainerRef,
  };
};

