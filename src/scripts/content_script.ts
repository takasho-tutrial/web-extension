import * as browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.content)
})
