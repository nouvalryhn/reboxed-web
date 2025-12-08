'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useStore } from '@/lib/store'
import { FadeIn, SlideUp } from '@/components/ui/animated-section'
import {
    CheckCircle,
    Package,
    Truck,
    MapPin,
    Copy,
    ShoppingBag,
    Home
} from 'lucide-react'

function OrderConfirmationContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId') || 'ORD-000000'
    const { orders } = useStore()
    const [copied, setCopied] = useState(false)

    const order = orders.find(o => o.id === orderId)

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min
        }

        const interval: NodeJS.Timeout = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#10b981', '#14b8a6', '#fbbf24', '#f472b6']
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#10b981', '#14b8a6', '#fbbf24', '#f472b6']
            })
        }, 250)

        return () => clearInterval(interval)
    }, [])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-16">
                <FadeIn>
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="relative inline-block mb-6"
                        >
                            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-30 animate-pulse" />
                            <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
                                <CheckCircle className="h-12 w-12 text-white" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
                        >
                            Pembayaran Berhasil! 🎉
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-500 text-lg"
                        >
                            Terima kasih telah berbelanja di ReBoxed
                        </motion.p>
                    </div>
                </FadeIn>

                <SlideUp delay={0.4}>
                    <Card className="border-gray-100 mb-6 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-white">
                                    <p className="text-sm opacity-80">Nomor Pesanan</p>
                                    <p className="text-xl font-bold font-mono">{orderId}</p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(orderId)}
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors"
                                >
                                    <Copy className="h-4 w-4" />
                                    {copied ? 'Tersalin!' : 'Salin'}
                                </button>
                            </div>
                        </div>

                        <CardContent className="p-6">
                            {/* Order Status */}
                            <div className="flex items-center justify-between mb-8">
                                {[
                                    { icon: CheckCircle, label: 'Dibayar', active: true },
                                    { icon: Package, label: 'Dikemas', active: false },
                                    { icon: Truck, label: 'Dikirim', active: false },
                                    { icon: MapPin, label: 'Sampai', active: false },
                                ].map((step, i) => (
                                    <div key={step.label} className="flex flex-col items-center relative">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.active ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            <step.icon className="h-5 w-5" />
                                        </div>
                                        <span className={`text-xs mt-2 ${step.active ? 'text-emerald-600 font-medium' : 'text-gray-400'}`}>
                                            {step.label}
                                        </span>
                                        {i < 3 && (
                                            <div className={`absolute top-5 left-full w-full h-0.5 -translate-y-1/2 ${step.active ? 'bg-emerald-500' : 'bg-gray-200'
                                                }`} style={{ width: 'calc(100% - 2.5rem)', marginLeft: '1.25rem' }} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Order Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Status</span>
                                    <span className="font-medium text-emerald-600 flex items-center gap-1">
                                        <CheckCircle className="h-4 w-4" />
                                        Pembayaran Berhasil
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Tanggal Pesanan</span>
                                    <span className="font-medium text-gray-900">
                                        {new Date().toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Metode Pembayaran</span>
                                    <span className="font-medium text-gray-900">
                                        {order?.paymentMethod?.toUpperCase() || 'Bank Transfer'}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-gray-500">Total Pembayaran</span>
                                    <span className="text-xl font-bold text-emerald-600">
                                        {formatPrice(order?.total || 0)}
                                    </span>
                                </div>
                            </div>

                            {/* Items */}
                            {order?.items && order.items.length > 0 && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-900 mb-3">Item dalam pesanan</h3>
                                    <div className="space-y-3">
                                        {order.items.map((item) => (
                                            <div key={item.product.id} className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
                                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                                                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </SlideUp>

                <SlideUp delay={0.5}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/order/${orderId}`}>
                            <Button
                                size="lg"
                                className="w-full sm:w-auto rounded-xl h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                            >
                                <Package className="h-5 w-5 mr-2" />
                                Lacak Pesanan
                            </Button>
                        </Link>
                        <Link href="/profile">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto rounded-xl h-12 border-gray-200"
                            >
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Pesanan Saya
                            </Button>
                        </Link>
                    </div>
                </SlideUp>
            </div>

            <Footer />
        </div>
    )
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    )
}
