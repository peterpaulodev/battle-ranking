// app/admin/page.tsx
'use client'

import MCForm from '@/components/mc-form'
import { useState } from 'react'

export default function AdminPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Painel Admin</h1>
      <MCForm onSuccess={() => setShowSuccess(true)} />
      {showSuccess && <p className="mt-4 text-green-600">MC cadastrado com sucesso!</p>}
    </main>
  )
}
