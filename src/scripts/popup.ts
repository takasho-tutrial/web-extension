import * as browser from 'webextension-polyfill'
declare var document: any

async function start () {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  browser.tabs.sendMessage(
    tabs[0].id,
    { content: 'hello' }
  ).then((response) => {
    console.log(response)
  })
}

document.getElementsByTagName('h1')[0].addEventListener('click', start)
