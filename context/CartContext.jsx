"use client"

import { useAuth } from "@/context/AuthContext"
import { apiFetch } from "@/lib/fetchClient"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState({ cart_items: [], item_subtotal: 0 })
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!user || user.role !== "customer") {
      setCart({ cart_items: [], item_subtotal: 0 })
      return
    }
    setLoading(true)
    try {
      const data = await apiFetch("/cart/")
      // Normalise response shape
      if (Array.isArray(data)) {
        setCart({ cart_items: data, item_subtotal: 0 })
      } else if (data && typeof data === "object") {
        setCart({
          cart_items: data.cart_items || data.results || [],
          item_subtotal: data.item_subtotal ?? data.subtotal ?? 0,
        })
      } else {
        setCart({ cart_items: [], item_subtotal: 0 })
      }
    } catch (_err) {
      setCart({ cart_items: [], item_subtotal: 0 })
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      await apiFetch("/cart/", {
        method: "POST",
        body: { product: productId, quantity },
      })
      await fetchCart()
        toast.success("Added to cart")
      },
    [fetchCart],
  )

  const updateItem = useCallback(
    async (cartItemId, quantity) => {
      await apiFetch(`/cart/${cartItemId}/`, {
        method: "PUT",
        body: { quantity },
      })
      await fetchCart()
    },
    [fetchCart],
  )

  const removeItem = useCallback(
    async (cartItemId) => {
      await apiFetch(`/cart/${cartItemId}/`, { method: "DELETE" })
      await fetchCart()
    },
    [fetchCart],
  )

  const itemCount = cart.cart_items.reduce((sum, it) => sum + (it.quantity || 0), 0)

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateItem,
    removeItem,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
