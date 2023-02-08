import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

const HeadingThree = ({ children }: ReactMarkdownProps) => {
  return <div className="my-4 text-2xl font-bold text-white">{children}</div>
}

export default HeadingThree
