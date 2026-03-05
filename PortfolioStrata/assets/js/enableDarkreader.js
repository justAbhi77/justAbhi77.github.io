
DarkReader.setFetchMethod(window.fetch)

const themeToggleInput = document.getElementById("ThemeToggleInput");

function toggleTheme() {
	if (themeToggleInput.checked)
		DarkReader.enable({
			brightness: 100,
			contrast: 100,
			sepia: 10
		});
	else
		DarkReader.disable();
}

themeToggleInput.addEventListener("change", function () {
	toggleTheme();
});

themeToggleInput.checked = true;
toggleTheme();
