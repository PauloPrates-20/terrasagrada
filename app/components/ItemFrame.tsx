export default function ItemFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-4 h-96 w-full relative mb-4 border border-titleColor rounded-xl flex flex-col md:my-0 md:mx-auto md:w-1/2 md:h-fit md:text-base overflow-scroll scroll'>
      {children}
    </div>
  );
}