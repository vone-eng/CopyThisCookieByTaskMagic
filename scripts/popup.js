document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = new URL(tabs[0].url)
    const hostname = url.hostname
    document.getElementById("hostname").textContent = `from ${hostname}`
  })
})

document.getElementById("copyButton").addEventListener("click", async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTabUrl = tabs[0].url
    const tabId = tabs[0].id
    chrome.runtime.sendMessage(
      { action: "getCookies", url: currentTabUrl, tabId },
      async (response) => {
        try {
          await navigator.clipboard.writeText(response.cookies)
        } catch (error) {
          console.error("Failed to copy cookies:", error)
        }
      }
    )
  })
})
