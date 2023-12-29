const linksUl = document.querySelector('.links')
const navLinks = linksUl.querySelectorAll('a')

import api from '../axios.js'

export async function getUserInfo() {
    try {
        const response = await api.get('')
        const { login, company, html_url, twitter_username, location } = response.data

        showUserInfo({ login, company, html_url, twitter_username, location })
    } catch (err) {
        console.error(err)
    }
}

function showUserInfo({ login, company, html_url, twitter_username, location }) {
    const locationTag = linksUl.querySelector('.location a')
    const companyTag = linksUl.querySelector('.company a')
    const githubTag = linksUl.querySelector('.github a')
    const twitterTag = linksUl.querySelector('.twitter a')

    locationTag.textContent = location || 'No location specified'
    companyTag.textContent = company || 'Not working at a company'
    githubTag.textContent = login || 'Couldn\'t retrieve Github URL'
    twitterTag.textContent = twitter_username || 'No Twitter account specified'

    githubTag.setAttribute('href', html_url)
    twitterTag.setAttribute('href', `https://twitter.com/${twitter_username}`)

    navLinks.forEach(link => {
        link.classList.remove('skeleton-text')
    })
}

