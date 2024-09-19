import { Flex, Heading, Text } from "@radix-ui/themes";
import { FaWpforms } from "react-icons/fa";
const Features = () => {
    return (
        <div id="caracteristicas">
            <Flex align="center" justify="center" direction="column" p="8" maxHeight="50vh">
                <Heading size="8" weight="medium" className="text-center tracking-wide font-extrabold text-slate-800">Como funciona el programa</Heading>
                <Text className="w-screen max-w-lg text-wrap text-center font-normal text-gray-900 leading-5 text-md">Este programa permite conectarte con mentores, participar en eventos de aprendizaje y desarrollar nuevas habilidades en tu campo de interes. Sigue estos simples pasos para comenzar tu experiencia.</Text>
            </Flex>
            <Flex direction="row" align="center" justify="center" wrap="wrap" gapX="2">
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="px-4 text-gray-800" >Paso 1:</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Iniciar sesion en la plataforma.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="px-4 text-gray-800" >Paso 2:</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Inscribirse en un evento.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="px-4 text-gray-800" >Paso 3:</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Conectar con tu mentor asignado.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="px-4 text-gray-800">Paso 4:</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Participar del evento.</Text>
                </div>
            </Flex>
        </div>
    )
}
export default Features