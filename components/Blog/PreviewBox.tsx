/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { BlogFrontMatter } from '../../../arguflow/targets/landing-page/domain/blog'

const PreviewBox = ({ title, author, date, description, image, tags, slug }: BlogFrontMatter) => {
  return (
    <Link className="h-full w-full animate-fade-in-500 bg-transparent" href={`/blog/${slug}`}>
      <div className="flex h-full w-full flex-col justify-center rounded-[20px] bg-mine-shaft-500/[.80] px-6 pb-6 pt-3 align-middle lg:mt-2">
        <img src={image} alt={title} className="rounded-[20px]" />
        <div className="mt-3 text-[24px] text-white">{title}</div>
        <div className="mt-3 text-[16px] text-white">{description}</div>
      </div>
    </Link>
  )
}

export default PreviewBox
