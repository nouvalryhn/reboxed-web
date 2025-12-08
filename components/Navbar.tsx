'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store'
import {
    Search,
    ShoppingCart,
    User,
    MessageCircle,
    Menu,
    X,
    Package,
    Heart,
    LogOut,
    Settings
} from 'lucide-react'

function NavbarContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
    const { getCartItemCount } = useStore()

    const cartCount = getCartItemCount()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`)
        } else {
            router.push('/')
        }
        setShowMobileMenu(false)
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                        </motion.div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                ReBoxed
                            </h1>
                            <p className="text-[10px] text-gray-500 font-medium tracking-wide">PRELOVED MARKETPLACE</p>
                        </div>
                    </Link>

                    {/* Desktop Search */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                                type="text"
                                placeholder="Cari produk preloved berkualitas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-11 pr-4 h-11 bg-gray-50/80 border-gray-200 focus:bg-white focus:border-emerald-300 focus:ring-emerald-100 rounded-xl transition-all w-full"
                            />
                        </div>
                    </form>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/messages">
                            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-xl">
                                <MessageCircle className="h-5 w-5 text-gray-600" />
                            </Button>
                        </Link>

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-xl">
                                <ShoppingCart className="h-5 w-5 text-gray-600" />
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </Button>
                        </Link>

                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-100 rounded-xl"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <User className="h-5 w-5 text-gray-600" />
                            </Button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                                    >
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <User className="h-4 w-4" />
                                            Profil Saya
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <Heart className="h-4 w-4" />
                                            Wishlist
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <Settings className="h-4 w-4" />
                                            Pengaturan
                                        </Link>
                                        <hr className="my-2 border-gray-100" />
                                        <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors w-full">
                                            <LogOut className="h-4 w-4" />
                                            Keluar
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/sell">
                            <Button className="ml-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 rounded-xl font-medium">
                                Jual Barang
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {showMobileMenu && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden py-4 border-t border-gray-100 overflow-hidden"
                        >
                            <div className="space-y-4">
                                <form onSubmit={handleSearch}>
                                    <Input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-11 rounded-xl"
                                    />
                                </form>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link href="/messages" onClick={() => setShowMobileMenu(false)}>
                                        <Button variant="outline" className="w-full rounded-xl">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Pesan
                                        </Button>
                                    </Link>
                                    <Link href="/cart" onClick={() => setShowMobileMenu(false)}>
                                        <Button variant="outline" className="w-full relative rounded-xl">
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Keranjang
                                            {cartCount > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </Button>
                                    </Link>
                                </div>
                                <Link href="/profile" onClick={() => setShowMobileMenu(false)}>
                                    <Button variant="outline" className="w-full rounded-xl">
                                        <User className="h-4 w-4 mr-2" />
                                        Profil Saya
                                    </Button>
                                </Link>
                                <Link href="/sell" onClick={() => setShowMobileMenu(false)}>
                                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl">
                                        Jual Barang
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export function Navbar() {
    return (
        <Suspense fallback={
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm h-16" />
        }>
            <NavbarContent />
        </Suspense>
    )
}
