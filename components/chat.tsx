'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Send, Bot, User } from "lucide-react"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const scrollToBottom = () => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages, input]);

  // Add this after your existing useEffect
    useEffect(() => {
    if (!isLoading) {
      const inputElement = document.querySelector('input');
      inputElement?.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const aiMessage = { 
        role: 'assistant' as const, 
        content: 'This is a simulated response. Replace this with your actual AI integration.'
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <Card className="relative w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl shadow-xl border-0 bg-white/80 backdrop-blur-xl mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-500" />
            <h1 className="font-semibold text-purple-950">AI Assistant</h1>
          </div>
          <div className="text-xs text-purple-400">Online</div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full">
            <div className="px-4 md:px-6 space-y-6 py-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-[85%] md:max-w-[75%] items-start gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-violet-500 to-purple-500 text-white' 
                        : 'bg-gradient-to-br from-pink-500 to-rose-500 text-white'
                    }`}>
                      {message.role === 'user' 
                        ? <User className="h-4 w-4" />
                        : <Bot className="h-4 w-4" />
                      }
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-violet-500 to-purple-500 text-white'
                          : 'bg-white border border-purple-100 text-slate-600'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-purple-100 rounded-2xl px-4 py-2.5 text-slate-600 shadow-sm">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        <div className="p-4 md:p-6 bg-gradient-to-b from-white/50 to-white border-t border-purple-100">
          <form onSubmit={handleSubmit} className="flex gap-4 items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white border-purple-100 focus-visible:ring-purple-500 rounded-xl"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading} 
              size="icon"
              className="rounded-xl w-11 h-11 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}