import { getUserInfo } from './modules/userInfo.js'
import { getPopularRepos } from './modules/popularRepos.js'
import { getPosts } from './modules/posts.js'

document.addEventListener('DOMContentLoaded', () => {
    getUserInfo()
    getPopularRepos()
    getPosts()
})
