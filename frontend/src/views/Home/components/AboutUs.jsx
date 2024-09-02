import { Heading } from "@radix-ui/themes";
const AboutUs = () => {
    return (
        <div id="nosotros">
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 px-8">
                <article className="flex max-w-xl flex-col md:items-start justify-between">
                    <div className="group relative">
                        <Heading className="mt-3 md:text-4xl font-semibold leading-6 text-sky-800">
                            Mentores
                        </Heading>
                        <p className="mt-5 line-clamp-3 text-base leading-6 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis earum aliquid voluptatum. Ipsam cum quasi cupiditate hic molestiae sit veritatis, accusamus nihil natus distinctio nam in vero harum explicabo eveniet?
                        </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img alt="mentores" className="rounded-2xl bg-gray-100 shadow-sm shadow-slate-500"
                            style={{
                                height: "400px",
                                width: "550px",
                            }} />
                    </div>
                </article>
                <article className="flex max-w-xl flex-col md:items-end justify-between">
                    
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img alt="egresados" className="rounded-2xl bg-gray-100 shadow-sm shadow-slate-500"
                            style={{
                                height: "400px",
                                width: "550px",
                            }} />
                    </div>
                    <div className="relative">
                        <Heading className="mt-3 md:text-4xl font-semibold leading-6 text-start md:text-end text-sky-800">
                            Egresados
                        </Heading>
                        <p className="mt-5 line-clamp-3 text-base md:text-end leading-6 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis earum aliquid voluptatum. Ipsam cum quasi cupiditate hic molestiae sit veritatis, accusamus nihil natus distinctio nam in vero harum explicabo eveniet?
                        </p>
                    </div>
                </article>
            </div>
        </div>
    )
}
export default AboutUs