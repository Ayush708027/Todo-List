"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Edit2, Trash2, Check, X } from "lucide-react"

interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onUpdate: (id: string, newText: string) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onToggle, onUpdate, onDelete }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const startEdit = (task: Task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      onUpdate(id, editText)
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
        <div className="text-6xl mb-4">✨</div>
        <p className="text-slate-400 text-lg font-medium">No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl shadow-md shadow-slate-200/50 p-4 sm:p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-slate-200/80 transition-all duration-200 border border-slate-100 group"
        >
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="w-5 h-5 flex-shrink-0"
          />

          {editingId === task.id ? (
            <div className="flex-1 flex gap-2">
              <Input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 border-slate-300 focus:border-blue-500"
                autoFocus
              />
              <Button
                onClick={() => saveEdit(task.id)}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button onClick={cancelEdit} size="sm" variant="outline" className="border-slate-300 bg-transparent">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <span
                className={`flex-1 text-base font-medium transition-all ${
                  task.completed ? "line-through text-slate-400" : "text-slate-700"
                }`}
              >
                {task.text}
              </span>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={() => startEdit(task)}
                  size="sm"
                  variant="ghost"
                  className="text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onDelete(task.id)}
                  size="sm"
                  variant="ghost"
                  className="text-slate-600 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
