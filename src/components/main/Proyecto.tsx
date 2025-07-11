type DataProps = {
    id: string;
    role: string;
    time: string;
    location: string;
    at: {
        company: string;
        isLink: boolean;
        link: string;
    };
    description: string;
    skills: {
        name: string;
        icon: string;
        color: string;
    }[];
}

export default function Proyecto({ data }: { data: DataProps }) {
    return (
        <div key={data.id} className="md:flex gap-x-8 pb-8">
            <div className="min-w-[120px]">
                <span className="text-zinc-700 dark:text-zinc-400">{data.time}</span>
            </div>
            <div>
                <div>
                    <h1>{data.role}</h1>
                    <h2 className="text-zinc-700 dark:text-zinc-400">
                        {
                            data.at.isLink ? (
                                <a href={data.at.link} target="_blank" rel="noreferrer">{data.at.company}</a>
                            ) : (
                                data.at.company
                            )   
                        }
                    </h2>
                    <p className="text-zinc-600 text-sm">{data.location}</p>
                </div>
                <div>
                    <span className="text-sm text-zinc-700 dark:text-zinc-400">{data.description}</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 pt-2">
                        {
                            data.skills.map((skill, index) => (
                                <span 
                                    key={skill.name}
                                    className={`text-sm text-zinc-700 dark:text-zinc-400 inline-block hover:text-current-skill-color transition-all ease-in duration-200`}
                                    style={{
                                        '--skill-color': skill.color
                                    } as React.CSSProperties }
                                >
                                    <i className={"nf " + skill.icon + " pr-2"}></i>
                                    <span className="text-xs">{skill.name}</span>
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}