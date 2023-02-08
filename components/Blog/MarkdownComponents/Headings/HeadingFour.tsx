import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

const HeadingFour = ({ children }: ReactMarkdownProps) => {
  return <div className="my-4 text-xl font-bold text-white">{children}</div>
}

export default HeadingFour
