import { useLayoutEffect } from 'react';

export default function useScrollLock(lock) {
  useLayoutEffect(() => {
   const originalStyle = window.getComputedStyle(document.querySelector('html')).overflow

   lock ? (document.querySelector('html').style.overflow = 'hidden') : (document.querySelector('html').style.overflow = originalStyle)

   return () => document.querySelector('html').style.overflow = originalStyle;
   }, [lock]);
}