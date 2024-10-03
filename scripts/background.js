chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed and ready.")
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCookies") {
    chrome.tabs.get(message.tabId, function (t) {
      var url = t.url
      chrome.cookies.getAll({ url }, (c) => {
        const cookieJson = JSON.stringify(c)
        sendResponse({ cookies: cookieJson })
      })
    })

    return true 
  }
})

// Send to content.js
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    {
      message: "copyText",
      textToCopy: "some text",
    },
  )
})
