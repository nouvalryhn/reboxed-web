'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SlideUp, FadeIn } from '@/components/ui/animated-section'
import {
    ChevronRight,
    Camera,
    Upload,
    X,
    DollarSign,
    Tag,
    FileText,
    MapPin,
    Package,
    Sparkles,
    CheckCircle,
    Crown
} from 'lucide-react'

export default function SellPage() {
    const router = useRouter()
    const [images, setImages] = useState<string[]>([])
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        condition: '',
        originalPrice: '',
        sellingPrice: '',
        description: '',
        location: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const categories = [
        'Electronics', 'Fashion', 'Furniture', 'Books', 'Sports', 'Home & Garden'
    ]

    const conditions = [
        { value: 'Like New', label: 'Seperti Baru', desc: 'Kondisi mulus, hampir tidak pernah dipakai' },
        { value: 'Good', label: 'Baik', desc: 'Pemakaian normal, ada bekas pakai ringan' },
        { value: 'Fair', label: 'Cukup', desc: 'Ada tanda pemakaian yang jelas' }
    ]

    const handleImageUpload = () => {
        // Simulate image upload with placeholder
        const placeholders = [
            'https://placehold.co/400x400/e2e8f0/64748b?text=Product+Image',
            'https://placehold.co/400x400/dbeafe/3b82f6?text=Product+Image+2',
            'https://placehold.co/400x400/dcfce7/22c55e?text=Product+Image+3'
        ]
        if (images.length < 5) {
            setImages([...images, placeholders[images.length % 3]])
        }
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setShowSuccess(true)
    }

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gray-50/50">
                <Navbar />
                <div className="max-w-xl mx-auto px-4 py-20 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="h-12 w-12 text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Produk Berhasil Ditambahkan! 🎉</h1>
                    <p className="text-gray-500 mb-8">Produk Anda sekarang sudah tayang dan bisa dilihat oleh pembeli.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button variant="outline" size="lg" className="rounded-xl">
                                Kembali ke Beranda
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500"
                            onClick={() => {
                                setShowSuccess(false)
                                setFormData({
                                    name: '', category: '', condition: '', originalPrice: '', sellingPrice: '', description: '', location: ''
                                })
                                setImages([])
                            }}
                        >
                            Jual Produk Lain
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <FadeIn>
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Jual Barang</span>
                    </nav>
                </FadeIn>

                <SlideUp>
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Jual Barang Preloved</h1>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Ubah barang tidak terpakai menjadi uang! Upload foto, tentukan harga, dan mulai jual.
                        </p>
                    </div>
                </SlideUp>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <SlideUp delay={0.1}>
                        <Card className="border-gray-100">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Camera className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Foto Produk</h2>
                                        <p className="text-sm text-gray-500">Upload foto asli produk (maksimal 5 foto)</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                                            <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}

                                    {images.length < 5 && (
                                        <button
                                            type="button"
                                            onClick={handleImageUpload}
                                            className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 flex flex-col items-center justify-center gap-2 transition-all"
                                        >
                                            <Upload className="h-6 w-6 text-gray-400" />
                                            <span className="text-xs text-gray-500">Upload</span>
                                        </button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </SlideUp>

                    {/* Product Details */}
                    <SlideUp delay={0.2}>
                        <Card className="border-gray-100">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Package className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Detail Produk</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Produk</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Contoh: iPhone 12 Pro 128GB Pacific Blue"
                                            className="rounded-xl"
                                            required
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all"
                                                required
                                            >
                                                <option value="">Pilih Kategori</option>
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Lokasi</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    placeholder="Kota / Kabupaten"
                                                    className="pl-10 rounded-xl"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Kondisi Barang</label>
                                        <div className="grid md:grid-cols-3 gap-3">
                                            {conditions.map(cond => (
                                                <button
                                                    key={cond.value}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, condition: cond.value }))}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all ${formData.condition === cond.value
                                                            ? 'border-emerald-500 bg-emerald-50'
                                                            : 'border-gray-100 hover:border-gray-200'
                                                        }`}
                                                >
                                                    <span className="font-semibold text-gray-900">{cond.label}</span>
                                                    <p className="text-xs text-gray-500 mt-1">{cond.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Jelaskan kondisi barang secara detail, termasuk kekurangan jika ada..."
                                            rows={4}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </SlideUp>

                    {/* Pricing */}
                    <SlideUp delay={0.3}>
                        <Card className="border-gray-100">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <DollarSign className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Harga</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga Asli (opsional)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                                            <Input
                                                name="originalPrice"
                                                type="number"
                                                value={formData.originalPrice}
                                                onChange={handleInputChange}
                                                placeholder="12.000.000"
                                                className="pl-10 rounded-xl"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Harga saat beli baru</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga Jual</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                                            <Input
                                                name="sellingPrice"
                                                type="number"
                                                value={formData.sellingPrice}
                                                onChange={handleInputChange}
                                                placeholder="7.500.000"
                                                className="pl-10 rounded-xl"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </SlideUp>

                    {/* Premium Upgrade */}
                    <SlideUp delay={0.4}>
                        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Crown className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-1">Upgrade ke Premium?</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Produk premium tampil di bagian paling atas homepage dan 5x lebih cepat laku!
                                        </p>
                                        <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100 rounded-xl">
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            Upgrade Premium - Rp 25.000
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </SlideUp>

                    {/* Submit */}
                    <SlideUp delay={0.5}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                type="submit"
                                size="lg"
                                className="flex-1 rounded-xl h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>Memproses...</>
                                ) : (
                                    <>
                                        <Tag className="h-5 w-5 mr-2" />
                                        Jual Sekarang
                                    </>
                                )}
                            </Button>
                        </div>
                    </SlideUp>
                </form>
            </div>

            <Footer />
        </div>
    )
}
