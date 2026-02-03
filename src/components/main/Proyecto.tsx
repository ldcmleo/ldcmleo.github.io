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
    <div
      key={data.id}
      className="md:flex border-b border-[#a9b4c6] border-dashed"
    >
      <div className="min-w-[160px] border-b md:border-b-0 md:border-r border-[#a9b4c6] border-dashed p-4">
        <span className="">{data.time}</span>
      </div>
      <div>
        <div>
          <h1 className="px-4 pt-4">{data.role}</h1>
          <h2 className="px-4">
            {data.at.isLink ? (
              <a href={data.at.link} target="_blank" rel="noreferrer">
                {data.at.company}
              </a>
            ) : (
              data.at.company
            )}
          </h2>
          <p className="text-sm px-4">{data.location}</p>
        </div>
        <div>
          <span className="block text-sm px-4 pb-4">{data.description}</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 pt-2">
            {data.skills.map((skill, index) => (
              <span
                key={skill.name}
                className={`
                  text-sm block px-4 py-2
                  hover:bg-current-skill-color
                  transition-all ease-in duration-200
                  border-t border-[#a9b4c6] border-dashed

                  ${(index + 1) % 2 === 0 ? "border-r-0" : "border-r"}
                  ${(index + 1) % 3 === 0 ? "sm:border-r-0" : "sm:border-r"}
                  ${(index + 1) % 4 === 0 ? "md:border-r-0" : "md:border-r"}

                  ${hasBorder(index, 2) ? "border-b" : "border-b-0"}
                  ${hasBorder(index, 3) ? "sm:border-b" : "sm:border-b-0"}
                  ${hasBorder(index, 4) ? "md:border-b" : "md:border-b-0"}
                `}
                style={
                  {
                    "--skill-color": skill.color,
                  } as React.CSSProperties
                }
              >
                <i className={"nf " + skill.icon + " pr-2"}></i>
                <span className="text-xs">{skill.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
