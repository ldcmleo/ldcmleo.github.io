import React, { useEffect, useState } from "react";

interface License {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

interface Repo {
    name: string
    html_url: string
    description: string
    tags_url: string
    fork: boolean
    forks: number
    stargazers_count: number
    topics?: string[]
    license?: License
}

const ExcludedRepositories: string[] = [
    "ldcmleo",
    "ldcmleo.github.io"
];

const topicClasses: { [key: string]: string} = {
    go: "nf-md-language_go text-blue-500",
    html: "nf-fa-html5 text-orange-500",
    css: "nf-dev-css3 text-sky-500",
    javascript: "nf-dev-javascript_badge text-yellow-500",
    docker: "nf-fa-docker text-blue-500",
    php: "nf-dev-php text-blue-500",
    astro: "nf-custom-astro text-purple-700",
    angular: "nf-fa-angular text-red-500",
    react: "nf-dev-react text-blue-500",
    typescript: "nf-md-language_typescript text-blue-500",
    postgres: "nf-dev-postgresql text-blue-500",
    mysql: "nf-fae-mysql text-teal-500",
    nodejs: "nf-fa-node text-green-500",
    laravel: "nf-dev-laravel text-red-500",
    ruby: "nf-dev-ruby text-red-500",
    rails: "nf-seti-rails text-red-500",
    rust: "nf-dev-rust text-red-700",
    python: "nf-dev-python text-yellow-500",
    makefile: "nf-dev-terminal text-green-500",
    bash: "nf-dev-terminal text-green-500",
    android: "nf-dev-android text-green-500",
    shell: "nf-dev-terminal text-green-500",
    mongodb: "nf-dev-mongodb text-green-500"
};

function Repository(props: { data: Repo }) {
    const [topics, setTopics] = useState<string[]>([]);
    const [license, setLicense] = useState<License | undefined>(undefined);

    useEffect(() => {
        if (props.data.topics !== undefined) {
            const topicos = props.data.topics?.filter((topic: string) => topicClasses[topic]).map((topic: string) => topicClasses[topic]);

            setTopics(topicos);
        }

        if (props.data.license !== null) {
            setLicense(props.data.license);
        }
    }, []);

    return (
        <div className="md:flex md:space-x-4">
            <div className="min-w-[120px] space-y-2 flex justify-between w-full md:max-w-[120px] md:block">
                <div className="space-x-2">
                    {props.data.fork ? 
                        <p className="text-zinc-700 dark:text-zinc-400"><i className="nf nf-cod-repo_forked"></i> <span className="share">fork</span></p>
                    :
                        topics.map((topic: string) => (
                            <i key={topic} className={"nf " + topic}></i>
                        ))
                    }
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <i className="nf nf-cod-repo_forked text-zinc-700 dark:text-zinc-400"> {props.data.forks}</i>
                    <i className="nf nf-md-star text-zinc-700 dark:text-zinc-400"> {props.data.stargazers_count}</i>
                </div>
            </div>
            <div>
                <h1 className="capitalize text-lg"><a href={props.data.html_url} className="hover:text-teal-700 transition-all ease-linear duration-200" target="_blank">{props.data.name} <span className="nf nf-oct-arrow_up_right"></span></a></h1>
                {license && <div className="text-zinc-600">{license?.spdx_id}</div>}
                <div className="text-zinc-700 dark:text-zinc-400 min-h-[100px] text-sm pb-8 flex-grow">{props.data.description}</div>
            </div>
        </div>
    );
}

function Repositories() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const getRepos = async() => {
            try {
                const response = await fetch('https://api.github.com/users/ldcmleo/repos', {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                })
    
                const data = await response.json();
                const final_data = data.filter((repo: Repo) => !ExcludedRepositories.includes(repo.name));
                console.log(final_data);
                setRepos(final_data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    console.log("unexpected error trying to get repositories data");
                }
            } finally {
                setLoading(false);
            }
        }
        
        getRepos();
    }, []);

    return (
        <div className="space-y-4">
            { loading ? (
                <div className="relative col-span-12 pt-32 pb-16 overflow-hidden rounded-md shadow-md">
                    <div className="granulado"></div>
                    <p className="text-center share">...</p>
                </div>
            ) : (
                error ? (
                    <div className="relative col-span-12 pt-32 pb-16 overflow-hidden rounded-md shadow-md">
                        <div className="granulado"></div>
                        <p className="text-center share">...</p>
                    </div>
                ) : (
                    repos.map((repo: Repo) => (
                        <Repository key={repo.name} data={repo} />
                    ))
                )
            ) }
        </div>
    );
}

export default Repositories;