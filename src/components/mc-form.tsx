'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { createMC } from '@/app/actions/createMC'
import { LoadingButton } from '@/components/ui/loading-button'

type Props = {
  onSuccess?: () => void
}

export default function MCForm({ onSuccess }: Props) {
  const [nome, setNome] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await createMC(nome)
        setNome('')
        onSuccess?.()
      } catch (error) {
        console.error('REQUEST ERROR: ', error)
        alert('Erro ao cadastrar MC')
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        placeholder="Nome do MC"
        onChange={(e) => setNome(e.target.value)}
        value={nome}
        disabled={isPending}
      />

      <LoadingButton
        variant={'default'}
        isLoading={isPending}
        disabled={isPending}
        type="submit"
      >
        Salvar
      </LoadingButton>
    </form>
  )
}
