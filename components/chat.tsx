'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Send } from "lucide-react"

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
      const isAtBottom = Math.abs(
        scrollArea.scrollHeight - scrollArea.clientHeight - scrollArea.scrollTop
      ) < 100;
      
      // Always scroll when adding a new message
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  };
  
  // useEffect now watches input as well
  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages, input]); // Added input as a dependency

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
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-slate-50 to-slate-100">
      <Card className="relative w-full max-w-4xl h-[85vh] flex flex-col rounded-xl shadow-lg border-0 bg-white/70 backdrop-blur-lg overflow-hidden">
        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full">
            <div className="px-4 md:px-8 space-y-8 py-8">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-[85%] md:max-w-[75%] items-center gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100'
                    }`}>
                      {message.role === 'user' ? 'U' : 'AI'}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2.5 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      AI
                    </div>
                    <div className="bg-slate-100 rounded-2xl px-4 py-2.5 text-slate-800">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        <CardContent className="border-t bg-white p-4 md:p-6">
          <form onSubmit={handleSubmit} className="flex gap-4 items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-100 border-0 focus-visible:ring-blue-600"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading} 
              size="icon"
              className="rounded-full h-10 w-10 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}