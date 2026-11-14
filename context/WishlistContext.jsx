'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'zarin-wishlist-v1';

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setIds([...new Set(parsed.filter((id) => typeof id === 'string'))]);
        }
      }
    } catch {
      // داده‌های محلی نامعتبرند؛ با فهرست خالی شروع می‌کنیم.
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // حالت خصوصی مرورگر؛ فهرست فقط در حافظه باقی می‌ماند.
    }
  }, [ids, isHydrated]);

  const toggle = useCallback((id) => {
    setIds((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]
    );
  }, []);

  const remove = useCallback((id) => {
    setIds((previous) => previous.filter((item) => item !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);
  const has = useCallback((id) => ids.includes(id), [ids]);

  const value = useMemo(
    () => ({ ids, count: ids.length, isHydrated, has, toggle, remove, clear }),
    [ids, isHydrated, has, toggle, remove, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist باید داخل WishlistProvider استفاده شود.');
  }
  return context;
}
