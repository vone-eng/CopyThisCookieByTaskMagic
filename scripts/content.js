// Backgrund.js uses copyText for access to navigator.clipboard.writeText, which is not available in background scripts
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "copyText") copyToTheClipboard(request.textToCopy)
  }
)

async function copyToTheClipboard(textToCopy) {
  try {
    await navigator.clipboard.writeText(textToCopy);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
