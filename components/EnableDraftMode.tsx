'use client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function EnableDraftMode() {
  const router = useRouter()

  const handleClick = async () => {
    const secret = process.env.SANITY_PREVIEW_SECRET; // ✅ Use the same secret from .env.local
    await fetch(`/draftmode/enable?secret=${secret}`)
    router.refresh()
  }

  return (
    <Button 
      onClick={handleClick}
      className="fixed bottom-4 right-4 border border-green-500 bg-green-50 px-4 py-2 z-50 text-black hover:text-white hover:bg-green-500 hoverEffect"
    >
      Enable Draft Mode
    </Button>
  )
}
