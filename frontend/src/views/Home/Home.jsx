import Navbar from "./components/Navbar";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import News from "./components/News";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
export default function Home() {

  return (
    <div className="bg-white">
      <Navbar />
      <div className=" bg-red-50 relative isolate max-h-screen px-6 pt-14 lg:px-8">
        <div className=" max-w-2xl lg:pl-32 py-32 sm:py-48 lg:py-56">
          <div className="text-start pt-10 ">
            <h1 className="font-extrabold tracking-tighter text-gray-900 text-4xl w-9/12">
              Bienvenido al sistema de inscripción del PoloIT.
            </h1>
            <p className="mt-4 text-base leading-5 text-gray-800 w-10/12">
              Una plataforma innovadora que conecta automáticamente a mentores técnicos con egresados, facilitando su participación en diversas actividades y programas.
            </p>
          </div>
        </div>
      </div>
      <Features/>
      <News/>
      <AboutUs/>      
      <Reviews/>
      <Footer/>
      <ScrollToTopButton/>
    </div>
  )
}
