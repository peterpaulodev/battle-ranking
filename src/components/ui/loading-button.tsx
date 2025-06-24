// src/components/LoadingButton.tsx
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

type LoadingButtonProps = {
  isLoading: boolean
  children: React.ReactNode
  disabled?: boolean
  variant?: 'outline' | 'link' | 'default' | 'destructive' | 'secondary' | 'ghost' | null
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export function LoadingButton({
  isLoading,
  children,
  disabled,
  variant = 'outline',
  type = 'button',
  onClick
}: LoadingButtonProps) {
  return (
    <Button
      variant={variant}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2Icon
            className="animate-spin mr-2"
            size={16}
          />{' '}
          Salvando...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
