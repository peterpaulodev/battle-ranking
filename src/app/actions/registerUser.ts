// lib/actions/createUser.ts
'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function registerUser({
  email,
  password,
  nome,
  slug
}: {
  email: string
  password: string
  nome: string
  slug: string
}) {
  const emailNormalized = email.trim().toLowerCase()
  const existingUser = await prisma.user.findUnique({ where: { email: emailNormalized } })
  if (existingUser) throw new Error('Email já está em uso.')

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email: emailNormalized,
      password: hashedPassword,
      name: nome,
      organizacao: {
        create: {
          nome,
          slug
        }
      }
    },
    include: {
      organizacao: true
    }
  })

  return newUser
}
