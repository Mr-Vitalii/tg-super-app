import React, { Suspense } from 'react'

const LazyLightboxImpl = React.lazy(async () => {
  const mod = await import('yet-another-react-lightbox')
  await import('yet-another-react-lightbox/styles.css')
  return { default: mod.default }
})

export interface LightboxLazyProps {
  open: boolean
  index: number
  slides: { src: string }[]
  onClose: () => void
}

const LightboxLazy: React.FC<LightboxLazyProps> = ({
  open,
  index,
  slides,
  onClose,
}) => {
  if (!open) return null

  return (
    <Suspense fallback={null}>
      <LazyLightboxImpl
        open={open}
        close={onClose}
        index={index}
        slides={slides}
      />
    </Suspense>
  )
}

export default React.memo(LightboxLazy)
