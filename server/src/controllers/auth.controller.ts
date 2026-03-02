import { Request, Response } from "express"
import { prisma } from "../config/prisma"
import { hashPassword } from "../utils/hashPassword"

import { comparePassword } from "../utils/hashPassword"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken"

import jwt from "jsonwebtoken"

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: "Server error" })
  }
}


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    })
  } catch (error) {
    return res.status(500).json({ message: "Server error" })
  }
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" })
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { userId: number }

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "15m" }
    )

    return res.status(200).json({
      accessToken: newAccessToken,
    })
  } catch (error) {
    console.error("REFRESH TOKEN ERROR:", error)
    return res.status(401).json({ message: "Invalid or expired refresh token" })
  }
}


export const logoutUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
    })
  } catch (error) {
    return res.status(500).json({ message: "Server error" })
  }
}




