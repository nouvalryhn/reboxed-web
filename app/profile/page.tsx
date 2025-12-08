'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useStore } from '@/lib/store'
import { mockProducts } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { SlideUp, FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animated-section'
import {
    User,
    Package,
    Heart,
    Settings,
    LogOut,
    MapPin,
    Mail,
    Phone,
    Edit2,
    ChevronRight,
    ShoppingBag,
    Clock,
    CheckCircle,
    Truck
} from 'lucide-react'

export default function ProfilePage() {
    const { user, orders, wishlist } = useStore()
    const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('orders')

    const wishlistProducts = mockProducts.filter(p => wishlist.includes(p.id))

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-emerald-100 text-emerald-600'
            case 'shipped':
                return 'bg-blue-100 text-blue-600'
            case 'delivered':
                return 'bg-green-100 text-green-600'
            case 'pending':
                return 'bg-amber-100 text-amber-600'
            default:
                return 'bg-gray-100 text-gray-600'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return <CheckCircle className="h-4 w-4" />
            case 'shipped':
                return <Truck className="h-4 w-4" />
            case 'delivered':
                return <Package className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
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
                        <span className="text-gray-900 font-medium">Profil Saya</span>
                    </nav>
                </FadeIn>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <SlideUp>
                            <Card className="border-gray-100 sticky top-24">
                                <CardContent className="p-6">
                                    <div className="text-center mb-6">
                                        <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white shadow-lg">
                                            <AvatarImage src={user?.avatar} />
                                            <AvatarFallback className="bg-emerald-100 text-emerald-600 text-2xl">
                                                {user?.name?.[0] || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
                                        <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                                        <Button variant="outline" size="sm" className="mt-3 rounded-xl">
                                            <Edit2 className="h-4 w-4 mr-2" />
                                            Edit Profil
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        {[
                                            { id: 'orders', icon: Package, label: 'Pesanan Saya', count: orders.length },
                                            { id: 'wishlist', icon: Heart, label: 'Wishlist', count: wishlist.length },
                                            { id: 'settings', icon: Settings, label: 'Pengaturan' },
                                        ].map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id as 'orders' | 'wishlist' | 'settings')}
                                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === item.id
                                                    ? 'bg-emerald-50 text-emerald-600'
                                                    : 'hover:bg-gray-50 text-gray-600'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon className="h-5 w-5" />
                                                    <span className="font-medium">{item.label}</span>
                                                </div>
                                                {item.count !== undefined && (
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-emerald-100' : 'bg-gray-100'
                                                        }`}>
                                                        {item.count}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <hr className="my-4" />

                                    <button className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-all">
                                        <LogOut className="h-5 w-5" />
                                        <span className="font-medium">Keluar</span>
                                    </button>
                                </CardContent>
                            </Card>
                        </SlideUp>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <SlideUp>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pesanan Saya</h2>

                                {orders.length === 0 ? (
                                    <Card className="border-gray-100">
                                        <CardContent className="p-12 text-center">
                                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <ShoppingBag className="h-10 w-10 text-gray-300" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada pesanan</h3>
                                            <p className="text-gray-500 mb-6">Mulai belanja dan temukan produk preloved berkualitas!</p>
                                            <Link href="/">
                                                <Button className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
                                                    Mulai Belanja
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order, index) => (
                                            <motion.div
                                                key={order.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Card className="border-gray-100 hover:shadow-lg transition-shadow">
                                                    <CardContent className="p-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div>
                                                                <span className="text-sm text-gray-500">Order ID: </span>
                                                                <span className="font-mono font-semibold text-gray-900">{order.id}</span>
                                                            </div>
                                                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                                {getStatusIcon(order.status)}
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </span>
                                                        </div>

                                                        <div className="space-y-3 mb-4">
                                                            {order.items.slice(0, 3).map((item) => (
                                                                <div key={item.product.id} className="flex gap-3 items-center">
                                                                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                                                                        <p className="text-xs text-gray-500">Qty: {item.quantity} × {formatPrice(item.product.price)}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {order.items.length > 3 && (
                                                                <p className="text-sm text-gray-500 pl-17">+{order.items.length - 3} item lainnya</p>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <span className="text-sm text-gray-500">{order.items.length} item</span>
                                                                <span className="mx-2 text-gray-300">•</span>
                                                                <span className="text-lg font-bold text-emerald-600">{formatPrice(order.total)}</span>
                                                            </div>
                                                            <Link href={`/order/${order.id}`}>
                                                                <Button variant="outline" size="sm" className="rounded-xl">
                                                                    Detail Pesanan
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </SlideUp>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <SlideUp>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Wishlist Saya</h2>

                                {wishlistProducts.length === 0 ? (
                                    <Card className="border-gray-100">
                                        <CardContent className="p-12 text-center">
                                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Heart className="h-10 w-10 text-gray-300" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Wishlist kosong</h3>
                                            <p className="text-gray-500 mb-6">Simpan produk favoritmu agar tidak ketinggalan!</p>
                                            <Link href="/">
                                                <Button className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
                                                    Jelajahi Produk
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlistProducts.map((product) => (
                                            <StaggerItem key={product.id}>
                                                <ProductCard product={product} />
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>
                                )}
                            </SlideUp>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <SlideUp>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pengaturan</h2>

                                <div className="space-y-6">
                                    <Card className="border-gray-100">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <User className="h-5 w-5 text-emerald-500" />
                                                Informasi Pribadi
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm text-gray-500">Nama Lengkap</label>
                                                    <p className="font-medium text-gray-900">{user?.name || '-'}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-gray-500">Email</label>
                                                    <p className="font-medium text-gray-900 flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-gray-400" />
                                                        {user?.email || '-'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-gray-500">No. Telepon</label>
                                                    <p className="font-medium text-gray-900 flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-gray-400" />
                                                        {user?.phone || '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-gray-100">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <MapPin className="h-5 w-5 text-emerald-500" />
                                                Alamat Pengiriman
                                            </h3>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-gray-900">{user?.address?.street}</p>
                                                <p className="text-gray-600 text-sm">{user?.address?.city}, {user?.address?.province} {user?.address?.postalCode}</p>
                                            </div>
                                            <Button variant="outline" size="sm" className="mt-4 rounded-xl">
                                                <Edit2 className="h-4 w-4 mr-2" />
                                                Ubah Alamat
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </SlideUp>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
