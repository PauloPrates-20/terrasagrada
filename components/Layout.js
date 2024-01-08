import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className='main_container'>{children}</main>
      <Footer />
    </>
  )
}