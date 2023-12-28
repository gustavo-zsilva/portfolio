const postsDiv = document.querySelector('.posts')

const posts = []

export function getPosts() {
    if (!posts.length) {
        postsDiv.querySelector('.not-found').classList.remove('hidden')
        return
    }

    // Fetch posts
}