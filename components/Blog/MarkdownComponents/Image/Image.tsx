/* eslint-disable @next/next/no-img-element */
const Image = ({ src, about }: { src: string | undefined; about: string | undefined }) => {
  if (!src) return <></>

  return (
    <div className="flex w-full justify-start py-8">
      <div className="w-fit">
        <img className="rounded-[20px]" src={src} alt={about} />
        {about && <div className="px-4 text-center text-white">{about}</div>}
      </div>
    </div>
  )
}

export default Image
