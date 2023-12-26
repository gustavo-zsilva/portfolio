const linksUl = document.querySelector('.links')

document.addEventListener('DOMContentLoaded', () => {
    getUserInfo()
    getRecentRepos()
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

async function getRecentRepos() {
    try {
        const response = await axios.get('https://api.github.com/users/gustavo-zsilva/repos?per_page=100')
        const repos = response.data

        const stargazersArr = repos.map(({ stargazers_count }, index) => stargazers_count)

        let largestNumber = { stargazers_count: 0, index: 0 }

        stargazersArr.forEach((stargazers_count, index) => {
            if (stargazers_count > largestNumber.stargazers_count) {
                largestNumber.stargazers_count = stargazers_count

                stargazersArr.splice(index, 1)
                return
            }

        })

        console.log(largestNumber);

        // const filteredRepos = repos.filter((repo) => )
        // console.log(filteredRepos);
    } catch (err) {
        console.error(err)
    }
}