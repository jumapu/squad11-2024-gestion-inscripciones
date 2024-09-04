import { Heading } from "@radix-ui/themes";

// Hardcodeado por ahora
const posts = [
    {
        id: 1,
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Aug 10, 2023',
        datetime: '2023-10-08',
        category: { title: 'Cursos' },
        author: {
            name: 'Harry Potter',
            role: 'Egresado',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 2,
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Feb 03, 2024',
        datetime: '2024-02-03',
        category: { title: 'Simulacion' },
        author: {
            name: 'Hermione Granger',
            role: 'Egresada',
            imageUrl:
                'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    },
    {
        id: 3,
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'July 15, 2024',
        datetime: '2024-07-15',
        category: { title: 'Taller' },
        author: {
            name: 'Severus Snape',
            role: 'Mentor',
            imageUrl:
                'https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg?w=826&t=st=1725234768~exp=1725235368~hmac=11b00c03ea38d0c3180b0b3eab90c64353768ba08f425ce67e022084de313029',
        },
    },
    // More posts...
]

const Reviews = () => {
    return (
        <div id="resegnas">
            <div className="py-24 sm:py-32 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto w-full sm:text-center lg:mx-0 text-center">
                        <Heading className="text-3xl font-bold tracking-tight text-sky-800 sm:text-4xl">Opiniones de Nuestros Participantes</Heading>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between bg-slate-50 p-5 border-slate-300 border-solid border-2 rounded-lg shadow-slate-200 shadow-inner">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.datetime} className="text-gray-500">
                                        {post.date}
                                    </time>
                                    <button
                                        className="relative z-10 rounded-lg bg-gray-100 px-3 py-0.5 font-medium text-gray-600"
                                    >
                                        {post.category.title}
                                    </button>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                <div className="text-sm leading-6">
                                    <img alt="" src={post.author.imageUrl} className="h-10 w-10 object-cover rounded-full bg-gray-50" />

                                        <p className="font-semibold text-gray-900">
                                                <span className="absolute inset-0" />
                                                {post.author.name}
                                        </p>
                                        <p className="text-gray-600">{post.author.role}</p>
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews