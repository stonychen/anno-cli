// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  '<%=root.className%> e2e tests': (browser) => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to <%=root.className%>')
      .assert.elementCount('img', 1)
      .end()
  },

  '<%=root.className%> e2e test using a custom command': (browser) => {
    browser.openHomepage().assert.elementPresent('.hello').end()
  },
}
