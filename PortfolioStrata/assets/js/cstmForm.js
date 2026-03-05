const url = "https://api.web3forms.com/submit";
const form = document.getElementById("contact-form");
const successBtnElement = document.querySelector('.js_success-animation-trigger');

const pendingClassName = 'loading-btn--pending';
const successClassName = 'loading-btn--success';
const failClassName = 'loading-btn--fail';

const stateDuration = 1250;

// Helper function to validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Form validation function
function validateForm(formData) {
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();

  if (!name) {
    return false;
  }

  if (!email || !isValidEmail(email)) {
    return false;
  }

  if (!message) {
    return false;
  }

  return true;
}

successBtnElement.addEventListener('click', async (ev) => {
  ev.preventDefault(); // prevent default form submission
  const elem = ev.target;
  elem.classList.add(pendingClassName);

  const formData = new FormData(form);

  // Validate the form before sending
  if (!validateForm(formData)) {
    elem.classList.remove(pendingClassName);
    elem.classList.add(failClassName);
    window.setTimeout(() => {
      elem.classList.remove(failClassName);
    }, stateDuration);
    return; // stop submission if invalid
  }

  var FormDict = {};
  formData.forEach((value, key) => {
    FormDict[key] = value;
  });
  var json = JSON.stringify(FormDict);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: json
    });

    const result = await response.json();

    if (response.status === 200) {
      elem.classList.remove(pendingClassName);
      elem.classList.add(successClassName);
      window.setTimeout(() => {
        elem.classList.remove(successClassName);
        form.reset();
      }, stateDuration);
    } else {
      elem.classList.remove(pendingClassName);
      elem.classList.add(failClassName);
      window.setTimeout(() => {
        elem.classList.remove(failClassName);
        form.reset();
      }, stateDuration);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    elem.classList.remove(pendingClassName);
    elem.classList.add(failClassName);
    window.setTimeout(() => {
      elem.classList.remove(failClassName);
    }, stateDuration);
  }
});