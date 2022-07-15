import { useEffect, useState } from "react";

const useScroll = (className) => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (event) => {
      setScrollTop(event.target.scrollTop);
    };

    const element = document.getElementById(className);
    element && element.addEventListener("scroll", onScroll);

    return () => {
      element && element.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { scrollTop };
};

export default useScroll;
