
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
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
