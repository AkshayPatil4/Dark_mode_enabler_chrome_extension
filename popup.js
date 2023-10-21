document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Load the dark mode setting from storage and update the toggle
  chrome.storage.sync.get("darkModeEnabled", function (data) {
    darkModeToggle.checked = data.darkModeEnabled;
  });

  // When the user toggles dark mode
  darkModeToggle.addEventListener("change", function () {
    const darkModeEnabled = darkModeToggle.checked;

    // Save the user's dark mode preference
    chrome.storage.sync.set({ darkModeEnabled });

    // Send a message to the content script to enable/disable dark mode
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDarkMode", darkModeEnabled });
      }
    });
  });
});
