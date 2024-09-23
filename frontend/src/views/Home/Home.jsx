import Navbar from "./components/Navbar";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import News from "./components/News";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ImgHero from "../../assets/poloITimgHero.png";
import { Container, Heading, Text, Box } from "@radix-ui/themes";
export default function Home() {

  return (
    <div className="bg-white ">
      <Navbar />
      <Container className="flex flex-column flex-wrap align-middle justify-center w-full gap-4 from-blue-300 to-red-300 bg-gradient-to-tl relative isolate h-screen px-4 pt-10 lg:px-8">
        <section className="flex-column flex-wrap align-middle pl-10">
          <Heading as="h1" className="md:w-[50%] text-left flex-wrap">Bienvenido al sistema de inscripción del PoloIT.</Heading>
          <Text as="p" className="md:w-[50%] text-left flex-wrap">Una plataforma innovadora que conecta automáticamente a mentores técnicos con egresados, facilitando su participación en diversas actividades y programas.</Text>
        </section>
        <Box style={{
          position: "absolute",
          bottom:0,
          right:0,
          paddingBottom:"2rem",
          paddingRight:"4rem",
          gap:2,
          flexWrap:"wrap",
        }}> 
          <img src={ImgHero} alt="" style={{sm:{display:"none"}, md:{width:"400px", flexWrap:"wrap"}} }className="w-[400px] flex-wrap"/>
        </Box>
      </Container>
      <Features />
      <News />
      <AboutUs />
      <Reviews />
      <Footer />
      <ScrollToTopButton />
    </div >
  )
}
