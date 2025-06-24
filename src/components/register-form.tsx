'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { registerUser } from '@/app/actions/registerUser'
import { useState, useTransition } from 'react'
import { LoadingButton } from '@/components/ui/loading-button'
import { useRouter } from 'next/navigation'

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: ''
  })
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    isEqual: true
  })

  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setConfirmPassword({
      value,
      isEqual: formData.password === value
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target

    setFormData((prev) => {
      const newFormData = { ...prev, [id]: value }

      if (id === 'password') {
        setConfirmPassword((prevConfirm) => ({
          ...prevConfirm,
          isEqual: value === prevConfirm.value
        }))
      }

      return newFormData
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    startTransition(async () => {
      try {
        const slug = formData.nome.toLowerCase().replace(/\s+/g, '-')
        await registerUser({ ...formData, slug })
        router.push('/login')
        alert('Usuário registrado com sucesso!')
      } catch (error) {
        console.error('REQUEST ERROR: ', error)
        alert('Erro ao registrar usuário: ' + error)
      }
    })
  }

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Cadastro - Battle Ranking</h1>
                <p className="text-muted-foreground text-balance">Crie sua conta</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="nome">Nome da Organização</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Batalha Nova Era"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Confirme a senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  onChange={handleConfirmPassword}
                />
                {!confirmPassword.isEqual && (
                  <p className="text-sm text-red-500">Senhas diferentes</p>
                )}
              </div>
              <LoadingButton
                variant={'default'}
                isLoading={isPending}
                disabled={isPending}
                type="submit"
              >
                Cadastrar
              </LoadingButton>

              <div className="text-center text-sm">
                Já possui cadastro?{' '}
                <Link
                  className="underline underline-offset-4"
                  href="/login"
                >
                  Entrar
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            {/* <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            /> */}
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
