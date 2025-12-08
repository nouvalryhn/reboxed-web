"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Search, ShoppingCart, User, MessageCircle, Shield, RotateCcw, Award, Camera, Heart, Menu, X, Crown, Package, TrendingUp, Clock, CheckCircle } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  condition: 'Like New' | 'Good' | 'Fair'
  image: string
  rating: number
  reviewCount: number
  seller: {
    name: string
    rating: number
    responseTime: string
  }
  isPremium: boolean
  category: string
  description: string
  location: string
}

interface CartItem {
  product: Product
  quantity: number
}

export default function ReBoxedMarketplace() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [likedProducts, setLikedProducts] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Furniture',
    'Books',
    'Sports',
    'Home & Garden'
  ]

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 12 Pro 128GB',
      price: 7500000,
      originalPrice: 12000000,
      discount: 38,
      condition: 'Like New',
      image: 'https://bimg.akulaku.net/goods/spu/1589e502d4194a8381e504b52c7630a84379.jpeg',
      rating: 4.8,
      reviewCount: 156,
      seller: {
        name: 'TechStore Jakarta',
        rating: 4.9,
        responseTime: '< 1 hour'
      },
      isPremium: true,
      category: 'Electronics',
      description: 'Kondisi mulus seperti baru, fullset box, charger original, no minus',
      location: 'Jakarta Selatan'
    },
    {
      id: '2',
      name: 'Nike Air Max 270 React',
      price: 850000,
      originalPrice: 2100000,
      discount: 60,
      condition: 'Good',
      image: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/11/18/b3dfa805-cfed-4079-a542-0312a5be6808.jpg',
      rating: 4.6,
      reviewCount: 89,
      seller: {
        name: 'SneakerHub',
        rating: 4.7,
        responseTime: '< 2 hours'
      },
      isPremium: true,
      category: 'Fashion',
      description: 'Size 42, pemakaian normal, box dan tag lengkap',
      location: 'Bandung'
    },
    {
      id: '3',
      name: 'MacBook Pro 2019 13"',
      price: 12500000,
      originalPrice: 24000000,
      discount: 48,
      condition: 'Like New',
      image: 'https://i.ebayimg.com/00/s/MTE5N1gxNDU4/z/Ko4AAOSw-F1jN1x0/$_12.JPG?set_id=880000500F',
      rating: 4.9,
      reviewCount: 203,
      seller: {
        name: 'LaptopPremium',
        rating: 4.9,
        responseTime: '< 30 mins'
      },
      isPremium: true,
      category: 'Electronics',
      description: 'i5 8GB RAM 256GB SSD, battery health 95%, no dent',
      location: 'Surabaya'
    },
    {
      id: '4',
      name: 'IKEA Sofa 3 Seater',
      price: 2500000,
      originalPrice: 5500000,
      discount: 55,
      condition: 'Good',
      image: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/494/0949429_PE799735_S4.jpg',
      rating: 4.5,
      reviewCount: 67,
      seller: {
        name: 'FurnitureCo',
        rating: 4.6,
        responseTime: '< 3 hours'
      },
      isPremium: false,
      category: 'Furniture',
      description: 'Bahan fabric, warna grey, kondisi bersih terawat',
      location: 'Tangerang'
    },
    {
      id: '5',
      name: 'Canon EOS M50 Kit',
      price: 6800000,
      originalPrice: 10500000,
      discount: 35,
      condition: 'Like New',
      image: 'https://jakartacamera.com/wp-content/uploads/2020/10/237505195alt5.jpg',
      rating: 4.7,
      reviewCount: 124,
      seller: {
        name: 'CameraShop',
        rating: 4.8,
        responseTime: '< 1 hour'
      },
      isPremium: true,
      category: 'Electronics',
      description: 'Shutter count rendah, lengkap dengan lensa kit 15-45mm',
      location: 'Jakarta Pusat'
    },
    {
      id: '6',
      name: 'Adidas Ultraboost 21',
      price: 1200000,
      originalPrice: 2800000,
      discount: 57,
      condition: 'Good',
      image: 'https://img.ncrsport.com/img/storage/large/s23863-1.jpg',
      rating: 4.4,
      reviewCount: 78,
      seller: {
        name: 'RunnersPro',
        rating: 4.5,
        responseTime: '< 2 hours'
      },
      isPremium: false,
      category: 'Fashion',
      description: 'Size 43, kondisi bagus, masih empuk',
      location: 'Bekasi'
    },
    {
      id: '7',
      name: 'Harry Potter Complete Set',
      price: 650000,
      originalPrice: 1200000,
      discount: 46,
      condition: 'Good',
      image: 'https://images-cdn.ubuy.co.id/6545af6414631025c0516eb5-1-st-edition-harry-potter-full-book-set.jpg',
      rating: 4.8,
      reviewCount: 145,
      seller: {
        name: 'BookLover',
        rating: 4.7,
        responseTime: '< 4 hours'
      },
      isPremium: false,
      category: 'Books',
      description: '7 books, English version, paperback, kondisi buku bagus',
      location: 'Yogyakarta'
    },
    {
      id: '8',
      name: 'PlayStation 4 Pro 1TB',
      price: 3500000,
      originalPrice: 6500000,
      discount: 46,
      condition: 'Good',
      image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/98/MTA-143627506/no_brand_ps4_pro_1tb_original_full01_ndzbxbbp.jpg',
      rating: 4.6,
      reviewCount: 189,
      seller: {
        name: 'GamingHub',
        rating: 4.8,
        responseTime: '< 1 hour'
      },
      isPremium: true,
      category: 'Electronics',
      description: 'Termasuk 2 stik, 5 game, kondisi normal lancar',
      location: 'Semarang'
    },
    {
      id: '9',
      name: 'Pakaian Wanita Salur Maroon',
      price: 43200,
      originalPrice: 80000,
      discount: 46,
      condition: 'Good',
      image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//116/MTA-63559898/brd-44261_kaos-salur-wanita-lengan-panjang_full01.jpg',
      rating: 4.2,
      reviewCount: 15,
      seller: {
        name: 'KostumMuslimah',
        rating: 4.8,
        responseTime: '< 1 hour'
      },
      isPremium: false,
      category: 'Fashion',
      description: 'Ukuran S. Pemakaian 1 tahun, dijual karena salah ukuran.',
      location: 'Surabaya'
    },
    {
      id: '10',
      name: 'Hoodie Pria Terbaru',
      price: 262500,
      originalPrice: 350000,
      discount: 25,
      condition: 'Good',
      image: 'https://ryusei.co.id/cdn/shop/files/Artboard1_4b32a791-ac00-45d4-ae2f-2d9437c72f3d.png?v=1718953696',
      rating: 4.8,
      reviewCount: 20,
      seller: {
        name: 'Ryusei',
        rating: 4.5,
        responseTime: '< 1 hour'
      },
      isPremium: true,
      category: 'Fashion',
      description: 'Ukuran M. Pemakaian 1 tahun, dijual karena salah ukuran.',
      location: 'Surabaya'
    },
    {
      id: '11',
      name: 'Kursi Kerja Kantor Minimalis',
      price: 2000000,
      originalPrice: 2500000,
      discount: 20,
      condition: 'Good',
      image: 'https://img.lazcdn.com/g/p/3f4c5fe0b9e042ad537a3f38bbff72c6.jpg_720x720q80.jpg',
      rating: 4.8,
      reviewCount: 100,
      seller: {
        name: 'Baby Shop 22',
        rating: 4.5,
        responseTime: '< 1 hour'
      },
      isPremium: true,
      category: 'Furniture',
      description: 'Kursi Kerja Kursi Kantor Minimalis Dengan Roda. Sandaran tangan tegap',
      location: 'Surabaya'
    },
    {
      id: '12',
      name: 'Meja Belajar MB GL 982',
      price: 502500,
      originalPrice: 602500,
      discount: 17,
      condition: 'Good',
      image: 'https://inverio.co.id/wp-content/uploads/2022/01/Meja-Belajar-MB-GL-982.png',
      rating: 4.8,
      reviewCount: 100,
      seller: {
        name: 'INVERIO',
        rating: 4.5,
        responseTime: '< 1 hour'
      },
      isPremium: true,
      category: 'Furniture',
      description: 'Manufacturer : Grace. ColorSonoma : Oak. FinishingLapis : Paper. Materials : Kayu Olahan Particle Board',
      location: 'Surabaya'
    },
    {
      id: '13',
      name: 'Stora 68x35x70 Cm Rak Sepatu 3 Tingkat - Hitam',
      price: 132000,
      originalPrice: 150000,
      discount: 12,
      condition: 'Good',
      image: 'https://cdn.ruparupa.io/fit-in/850x850/filters:format(webp)/filters:watermark(content.ruparupa.io,products/wm/rr.png,0,-0,0,100,100)/ruparupa-com/image/upload/Products/10182428_1.jpg',
      rating: 5,
      reviewCount: 50,
      seller: {
        name: 'INVERIO',
        rating: 4.5,
        responseTime: '< 1 hour'
      },
      isPremium: false,
      category: 'Furniture',
      description: 'Material berkualitas tinggi. Instalasi mudah',
      location: 'Surabaya'
    },
    {
      id: '14',
      name: 'Metode Penelitian Kuantitatif Kualitatif Dan R&D karya Prof. Sugiyono',
      price: 106000,
      originalPrice: 150000,
      discount: 12,
      condition: 'Good',
      image: 'https://cdn.gramedia.com/uploads/picture_meta/2023/3/8/exqptqpg5zwe5zttmuxv7u.jpg',
      rating: 5,
      reviewCount: 50,
      seller: {
        name: 'Alfabeta',
        rating: 5,
        responseTime: '< 1 hour'
      },
      isPremium: false,
      category: 'Books',
      description: 'Metode Penelitian Kuantitatif Kualitatif Dan R&D Karya Prof. Dr. Sugiyono adalah buku yang berisi hal-hal yang berkaitan dengan penelitian, seperti penelitian kuantitatif, kualitatif, dan R&D.',
      location: 'Surabaya'
    },
    {
      id: '15',
      name: 'TARMAK Bola Basket BT900 Ukuran 7 Disetujui FIBA',
      price: 649000,
      originalPrice: 700000,
      discount: 7,
      condition: 'Good',
      image: 'https://contents.mediadecathlon.com/p2705092/k$34bfd1a1787dcb27067366160c047e32/bola-basket-bt900-ukuran-7-disetujui-fiba-tarmak-8648080.jpg?f=1920x0&format=auto',
      rating: 5,
      reviewCount: 50,
      seller: {
        name: 'Alfabeta',
        rating: 5,
        responseTime: '< 1 hour'
      },
      isPremium: false,
      category: 'Sports',
      description: 'Bola basket ukuran 7 cocok untuk anak laki-laki usia di atas 13 tahun yang bermain bola basket baik di dalam ruangan maupun di luar sesuai dengan aturan FIBA.',
      location: 'Surabaya'
    },
    {
      id: '16',
      name: 'Vas Bunga Gerabah Spayol',
      price: 322000,
      originalPrice: 600000,
      discount: 45,
      condition: 'Good',
      image: 'https://ntbmall.com/images/product/a90864be-2725-421f-bef0-f7ee141475ad/a90864be-2725-421f-bef0-f7ee141475ad-12022-02-18%2015:05:12.png',
      rating: 5,
      reviewCount: 50,
      seller: {
        name: 'Alfabeta',
        rating: 5,
        responseTime: '< 1 hour'
      },
      isPremium: false,
      category: 'Home & Garden',
      description: 'Vas bunga yang terbuat dari gerabah tanah liat Desa Banyuurip yang terkenal akan produksi kerajinan tanah liatnya. ',
      location: 'Surabaya'
    }
  ]

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'featured') return (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0)
    return 0
  })

  const premiumProducts = mockProducts.filter(p => p.isPremium)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id)
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { product, quantity: 1 }]
      }
    })
    alert(`${product.name} ditambahkan ke keranjang!`)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const removeCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeCartItem(productId)
      return
    }
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const openChat = (sellerName: string) => {
    alert(`Membuka chat dengan ${sellerName}...`)
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
      {product.isPremium && (
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Crown className="h-3 w-3" />
          Premium
        </div>
      )}
      
      <button
        onClick={() => toggleLike(product.id)}
        className="absolute top-2 right-2 z-10 bg-white/90 p-2 rounded-full hover:bg-white transition-all shadow-md"
      >
        <Heart 
          className={`h-4 w-4 ${likedProducts.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
        />
      </button>

      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={`Product photo of ${product.name} in ${product.condition} condition, showing front view with clear details`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-white" />
            <span className="text-white text-xs font-medium">Real Picture Verified</span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-base line-clamp-2 leading-tight">{product.name}</CardTitle>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md whitespace-nowrap font-medium">
            {product.condition}
          </span>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
          <Package className="h-3 w-3" />
          <span>{product.location}</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">{formatPrice(product.price)}</span>
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-md font-bold">
              -{product.discount}%
            </span>
          </div>
          <div className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/100x100" />
            <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">{product.seller.name}</div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{product.seller.rating}</span>
              <span className="text-gray-400">•</span>
              <Clock className="h-3 w-3" />
              <span>{product.seller.responseTime}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => openChat(product.seller.name)}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </Button>
        <Button 
          className="flex-1 bg-green-600 hover:bg-green-700"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Beli
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ReBoxed</h1>
                <p className="text-xs text-gray-600">Preloved Marketplace</p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari produk preloved berkualitas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Jual Barang
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Pesan
                  </Button>
                  <Button variant="outline" className="flex-1 relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Keranjang
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Jual Barang
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-teal-600 to-green-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Jual Beli Barang Preloved
              <br />
              <span className="text-yellow-300">Aman & Terpercaya</span>
            </h2>
            <p className="text-lg md:text-xl mb-8 text-green-50">
              Dapatkan barang berkualitas dengan harga terbaik. Semua produk dengan foto asli, garansi kepuasan, dan sistem pembayaran yang aman.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                <Search className="h-5 w-5 mr-2" />
                Mulai Belanja
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                <Crown className="h-5 w-5 mr-2" />
                Upgrade Premium
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Kenapa Pilih ReBoxed?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="text-center p-4 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Real Picture</h4>
              <p className="text-xs text-gray-600">Foto produk asli</p>
            </Card>

            <Card className="text-center p-4 hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Rating & Review</h4>
              <p className="text-xs text-gray-600">Ulasan pembeli asli</p>
            </Card>

            <Card className="text-center p-4 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Chat Langsung</h4>
              <p className="text-xs text-gray-600">Tanya penjual</p>
            </Card>

            <Card className="text-center p-4 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Pembayaran Aman</h4>
              <p className="text-xs text-gray-600">Uang terlindungi</p>
            </Card>

            <Card className="text-center p-4 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <RotateCcw className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Garansi Return</h4>
              <p className="text-xs text-gray-600">Jaminan uang kembali</p>
            </Card>

            <Card className="text-center p-4 hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Premium Boost</h4>
              <p className="text-xs text-gray-600">Tampil di atas</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Products */}
      <section className="py-12 px-4 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Produk Premium</h3>
                <p className="text-gray-600 text-sm">Barang pilihan yang ditampilkan lebih dulu</p>
              </div>
            </div>
            <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
              Lihat Semua
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Kategori Populer</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">
              {selectedCategory === 'All' ? 'Semua Produk' : selectedCategory}
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              <option value="featured">Unggulan</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-3xl font-bold mb-4">Upgrade ke Premium Seller</h3>
          <p className="text-lg mb-8 text-purple-100">
            Tingkatkan penjualan hingga 5x dengan menampilkan produk Anda di bagian paling atas! 
            Lebih banyak view, lebih cepat laku.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <TrendingUp className="h-8 w-8 mb-2 text-yellow-300" />
                <CardTitle>5x Lebih Terlihat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-100">Produk muncul di bagian teratas homepage</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <Award className="h-8 w-8 mb-2 text-yellow-300" />
                <CardTitle>Badge Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-100">Dapatkan badge gold eksklusif</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardHeader>
                <CheckCircle className="h-8 w-8 mb-2 text-yellow-300" />
                <CardTitle>Priority Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-100">Customer service khusus 24/7</p>
              </CardContent>
            </Card>
          </div>
          <Button size="lg" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold">
            <Crown className="h-5 w-5 mr-2" />
            Upgrade Sekarang
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Cara Kerja ReBoxed</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Cari & Pilih</h4>
              <p className="text-gray-600">
                Browse ribuan produk preloved berkualitas dengan foto asli dan deskripsi detail
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Chat & Negosiasi</h4>
              <p className="text-gray-600">
                Tanya detail produk langsung ke penjual, negosiasi harga dengan mudah
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Bayar & Terima</h4>
              <p className="text-gray-600">
                Bayar dengan aman, barang dikirim, dan berikan review setelah menerima
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">ReBoxed</h4>
              </div>
              <p className="text-sm">
                Platform jual beli barang preloved terpercaya di Indonesia. Aman, mudah, dan menguntungkan.
              </p>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Tentang Kami</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Tentang ReBoxed</a></li>
                <li><a href="#" className="hover:text-white">Cara Kerja</a></li>
                <li><a href="#" className="hover:text-white">Karir</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Bantuan</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-white">Cara Belanja</a></li>
                <li><a href="#" className="hover:text-white">Cara Jual</a></li>
                <li><a href="#" className="hover:text-white">Kebijakan Privasi</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Hubungi Kami</h5>
              <ul className="space-y-2 text-sm">
                <li>Email: support@reboxed.id</li>
                <li>Phone: +62 812 3456 7890</li>
                <li>WhatsApp: +62 812 3456 7890</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 ReBoxed. All rights reserved. Made with ❤️ in Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
