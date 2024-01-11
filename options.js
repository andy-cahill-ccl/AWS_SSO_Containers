let examples = {
  'name': 'Prod',
  'number': '123456',
  'role': 'InfraEng',
  'subdomain': 'MegaCorp'
};

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    template: document.querySelector("#template").value,
    truncate: document.querySelector("#truncate").checked
  });
}

function populatePreview(text, truncate) {
  for (const [key, value] of Object.entries(examples)) {
    text = text.replace(key, value);
  }
  if (text.length > 32 && truncate) {
    text = text.substring(0, 32) + "&hellip;";
  }
  document.querySelector("#preview").value = text;
}

function restoreOptions() {
  function setCurrentChoice(result) {
    let text = result.template || "name role";
    let truncate = result.truncate;
    document.querySelector("#template").value = text;
    document.querySelector("#truncate").checked = truncate;
    populatePreview(text, truncate);
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("template", "truncate");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#template").addEventListener("input", function(evt) {
  populatePreview(this.value, document.querySelector("#truncate").checked);
});
document.querySelector("#truncate").addEventListener("input", function(evt) {
  populatePreview(document.querySelector("#template").value, this.checked);
});
