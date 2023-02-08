import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

const HeadingOne = ({ children }: ReactMarkdownProps) => {
  return <div className="my-4 text-4xl font-bold text-white">{children}</div>
}

export default HeadingOne
