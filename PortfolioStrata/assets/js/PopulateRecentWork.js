
const DivShowWork = document.getElementById("ShowWork");
const WorkTemplate = document.getElementById("RecentWorkTemplate");

function createCard(data) {
  const clone = WorkTemplate.content.cloneNode(true);

  clone.querySelector("img").src = data.img;

  if(clone.querySelector(".CardPopupBtn"))
    clone.querySelector(".CardPopupBtn").href = data.fullImg;

  clone.querySelector(".CardIconGithub").href = data.github;
  clone.querySelector("h3").textContent = data.title;
  clone.querySelector("p").textContent = data.desc;

  return clone;
}

fetch("assets/json/projects.json").then(response => response.json()).then(jsonData => {
    jsonData.forEach(data => {
        DivShowWork.appendChild(createCard(data));
    });

    // Fire event when cards are ready
    window.dispatchEvent(new Event("projectsLoaded"));
});
