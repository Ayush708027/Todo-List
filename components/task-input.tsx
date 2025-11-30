"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface TaskInputProps {
  onAdd: (text: string) => void
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border-slate-300 bg-slate-50 focus:bg-white text-base placeholder:text-slate-400"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 gap-2">
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Add</span>
      </Button>
    </form>
  )
}
