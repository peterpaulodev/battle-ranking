'use client'

import { cn } from '@/lib/utils'
import { LoadingButton } from '@/components/ui/loading-button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState, useTransition } from 'react'

// auth.js
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false // para tratar manualmente o redirecionamento
      })
      if (res?.ok) {
        router.push('/admin') // ou para onde quiser redirecionar após login
      } else {
        setError('Email ou senha inválidos')
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
                <h1 className="text-2xl font-bold">Login - Battle Ranking</h1>
                <p className="text-muted-foreground text-balance">Entre na sua conta</p>
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
                  <Label htmlFor="password">Password</Label>
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
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <LoadingButton
                variant={'default'}
                isLoading={isPending}
                disabled={isPending}
                type="submit"
              >
                Entrar
              </LoadingButton>
              <div className="text-center text-sm">
                Não possui cadastro?{' '}
                <Link
                  className="underline underline-offset-4"
                  href="/login/registrar"
                >
                  Criar conta
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
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
