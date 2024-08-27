import { getServices } from "./getServices.js";

export function servicesWidget(limit) {
    let widgetElement = document.createElement('div');

    widgetElement.classList.add("services-widget");

    getServices().then(projectsList => projectsList.slice(0, limit).map(project => {
        let projectElement = document.createElement('div');
        projectElement.classList.add("service-row");

        let topRow = document.createElement('div');
        topRow.classList.add("top");

        let bottomRow = document.createElement('div');
        bottomRow.classList.add("bottom");

        // Profile image
        topRow.innerHTML += `<img src="${project.img}" draggable="false" class="app-icon">`;

        // Project name
        topRow.innerHTML += `<a target="blank" href="${project.url}" class="project-name">${project.name}</a>`;

        // Project tags
        for (let tag of project.tags) {
            topRow.innerHTML += `<span class="tag" style="--tag-color: ${tag.color}">${tag.name}</span>`;
        }

        // Project description
        bottomRow.innerHTML += `<p class="description">${project.description}</p>`;

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