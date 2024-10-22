import { Heading } from "@radix-ui/themes";
import Mentoresimg from "@/assets/Mentores.png";
import Egresadoimg from "@/assets/Egresado.png";
const AboutUs = () => {
    return (
        <div id="nosotros" className="from-transparent from-10% via-rose-50 via-50% to-blue-50 to-100% bg-gradient-to-b bg-opacity-5">
            <div className="mx-auto pt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 px-8 ">
                <article className="flex max-w-xl flex-col md:items-start justify-between">
                    <div className="group relative">
                        <Heading className="mt-3 md:text-4xl font-semibold leading-6 text-gray-800">
                            Mentores
                        </Heading>
                        <p className="mt-5 line-clamp-3 text-base leading-5 text-gray-800">Los mentores técnicos son profesionales expertos en diversas tecnologías, proporcionados por empresas colaboradoras, que desempeñan un papel crucial en el desarrollo y crecimiento de los egresados durante el programa de aceleración. 
                        </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img src={Mentoresimg} alt="mentores" />
                    </div>
                </article>
                <article className="flex max-w-xl flex-col md:items-end justify-between">
                    
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img src={Egresadoimg} alt="egresados" 
                             />
                    </div>
                    <div className="relative">
                        <Heading className="mt-3 md:text-4xl font-semibold leading-6 text-start md:text-end text-gray-800">
                            Egresados
                        </Heading>
                        <p className="mt-5 line-clamp-3 text-base md:text-end leading-5 text-gray-800">Los egresados de las distintas ONG han completado programas de formación y capacitación ofrecidos por organizaciones no gubernamentales. Estos programas suelen enfocarse en proporcionar habilidades técnicas, profesionales y personales.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    )
}
export default AboutUs