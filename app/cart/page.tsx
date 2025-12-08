'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useStore } from '@/lib/store'
import { SlideUp, FadeIn } from '@/components/ui/animated-section'
import {
    ShoppingCart,
    Trash2,
    Minus,
    Plus,
    ChevronRight,
    ShoppingBag,
    ArrowLeft,
    Truck,
    Shield,
    Tag,
    Check,
    Square,
    CheckSquare
} from 'lucide-react'

export default function CartPage() {
    const router = useRouter()
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectedItems,
        toggleSelectItem,
        selectAllItems,
        deselectAllItems,
        isItemSelected,
        getSelectedTotal,
        getSelectedItems
    } = useStore()
    const [promoCode, setPromoCode] = useState('')

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const selectedCount = getSelectedItems().length
    const subtotal = getSelectedTotal()
    const shipping = subtotal > 500000 ? 0 : (subtotal > 0 ? 15000 : 0)
    const total = subtotal + shipping

    const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length

    const handleCheckout = () => {
        if (selectedCount === 0) return
        router.push('/checkout')
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50/50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <FadeIn>
                        <div className="text-center max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="h-12 w-12 text-gray-300" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-3">Keranjang Kosong</h1>
                            <p className="text-gray-500 mb-8">
                                Yuk, tambahkan produk ke keranjang belanjamu dan temukan barang preloved berkualitas!
                            </p>
                            <Link href="/">
                                <Button size="lg" className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                                    Mulai Belanja
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <FadeIn>
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Keranjang</span>
                    </nav>
                </FadeIn>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
                            <p className="text-gray-500">{cartItems.length} item • {selectedCount} dipilih</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={clearCart}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus Semua
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Select All */}
                        <Card className="border-gray-100">
                            <CardContent className="p-4">
                                <button
                                    onClick={() => allSelected ? deselectAllItems() : selectAllItems()}
                                    className="flex items-center gap-3 w-full text-left"
                                >
                                    {allSelected ? (
                                        <CheckSquare className="h-5 w-5 text-emerald-600" />
                                    ) : (
                                        <Square className="h-5 w-5 text-gray-400" />
                                    )}
                                    <span className="font-medium text-gray-900">
                                        Pilih Semua ({cartItems.length} item)
                                    </span>
                                </button>
                            </CardContent>
                        </Card>

                        <AnimatePresence mode="popLayout">
                            {cartItems.map((item, index) => {
                                const isSelected = isItemSelected(item.product.id)
                                return (
                                    <motion.div
                                        key={item.product.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20, height: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Card className={`overflow-hidden transition-all ${isSelected ? 'border-emerald-300 bg-emerald-50/30' : 'border-gray-100'}`}>
                                            <CardContent className="p-4">
                                                <div className="flex gap-4">
                                                    {/* Checkbox */}
                                                    <button
                                                        onClick={() => toggleSelectItem(item.product.id)}
                                                        className="flex-shrink-0 self-center"
                                                    >
                                                        {isSelected ? (
                                                            <CheckSquare className="h-6 w-6 text-emerald-600" />
                                                        ) : (
                                                            <Square className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                                                        )}
                                                    </button>

                                                    <Link href={`/product/${item.product.id}`}>
                                                        <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                            <img
                                                                src={item.product.image}
                                                                alt={item.product.name}
                                                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between gap-2">
                                                            <div className="min-w-0">
                                                                <Link href={`/product/${item.product.id}`}>
                                                                    <h3 className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2">
                                                                        {item.product.name}
                                                                    </h3>
                                                                </Link>
                                                                <p className="text-sm text-gray-500 mt-1">{item.product.seller.name}</p>
                                                                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${item.product.condition === 'Like New'
                                                                    ? 'bg-emerald-50 text-emerald-600'
                                                                    : 'bg-blue-50 text-blue-600'
                                                                    }`}>
                                                                    {item.product.condition}
                                                                </span>
                                                            </div>
                                                            <button
                                                                onClick={() => removeFromCart(item.product.id)}
                                                                className="p-2 hover:bg-rose-50 rounded-lg transition-colors text-gray-400 hover:text-rose-500"
                                                            >
                                                                <Trash2 className="h-5 w-5" />
                                                            </button>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-4">
                                                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-1">
                                                                <button
                                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md transition-colors"
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </button>
                                                                <span className="w-10 text-center font-medium">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md transition-colors"
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-lg font-bold text-emerald-600">
                                                                    {formatPrice(item.product.price * item.quantity)}
                                                                </div>
                                                                {item.quantity > 1 && (
                                                                    <div className="text-xs text-gray-400">
                                                                        {formatPrice(item.product.price)} × {item.quantity}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <SlideUp delay={0.2}>
                            <Card className="sticky top-24 border-gray-100">
                                <CardContent className="p-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                                    {/* Promo Code */}
                                    <div className="mb-6">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Kode promo"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all"
                                                />
                                            </div>
                                            <Button variant="outline" className="rounded-xl">
                                                Pakai
                                            </Button>
                                        </div>
                                    </div>

                                    {selectedCount === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <Square className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                            <p>Pilih item untuk checkout</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-3 pb-4 border-b border-gray-100">
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Subtotal ({selectedCount} item)</span>
                                                    <span>{formatPrice(subtotal)}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Estimasi Ongkir</span>
                                                    <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>
                                                        {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between py-4 text-lg font-bold">
                                                <span>Total</span>
                                                <span className="text-emerald-600">{formatPrice(total)}</span>
                                            </div>

                                            {shipping === 0 && subtotal > 0 && (
                                                <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg mb-4">
                                                    <Truck className="h-4 w-4" />
                                                    <span>Gratis ongkir untuk pembelian di atas Rp 500.000</span>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <Button
                                        size="lg"
                                        className="w-full rounded-xl h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleCheckout}
                                        disabled={selectedCount === 0}
                                    >
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        Checkout ({selectedCount} item)
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                                        <Shield className="h-4 w-4" />
                                        <span>Transaksi aman & terlindungi</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </SlideUp>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
