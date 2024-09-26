import { Flex, Heading, Text } from "@radix-ui/themes";
const News = () => {
    return (
        <div id="novedades" className=" bg-gradient-to-tl from-blue-50 from-0% via-rose-50 via-30% to-transparent to-100% bg-opacity-5">
            <Flex direction="column" justify="center" px="5" >
                <Heading size="8" className="py-10 text-gray-800 mx-auto w-full sm:text-center lg:mx-0">
                    Proximo Evento
                </Heading>
                <figure className="md:flex border-2 border-solid bg-neutral-50 border-sky-900 rounded-xl p-4 md:p-0 items-center shadow-md shadow-slate-400">
                    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                        <blockquote>
                            <p className="text-3xl text-sky-900 font-medium text-center">
                                10 octubre 2024
                            </p>
                        </blockquote>
                    </div>
                    <div className="pt-2 md:p-8 text-center md:text-left space-y-4">
                        <Heading as="h1" size="7" className="text-red-800  font-black tracking-wide leading-5">Acelerador IT</Heading>
                        <Text as="div">Este programa ofrece un paquete exclusivo de contenidos técnicos asincrónicos y sesiones sincrónicas de acompañamiento profesional, brindadas por empresas socias del Polo IT. A lo largo del evento, trabajarás tanto en habilidades soft como en hard, con el objetivo de refinar y potenciar tu perfil.
                        </Text>
                        <Text as="div">
                            Si ya tienes conocimientos en programación, pero aún no te sientes listo para dar el salto al mercado laboral en tu primera etapa profesional, El Acelerador es la oportunidad perfecta para preparar tu camino y alcanzar el siguiente nivel.
                        </Text>
                    </div>
                </figure>
            </Flex>
        </div >
    )
}

export default News