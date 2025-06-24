// app/actions/createMC.ts
'use server'

import { prisma } from '@/lib/prisma'

type CreateMCParams = {
  nome?: string
  apelido: string
  cidade?: string
  estado?: string
}

export async function createMC({ nome, apelido, cidade, estado }: CreateMCParams) {
  if (!apelido || typeof apelido !== 'string') {
    throw new Error('Apelido/Vulgo do MC inválido')
  }

  const existingMC = await prisma.mC.findUnique({ where: { apelido } })
  if (existingMC) {
    throw new Error('MC com apelido/Vulgo ' + apelido + ' j&aacute; cadastrado.')
  }

  const mc = await prisma.mC.create({
    data: {
      nome,
      apelido,
      cidade,
      estado
    }
  })

  return mc
}
