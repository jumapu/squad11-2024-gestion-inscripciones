import { Flex, Heading, Text } from "@radix-ui/themes";
import { FaWpforms } from "react-icons/fa";
const Caracteristicas = () => {
    return (
        <div>
            <Flex align="center" justify="start" direction="column" gap="2" p="4">
                <Heading size="7" weight="medium" className="text-center">Como funciona el programa</Heading>
                <Text className="w-screen max-w-lg text-wrap text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptatum alias nemo similique, qui autem quod, error atque odit iure sint tempora nisi! Eum nihil modi, incidunt nisi quisquam ea!</Text>
            </Flex>
            <Flex direction="row" align="center" justify="center" gap="2" wrap="wrap">
                <div className=" flex flex-col flex-wrap items-center text-center p-12" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="p-4" >Paso 1</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="p-4" >Paso 2</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="p-4" >Paso 3</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="p-4" >Paso 4</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </div>
            </Flex>
        </div>
    )
}
export default Caracteristicas