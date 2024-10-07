import React, { useState } from 'react'
import { Search, Phone, Video, MoreVertical, Send } from 'lucide-react'

// Dummy data
const chats = [
      { id: 1, name: 'Murshed', lastMessage: 'tora to korbi bal cha...', time: '12:35 AM', avatar: '/placeholder.svg?height=40&width=40' },
      { id: 2, name: 'Redhe', lastMessage: 'Video call', time: 'Yesterday', avatar: '/placeholder.svg?height=40&width=40' },
      { id: 3, name: '+880 1706-28...', lastMessage: 'Video call', time: 'Yesterday', avatar: '/placeholder.svg?height=40&width=40' },
      // Add more chat entries as needed
]

const messages = [
      { id: 1, sender: 'other', content: 'humm', time: '12:29 AM' },
      { id: 2, sender: 'other', content: 'amar account diye nili taholei hobe', time: '12:29 AM' },
      { id: 3, sender: 'me', content: 'accha', time: '12:29 AM' },
      { id: 4, sender: 'me', content: 'doob er website ta dekhlam UI change korsos', time: '12:32 AM' },
      { id: 5, sender: 'me', content: 'joss lage ekhon dekhte', time: '12:32 AM' },
      { id: 6, sender: 'me', content: 'specially AI generated image gula', time: '12:33 AM' },
      { id: 7, sender: 'other', content: 'aro change hobe aste aste', time: '12:33 AM' },
      // Add more messages as needed
]

export default function App() {
      const [selectedChat, setSelectedChat] = useState(chats[0])

      return (
            <div className="flex h-screen bg-gray-900 text-gray-100">
                  {/* Sidebar */}
                  <div className="w-1/4 border-r border-gray-800">
                        <div className="p-4">
                              <div className="relative">
                                    <input
                                          type="text"
                                          placeholder="Search"
                                          className="w-full bg-gray-800 rounded-md py-2 pl-10 pr-4"
                                    />
                                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                              </div>
                        </div>
                        <div className="overflow-y-auto h-[calc(100vh-80px)]">
                              {chats.map((chat) => (
                                    <div
                                          key={chat.id}
                                          className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer ${selectedChat.id === chat.id ? 'bg-gray-800' : ''
                                                }`}
                                          onClick={() => setSelectedChat(chat)}
                                    >
                                          <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
                                          <div className="flex-1">
                                                <h3 className="font-semibold">{chat.name}</h3>
                                                <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                                          </div>
                                          <span className="text-xs text-gray-500">{chat.time}</span>
                                    </div>
                              ))}
                        </div>
                  </div>

                  {/* Chat window */}
                  <div className="flex-1 flex flex-col">
                        {/* Chat header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-800">
                              <div className="flex items-center">
                                    <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                          <h2 className="font-semibold">{selectedChat.name}</h2>
                                          <p className="text-sm text-gray-400">online</p>
                                    </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                    <Phone className="text-gray-400 cursor-pointer" size={20} />
                                    <Video className="text-gray-400 cursor-pointer" size={20} />
                                    <Search className="text-gray-400 cursor-pointer" size={20} />
                                    <MoreVertical className="text-gray-400 cursor-pointer" size={20} />
                              </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                              {messages.map((message) => (
                                    <div
                                          key={message.id}
                                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                          <div
                                                className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === 'me' ? 'bg-blue-600' : 'bg-gray-700'
                                                      }`}
                                          >
                                                <p>{message.content}</p>
                                                <span className="text-xs text-gray-400 block mt-1">{message.time}</span>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {/* Message input */}
                        <div className="p-4 border-t border-gray-800">
                              <div className="flex items-center bg-gray-800 rounded-lg">
                                    <input
                                          type="text"
                                          placeholder="Type a message"
                                          className="flex-1 bg-transparent p-2 focus:outline-none"
                                    />
                                    <button className="p-2 text-blue-500">
                                          <Send size={20} />
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
