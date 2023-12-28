import { getUserInfo } from './modules/userInfo.js'
import { getPopularRepos } from './modules/popularRepos.js'

document.addEventListener('DOMContentLoaded', () => {
    getUserInfo()
    getPopularRepos()
})
