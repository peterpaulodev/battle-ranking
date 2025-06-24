'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createMC } from '@/app/actions/createMC'
import { LoadingButton } from '@/components/ui/loading-button'
import { Combobox } from '@/components/ui/combobox'
import { getCities, states } from '@/utils/cities'

type Props = {
  onSuccess?: () => void
}

export default function MCForm({ onSuccess }: Props) {
  const [form, setForm] = useState({ nome: '', apelido: '', cidade: '', estado: '' })
  const [cities, setCities] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await createMC(form)
        setForm({ nome: '', apelido: '', cidade: '', estado: '' })
        onSuccess?.()
      } catch (error) {
        console.error('REQUEST ERROR: ', error)
        alert(error)
      }
    })
  }

  const getCityByState = async (state: string) => {
    const citiesByState = await getCities(state)

    setCities(citiesByState)
    setForm({ ...form, estado: state })
  }

  const handleCityChange = (city: string) => {
    setForm({ ...form, cidade: city })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid gap-3">
        <Label htmlFor="nome">Nome do MC</Label>
        <Input
          name="nome"
          placeholder="Roberto Alves"
          onChange={handleChange}
          value={form.nome}
          disabled={isPending}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="apelido">Apelido/Vulgo do MC</Label>
        <Input
          name="apelido"
          placeholder="Betinho"
          onChange={handleChange}
          value={form.apelido}
          disabled={isPending}
        />
      </div>

      <div className="flex w-full gap-3">
        <div className="w-1/2 grid gap-3">
          <Label htmlFor="nome">Estado</Label>
          <Combobox
            options={states}
            value={form.estado}
            onChange={getCityByState}
            placeholder="Selecione o estado"
            emptyText="Nenhum estado encontrado."
            className="w-full"
          />
        </div>
        <div className="w-1/2 grid gap-3">
          <Label htmlFor="nome">Cidade</Label>
          <Combobox
            options={cities}
            value={form.cidade}
            onChange={handleCityChange}
            placeholder="Selecione a cidade"
            emptyText="Nenhuma cidade encontrada."
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-5">
        <LoadingButton
          variant={'default'}
          isLoading={isPending}
          disabled={isPending}
          type="submit"
        >
          Salvar
        </LoadingButton>
      </div>
    </form>
  )
}
