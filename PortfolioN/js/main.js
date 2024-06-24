// Disable preloader after page is loaded
preLoader = document.getElementById("preloader");

window.addEventListener("load", (e) => {
    //preLoader.hidden = true;
});

// TagCloud
const Texts = [
    "CPP",
    "C",
    "Java",
    "JavaFx",
    "Python",
    "C#",
    "Unreal",
    "Godot",
    "QT",
    "MySQL",
    "OpenGL",
    "Blender",
    "Photoshop",
    "Premiere Pro",
    "HTML",
    "CSS",
    "JS",
];

var tagCloud = TagCloud(".Sphere", Texts, {
    radius: 200,
    maxSpeed: "normal",
    initSpeed: "fast",
    direction: 135,
    keep: true,
});

tagCloud.$el.style.width = "-webkit-fill-available";

// Add projects to webpage when page is ready
$(document).ready(() => {
    populateProjects();
});

function populateProjects() {
    const gridDiv = $("#grid");

    $.getJSON("json/projects.json", function (jsonData) {
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
                                              <img src="${jsonData[i].feature_image}" alt="${jsonData[i].feature_image_alt} loading="lazy">
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
        preLoader.hidden = true;
    });
}

// Website Navigation
const mainTitle = document.getElementById("main-title");
const titleTag = document.getElementById("main-title-tag");
const resumeBtn = document.getElementById("resume-btn");

const aboutSec = document.getElementById("about-section");
const skillsSec = document.getElementById("skills-section");
const acadSec = document.getElementById("education-section");
const cntSec = document.getElementById("ContactForm");

const aboutBtn = document.getElementById("about-btn");
const skillsBtn = document.getElementById("skills-btn");
const acadBtn = document.getElementById("acad-btn");
const cntbtn = document.getElementById("cnt-btn")

// Prevent Right Click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mainTitle.hidden = false;
    titleTag.hidden = false;
    aboutSec.hidden = false;
    skillsSec.hidden = false;
    acadSec.hidden = true;
    resumeBtn.hidden = false;
    cntSec.hidden = true;

    mainTitle.innerText = "Hi, I am Abhinav Ojha.";
    titleTag.innerText = "An Aspiring Game Developer.";
});

acadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mainTitle.hidden = false;
    titleTag.hidden = false;
    aboutSec.hidden = true;
    skillsSec.hidden = true;
    acadSec.hidden = false;
    resumeBtn.hidden = true;
    cntSec.hidden = true;

    mainTitle.innerText = "Academics.";
    titleTag.innerText = "A Gift that none can take away.";
});

cntbtn.addEventListener("click",(e)=>{    
    e.preventDefault();
    mainTitle.hidden = true;
    titleTag.hidden = true;
    aboutSec.hidden = true;
    skillsSec.hidden = true;
    acadSec.hidden = true;
    resumeBtn.hidden = true;
    cntSec.hidden = false;

});

const form = document.getElementById("contact-form");
const progressBar = document.getElementById("progress-bar");
const responeText = document.getElementById("response-text");
const responeTextHolder = document.getElementById("response-text-holder");

form.addEventListener("submit", function(e){
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });

    var json = JSON.stringify(object);
    progressBar.hidden = false;

    form.reset();

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json
    }).then(async (response) => {
        let json = await response.json();
        progressBar.hidden = true;
        responeTextHolder.hidden = false;
        if (response.status == 200) {
            responeText.innerHTML = json.message;
        } else {
            console.log(response);
            responeText.innerHTML = json.message;
        }
    }).catch((error) => {
        console.log(error);
        responeText.innerHTML = "Something went wrong!";
    }).then(function () {
        form.reset();
        setTimeout(() => {
            responeTextHolder.hidden = true;
        }, 5000);
    });
});
