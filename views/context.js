function eventHandler (event) {
  if (event.target.dataset.action == 'create') {
    browser.tabs.create({
      url: 'about:blank',
      cookieStoreId: event.target.dataset.identity
    })
  }
  if (event.target.dataset.action == 'close-all') {
    browser.tabs.query({
      cookieStoreId: event.target.dataset.identity
    }).then((tabs) => {
      browser.tabs.remove(tabs.map((i) => i.id))
    })
  }
  event.preventDefault()
}

function createOptions (node, identity) {
  for (const option of ['Create', 'Close All']) {
    const a = document.createElement('a')
    a.href = '#'
    a.innerText = option
    a.dataset.action = option.toLowerCase().replace(' ', '-')
    a.dataset.identity = identity.cookieStoreId
    a.addEventListener('click', eventHandler)
    node.appendChild(a)
  }
}

var div = document.getElementById('identity-list')

if (browser.contextualIdentities === undefined) {
  div.innerText = 'browser.contextualIdentities not available. Check that the privacy.userContext.enabled pref is set to true, and reload the add-on.'
} else {
  browser.contextualIdentities.query({})
    .then((identities) => {
      if (!identities.length) {
        div.innerText = 'No identities returned from the API.'
        return
      }

      for (const identity of identities) {
        const row = document.createElement('div')
        const span = document.createElement('span')
        span.className = 'identity'
        span.innerText = identity.name
        span.style = `color: ${identity.color}`
        console.log(identity)
        row.appendChild(span)
        createOptions(row, identity)
        div.appendChild(row)
      }
    })
}
