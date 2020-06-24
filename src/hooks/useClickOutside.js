import { useState, useEffect, useRef } from 'react';

export default function (initialIsVisible) {
  const [openDropdown, setOpenDropdown] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current !== null && !ref.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return [ref, openDropdown, setOpenDropdown];
}
