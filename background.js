chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "toggleDarkMode") {
      // Send a message to all tabs to enable/disable dark mode
      chrome.tabs.query({}, function (tabs) {
        for (const tab of tabs) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: enableDarkMode,
            args: [message.darkModeEnabled],
          });
        }
      });
    }
  });
  
  function enableDarkMode(darkModeEnabled) {
    const code = `
      if (${darkModeEnabled}) {
        document.documentElement.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
      } else {
        document.documentElement.style.backgroundColor = "";
        document.body.style.color = "";
      }
    `;
  
    chrome.scripting.executeScript({
      target: { allFrames: true },
      function: (code) => {
        eval(code);
      },
      args: [code],
    });
  }
  