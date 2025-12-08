export interface Seller {
    id: string
    name: string
    avatar: string
    rating: number
    responseTime: string
    totalSales: number
    verified: boolean
}

export interface Product {
    id: string
    name: string
    price: number
    originalPrice: number
    discount: number
    condition: 'Like New' | 'Good' | 'Fair'
    image: string
    images: string[]
    rating: number
    reviewCount: number
    seller: Seller
    isPremium: boolean
    category: string
    description: string
    location: string
    stock: number
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface User {
    id: string
    name: string
    email: string
    avatar: string
    phone: string
    address: Address
}

export interface Address {
    street: string
    city: string
    province: string
    postalCode: string
    country: string
}

export interface Order {
    id: string
    items: CartItem[]
    total: number
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
    paymentMethod: string
    shippingAddress: Address
    createdAt: Date
}

export interface Message {
    id: string
    senderId: string
    receiverId: string
    content: string
    timestamp: Date
    read: boolean
}

export interface Conversation {
    id: string
    participantId: string
    participantName: string
    participantAvatar: string
    lastMessage: string
    lastMessageTime: Date
    unreadCount: number
}
