'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'zarin-cart-v1';
const MAX_QTY = 99;

function getProductPrice(product) {
  const percent = product.isSpecialOffer
    ? Math.min(Math.max(Number(product.discountPercent) || 0, 0), 100)
    : 0;
  return Math.round(product.price * (1 - percent / 100));
}

function buildKey(id, optionValue) {
  return `${id}__${optionValue || 'default'}`;
}

function sanitizeItem(item) {
  if (!item || typeof item.id !== 'string') return null;
  if (!Number.isFinite(item.price) || item.price <= 0) return null;

  const qty = Number.isFinite(item.qty) ? Math.floor(item.qty) : 1;
  if (qty < 1) return null;

  const optionValue = typeof item.optionValue === 'string' ? item.optionValue : '';
  const optionLabel = typeof item.optionLabel === 'string' ? item.optionLabel : '';

  return {
    key: typeof item.key === 'string' && item.key ? item.key : buildKey(item.id, optionValue),
    id: item.id,
    slug: typeof item.slug === 'string' ? item.slug : '',
    name: typeof item.name === 'string' ? item.name : '',
    image: typeof item.image === 'string' ? item.image : '',
    karat: Number.isFinite(item.karat) ? item.karat : 18,
    price: item.price,
    qty: Math.min(qty, MAX_QTY),
    optionLabel,
    optionValue,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  // بارگذاری اولیه از localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed.map(sanitizeItem).filter(Boolean));
        }
      }
    } catch {
      // داده ذخیره‌شده معتبر نبود؛ سبد خالی شروع می‌شود
    }
    setIsHydrated(true);
  }, []);

  // ذخیره خودکار پس از هر تغییر (فقط بعد از hydrate)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // حافظه پر است یا حالت خصوصی مرورگر؛ سبد در حافظه کار می‌کند
    }
  }, [items, isHydrated]);

  const addItem = useCallback((product, options = {}) => {
    const optionValue = options.optionValue || '';
    const optionLabel = options.optionLabel || '';
    const key = buildKey(product.id, optionValue);

    setItems((previous) => {
      const existing = previous.find((item) => item.key === key);

      if (existing) {
        return previous.map((item) =>
          item.key === key ? { ...item, qty: Math.min(item.qty + 1, MAX_QTY) } : item
        );
      }

      return [
        ...previous,
        {
          key,
          id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          karat: product.karat,
          price: getProductPrice(product),
          qty: 1,
          optionLabel,
          optionValue,
        },
      ];
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems((previous) => previous.filter((item) => item.key !== key));
  }, []);

  const updateQty = useCallback((key, delta) => {
    setItems((previous) =>
      previous.map((item) =>
        item.key === key
          ? { ...item, qty: Math.min(MAX_QTY, Math.max(1, item.qty + delta)) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const showToast = useCallback((text) => {
    setToast({ id: Date.now(), text });
  }, []);

  // بستن خودکار پیام
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 6500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      total,
      isOpen,
      isHydrated,
      toast,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      openCart,
      closeCart,
      dismissToast,
      showToast,
    }),
    [
      items,
      count,
      total,
      isOpen,
      isHydrated,
      toast,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      openCart,
      closeCart,
      dismissToast,
      showToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart باید داخل CartProvider استفاده شود.');
  }
  return context;
}
