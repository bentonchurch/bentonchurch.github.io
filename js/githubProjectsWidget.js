import { getGithubProjects } from "./getGithubProjects.js";
import linkifyHtml from 'https://cdn.jsdelivr.net/npm/linkify-html@4.1.3/+esm'
import { shuffle } from "./shuffleArray.js";

export function githubProjectsWidget(limit) {
    let widgetElement = document.createElement('div');

    widgetElement.classList.add("github-projects-widget");

    getGithubProjects().then(projectsList => shuffle(projectsList).slice(0, limit).map(project => {
        let projectElement = document.createElement('div');
        projectElement.classList.add("github-project-row");

        let topRow = document.createElement('div');
        topRow.classList.add("top");

        let bottomRow = document.createElement('div');
        bottomRow.classList.add("bottom");

        // Profile image
        topRow.innerHTML += `<a target="blank" href="${project.owner.html_url}" class="preview-image"><img src="${project.owner.avatar_url}" draggable="false"></a>`;

        // Project name
        topRow.innerHTML += `<a target="blank" href="${project.html_url}" class="project-name">${project.name}</a>`;

        // Project page
        if (project.homepage) {
            topRow.innerHTML += `<a target="blank" href="${project.homepage}" class="project-page">(view application)</a>`;
        }

        // Project description
        bottomRow.innerHTML += `<p class="description">${project.description && linkifyHtml(project.description)}</p>`;

        // Add the rows to the project element
        projectElement.appendChild(topRow);
        if (project.description) {
            projectElement.appendChild(bottomRow);
        }

        return projectElement
    }).forEach(project => {
        widgetElement.appendChild(project);
    }));

    return widgetElement;
}