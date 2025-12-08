'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import { useStore } from '@/lib/store'
import { mockProducts } from '@/lib/data'
import { SlideUp, FadeIn } from '@/components/ui/animated-section'
import {
    Star,
    Heart,
    ShoppingCart,
    MessageCircle,
    Shield,
    Truck,
    RotateCcw,
    Clock,
    MapPin,
    BadgeCheck,
    ChevronLeft,
    ChevronRight,
    Share2,
    Minus,
    Plus,
    Check
} from 'lucide-react'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [quantity, setQuantity] = useState(1)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [showAddedToCart, setShowAddedToCart] = useState(false)
    const { addToCart, toggleWishlist, isInWishlist } = useStore()

    const product = mockProducts.find(p => p.id === id)
    const relatedProducts = mockProducts.filter(p => p.category === product?.category && p.id !== id).slice(0, 4)

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h1>
                    <Link href="/">
                        <Button>Kembali ke Beranda</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        setShowAddedToCart(true)
        setTimeout(() => setShowAddedToCart(false), 2000)
    }

    const handleBuyNow = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        router.push('/cart')
    }

    const liked = isInWishlist(product.id)

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <FadeIn>
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-400">{product.category}</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
                    </nav>
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Image Gallery */}
                    <SlideUp>
                        <div className="space-y-4">
                            <motion.div
                                className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg"
                                layoutId={`product-image-${product.id}`}
                            >
                                <img
                                    src={product.images[selectedImageIndex] || product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Navigation Arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${product.condition === 'Like New'
                                            ? 'bg-emerald-500 text-white'
                                            : product.condition === 'Good'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-amber-500 text-white'
                                        }`}>
                                        {product.condition}
                                    </span>
                                    <span className="bg-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                                        -{product.discount}%
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleWishlist(product.id)}
                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                                    >
                                        <Heart className={`h-5 w-5 ${liked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                                    </motion.button>
                                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <Share2 className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex gap-3">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImageIndex(i)}
                                            className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImageIndex ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-transparent'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </SlideUp>

                    {/* Product Info */}
                    <SlideUp delay={0.1}>
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                                            />
                                        ))}
                                        <span className="ml-2 text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                                    </div>
                                </div>

                                <div className="flex items-baseline gap-4">
                                    <span className="text-3xl md:text-4xl font-bold text-emerald-600">{formatPrice(product.price)}</span>
                                    <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                                </div>
                            </div>

                            {/* Seller Card */}
                            <Card className="border-gray-100">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                                            <AvatarImage src={product.seller.avatar} />
                                            <AvatarFallback className="bg-emerald-100 text-emerald-600">
                                                {product.seller.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-900">{product.seller.name}</span>
                                                {product.seller.verified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                    <span>{product.seller.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{product.seller.responseTime}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{product.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="rounded-xl">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Chat
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Description */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Deskripsi</h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: Shield, label: 'Pembayaran Aman' },
                                    { icon: Truck, label: 'Pengiriman Cepat' },
                                    { icon: RotateCcw, label: 'Garansi Return' },
                                ].map((feature) => (
                                    <div key={feature.label} className="text-center p-3 bg-gray-50 rounded-xl">
                                        <feature.icon className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                                        <span className="text-xs text-gray-600">{feature.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quantity & Actions */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600">Jumlah:</span>
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-12 text-center font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-400">Stok: {product.stock}</span>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="flex-1 rounded-xl h-12 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                                        onClick={handleAddToCart}
                                    >
                                        {showAddedToCart ? (
                                            <>
                                                <Check className="h-5 w-5 mr-2 text-emerald-600" />
                                                Ditambahkan!
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="h-5 w-5 mr-2" />
                                                Keranjang
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="flex-1 rounded-xl h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25"
                                        onClick={handleBuyNow}
                                    >
                                        Beli Sekarang
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SlideUp>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Serupa</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
