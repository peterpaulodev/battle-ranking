'use server'

import { prisma } from '@/lib/prisma'

export async function getRanking(slug: string) {
  const ranking = await prisma.organizacao.findUnique({
    where: { slug: slug },
    include: {
      edicoes: {
        include: {
          batalhas: {
            include: {
              pontuacoes: {
                include: { mc: true }
              }
            }
          }
        }
      }
    }
  })

  return ranking
}
