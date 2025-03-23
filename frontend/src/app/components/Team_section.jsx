const people = [
    {
        name: 'Hoang Khoi Do',
        role: 'Frontend Developer',
        imageUrl:
            'https://media.discordapp.net/attachments/1349794449663725640/1353146279873482923/PhotoID.jpeg?ex=67e0972d&is=67df45ad&hm=5ec60fac0fe96c45c4a3920f820fdda191df06dbfb57b6f1884bafb0d68643a7&=&format=webp&width=1066&height=1602'
    },
    // More people..
    {
        name: "Syn Nguyen",
        role: 'Backend Developer',
        imageUrl:
            'https://media.discordapp.net/attachments/1349794449663725640/1353146120573812837/IMG_2554.jpg?ex=67e09707&is=67df4587&hm=7efe02dccb808bc012d0b56d8562a28093357f39e4abe4c3902fdf9e5748bd56&=&format=webp&width=1202&height=1604'
    },
    {
        name: "Kien Pham",
        role: 'Backend Developer',
        imageUrl:
            'https://media.discordapp.net/attachments/1349794449663725640/1353145732340777091/IMG_3156.jpg?ex=67e096aa&is=67df452a&hm=a5ee2b5940d699e5fc262e9c36b64281d98c981f59ccdfe8d232aedd6456b9be&=&format=webp&width=1823&height=1604'
    }
]

export default function TeamSection() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                        Who are we?
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-600">
                    We are a team of Computer Science students from CSULB with a strong passion for coding, problem-solving, and innovation. Our dedication lies in developing efficient and creative solutions, continuously improving our skills, and tackling complex challenges. With a commitment to collaboration and learning, we strive to push the boundaries of technology and create meaningful impact through our work.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img alt="" src={person.imageUrl} className="size-20 rounded-full object-scale-down" />
                                <div>
                                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
