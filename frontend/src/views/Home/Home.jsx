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
      <div className="bg-neutral-50 relative isolate max-h-screen px-6 pt-14 lg:px-8">
        <div className=" max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-start pt-14">
            <h1 className="font-medium tracking-tight text-gray-900 text-3xl">
              Lorem, ipsum dolor sit amet consectetur.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
          </div>
        </div>
      </div>
      <Features/>
      <AboutUs/>
      <News/>
      <Reviews/>
      <Footer/>
      <ScrollToTopButton/>
    </div>
  )
}
