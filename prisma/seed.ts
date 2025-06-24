import { PrismaClient, TipoPontuacao } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar organizações
  const [novaEra, sn7] = await Promise.all([
    prisma.organizacao.upsert({
      where: { slug: 'nova-era' },
      update: {},
      create: {
        nome: 'Batalha Nova Era',
        slug: 'nova-era',
      }
    }),
    prisma.organizacao.upsert({
      where: { slug: 'sn7' },
      update: {},
      create: {
        nome: 'Batalha SN7',
        slug: 'sn7',
      }
    }),
  ])

  // Criar MCs
  const [mcA, mcB, mcC] = await Promise.all([
    prisma.mC.create({ data: { nome: 'MC Alpha', cidade: 'SP' } }),
    prisma.mC.create({ data: { nome: 'MC Bravo', cidade: 'RJ' } }),
    prisma.mC.create({ data: { nome: 'MC Charlie', cidade: 'MG' } }),
  ])

  // Criar edições
  const edicaoNovaEra = await prisma.edicao.create({
    data: {
      nome: '1ª Edição Nova Era',
      organizacaoId: novaEra.id
    }
  })

  const edicaoSN7 = await prisma.edicao.create({
    data: {
      nome: '1ª Edição SN7',
      organizacaoId: sn7.id
    }
  })

  // Criar batalhas com participações e pontuações

  const batalhaNovaEra = await prisma.batalha.create({
    data: {
      edicaoId: edicaoNovaEra.id,
      campeaoId: mcA.id,
      viceId: mcB.id,
      participacoes: {
        create: [
          { mcId: mcA.id, ordem: 1 },
          { mcId: mcB.id, ordem: 2 },
          { mcId: mcC.id, ordem: 3 },
        ]
      },
      pontuacoes: {
        create: [
          { mcId: mcA.id, tipo: 'CAMPEAO', pontos: 10 },
          { mcId: mcB.id, tipo: 'VICE', pontos: 5 },
          { mcId: mcC.id, tipo: 'SEMI', pontos: 3 },
        ]
      }
    }
  })

  const batalhaSN7 = await prisma.batalha.create({
    data: {
      edicaoId: edicaoSN7.id,
      campeaoId: mcC.id,
      viceId: mcA.id,
      participacoes: {
        create: [
          { mcId: mcA.id, ordem: 1 },
          { mcId: mcB.id, ordem: 2 },
          { mcId: mcC.id, ordem: 3 },
        ]
      },
      pontuacoes: {
        create: [
          { mcId: mcC.id, tipo: 'CAMPEAO', pontos: 10 },
          { mcId: mcA.id, tipo: 'VICE', pontos: 5 },
          { mcId: mcB.id, tipo: 'SEMI', pontos: 3 },
        ]
      }
    }
  })

  console.log('🌱 Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
