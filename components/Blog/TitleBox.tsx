import { BlogFrontMatter } from '../../domain/blog'

const TitleBox = ({ title, author, date, description, image, tags, slug }: BlogFrontMatter) => {
  return (
    <div className="mb-8 w-full px-[20%] lg:mb-36">
      <div className="flex w-full justify-center">
        <img src={image} alt={title} className="max-h-[400px] rounded-[20px]" />
      </div>
      <div className="mt-2 flex w-full justify-center text-white">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-center text-[48px]">{title}</div>
          <div className="text-center text-[20px]">{description}</div>
          <div className="text-center text-[14px]">By: {author}</div>
          <div className="text-center text-[14px]">{new Date(date).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}

export default TitleBox
