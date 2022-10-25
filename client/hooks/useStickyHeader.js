import { useEffect, useState } from 'react';

function useStickyHeader() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const toggleHeaderStickiness = () => {
      setIsHeaderSticky(window.scrollY >= 300);
    };

    window.addEventListener('scroll', toggleHeaderStickiness);

    return () => {
      window.removeEventListener('scroll', toggleHeaderStickiness);
    };
  }, []);

  return isHeaderSticky;
}

export { useStickyHeader };
