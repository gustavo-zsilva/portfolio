

const linksUl = document.querySelector('.links')

document.addEventListener('DOMContentLoaded', () => {
    getUserInfo()
    getPopularRepos()
})

async function getUserInfo() {
    try {
        const response = await axios.get('https://api.github.com/users/gustavo-zsilva')
        const { company, html_url, twitter_username, location } = response.data

        showUserInfo({ company, html_url, twitter_username, location })
    } catch (err) {
        console.error(err)
    }
}

function showUserInfo({ company, html_url, twitter_username, location }) {
    const locationTag = linksUl.querySelector('.location a')
    const companyTag = linksUl.querySelector('.company a')
    const githubTag = linksUl.querySelector('.github a')
    const twitterTag = linksUl.querySelector('.twitter a')

    locationTag.textContent = location || 'No location specified'
    companyTag.textContent = company || 'Not working at a company'
    githubTag.textContent = html_url || 'Couldn\'t retrieve Github URL'
    twitterTag.textContent = twitter_username || 'No Twitter account specified'

    githubTag.setAttribute('href', html_url)
    twitterTag.setAttribute('href', `https://twitter.com/${twitter_username}`)
}

// Get 2 most recent repos

async function getPopularRepos() {
    try {
        const response = await axios.get('https://api.github.com/users/gustavo-zsilva/repos?per_page=100')
        const repos = response.data

        const filteredRepos = [{ stars: 0 }, { stars: 0 }]

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
    const latestProjectsDiv = document.querySelector('.latest-projects')

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