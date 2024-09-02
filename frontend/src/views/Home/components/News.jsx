import { Flex, Heading, Text, Button, Link } from "@radix-ui/themes";
const News = () => {
    return (
        <div id="novedades">
            <Flex direction="column" justify="center" px="5">
                <Heading size="8" className="py-10 text-sky-800 mx-auto w-full sm:text-center lg:mx-0 lg:text-left">
                    Proximos Programas
                </Heading>
                <figure className="md:flex border-2 border-solid border-slate-200 rounded-xl p-8 md:p-0 items-center shadow-md shadow-slate-400">
                    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                        <blockquote>
                            <p className="text-3xl text-slate-600 font-medium text-center">
                                10 agosto 2024
                            </p>
                        </blockquote>
                    </div>
                    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                        <Heading as="h1" size="6" className="text-sky-800">Acelerador</Heading>
                        <Text as="div">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam laboriosam voluptatem dicta cumque at nostrum, dolorem minima voluptates praesentium inventore porro reprehenderit est magni ex, velit quibusdam, nemo eius quod?</Text>
                    </div>
                </figure>
                <Flex className="gap-4 py-8 justify-around">
                    <Link href='#'>
                        <Button className="p-5 bg-sky-800 raduis=lg font-medium text-nowrap shadow-black shadow-md cursor-pointer text-lg">Mas Programas</Button>
                    </Link>
                </Flex>
            </Flex>
        </div >
    )
}

export default News