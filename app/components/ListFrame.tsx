export default function ListFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className='h:1/2 w-full border border-titleColor rounded-xl md:w-1/2 md:h-full'>
      {children}
    </div>
  );
}