// Disable preloader after page is loaded
preLoader = document.getElementById("preloader");
window.addEventListener('load', (e) => {
    preLoader.hidden = true;
});

// Add projects to webpage when page is ready
$(document).ready(function () {
    const gridDiv = $("#grid");
    $.getJSON("Json/Projects.json", function (jsonData) {

        for (let i = 0; i < jsonData.length; ++i) {

            var linksText = ``;
            if (jsonData[i].links.length > 0) {
                for (let j = 0; j < jsonData[i].links.length; ++j) {
                    linksText += `<a href="${jsonData[i].links[j].url}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-${jsonData[i].links[j].id} fa-lg"></i></a>`;
                }
            }

            var tagsText = ``;
            if (jsonData[i].tags.length > 0) {
                for (let j = 0; j < jsonData[i].tags.length; ++j) {
                    tagsText += `<span class="tag-card">${jsonData[i].tags[j]}</span>`;
                }
            }

            var descriptionText = ``;
            if (Boolean(jsonData[i].description)) {
                descriptionText = jsonData[i].description;
            }

            var projectElement = `<div class="box">
                                    <div class="box-content">
                                        <article>
                                            <div class="img-cont">
                                            <img src="${jsonData[i].feature_image}" alt="${jsonData[i].feature_image_alt}">
                                            </div>
                                            <h4>${jsonData[i].name}</h4>
                                            <p class="project-rel-links">
                                                ${linksText}
                                            </p>
                                            <p class="tags">
                                                ${tagsText}
                                            </p>
                                            <p class="description">
                                                ${descriptionText}
                                            </p>
                                        </article>
                                    </div>
                                </div>`;

            gridDiv.append(projectElement);
        }
    });
}); 

// TagCloud
const Texts = [
    'CPP', 'C', 'Java', 'JavaFx', 'Python', 'C#', 'Unreal', 'Unity', 'Godot', 'QT', 'MySQL', 'OpenGL', 'Blender', 'Photoshop', 'Premiere Pro', 'HTML', 'CSS', 'JS'
];

var tagCloud = TagCloud('.Sphere', Texts, {
    radius: 230,
    maxSpeed: 'normal',
    initSpeed: 'fast',
    direction: 135,
    keep: true
});