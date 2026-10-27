import { site } from '@/config/site'

export function Monogram({ size = 36 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-xl border border-line bg-elevated font-mono font-semibold tracking-tight"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      <span className="gradient-text">{site.initials}</span>
    </span>
  )
}
