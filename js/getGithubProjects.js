export async function getGithubProjects() {
    return (await fetch("https://api.github.com/users/bentonchurch/repos")).json()
}