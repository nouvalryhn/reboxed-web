'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product, CartItem, User, Order, Address } from './types'

interface StoreContextType {
    // Cart
    cartItems: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getCartTotal: () => number
    getCartItemCount: () => number

    // Selected items for checkout
    selectedItems: string[]
    toggleSelectItem: (productId: string) => void
    selectAllItems: () => void
    deselectAllItems: () => void
    isItemSelected: (productId: string) => boolean
    getSelectedTotal: () => number
    getSelectedItems: () => CartItem[]
    removeSelectedItems: () => void

    // Wishlist
    wishlist: string[]
    toggleWishlist: (productId: string) => void
    isInWishlist: (productId: string) => boolean

    // User
    user: User | null
    setUser: (user: User | null) => void

    // Orders
    orders: Order[]
    addOrder: (order: Order) => void

    // Shipping Address
    shippingAddress: Address | null
    setShippingAddress: (address: Address) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [wishlist, setWishlist] = useState<string[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [shippingAddress, setShippingAddress] = useState<Address | null>(null)

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('reboxed-cart')
        const savedWishlist = localStorage.getItem('reboxed-wishlist')
        const savedOrders = localStorage.getItem('reboxed-orders')
        const savedSelected = localStorage.getItem('reboxed-selected')

        if (savedCart) setCartItems(JSON.parse(savedCart))
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
        if (savedOrders) setOrders(JSON.parse(savedOrders))
        if (savedSelected) setSelectedItems(JSON.parse(savedSelected))

        // Mock user for demo
        setUser({
            id: 'u1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://placehold.co/100x100',
            phone: '+62 812 3456 7890',
            address: {
                street: 'Jl. Sudirman No. 123',
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                postalCode: '12190',
                country: 'Indonesia'
            }
        })
    }, [])

    // Save to localStorage on changes
    useEffect(() => {
        localStorage.setItem('reboxed-cart', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        localStorage.setItem('reboxed-wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    useEffect(() => {
        localStorage.setItem('reboxed-orders', JSON.stringify(orders))
    }, [orders])

    useEffect(() => {
        localStorage.setItem('reboxed-selected', JSON.stringify(selectedItems))
    }, [selectedItems])

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.product.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { product, quantity: 1 }]
        })
        // Auto-select newly added items
        setSelectedItems(prev => {
            if (!prev.includes(product.id)) {
                return [...prev, product.id]
            }
            return prev
        })
    }

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId))
        setSelectedItems(prev => prev.filter(id => id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCartItems(prev =>
            prev.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setCartItems([])
        setSelectedItems([])
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    // Selected items functions
    const toggleSelectItem = (productId: string) => {
        setSelectedItems(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }

    const selectAllItems = () => {
        setSelectedItems(cartItems.map(item => item.product.id))
    }

    const deselectAllItems = () => {
        setSelectedItems([])
    }

    const isItemSelected = (productId: string) => {
        return selectedItems.includes(productId)
    }

    const getSelectedTotal = () => {
        return cartItems
            .filter(item => selectedItems.includes(item.product.id))
            .reduce((total, item) => total + item.product.price * item.quantity, 0)
    }

    const getSelectedItems = () => {
        return cartItems.filter(item => selectedItems.includes(item.product.id))
    }

    const removeSelectedItems = () => {
        setCartItems(prev => prev.filter(item => !selectedItems.includes(item.product.id)))
        setSelectedItems([])
    }

    const toggleWishlist = (productId: string) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }

    const isInWishlist = (productId: string) => {
        return wishlist.includes(productId)
    }

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev])
    }

    return (
        <StoreContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartItemCount,
                selectedItems,
                toggleSelectItem,
                selectAllItems,
                deselectAllItems,
                isItemSelected,
                getSelectedTotal,
                getSelectedItems,
                removeSelectedItems,
                wishlist,
                toggleWishlist,
                isInWishlist,
                user,
                setUser,
                orders,
                addOrder,
                shippingAddress,
                setShippingAddress,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

export function useStore() {
    const context = useContext(StoreContext)
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider')
    }
    return context
}
