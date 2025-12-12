import Link from 'next/link'
import Image from 'next/image'
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="bg-transparent p-0 rounded-xl">
                                {/* Logo Image */}
                                <Image
                                    src="/logo.jpg"
                                    alt="ReBoxed Logo"
                                    width={40}
                                    height={40}
                                    className="rounded-xl shadow-lg border border-gray-100/10"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">ReBoxed</h4>
                                <p className="text-xs text-gray-500">PRELOVED MARKETPLACE</p>
                            </div>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Platform jual beli barang preloved terpercaya di Indonesia. Aman, mudah, dan menguntungkan untuk semua.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 rounded-xl flex items-center justify-center transition-all duration-300"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Tentang Kami</h5>
                        <ul className="space-y-3">
                            {['Tentang ReBoxed', 'Karir', 'Blog', 'Press Kit'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h5 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Bantuan</h5>
                        <ul className="space-y-3">
                            {['Pusat Bantuan', 'Cara Belanja', 'Cara Jual', 'Kebijakan Privasi', 'Syarat & Ketentuan'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h5 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Hubungi Kami</h5>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="h-4 w-4 mt-0.5 text-emerald-400" />
                                <span className="text-sm text-gray-400">support@reboxed.id</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-4 w-4 mt-0.5 text-emerald-400" />
                                <span className="text-sm text-gray-400">+62 812 3456 7890</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 mt-0.5 text-emerald-400" />
                                <span className="text-sm text-gray-400">Surabaya, Indonesia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © 2025 ReBoxed. All rights reserved. Made with ❤️ in Indonesia
                        </p>
                        <div className="flex items-center gap-6">
                            <span className="text-xs text-gray-600">Pembayaran Aman:</span>
                            <div className="flex gap-2">
                                {['BCA', 'Mandiri', 'GoPay', 'OVO'].map((method) => (
                                    <span
                                        key={method}
                                        className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400"
                                    >
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
