"use client"

import { useState, useEffect } from "react"
import TaskInput from "@/components/task-input"
import TaskList from "@/components/task-list"
import Stats from "@/components/stats"

interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks([newTask, ...tasks])
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const updateTask = (id: string, newText: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 tracking-tight">My Tasks</h1>
          <p className="text-slate-500 text-lg">Stay organized and track your progress</p>
        </div>

        {/* Stats Card */}
        <Stats completed={completedCount} total={totalCount} />

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6 sm:p-8 mb-8 border border-slate-100">
          <TaskInput onAdd={addTask} />
        </div>

        {/* Tasks List */}
        {isLoading ? (
          <div className="text-center text-slate-400 py-12">Loading your tasks...</div>
        ) : (
          <TaskList tasks={tasks} onToggle={toggleTask} onUpdate={updateTask} onDelete={deleteTask} />
        )}
      </div>
    </main>
  )
}
