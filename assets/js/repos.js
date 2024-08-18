// "ldcmleo", "ldcmleo.github.io"
var exclude_repositories = ["ldcmleo", "ldcmleo.github.io"];
var icon_to_class = {
    "php": "nf nf-md-language_php text-indigo-700",
    "dockerfile": "nf nf-fa-docker text-sky-600",
    "javascript": "nf nf-dev-javascript_badge text-yellow-500",
    "go": "nf nf-md-language_go text-sky-400",
    "gdscript": "nf nf-seti-godot text-sky-400",
    "ruby": "nf nf-dev-ruby text-red-500",
    "css": "nf nf-dev-css3 text-sky-400",
    "html": "nf nf-dev-html5 text-orange-600",
    "shell": "nf nf-md-bash"
};


async function getRepositoryLanguages(username, repositoryName) {
    let result = '';
    try {
        const response = await fetch('https://api.github.com/repos/' + username + '/' + repositoryName + '/languages', {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const data = await response.json();
        
        Object.keys(data).forEach(key => {
            if (icon_to_class[key.toLowerCase()] === undefined) {
                return;    
            }
            var css_classes = icon_to_class[key.toLowerCase()];
            var content = `<i class="${css_classes}"></i>`;
            // console.log(content);
            
            result += content; // Utiliza `+=` para concatenar el contenido
        });
    } catch (error) {
        console.error(error);
    }
    
    return result;
}


async function fetchAndDisplayRepos() {
    try {
        // Fetch de los repositorios
        const response = await fetch('https://api.github.com/users/ldcmleo/repos', { 
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const data = await response.json();

        if (data["messege"] !== undefined) {
            const content = `
                <a class="col-span-9 md:col-span-3 p-8 granulado rounded-md shadow-md hover:bg-sky-200" href="https://github.com/ldcmleo" target="_blank">
                    <p>Ups! This contenct can't be displayed... See it on Github.com</p>
                </a>
            `;
            repos_container.innerHTML += content;
            return
        }

        // Iterar sobre cada repositorio
        for (const element of data) {
            if (exclude_repositories.includes(element["name"])) {
                continue;
            }
            // console.log(element);
            
            
            // Llamada a la función async getRepositoryLanguages
            const languages = await getRepositoryLanguages("ldcmleo", element["name"]);

            // Generar contenido
            const content = `
            <a class="relative col-span-9 md:col-span-3 p-8 granulado rounded-md shadow-md hover:bg-sky-200" href="${element["html_url"]}" target="_blank">
                <span class="absolute top-2 right-2 nf nf-oct-arrow_up_right"></span>
                <h1 class="sharetech capitalize text-xl text-sky-700">${element["name"]}</h1>
                <h2 class="sharetech text-sm pb-8">${element["description"]}</h2>
                <div class="flex justify-between">
                    <div class="space-x-2" style="font-size: 26px">
                        ${languages}
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="nf nf-fa-code_fork"> ${element["forks"]}</i>
                        <i class="nf nf-fa-star text-yellow-500"> ${element["stargazers_count"]}</i>
                    </div>
                </div>
            </a>
            `;
            // console.log(content);
            repos_container.innerHTML += content;
        }
    } catch (error) {
        console.error(error);
    }
}

// Llamar a la función async
fetchAndDisplayRepos();
