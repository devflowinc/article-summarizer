import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

const HeadingFive = ({ children }: ReactMarkdownProps) => {
  return <div className="my-4 font-bold text-white">{children}</div>;
};

export default HeadingFive;
