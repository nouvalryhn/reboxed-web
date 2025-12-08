'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useStore } from '@/lib/store'
import { SlideUp, FadeIn } from '@/components/ui/animated-section'
import {
    ChevronRight,
    ArrowLeft,
    Package,
    Truck,
    MapPin,
    CheckCircle,
    Clock,
    Phone,
    MessageCircle,
    Copy,
    ExternalLink,
    Box,
    CircleDot
} from 'lucide-react'

// Mock tracking data
const mockTrackingHistory = [
    {
        id: 1,
        status: 'Pesanan telah diterima',
        description: 'Paket telah sampai di tujuan dan diterima oleh penerima',
        location: 'Jakarta Selatan',
        time: new Date(Date.now() - 1000 * 60 * 30),
        isCompleted: false,
        isCurrent: false
    },
    {
        id: 2,
        status: 'Paket sedang dalam perjalanan',
        description: 'Kurir sedang mengantar paket ke alamat tujuan',
        location: 'Hub Jakarta Selatan',
        time: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isCompleted: false,
        isCurrent: true
    },
    {
        id: 3,
        status: 'Paket tiba di hub tujuan',
        description: 'Paket telah tiba dan siap untuk diantar',
        location: 'Hub Jakarta Selatan',
        time: new Date(Date.now() - 1000 * 60 * 60 * 8),
        isCompleted: true,
        isCurrent: false
    },
    {
        id: 4,
        status: 'Paket dalam perjalanan ke hub tujuan',
        description: 'Paket sedang dalam perjalanan dari hub asal',
        location: 'Hub Bandung',
        time: new Date(Date.now() - 1000 * 60 * 60 * 24),
        isCompleted: true,
        isCurrent: false
    },
    {
        id: 5,
        status: 'Paket dikirim dari penjual',
        description: 'Penjual telah mengirimkan paket ke kurir',
        location: 'Bandung',
        time: new Date(Date.now() - 1000 * 60 * 60 * 26),
        isCompleted: true,
        isCurrent: false
    },
    {
        id: 6,
        status: 'Pesanan sedang dikemas',
        description: 'Penjual sedang menyiapkan pesanan Anda',
        location: 'Bandung',
        time: new Date(Date.now() - 1000 * 60 * 60 * 30),
        isCompleted: true,
        isCurrent: false
    },
    {
        id: 7,
        status: 'Pembayaran berhasil',
        description: 'Pembayaran telah dikonfirmasi',
        location: '-',
        time: new Date(Date.now() - 1000 * 60 * 60 * 32),
        isCompleted: true,
        isCurrent: false
    }
]

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: orderId } = use(params)
    const { orders } = useStore()
    const [copied, setCopied] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)

    const order = orders.find(o => o.id === orderId)

    // Simulate order progress
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => Math.min(prev + 1, 4))
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const steps = [
        { icon: CheckCircle, label: 'Dibayar', completed: currentStep >= 1 },
        { icon: Package, label: 'Dikemas', completed: currentStep >= 2 },
        { icon: Truck, label: 'Dikirim', completed: currentStep >= 3 },
        { icon: MapPin, label: 'Sampai', completed: currentStep >= 4 }
    ]

    const trackingNumber = 'JNE' + orderId.replace('ORD-', '') + 'ID'

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <FadeIn>
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/profile" className="hover:text-emerald-600 transition-colors">Pesanan Saya</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Detail Pesanan</span>
                    </nav>
                </FadeIn>

                <div className="flex items-center gap-4 mb-6">
                    <Link href="/profile">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Detail Pesanan</h1>
                        <p className="text-gray-500 font-mono">{orderId}</p>
                    </div>
                </div>

                {/* Order Progress */}
                <SlideUp>
                    <Card className="border-gray-100 mb-6 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-white">
                                    <p className="text-sm opacity-80">Status Pesanan</p>
                                    <p className="text-lg font-bold">
                                        {currentStep === 4 ? 'Pesanan Selesai' :
                                            currentStep === 3 ? 'Dalam Pengiriman' :
                                                currentStep === 2 ? 'Sedang Dikemas' : 'Pembayaran Berhasil'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                                    <Clock className="h-4 w-4 text-white" />
                                    <span className="text-white text-sm font-medium">Est. 2-3 hari</span>
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-6">
                            {/* Progress Bar */}
                            <div className="flex items-center justify-between mb-8">
                                {steps.map((step, i) => (
                                    <div key={step.label} className="flex flex-col items-center relative flex-1">
                                        <motion.div
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: step.completed ? 1 : 0.8 }}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${step.completed
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-gray-100 text-gray-400'
                                                }`}
                                        >
                                            <step.icon className="h-6 w-6" />
                                        </motion.div>
                                        <span className={`text-xs mt-2 font-medium ${step.completed ? 'text-emerald-600' : 'text-gray-400'
                                            }`}>
                                            {step.label}
                                        </span>
                                        {i < 3 && (
                                            <div className="absolute top-6 left-1/2 w-full h-1 -z-0">
                                                <div className={`h-full transition-all duration-500 ${steps[i + 1]?.completed ? 'bg-emerald-500' : 'bg-gray-200'
                                                    }`} style={{ width: '100%' }} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Tracking Number */}
                            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Nomor Resi</p>
                                    <p className="font-mono font-bold text-gray-900">{trackingNumber}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-lg"
                                        onClick={() => copyToClipboard(trackingNumber)}
                                    >
                                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        {copied ? 'Tersalin' : 'Salin'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-lg"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-1" />
                                        Track
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </SlideUp>

                {/* Tracking History */}
                <SlideUp delay={0.1}>
                    <Card className="border-gray-100 mb-6">
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Truck className="h-5 w-5 text-emerald-500" />
                                Riwayat Pengiriman
                            </h2>

                            <div className="space-y-0">
                                {mockTrackingHistory.map((track, i) => (
                                    <motion.div
                                        key={track.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex gap-4"
                                    >
                                        {/* Timeline */}
                                        <div className="flex flex-col items-center">
                                            <div className={`w-4 h-4 rounded-full border-2 ${track.isCurrent
                                                    ? 'bg-emerald-500 border-emerald-500 animate-pulse'
                                                    : track.isCompleted
                                                        ? 'bg-emerald-500 border-emerald-500'
                                                        : 'bg-gray-200 border-gray-300'
                                                }`}>
                                                {track.isCurrent && (
                                                    <div className="w-full h-full rounded-full bg-emerald-400 animate-ping" />
                                                )}
                                            </div>
                                            {i < mockTrackingHistory.length - 1 && (
                                                <div className={`w-0.5 h-16 ${track.isCompleted ? 'bg-emerald-300' : 'bg-gray-200'
                                                    }`} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className={`font-medium ${track.isCurrent ? 'text-emerald-600' : 'text-gray-900'
                                                        }`}>
                                                        {track.status}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-0.5">{track.description}</p>
                                                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {track.location}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                                    {formatDate(track.time)}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </SlideUp>

                {/* Order Items */}
                <SlideUp delay={0.2}>
                    <Card className="border-gray-100 mb-6">
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Box className="h-5 w-5 text-emerald-500" />
                                Item Pesanan
                            </h2>

                            <div className="space-y-4">
                                {order?.items?.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <Link href={`/product/${item.product.id}`}>
                                                <h3 className="font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                                                    {item.product.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-500 mt-1">{item.product.seller.name}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                                <span className="font-semibold text-emerald-600">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )) || (
                                        <div className="text-center py-8 text-gray-500">
                                            <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                            <p>Detail pesanan tidak tersedia</p>
                                        </div>
                                    )}
                            </div>

                            {order && (
                                <div className="border-t border-gray-200 mt-4 pt-4">
                                    <div className="flex justify-between text-gray-600 mb-2">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(order.total - 15000)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 mb-2">
                                        <span>Ongkir</span>
                                        <span>Rp 15.000</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-emerald-600">{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </SlideUp>

                {/* Contact Actions */}
                <SlideUp delay={0.3}>
                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 rounded-xl h-12">
                            <Phone className="h-5 w-5 mr-2" />
                            Hubungi Penjual
                        </Button>
                        <Link href="/messages" className="flex-1">
                            <Button className="w-full rounded-xl h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                                <MessageCircle className="h-5 w-5 mr-2" />
                                Chat Penjual
                            </Button>
                        </Link>
                    </div>
                </SlideUp>
            </div>

            <Footer />
        </div>
    )
}
