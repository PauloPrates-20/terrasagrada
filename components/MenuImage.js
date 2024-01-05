import Image from "next/image";

export default function MenuImage({ path }) {
  const imgWd =  1080;
  const imgHt = imgWd;

  return <Image 
    src={path}
    width={imgWd}
    height={imgHt}
    alt=''
  />
}