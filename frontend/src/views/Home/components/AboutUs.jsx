import { Flex, Heading, Text, Inset } from "@radix-ui/themes";

const AboutUs = () => {
    return (
        <div className="flex flex-row gap-x-4">
            <Flex direction="column" width="50%">
                <div className="py-10">
                    <Heading size="8" className="py-4 text-left">
                        Mentores
                    </Heading>
                    <Text size="3" className="text-left">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur ex obcaecati fugiat perspiciatis ea repellat maiores facilis amet commodi ab, dolorum deserunt eveniet, molestiae quas illum facere officia magnam nihil
                    </Text>
                </div>
                <Inset clip="padding-box" side="bottom" pt="current">
                    <img
                        src=""
                        alt="Imagen de Estudiantes"
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 400,
                            backgroundColor: 'var(--gray-5)',
                        }}
                    />
                </Inset>
            </Flex>
            <Flex direction="column" width="50%">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src=""
                        alt="Imagen de Mentores"
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 400,
                            backgroundColor: 'var(--gray-5)',
                            paddingLeft: "",
                        }}
                    />
                </Inset>
                <div className="py-10">
                    <Heading size="8" className="py-4 text-right">
                        Egresados
                    </Heading>
                    <Text size="3" className="flex text-right">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur ex obcaecati fugiat perspiciatis ea repellat maiores facilis amet commodi ab, dolorum deserunt eveniet, molestiae quas illum facere officia magnam nihil
                    </Text>
                </div>
            </Flex>
        </div>
    )
}
export default AboutUs