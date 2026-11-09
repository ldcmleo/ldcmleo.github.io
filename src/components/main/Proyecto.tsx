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
};

export default function Proyecto({ data }: { data: DataProps }) {
  const totalSkills = data.skills.length;

  function hasBorder(index: number, columns: number) {
    const lastRows = totalSkills % columns;
    if (lastRows === 0) return false;

    if (index + columns >= totalSkills && index < totalSkills - lastRows)
      return true;
  }

  return (
    <article
      key={data.id}
      className="md:flex border-b border-[#a9b4c6] dark:border-zinc-800 border-dashed transition-colors duration-150"
    >
      <div className="min-w-[170px] border-b md:border-b-0 md:border-r border-[#a9b4c6] dark:border-zinc-800 border-dashed p-4 flex items-start">
        <span className="text-sm font-medium tracking-tight text-zinc-600 dark:text-zinc-400">{data.time}</span>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="p-4 space-y-1">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{data.role}</h2>
          <div className="text-sm font-semibold text-teal-700 dark:text-teal-400">
            {data.at.isLink ? (
              <a
                href={data.at.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline hover:text-teal-800 dark:hover:text-teal-300 active:scale-[0.98] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                <span>{data.at.company}</span>
                <i className="nf nf-fa-external_link text-xs"></i>
              </a>
            ) : (
              <span>{data.at.company}</span>
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{data.location}</p>
          <p className="text-sm pt-2 text-zinc-700 dark:text-zinc-300 leading-relaxed">{data.description}</p>
        </div>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {data.skills.map((skill, index) => (
              <span
                key={skill.name}
                className={`
                  text-sm flex items-center px-4 py-2.5
                  hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80
                  active:scale-[0.97]
                  transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
                  border-t border-[#a9b4c6] dark:border-zinc-800 border-dashed
                  group select-none

                  ${(index + 1) % 2 === 0 ? "border-r-0" : "border-r"}
                  ${(index + 1) % 3 === 0 ? "sm:border-r-0" : "sm:border-r"}
                  ${(index + 1) % 4 === 0 ? "md:border-r-0" : "md:border-r"}

                  ${hasBorder(index, 2) ? "border-b" : "border-b-0"}
                  ${hasBorder(index, 3) ? "sm:border-b" : "sm:border-b-0"}
                  ${hasBorder(index, 4) ? "md:border-b" : "md:border-b-0"}
                `}
              >
                <i
                  className={"nf " + skill.icon + " pr-2 text-base transition-transform duration-150 group-hover:scale-110"}
                  style={{ color: skill.color }}
                ></i>
                <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white">
                  {skill.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
