'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SlideUp, FadeIn } from '@/components/ui/animated-section'
import { Conversation, Message } from '@/lib/types'
import {
    ChevronRight,
    Search,
    Send,
    MoreVertical,
    Phone,
    Video,
    Image as ImageIcon,
    Smile,
    Check,
    CheckCheck,
    ArrowLeft,
    MessageCircle
} from 'lucide-react'

// Mock conversations
const mockConversations: Conversation[] = [
    {
        id: '1',
        participantId: 's1',
        participantName: 'TechStore Jakarta',
        participantAvatar: 'https://placehold.co/100x100',
        lastMessage: 'Barangnya masih ready kak',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
        unreadCount: 2
    },
    {
        id: '2',
        participantId: 's2',
        participantName: 'SneakerHub',
        participantAvatar: 'https://placehold.co/100x100',
        lastMessage: 'Oke kak, ditunggu ordernya ya!',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
        unreadCount: 0
    },
    {
        id: '3',
        participantId: 's3',
        participantName: 'LaptopPremium',
        participantAvatar: 'https://placehold.co/100x100',
        lastMessage: 'Garansi masih 6 bulan lagi kak',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
        unreadCount: 0
    },
    {
        id: '4',
        participantId: 's4',
        participantName: 'CameraShop',
        participantAvatar: 'https://placehold.co/100x100',
        lastMessage: 'Foto tambahan sudah dikirim ya',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
        unreadCount: 0
    }
]

// Mock messages
const mockMessages: Message[] = [
    { id: '1', senderId: 'user', receiverId: 's1', content: 'Halo kak, iPhone 12 Pro nya masih ada?', timestamp: new Date(Date.now() - 1000 * 60 * 30), read: true },
    { id: '2', senderId: 's1', receiverId: 'user', content: 'Hai kak! Masih ready', timestamp: new Date(Date.now() - 1000 * 60 * 25), read: true },
    { id: '3', senderId: 'user', receiverId: 's1', content: 'Battery health berapa kak?', timestamp: new Date(Date.now() - 1000 * 60 * 20), read: true },
    { id: '4', senderId: 's1', receiverId: 'user', content: 'Battery health 92% kak, masih bagus', timestamp: new Date(Date.now() - 1000 * 60 * 15), read: true },
    { id: '5', senderId: 'user', receiverId: 's1', content: 'Ada minus atau lecet ga?', timestamp: new Date(Date.now() - 1000 * 60 * 10), read: true },
    { id: '6', senderId: 's1', receiverId: 'user', content: 'Mulus kak, no minus sama sekali. Cuma pemakaian normal aja selama 1 tahun', timestamp: new Date(Date.now() - 1000 * 60 * 8), read: true },
    { id: '7', senderId: 's1', receiverId: 'user', content: 'Barangnya masih ready kak', timestamp: new Date(Date.now() - 1000 * 60 * 5), read: false },
]

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
    const [messageInput, setMessageInput] = useState('')
    const [messages, setMessages] = useState<Message[]>(mockMessages)
    const [searchQuery, setSearchQuery] = useState('')

    const formatTime = (date: Date) => {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / (1000 * 60))
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (minutes < 60) return `${minutes}m`
        if (hours < 24) return `${hours}h`
        return `${days}d`
    }

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedConversation) return

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: 'user',
            receiverId: selectedConversation.participantId,
            content: messageInput,
            timestamp: new Date(),
            read: false
        }

        setMessages([...messages, newMessage])
        setMessageInput('')
    }

    const filteredConversations = mockConversations.filter(c =>
        c.participantName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <FadeIn>
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Pesan</span>
                    </nav>
                </FadeIn>

                <SlideUp>
                    <Card className="border-gray-100 overflow-hidden h-[calc(100vh-200px)] min-h-[500px]">
                        <div className="flex h-full">
                            {/* Conversation List */}
                            <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                                <div className="p-4 border-b border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-3">Pesan</h2>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Cari percakapan..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    {filteredConversations.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <MessageCircle className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                                            <p className="text-gray-500">Tidak ada percakapan</p>
                                        </div>
                                    ) : (
                                        filteredConversations.map((conv) => (
                                            <button
                                                key={conv.id}
                                                onClick={() => setSelectedConversation(conv)}
                                                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${selectedConversation?.id === conv.id ? 'bg-emerald-50' : ''
                                                    }`}
                                            >
                                                <Avatar className="h-12 w-12 flex-shrink-0">
                                                    <AvatarImage src={conv.participantAvatar} />
                                                    <AvatarFallback className="bg-emerald-100 text-emerald-600">
                                                        {conv.participantName[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0 text-left">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold text-gray-900 truncate">{conv.participantName}</span>
                                                        <span className="text-xs text-gray-400">{formatTime(conv.lastMessageTime)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                                        {conv.unreadCount > 0 && (
                                                            <span className="bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                                                                {conv.unreadCount}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Chat Area */}
                            {selectedConversation ? (
                                <div className="flex-1 flex flex-col">
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setSelectedConversation(null)}
                                                className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                <ArrowLeft className="h-5 w-5" />
                                            </button>
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={selectedConversation.participantAvatar} />
                                                <AvatarFallback className="bg-emerald-100 text-emerald-600">
                                                    {selectedConversation.participantName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{selectedConversation.participantName}</h3>
                                                <p className="text-xs text-emerald-600">Online</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="rounded-xl">
                                                <Phone className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="rounded-xl">
                                                <Video className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="rounded-xl">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {messages.map((msg) => {
                                            const isMe = msg.senderId === 'user'
                                            return (
                                                <motion.div
                                                    key={msg.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`max-w-[70%] ${isMe ? 'order-2' : ''}`}>
                                                        <div className={`px-4 py-2.5 rounded-2xl ${isMe
                                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-md'
                                                                : 'bg-white border border-gray-100 text-gray-900 rounded-bl-md shadow-sm'
                                                            }`}>
                                                            <p className="text-sm">{msg.content}</p>
                                                        </div>
                                                        <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : ''}`}>
                                                            <span className="text-xs text-gray-400">
                                                                {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                            {isMe && (
                                                                msg.read
                                                                    ? <CheckCheck className="h-3 w-3 text-blue-500" />
                                                                    : <Check className="h-3 w-3 text-gray-400" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>

                                    {/* Message Input */}
                                    <div className="p-4 border-t border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <Button variant="ghost" size="icon" className="rounded-xl flex-shrink-0">
                                                <ImageIcon className="h-5 w-5 text-gray-400" />
                                            </Button>
                                            <div className="flex-1 relative">
                                                <Input
                                                    placeholder="Ketik pesan..."
                                                    value={messageInput}
                                                    onChange={(e) => setMessageInput(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                    className="pr-10 rounded-xl"
                                                />
                                                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <Smile className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                </button>
                                            </div>
                                            <Button
                                                size="icon"
                                                className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0"
                                                onClick={handleSendMessage}
                                                disabled={!messageInput.trim()}
                                            >
                                                <Send className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 hidden md:flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <MessageCircle className="h-10 w-10 text-gray-300" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Pilih Percakapan</h3>
                                        <p className="text-gray-500 text-sm">Pilih percakapan untuk mulai chat</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </SlideUp>
            </div>

            <Footer />
        </div>
    )
}
