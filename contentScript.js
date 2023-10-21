chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "toggleDarkMode") {
    enableDarkMode(message.darkModeEnabled);
  }
});

function enableDarkMode(darkModeEnabled) {
  const body = document.body;
  if (darkModeEnabled) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}
function enableDarkMode(darkModeEnabled) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = chrome.runtime.getURL("dark-mode.css");
  
  if (darkModeEnabled) {
    document.head.appendChild(link);
  } else {
    const existingLink = document.querySelector("link[href*='dark-mode.css']");
    if (existingLink) {
      existingLink.remove();
    }
  }
}
