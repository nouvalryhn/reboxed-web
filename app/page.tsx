"use client"

import React, { useState, useMemo, Suspense, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animated-section'
import { mockProducts, categories } from '@/lib/data'
import {
  Search,
  Crown,
  TrendingUp,
  Award,
  CheckCircle,
  Camera,
  Star,
  MessageCircle,
  Shield,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react'

function MarketplaceContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const searchResultsRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to results when search query changes
  useEffect(() => {
    if (searchQuery && searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [searchQuery])

  // Randomize floating products on each page load
  const floatingProducts = useMemo(() => {
    const shuffled = [...mockProducts].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }, [])

  // Category mapping for filtering (product category -> filter id)
  const categoryMapping: Record<string, string> = {
    'Electronics': 'electronics',
    'Fashion': 'fashion',
    'Furniture': 'furniture',
    'Books': 'books',
    'Sports': 'sports',
    'Home & Garden': 'home'
  }

  // Memoize filtered products with reactive dependencies
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Filter by search query
      const query = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.seller.name.toLowerCase().includes(query)

      // Filter by category
      const matchesCategory = selectedCategory === 'all' ||
        categoryMapping[product.category] === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'featured') return (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0)
      return 0
    })
  }, [filteredProducts, sortBy])

  const premiumProducts = mockProducts.filter(p => p.isPremium)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const features = [
    { icon: Camera, title: 'Real Picture', desc: 'Foto produk asli terverifikasi', color: 'from-blue-500 to-cyan-500' },
    { icon: Star, title: 'Rating & Review', desc: 'Ulasan pembeli asli', color: 'from-amber-500 to-orange-500' },
    { icon: MessageCircle, title: 'Chat Langsung', desc: 'Tanya penjual langsung', color: 'from-emerald-500 to-teal-500' },
    { icon: Shield, title: 'Pembayaran Aman', desc: 'Uang terlindungi', color: 'from-purple-500 to-pink-500' },
    { icon: RotateCcw, title: 'Garansi Return', desc: 'Jaminan uang kembali', color: 'from-rose-500 to-red-500' },
    { icon: Crown, title: 'Premium Boost', desc: 'Tampil di atas', color: 'from-yellow-500 to-amber-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-white py-20 lg:py-28 px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium">Platform Preloved #1 di Indonesia</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Jual Beli Barang Preloved
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-300">
                  Aman & Terpercaya
                </span>
              </h1>

              <p className="text-lg md:text-xl mb-8 text-emerald-50/90 leading-relaxed max-w-xl">
                Dapatkan barang berkualitas dengan harga terbaik. Semua produk dengan foto asli, garansi kepuasan, dan sistem pembayaran yang aman.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-black/10 rounded-xl font-semibold h-12 px-6"
                  onClick={() => searchResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Mulai Belanja
                </Button>
                <Button
                  size="lg"
                  // variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 rounded-xl font-semibold h-12 px-6 backdrop-blur-sm"
                >
                  <Crown className="h-5 w-5 mr-2 text-yellow-300" />
                  Upgrade Premium
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10">
                {[
                  { value: '50K+', label: 'Produk' },
                  { value: '25K+', label: 'Penjual' },
                  { value: '4.9', label: 'Rating' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-emerald-100/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              className="hidden lg:block relative h-[500px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="absolute top-0 left-0 w-64 h-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-float">
                <img
                  src={floatingProducts[0]?.image}
                  alt="Featured product"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="text-xs text-emerald-600 font-medium mb-1">{floatingProducts[0]?.condition}</div>
                  <div className="text-sm font-semibold text-gray-800 line-clamp-1">{floatingProducts[0]?.name}</div>
                  <div className="text-emerald-600 font-bold mt-1">{formatPrice(floatingProducts[0]?.price || 0)}</div>
                </div>
              </div>

              <div className="absolute top-20 right-0 w-56 h-72 bg-white rounded-2xl shadow-2xl overflow-hidden animate-float-delayed">
                <img
                  src={floatingProducts[1]?.image}
                  alt="Featured product"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="text-xs text-emerald-600 font-medium mb-1">{floatingProducts[1]?.condition}</div>
                  <div className="text-sm font-semibold text-gray-800 line-clamp-1">{floatingProducts[1]?.name}</div>
                  <div className="text-emerald-600 font-bold mt-1">{formatPrice(floatingProducts[1]?.price || 0)}</div>
                </div>
              </div>

              <div className="absolute bottom-0 left-40 w-48 h-64 bg-white rounded-2xl shadow-2xl overflow-hidden animate-float" style={{ animationDelay: '0.5s' }}>
                <img
                  src={floatingProducts[2]?.image}
                  alt="Featured product"
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <div className="text-xs text-emerald-600 font-medium mb-1">{floatingProducts[2]?.condition}</div>
                  <div className="text-sm font-semibold text-gray-800 line-clamp-1">{floatingProducts[2]?.name}</div>
                  <div className="text-emerald-600 font-bold mt-1">{formatPrice(floatingProducts[2]?.price || 0)}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Products */}
      <AnimatedSection className="py-16 px-4 bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-yellow-400 to-amber-500 p-3 rounded-2xl shadow-lg">
                  <Crown className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Produk Premium</h2>
                <p className="text-gray-500">Barang pilihan yang ditampilkan lebih dulu</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Categories */}
      <AnimatedSection className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Kategori Populer</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* All Products */}
      <div ref={searchResultsRef} id="search-results">
        <AnimatedSection className="py-16 px-4 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {searchQuery
                    ? `Hasil pencarian "${searchQuery}"`
                    : selectedCategory === 'all'
                      ? 'Semua Produk'
                      : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-500 mt-1">{sortedProducts.length} produk ditemukan</p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all"
              >
                <option value="featured">Unggulan</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Premium CTA */}
      <AnimatedSection className="py-20 px-4 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-br from-yellow-300 to-amber-400 p-4 rounded-2xl shadow-2xl">
              <Crown className="h-12 w-12 text-purple-900" />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upgrade ke Premium Seller</h2>
          <p className="text-lg md:text-xl mb-10 text-purple-100 max-w-2xl mx-auto">
            Tingkatkan penjualan hingga 5x dengan menampilkan produk Anda di bagian paling atas!
            Lebih banyak view, lebih cepat laku.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: TrendingUp, title: '5x Lebih Terlihat', desc: 'Produk muncul di bagian teratas homepage' },
              { icon: Award, title: 'Badge Premium', desc: 'Dapatkan badge gold eksklusif' },
              { icon: CheckCircle, title: 'Priority Support', desc: 'Customer service khusus 24/7' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="h-7 w-7 text-yellow-300" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-purple-100">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-amber-400 text-purple-900 hover:from-yellow-300 hover:to-amber-300 font-bold shadow-xl shadow-black/20 rounded-xl h-12 px-8"
          >
            <Zap className="h-5 w-5 mr-2" />
            Upgrade Sekarang - Rp 99.000/bulan
          </Button>
        </div>
      </AnimatedSection>

      {/* Why Choose ReBoxed - Moved to bottom */}
      <AnimatedSection className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Kenapa Pilih ReBoxed?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Platform jual beli barang preloved dengan fitur lengkap untuk kenyamanan transaksi Anda
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, i) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  )
}

export default function ReBoxedMarketplace() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <MarketplaceContent />
    </Suspense>
  )
}
