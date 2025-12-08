'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useStore } from '@/lib/store'
import { paymentMethods } from '@/lib/data'
import { Order } from '@/lib/types'
import { SlideUp, FadeIn } from '@/components/ui/animated-section'
import {
    ChevronRight,
    ArrowLeft,
    CreditCard,
    Smartphone,
    Truck,
    Shield,
    Check,
    Loader2,
    Copy,
    CheckCircle,
    Clock
} from 'lucide-react'

export default function PaymentPage() {
    const router = useRouter()
    const { getSelectedItems, getSelectedTotal, removeSelectedItems, addOrder, shippingAddress } = useStore()
    const selectedItems = getSelectedItems()
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [copied, setCopied] = useState(false)
    const [paymentComplete, setPaymentComplete] = useState(false)

    // Redirect if no items selected (but not after successful payment)
    useEffect(() => {
        if (selectedItems.length === 0 && !paymentComplete && !isProcessing) {
            router.push('/cart')
        }
    }, [selectedItems.length, router, paymentComplete, isProcessing])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const subtotal = getSelectedTotal()
    const shipping = subtotal > 500000 ? 0 : 15000
    const total = subtotal + shipping

    const handlePayment = async () => {
        if (!selectedPayment) return

        setIsProcessing(true)

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2500))

        // Create order BEFORE removing items
        const order: Order = {
            id: `ORD-${Date.now()}`,
            items: [...selectedItems], // Copy selected items before removing
            total,
            status: 'paid',
            paymentMethod: selectedPayment,
            shippingAddress: shippingAddress || {
                street: 'Jl. Sudirman No. 123',
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                postalCode: '12190',
                country: 'Indonesia'
            },
            createdAt: new Date()
        }

        // Mark payment as complete BEFORE removing items
        setPaymentComplete(true)

        // Add order and remove selected items (keep unselected items in cart)
        addOrder(order)
        removeSelectedItems()

        // Navigate to confirmation
        router.push(`/order-confirmation?orderId=${order.id}`)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Show loading state while redirecting (but not after payment)
    if (selectedItems.length === 0 && !paymentComplete) {
        return null
    }

    const selectedMethod = paymentMethods.find(p => p.id === selectedPayment)

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <FadeIn>
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/cart" className="hover:text-emerald-600 transition-colors">Keranjang</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/checkout" className="hover:text-emerald-600 transition-colors">Checkout</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Pembayaran</span>
                    </nav>
                </FadeIn>

                {/* Progress Steps */}
                <FadeIn>
                    <div className="flex items-center justify-center mb-8">
                        {['Keranjang', 'Checkout', 'Pembayaran', 'Selesai'].map((step, i) => (
                            <div key={step} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${i <= 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {i < 2 ? <Check className="h-5 w-5" /> : i + 1}
                                </div>
                                <span className={`ml-2 text-sm font-medium ${i <= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step}
                                </span>
                                {i < 3 && (
                                    <div className={`w-12 md:w-20 h-0.5 mx-3 ${i < 2 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <div className="flex items-center gap-4 mb-6">
                    <Link href="/checkout">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pembayaran</h1>
                        <p className="text-gray-500">Pilih metode dan selesaikan pembayaran</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Payment Methods */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Payment Instructions - Show at top when method selected */}
                        <AnimatePresence>
                            {selectedPayment && selectedPayment !== 'cod' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <Card className="border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                                                        <CheckCircle className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">Instruksi Pembayaran</h3>
                                                        <p className="text-sm text-gray-500">Transfer ke {selectedMethod?.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                                                    <Clock className="h-4 w-4" />
                                                    <span className="text-sm font-medium">Bayar dalam 24 jam</span>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-gray-500">Nomor Virtual Account</span>
                                                    <button
                                                        onClick={() => copyToClipboard('8806121234567890')}
                                                        className="flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700"
                                                    >
                                                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                        {copied ? 'Tersalin!' : 'Salin'}
                                                    </button>
                                                </div>
                                                <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">8806 1212 3456 7890</p>
                                            </div>

                                            <div className="bg-white rounded-xl p-4 border border-gray-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-gray-500">Total Pembayaran</span>
                                                </div>
                                                <p className="text-2xl font-bold text-emerald-600">{formatPrice(total)}</p>
                                            </div>

                                            <div className="mt-4 p-4 bg-white/50 rounded-xl">
                                                <p className="text-sm font-medium text-gray-700 mb-2">Cara Bayar:</p>
                                                <ol className="space-y-1 text-sm text-gray-600">
                                                    <li>1. Buka aplikasi m-Banking atau ATM</li>
                                                    <li>2. Pilih menu Transfer → Virtual Account</li>
                                                    <li>3. Masukkan nomor VA di atas</li>
                                                    <li>4. Konfirmasi pembayaran</li>
                                                </ol>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Payment Method Selection */}
                        <SlideUp>
                            <Card className="border-gray-100">
                                <CardContent className="p-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h2>

                                    {/* Bank Transfer */}
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <CreditCard className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">Transfer Bank</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {paymentMethods.filter(p => p.type === 'bank').map((method) => (
                                                <motion.button
                                                    key={method.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setSelectedPayment(method.id)}
                                                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${selectedPayment === method.id
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-100 hover:border-gray-200'
                                                        }`}
                                                >
                                                    <span className="text-2xl">{method.icon}</span>
                                                    <span className="text-xs font-medium text-gray-700">{method.name}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* E-Wallet */}
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Smartphone className="h-4 w-4 text-purple-600" />
                                            <span className="text-sm font-medium text-gray-700">E-Wallet</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {paymentMethods.filter(p => p.type === 'ewallet').map((method) => (
                                                <motion.button
                                                    key={method.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setSelectedPayment(method.id)}
                                                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${selectedPayment === method.id
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-100 hover:border-gray-200'
                                                        }`}
                                                >
                                                    <span className="text-2xl">{method.icon}</span>
                                                    <span className="text-xs font-medium text-gray-700">{method.name}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* COD */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Truck className="h-4 w-4 text-amber-600" />
                                            <span className="text-sm font-medium text-gray-700">Bayar di Tempat</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {paymentMethods.filter(p => p.type === 'cod').map((method) => (
                                                <motion.button
                                                    key={method.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setSelectedPayment(method.id)}
                                                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${selectedPayment === method.id
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-100 hover:border-gray-200'
                                                        }`}
                                                >
                                                    <span className="text-2xl">{method.icon}</span>
                                                    <span className="text-xs font-medium text-gray-700">{method.name}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </SlideUp>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <SlideUp delay={0.1}>
                            <Card className="sticky top-24 border-gray-100">
                                <CardContent className="p-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan</h2>

                                    <div className="space-y-3 pb-4 border-b border-gray-100">
                                        <div className="flex justify-between text-gray-600 text-sm">
                                            <span>Subtotal ({selectedItems.length} item)</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-sm">
                                            <span>Ongkir</span>
                                            <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>
                                                {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between py-4 text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-emerald-600">{formatPrice(total)}</span>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="w-full rounded-xl h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
                                        disabled={!selectedPayment || isProcessing}
                                        onClick={handlePayment}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="h-5 w-5 mr-2" />
                                                {selectedPayment === 'cod' ? 'Konfirmasi Pesanan' : 'Bayar Sekarang'}
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-xs text-gray-400 text-center mt-4">
                                        Dengan membayar, Anda menyetujui syarat dan ketentuan
                                    </p>
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
