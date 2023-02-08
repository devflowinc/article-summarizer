import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

const HeadingTwo = ({ children }: ReactMarkdownProps) => {
  return <div className="my-4 text-3xl font-bold text-white">{children}</div>
}

export default HeadingTwo
