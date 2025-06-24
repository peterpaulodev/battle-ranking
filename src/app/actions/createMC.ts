// app/actions/createMC.ts
'use server'

import { prisma } from '@/lib/prisma'

export async function createMC(nome: string) {
  if (!nome || typeof nome !== 'string') {
    throw new Error('Nome inválido')
  }

  const mc = await prisma.mC.create({
    data: { nome }
  })

  return mc
}
