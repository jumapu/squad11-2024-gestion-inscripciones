import { Flex, Heading, Text } from "@radix-ui/themes";
import Paso1 from "@/assets/Paso1.png";
import Paso2 from "@/assets/Paso2.png";
import Paso3 from "@/assets/Paso3.png";
import Paso4 from "@/assets/Paso4.png";
const Features = () => {
    return (
        <div id="caracteristicas" className="from-blue-50 from-5% via-rose-50 via-50% to-bluee-50 to-90% bg-gradient-to-bl bg-opacity-5">
            <Flex align="center" justify="center" direction="column" p="8" maxHeight="50vh">
                <Heading size="8" weight="medium" className="text-center tracking-wide font-extrabold text-slate-800">Cómo funciona el programa</Heading>
                <Text className="w-screen max-w-lg text-wrap text-center font-normal text-gray-900 leading-5 text-md">Éste programa permite conectarte con mentores, participar en eventos de aprendizaje y desarrollar nuevas habilidades en tu campo de interés. Sigue estos simples pasos para comenzar tu experiencia.</Text>
            </Flex>
            <Flex direction="row" align="center" justify="center" wrap="wrap" gapX="2">
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className=" p-2 w-fit h-fit text-center" >
                        <img src={Paso1} alt="" />
                    </div>
                    <Heading className="px-4 text-gray-800" >Paso 1:</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Iniciar sesión en la plataforma.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className=" p-2 w-fit h-fit text-center" >
                    <img src={Paso2} alt="" />
                    </div>
                    <Heading className="px-4 text-gray-800" >Paso 2:</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Inscribirse en un evento.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className=" p-2 w-fit h-fit text-center" >
                    <img src={Paso3} alt="" />
                    </div>
                    <Heading className="px-4 text-gray-800" >Paso 3:</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Conectar con tu mentor asignado.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className=" p-2 w-fit h-fit text-center" >
                    <img src={Paso4} alt="" />
                    </div>
                    <Heading className="px-4 text-gray-800">Paso 4:</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Participar del evento.</Text>
                </div>
            </Flex>
        </div>
    )
}
export default Features