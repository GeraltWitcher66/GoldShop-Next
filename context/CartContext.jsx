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

function sanitizeItem(item) {
  if (!item || typeof item.id !== 'string') return null;
  if (!Number.isFinite(item.price) || item.price <= 0) return null;

  const qty = Number.isFinite(item.qty) ? Math.floor(item.qty) : 1;
  if (qty < 1) return null;

  return {
    id: item.id,
    slug: typeof item.slug === 'string' ? item.slug : '',
    name: typeof item.name === 'string' ? item.name : '',
    image: typeof item.image === 'string' ? item.image : '',
    karat: Number.isFinite(item.karat) ? item.karat : 18,
    price: item.price,
    qty: Math.min(qty, MAX_QTY),
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

  const addItem = useCallback((product) => {
    setItems((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id ? { ...item, qty: Math.min(item.qty + 1, MAX_QTY) } : item
        );
      }

      return [
        ...previous,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          karat: product.karat,
          price: getProductPrice(product),
          qty: 1,
        },
      ];
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
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

  const submitOrder = useCallback(() => {
    setItems([]);
    setIsOpen(false);
    showToast('سفارش شما ثبت شد. برای هماهنگی با شما تماس می‌گیریم.');
  }, [showToast]);

  // بستن خودکار پیام موفقیت
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
      toast,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      submitOrder,
      openCart,
      closeCart,
      dismissToast,
    }),
    [
      items,
      count,
      total,
      isOpen,
      toast,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      submitOrder,
      openCart,
      closeCart,
      dismissToast,
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
