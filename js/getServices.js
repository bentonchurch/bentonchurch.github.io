export async function getServices() {
    return (await fetch("/services.json")).json()
}