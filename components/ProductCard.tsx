'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStore } from '@/lib/store'
import { Product } from '@/lib/types'
import {
    Star,
    Heart,
    ShoppingCart,
    MessageCircle,
    Crown,
    Camera,
    Clock,
    MapPin,
    BadgeCheck
} from 'lucide-react'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart, toggleWishlist, isInWishlist } = useStore()
    const liked = isInWishlist(product.id)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
    }

    const handleToggleLike = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(product.id)
    }

    return (
        <Link href={`/product/${product.id}`}>
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                <Card className="group relative overflow-hidden bg-white border-gray-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 rounded-2xl">
                    {/* Premium Badge */}
                    {product.isPremium && (
                        <div className="absolute top-3 left-3 z-20">
                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-amber-500/30">
                                <Crown className="h-3.5 w-3.5" />
                                Premium
                            </div>
                        </div>
                    )}

                    {/* Like Button */}
                    <motion.button
                        onClick={handleToggleLike}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        <Heart
                            className={`h-4 w-4 transition-colors ${liked ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-400'}`}
                        />
                    </motion.button>

                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Real Picture Badge */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                            <Camera className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-white text-xs font-medium">Real Picture</span>
                        </div>

                        {/* Discount Badge */}
                        <div className="absolute top-3 right-14 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                            -{product.discount}%
                        </div>
                    </div>

                    <CardHeader className="pb-2 pt-4">
                        {/* Condition Badge */}
                        <div className="flex items-center justify-between mb-2">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.condition === 'Like New'
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                    : product.condition === 'Good'
                                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                                }`}>
                                {product.condition}
                            </span>
                            <div className="flex items-center gap-1 text-gray-500">
                                <MapPin className="h-3 w-3" />
                                <span className="text-xs">{product.location}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-base font-semibold line-clamp-2 leading-snug text-gray-800 group-hover:text-emerald-600 transition-colors">
                            {product.name}
                        </CardTitle>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">
                                {product.rating} ({product.reviewCount})
                            </span>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-0 pb-3">
                        {/* Price */}
                        <div className="mb-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-emerald-600">{formatPrice(product.price)}</span>
                            </div>
                            <div className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</div>
                        </div>

                        {/* Seller Info */}
                        <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl">
                            <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                                <AvatarImage src={product.seller.avatar} />
                                <AvatarFallback className="bg-emerald-100 text-emerald-600 text-xs">
                                    {product.seller.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-medium text-gray-700 truncate">{product.seller.name}</span>
                                    {product.seller.verified && (
                                        <BadgeCheck className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="flex items-center gap-0.5">
                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                        <span>{product.seller.rating}</span>
                                    </div>
                                    <span className="text-gray-300">•</span>
                                    <div className="flex items-center gap-0.5">
                                        <Clock className="h-3 w-3" />
                                        <span>{product.seller.responseTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex gap-2 pt-0 pb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-xl border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}
                        >
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            Chat
                        </Button>
                        <Button
                            size="sm"
                            className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="h-4 w-4 mr-1.5" />
                            Beli
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </Link>
    )
}
