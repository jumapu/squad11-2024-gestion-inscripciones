import { Flex, Heading, Box, Card, Text, Button, Link } from "@radix-ui/themes";
const News = () => {
    return (
        <div>
            <Flex direction="column" justify="center">
                <Heading size="8" className="py-10">
                    Proximos Programas
                </Heading>
                <Flex align="center" justify="center">
                    <Flex align="center" width="80vw">
                        <Card size="5">
                            <Flex gap="4" align="center">
                                <Box width="45%"
                                    height="100%" className="px-4">                                <Text as="div" weight="bold" className="text-center" size="8">10</Text>
                                    <Text as="div" weight="medium" className="py-4 text-center" size="4">agosto</Text>
                                    <Text as="div" className="text-center" weight="bold" size="6">2024</Text>
                                </Box>
                                <Box>
                                    <Text as="div" size="6" weight="bold">
                                        Acelerador
                                    </Text>
                                    <Text as="div" size="2" className="py-4" color="gray">
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio perferendis quis iste vitae nulla facilis.
                                    </Text>
                                    <Text as="div" size="2" color="gray">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, dolorem amet laborum corporis dolore voluptatum rerum incidunt dolor fugiat earum. Repudiandae aspernatur ullam laudantium aperiam eos culpa similique omnis nisi.
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
                    </Flex>
                </Flex>
                <Flex className="gap-4 py-8 justify-around">
                    <Link href='#'>
                        <Button className="p-5 bg-sky-800 raduis=lg font-medium text-nowrap shadow-black shadow-md cursor-pointer text-lg">Mas Programas</Button>
                    </Link>
                </Flex>
            </Flex>
        </div>
    )
}

export default News