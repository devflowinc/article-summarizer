import Link from 'next/link'
import { ReactNode } from 'react'

const Anchor = ({ href, body }: { href: string | undefined; body: ReactNode | undefined }) => {
  if (!href || !body) return <></>

  return (
    <Link href={href} className="font-bold text-vivid-violet-500 underline">
      {body}
    </Link>
  )
}

export default Anchor
