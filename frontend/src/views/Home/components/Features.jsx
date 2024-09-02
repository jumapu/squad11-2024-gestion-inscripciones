import { Flex, Heading, Text } from "@radix-ui/themes";
import { FaWpforms } from "react-icons/fa";
const Features = () => {
    return (
        <div id="caracteristicas">
            <Flex align="center" justify="center" direction="column" p="8" maxHeight="100vh">
                <Heading size="7" weight="medium" className="text-center text-sky-800">Como funciona el programa</Heading>
                <Text className="w-screen max-w-lg text-wrap text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptatum alias nemo similique, qui autem quod, error atque odit iure sint tempora nisi! Eum nihil modi, incidunt nisi quisquam ea!</Text>
            </Flex>
            <Flex direction="row" align="center" justify="center" wrap="wrap" gapX="2">
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="p-4 text-sky-800" >Paso 1</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="p-4 text-sky-800" >Paso 2</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="p-4 text-sky-800" >Paso 3</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </div>
                <div className=" flex flex-col flex-wrap items-center text-center" >
                    <div className="bg-slate-300 rounded-full p-2 w-fit h-fit text-center" >
                        <FaWpforms />
                    </div>
                    <Heading className="p-4 text-sky-800">Paso 4</Heading>
                    <Text as="p" size="2" className="w-56 h-14">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                </div>
            </Flex>
        </div>
    )
}
export default Features