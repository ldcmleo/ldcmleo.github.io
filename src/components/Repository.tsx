import React, { useEffect, useState } from "react";
import Title from "./Title.astro";

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
        <a href={props.data.html_url} className="relative overflow-hidden flex flex-col col-span-12 md:col-span-6 lg:col-span-4 p-8 rounded-md shadow-md hover:bg-teal-600 hover:bg-opacity-15 dark:hover:bg-teal-900 dark:hover:bg-opacity-15 transition-colors duration-200 ease-in" target="_blank">
            <div className="granulado"></div>
            {license && <div className="license text-gray-500 dark:text-gray-600">{license?.spdx_id}</div>}
            <span className="absolute top-2 right-2 nf nf-oct-arrow_up_right transition-all ease-linear duration-200"></span>
            <h1 className="share capitalize text-xl text-teal-700">{props.data.name}</h1>
            <h2 className="sharetech text-sm pb-8 flex-grow">{props.data.description}</h2>
            <div className="flex justify-between">
                <div className="space-x-2 text-[28px]">
                    {topics.map((topic: string) => (
                        <i key={topic} className={"nf " + topic}></i>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <i className="nf nf-cod-repo_forked"> {props.data.forks}</i>
                    <i className="nf nf-md-star text-yellow-500"> {props.data.stargazers_count}</i>
                </div>
            </div>
        </a>
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
        <section className="grid grid-cols-12 gap-4 mx-2 pb-4 lg:mx-0">
            <div className="relative col-span-12 pt-32 pb-16 overflow-hidden rounded-md shadow-md">
                <div className="granulado"></div>
                <div className="px-4 flex items-center justify-center space-x-3 text-teal-700">
                    <b className={"nf nf-fa-github_square text-3xl"}></b>
                    <h1 className="font-bold text-4xl share">Github Repositories</h1>
                </div>
            </div>
            { loading ? (
                <div className="relative col-span-12 pt-32 pb-16 overflow-hidden rounded-md shadow-md">
                    <div className="granulado"></div>
                    <p className="text-center share">Cargando Repositorios...</p>
                </div>
            ) : (
                error ? (
                    <div className="relative col-span-12 pt-32 pb-16 overflow-hidden rounded-md shadow-md">
                        <div className="granulado"></div>
                        <p className="text-center share">Cargando Repositorios...</p>
                    </div>
                ) : (
                    repos.map((repo: Repo) => (
                        <Repository key={repo.name} data={repo} />
                    ))
                )
            ) }
        </section>
    );
}

export default Repositories;