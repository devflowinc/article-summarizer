import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

const HeadingSix = ({ children }: ReactMarkdownProps) => {
  return <div className="text-xl font-bold text-white">{children}</div>
}

export default HeadingSix
