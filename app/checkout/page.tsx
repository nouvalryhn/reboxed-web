'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useStore } from '@/lib/store'
import { SlideUp, FadeIn } from '@/components/ui/animated-section'
import {
    ChevronRight,
    ArrowLeft,
    MapPin,
    User,
    Phone,
    Mail,
    Home,
    Building,
    Truck,
    Shield,
    Check
} from 'lucide-react'

export default function CheckoutPage() {
    const router = useRouter()
    const { getSelectedItems, getSelectedTotal, user, setShippingAddress } = useStore()
    const selectedItems = getSelectedItems()
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        province: user?.address?.province || '',
        postalCode: user?.address?.postalCode || '',
        notes: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Redirect if no items selected
    useEffect(() => {
        if (selectedItems.length === 0) {
            router.push('/cart')
        }
    }, [selectedItems.length, router])

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi'
        if (!formData.email.trim()) newErrors.email = 'Email wajib diisi'
        if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi'
        if (!formData.street.trim()) newErrors.street = 'Alamat wajib diisi'
        if (!formData.city.trim()) newErrors.city = 'Kota wajib diisi'
        if (!formData.province.trim()) newErrors.province = 'Provinsi wajib diisi'
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Kode pos wajib diisi'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setShippingAddress({
                street: formData.street,
                city: formData.city,
                province: formData.province,
                postalCode: formData.postalCode,
                country: 'Indonesia'
            })
            router.push('/payment')
        }
    }

    // Show loading state while redirecting
    if (selectedItems.length === 0) {
        return null
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
                        <Link href="/cart" className="hover:text-emerald-600 transition-colors">Keranjang</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Checkout</span>
                    </nav>
                </FadeIn>

                {/* Progress Steps */}
                <FadeIn>
                    <div className="flex items-center justify-center mb-10">
                        {['Keranjang', 'Checkout', 'Pembayaran', 'Selesai'].map((step, i) => (
                            <div key={step} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${i <= 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {i < 1 ? <Check className="h-5 w-5" /> : i + 1}
                                </div>
                                <span className={`ml-2 text-sm font-medium ${i <= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step}
                                </span>
                                {i < 3 && (
                                    <div className={`w-12 md:w-20 h-0.5 mx-3 ${i < 1 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <div className="flex items-center gap-4 mb-8">
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Checkout</h1>
                        <p className="text-gray-500">Lengkapi alamat pengiriman</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Shipping Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <SlideUp>
                                <Card className="border-gray-100">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                                <User className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <h2 className="text-lg font-bold text-gray-900">Informasi Penerima</h2>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Nama lengkap"
                                                        className={`pl-10 rounded-xl ${errors.name ? 'border-rose-500' : ''}`}
                                                    />
                                                </div>
                                                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="email@example.com"
                                                        className={`pl-10 rounded-xl ${errors.email ? 'border-rose-500' : ''}`}
                                                    />
                                                </div>
                                                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor Telepon</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="+62 812 3456 7890"
                                                        className={`pl-10 rounded-xl ${errors.phone ? 'border-rose-500' : ''}`}
                                                    />
                                                </div>
                                                {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </SlideUp>

                            <SlideUp delay={0.1}>
                                <Card className="border-gray-100">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                                <MapPin className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <h2 className="text-lg font-bold text-gray-900">Alamat Pengiriman</h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Lengkap</label>
                                                <div className="relative">
                                                    <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <textarea
                                                        name="street"
                                                        value={formData.street}
                                                        onChange={handleInputChange}
                                                        placeholder="Nama jalan, nomor rumah, RT/RW"
                                                        rows={2}
                                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm resize-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all ${errors.street ? 'border-rose-500' : 'border-gray-200'}`}
                                                    />
                                                </div>
                                                {errors.street && <p className="text-xs text-rose-500 mt-1">{errors.street}</p>}
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Kota / Kabupaten</label>
                                                    <div className="relative">
                                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            placeholder="Kota / Kabupaten"
                                                            className={`pl-10 rounded-xl ${errors.city ? 'border-rose-500' : ''}`}
                                                        />
                                                    </div>
                                                    {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Provinsi</label>
                                                    <Input
                                                        name="province"
                                                        value={formData.province}
                                                        onChange={handleInputChange}
                                                        placeholder="Provinsi"
                                                        className={`rounded-xl ${errors.province ? 'border-rose-500' : ''}`}
                                                    />
                                                    {errors.province && <p className="text-xs text-rose-500 mt-1">{errors.province}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Kode Pos</label>
                                                    <Input
                                                        name="postalCode"
                                                        value={formData.postalCode}
                                                        onChange={handleInputChange}
                                                        placeholder="12345"
                                                        className={`rounded-xl ${errors.postalCode ? 'border-rose-500' : ''}`}
                                                    />
                                                    {errors.postalCode && <p className="text-xs text-rose-500 mt-1">{errors.postalCode}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Catatan (opsional)</label>
                                                    <Input
                                                        name="notes"
                                                        value={formData.notes}
                                                        onChange={handleInputChange}
                                                        placeholder="Patokan, lantai, dll"
                                                        className="rounded-xl"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </SlideUp>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <SlideUp delay={0.2}>
                                <Card className="sticky top-24 border-gray-100">
                                    <CardContent className="p-6">
                                        <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                                        <div className="space-y-4 mb-6">
                                            {selectedItems.slice(0, 3).map((item) => (
                                                <div key={item.product.id} className="flex gap-3">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                        <p className="text-sm font-semibold text-emerald-600">{formatPrice(item.product.price * item.quantity)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {selectedItems.length > 3 && (
                                                <p className="text-sm text-gray-500">+{selectedItems.length - 3} item lainnya</p>
                                            )}
                                        </div>

                                        <div className="space-y-3 pb-4 border-b border-gray-100">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Subtotal</span>
                                                <span>{formatPrice(subtotal)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Truck className="h-4 w-4" /> Ongkir
                                                </span>
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
                                            type="submit"
                                            size="lg"
                                            className="w-full rounded-xl h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25"
                                        >
                                            Lanjut ke Pembayaran
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                                            <Shield className="h-4 w-4" />
                                            <span>Data Anda aman dan terlindungi</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </SlideUp>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}
