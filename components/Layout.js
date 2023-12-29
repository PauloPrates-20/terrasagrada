import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({children}) {
  return (
    <>
      <Navbar />
      <div className='main_container'>{children}</div>
      <Footer />
    </>
  )
}