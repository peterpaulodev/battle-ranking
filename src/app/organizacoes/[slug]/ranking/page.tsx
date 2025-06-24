import { notFound } from 'next/navigation'
import { getRanking } from '@/app/actions/getRanking'

type Props = {
  params: { slug: string }
}

export default async function RankingPage({ params }: Props) {
  const organizacao = await getRanking(params.slug)

  if (!organizacao) return notFound()

  const pontuacoesMap = new Map<string, { nome: string; total: number }>()

  for (const edicao of organizacao.edicoes) {
    for (const batalha of edicao.batalhas) {
      for (const pontuacao of batalha.pontuacoes) {
        const id = pontuacao.mc.id
        if (!pontuacoesMap.has(id)) {
          pontuacoesMap.set(id, { nome: pontuacao.mc.nome, total: 0 })
        }
        pontuacoesMap.get(id)!.total += pontuacao.pontos
      }
    }
  }

  const ranking = Array.from(pontuacoesMap.values()).sort((a, b) => b.total - a.total)

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Ranking - {organizacao.nome}</h1>
      <ol className="space-y-2">
        {ranking.map((mc, index) => (
          <li
            key={mc.nome}
            className="flex justify-between border-b pb-2"
          >
            <span>
              #{index + 1} - {mc.nome}
            </span>
            <span>{mc.total} pts</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
