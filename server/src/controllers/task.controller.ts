import { Request, Response } from "express"
import { prisma } from "../config/prisma"

interface AuthRequest extends Request {
  userId?: number
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required" })
    }

    const task = await (prisma.task as any).create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.userId!,
      },
    })

    return res.status(201).json({
      message: "Task created successfully",
      task,
    })
  } catch (error) {
    console.error("CREATE TASK ERROR:", error)
    return res.status(500).json({ message: "Server error" })
  }
}


export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const skip = (page - 1) * limit

    const { completed, search } = req.query

    // Dynamic where object
    const where: any = {
      userId: req.userId,
    }

    // Filter by completed
    if (completed !== undefined) {
      where.completed = completed === "true"
    }

    // Search by title
    if (search) {
      where.title = {
        contains: String(search),
        mode: "insensitive",
      }
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.task.count({ where }),
    ])

    return res.status(200).json({
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      tasks,
    })
  } catch (error) {
    console.error("GET TASKS ERROR:", error)
    return res.status(500).json({ message: "Server error" })
  }
}

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id)
    const { title, description, completed, priority, dueDate } = req.body

    // Check if task exists & belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.userId,
      },
    })

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" })
    }

    const updatedTask = await (prisma.task as any).update({
      where: { id: taskId },
      data: {
        title: title ?? (existingTask as any).title,
        description: description ?? (existingTask as any).description,
        completed: completed ?? (existingTask as any).completed,
        priority: priority ?? (existingTask as any).priority,
        dueDate: dueDate ? new Date(dueDate) : (existingTask as any).dueDate,
      },
    })

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    })
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error)
    return res.status(500).json({ message: "Server error" })
  }
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id)

    // Check if task exists & belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.userId,
      },
    })

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" })
    }

    await prisma.task.delete({
      where: { id: taskId },
    })

    return res.status(200).json({
      message: "Task deleted successfully",
    })
  } catch (error) {
    console.error("DELETE TASK ERROR:", error)
    return res.status(500).json({ message: "Server error" })
  }
}