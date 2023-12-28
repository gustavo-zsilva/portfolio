// Get 2 most recent repos

import api from '../axios.js'

const latestProjectsDiv = document.querySelector('.latest-projects')

export async function getPopularRepos() {
    try {
        const response = await api.get('/repos?per_page=100')
        const repos = response.data

        const filteredRepos = [{ stars: 0 }, { stars: 0 }]

        // Get 2 repos with most stars
        repos.forEach(repo => {
            for (let i = 0; i < 2; i++) {
                if (repo.stargazers_count > filteredRepos[i].stars) {
                    filteredRepos[i] = {
                        name: repo.name,
                        description: repo.description,
                        language: repo.language,
                        stars: repo.stargazers_count,
                        url: repo.html_url,
                        getBranches: async () => {
                            try {
                                const response = await axios.get(`https://api.github.com/repos/gustavo-zsilva/${repo.name}/branches`)
                                const numberOfBranches = response.data.length
                                return numberOfBranches
                            } catch (err) {
                                console.error(err)
                                return 0
                            }
                        }
                    }
                    return
                }
            }
        })

        showPopularRepos(filteredRepos)
    } catch (err) {
        console.error(err)
    }
}

function showPopularRepos(repos) {
    repos.forEach(async (repo) => {

        const branches = await repo.getBranches()

        const newRepo = document.createRange().createContextualFragment(`
            <div class="card project-overview">
                <header>
                    <img src="./assets/folder.svg" alt="Folder Icon">
                    <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                        <h3>${repo.name}</h3>
                    </a>
                </header>
                <p>${repo.description}</p>
                <footer>
                    <p class="stats">
                        <span>
                            <img src="./assets/star.svg" alt="Star Icon">
                            <span>${repo.stars}</span>
                        </span>
                        <span>
                            <img src="./assets/git-branch.svg" alt="Git Branch Icon">
                            <span>${branches}</span>
                        </span>
                    </p>
                    <p class="tech">
                        <span class="circle ${repo.language.toLowerCase()}"></span>
                        <span>${repo.language}</span>
                    </p>
                </footer>
            </div>
        `)

        latestProjectsDiv.appendChild(newRepo)
    })
}